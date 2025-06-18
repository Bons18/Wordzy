import { fetchAllExternalApprentices, validateTransformedApprentice } from "./externalApiService.js"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

// Configuración optimizada para escalabilidad
const CONFIG = {
  BATCH_SIZE: 50, // Procesar en lotes de 50 usuarios
  MAX_CONCURRENT_REQUESTS: 5, // Máximo 5 requests simultáneos
  RETRY_ATTEMPTS: 3, // Reintentos por operación fallida
  CHECKPOINT_INTERVAL: 100, // Guardar progreso cada 100 registros
  RATE_LIMIT_DELAY: 100, // Delay base entre requests (ms)
  MEMORY_CLEANUP_INTERVAL: 200, // Limpiar memoria cada 200 registros
}

/**
 * Función para limpiar memoria en navegadores
 */
const cleanupMemory = () => {
  try {
    // En navegadores, forzar garbage collection si está disponible
    if (typeof window !== "undefined" && window.gc) {
      window.gc()
    }
    // Alternativa: crear y limpiar arrays grandes para forzar GC
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
  const results = { success: [], errors: [] }

  // Procesar en lotes más pequeños para evitar sobrecarga del servidor
  for (let i = 0; i < apprenticesData.length; i += CONFIG.MAX_CONCURRENT_REQUESTS) {
    const batch = apprenticesData.slice(i, i + CONFIG.MAX_CONCURRENT_REQUESTS)

    const promises = batch.map(async (apprentice, index) => {
      for (let attempt = 1; attempt <= CONFIG.RETRY_ATTEMPTS; attempt++) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/user`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apprentice),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || `Error HTTP ${response.status}`)
          }

          const result = await response.json()
          return { success: true, data: result, apprentice }
        } catch (error) {
          if (attempt === CONFIG.RETRY_ATTEMPTS) {
            return { success: false, error: error.message, apprentice }
          }
          // Esperar antes del siguiente intento
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
        results.errors.push({ error: result.reason.message, apprentice: null })
      }
    })

    // Rate limiting inteligente
    if (i + CONFIG.MAX_CONCURRENT_REQUESTS < apprenticesData.length) {
      await new Promise((resolve) => setTimeout(resolve, CONFIG.RATE_LIMIT_DELAY))
    }
  }

  return results
}

/**
 * Actualiza múltiples aprendices usando batch processing
 */
const updateApprenticesBatch = async (updates) => {
  const results = { success: [], errors: [] }

  for (let i = 0; i < updates.length; i += CONFIG.MAX_CONCURRENT_REQUESTS) {
    const batch = updates.slice(i, i + CONFIG.MAX_CONCURRENT_REQUESTS)

    const promises = batch.map(async ({ id, data }) => {
      for (let attempt = 1; attempt <= CONFIG.RETRY_ATTEMPTS; attempt++) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/user/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })

          if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message || `Error HTTP ${response.status}`)
          }

          const result = await response.json()
          return { success: true, data: result, originalData: data }
        } catch (error) {
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

  return results
}

/**
 * Obtiene todos los aprendices locales usando la ruta de aprendices
 */
const getAllLocalApprentices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/apprentice`)

    if (!response.ok) {
      if (response.status === 404) {
        return []
      }
      throw new Error(`Error HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al obtener aprendices locales:", error)
    return []
  }
}

/**
 * Guarda checkpoint del progreso
 */
const saveCheckpoint = (data) => {
  try {
    localStorage.setItem(
      "massive_update_checkpoint",
      JSON.stringify({
        ...data,
        timestamp: Date.now(),
      }),
    )
  } catch (error) {
    console.warn("No se pudo guardar checkpoint:", error)
  }
}

/**
 * Recupera checkpoint del progreso
 */
const getCheckpoint = () => {
  try {
    const checkpoint = localStorage.getItem("massive_update_checkpoint")
    if (checkpoint) {
      const data = JSON.parse(checkpoint)
      // Checkpoint válido por 1 hora
      if (Date.now() - data.timestamp < 3600000) {
        return data
      }
    }
  } catch (error) {
    console.warn("No se pudo recuperar checkpoint:", error)
  }
  return null
}

/**
 * Limpia checkpoint
 */
const clearCheckpoint = () => {
  try {
    localStorage.removeItem("massive_update_checkpoint")
  } catch (error) {
    console.warn("No se pudo limpiar checkpoint:", error)
  }
}

/**
 * Procesa la sincronización masiva de aprendices con optimizaciones
 */
export const processMassiveUpdate = async (onProgress = null) => {
  try {
    console.log("=== INICIANDO SINCRONIZACIÓN MASIVA OPTIMIZADA ===")

    const results = {
      total: 0,
      created: 0,
      updated: 0,
      skipped: 0,
      errors: 0,
      errorDetails: [],
    }

    // Verificar si hay un checkpoint previo
    const checkpoint = getCheckpoint()
    if (checkpoint && onProgress) {
      onProgress({
        phase: "checkpoint",
        message: "Checkpoint encontrado. ¿Desea continuar desde donde se quedó?",
        percentage: 0,
      })
    }

    // Fase 1: Descargar aprendices de la API externa
    if (onProgress) {
      onProgress({
        phase: "download",
        message: "Descargando aprendices de la API externa...",
        percentage: 0,
      })
    }

    const externalApprentices = await fetchAllExternalApprentices((downloadProgress) => {
      if (onProgress) {
        onProgress({
          phase: "download",
          message: downloadProgress.message,
          percentage: Math.round(downloadProgress.percentage * 0.3), // 30% del progreso total
          details: `${downloadProgress.apprenticesCount} aprendices descargados`,
        })
      }
    })

    results.total = externalApprentices.length
    console.log(`Descargados ${results.total} aprendices de la API externa`)

    // Fase 2: Obtener aprendices locales para comparación
    if (onProgress) {
      onProgress({
        phase: "sync",
        message: "Obteniendo aprendices locales...",
        percentage: 30,
      })
    }

    const localApprentices = await getAllLocalApprentices()
    const localApprenticesMap = new Map(localApprentices.map((a) => [a.documento, a]))

    console.log(`Encontrados ${localApprentices.length} aprendices locales`)

    // Fase 3: Preparar lotes para procesamiento optimizado
    if (onProgress) {
      onProgress({
        phase: "sync",
        message: "Preparando procesamiento en lotes...",
        percentage: 35,
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
            skipped++
          }
        } else {
          toCreate.push(apprentice)
        }
      } catch (error) {
        console.error(`Error clasificando aprendiz ${apprentice.documento}:`, error)
        results.errors++
        results.errorDetails.push({
          documento: apprentice.documento,
          nombre: `${apprentice.nombre} ${apprentice.apellido}`,
          error: error.message,
        })
      }
    }

    results.skipped = skipped
    console.log(
      `Clasificación completada: ${toCreate.length} crear, ${toUpdate.length} actualizar, ${skipped} sin cambios`,
    )

    // Fase 4: Procesar creaciones en lotes
    if (toCreate.length > 0) {
      if (onProgress) {
        onProgress({
          phase: "sync",
          message: `Creando ${toCreate.length} nuevos aprendices...`,
          percentage: 40,
        })
      }

      for (let i = 0; i < toCreate.length; i += CONFIG.BATCH_SIZE) {
        const batch = toCreate.slice(i, i + CONFIG.BATCH_SIZE)
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

        // Guardar checkpoint
        if ((i + CONFIG.BATCH_SIZE) % CONFIG.CHECKPOINT_INTERVAL === 0) {
          saveCheckpoint({
            phase: "creating",
            processed: i + CONFIG.BATCH_SIZE,
            total: toCreate.length,
            results: { ...results },
          })
        }

        // Reportar progreso
        const progressPercentage = 40 + Math.round(((i + CONFIG.BATCH_SIZE) / toCreate.length) * 25)
        if (onProgress) {
          onProgress({
            phase: "sync",
            message: `Creando lote ${Math.floor(i / CONFIG.BATCH_SIZE) + 1} de ${Math.ceil(toCreate.length / CONFIG.BATCH_SIZE)}...`,
            percentage: Math.min(progressPercentage, 65),
            details: `Creados: ${results.created} | Errores: ${results.errors}`,
          })
        }

        // Limpieza de memoria periódica
        if (i % CONFIG.MEMORY_CLEANUP_INTERVAL === 0) {
          cleanupMemory()
        }
      }
    }

    // Fase 5: Procesar actualizaciones en lotes
    if (toUpdate.length > 0) {
      if (onProgress) {
        onProgress({
          phase: "sync",
          message: `Actualizando ${toUpdate.length} aprendices existentes...`,
          percentage: 65,
        })
      }

      for (let i = 0; i < toUpdate.length; i += CONFIG.BATCH_SIZE) {
        const batch = toUpdate.slice(i, i + CONFIG.BATCH_SIZE)
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

        // Guardar checkpoint
        if ((i + CONFIG.BATCH_SIZE) % CONFIG.CHECKPOINT_INTERVAL === 0) {
          saveCheckpoint({
            phase: "updating",
            processed: i + CONFIG.BATCH_SIZE,
            total: toUpdate.length,
            results: { ...results },
          })
        }

        // Reportar progreso
        const progressPercentage = 65 + Math.round(((i + CONFIG.BATCH_SIZE) / toUpdate.length) * 30)
        if (onProgress) {
          onProgress({
            phase: "sync",
            message: `Actualizando lote ${Math.floor(i / CONFIG.BATCH_SIZE) + 1} de ${Math.ceil(toUpdate.length / CONFIG.BATCH_SIZE)}...`,
            percentage: Math.min(progressPercentage, 95),
            details: `Creados: ${results.created} | Actualizados: ${results.updated} | Errores: ${results.errors}`,
          })
        }

        // Limpieza de memoria periódica
        if (i % CONFIG.MEMORY_CLEANUP_INTERVAL === 0) {
          cleanupMemory()
        }
      }
    }

    // Fase 6: Completado
    clearCheckpoint() // Limpiar checkpoint al completar exitosamente

    if (onProgress) {
      onProgress({
        phase: "completed",
        message: "Sincronización completada exitosamente",
        percentage: 100,
        details: `Total: ${results.total} | Creados: ${results.created} | Actualizados: ${results.updated} | Sin cambios: ${results.skipped} | Errores: ${results.errors}`,
      })
    }

    console.log("=== SINCRONIZACIÓN COMPLETADA ===")
    console.log(`Total procesados: ${results.total}`)
    console.log(`Creados: ${results.created}`)
    console.log(`Actualizados: ${results.updated}`)
    console.log(`Sin cambios: ${results.skipped}`)
    console.log(`Errores: ${results.errors}`)

    return results
  } catch (error) {
    console.error("Error en sincronización masiva:", error)

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

/**
 * Verifica la conectividad con ambas APIs
 */
export const checkApiConnectivity = async () => {
  const results = {
    external: false,
    local: false,
    errors: [],
  }

  // Verificar API externa
  try {
    const response = await fetch("https://sara-api-ingdanielbs-projects.vercel.app/api/v1/courses-students?page=1", {
      headers: {
        "x-api-key": "sara_d32775a2ea8a39a3.a14bb968e21a6be6821d19f2764945338ba182b972aff43732b0c7c8314d343a",
        "Content-Type": "application/json",
      },
    })
    results.external = response.ok
    if (!response.ok) {
      results.errors.push(`API externa: HTTP ${response.status}`)
    }
  } catch (error) {
    results.errors.push(`API externa: ${error.message}`)
  }

  // Verificar API local - usuarios
  try {
    const response = await fetch(`${API_BASE_URL}/api/user`)
    results.local = response.ok
    if (!response.ok) {
      results.errors.push(`API local (usuarios): HTTP ${response.status}`)
    }
  } catch (error) {
    results.errors.push(`API local (usuarios): ${error.message}`)
  }

  // Verificar API local - aprendices
  try {
    const response = await fetch(`${API_BASE_URL}/api/apprentice`)
    if (!response.ok && response.status !== 404) {
      results.errors.push(`API local (aprendices): HTTP ${response.status}`)
    }
  } catch (error) {
    results.errors.push(`API local (aprendices): ${error.message}`)
  }

  return results
}
