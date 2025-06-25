/**
 * Servicio de API para instructores
 * Maneja todas las comunicaciones con el backend
 */

// Configuración de API
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

/**
 * Obtiene todos los instructores del servidor
 * @returns {Promise<Array>} Lista de instructores
 */
export const getAllInstructors = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/usuarios?tipoUsuario=instructor`)

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`)
    }

    const instructors = await response.json()
    return instructors
  } catch (error) {
    console.error("Error obteniendo instructores:", error)
    throw error
  }
}

/**
 * Verifica si un documento ya existe en el sistema
 * @param {string} documento - Documento a verificar
 * @param {string} excludeId - ID a excluir (para edición)
 * @returns {Promise<boolean>} true si existe
 */
export const checkDocumentExists = async (documento, excludeId = null) => {
  try {
    const instructors = await getAllInstructors()

    const exists = instructors.some(
      (instructor) => instructor.documento === documento.trim() && (excludeId ? instructor._id !== excludeId : true),
    )

    return exists
  } catch (error) {
    console.error("Error verificando documento:", error)
    return false // En caso de error, permitir continuar
  }
}

/**
 * Verifica si un correo ya existe en el sistema
 * @param {string} correo - Correo a verificar
 * @param {string} excludeId - ID a excluir (para edición)
 * @returns {Promise<boolean>} true si existe
 */
export const checkEmailExists = async (correo, excludeId = null) => {
  try {
    const instructors = await getAllInstructors()

    const exists = instructors.some(
      (instructor) =>
        instructor.correo.toLowerCase() === correo.toLowerCase().trim() &&
        (excludeId ? instructor._id !== excludeId : true),
    )

    return exists
  } catch (error) {
    console.error("Error verificando correo:", error)
    return false // En caso de error, permitir continuar
  }
}

/**
 * Busca el rol de "Instructor" en la API
 */
const findInstructorRole = async () => {
  try {
    console.log("Buscando rol de Instructor...")
    const response = await fetch(`${API_BASE_URL}/api/role`)

    if (!response.ok) {
      throw new Error(`Error al obtener roles: ${response.status}`)
    }

    const roles = await response.json()
    const instructorRole = roles.find((role) => role.name === "Instructor" && role.status === true)

    if (!instructorRole) {
      throw new Error("No se encontró el rol 'Instructor' activo. Asegúrese de que esté creado en el sistema.")
    }

    console.log(`Rol de Instructor encontrado: ${instructorRole._id}`)
    return instructorRole._id
  } catch (error) {
    console.error("Error al buscar rol de Instructor:", error)
    throw error
  }
}

/**
 * Prepara los datos del instructor para envío al backend
 */
export const prepareInstructorDataWithRole = async (formData) => {
  try {
    // Buscar el rol de Instructor
    const instructorRoleId = await findInstructorRole()

    // Preparar datos con rol y contraseña automática
    const instructorData = {
      // Campos básicos
      tipoUsuario: "instructor",
      nombre: formData.nombre?.trim(),
      apellido: formData.apellido?.trim(),
      documento: formData.documento?.trim(),
      tipoDocumento: formData.tipoDocumento,
      estado: formData.estado,
      telefono: formData.telefono?.trim() || "",
      correo: formData.correo?.toLowerCase().trim(),

      // Contraseña automática igual al documento
      contraseña: formData.documento?.trim(),

      // Rol de Instructor automático
      role: instructorRoleId,

      // Campos específicos de instructores
      fichas: [],
    }

    console.log("Datos del instructor preparados:", instructorData)
    return instructorData
  } catch (error) {
    console.error("Error al preparar datos del instructor:", error)
    throw error
  }
}

/**
 * Crea un nuevo instructor
 */
export const createInstructor = async (formData) => {
  try {
    console.log("=== CREANDO INSTRUCTOR ===")

    // Preparar datos con rol
    const instructorData = await prepareInstructorDataWithRole(formData)

    const response = await fetch(`${API_BASE_URL}/api/instructor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(instructorData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
    }

    const result = await response.json()
    console.log("Instructor creado exitosamente:", result)
    return result
  } catch (error) {
    console.error("Error al crear instructor:", error)
    throw error
  }
}

/**
 * Actualiza un instructor existente
 */
export const updateInstructor = async (id, formData) => {
  try {
    console.log("=== ACTUALIZANDO INSTRUCTOR ===")

    // Para actualización, no cambiar el rol automáticamente
    const instructorData = {
      tipoUsuario: "instructor",
      nombre: formData.nombre?.trim(),
      apellido: formData.apellido?.trim(),
      documento: formData.documento?.trim(),
      tipoDocumento: formData.tipoDocumento,
      estado: formData.estado,
      telefono: formData.telefono?.trim() || "",
      correo: formData.correo?.toLowerCase().trim(),

      // Solo incluir contraseña si se proporciona
      ...(formData.contraseña && { contraseña: formData.contraseña.trim() }),
    }

    const response = await fetch(`${API_BASE_URL}/api/instructor/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(instructorData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
    }

    const result = await response.json()
    console.log("Instructor actualizado exitosamente:", result)
    return result
  } catch (error) {
    console.error("Error al actualizar instructor:", error)
    throw error
  }
}
