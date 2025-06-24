const API_BASE_URL = "https://sara-api-ingdanielbs-projects.vercel.app/api/v1"
const LOCAL_API_BASE_URL = "http://localhost:3000/api"
const API_KEY = "sara_d32775a2ea8a39a3.a14bb968e21a6be6821d19f2764945338ba182b972aff43732b0c7c8314d343a"

const apiHeaders = {
  "Content-Type": "application/json",
  "x-api-key": API_KEY,
}

const localApiHeaders = {
  "Content-Type": "application/json",
}

// Servicio para obtener cursos (fichas) desde la API original
export const getCourses = async (page = 1, limit = 100) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: apiHeaders,
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching courses:", error)
    throw error
  }
}

// Servicio para obtener estudiantes (nombres) desde la API original
export const getStudents = async (page = 1, limit = 1000) => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses-students?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: apiHeaders,
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching students:", error)
    throw error
  }
}

// Servicio para obtener programas desde la API original
export const getPrograms = async (page = 1, limit = 100) => {
  try {
    const response = await fetch(`${API_BASE_URL}/programs?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: apiHeaders,
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching programs:", error)
    throw error
  }
}

// Servicio para obtener estudiantes con puntos desde la API local
export const getStudentPoints = async () => {
  try {
    const response = await fetch(`${LOCAL_API_BASE_URL}/user`, {
      method: "GET",
      headers: localApiHeaders,
    })

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    return {
      success: true,
      data: Array.isArray(data) ? data : [],
    }
  } catch (error) {
    console.error("❌ Error fetching student points:", error)
    return {
      success: false,
      data: [],
      error: error.message,
    }
  }
}

// Función helper para obtener nombre completo del estudiante
export const getStudentFullName = (student) => {
  if (student.nombre && student.apellido) {
    return `${student.nombre} ${student.apellido}`.trim()
  }
  if (student.name && student.last_name) {
    return `${student.name} ${student.last_name}`.trim()
  }
  return `Estudiante ${student.documento || student.document || "N/A"}`
}

// Función para obtener número de ficha del estudiante
export const getStudentCourseNumber = (student) => {
  // La API local tiene el campo "ficha" como array
  if (student.ficha && Array.isArray(student.ficha) && student.ficha.length > 0) {
    return student.ficha[0].toString()
  }
  // La API externa tiene "course_number"
  if (student.course_number) {
    return student.course_number.toString()
  }
  return "N/A"
}

// Servicio para obtener estudiantes por ficha específica desde la API local
export const getStudentsByCourse = async (courseNumber) => {
  try {
    const response = await getStudentPoints()

    if (response.success && response.data) {
      const filteredStudents = response.data.filter((student) => {
        const studentCourseNumber = getStudentCourseNumber(student)
        return studentCourseNumber === courseNumber.toString()
      })

      return {
        success: true,
        data: filteredStudents,
        message: `Estudiantes de la ficha ${courseNumber} obtenidos exitosamente`,
      }
    }

    return response
  } catch (error) {
    console.error("Error fetching students by course:", error)
    throw error
  }
}

// Servicio para obtener estudiantes por programa específico desde la API local
export const getStudentsByProgram = async (programCode) => {
  try {
    const response = await getStudentPoints()

    if (response.success && response.data) {
      // Por ahora filtrar por programa usando el campo "programa"
      const filteredStudents = response.data.filter((student) => {
        return student.programa && student.programa.toLowerCase().includes(programCode.toLowerCase())
      })

      return {
        success: true,
        data: filteredStudents,
        message: `Estudiantes del programa ${programCode} obtenidos exitosamente`,
      }
    }

    return response
  } catch (error) {
    console.error("Error fetching students by program:", error)
    throw error
  }
}

// Servicio para obtener métricas del ranking
export const getRankingMetrics = async () => {
  try {
    // Obtener estudiantes con puntos de la API local
    const pointsResponse = await getStudentPoints()

    if (!pointsResponse.success) {
      throw new Error("No se pudo conectar a la API local")
    }

    const studentsWithPoints = pointsResponse.data || []

    // Obtener datos adicionales de las APIs externas para métricas
    const [coursesResponse, programsResponse] = await Promise.all([
      getCourses(1, 1000).catch(() => ({ data: [] })),
      getPrograms(1, 1000).catch(() => ({ data: [] })),
    ])

    // Calcular métricas usando principalmente datos locales
    const uniqueFichas = new Set()
    studentsWithPoints.forEach((student) => {
      const courseNumber = getStudentCourseNumber(student)
      if (courseNumber !== "N/A") {
        uniqueFichas.add(courseNumber)
      }
    })

    const metrics = {
      aprendices: studentsWithPoints.length,
      fichas: uniqueFichas.size || coursesResponse?.data?.length || 0,
      programas: programsResponse?.data?.length || 0,
    }

    return {
      success: true,
      data: metrics,
      courses: coursesResponse.data || [],
      students: studentsWithPoints,
      programs: programsResponse.data || [],
      pointsData: studentsWithPoints,
    }
  } catch (error) {
    console.error("❌ Error fetching ranking metrics:", error)
    throw error
  }
}

// Función para generar ranking real basado en datos de la API local
export const generateRealRanking = (students, type = "general", filterValue = null) => {
  if (!students || students.length === 0) {
    return []
  }

  let filteredStudents = [...students]

  // Filtrar solo estudiantes activos
  filteredStudents = filteredStudents.filter(
    (student) =>
      student.estado === "En formación" ||
      student.estado === "Activo" ||
      (!student.estado && student.estado !== "Retirado"),
  )

  // Aplicar filtros específicos
  if (type === "ficha" && filterValue) {
    filteredStudents = filteredStudents.filter((student) => {
      const courseNumber = getStudentCourseNumber(student)
      return courseNumber === filterValue.toString()
    })
  } else if (type === "programa" && filterValue) {
    filteredStudents = filteredStudents.filter((student) => {
      return student.programa && student.programa.toLowerCase().includes(filterValue.toLowerCase())
    })
  }

  // Mapear a formato de ranking - ASEGURAR QUE LOS PUNTOS SE MANTENGAN
  const rankingData = filteredStudents.map((student) => {
    const studentData = {
      nombre: getStudentFullName(student),
      puntos: Number.parseInt(student.puntos) || 0, // ASEGURAR QUE SEA NÚMERO
      ficha: getStudentCourseNumber(student),
      programa: student.programa || "N/A",
      estado: student.estado || "N/A",
      documento: student.documento || "N/A",
      nivel: student.nivel || 1,
      progreso: student.progresoActual || 0,
    }

    // Debug: verificar que los puntos se asignen correctamente
    console.log(`🎯 Student mapped: ${studentData.nombre} -> ${studentData.puntos} points`)

    return studentData
  })

  // Ordenar por puntos de mayor a menor, luego por nombre para desempatar
  const sortedRanking = rankingData
    .sort((a, b) => {
      if (b.puntos !== a.puntos) {
        return b.puntos - a.puntos
      }
      return a.nombre.localeCompare(b.nombre)
    })
    .map((student, index) => ({
      ...student,
      posicion: index + 1,
    }))

  console.log(`🏆 Final ranking generated: ${sortedRanking.length} students`)
  console.log(
    `🎯 Top 3 with points:`,
    sortedRanking.slice(0, 3).map((s) => `${s.nombre}: ${s.puntos} pts`),
  )

  return sortedRanking
}
