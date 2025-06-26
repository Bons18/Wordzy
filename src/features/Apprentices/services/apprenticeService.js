// Servicio para operaciones relacionadas con aprendices en la tabla usuarios

/**
 * Prepara los datos del aprendiz antes de enviarlos a la API
 */
export const prepareApprenticeForSubmit = (apprenticeData) => {
  return {
    tipoUsuario: "aprendiz", // Campo obligatorio para identificar el tipo
    nombre: apprenticeData.nombre?.trim(),
    apellido: apprenticeData.apellido?.trim(),
    documento: apprenticeData.documento?.trim(),
    tipoDocumento: apprenticeData.tipoDocumento,
    ficha: Array.isArray(apprenticeData.ficha) ? apprenticeData.ficha : [apprenticeData.ficha],
    nivel: Number.parseInt(apprenticeData.nivel) || 1,
    estado: apprenticeData.estado || "En formación",
    telefono: apprenticeData.telefono?.trim(),
    programa: apprenticeData.programa?.trim(),
    correo: apprenticeData.correo?.trim().toLowerCase(),
    progresoActual: Number.parseInt(apprenticeData.progresoActual) || 0,
    progresoNiveles: apprenticeData.progresoNiveles || [
      { nivel: 1, porcentaje: 0 },
      { nivel: 2, porcentaje: 0 },
      { nivel: 3, porcentaje: 0 },
    ],
  }
}

/**
 * Valida los datos del aprendiz antes de enviarlos
 */
export const validateApprentice = (apprenticeData) => {
  const errors = []

  if (!apprenticeData.nombre?.trim()) {
    errors.push("El nombre es obligatorio")
  }

  if (!apprenticeData.apellido?.trim()) {
    errors.push("El apellido es obligatorio")
  }

  if (!apprenticeData.documento?.trim()) {
    errors.push("El documento es obligatorio")
  }

  if (!apprenticeData.tipoDocumento) {
    errors.push("El tipo de documento es obligatorio")
  }

  if (!apprenticeData.correo?.trim()) {
    errors.push("El correo es obligatorio")
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(apprenticeData.correo)) {
      errors.push("El formato del correo no es válido")
    }
  }

  if (!apprenticeData.telefono?.trim()) {
    errors.push("El teléfono es obligatorio")
  }

  if (!apprenticeData.programa?.trim()) {
    errors.push("El programa es obligatorio")
  }

  if (!apprenticeData.ficha || (Array.isArray(apprenticeData.ficha) && apprenticeData.ficha.length === 0)) {
    errors.push("La ficha es obligatoria")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Normaliza un aprendiz recibido de la API de usuarios
 */
export const normalizeApprentice = (apprentice) => {
  return {
    ...apprentice,
    id: apprentice._id || apprentice.id,
    tipoUsuario: "aprendiz", // Asegurar que siempre tenga el tipo correcto
    ficha: Array.isArray(apprentice.ficha) ? apprentice.ficha : [apprentice.ficha],
    progresoNiveles: apprentice.progresoNiveles || [
      { nivel: 1, porcentaje: 0 },
      { nivel: 2, porcentaje: 0 },
      { nivel: 3, porcentaje: 0 },
    ],
  }
}

/**
 * Normaliza una lista de aprendices recibida de la API de usuarios
 */
export const normalizeApprentices = (apprentices) => {
  return apprentices
    .filter((user) => user.tipoUsuario === "aprendiz") // Filtro adicional por seguridad
    .map(normalizeApprentice)
}

/**
 * Calcula el progreso general basado en los niveles
 */
export const calculateOverallProgress = (progresoNiveles) => {
  if (!Array.isArray(progresoNiveles) || progresoNiveles.length === 0) {
    return 0
  }

  const totalProgress = progresoNiveles.reduce((sum, nivel) => sum + nivel.porcentaje, 0)
  return Math.round(totalProgress / progresoNiveles.length)
}

/**
 * Actualiza el progreso de un nivel específico
 */
export const updateLevelProgress = (progresoNiveles, nivel, nuevoPorcentaje) => {
  return progresoNiveles.map((progreso) =>
    progreso.nivel === nivel ? { ...progreso, porcentaje: Math.max(0, Math.min(100, nuevoPorcentaje)) } : progreso,
  )
}

/**
 * Crea un nuevo aprendiz en la tabla usuarios
 */
export const createApprentice = async (apprenticeData) => {
  try {
    const preparedData = prepareApprenticeForSubmit(apprenticeData)
    const validation = validateApprentice(preparedData)

    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "))
    }

    const response = await fetch("http://localhost:3000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preparedData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al crear aprendiz")
    }

    const data = await response.json()
    return normalizeApprentice(data)
  } catch (error) {
    console.error("Error en createApprentice:", error)
    throw error
  }
}

/**
 * Actualiza un aprendiz en la tabla usuarios
 */
export const updateApprentice = async (id, apprenticeData) => {
  try {
    const preparedData = prepareApprenticeForSubmit(apprenticeData)
    const validation = validateApprentice(preparedData)

    if (!validation.isValid) {
      throw new Error(validation.errors.join(", "))
    }

    const response = await fetch(`http://localhost:3000/api/user/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preparedData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al actualizar aprendiz")
    }

    const data = await response.json()
    return normalizeApprentice(data)
  } catch (error) {
    console.error("Error en updateApprentice:", error)
    throw error
  }
}

/**
 * Elimina un aprendiz de la tabla usuarios
 */
export const deleteApprentice = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/user/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al eliminar aprendiz")
    }

    return await response.json()
  } catch (error) {
    console.error("Error en deleteApprentice:", error)
    throw error
  }
}

/**
 * Actualiza el progreso de un aprendiz
 */
export const updateApprenticeProgress = async (id, progresoNiveles) => {
  try {
    const response = await fetch(`http://localhost:3000/api/user/${id}/progress`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ progresoNiveles }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Error al actualizar progreso")
    }

    const data = await response.json()
    return normalizeApprentice(data)
  } catch (error) {
    console.error("Error en updateApprenticeProgress:", error)
    throw error
  }
}
