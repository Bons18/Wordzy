// Servicio para operaciones de instructores con integración de roles

/**
 * Busca el rol de "Instructor" en la API
 */
const findInstructorRole = async () => {
  try {
    console.log("Buscando rol de Instructor...")
    const response = await fetch("http://localhost:3000/api/role")

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

    const response = await fetch("http://localhost:3000/api/instructor", {
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

    const response = await fetch(`http://localhost:3000/api/instructor/${id}`, {
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

/**
 * Valida los datos del instructor antes del envío
 */
export const validateInstructorDataWithRole = (formData) => {
  const errors = {}

  // Validaciones básicas
  if (!formData.nombre || formData.nombre.trim().length < 2) {
    errors.nombre = "El nombre debe tener al menos 2 caracteres"
  }

  if (!formData.apellido || formData.apellido.trim().length < 2) {
    errors.apellido = "El apellido debe tener al menos 2 caracteres"
  }

  if (!formData.documento || formData.documento.trim().length < 6) {
    errors.documento = "El documento debe tener al menos 6 caracteres"
  }

  if (!formData.correo || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.correo)) {
    errors.correo = "El correo debe tener un formato válido"
  }

  if (!formData.telefono || formData.telefono.trim().length === 0) {
    errors.telefono = "El teléfono es obligatorio"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
