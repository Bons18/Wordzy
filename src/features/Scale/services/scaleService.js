// // // // // // import api from "../../../shared/services/api"

// // // // // // const SCALE_ENDPOINTS = {
// // // // // //   GET_ALL: "/scale",
// // // // // //   GET_BY_ID: (id) => `/scale/${id}`,
// // // // // //   CREATE: "/scale",
// // // // // //   UPDATE: (id) => `/scale/${id}`,
// // // // // //   DELETE: (id) => `/scale/${id}`,
// // // // // //   STATS: "/scale/stats",
// // // // // // }

// // // // // // // Obtener todas las escalas
// // // // // // export const getScales = async (params = {}) => {
// // // // // //   try {
// // // // // //     console.log("🔍 Obteniendo escalas con parámetros:", params)

// // // // // //     const queryParams = new URLSearchParams()

// // // // // //     // Agregar parámetros de consulta
// // // // // //     if (params.page) queryParams.append("page", params.page)
// // // // // //     if (params.limit) queryParams.append("limit", params.limit)
// // // // // //     if (params.search) queryParams.append("search", params.search)
// // // // // //     if (params.estado) queryParams.append("estado", params.estado)
// // // // // //     if (params.valoracion) queryParams.append("valoracion", params.valoracion)
// // // // // //     if (params.fechaInicial) queryParams.append("fechaInicial", params.fechaInicial)
// // // // // //     if (params.fechaFinal) queryParams.append("fechaFinal", params.fechaFinal)

// // // // // //     const url = `${SCALE_ENDPOINTS.GET_ALL}?${queryParams.toString()}`
// // // // // //     console.log("📡 URL de solicitud:", url)

// // // // // //     const response = await api.get(url)

// // // // // //     console.log("✅ Escalas obtenidas exitosamente:", response.data)
// // // // // //     return response.data
// // // // // //   } catch (error) {
// // // // // //     console.error("❌ Error al obtener escalas:", error)
// // // // // //     throw {
// // // // // //       message: error.response?.data?.message || "Error al obtener las escalas de valoración",
// // // // // //       status: error.response?.status || 500,
// // // // // //       data: error.response?.data || null,
// // // // // //     }
// // // // // //   }
// // // // // // }

// // // // // // // Obtener escala por ID
// // // // // // export const getScaleById = async (id) => {
// // // // // //   try {
// // // // // //     console.log(`🔍 Obteniendo escala con ID: ${id}`)

// // // // // //     const response = await api.get(SCALE_ENDPOINTS.GET_BY_ID(id))

// // // // // //     console.log("✅ Escala obtenida exitosamente:", response.data)
// // // // // //     return response.data
// // // // // //   } catch (error) {
// // // // // //     console.error(`❌ Error al obtener escala ${id}:`, error)
// // // // // //     throw {
// // // // // //       message: error.response?.data?.message || "Error al obtener la escala de valoración",
// // // // // //       status: error.response?.status || 500,
// // // // // //       data: error.response?.data || null,
// // // // // //     }
// // // // // //   }
// // // // // // }

// // // // // // // Crear nueva escala
// // // // // // export const createScale = async (scaleData) => {
// // // // // //   try {
// // // // // //     console.log("📝 Creando nueva escala:", scaleData)

// // // // // //     // Validar datos requeridos
// // // // // //     if (!scaleData.fechaInicial || !scaleData.fechaFinal) {
// // // // // //       throw new Error("Las fechas inicial y final son requeridas")
// // // // // //     }

// // // // // //     if (scaleData.apruebaPorcentaje === undefined) {
// // // // // //       throw new Error("El porcentaje de aprobación es requerido")
// // // // // //     }

// // // // // //     console.log("📤 Datos que se enviarán al backend:", scaleData);
    
// // // // // //     const response = await api.post(SCALE_ENDPOINTS.CREATE, scaleData)

// // // // // //     console.log("✅ Escala creada exitosamente:", response.data)
// // // // // //     return response.data
// // // // // //   } catch (error) {
// // // // // //   console.error("❌ Error al crear escala:", error);

// // // // // //   const rawErrors = error.response?.data?.errors;

// // // // // //   let parsedErrors = [];

// // // // // //   // Si ya es un array (de strings), úsalo directamente
// // // // // //   if (Array.isArray(rawErrors)) {
// // // // // //     parsedErrors = rawErrors;
// // // // // //   }

// // // // // //   // Si está anidado como { errors: [ ... ] }
// // // // // //   else if (rawErrors && Array.isArray(rawErrors.errors)) {
// // // // // //     parsedErrors = rawErrors.errors;
// // // // // //   }

// // // // // //   // Si viene como objeto con campos (por validación de campos)
// // // // // //   else if (typeof rawErrors === "object") {
// // // // // //     parsedErrors = Object.values(rawErrors).flat();
// // // // // //   }

// // // // // //   // Si viene como string separado por comas
// // // // // //   else if (typeof rawErrors === "string") {
// // // // // //     parsedErrors = rawErrors.split(",").map((e) => e.trim());
// // // // // //   }

// // // // // //   // Fallback
// // // // // //   else {
// // // // // //     parsedErrors = ["Error desconocido"];
// // // // // //   }

// // // // // //   console.error("📛 Errores de validación recibidos del backend:");
// // // // // //   parsedErrors.forEach((err, i) => {
// // // // // //     console.error(`   ${i + 1}. ${err}`);
// // // // // //   });

// // // // // //   throw {
// // // // // //     message: error.response?.data?.message || "Error al crear escala",
// // // // // //     status: error.response?.status || 400,
// // // // // //     data: error.response?.data,
// // // // // //     errors: parsedErrors,
// // // // // //   };
// // // // // // }






// // // // // // }

  


// // // // // // // Actualizar escala
// // // // // // export const updateScale = async (id, scaleData) => {
// // // // // //   try {
// // // // // //     console.log(`📝 Actualizando escala ${id}:`, scaleData)

