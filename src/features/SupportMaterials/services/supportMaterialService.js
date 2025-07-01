
// // // // const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

// // // // class SupportMaterialService {
// // // //   async getAllMaterials(page = 1, limit = 10, filters = {}) {
// // // //     try {
// // // //       const queryParams = new URLSearchParams({
// // // //         page: page.toString(),
// // // //         limit: limit.toString(),
// // // //         ...filters,
// // // //       })

// // // //       const response = await fetch(`${API_BASE_URL}/support-materials?${queryParams}`)

// // // //       if (!response.ok) {
// // // //         throw new Error(`Error ${response.status}: ${response.statusText}`)
// // // //       }

// // // //       const data = await response.json()

// // // //       if (data.success) {
// // // //         // Si es la primera página y no hay filtros específicos, devolver solo los materiales
// // // //         if (page === 1 && Object.keys(filters).length === 0) {
// // // //           return data.data.materials || data.data
// // // //         }
// // // //         return data.data
// // // //       } else {
// // // //         throw new Error(data.message || "Error al obtener materiales")
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error en getAllMaterials:", error)
// // // //       throw error
// // // //     }
// // // //   }

// // // //   async getMaterialById(id) {
// // // //     try {
// // // //       const response = await fetch(`${API_BASE_URL}/support-materials/${id}`)

// // // //       if (!response.ok) {
// // // //         throw new Error(`Error ${response.status}: ${response.statusText}`)
// // // //       }

// // // //       const data = await response.json()

// // // //       if (data.success) {
// // // //         return data.data
// // // //       } else {
// // // //         throw new Error(data.message || "Error al obtener material")
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error en getMaterialById:", error)
// // // //       throw error
// // // //     }
// // // //   }

// // // //   async createMaterial(materialData) {
// // // //     try {
// // // //       const response = await fetch(`${API_BASE_URL}/support-materials`, {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //         },
// // // //         body: JSON.stringify(materialData),
// // // //       })

// // // //       if (!response.ok) {
// // // //         const errorData = await response.json()
// // // //         throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
// // // //       }

// // // //       const data = await response.json()

// // // //       if (data.success) {
// // // //         return data.data
// // // //       } else {
// // // //         throw new Error(data.message || "Error al crear material")
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error en createMaterial:", error)
// // // //       throw error
// // // //     }
// // // //   }

// // // //   async updateMaterial(id, materialData) {
// // // //     try {
// // // //       const response = await fetch(`${API_BASE_URL}/support-materials/${id}`, {
// // // //         method: "PUT",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //         },
// // // //         body: JSON.stringify(materialData),
// // // //       })

// // // //       if (!response.ok) {
// // // //         const errorData = await response.json()
// // // //         throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
// // // //       }

// // // //       const data = await response.json()

// // // //       if (data.success) {
// // // //         return data.data
// // // //       } else {
// // // //         throw new Error(data.message || "Error al actualizar material")
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error en updateMaterial:", error)
// // // //       throw error
// // // //     }
// // // //   }

// // // //   async deleteMaterial(id) {
// // // //     try {
// // // //       console.log(`Eliminando material con ID: ${id} de la base de datos...`)

// // // //       const response = await fetch(`${API_BASE_URL}/support-materials/${id}`, {
// // // //         method: "DELETE",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //         },
// // // //       })

// // // //       if (!response.ok) {
// // // //         const errorData = await response.json()
// // // //         throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
// // // //       }

// // // //       const data = await response.json()

// // // //       if (data.success) {
// // // //         console.log("Material eliminado exitosamente de la base de datos")
// // // //         return true
// // // //       } else {
// // // //         throw new Error(data.message || "Error al eliminar material")
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error en deleteMaterial:", error)
// // // //       throw error
// // // //     }
// // // //   }

// // // //   async getTopics() {
// // // //     try {
// // // //       const response = await fetch(`${API_BASE_URL}/support-materials/topics`)

// // // //       if (!response.ok) {
// // // //         throw new Error(`Error ${response.status}: ${response.statusText}`)
// // // //       }

// // // //       const data = await response.json()

// // // //       if (data.success) {
// // // //         return data.data
// // // //       } else {
// // // //         throw new Error(data.message || "Error al obtener temas")
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error en getTopics:", error)
// // // //       throw error
// // // //     }
// // // //   }

// // // //   async searchMaterials(searchTerm) {
// // // //     try {
// // // //       const response = await fetch(`${API_BASE_URL}/support-materials/search?q=${encodeURIComponent(searchTerm)}`)

// // // //       if (!response.ok) {
// // // //         throw new Error(`Error ${response.status}: ${response.statusText}`)
// // // //       }

// // // //       const data = await response.json()

// // // //       if (data.success) {
// // // //         return data.data
// // // //       } else {
// // // //         throw new Error(data.message || "Error en búsqueda")
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error en searchMaterials:", error)
// // // //       throw error
// // // //     }
// // // //   }

