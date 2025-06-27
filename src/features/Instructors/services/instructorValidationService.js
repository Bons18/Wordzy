// Servicio de validación para instructores
export const validateInstructorData = async (formData, isEditMode = false, instructorId = null) => {
  const errors = {}

  // Validar nombre
  if (!formData.nombre?.trim()) {
    errors.nombre = "El nombre es obligatorio"
  } else if (formData.nombre.trim().length < 2) {
    errors.nombre = "El nombre debe tener al menos 2 caracteres"
  } else if (formData.nombre.trim().length > 50) {
    errors.nombre = "El nombre no puede exceder 50 caracteres"
  }

  // Validar apellido
  if (!formData.apellido?.trim()) {
    errors.apellido = "El apellido es obligatorio"
  } else if (formData.apellido.trim().length < 2) {
    errors.apellido = "El apellido debe tener al menos 2 caracteres"
  } else if (formData.apellido.trim().length > 50) {
    errors.apellido = "El apellido no puede exceder 50 caracteres"
  }

  // Validar documento
  if (!formData.documento?.trim()) {
    errors.documento = "El documento es obligatorio"
  } else {
    const documento = formData.documento.trim()

    // Validaciones específicas por tipo de documento
    switch (formData.tipoDocumento) {
      case "CC":
        if (!/^\d{6,10}$/.test(documento)) {
          errors.documento = "La cédula debe tener entre 6 y 10 dígitos"
        }
        break
      case "TI":
        if (!/^\d{8,11}$/.test(documento)) {
          errors.documento = "La tarjeta de identidad debe tener entre 8 y 11 dígitos"
        }
        break
      case "PPT":
      case "PEP":
        if (documento.length < 6 || documento.length > 15) {
          errors.documento = "El documento debe tener entre 6 y 15 caracteres"
        }
        break
      default:
        if (documento.length < 6 || documento.length > 15) {
          errors.documento = "El documento debe tener entre 6 y 15 caracteres"
        }
    }
  }

  // Validar teléfono
  if (!formData.telefono?.trim()) {
    errors.telefono = "El teléfono es obligatorio"
  } else {
    const telefono = formData.telefono.trim()
    if (!/^\d{7,10}$/.test(telefono)) {
      errors.telefono = "El teléfono debe tener entre 7 y 10 dígitos"
    }
  }

  // Validar correo
  if (!formData.correo?.trim()) {
    errors.correo = "El correo es obligatorio"
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.correo.trim())) {
      errors.correo = "El formato del correo no es válido"
    }
  }

  // Validar estado (solo en modo edición)
  if (isEditMode && !formData.estado) {
    errors.estado = "El estado es obligatorio"
  }

  return errors
}

// Función para procesar errores del servidor
export const processServerError = (error) => {
  const errors = {}

  if (error.response?.data?.message) {
    errors.general = error.response.data.message
  } else if (error.response?.data?.errors) {
    // Si el servidor devuelve errores específicos por campo
    Object.keys(error.response.data.errors).forEach((field) => {
      errors[field] = error.response.data.errors[field]
    })
  } else if (error.message) {
    errors.general = error.message
  } else {
    errors.general = "Ha ocurrido un error inesperado"
  }

  return errors
}

// Función para extraer IDs de fichas
export const extractFichaIds = (fichas) => {
  if (!Array.isArray(fichas)) return []

  return fichas
    .map((ficha) => {
      if (typeof ficha === "object" && ficha !== null) {
        return ficha._id || ficha.id
      }
      return ficha
    })
    .filter(Boolean)
}

// Función para preparar datos del instructor
export const prepareInstructorData = (formData, isEditMode = false) => {
  return {
    tipoUsuario: "instructor",
    nombre: formData.nombre?.trim(),
    apellido: formData.apellido?.trim(),
    documento: formData.documento?.trim(),
    tipoDocumento: formData.tipoDocumento,
    estado: isEditMode ? formData.estado : "Activo",
    telefono: formData.telefono?.trim(),
    correo: formData.correo?.toLowerCase().trim(),
    fichas: formData.fichas || [],
  }
}
