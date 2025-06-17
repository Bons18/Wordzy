/**
 * Servicio de validación para instructores
 * Replica las validaciones del controlador del backend
 */

import { checkDocumentExists, checkEmailExists } from "./instructorApiService"

/**
 * Valida los datos básicos de un instructor (validaciones síncronas)
 * Basado en las validaciones del modelo MongoDB
 */
export const validateBasicData = (formData) => {
  const errors = {}

  // Validación de tipo de usuario (del controlador)
  if (!formData.tipoUsuario || !["aprendiz", "instructor"].includes(formData.tipoUsuario)) {
    errors.tipoUsuario = "Tipo de usuario requerido: aprendiz o instructor"
  }

  // Validación de nombre (del modelo)
  if (!formData.nombre || !formData.nombre.trim()) {
    errors.nombre = "El nombre es obligatorio"
  } else if (formData.nombre.trim().length < 2) {
    errors.nombre = "El nombre debe tener al menos 2 caracteres"
  } else if (formData.nombre.trim().length > 50) {
    errors.nombre = "El nombre no puede exceder 50 caracteres"
  }

  // Validación de apellido (del modelo)
  if (!formData.apellido || !formData.apellido.trim()) {
    errors.apellido = "El apellido es obligatorio"
  } else if (formData.apellido.trim().length < 2) {
    errors.apellido = "El apellido debe tener al menos 2 caracteres"
  } else if (formData.apellido.trim().length > 50) {
    errors.apellido = "El apellido no puede exceder 50 caracteres"
  }

  // Validación de documento (del modelo)
  if (!formData.documento || !formData.documento.trim()) {
    errors.documento = "El documento es obligatorio"
  } else if (formData.documento.trim().length < 6) {
    errors.documento = "El documento debe tener al menos 6 caracteres"
  } else if (formData.documento.trim().length > 20) {
    errors.documento = "El documento no puede exceder 20 caracteres"
  }

  // Validación de tipo de documento (del modelo)
  if (!formData.tipoDocumento || !["CC", "TI", "PPT", "PEP"].includes(formData.tipoDocumento)) {
    errors.tipoDocumento = "Tipo de documento no válido"
  }

  // Validación de estado para instructores (del controlador)
  const estadosInstructor = ["Activo", "Inactivo"]
  if (!formData.estado || !estadosInstructor.includes(formData.estado)) {
    errors.estado = "Estado no válido para instructores. Estados permitidos: " + estadosInstructor.join(", ")
  }

  // Validación de teléfono (del modelo)
  if (!formData.telefono || !formData.telefono.trim()) {
    errors.telefono = "El teléfono es obligatorio"
  }

  // Validación de correo (del modelo con regex)
  if (!formData.correo || !formData.correo.trim()) {
    errors.correo = "El correo es obligatorio"
  } else {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    if (!emailRegex.test(formData.correo.trim())) {
      errors.correo = "Email inválido"
    }
  }

  return errors
}

/**
 * Valida duplicados en el servidor (validaciones asíncronas)
 * Basado en las validaciones del controlador
 */
export const validateDuplicates = async (formData, isEditMode = false, instructorId = null) => {
  const errors = {}

  try {
    // Validar documento único (del controlador createUser y updateUser)
    if (formData.documento && formData.documento.trim()) {
      const documentExists = await checkDocumentExists(formData.documento.trim(), isEditMode ? instructorId : null)

      if (documentExists) {
        errors.documento = isEditMode
          ? "Ya existe otro usuario con este documento"
          : "Ya existe un usuario con este documento"
      }
    }

    // Validar correo único (del controlador createUser y updateUser)
    if (formData.correo && formData.correo.trim()) {
      const emailExists = await checkEmailExists(formData.correo.trim(), isEditMode ? instructorId : null)

      if (emailExists) {
        errors.correo = isEditMode ? "Ya existe otro usuario con este correo" : "Ya existe un usuario con este correo"
      }
    }
  } catch (error) {
    console.error("Error en validación de duplicados:", error)
    // No agregar errores si falla la validación del servidor
  }

  return errors
}

/**
 * Valida todos los datos de un instructor
 * Combina validaciones síncronas y asíncronas
 */
export const validateInstructorData = async (formData, isEditMode = false, instructorId = null) => {
  // Primero validaciones básicas (síncronas)
  const basicErrors = validateBasicData(formData)

  // Si hay errores básicos, no continuar con validaciones del servidor
  if (Object.keys(basicErrors).length > 0) {
    return basicErrors
  }

  // Luego validaciones de duplicados (asíncronas)
  const duplicateErrors = await validateDuplicates(formData, isEditMode, instructorId)

  // Combinar errores
  return { ...basicErrors, ...duplicateErrors }
}

/**
 * Procesa errores del servidor según el controlador
 * Maneja los diferentes tipos de error que puede devolver el backend
 */
export const processServerError = (error) => {
  const errors = {}

  if (error.message) {
    // ValidationError (del controlador)
    if (error.message.includes("ValidationError") || error.message.includes("Datos inválidos")) {
      errors.general = "Datos inválidos"
    }
    // Error de duplicado por índice único (código 11000 del controlador)
    else if (error.message.includes("documento")) {
      errors.documento = "Ya existe un usuario con este documento"
    } else if (error.message.includes("correo")) {
      errors.correo = "Ya existe un usuario con este correo"
    }
    // Error de tipo de usuario (del controlador)
    else if (error.message.includes("tipo de usuario")) {
      errors.tipoUsuario = "Tipo de usuario requerido: aprendiz o instructor"
    }
    // Error de estado (del controlador)
    else if (error.message.includes("Estado no válido")) {
      errors.estado = error.message
    }
    // Error general
    else {
      errors.general = error.message
    }
  } else {
    errors.general = "Error al procesar la solicitud"
  }

  return errors
}

/**
 * Prepara los datos para envío al servidor
 * Replica la función prepareUserData del controlador
 */
export const prepareInstructorData = (formData) => {
  return {
    tipoUsuario: "instructor",
    nombre: formData.nombre?.trim(),
    apellido: formData.apellido?.trim(),
    documento: formData.documento?.trim(),
    tipoDocumento: formData.tipoDocumento,
    estado: formData.estado,
    telefono: formData.telefono?.trim(),
    correo: formData.correo?.toLowerCase().trim(),
    fichas: [], // Los instructores empiezan sin fichas
  }
}