// // // // // //     const response = await api.put(SCALE_ENDPOINTS.UPDATE(id), scaleData)

// // // // // //     console.log("✅ Escala actualizada exitosamente:", response.data)
// // // // // //     return response.data
// // // // // //   } catch (error) {
// // // // // //     console.error(`❌ Error al actualizar escala ${id}:`, error)
// // // // // //     throw {
// // // // // //       message: error.response?.data?.message || "Error al actualizar la escala de valoración",
// // // // // //       status: error.response?.status || 500,
// // // // // //       data: error.response?.data || null,
// // // // // //       errors: error.response?.data?.errors || [],
// // // // // //     }
// // // // // //   }
// // // // // // }

// // // // // // // Eliminar escala
// // // // // // export const deleteScale = async (id) => {
// // // // // //   try {
// // // // // //     console.log(`🗑️ Eliminando escala ${id}`)

// // // // // //     const response = await api.delete(SCALE_ENDPOINTS.DELETE(id))

// // // // // //     console.log("✅ Escala eliminada exitosamente:", response.data)
// // // // // //     return response.data
// // // // // //   } catch (error) {
// // // // // //     console.error(`❌ Error al eliminar escala ${id}:`, error)
// // // // // //     throw {
// // // // // //       message: error.response?.data?.message || "Error al eliminar la escala de valoración",
// // // // // //       status: error.response?.status || 500,
// // // // // //       data: error.response?.data || null,
// // // // // //     }
// // // // // //   }
// // // // // // }

// // // // // // // Obtener estadísticas
// // // // // // export const getScaleStats = async () => {
// // // // // //   try {
// // // // // //     console.log("📊 Obteniendo estadísticas de escalas")

// // // // // //     const response = await api.get(SCALE_ENDPOINTS.STATS)

// // // // // //     console.log("✅ Estadísticas obtenidas exitosamente:", response.data)
// // // // // //     return response.data
// // // // // //   } catch (error) {
// // // // // //     console.error("❌ Error al obtener estadísticas:", error)
// // // // // //     throw {
// // // // // //       message: error.response?.data?.message || "Error al obtener las estadísticas",
// // // // // //       status: error.response?.status || 500,
// // // // // //       data: error.response?.data || null,
// // // // // //     }
// // // // // //   }
// // // // // // }

// // // // // // export default {
// // // // // //   getScales,
// // // // // //   getScaleById,
// // // // // //   createScale,
// // // // // //   updateScale,
// // // // // //   deleteScale,
// // // // // //   getScaleStats,
// // // // // // }
// // // // // import api from "../../../shared/services/api"

// // // // // const BASE_URL = "/scales"

// // // // // // Obtener todas las escalas
// // // // // export const getScales = async (params = {}) => {
// // // // //   try {
// // // // //     console.log("🌐 Llamando API getScales con params:", params)

// // // // //     // Construir query string
// // // // //     const queryParams = new URLSearchParams()

// // // // //     if (params.page) queryParams.append("page", params.page)
// // // // //     if (params.limit) queryParams.append("limit", params.limit)
// // // // //     if (params.estado) queryParams.append("estado", params.estado)
// // // // //     if (params.search) queryParams.append("search", params.search)
// // // // //     if (params.fechaInicial) queryParams.append("fechaInicial", params.fechaInicial)
// // // // //     if (params.fechaFinal) queryParams.append("fechaFinal", params.fechaFinal)

// // // // //     const queryString = queryParams.toString()
// // // // //     const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL

// // // // //     console.log("📡 URL de la petición:", url)

// // // // //     const response = await api.get(url)
// // // // //     console.log("📥 Respuesta del API:", response)

// // // // //     return {
// // // // //       success: true,
// // // // //       data: response.data,
// // // // //       message: response.message || "Escalas obtenidas exitosamente",
// // // // //     }
// // // // //   } catch (error) {
// // // // //     console.error("❌ Error en getScales service:", error)
// // // // //     console.error("❌ Error response:", error.response?.data)

// // // // //     return {
// // // // //       success: false,
// // // // //       data: null,
// // // // //       message: error.response?.data?.message || error.message || "Error al obtener escalas",
// // // // //     }
// // // // //   }
// // // // // }

// // // // // // Obtener escala por ID
// // // // // export const getScaleById = async (id) => {
// // // // //   try {
// // // // //     console.log("🌐 Obteniendo escala por ID:", id)
// // // // //     const response = await api.get(`${BASE_URL}/${id}`)
// // // // //     console.log("📥 Escala obtenida:", response)

// // // // //     return {
// // // // //       success: true,
// // // // //       data: response.data,
// // // // //       message: response.message || "Escala obtenida exitosamente",
// // // // //     }
// // // // //   } catch (error) {
// // // // //     console.error("❌ Error en getScaleById:", error)
// // // // //     return {
// // // // //       success: false,
// // // // //       data: null,
// // // // //       message: error.response?.data?.message || error.message || "Error al obtener la escala",
// // // // //     }
// // // // //   }
// // // // // }

// // // // // // Crear nueva escala
// // // // // export const createScale = async (scaleData) => {
// // // // //   try {
// // // // //     console.log("🌐 Creando nueva escala:", scaleData)
// // // // //     const response = await api.post(BASE_URL, scaleData)
// // // // //     console.log("✅ Escala creada:", response)

// // // // //     return {
// // // // //       success: true,
// // // // //       data: response.data,
// // // // //       message: response.message || "Escala creada exitosamente",
// // // // //     }
// // // // //   } catch (error) {
// // // // //     console.error("❌ Error en createScale:", error)
// // // // //     console.error("❌ Error response:", error.response?.data)

// // // // //     return {
// // // // //       success: false,
// // // // //       data: null,
// // // // //       message: error.response?.data?.message || error.message || "Error al crear la escala",
// // // // //     }
// // // // //   }
// // // // // }

