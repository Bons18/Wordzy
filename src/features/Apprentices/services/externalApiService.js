// Servicio para consumir la API externa de aprendices

const EXTERNAL_API_URL = "https://sara-api-ingdanielbs-projects.vercel.app/api/v1/courses-students"
const API_KEY = "sara_d32775a2ea8a39a3.a14bb968e21a6be6821d19f2764945338ba182b972aff43732b0c7c8314d343a"

/**
 * Mapea los estados de la API externa a los estados locales
 */
const mapExternalStateToLocal = (externalState) => {
  const stateMapping = {
    "EN FORMACION": "En formación",
    CANCELADO: "Retirado",
    "RETIRO VOLUNTARIO": "Retirado",
    GRADUADO: "Graduado",
    CONDICIONADO: "Condicionado",
  }

  return stateMapping[externalState] || "En formación"
}

/**
 * Transforma un aprendiz de la API externa al formato local
 */
const transformExternalApprentice = (externalApprentice) => {
  // Asegurar que course_number sea un número
  const fichaNumber = Number.parseInt(externalApprentice.course_number)

  // Manejar teléfono vacío o inválido - ÚNICA CORRECCIÓN AQUÍ
  const telefono = externalApprentice.phone?.toString().trim() || "No especificado"

  return {
    // Campo obligatorio para el modelo unificado
    tipoUsuario: "aprendiz",

    // Campos básicos
    nombre: externalApprentice.name?.trim() || "",
    apellido: externalApprentice.last_name?.trim() || "",
    documento: externalApprentice.document?.toString().trim() || "",
    tipoDocumento: externalApprentice.document_type || "CC",
    telefono: telefono,
    correo: externalApprentice.email?.toLowerCase().trim() || "",
    contraseña: externalApprentice.document?.toString().trim() || "", // Contraseña igual al documento
    estado: mapExternalStateToLocal(externalApprentice.state),

    // Campos específicos de aprendices - FORMATO CORRECTO
    ficha: [fichaNumber], // Array con el número de ficha
    nivel: 1, // Nivel por defecto
    programa: "Programa por definir", // Programa por defecto
    progresoActual: 0,
    puntos: 200, // Puntos iniciales para todos los aprendices
    progresoNiveles: [
      { nivel: 1, porcentaje: 0 },
      { nivel: 2, porcentaje: 0 },
      { nivel: 3, porcentaje: 0 },
    ],

    // Campo adicional para tracking
    externalId: externalApprentice._id,
  }
}

/**
 * Obtiene una página específica de aprendices de la API externa
 */
const fetchApprenticesPage = async (page = 1) => {
  try {
    console.log(`Obteniendo página ${page} de la API externa...`)

    const response = await fetch(`${EXTERNAL_API_URL}?page=${page}`, {
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Error HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()

    if (!data.success) {
      throw new Error(data.message || "Error en la respuesta de la API")
    }

    return {
      apprentices: data.data || [],
      pagination: data.pagination || {},
    }
  } catch (error) {
    console.error(`Error obteniendo página ${page}:`, error)
    throw error
  }
}

/**
 * Descarga todos los aprendices de todas las páginas
 */
export const fetchAllExternalApprentices = async (onProgress = null) => {
  try {
    console.log("=== INICIANDO DESCARGA MASIVA DE APRENDICES ===")

    const allApprentices = []
    let totalPages = 1
    let totalItems = 0

    // Obtener primera página para conocer el total
    const firstPageData = await fetchApprenticesPage(1)
    totalPages = firstPageData.pagination.totalPages || 1
    totalItems = firstPageData.pagination.totalItems || 0

    console.log(`Total de páginas: ${totalPages}, Total de elementos: ${totalItems}`)

    // Procesar primera página
    const transformedFirstPage = firstPageData.apprentices.map(transformExternalApprentice)
    allApprentices.push(...transformedFirstPage)

    if (onProgress) {
      onProgress({
        current: 1,
        total: totalPages,
        percentage: (1 / totalPages) * 100,
        message: `Página 1 de ${totalPages}`,
        apprenticesCount: allApprentices.length,
      })
    }

    // Obtener páginas restantes
    for (let page = 2; page <= totalPages; page++) {
      try {
        const pageData = await fetchApprenticesPage(page)
        const transformedApprentices = pageData.apprentices.map(transformExternalApprentice)
        allApprentices.push(...transformedApprentices)

        if (onProgress) {
          onProgress({
            current: page,
            total: totalPages,
            percentage: (page / totalPages) * 100,
            message: `Página ${page} de ${totalPages}`,
            apprenticesCount: allApprentices.length,
          })
        }

        // Pequeña pausa para no sobrecargar la API
        await new Promise((resolve) => setTimeout(resolve, 100))
      } catch (error) {
        console.error(`Error en página ${page}:`, error)
        // Continuar con las siguientes páginas
      }
    }

    console.log(`=== DESCARGA COMPLETADA: ${allApprentices.length} aprendices ===`)
    return allApprentices
  } catch (error) {
    console.error("Error en descarga masiva:", error)
    throw error
  }
}

/**
 * Valida que un aprendiz transformado tenga todos los campos requeridos
 */
export const validateTransformedApprentice = (apprentice) => {
  const errors = []

  // Validaciones básicas
  if (!apprentice.tipoUsuario || apprentice.tipoUsuario !== "aprendiz") {
    errors.push("tipoUsuario debe ser 'aprendiz'")
  }

  if (!apprentice.nombre || apprentice.nombre.length < 2) {
    errors.push("nombre debe tener al menos 2 caracteres")
  }

  if (!apprentice.apellido || apprentice.apellido.length < 2) {
    errors.push("apellido debe tener al menos 2 caracteres")
  }

  if (!apprentice.documento || apprentice.documento.length < 6) {
    errors.push("documento debe tener al menos 6 caracteres")
  }

  if (!apprentice.tipoDocumento || !["CC", "TI", "PPT", "PEP"].includes(apprentice.tipoDocumento)) {
    errors.push("tipoDocumento debe ser CC, TI, PPT o PEP")
  }

  if (!apprentice.correo || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(apprentice.correo)) {
    errors.push("correo debe tener formato válido")
  }

  if (!apprentice.estado || !["En formación", "Condicionado", "Retirado", "Graduado"].includes(apprentice.estado)) {
    errors.push("estado debe ser válido para aprendices")
  }

  // Validaciones específicas de aprendices
  if (!Array.isArray(apprentice.ficha) || apprentice.ficha.length === 0) {
    errors.push("ficha debe ser un array con al menos un elemento")
  }

  if (typeof apprentice.nivel !== "number" || apprentice.nivel < 1 || apprentice.nivel > 3) {
    errors.push("nivel debe ser un número entre 1 y 3")
  }

  if (!apprentice.programa || apprentice.programa.length < 2) {
    errors.push("programa debe tener al menos 2 caracteres")
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
