import {
  fetchAllExternalApprentices,
  validateTransformedApprentice,
  checkExternalApiConnectivity,
  checkLocalApiConnectivity,
} from "./externalApiService.js"

// Configuración desde variables de entorno (obligatoria) - ACTUALIZADA
const API_BASE_URL = import.meta.env.VITE_LOCAL_DB_URL

// Validar que la variable de entorno esté configurada
if (!API_BASE_URL) {
  throw new Error("VITE_LOCAL_DB_URL no está configurada en el archivo .env")
}

// Configuración optimizada para escalabilidad
const CONFIG = {
  BATCH_SIZE: 10, // Reducido para debugging
  MAX_CONCURRENT_REQUESTS: 2, // Reducido para debugging
  RETRY_ATTEMPTS: 3,
  CHECKPOINT_INTERVAL: 100,
  RATE_LIMIT_DELAY: 500, // Aumentado para debugging
  MEMORY_CLEANUP_INTERVAL: 200,
}

/**
 * Función para limpiar memoria en navegadores
 */
const cleanupMemory = () => {
  try {
    if (typeof window !== "undefined" && window.gc) {
      window.gc()
    }
    const cleanup = new Array(1000).fill(null)
    cleanup.length = 0
  } catch (error) {
    // Silenciar errores de limpieza de memoria
  }
}

/**
 * Crea múltiples aprendices usando batch processing
 */
const createApprenticesBatch = async (apprenticesData) => {
  console.log(`🔨 Creando lote de ${apprenticesData.length} aprendices...`)
  const results = { success: [], errors: [] }

  for (let i = 0; i < apprenticesData.length; i += CONFIG.MAX_CONCURRENT_REQUESTS) {
    const batch = apprenticesData.slice(i, i + CONFIG.MAX_CONCURRENT_REQUESTS)
    console.log(`📦 Procesando sub-lote ${i + 1}-${i + batch.length} de ${apprenticesData.length}`)

    const promises = batch.map(async (apprentice, index) => {
      for (let attempt = 1; attempt <= CONFIG.RETRY_ATTEMPTS; attempt++) {
        try {
          console.log(`📤 Enviando aprendiz ${apprentice.documento} (intento ${attempt}):`, apprentice)

          const response = await fetch(`${API_BASE_URL}/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apprentice),
          })

          console.log(`📥 Respuesta para ${apprentice.documento}:`, {
            status: response.status,
            statusText: response.statusText,
            ok: response.ok,
          })

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.error(`❌ Error creando ${apprentice.documento}:`, errorData)
            throw new Error(errorData.message || `Error HTTP ${response.status}`)
          }

          const result = await response.json()
          console.log(`✅ Aprendiz ${apprentice.documento} creado exitosamente:`, result)
          return { success: true, data: result, apprentice }
        } catch (error) {
          console.error(`❌ Error en intento ${attempt} para ${apprentice.documento}:`, error)
          if (attempt === CONFIG.RETRY_ATTEMPTS) {
            return { success: false, error: error.message, apprentice }
          }
          await new Promise((resolve) => setTimeout(resolve, attempt * 1000))
        }
      }
    })

    const batchResults = await Promise.allSettled(promises)

    batchResults.forEach((result, index) => {
      if (result.status === "fulfilled") {
        if (result.value.success) {
          results.success.push(result.value)
          console.log(`✅ Éxito en sub-lote: ${result.value.apprentice.documento}`)
        } else {
          results.errors.push(result.value)
          console.log(`❌ Error en sub-lote: ${result.value.apprentice?.documento || "N/A"} - ${result.value.error}`)
        }
      } else {
        results.errors.push({ error: result.reason.message, apprentice: null })
        console.log(`❌ Promesa rechazada en sub-lote: ${result.reason.message}`)
      }
    })

    if (i + CONFIG.MAX_CONCURRENT_REQUESTS < apprenticesData.length) {
      console.log(`⏳ Esperando ${CONFIG.RATE_LIMIT_DELAY}ms antes del siguiente sub-lote...`)
      await new Promise((resolve) => setTimeout(resolve, CONFIG.RATE_LIMIT_DELAY))
    }
  }

  console.log(`📊 Resultado del lote: ${results.success.length} éxitos, ${results.errors.length} errores`)
  return results
}

/**
 * Actualiza múltiples aprendices usando batch processing
 */
const updateApprenticesBatch = async (updates) => {
  console.log(`🔄 Actualizando lote de ${updates.length} aprendices...`)
  const results = { success: [], errors: [] }

  for (let i = 0; i < updates.length; i += CONFIG.MAX_CONCURRENT_REQUESTS) {
    const batch = updates.slice(i, i + CONFIG.MAX_CONCURRENT_REQUESTS)

    const promises = batch.map(async ({ id, data }) => {
      for (let attempt = 1; attempt <= CONFIG.RETRY_ATTEMPTS; attempt++) {
        try {
          console.log(`📤 Actualizando aprendiz ${id} (intento ${attempt}):`, data)

          const response = await fetch(`${API_BASE_URL}/user/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.error(`❌ Error actualizando ${id}:`, errorData)
            throw new Error(errorData.message || `Error HTTP ${response.status}`)
          }

          const result = await response.json()
          console.log(`✅ Aprendiz ${id} actualizado exitosamente`)
          return { success: true, data: result, originalData: data }
        } catch (error) {
          console.error(`❌ Error en intento ${attempt} para actualización ${id}:`, error)
          if (attempt === CONFIG.RETRY_ATTEMPTS) {
            return { success: false, error: error.message, originalData: data }
          }
          await new Promise((resolve) => setTimeout(resolve, attempt * 1000))
        }
      }
    })

    const batchResults = await Promise.allSettled(promises)

    batchResults.forEach((result) => {
      if (result.status === "fulfilled") {
        if (result.value.success) {
          results.success.push(result.value)
        } else {
          results.errors.push(result.value)
        }
      } else {
        results.errors.push({ error: result.reason.message, originalData: null })
      }
    })

    if (i + CONFIG.MAX_CONCURRENT_REQUESTS < updates.length) {
      await new Promise((resolve) => setTimeout(resolve, CONFIG.RATE_LIMIT_DELAY))
    }
  }

  console.log(`📊 Resultado de actualizaciones: ${results.success.length} éxitos, ${results.errors.length} errores`)
  return results
}