// // // //   async getMaterials() {
// // // //     return this.getAllMaterials()
// // // //   }
// // // // }

// // // // // Exportar una instancia de la clase
// // // // const supportMaterialService = new SupportMaterialService()
// // // // export default supportMaterialService
// // // import { api } from "../../../shared/services/api"

// // // export const supportMaterialService = {
// // //   // Obtener todos los materiales
// // //   getAll: async (params = {}) => {
// // //     try {
// // //       console.log("🔄 supportMaterialService.getAll - Obteniendo materiales...")
// // //       const queryString = new URLSearchParams(params).toString()
// // //       const url = queryString ? `/support-materials?${queryString}` : "/support-materials"

// // //       const response = await api.get(url)
// // //       console.log("✅ Materiales obtenidos:", response)
// // //       return response
// // //     } catch (error) {
// // //       console.error("❌ Error al obtener materiales:", error)
// // //       throw error
// // //     }
// // //   },

// // //   // Obtener material por ID
// // //   getById: async (id) => {
// // //     try {
// // //       console.log("🔄 supportMaterialService.getById - ID:", id)
// // //       const response = await api.get(`/support-materials/${id}`)
// // //       console.log("✅ Material obtenido:", response)
// // //       return response
// // //     } catch (error) {
// // //       console.error("❌ Error al obtener material:", error)
// // //       throw error
// // //     }
// // //   },

// // //   // Crear nuevo material
// // //   create: async (materialData) => {
// // //     try {
// // //       console.log("🔄 supportMaterialService.create - Datos:", materialData)
// // //       const response = await api.post("/support-materials", materialData)
// // //       console.log("✅ Material creado:", response)
// // //       return response
// // //     } catch (error) {
// // //       console.error("❌ Error al crear material:", error)
// // //       throw error
// // //     }
// // //   },

// // //   // Actualizar material
// // //   update: async (id, materialData) => {
// // //     try {
// // //       console.log("🔄 supportMaterialService.update - ID:", id, "Datos:", materialData)
// // //       const response = await api.put(`/support-materials/${id}`, materialData)
// // //       console.log("✅ Material actualizado:", response)
// // //       return response
// // //     } catch (error) {
// // //       console.error("❌ Error al actualizar material:", error)
// // //       throw error
// // //     }
// // //   },

// // //   // Eliminar material
// // //   delete: async (id) => {
// // //     try {
// // //       console.log("🔄 supportMaterialService.delete - ID:", id)
// // //       const response = await api.delete(`/support-materials/${id}`)
// // //       console.log("✅ Material eliminado:", response)
// // //       return response
// // //     } catch (error) {
// // //       console.error("❌ Error al eliminar material:", error)
// // //       throw error
// // //     }
// // //   },
// // // }
// // import  api  from "../../../shared/services/api"

// // export const supportMaterialService = {
// //   // Obtener todos los materiales
// //   getAllMaterials: async (params = {}) => {
// //     try {
// //       console.log("🔄 supportMaterialService.getAll - Obteniendo materiales...")
// //       const queryString = new URLSearchParams(params).toString()
// //       const url = queryString ? `/support-materials?${queryString}` : "/support-materials"

// //       const response = await api.get(url)
// //       console.log("✅ Materiales obtenidos:", response)
// //       return response
// //     } catch (error) {
// //       console.error("❌ Error al obtener materiales:", error)
// //       throw error
// //     }
// //   },

// //   // Obtener material por ID
// //   getById: async (id) => {
// //     try {
// //       console.log("🔄 supportMaterialService.getById - ID:", id)
// //       const response = await api.get(`/support-materials/${id}`)
// //       console.log("✅ Material obtenido:", response)
// //       return response
// //     } catch (error) {
// //       console.error("❌ Error al obtener material:", error)
// //       throw error
// //     }
// //   },

// //   // Crear nuevo material
// //   create: async (materialData) => {
// //     try {
// //       console.log("🔄 supportMaterialService.create - Datos:", materialData)
// //       const response = await api.post("/support-materials", materialData)
// //       console.log("✅ Material creado:", response)
// //       return response
// //     } catch (error) {
// //       console.error("❌ Error al crear material:", error)
// //       throw error
// //     }
// //   },

// //   // Actualizar material
// //   update: async (id, materialData) => {
// //     try {
// //       console.log("🔄 supportMaterialService.update - ID:", id, "Datos:", materialData)
// //       const response = await api.put(`/support-materials/${id}`, materialData)
// //       console.log("✅ Material actualizado:", response)
// //       return response
// //     } catch (error) {
// //       console.error("❌ Error al actualizar material:", error)
// //       throw error
// //     }
// //   },

// //   // Eliminar material
// //   delete: async (id) => {
// //     try {
// //       console.log("🔄 supportMaterialService.delete - ID:", id)
// //       const response = await api.delete(`/support-materials/${id}`)
// //       console.log("✅ Material eliminado:", response)
// //       return response
// //     } catch (error) {
// //       console.error("❌ Error al eliminar material:", error)
// //       throw error
// //     }
// //   },
// // }
// import { api } from "../../../shared/services/api"

