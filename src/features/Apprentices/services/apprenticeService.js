import { API_URL } from "@/shared/config/api"

// Configuración de API
const COURSES_API_URL = import.meta.env.VITE_COURSES_API_URL || "http://localhost:3000/api/course"

/**
 * Obtiene el programa correspondiente a una ficha desde la API de cursos
 */
const getProgramByFicha = async (fichaNumber) => {
  try {
    console.log(`🔍 [APPRENTICE SERVICE] Obteniendo programa para ficha: ${fichaNumber}`)

    const response = await fetch(COURSES_API_URL)
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const courses = await response.json()
    const matchingCourse = courses.find((course) => course.code === String(fichaNumber))

    if (matchingCourse && matchingCourse.fk_programs) {
      console.log(
        `✅ [APPRENTICE SERVICE] Programa encontrado: "${matchingCourse.fk_programs}" para ficha ${fichaNumber}`,
      )
      return matchingCourse.fk_programs
    } else {
      console.warn(`⚠️ [APPRENTICE SERVICE] No se encontró programa para ficha ${fichaNumber}`)
      return "Programa no asignado"
    }
  } catch (error) {
    console.error(`❌ [APPRENTICE SERVICE] Error obteniendo programa para ficha ${fichaNumber}:`, error)
    return "Programa no asignado"
  }
}

/**
 * Prepara los datos del aprendiz para envío al backend
 * Obtiene automáticamente el programa basado en la ficha
 */
const prepareApprenticeForSubmit = async (apprenticeData) => {
  try {
    console.log("🔄 [APPRENTICE SERVICE] Preparando datos del aprendiz para envío...")

    // Obtener programa automáticamente basado en la primera ficha
    const fichaNumber = Array.isArray(apprenticeData.ficha) ? apprenticeData.ficha[0] : apprenticeData.ficha
    const programa = await getProgramByFicha(fichaNumber)

    const preparedData = {
      tipoUsuario: "aprendiz",
      nombre: apprenticeData.nombre?.trim() || "",
      apellido: apprenticeData.apellido?.trim() || "",
      documento: apprenticeData.documento?.trim() || "",
      tipoDocumento: apprenticeData.tipoDocumento || "CC",
      telefono: apprenticeData.telefono?.trim() || "",
      correo: apprenticeData.correo?.toLowerCase().trim() || "",
      contraseña: apprenticeData.contraseña || apprenticeData.documento,
      estado: apprenticeData.estado || "En formación",
      ficha: Array.isArray(apprenticeData.ficha) ? apprenticeData.ficha : [apprenticeData.ficha],
      nivel: Number(apprenticeData.nivel) || 1,
      programa: programa, // ✅ Programa obtenido automáticamente
      progresoActual: Number(apprenticeData.progresoActual) || 0,
      progresoNiveles: apprenticeData.progresoNiveles || [
        { nivel: 1, porcentaje: 0 },
        { nivel: 2, porcentaje: 0 },
        { nivel: 3, porcentaje: 0 },
      ],
      puntos: Number(apprenticeData.puntos) || 200,
    }

    console.log(`✅ [APPRENTICE SERVICE] Datos preparados con programa: ${programa}`)
    return preparedData
  } catch (error) {
    console.error("❌ [APPRENTICE SERVICE] Error preparando datos del aprendiz:", error)
    throw error
  }
}

/**
 * Obtiene todos los aprendices
 */
export const getAllApprentices = async (filters = {}) => {
  try {
    console.log("🔍 [APPRENTICE SERVICE] Obteniendo todos los aprendices...")

    const queryParams = new URLSearchParams()
    queryParams.append("tipoUsuario", "aprendiz")

    // Agregar filtros si existen
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value)
      }
    })

    const response = await fetch(`${API_URL}/user?${queryParams.toString()}`)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const apprentices = await response.json()
    console.log(`✅ [APPRENTICE SERVICE] ${apprentices.length} aprendices obtenidos`)
    return apprentices
  } catch (error) {
    console.error("❌ [APPRENTICE SERVICE] Error obteniendo aprendices:", error)
    throw error
  }
}

/**
 * Obtiene un aprendiz por ID
 */
export const getApprenticeById = async (id) => {
  try {
    console.log(`🔍 [APPRENTICE SERVICE] Obteniendo aprendiz con ID: ${id}`)

    const response = await fetch(`${API_URL}/user/${id}`)

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const apprentice = await response.json()
    console.log(`✅ [APPRENTICE SERVICE] Aprendiz obtenido: ${apprentice.nombre} ${apprentice.apellido}`)
    return apprentice
  } catch (error) {
    console.error(`❌ [APPRENTICE SERVICE] Error obteniendo aprendiz ${id}:`, error)
    throw error
  }
}

/**
 * Crea un nuevo aprendiz
 */