// // // // // // Actualizar escala
// // // // // export const updateScale = async (id, scaleData) => {
// // // // //   try {
// // // // //     console.log("🌐 Actualizando escala:", id, scaleData)
// // // // //     const response = await api.put(`${BASE_URL}/${id}`, scaleData)
// // // // //     console.log("✅ Escala actualizada:", response)

// // // // //     return {
// // // // //       success: true,
// // // // //       data: response.data,
// // // // //       message: response.message || "Escala actualizada exitosamente",
// // // // //     }
// // // // //   } catch (error) {
// // // // //     console.error("❌ Error en updateScale:", error)
// // // // //     return {
// // // // //       success: false,
// // // // //       data: null,
// // // // //       message: error.response?.data?.message || error.message || "Error al actualizar la escala",
// // // // //     }
// // // // //   }
// // // // // }

// // // // // // Eliminar escala
// // // // // export const deleteScale = async (id) => {
// // // // //   try {
// // // // //     console.log("🌐 Eliminando escala:", id)
// // // // //     const response = await api.delete(`${BASE_URL}/${id}`)
// // // // //     console.log("✅ Escala eliminada:", response)

// // // // //     return {
// // // // //       success: true,
// // // // //       data: response.data,
// // // // //       message: response.message || "Escala eliminada exitosamente",
// // // // //     }
// // // // //   } catch (error) {
// // // // //     console.error("❌ Error en deleteScale:", error)
// // // // //     return {
// // // // //       success: false,
// // // // //       data: null,
// // // // //       message: error.response?.data?.message || error.message || "Error al eliminar la escala",
// // // // //     }
// // // // //   }
// // // // // }

// // // // // // Obtener estadísticas
// // // // // export const getScaleStats = async () => {
// // // // //   try {
// // // // //     console.log("🌐 Obteniendo estadísticas de escalas")
// // // // //     const response = await api.get(`${BASE_URL}/stats`)
// // // // //     console.log("📊 Estadísticas obtenidas:", response)

// // // // //     return {
// // // // //       success: true,
// // // // //       data: response.data,
// // // // //       message: response.message || "Estadísticas obtenidas exitosamente",
// // // // //     }
// // // // //   } catch (error) {
// // // // //     console.error("❌ Error en getScaleStats:", error)
// // // // //     return {
// // // // //       success: false,
// // // // //       data: null,
// // // // //       message: error.response?.data?.message || error.message || "Error al obtener estadísticas",
// // // // //     }
// // // // //   }
// // // // // }
// // // // import api from "../../../shared/services/api"

// // // // const BASE_URL = "/scales"

// // // // // Obtener todas las escalas
// // // // export const getScales = async (params = {}) => {
// // // //   try {
// // // //     console.log("🌐 Llamando API getScales con params:", params)

// // // //     // Construir query string
// // // //     const queryParams = new URLSearchParams()

// // // //     if (params.page) queryParams.append("page", params.page)
// // // //     if (params.limit) queryParams.append("limit", params.limit)
// // // //     if (params.estado) queryParams.append("estado", params.estado)
// // // //     if (params.search) queryParams.append("search", params.search)
// // // //     if (params.fechaInicial) queryParams.append("fechaInicial", params.fechaInicial)
// // // //     if (params.fechaFinal) queryParams.append("fechaFinal", params.fechaFinal)

// // // //     const queryString = queryParams.toString()
// // // //     const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL

// // // //     console.log("📡 URL completa de la petición:", url)

// // // //     const response = await api.get(url)
// // // //     console.log("📥 Respuesta del API:", response)

// // // //     return {
// // // //       success: true,
// // // //       data: response.data,
// // // //       message: response.message || "Escalas obtenidas exitosamente",
// // // //     }
// // // //   } catch (error) {
// // // //     console.error("❌ Error en getScales service:", error)
// // // //     console.error("❌ Error response:", error.response?.data)
// // // //     console.error("❌ Status:", error.response?.status)
// // // //     console.error("❌ URL que falló:", error.config?.url)

// // // //     return {
// // // //       success: false,
// // // //       data: null,
// // // //       message: error.response?.data?.message || error.message || "Error al obtener escalas",
// // // //     }
// // // //   }
// // // // }

// // // // // Obtener escala por ID
// // // // export const getScaleById = async (id) => {
// // // //   try {
// // // //     console.log("🌐 Obteniendo escala por ID:", id)
// // // //     const response = await api.get(`${BASE_URL}/${id}`)
// // // //     console.log("📥 Escala obtenida:", response)

// // // //     return {
// // // //       success: true,
// // // //       data: response.data,
// // // //       message: response.message || "Escala obtenida exitosamente",
// // // //     }
// // // //   } catch (error) {
// // // //     console.error("❌ Error en getScaleById:", error)
// // // //     return {
// // // //       success: false,
// // // //       data: null,
// // // //       message: error.response?.data?.message || error.message || "Error al obtener la escala",
// // // //     }
// // // //   }
// // // // }

// // // // // Crear nueva escala
// // // // export const createScale = async (scaleData) => {
// // // //   try {
// // // //     console.log("🌐 Creando nueva escala:", scaleData)
// // // //     const response = await api.post(BASE_URL, scaleData)
// // // //     console.log("✅ Escala creada:", response)

// // // //     return {
// // // //       success: true,
// // // //       data: response.data,
// // // //       message: response.message || "Escala creada exitosamente",
// // // //     }
// // // //   } catch (error) {
// // // //     console.error("❌ Error en createScale:", error)
// // // //     console.error("❌ Error response completo:", error.response?.data)
// // // //     console.error("❌ Status:", error.response?.status)
// // // //     console.error("❌ Headers:", error.response?.headers)

// // // //     // Extraer errores específicos para mostrar al usuario
// // // //     let errorMessage = "Error al crear la escala"
// // // //     let specificErrors = []

