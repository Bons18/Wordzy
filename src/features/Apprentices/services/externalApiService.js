// Configuración desde variables de entorno (obligatorias)
const EXTERNAL_API_URL = import.meta.env.VITE_EXTERNAL_API_URL
const EXTERNAL_API_KEY = import.meta.env.VITE_EXTERNAL_API_KEY
const LOCAL_API_URL = import.meta.env.VITE_LOCAL_DB_URL

// Validar que las variables de entorno estén configuradas
if (!EXTERNAL_API_URL) {
  throw new Error("VITE_EXTERNAL_API_URL no está configurada en el archivo .env")
}

if (!EXTERNAL_API_KEY) {
  throw new Error("VITE_EXTERNAL_API_KEY no está configurada en el archivo .env")
}

if (!LOCAL_API_URL) {
  throw new Error("VITE_LOCAL_DB_URL no está configurada en el archivo .env")
}

// Configuración de headers para la API externa
const getExternalApiHeaders = () => ({
  "x-api-key": EXTERNAL_API_KEY,
  "Content-Type": "application/json",
})

/**
 * Busca el rol de "Aprendiz" en la API local
 */
const findApprenticeRole = async () => {
  try {
    console.log("🔍 Buscando rol de Aprendiz...")
    const response = await fetch(`${LOCAL_API_URL}/role`)

    if (!response.ok) {
      throw new Error(`Error al obtener roles: ${response.status}`)
    }

    const roles = await response.json()
    const apprenticeRole = roles.find((role) => role.name === "Aprendiz" && role.status === true)

    if (!apprenticeRole) {
      throw new Error("No se encontró el rol 'Aprendiz' activo. Asegúrese de que esté creado en el sistema.")
    }

    console.log(`✅ Rol de Aprendiz encontrado: ${apprenticeRole._id}`)
    return apprenticeRole._id
  } catch (error) {
    console.error("❌ Error al buscar rol de Aprendiz:", error)
    throw error
  }
}

/**
 * Obtiene una página específica de estudiantes de la API externa
 */
export const fetchStudentsPage = async (page = 1) => {
  try {
    const url = `${EXTERNAL_API_URL}/courses-students?page=${page}`
    console.log(`🔍 Obteniendo página ${page} de estudiantes desde: ${url}`)

    const response = await fetch(url, {
      headers: getExternalApiHeaders(),
    })

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log(`📊 Respuesta de página ${page}:`, {
      success: data.success,
      totalPages: data.pagination?.totalPages,
      totalItems: data.pagination?.totalItems,
      currentPage: data.pagination?.currentPage,
      dataLength: data.data?.length,
      sampleData: data.data?.[0], // Mostrar primer elemento como muestra
    })

    return data
  } catch (error) {
    console.error(`❌ Error obteniendo página ${page}:`, error)
    throw error
  }
}

/**
 * Obtiene todos los estudiantes de todas las páginas
 */
