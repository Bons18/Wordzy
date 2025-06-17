import { fetchAllExternalApprentices, validateTransformedApprentice } from "./externalApiService.js"

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

/**
 * Crea un nuevo aprendiz usando la ruta de usuarios
 */
const createApprentice = async (apprenticeData) => {
  try {
    console.log(`Creando aprendiz: ${apprenticeData.nombre} ${apprenticeData.apellido}`)

    const response = await fetch(`${API_BASE_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apprenticeData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Error HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al crear aprendiz:", error)
    throw error
  }
}

/**
 * Actualiza un aprendiz existente usando la ruta de usuarios
 */
const updateApprentice = async (apprenticeId, apprenticeData) => {
  try {
    console.log(`Actualizando aprendiz ID: ${apprenticeId}`)

    const response = await fetch(`${API_BASE_URL}/api/user/${apprenticeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apprenticeData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Error HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error al actualizar aprendiz:", error)
    throw error
  }
}

/**
 * Obtiene todos los aprendices locales usando la ruta de aprendices
 */
const getAllLocalApprentices = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/apprentice`)

    if (!response.ok) {
      if (response.status === 404) {
        return [] // No hay aprendices
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
 * Procesa la sincronización masiva de aprendices
 */
export const processMassiveUpdate = async (onProgress = null) => {
  try {
    console.log("=== INICIANDO SINCRONIZACIÓN MASIVA ===")

    const results = {
      total: 0,
      created: 0,
      updated: 0,
      skipped: 0,
      errors: 0,
      errorDetails: [],
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
          percentage: Math.round(downloadProgress.percentage * 0.4), // 40% del progreso total
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
        percentage: 40,
      })
    }

    const localApprentices = await getAllLocalApprentices()
    const localApprenticesMap = new Map(localApprentices.map((a) => [a.documento, a]))

    console.log(`Encontrados ${localApprentices.length} aprendices locales`)

    // Fase 3: Procesar cada aprendiz
    if (onProgress) {
      onProgress({
        phase: "sync",
        message: "Iniciando sincronización...",
        percentage: 45,
      })
    }

    for (let i = 0; i < externalApprentices.length; i++) {
      const apprentice = externalApprentices[i]

      try {
        // Validar datos antes de procesar
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

        // Verificar si ya existe localmente
        const existingApprentice = localApprenticesMap.get(apprentice.documento)

        if (existingApprentice) {
          // Verificar si necesita actualización (comparar campos clave)
          const needsUpdate =
            existingApprentice.nombre !== apprentice.nombre ||
            existingApprentice.apellido !== apprentice.apellido ||
            existingApprentice.telefono !== apprentice.telefono ||
            existingApprentice.correo !== apprentice.correo ||
            existingApprentice.estado !== apprentice.estado ||
            JSON.stringify(existingApprentice.ficha) !== JSON.stringify(apprentice.ficha)

          if (needsUpdate) {
            // Actualizar aprendiz existente
            const updateData = {
              nombre: apprentice.nombre,
              apellido: apprentice.apellido,
              telefono: apprentice.telefono,
              correo: apprentice.correo,
              estado: apprentice.estado,
              ficha: apprentice.ficha,
              // Mantener campos que no deben cambiar
              tipoUsuario: "aprendiz",
            }

            await updateApprentice(existingApprentice._id, updateData)
            results.updated++
            console.log(`✓ Actualizado: ${apprentice.nombre} ${apprentice.apellido}`)
          } else {
            results.skipped++
            console.log(`- Sin cambios: ${apprentice.nombre} ${apprentice.apellido}`)
          }
        } else {
          // Crear nuevo aprendiz
          await createApprentice(apprentice)
          results.created++
          console.log(`+ Creado: ${apprentice.nombre} ${apprentice.apellido}`)
        }

        // Reportar progreso
        const progressPercentage = 45 + Math.round(((i + 1) / externalApprentices.length) * 50)
        if (onProgress) {
          onProgress({
            phase: "sync",
            message: `Procesando ${i + 1} de ${externalApprentices.length}...`,
            percentage: progressPercentage,
            details: `Creados: ${results.created} | Actualizados: ${results.updated} | Errores: ${results.errors}`,
          })
        }

        // Pequeña pausa para no sobrecargar el servidor
        if (i % 5 === 0) {
          await new Promise((resolve) => setTimeout(resolve, 50))
        }
      } catch (error) {
        console.error(`Error procesando aprendiz ${apprentice.documento}:`, error)
        results.errors++
        results.errorDetails.push({
          documento: apprentice.documento,
          nombre: `${apprentice.nombre} ${apprentice.apellido}`,
          error: error.message,
        })
      }
    }

    // Fase 4: Completado
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