/**
 * Obtiene todos los aprendices locales
 */
const getAllLocalApprentices = async () => {
  try {
    console.log("🔍 Obteniendo aprendices locales...")
    const response = await fetch(`${API_BASE_URL}/apprentice`)

    if (!response.ok) {
      if (response.status === 404) {
        console.log("📭 No se encontraron aprendices locales (404)")
        return []
      }
      throw new Error(`Error HTTP ${response.status}`)
    }

    const apprentices = await response.json()
    console.log(`📊 Encontrados ${apprentices.length} aprendices locales`)
    return apprentices
  } catch (error) {
    console.error("❌ Error al obtener aprendices locales:", error)
    return []
  }
}

/**
 * Verifica la conectividad con ambas APIs
 */
export const checkApiConnectivity = async () => {
  console.log("🔍 Verificando conectividad con ambas APIs...")
  const results = {
    external: false,
    local: false,
    errors: [],
  }

  try {
    // Verificar API externa
    const externalResult = await checkExternalApiConnectivity()
    results.external = externalResult.success
    if (!externalResult.success) {
      results.errors.push(`API externa: ${externalResult.message}`)
    }
  } catch (error) {
    results.errors.push(`API externa: ${error.message}`)
  }

  try {
    // Verificar API local
    const localResult = await checkLocalApiConnectivity()
    results.local = localResult.success
    if (!localResult.success) {
      results.errors.push(`API local: ${localResult.message}`)
    }
  } catch (error) {
    results.errors.push(`API local: ${error.message}`)
  }

  console.log("📡 Resultado verificación conectividad:", results)
  return results
}

/**
 * Procesa la sincronización masiva de aprendices con verificación automática
 */