export const fetchAllExternalApprentices = async (onProgress = null) => {
  try {
    console.log("=== 🚀 INICIANDO DESCARGA DE APRENDICES EXTERNOS ===")

    // Primero obtener el ID del rol de Aprendiz
    const apprenticeRoleId = await findApprenticeRole()

    let allStudents = []
    let currentPage = 1
    let totalPages = 1

    // Obtener primera página para conocer el total
    const firstPageData = await fetchStudentsPage(1)

    if (!firstPageData.success) {
      throw new Error(`API externa devolvió error: ${firstPageData.message || "Error desconocido"}`)
    }

    totalPages = firstPageData.pagination?.totalPages || 1
    const totalItems = firstPageData.pagination?.totalItems || 0

    console.log(`📈 Total de páginas: ${totalPages}`)
    console.log(`📈 Total de estudiantes: ${totalItems}`)

    // Procesar todas las páginas
    for (currentPage = 1; currentPage <= totalPages; currentPage++) {
      try {
        const pageData = currentPage === 1 ? firstPageData : await fetchStudentsPage(currentPage)

        if (pageData.success && pageData.data && Array.isArray(pageData.data)) {
          console.log(`📄 Procesando página ${currentPage} con ${pageData.data.length} estudiantes`)

          // Transformar estudiantes de esta página
          const transformedStudents = pageData.data
            .map((student, index) => {
              try {
                return transformExternalStudent(student, apprenticeRoleId)
              } catch (error) {
                console.error(`❌ Error transformando estudiante ${index}:`, error, student)
                return null
              }
            })
            .filter(Boolean) // Filtrar elementos null

          allStudents = allStudents.concat(transformedStudents)

          // Reportar progreso
          if (onProgress) {
            onProgress({
              message: `Descargando página ${currentPage} de ${totalPages}...`,
              percentage: (currentPage / totalPages) * 100,
              apprenticesCount: allStudents.length,
            })
          }

          console.log(`✅ Página ${currentPage}/${totalPages} procesada. Estudiantes acumulados: ${allStudents.length}`)
        } else {
          console.warn(`⚠️ Página ${currentPage} no contiene datos válidos:`, pageData)
        }

        // Pequeña pausa para no sobrecargar la API
        if (currentPage < totalPages) {
          await new Promise((resolve) => setTimeout(resolve, 100))
        }
      } catch (error) {
        console.error(`❌ Error procesando página ${currentPage}:`, error)
        // Continuar con la siguiente página en caso de error
      }
    }

    console.log(`=== ✅ DESCARGA COMPLETADA: ${allStudents.length} estudiantes transformados ===`)

    // Mostrar muestra de datos transformados
    if (allStudents.length > 0) {
      console.log("🔍 Muestra de estudiante transformado:", allStudents[0])
    }

    return allStudents
  } catch (error) {
    console.error("❌ Error en descarga masiva:", error)
    throw error
  }
}

/**
 * Transforma un estudiante de la API externa al formato local
 */
const transformExternalStudent = (externalStudent, roleId) => {
  console.log("🔄 Transformando estudiante:", externalStudent)

  // Validar que el estudiante tenga los campos mínimos requeridos
  if (!externalStudent.document) {
    throw new Error("Estudiante sin documento")
  }

  if (!externalStudent.name || !externalStudent.last_name) {
    throw new Error("Estudiante sin nombre o apellido")
  }

  // Asegurar que course_number sea un número
  const fichaNumber = Number.parseInt(externalStudent.course_number)

  // Manejar teléfono vacío o inválido
  const telefono = externalStudent.phone?.toString().trim() || "No especificado"

  const transformed = {
    // Campo obligatorio para el modelo unificado
    tipoUsuario: "aprendiz",

    // Campos básicos del usuario
    nombre: externalStudent.name?.trim() || "",
    apellido: externalStudent.last_name?.trim() || "",
    documento: externalStudent.document?.toString().trim() || "",
    tipoDocumento: externalStudent.document_type || "CC",
    telefono: telefono,
    correo: externalStudent.email?.toLowerCase().trim() || `${externalStudent.document}@temp.com`,
    contraseña: externalStudent.document?.toString().trim() || "", // Contraseña igual al documento
    estado: mapExternalStatus(externalStudent.state),

    // NUEVO: Vinculación con rol
    role: roleId, // ID del rol de Aprendiz

    // Campos específicos de aprendices - FORMATO CORRECTO
    ficha: [fichaNumber], // Array con el número de ficha
    nivel: 1, // Nivel por defecto
    programa: externalStudent.course_name || "Programa por definir",
    progresoActual: 0,
    puntos: 200, // Puntos iniciales para todos los aprendices
    progresoNiveles: [
      { nivel: 1, porcentaje: 0 },
      { nivel: 2, porcentaje: 0 },
      { nivel: 3, porcentaje: 0 },
    ],

    // Campo adicional para tracking
    externalId: externalStudent._id,
  }

  console.log("✅ Estudiante transformado:", transformed)
  return transformed
}