// // // //     if (error.response?.data) {
// // // //       const responseData = error.response.data

// // // //       // Si hay un mensaje principal
// // // //       if (responseData.message) {
// // // //         errorMessage = responseData.message
// // // //       }

// // // //       // Si hay errores específicos
// // // //       if (responseData.errors) {
// // // //         if (Array.isArray(responseData.errors)) {
// // // //           specificErrors = responseData.errors
// // // //         } else if (typeof responseData.errors === "object") {
// // // //           specificErrors = Object.values(responseData.errors).flat()
// // // //         }
// // // //       }

// // // //       // Si hay datos adicionales con errores
// // // //       if (responseData.data && responseData.data.errors) {
// // // //         if (Array.isArray(responseData.data.errors)) {
// // // //           specificErrors = [...specificErrors, ...responseData.data.errors]
// // // //         }
// // // //       }
// // // //     }

// // // //     console.error("📛 Errores específicos extraídos:", specificErrors)

// // // //     return {
// // // //       success: false,
// // // //       data: null,
// // // //       message: errorMessage,
// // // //       errors: specificErrors,
// // // //       fullError: error.response?.data, // Para debugging
// // // //     }
// // // //   }
// // // // }

// // // // // Actualizar escala
// // // // export const updateScale = async (id, scaleData) => {
// // // //   try {
// // // //     console.log("🌐 Actualizando escala:", id, scaleData)
// // // //     const response = await api.put(`${BASE_URL}/${id}`, scaleData)
// // // //     console.log("✅ Escala actualizada:", response)

// // // //     return {
// // // //       success: true,
// // // //       data: response.data,
// // // //       message: response.message || "Escala actualizada exitosamente",
// // // //     }
// // // //   } catch (error) {
// // // //     console.error("❌ Error en updateScale:", error)
// // // //     console.error("❌ Error response:", error.response?.data)

// // // //     let errorMessage = "Error al actualizar la escala"
// // // //     let specificErrors = []

// // // //     if (error.response?.data) {
// // // //       const responseData = error.response.data
// // // //       if (responseData.message) errorMessage = responseData.message
// // // //       if (responseData.errors) {
// // // //         if (Array.isArray(responseData.errors)) {
// // // //           specificErrors = responseData.errors
// // // //         } else if (typeof responseData.errors === "object") {
// // // //           specificErrors = Object.values(responseData.errors).flat()
// // // //         }
// // // //       }
// // // //     }

// // // //     return {
// // // //       success: false,
// // // //       data: null,
// // // //       message: errorMessage,
// // // //       errors: specificErrors,
// // // //     }
// // // //   }
// // // // }

// // // // // Eliminar escala
// // // // export const deleteScale = async (id) => {
// // // //   try {
// // // //     console.log("🌐 Eliminando escala:", id)
// // // //     const response = await api.delete(`${BASE_URL}/${id}`)
// // // //     console.log("✅ Escala eliminada:", response)

// // // //     return {
// // // //       success: true,
// // // //       data: response.data,
// // // //       message: response.message || "Escala eliminada exitosamente",
// // // //     }
// // // //   } catch (error) {
// // // //     console.error("❌ Error en deleteScale:", error)
// // // //     return {
// // // //       success: false,
// // // //       data: null,
// // // //       message: error.response?.data?.message || error.message || "Error al eliminar la escala",
// // // //     }
// // // //   }
// // // // }

// // // // // Obtener estadísticas
// // // // export const getScaleStats = async () => {
// // // //   try {
// // // //     console.log("🌐 Obteniendo estadísticas de escalas")
// // // //     const response = await api.get(`${BASE_URL}/stats`)
// // // //     console.log("📊 Estadísticas obtenidas:", response)

// // // //     return {
// // // //       success: true,
// // // //       data: response.data,
// // // //       message: response.message || "Estadísticas obtenidas exitosamente",
// // // //     }
// // // //   } catch (error) {
// // // //     console.error("❌ Error en getScaleStats:", error)
// // // //     return {
// // // //       success: false,
// // // //       data: null,
// // // //       message: error.response?.data?.message || error.message || "Error al obtener estadísticas",
// // // //     }
// // // //   }
// // // // }

// // // // export default {
// // // //   getScales,
// // // //   getScaleById,
// // // //   createScale,
// // // //   updateScale,
// // // //   deleteScale,
// // // //   getScaleStats,
// // // // }
// // // import api from "../../../shared/services/api"

// // // const BASE_URL = "/scales"

// // // // Obtener todas las escalas
// // // export const getScales = async (params = {}) => {
// // //   try {
// // //     console.log("🌐 Llamando API getScales con params:", params)

// // //     // Construir query string
// // //     const queryParams = new URLSearchParams()

// // //     if (params.page) queryParams.append("page", params.page)
// // //     if (params.limit) queryParams.append("limit", params.limit)
// // //     if (params.estado) queryParams.append("estado", params.estado)
// // //     if (params.search) queryParams.append("search", params.search)
// // //     if (params.fechaInicial) queryParams.append("fechaInicial", params.fechaInicial)
// // //     if (params.fechaFinal) queryParams.append("fechaFinal", params.fechaFinal)

// // //     const queryString = queryParams.toString()
// // //     const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL

// // //     console.log("📡 URL completa de la petición:", url)

// // //     const response = await api.get(url)
// // //     console.log("📥 Respuesta del API:", response)

// // //     return {
// // //       success: true,
// // //       data: response.data,
// // //       message: response.message || "Escalas obtenidas exitosamente",
// // //     }
// // //   } catch (error) {
// // //     console.error("❌ Error en getScales service:", error)
// // //     console.error("❌ Error response:", error.response?.data)
// // //     console.error("❌ Status:", error.response?.status)
// // //     console.error("❌ URL que falló:", error.config?.url)