// export const supportMaterialService = {
//   // Obtener todos los materiales - CORRIGIENDO EL NOMBRE DE LA FUNCIÓN
//   getAll: async (params = {}) => {
//     try {
//       console.log("🔄 supportMaterialService.getAll - Obteniendo materiales...")
//       const queryString = new URLSearchParams(params).toString()
//       const url = queryString ? `/support-materials?${queryString}` : "/support-materials"

//       const response = await api.get(url)
//       console.log("✅ Materiales obtenidos:", response)
//       return response
//     } catch (error) {
//       console.error("❌ Error al obtener materiales:", error)
//       throw error
//     }
//   },

//   // AGREGANDO LA FUNCIÓN QUE FALTA
//   getAllMaterials: async (params = {}) => {
//     return await supportMaterialService.getAll(params)
//   },

//   // Obtener material por ID
//   getById: async (id) => {
//     try {
//       console.log("🔄 supportMaterialService.getById - ID:", id)
//       const response = await api.get(`/support-materials/${id}`)
//       console.log("✅ Material obtenido:", response)
//       return response
//     } catch (error) {
//       console.error("❌ Error al obtener material:", error)
//       throw error
//     }
//   },

//   // Crear nuevo material
//   create: async (materialData) => {
//     try {
//       console.log("🔄 supportMaterialService.create - Datos:", materialData)
//       const response = await api.post("/support-materials", materialData)
//       console.log("✅ Material creado:", response)
//       return response
//     } catch (error) {
//       console.error("❌ Error al crear material:", error)
//       throw error
//     }
//   },

//   // Actualizar material
//   update: async (id, materialData) => {
//     try {
//       console.log("🔄 supportMaterialService.update - ID:", id, "Datos:", materialData)
//       const response = await api.put(`/support-materials/${id}`, materialData)
//       console.log("✅ Material actualizado:", response)
//       return response
//     } catch (error) {
//       console.error("❌ Error al actualizar material:", error)
//       throw error
//     }
//   },

//   // Eliminar material
//   delete: async (id) => {
//     try {
//       console.log("🔄 supportMaterialService.delete - ID:", id)
//       const response = await api.delete(`/support-materials/${id}`)
//       console.log("✅ Material eliminado:", response)
//       return response
//     } catch (error) {
//       console.error("❌ Error al eliminar material:", error)
//       throw error
//     }
//   },
// }
const API_BASE_URL = "http://localhost:3000/api"

// Obtener todos los materiales
export const getAllMaterials = async () => {
  try {
    console.log("🚀 supportMaterialService.getAllMaterials - INICIO")

    const response = await fetch(`${API_BASE_URL}/support-materials`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log("📡 Response status:", response.status)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("📥 Datos recibidos:", data)

    // Manejar diferentes formatos de respuesta
    if (data.success && data.data) {
      return data.data
    } else if (Array.isArray(data)) {
      return data
    } else if (data.materials) {
      return data.materials
    } else {
      console.warn("⚠️ Formato de respuesta inesperado:", data)
      return []
    }
  } catch (error) {
    console.error("❌ Error en getAllMaterials:", error)
    throw error
  }
}

// Crear un nuevo material
export const createMaterial = async (materialData) => {
  try {
    console.log("🚀 supportMaterialService.createMaterial - INICIO")
    console.log("📤 Datos a enviar:", materialData)

    const response = await fetch(`${API_BASE_URL}/support-materials`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(materialData),
    })

    console.log("📡 Response status:", response.status)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("📥 Material creado:", data)

    return data.data || data
  } catch (error) {
    console.error("❌ Error en createMaterial:", error)
    throw error
  }
}

// Actualizar un material existente
export const updateMaterial = async (id, materialData) => {
  try {
    console.log("🚀 supportMaterialService.updateMaterial - INICIO")
    console.log("📤 ID:", id, "Datos:", materialData)

    const response = await fetch(`${API_BASE_URL}/support-materials/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(materialData),
    })

    console.log("📡 Response status:", response.status)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("📥 Material actualizado:", data)

    return data.data || data
  } catch (error) {
    console.error("❌ Error en updateMaterial:", error)
    throw error
  }
}

// Eliminar un material
export const deleteMaterial = async (id) => {
  try {
    console.log("🚀 supportMaterialService.deleteMaterial - INICIO")
    console.log("📤 ID a eliminar:", id)

    const response = await fetch(`${API_BASE_URL}/support-materials/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    console.log("📡 Response status:", response.status)

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log("📥 Material eliminado:", data)

    return data
  } catch (error) {
    console.error("❌ Error en deleteMaterial:", error)
    throw error
  }
}

export default {
  getAllMaterials,
  createMaterial,
  updateMaterial,
  deleteMaterial,
}
