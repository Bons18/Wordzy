// Este archivo contendrá funciones auxiliares para trabajar con evaluaciones

// Función para preparar una evaluación antes de enviarla a la API
export const prepareEvaluationForSubmit = (formData) => {
  // Copia profunda para no modificar el original
  const preparedData = JSON.parse(JSON.stringify(formData))

  // Aquí puedes hacer transformaciones necesarias
  // Por ejemplo, agregar timestamps, asegurar que los IDs son adecuados, etc.

  // Asegurarse de que cada pregunta tenga un ID único
  preparedData.preguntas = preparedData.preguntas.map((pregunta) => {
    // Si no tiene ID o se está creando nueva, asignar uno
    if (!pregunta.id) {
      pregunta.id = Date.now() + Math.random().toString(36).substring(2, 9)
    }
    return pregunta
  })

  return preparedData
}

// Función para convertir _id de MongoDB a id para compatibilidad
export const normalizeEvaluation = (evaluation) => {
  if (!evaluation) return null

  return {
    ...evaluation,
    id: evaluation._id || evaluation.id, // Asegurar que siempre haya un id para la UI
  }
}

// Función para normalizar un array de evaluaciones
export const normalizeEvaluations = (evaluations) => {
  if (!evaluations) return []

  return evaluations.map((evaluation) => normalizeEvaluation(evaluation))
}

// Esta función validará una evaluación antes de enviarla
export const validateEvaluation = (evaluation) => {
  const errors = []

  // Validar campos obligatorios
  if (!evaluation.nombre || evaluation.nombre.trim() === "") {
    errors.push("El nombre es obligatorio")
  }

  if (!evaluation.tematica || evaluation.tematica.trim() === "") {
    errors.push("La temática es obligatoria")
  }

  // Validar que las preguntas tengan un puntaje total de 100
  const totalPoints = evaluation.preguntas.reduce((sum, pregunta) => sum + Number(pregunta.puntaje), 0)
  if (totalPoints !== 100) {
    errors.push(`El puntaje total debe ser 100. Actualmente es ${totalPoints}`)
  }

  // Validar cada pregunta
  evaluation.preguntas.forEach((pregunta, index) => {
    if (pregunta.tipo === "seleccion" || pregunta.tipo === "imagen" || pregunta.tipo === "audio") {
      // Verificar que todas las opciones tengan contenido
      if (pregunta.opciones.some((opcion) => !opcion || opcion.trim() === "")) {
        errors.push(`Pregunta ${index + 1}: Todas las opciones deben tener contenido`)
      }
    }

    if (pregunta.tipo === "completar") {
      // Verificar que haya al menos un espacio para completar
      const matches = (pregunta.completarTexto || "").match(/\[\s*\]/g) || []
      if (matches.length === 0) {
        errors.push(`Pregunta ${index + 1}: Debe incluir al menos un espacio para completar usando []`)
      }

      // Verificar que todas las palabras a completar tengan contenido
      if (pregunta.palabrasCompletar.some((palabra) => !palabra || palabra.trim() === "")) {
        errors.push(`Pregunta ${index + 1}: Todas las palabras a completar deben tener contenido`)
      }
    }
  })

  return {
    isValid: errors.length === 0,
    errors,
  }
}
