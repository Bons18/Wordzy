/**
 * Servicio de API para instructores
 * Maneja todas las comunicaciones con el backend
 */

// Configuración de API
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000"

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