/**
 * Mapea el estado de la API externa al formato local
 */
const mapExternalStatus = (externalStatus) => {
  const statusMap = {
    "EN FORMACION": "En formación",
    CANCELADO: "Retirado",
    "RETIRO VOLUNTARIO": "Retirado",
    GRADUADO: "Graduado",
    CONDICIONADO: "Condicionado",
    // Fallbacks adicionales
    active: "En formación",
    inactive: "Retirado",
    graduated: "Graduado",
    conditional: "Condicionado",
  }

  return statusMap[externalStatus] || "En formación"
}

/**
 * Valida un aprendiz transformado
 */
export const validateTransformedApprentice = (apprentice) => {
  const errors = []

  // Validaciones básicas
  if (!apprentice.tipoUsuario || apprentice.tipoUsuario !== "aprendiz") {
    errors.push("tipoUsuario debe ser 'aprendiz'")
  }

  if (!apprentice.nombre || apprentice.nombre.trim().length < 2) {
    errors.push("Nombre inválido o muy corto")
  }

  if (!apprentice.apellido || apprentice.apellido.trim().length < 2) {
    errors.push("Apellido inválido o muy corto")
  }

  if (!apprentice.documento || apprentice.documento.trim().length < 6) {
    errors.push("Documento inválido o muy corto")
  }

  if (!apprentice.correo || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(apprentice.correo)) {
    errors.push("Correo inválido")
  }

  if (!apprentice.estado || !["En formación", "Condicionado", "Retirado", "Graduado"].includes(apprentice.estado)) {
    errors.push("Estado debe ser válido para aprendices")
  }

  // Validación del rol
  if (!apprentice.role || typeof apprentice.role !== "string") {
    errors.push("role debe ser un ID válido")
  }

  // Validaciones específicas de aprendices
  if (!Array.isArray(apprentice.ficha) || apprentice.ficha.length === 0) {
    errors.push("Ficha debe ser un array con al menos un elemento")
  }

  if (typeof apprentice.nivel !== "number" || apprentice.nivel < 1 || apprentice.nivel > 3) {
    errors.push("Nivel debe ser un número entre 1 y 3")
  }

  if (!apprentice.programa || apprentice.programa.length < 2) {
    errors.push("Programa debe tener al menos 2 caracteres")
  }

  if (!Array.isArray(apprentice.progresoNiveles) || apprentice.progresoNiveles.length !== 3) {
    errors.push("progresoNiveles debe ser un array con 3 elementos")
  }

  // Validar teléfono (permitir "No especificado" como valor por defecto)
  if (!apprentice.telefono || apprentice.telefono.trim().length === 0) {
    errors.push("telefono es requerido")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Verifica la conectividad con la API externa
 */
export const checkExternalApiConnectivity = async () => {
  try {
    console.log("🔍 Verificando conectividad con API externa...")
    const response = await fetch(`${EXTERNAL_API_URL}/courses-students?page=1`, {
      headers: getExternalApiHeaders(),
    })

    const result = {
      success: response.ok,
      status: response.status,
      message: response.ok ? "Conectado" : `Error HTTP ${response.status}`,
    }

    console.log("📡 Resultado conectividad API externa:", result)
    return result
  } catch (error) {
    console.error("❌ Error verificando API externa:", error)
    return {
      success: false,
      status: 0,
      message: error.message,
    }
  }
}

/**
 * Verifica la conectividad con la API local
 */
export const checkLocalApiConnectivity = async () => {
  try {
    console.log("🔍 Verificando conectividad con API local...")
    const response = await fetch(`${LOCAL_API_URL}/user`)

    const result = {
      success: response.ok,
      status: response.status,
      message: response.ok ? "Conectado" : `Error HTTP ${response.status}`,
    }

    console.log("📡 Resultado conectividad API local:", result)
    return result
  } catch (error) {
    console.error("❌ Error verificando API local:", error)
    return {
      success: false,
      status: 0,
      message: error.message,
    }
  }
}