export const processMassiveUpdate = async (onProgress = null) => {
  try {
    console.log("=== 🚀 INICIANDO SINCRONIZACIÓN MASIVA OPTIMIZADA ===")

    const results = {
      total: 0,
      created: 0,
      updated: 0,
      skipped: 0,
      errors: 0,
      errorDetails: [],
    }

    // Fase 1: Verificar conectividad automáticamente
    if (onProgress) {
      onProgress({
        phase: "connectivity",
        message: "Verificando conectividad con APIs...",
        percentage: 0,
      })
    }

    const connectivity = await checkApiConnectivity()
    if (!connectivity.external || !connectivity.local) {
      throw new Error(`Error de conectividad: ${connectivity.errors.join(", ")}`)
    }

    // Fase 2: Descargar aprendices de la API externa
    if (onProgress) {
      onProgress({
        phase: "download",
        message: "Descargando aprendices de la API externa...",
        percentage: 10,
      })
    }

    const externalApprentices = await fetchAllExternalApprentices((downloadProgress) => {
      if (onProgress) {
        onProgress({
          phase: "download",
          message: downloadProgress.message,
          percentage: 10 + Math.round(downloadProgress.percentage * 0.3),
          details: `${downloadProgress.apprenticesCount} aprendices descargados`,
        })
      }
    })

    results.total = externalApprentices.length
    console.log(`📊 Total de aprendices externos descargados: ${results.total}`)

    if (results.total === 0) {
      throw new Error("No se descargaron aprendices de la API externa")
    }

    // Fase 3: Obtener aprendices locales para comparación
    if (onProgress) {
      onProgress({
        phase: "sync",
        message: "Obteniendo aprendices locales...",
        percentage: 40,
      })
    }

    const localApprentices = await getAllLocalApprentices()
    const localApprenticesMap = new Map(localApprentices.map((a) => [a.documento, a]))

    console.log(`📊 Aprendices locales encontrados: ${localApprentices.length}`)

    // Fase 4: Preparar lotes para procesamiento optimizado
    if (onProgress) {
      onProgress({
        phase: "sync",
        message: "Preparando procesamiento en lotes...",
        percentage: 45,
      })
    }

    const toCreate = []
    const toUpdate = []
    let skipped = 0

    // Clasificar operaciones
    for (const apprentice of externalApprentices) {
      try {
        const validation = validateTransformedApprentice(apprentice)
        if (!validation.isValid) {
          console.error(`❌ Aprendiz inválido ${apprentice.documento}:`, validation.errors)
          results.errors++
          results.errorDetails.push({
            documento: apprentice.documento,
            nombre: `${apprentice.nombre} ${apprentice.apellido}`,
            error: `Datos inválidos: ${validation.errors.join(", ")}`,
          })
          continue
        }

        const existingApprentice = localApprenticesMap.get(apprentice.documento)

        if (existingApprentice) {
          const needsUpdate =
            existingApprentice.nombre !== apprentice.nombre ||
            existingApprentice.apellido !== apprentice.apellido ||
            existingApprentice.telefono !== apprentice.telefono ||
            existingApprentice.estado !== apprentice.estado ||
            JSON.stringify(existingApprentice.ficha) !== JSON.stringify(apprentice.ficha)

          if (needsUpdate) {
            console.log(`🔄 Aprendiz ${apprentice.documento} necesita actualización`)
            toUpdate.push({
              id: existingApprentice._id,
              data: {
                nombre: apprentice.nombre,
                apellido: apprentice.apellido,
                telefono: apprentice.telefono,
                estado: apprentice.estado,
                ficha: apprentice.ficha,
                tipoUsuario: "aprendiz",
              },
            })
          } else {
            console.log(`✅ Aprendiz ${apprentice.documento} sin cambios`)
            skipped++
          }
        } else {
          console.log(`🆕 Aprendiz ${apprentice.documento} será creado`)
          toCreate.push(apprentice)
        }
      } catch (error) {
        console.error(`❌ Error clasificando aprendiz ${apprentice.documento}:`, error)
        results.errors++
        results.errorDetails.push({
          documento: apprentice.documento,
          nombre: `${apprentice.nombre} ${apprentice.apellido}`,
          error: error.message,
        })
      }
    }

    results.skipped = skipped
    console.log(`📊 Clasificación completada:`)
    console.log(`   - Crear: ${toCreate.length}`)
    console.log(`   - Actualizar: ${toUpdate.length}`)
    console.log(`   - Sin cambios: ${skipped}`)
    console.log(`   - Errores: ${results.errors}`)

    // Fase 5: Procesar creaciones en lotes
    if (toCreate.length > 0) {
      if (onProgress) {
        onProgress({
          phase: "sync",
          message: `Creando ${toCreate.length} nuevos aprendices...`,
          percentage: 50,
        })
      }

      for (let i = 0; i < toCreate.length; i += CONFIG.BATCH_SIZE) {
        const batch = toCreate.slice(i, i + CONFIG.BATCH_SIZE)
        console.log(
          `🔨 Procesando lote de creación ${Math.floor(i / CONFIG.BATCH_SIZE) + 1}/${Math.ceil(toCreate.length / CONFIG.BATCH_SIZE)}`,
        )

        const batchResults = await createApprenticesBatch(batch)

        results.created += batchResults.success.length
        results.errors += batchResults.errors.length
        results.errorDetails.push(
          ...batchResults.errors.map((err) => ({
            documento: err.apprentice?.documento || "N/A",
            nombre: err.apprentice ? `${err.apprentice.nombre} ${err.apprentice.apellido}` : "N/A",
            error: err.error,
          })),
        )

        const progressPercentage = 50 + Math.round(((i + CONFIG.BATCH_SIZE) / toCreate.length) * 25)
        if (onProgress) {
          onProgress({
            phase: "sync",
            message: `Creando lote ${Math.floor(i / CONFIG.BATCH_SIZE) + 1} de ${Math.ceil(toCreate.length / CONFIG.BATCH_SIZE)}...`,
            percentage: Math.min(progressPercentage, 75),
            details: `Creados: ${results.created} | Errores: ${results.errors}`,
          })
        }

        if (i % CONFIG.MEMORY_CLEANUP_INTERVAL === 0) {
          cleanupMemory()
        }
      }
    }

    // Fase 6: Procesar actualizaciones en lotes
    if (toUpdate.length > 0) {
      if (onProgress) {
        onProgress({
          phase: "sync",
          message: `Actualizando ${toUpdate.length} aprendices existentes...`,
          percentage: 75,
        })
      }

      for (let i = 0; i < toUpdate.length; i += CONFIG.BATCH_SIZE) {
        const batch = toUpdate.slice(i, i + CONFIG.BATCH_SIZE)
        console.log(
          `🔄 Procesando lote de actualización ${Math.floor(i / CONFIG.BATCH_SIZE) + 1}/${Math.ceil(toUpdate.length / CONFIG.BATCH_SIZE)}`,
        )

        const batchResults = await updateApprenticesBatch(batch)

        results.updated += batchResults.success.length
        results.errors += batchResults.errors.length
        results.errorDetails.push(
          ...batchResults.errors.map((err) => ({
            documento: err.originalData?.documento || "N/A",
            nombre: err.originalData ? `${err.originalData.nombre} ${err.originalData.apellido}` : "N/A",
            error: err.error,
          })),
        )

        const progressPercentage = 75 + Math.round(((i + CONFIG.BATCH_SIZE) / toUpdate.length) * 20)
        if (onProgress) {
          onProgress({
            phase: "sync",
            message: `Actualizando lote ${Math.floor(i / CONFIG.BATCH_SIZE) + 1} de ${Math.ceil(toUpdate.length / CONFIG.BATCH_SIZE)}...`,
            percentage: Math.min(progressPercentage, 95),
            details: `Creados: ${results.created} | Actualizados: ${results.updated} | Errores: ${results.errors}`,
          })
        }

        if (i % CONFIG.MEMORY_CLEANUP_INTERVAL === 0) {
          cleanupMemory()
        }
      }
    }

    // Fase 7: Completado
    if (onProgress) {
      onProgress({
        phase: "completed",
        message: "Sincronización completada exitosamente",
        percentage: 100,
        details: `Total: ${results.total} | Creados: ${results.created} | Actualizados: ${results.updated} | Sin cambios: ${results.skipped} | Errores: ${results.errors}`,
      })
    }

    console.log("=== ✅ SINCRONIZACIÓN COMPLETADA ===")
    console.log(`📊 Resultados finales:`)
    console.log(`   - Total procesados: ${results.total}`)
    console.log(`   - Creados: ${results.created}`)
    console.log(`   - Actualizados: ${results.updated}`)
    console.log(`   - Sin cambios: ${results.skipped}`)
    console.log(`   - Errores: ${results.errors}`)

    return results
  } catch (error) {
    console.error("❌ Error en sincronización masiva:", error)

    if (onProgress) {
      onProgress({
        phase: "error",
        message: `Error: ${error.message}`,
        percentage: 0,
      })
    }

    throw error
  }
}