// // //     return {
// // //       success: false,
// // //       data: null,
// // //       message: error.response?.data?.message || error.message || "Error al obtener escalas",
// // //     }
// // //   }
// // // }

// // // // Obtener escala por ID
// // // export const getScaleById = async (id) => {
// // //   try {
// // //     console.log("🌐 Obteniendo escala por ID:", id)
// // //     const response = await api.get(`${BASE_URL}/${id}`)
// // //     console.log("📥 Escala obtenida:", response)

// // //     return {
// // //       success: true,
// // //       data: response.data,
// // //       message: response.message || "Escala obtenida exitosamente",
// // //     }
// // //   } catch (error) {
// // //     console.error("❌ Error en getScaleById:", error)
// // //     return {
// // //       success: false,
// // //       data: null,
// // //       message: error.response?.data?.message || error.message || "Error al obtener la escala",
// // //     }
// // //   }
// // // }

// // // // Crear nueva escala
// // // export const createScale = async (scaleData) => {
// // //   try {
// // //     console.log("🌐 Creando nueva escala:", scaleData)
// // //     const response = await api.post(BASE_URL, scaleData)
// // //     console.log("✅ Escala creada:", response)

// // //     return {
// // //       success: true,
// // //       data: response.data,
// // //       message: response.message || "Escala creada exitosamente",
// // //     }
// // //   } catch (error) {
// // //     console.error("❌ Error en createScale:", error)
// // //     console.error("❌ Error response completo:", error.response?.data)
// // //     console.error("❌ Status:", error.response?.status)
// // //     console.error("❌ Headers:", error.response?.headers)

// // //     // Extraer errores específicos para mostrar al usuario
// // //     let errorMessage = "Error al crear la escala"
// // //     let specificErrors = []

// // //     if (error.response?.data) {
// // //       const responseData = error.response.data

// // //       // Si hay un mensaje principal
// // //       if (responseData.message) {
// // //         errorMessage = responseData.message
// // //       }

// // //       // Si hay errores específicos
// // //       if (responseData.errors) {
// // //         if (Array.isArray(responseData.errors)) {
// // //           specificErrors = responseData.errors
// // //         } else if (typeof responseData.errors === "object") {
// // //           specificErrors = Object.values(responseData.errors).flat()
// // //         }
// // //       }

// // //       // Si hay datos adicionales con errores
// // //       if (responseData.data && responseData.data.errors) {
// // //         if (Array.isArray(responseData.data.errors)) {
// // //           specificErrors = [...specificErrors, ...responseData.data.errors]
// // //         }
// // //       }
// // //     }

// // //     console.error("📛 Errores específicos extraídos:", specificErrors)

// // //     // Si el error es de fechas solapadas, devolver un error más específico
// // //     if (specificErrors.some((error) => error.includes("Ya existe una escala activa"))) {
// // //       return {
// // //         success: false,
// // //         data: null,
// // //         message: "Conflicto de fechas",
// // //         errors: specificErrors,
// // //         errorType: "DATE_OVERLAP",
// // //         fullError: error.response?.data,
// // //       }
// // //     }

// // //     return {
// // //       success: false,
// // //       data: null,
// // //       message: errorMessage,
// // //       errors: specificErrors,
// // //       fullError: error.response?.data, // Para debugging
// // //     }
// // //   }
// // // }

// // // // Actualizar escala
// // // export const updateScale = async (id, scaleData) => {
// // //   try {
// // //     console.log("🌐 Actualizando escala:", id, scaleData)
// // //     const response = await api.put(`${BASE_URL}/${id}`, scaleData)
// // //     console.log("✅ Escala actualizada:", response)

// // //     return {
// // //       success: true,
// // //       data: response.data,
// // //       message: response.message || "Escala actualizada exitosamente",
// // //     }
// // //   } catch (error) {
// // //     console.error("❌ Error en updateScale:", error)
// // //     console.error("❌ Error response:", error.response?.data)

// // //     let errorMessage = "Error al actualizar la escala"
// // //     let specificErrors = []

// // //     if (error.response?.data) {
// // //       const responseData = error.response.data
// // //       if (responseData.message) errorMessage = responseData.message
// // //       if (responseData.errors) {
// // //         if (Array.isArray(responseData.errors)) {
// // //           specificErrors = responseData.errors
// // //         } else if (typeof responseData.errors === "object") {
// // //           specificErrors = Object.values(responseData.errors).flat()
// // //         }
// // //       }
// // //     }

// // //     return {
// // //   success: true,
// // //   data: response.data.data, // 👈 extraes el .data anidado
// // //   message: response.data.message || "Escalas obtenidas exitosamente",
// // // };
// // //   }
// // // }

// // // // Eliminar escala
// // // export const deleteScale = async (id) => {
// // //   try {
// // //     console.log("🌐 Eliminando escala:", id)
// // //     const response = await api.delete(`${BASE_URL}/${id}`)
// // //     console.log("✅ Escala eliminada:", response)

// // //     return {
// // //       success: true,
// // //       data: response.data,
// // //       message: response.message || "Escala eliminada exitosamente",
// // //     }
// // //   } catch (error) {
// // //     console.error("❌ Error en deleteScale:", error)
// // //     return {
// // //       success: false,
// // //       data: null,
// // //       message: error.response?.data?.message || error.message || "Error al eliminar la escala",
// // //     }
// // //   }
// // // }

// // // // Obtener estadísticas
// // // export const getScaleStats = async () => {
// // //   try {
// // //     console.log("🌐 Obteniendo estadísticas de escalas")
// // //     const response = await api.get(`${BASE_URL}/stats`)
// // //     console.log("📊 Estadísticas obtenidas:", response)

// // //     return {
// // //       success: true,
// // //       data: response.data,
// // //       message: response.message || "Estadísticas obtenidas exitosamente",
// // //     }
// // //   } catch (error) {
// // //     console.error("❌ Error en getScaleStats:", error)
// // //     return {
// // //       success: false,
// // //       data: null,
// // //       message: error.response?.data?.message || error.message || "Error al obtener estadísticas",
// // //     }
// // //   }
// // // }

