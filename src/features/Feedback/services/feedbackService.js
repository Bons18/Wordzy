// Servicio para manejar las operaciones de retroalimentación
const API_BASE_URL = "https://sara-api-ingdanielbs-projects.vercel.app/api/v1"

// Función para obtener las fichas desde la API real
export const getFichasFromAPI = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`)
    }
    const data = await response.json()

    // Extraer los códigos de ficha y crear el formato necesario
    const fichas = data.map((course) => ({
      value: course.code,
      label: `Ficha ${course.code}`,
      programa: course.name || "Programa no especificado",
    }))

    // Ordenar por código de ficha
    return fichas.sort((a, b) => {
      const numA = Number.parseInt(a.value) || 0
      const numB = Number.parseInt(b.value) || 0
      return numA - numB
    })
  } catch (error) {
    console.error("Error al obtener fichas de la API:", error)
    // Fallback con datos mock si la API falla
    return [
      { value: "2669742", label: "Ficha 2669742", programa: "ADSO" },
      { value: "2669743", label: "Ficha 2669743", programa: "ADSO" },
      { value: "2669744", label: "Ficha 2669744", programa: "Multimedia" },
      { value: "2669745", label: "Ficha 2669745", programa: "Redes" },
    ]
  }
}

// Datos mock para instructores
export const getInstructors = () => {
  return [
    { nombre: "Ana García", especialidad: "Inglés Técnico" },
    { nombre: "Carlos Rodríguez", especialidad: "Inglés Conversacional" },
    { nombre: "María López", especialidad: "Inglés Empresarial" },
    { nombre: "Juan Martínez", especialidad: "Inglés General" },
    { nombre: "Laura Sánchez", especialidad: "Inglés Técnico" },
  ]
}

// Datos mock para niveles
export const getNiveles = () => {
  return ["Básico", "Intermedio", "Avanzado"]
}

// Función para buscar datos de retroalimentación basado en filtros
export const searchFeedbackData = async (filters) => {
  try {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Datos mock de retroalimentación
    const mockData = [
      {
        id: 1,
        programa: "ADSO",
        ficha: "2669742",
        nivel: "Básico",
        tema: "Present Simple",
        actividad: "Grammar Exercise 1",
        ejecutada: "Sí",
        instructor: "Ana García",
        fecha: "2024-01-15",
        totalPreguntas: 20,
        aprendicesPresentes: 25,
      },
      {
        id: 2,
        programa: "ADSO",
        ficha: "2669742",
        nivel: "Básico",
        tema: "Vocabulary Building",
        actividad: "Word Association",
        ejecutada: "No",
        instructor: "Ana García",
        fecha: "2024-01-16",
        totalPreguntas: 15,
        aprendicesPresentes: 23,
      },
      {
        id: 3,
        programa: "Multimedia",
        ficha: "2669744",
        nivel: "Intermedio",
        tema: "Past Tense",
        actividad: "Story Telling",
        ejecutada: "Sí",
        instructor: "Carlos Rodríguez",
        fecha: "2024-01-17",
        totalPreguntas: 25,
        aprendicesPresentes: 28,
      },
      {
        id: 4,
        programa: "Redes",
        ficha: "2669745",
        nivel: "Avanzado",
        tema: "Technical English",
        actividad: "Network Terminology",
        ejecutada: "Sí",
        instructor: "María López",
        fecha: "2024-01-18",
        totalPreguntas: 30,
        aprendicesPresentes: 20,
      },
      {
        id: 5,
        programa: "ADSO",
        ficha: "2669743",
        nivel: "Intermedio",
        tema: "Future Tense",
        actividad: "Planning Activities",
        ejecutada: "No",
        instructor: "Juan Martínez",
        fecha: "2024-01-19",
        totalPreguntas: 18,
        aprendicesPresentes: 26,
      },
    ]

    // Filtrar datos basado en los filtros aplicados
    let filteredData = mockData

    if (filters.ficha) {
      filteredData = filteredData.filter((item) => item.ficha === filters.ficha)
    }

    if (filters.nivel) {
      filteredData = filteredData.filter((item) => item.nivel === filters.nivel)
    }

    if (filters.instructor) {
      filteredData = filteredData.filter((item) => item.instructor === filters.instructor)
    }

    return filteredData
  } catch (error) {
    console.error("Error al buscar datos de retroalimentación:", error)
    throw new Error("Error al obtener los datos de retroalimentación")
  }
}

// Función para obtener detalles de estudiantes para una actividad específica
export const getStudentDetails = async (feedbackId) => {
  try {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Generar datos mock de estudiantes basado en el ID de retroalimentación
    const baseStudents = [
      "Juan Pérez",
      "María González",
      "Carlos López",
      "Ana Martínez",
      "Luis Rodríguez",
      "Carmen Sánchez",
      "Pedro Jiménez",
      "Laura Fernández",
      "Miguel Torres",
      "Isabel Ruiz",
      "Francisco Morales",
      "Elena Vargas",
      "Roberto Castro",
      "Patricia Ortega",
      "Daniel Ramos",
      "Lucía Herrera",
      "Andrés Delgado",
      "Cristina Peña",
      "Javier Guerrero",
      "Mónica Vega",
      "Alejandro Mendoza",
      "Beatriz Aguilar",
      "Raúl Medina",
      "Silvia Romero",
      "Emilio Navarro",
    ]

    const fichas = ["2669742", "2669743", "2669744", "2669745"]
    const estados = ["Presente", "Ausente"]
    const horas = ["08:00", "10:00", "14:00", "16:00"]

    // Generar entre 20-25 estudiantes
    const numStudents = Math.floor(Math.random() * 6) + 20
    const students = []

    for (let i = 0; i < numStudents; i++) {
      const isPresent = Math.random() > 0.15 // 85% probabilidad de estar presente
      const calificacion = isPresent
        ? (Math.random() * 2 + 3).toFixed(1) // Entre 3.0 y 5.0 si está presente
        : "0.0" // 0.0 si está ausente

      students.push({
        id: i + 1,
        aprendiz: baseStudents[i % baseStudents.length] + ` ${i + 1}`,
        ficha: fichas[Math.floor(Math.random() * fichas.length)],
        hora: horas[Math.floor(Math.random() * horas.length)],
        estado: isPresent ? "Presente" : "Ausente",
        calificacion: calificacion,
        preguntasFalladas: isPresent ? Math.floor(Math.random() * 5) : 0,
        observaciones: isPresent ? "Participación activa" : "No asistió a clase",
      })
    }

    return students.sort((a, b) => a.aprendiz.localeCompare(b.aprendiz))
  } catch (error) {
    console.error("Error al obtener detalles de estudiantes:", error)
    throw new Error("Error al cargar los detalles de los estudiantes")
  }
}

// Función para obtener preguntas falladas de un estudiante
export const getStudentFailedQuestions = async (studentId, feedbackId) => {
  try {
    // Simular delay de API
    await new Promise((resolve) => setTimeout(resolve, 800))

    const questionTypes = ["Grammar", "Vocabulary", "Reading Comprehension", "Listening", "Speaking"]

    const questionTemplates = {
      Grammar: [
        "Choose the correct form of the verb 'to be'",
        "Complete the sentence with the correct tense",
        "Identify the grammatical error in the sentence",
        "Select the appropriate preposition",
      ],
      Vocabulary: [
        "What is the meaning of the word",
        "Choose the synonym for",
        "Complete the sentence with the correct word",
        "Match the word with its definition",
      ],
      "Reading Comprehension": [
        "According to the text, what is",
        "The main idea of the paragraph is",
        "Which statement is true based on the reading",
        "What can be inferred from the passage",
      ],
      Listening: [
        "What did the speaker say about",
        "The conversation takes place in",
        "How does the speaker feel about",
        "What is the speaker's opinion on",
      ],
      Speaking: [
        "Describe your daily routine using present simple",
        "Talk about your future plans",
        "Express your opinion about",
        "Compare and contrast two different topics",
      ],
    }

    // Generar entre 3-8 preguntas falladas
    const numQuestions = Math.floor(Math.random() * 6) + 3
    const failedQuestions = []

    for (let i = 0; i < numQuestions; i++) {
      const type = questionTypes[Math.floor(Math.random() * questionTypes.length)]
      const templates = questionTemplates[type]
      const question = templates[Math.floor(Math.random() * templates.length)]

      failedQuestions.push({
        id: i + 1,
        numero: i + 1,
        tipo: type,
        pregunta: `${question} ${i + 1}?`,
        respuestaCorrecta: `Correct answer for question ${i + 1}`,
        respuestaEstudiante: `Student's incorrect answer ${i + 1}`,
        puntos: Math.floor(Math.random() * 3) + 1, // 1-3 puntos
        observacion: `Needs to review ${type.toLowerCase()} concepts`,
      })
    }

    return failedQuestions
  } catch (error) {
    console.error("Error al obtener preguntas falladas:", error)
    throw new Error("Error al cargar las preguntas falladas")
  }
}