export const createApprentice = async (apprenticeData) => {
  try {
    console.log("🔄 [APPRENTICE SERVICE] Creando nuevo aprendiz...")

    // Preparar datos con programa automático
    const preparedData = await prepareApprenticeForSubmit(apprenticeData)

    const response = await fetch(`${API_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preparedData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Error ${response.status}`)
    }

    const newApprentice = await response.json()
    console.log(
      `✅ [APPRENTICE SERVICE] Aprendiz creado: ${newApprentice.nombre} ${newApprentice.apellido} - Programa: ${newApprentice.programa}`,
    )
    return newApprentice
  } catch (error) {
    console.error("❌ [APPRENTICE SERVICE] Error creando aprendiz:", error)
    throw error
  }
}

/**
 * Actualiza un aprendiz existente
 */
export const updateApprentice = async (id, apprenticeData) => {
  try {
    console.log(`🔄 [APPRENTICE SERVICE] Actualizando aprendiz ${id}...`)

    // Preparar datos con programa automático
    const preparedData = await prepareApprenticeForSubmit(apprenticeData)

    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preparedData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Error ${response.status}`)
    }

    const updatedApprentice = await response.json()
    console.log(
      `✅ [APPRENTICE SERVICE] Aprendiz actualizado: ${updatedApprentice.nombre} ${updatedApprentice.apellido} - Programa: ${updatedApprentice.programa}`,
    )
    return updatedApprentice
  } catch (error) {
    console.error(`❌ [APPRENTICE SERVICE] Error actualizando aprendiz ${id}:`, error)
    throw error
  }
}

/**
 * Elimina un aprendiz
 */
export const deleteApprentice = async (id) => {
  try {
    console.log(`🗑️ [APPRENTICE SERVICE] Eliminando aprendiz ${id}...`)

    const response = await fetch(`${API_URL}/user/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Error ${response.status}`)
    }

    console.log(`✅ [APPRENTICE SERVICE] Aprendiz eliminado exitosamente`)
    return true
  } catch (error) {
    console.error(`❌ [APPRENTICE SERVICE] Error eliminando aprendiz ${id}:`, error)
    throw error
  }
}

/**
 * Actualiza el progreso de un aprendiz
 */
export const updateApprenticeProgress = async (id, progressData) => {
  try {
    console.log(`🔄 [APPRENTICE SERVICE] Actualizando progreso del aprendiz ${id}...`)

    const response = await fetch(`${API_URL}/user/${id}/progress`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(progressData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Error ${response.status}`)
    }

    const updatedApprentice = await response.json()
    console.log(
      `✅ [APPRENTICE SERVICE] Progreso actualizado para: ${updatedApprentice.nombre} ${updatedApprentice.apellido}`,
    )
    return updatedApprentice
  } catch (error) {
    console.error(`❌ [APPRENTICE SERVICE] Error actualizando progreso del aprendiz ${id}:`, error)
    throw error
  }
}

/**
 * Actualiza los puntos de un aprendiz
 */
export const updateApprenticePoints = async (id, pointsData) => {
  try {
    console.log(`🔄 [APPRENTICE SERVICE] Actualizando puntos del aprendiz ${id}...`)

    const response = await fetch(`${API_URL}/user/${id}/points`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pointsData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Error ${response.status}`)
    }

    const updatedApprentice = await response.json()
    console.log(
      `✅ [APPRENTICE SERVICE] Puntos actualizados para: ${updatedApprentice.nombre} ${updatedApprentice.apellido}`,
    )
    return updatedApprentice
  } catch (error) {
    console.error(`❌ [APPRENTICE SERVICE] Error actualizando puntos del aprendiz ${id}:`, error)
    throw error
  }
}

/**
 * Obtiene estadísticas de aprendices
 */
export const getApprenticeStats = async () => {
  try {
    console.log("📊 [APPRENTICE SERVICE] Obteniendo estadísticas de aprendices...")

    const response = await fetch(`${API_URL}/user/stats?tipoUsuario=aprendiz`)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const stats = await response.json()
    console.log("✅ [APPRENTICE SERVICE] Estadísticas obtenidas:", stats)
    return stats
  } catch (error) {
    console.error("❌ [APPRENTICE SERVICE] Error obteniendo estadísticas:", error)
    throw error
  }
}

/**
 * Busca aprendices por término de búsqueda
 */
export const searchApprentices = async (searchTerm, filters = {}) => {
  try {
    console.log(`🔍 [APPRENTICE SERVICE] Buscando aprendices con término: "${searchTerm}"`)

    const queryParams = new URLSearchParams()
    queryParams.append("tipoUsuario", "aprendiz")

    if (searchTerm) {
      queryParams.append("search", searchTerm)
    }

    // Agregar filtros adicionales
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams.append(key, value)
      }
    })

    const response = await fetch(`${API_URL}/user?${queryParams.toString()}`)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const apprentices = await response.json()
    console.log(`✅ [APPRENTICE SERVICE] ${apprentices.length} aprendices encontrados`)
    return apprentices
  } catch (error) {
    console.error("❌ [APPRENTICE SERVICE] Error buscando aprendices:", error)
    throw error
  }
}