// // // export default {
// // //   getScales,
// // //   getScaleById,
// // //   createScale,
// // //   updateScale,
// // //   deleteScale,
// // //   getScaleStats,
// // // }
// // // Usar la URL completa directamente para evitar problemas
// // const getScales = async (params = {}) => {
// //   try {
// //     console.log("🔄 scaleService.getScales - INICIO")
// //     console.log("📋 Parámetros recibidos:", params)

// //     // URL completa y directa
// //     const baseUrl = "http://localhost:3000/api/scales"

// //     // Construir query string
// //     const queryParams = new URLSearchParams()
// //     if (params.page) queryParams.append("page", params.page)
// //     if (params.limit) queryParams.append("limit", params.limit)
// //     if (params.search) queryParams.append("search", params.search)
// //     if (params.estado) queryParams.append("estado", params.estado)

// //     const queryString = queryParams.toString()
// //     const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl

// //     console.log("🌐 URL COMPLETA que se va a llamar:", fullUrl)

// //     // Hacer petición directa con fetch para evitar problemas de axios
// //     const response = await fetch(fullUrl, {
// //       method: "GET",
// //       headers: {
// //         "Content-Type": "application/json",
// //         "x-api-key": "sara_d32775a2ea8a39a3.a14bb968e21a6be6821d19f2764945338ba182b972aff43732b0c7c8314d343a",
// //       },
// //     })

// //     console.log("📡 Response status:", response.status)
// //     console.log("📡 Response ok:", response.ok)

// //     if (!response.ok) {
// //       throw new Error(`HTTP error! status: ${response.status}`)
// //     }

// //     const data = await response.json()
// //     console.log("📥 Datos recibidos:", data)

// //     return data
// //   } catch (error) {
// //     console.error("❌ ERROR COMPLETO en getScales:", error)
// //     console.error("❌ Error message:", error.message)
// //     console.error("❌ Error stack:", error.stack)
// //     throw error
// //   }
// // }

// // const createScale = async (scaleData) => {
// //   try {
// //     console.log("📤 scaleService.createScale - Enviando:", scaleData)

// //     const response = await fetch("http://localhost:3000/api/scales", {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         "x-api-key": "sara_d32775a2ea8a39a3.a14bb968e21a6be6821d19f2764945338ba182b972aff43732b0c7c8314d343a",
// //       },
// //       body: JSON.stringify(scaleData),
// //     })

// //     console.log("📡 Create response status:", response.status)

// //     if (!response.ok) {
// //       const errorData = await response.json()
// //       throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
// //     }

// //     const data = await response.json()
// //     console.log("📥 Create response data:", data)

// //     return data
// //   } catch (error) {
// //     console.error("❌ ERROR en createScale:", error)
// //     throw error
// //   }
// // }

// // const updateScale = async (id, scaleData) => {
// //   try {
// //     console.log("📤 scaleService.updateScale - ID:", id, "Datos:", scaleData)

// //     const response = await fetch(`http://localhost:3000/api/scales/${id}`, {
// //       method: "PUT",
// //       headers: {
// //         "Content-Type": "application/json",
// //         "x-api-key": "sara_d32775a2ea8a39a3.a14bb968e21a6be6821d19f2764945338ba182b972aff43732b0c7c8314d343a",
// //       },
// //       body: JSON.stringify(scaleData),
// //     })

// //     if (!response.ok) {
// //       const errorData = await response.json()
// //       throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
// //     }

// //     const data = await response.json()
// //     console.log("📥 Update response data:", data)

// //     return data
// //   } catch (error) {
// //     console.error("❌ ERROR en updateScale:", error)
// //     throw error
// //   }
// // }

// // const deleteScale = async (id) => {
// //   try {
// //     console.log("🗑️ scaleService.deleteScale - ID:", id)

// //     const response = await fetch(`http://localhost:3000/api/scales/${id}`, {
// //       method: "DELETE",
// //       headers: {
// //         "Content-Type": "application/json",
// //         "x-api-key": "sara_d32775a2ea8a39a3.a14bb968e21a6be6821d19f2764945338ba182b972aff43732b0c7c8314d343a",
// //       },
// //     })

// //     if (!response.ok) {
// //       const errorData = await response.json()
// //       throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
// //     }

// //     const data = await response.json()
// //     console.log("📥 Delete response data:", data)

// //     return data
// //   } catch (error) {
// //     console.error("❌ ERROR en deleteScale:", error)
// //     throw error
// //   }
// // }

// // const getScaleById = async (id) => {
// //   try {
// //     console.log("🔍 scaleService.getScaleById - ID:", id)

// //     const response = await fetch(`http://localhost:3000/api/scales/${id}`, {
// //       method: "GET",
// //       headers: {
// //         "Content-Type": "application/json",
// //         "x-api-key": "sara_d32775a2ea8a39a3.a14bb968e21a6be6821d19f2764945338ba182b972aff43732b0c7c8314d343a",
// //       },
// //     })

// //     if (!response.ok) {
// //       const errorData = await response.json()
// //       throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
// //     }

// //     const data = await response.json()
// //     console.log("📥 GetById response data:", data)

// //     return data
// //   } catch (error) {
// //     console.error("❌ ERROR en getScaleById:", error)
// //     throw error
// //   }
// // }

// // export { getScales, createScale, updateScale, deleteScale, getScaleById }
// // export default { getScales, createScale, updateScale, deleteScale, getScaleById }
// // Usar la URL completa directamente para evitar problemas
// const getScales = async (params = {}) => {
//   try {
//     console.log("🔄 scaleService.getScales - INICIO")
//     console.log("📋 Parámetros recibidos:", params)

//     // URL completa y directa
//     const baseUrl = "http://localhost:3000/api/scales"

