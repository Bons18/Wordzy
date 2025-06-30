// Configuración centralizada de la API
const API_BASE_URL = import.meta.env.VITE_LOCAL_DB_URL

// Validar que la variable de entorno esté configurada
if (!API_BASE_URL) {
  throw new Error("VITE_LOCAL_DB_URL no está configurada en el archivo .env")
}

// Endpoints de la API - AJUSTADOS PARA LA NUEVA URL BASE
export const API_ENDPOINTS = {
  // Usuarios
  USERS: `${API_BASE_URL}/user`,
  USER_BY_ID: (id) => `${API_BASE_URL}/user/${id}`,

  // Aprendices
  APPRENTICES: `${API_BASE_URL}/apprentice`,
  APPRENTICE_BY_ID: (id) => `${API_BASE_URL}/apprentice/${id}`,

  // Instructores
  INSTRUCTORS: `${API_BASE_URL}/instructor`,
  INSTRUCTOR_BY_ID: (id) => `${API_BASE_URL}/instructor/${id}`,

  // Evaluaciones
  EVALUATIONS: `${API_BASE_URL}/evaluation`,
  EVALUATION_BY_ID: (id) => `${API_BASE_URL}/evaluation/${id}`,

  // Roles
  ROLES: `${API_BASE_URL}/role`,
  ROLE_BY_ID: (id) => `${API_BASE_URL}/role/${id}`,

  // Temas
  TOPICS: `${API_BASE_URL}/topic`,
  TOPIC_BY_ID: (id) => `${API_BASE_URL}/topic/${id}`,

  // Programas
  PROGRAMS: `${API_BASE_URL}/program`,
  PROGRAM_BY_ID: (id) => `${API_BASE_URL}/program/${id}`,

  // Cursos/Fichas
  COURSES: `${API_BASE_URL}/course`,
  COURSE_BY_ID: (id) => `${API_BASE_URL}/course/${id}`,

  // Programación de cursos
  COURSE_PROGRAMMING: `${API_BASE_URL}/course-programming`,
  COURSE_PROGRAMMING_BY_ID: (id) => `${API_BASE_URL}/course-programming/${id}`,

  // Material de apoyo
  SUPPORT_MATERIALS: `${API_BASE_URL}/support-materials`,
  SUPPORT_MATERIAL_BY_ID: (id) => `${API_BASE_URL}/support-materials/${id}`,

  // Uploads
  UPLOADS: `${API_BASE_URL}/upload`,

  // Escalas
  SCALES: `${API_BASE_URL}/scales`,
  SCALE_BY_ID: (id) => `${API_BASE_URL}/scales/${id}`,
}

// Configuración de headers por defecto
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
}

// Función helper para hacer requests con manejo de errores
export const apiRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: DEFAULT_HEADERS,
      ...options,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `Error HTTP ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error en request a ${url}:`, error)
    throw error
  }
}