//     // Construir query string
//     const queryParams = new URLSearchParams()
//     if (params.page) queryParams.append("page", params.page)
//     if (params.limit) queryParams.append("limit", params.limit)
//     if (params.search) queryParams.append("search", params.search)
//     if (params.estado) queryParams.append("estado", params.estado)

//     const queryString = queryParams.toString()
//     const fullUrl = queryString ? `${baseUrl}?${queryString}` : baseUrl

//     console.log("🌐 URL COMPLETA que se va a llamar:", fullUrl)

//     // Hacer petición directa con fetch para evitar problemas de axios
//     const response = await fetch(fullUrl, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-key": "sara_d32775a2ea8a39a3.a14bb968e21a6be6821d19f2764945338ba182b972aff43732b0c7c8314d343a",
//       },
//     })

//     console.log("📡 Response status:", response.status)
//     console.log("📡 Response ok:", response.ok)

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }

//     const data = await response.json()
//     console.log("📥 Datos recibidos:", data)

//     return data
//   } catch (error) {
//     console.error("❌ ERROR COMPLETO en getScales:", error)
//     console.error("❌ Error message:", error.message)
//     console.error("❌ Error stack:", error.stack)
//     throw error
//   }
// }

// const createScale = async (scaleData) => {
//   try {
//     console.log("📤 scaleService.createScale - Enviando:", scaleData)

//     const response = await fetch("http://localhost:3000/api/scales", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-key": "sara_d32775a2ea8a39a3.a14bb968e21a6be6821d19f2764945338ba182b972aff43732b0c7c8314d343a",
//       },
//       body: JSON.stringify(scaleData),
//     })

//     console.log("📡 Create response status:", response.status)

//     if (!response.ok) {
//       const errorData = await response.json()
//       console.error("❌ Create error data:", errorData)
//       throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//     }

//     const data = await response.json()
//     console.log("📥 Create response data:", data)

//     return data
//   } catch (error) {
//     console.error("❌ ERROR en createScale:", error)
//     throw error
//   }
// }

// const updateScale = async (id, scaleData) => {
//   try {
//     console.log("📤 scaleService.updateScale - INICIANDO")
//     console.log("🆔 ID de la escala:", id)
//     console.log("📋 Datos ORIGINALES recibidos:", JSON.stringify(scaleData, null, 2))

//     // Limpiar y validar datos antes de enviar
//     const cleanData = {
//       fechaInicial: scaleData.fechaInicial,
//       fechaFinal: scaleData.fechaFinal,
//       descripcion: scaleData.descripcion || "",
//       apruebaPorcentaje: Number(scaleData.apruebaPorcentaje),
//       metricas: Array.isArray(scaleData.metricas)
//         ? scaleData.metricas.map((metrica) => ({
//             rangoInicial: Number(metrica.rangoInicial),
//             rangoFinal: Number(metrica.rangoFinal),
//             concepto: metrica.concepto,
//             descripcion: metrica.descripcion || "",
//           }))
//         : [],
//     }

//     console.log("🧹 Datos LIMPIADOS para enviar:", JSON.stringify(cleanData, null, 2))

//     const url = `http://localhost:3000/api/scales/${id}`
//     console.log("🌐 URL completa:", url)

//     const response = await fetch(url, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-key": "sara_d32775a2ea8a39a3.a14bb968e21a6be6821d19f2764945338ba182b972aff43732b0c7c8314d343a",
//       },
//       body: JSON.stringify(cleanData),
//     })

//     console.log("📡 Update response status:", response.status)
//     console.log("📡 Update response ok:", response.ok)

//     // Obtener la respuesta como texto primero para debug
//     const responseText = await response.text()
//     console.log("📄 Response text completo:", responseText)

//     if (!response.ok) {
//       let errorData
//       try {
//         errorData = JSON.parse(responseText)
//       } catch (parseError) {
//         console.error("❌ Error parsing response:", parseError)
//         throw new Error(`HTTP error! status: ${response.status}, response: ${responseText}`)
//       }

//       console.error("❌ Update error data completo:", errorData)
//       console.error("❌ Error message:", errorData.message)
//       console.error("❌ Error errors:", errorData.errors)
//       console.error("❌ Error data:", errorData.data)

//       // Crear mensaje de error más detallado
//       let errorMessage = errorData.message || `HTTP error! status: ${response.status}`
//       if (errorData.errors && Array.isArray(errorData.errors)) {
//         errorMessage += `: ${errorData.errors.join(", ")}`
//       }

//       throw new Error(errorMessage)
//     }

//     let data
//     try {
//       data = JSON.parse(responseText)
//     } catch (parseError) {
//       console.error("❌ Error parsing success response:", parseError)
//       throw new Error("Error parsing server response")
//     }

//     console.log("📥 Update response data:", data)
//     return data
//   } catch (error) {
//     console.error("❌ ERROR COMPLETO en updateScale:", error)
//     console.error("❌ Error message:", error.message)
//     console.error("❌ Error stack:", error.stack)
//     throw error
//   }
// }

// const deleteScale = async (id) => {
//   try {
//     console.log("🗑️ scaleService.deleteScale - ID:", id)

//     const response = await fetch(`http://localhost:3000/api/scales/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-key": "sara_d32775a2ea8a39a3.a14bb968e21a6be6821d19f2764945338ba182b972aff43732b0c7c8314d343a",
//       },
//     })

//     if (!response.ok) {
//       const errorData = await response.json()
//       throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//     }

//     const data = await response.json()
//     console.log("📥 Delete response data:", data)

//     return data
//   } catch (error) {
//     console.error("❌ ERROR en deleteScale:", error)
//     throw error
//   }
// }

// const getScaleById = async (id) => {
//   try {
//     console.log("🔍 scaleService.getScaleById - ID:", id)

//     const response = await fetch(`http://localhost:3000/api/scales/${id}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-key": "sara_d32775a2ea8a39a3.a14bb968e21a6be6821d19f2764945338ba182b972aff43732b0c7c8314d343a",
//       },
//     })

//     if (!response.ok) {
//       const errorData = await response.json()
//       throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
//     }

//     const data = await response.json()
//     console.log("📥 GetById response data:", data)

//     return data
//   } catch (error) {
//     console.error("❌ ERROR en getScaleById:", error)
//     throw error
//   }
// }

// export { getScales, createScale, updateScale, deleteScale, getScaleById }
// export default { getScales, createScale, updateScale, deleteScale, getScaleById }
import api from "../../../shared/services/api"

const BASE_URL = "/scales"

export const getScales = async (params = {}) => {
  try {
    console.log("🔄 scaleService.getScales - Iniciando petición con params:", params)

    // Construir query string si hay parámetros
    const queryParams = new URLSearchParams()

    if (params.page) queryParams.append("page", params.page)
    if (params.limit) queryParams.append("limit", params.limit)
    if (params.search) queryParams.append("search", params.search)
    if (params.estado) queryParams.append("estado", params.estado)

    const queryString = queryParams.toString()
    const url = queryString ? `${BASE_URL}?${queryString}` : BASE_URL

    console.log("📡 scaleService.getScales - URL relativa:", url)

    const response = await api.get(url)

    console.log("📥 scaleService.getScales - Respuesta completa:", response)
    console.log("📊 scaleService.getScales - Status:", response.status)
    console.log("📋 scaleService.getScales - Data:", response.data)

    // Verificar si la respuesta es exitosa
    if (response.status === 200 && response.data) {
      console.log("✅ scaleService.getScales - Respuesta exitosa")
      return response.data
    } else {
      console.error("❌ scaleService.getScales - Respuesta no válida:", response)
      throw new Error("Respuesta no válida del servidor")
    }
  } catch (error) {
    console.error("❌ scaleService.getScales - Error completo:", error)
    console.error("❌ scaleService.getScales - Error message:", error.message)
    console.error("❌ scaleService.getScales - Error response:", error.response)

    if (error.response) {
      console.error("❌ scaleService.getScales - Error status:", error.response.status)
      console.error("❌ scaleService.getScales - Error data:", error.response.data)
    }

    throw error
  }
}

export const createScale = async (scaleData) => {
  try {
    console.log("📤 scaleService.createScale - Enviando datos:", scaleData)

    const response = await api.post(BASE_URL, scaleData)

    console.log("📥 scaleService.createScale - Respuesta:", response.data)

    return response.data
  } catch (error) {
    console.error("❌ scaleService.createScale - Error:", error)

    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Error al crear la escala")
    }

    throw error
  }
}

export const updateScale = async (id, scaleData) => {
  try {
    console.log("🔧 ===== INICIO UPDATE SCALE =====")
    console.log("🆔 ID de la escala:", id)
    console.log("📋 Datos ORIGINALES recibidos:", JSON.stringify(scaleData, null, 2))

    // Limpiar datos específicamente para evitar problemas
    const cleanData = {
      fechaInicial: scaleData.fechaInicial,
      fechaFinal: scaleData.fechaFinal,
      descripcion: scaleData.descripcion || "",
      apruebaPorcentaje: Number(scaleData.apruebaPorcentaje) || 70,
    }

    // Solo agregar métricas si existen y son válidas
    if (scaleData.metricas && Array.isArray(scaleData.metricas) && scaleData.metricas.length > 0) {
      cleanData.metricas = scaleData.metricas
        .filter((metrica) => metrica.concepto && metrica.rangoInicial !== undefined && metrica.rangoFinal !== undefined)
        .map((metrica) => ({
          rangoInicial: Number(metrica.rangoInicial),
          rangoFinal: Number(metrica.rangoFinal),
          concepto: String(metrica.concepto).trim(),
          descripcion: String(metrica.descripcion || "").trim(),
        }))
    } else {
      cleanData.metricas = []
    }

    console.log("🧹 Datos LIMPIADOS para enviar:", JSON.stringify(cleanData, null, 2))

    const response = await api.put(`${BASE_URL}/${id}`, cleanData)

    console.log("📥 scaleService.updateScale - Respuesta:", response.data)
    console.log("🔧 ===== FIN UPDATE SCALE =====")

    return response.data
  } catch (error) {
    console.error("❌ scaleService.updateScale - Error completo:", error)
    console.error("❌ Error message:", error.message)

    if (error.response) {
      console.error("❌ Error response status:", error.response.status)
      console.error("❌ Error response data:", error.response.data)

      // Extraer mensaje de error más específico
      const errorData = error.response.data
      if (errorData && errorData.data && errorData.data.errors) {
        console.error("❌ Errores específicos:", errorData.data.errors)
        throw new Error(`Errores de validación: ${errorData.data.errors.join(", ")}`)
      } else if (errorData && errorData.message) {
        throw new Error(errorData.message)
      }
    }

    throw error
  }
}

export const deleteScale = async (id) => {
  try {
    console.log("🗑️ scaleService.deleteScale - ID:", id)

    const response = await api.delete(`${BASE_URL}/${id}`)

    console.log("📥 scaleService.deleteScale - Respuesta:", response.data)

    return response.data
  } catch (error) {
    console.error("❌ scaleService.deleteScale - Error:", error)

    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Error al eliminar la escala")
    }

    throw error
  }
}

export const getScaleById = async (id) => {
  try {
    console.log("🔍 scaleService.getScaleById - ID:", id)

    const response = await api.get(`${BASE_URL}/${id}`)

    console.log("📥 scaleService.getScaleById - Respuesta:", response.data)

    return response.data
  } catch (error) {
    console.error("❌ scaleService.getScaleById - Error:", error)

    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || "Error al obtener la escala")
    }

    throw error
  }
}
