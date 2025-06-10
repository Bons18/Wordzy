// // // // // // import api from "./api"

// // // // // // export const supportMaterialService = {
// // // // // //   // Obtener todos los materiales
// // // // // //   getAll: async () => {
// // // // // //     try {
// // // // // //       const response = await api.get("/support-materials")
// // // // // //       return response.data
// // // // // //     } catch (error) {
// // // // // //       throw new Error(error.response?.data?.message || "Error al obtener materiales")
// // // // // //     }
// // // // // //   },

// // // // // //   // Obtener material por ID
// // // // // //   getById: async (id) => {
// // // // // //     try {
// // // // // //       const response = await api.get(`/support-materials/${id}`)
// // // // // //       return response.data
// // // // // //     } catch (error) {
// // // // // //       throw new Error(error.response?.data?.message || "Error al obtener material")
// // // // // //     }
// // // // // //   },

// // // // // //   // Crear nuevo material
// // // // // //   create: async (materialData) => {
// // // // // //     try {
// // // // // //       const response = await api.post("/support-materials", materialData)
// // // // // //       return response.data
// // // // // //     } catch (error) {
// // // // // //       throw new Error(error.response?.data?.message || "Error al crear material")
// // // // // //     }
// // // // // //   },

// // // // // //   // Actualizar material
// // // // // //   update: async (id, materialData) => {
// // // // // //     try {
// // // // // //       const response = await api.put(`/support-materials/${id}`, materialData)
// // // // // //       return response.data
// // // // // //     } catch (error) {
// // // // // //       throw new Error(error.response?.data?.message || "Error al actualizar material")
// // // // // //     }
// // // // // //   },

// // // // // //   // Eliminar material
// // // // // //   delete: async (id) => {
// // // // // //     try {
// // // // // //       const response = await api.delete(`/support-materials/${id}`)
// // // // // //       return response.data
// // // // // //     } catch (error) {
// // // // // //       throw new Error(error.response?.data?.message || "Error al eliminar material")
// // // // // //     }
// // // // // //   },
// // // // // // }
// // // // // import api from "./api"

// // // // // export const supportMaterialService = {
// // // // //   // Obtener todos los materiales
// // // // //   getAll: async () => {
// // // // //     try {
// // // // //       const response = await api.get("/support-materials")
// // // // //       return response.data
// // // // //     } catch (error) {
// // // // //       throw new Error(error.response?.data?.message || "Error al obtener materiales")
// // // // //     }
// // // // //   },

// // // // //   // Obtener material por ID
// // // // //   getById: async (id) => {
// // // // //     try {
// // // // //       const response = await api.get(`/support-materials/${id}`)
// // // // //       return response.data
// // // // //     } catch (error) {
// // // // //       throw new Error(error.response?.data?.message || "Error al obtener material")
// // // // //     }
// // // // //   },

// // // // //   // Crear nuevo material
// // // // //   create: async (materialData) => {
// // // // //     try {
// // // // //       const response = await api.post("/support-materials", materialData)
// // // // //       return response.data
// // // // //     } catch (error) {
// // // // //       throw new Error(error.response?.data?.message || "Error al crear material")
// // // // //     }
// // // // //   },

// // // // //   // Actualizar material
// // // // //   update: async (id, materialData) => {
// // // // //     try {
// // // // //       const response = await api.put(`/support-materials/${id}`, materialData)
// // // // //       return response.data
// // // // //     } catch (error) {
// // // // //       throw new Error(error.response?.data?.message || "Error al actualizar material")
// // // // //     }
// // // // //   },

// // // // //   // Eliminar material
// // // // //   delete: async (id) => {
// // // // //     try {
// // // // //       const response = await api.delete(`/support-materials/${id}`)
// // // // //       return response.data
// // // // //     } catch (error) {
// // // // //       throw new Error(error.response?.data?.message || "Error al eliminar material")
// // // // //     }
// // // // //   },
// // // // // }
// // // // import api from "./api"

// // // // export const supportMaterialService = {
// // // //   // Obtener todos los materiales
// // // //   getAll: async () => {
// // // //     try {
// // // //       const response = await api.get("/support-materials")
// // // //       return response.data
// // // //     } catch (error) {
// // // //       throw new Error(error.response?.data?.message || "Error al obtener materiales")
// // // //     }
// // // //   },

// // // //   // Obtener material por ID
// // // //   getById: async (id) => {
// // // //     try {
// // // //       const response = await api.get(`/support-materials/${id}`)
// // // //       return response.data
// // // //     } catch (error) {
// // // //       throw new Error(error.response?.data?.message || "Error al obtener material")
// // // //     }
// // // //   },

// // // //   // Crear nuevo material
// // // //   create: async (materialData) => {
// // // //     try {
// // // //       // Adaptar los datos al formato que espera el backend
// // // //       const adaptedData = {
// // // //         titulo: materialData.nombre,
// // // //         descripcion: materialData.descripcion || "",
// // // //         contenido: materialData.contenido,
// // // //         tema: materialData.tema,
// // // //         tipo: materialData.tipo || "documento",
// // // //         archivo_url: materialData.archivo_url || "",
// // // //         estado: materialData.estado === "Activo" ? "activo" : "inactivo",
// // // //       }

// // // //       console.log("Datos adaptados para enviar al backend:", adaptedData)

// // // //       const response = await api.post("/support-materials", adaptedData)
// // // //       return response.data
// // // //     } catch (error) {
// // // //       console.error("Error completo:", error.response?.data)
// // // //       throw new Error(error.response?.data?.message || "Error al crear material")
// // // //     }
// // // //   },

// // // //   // Actualizar material
// // // //   update: async (id, materialData) => {
// // // //     try {
// // // //       // Adaptar los datos al formato que espera el backend
// // // //       const adaptedData = {
// // // //         titulo: materialData.nombre,
// // // //         descripcion: materialData.descripcion || "",
// // // //         contenido: materialData.contenido,
// // // //         tema: materialData.tema,
// // // //         tipo: materialData.tipo || "documento",
// // // //         archivo_url: materialData.archivo_url || "",
// // // //         estado: materialData.estado === "Activo" ? "activo" : "inactivo",
// // // //       }

// // // //       const response = await api.put(`/support-materials/${id}`, adaptedData)
// // // //       return response.data
// // // //     } catch (error) {
// // // //       console.error("Error completo:", error.response?.data)
// // // //       throw new Error(error.response?.data?.message || "Error al actualizar material")
// // // //     }
// // // //   },

// // // //   // Eliminar material
// // // //   delete: async (id) => {
// // // //     try {
// // // //       const response = await api.delete(`/support-materials/${id}`)
// // // //       return response.data
// // // //     } catch (error) {
// // // //       throw new Error(error.response?.data?.message || "Error al eliminar material")
// // // //     }
// // // //   },
// // // // }
// // // import api from "./api"

// // // export const supportMaterialService = {
// // //   // Obtener todos los materiales
// // //   getAll: async () => {
// // //     try {
// // //       const response = await api.get("/support-materials")
// // //       return response.data
// // //     } catch (error) {
// // //       throw new Error(error.response?.data?.message || "Error al obtener materiales")
// // //     }
// // //   },

// // //   // Obtener material por ID
// // //   getById: async (id) => {
// // //     try {
// // //       const response = await api.get(`/support-materials/${id}`)
// // //       return response.data
// // //     } catch (error) {
// // //       throw new Error(error.response?.data?.message || "Error al obtener material")
// // //     }
// // //   },

// // //   // Crear nuevo material
// // //   create: async (materialData) => {
// // //     try {
// // //       // Adaptar los datos al formato que espera el backend
// // //       const adaptedData = {
// // //         titulo: materialData.titulo,
// // //         descripcion: materialData.descripcion || "",
// // //         contenido: materialData.contenido,
// // //         tema: materialData.tema,
// // //         tipo: materialData.tipo || "documento",
// // //         archivo_url: materialData.archivo_url || "",
// // //         estado: materialData.estado === "Activo" ? "activo" : materialData.estado,
// // //       }

// // //       console.log("Datos originales:", materialData)
// // //       console.log("Datos adaptados para enviar al backend:", adaptedData)

// // //       const response = await api.post("/support-materials", adaptedData)
// // //       return response.data
// // //     } catch (error) {
// // //       console.error("Error completo:", error.response?.data)

// // //       // Mostrar errores específicos de validación
// // //       if (error.response?.data?.errors) {
// // //         console.error("Errores de validación específicos:", error.response.data.errors)
// // //         const errorMessages = error.response.data.errors.map((err) => err.message || err).join(", ")
// // //         throw new Error(`Errores de validación: ${errorMessages}`)
// // //       }

// // //       throw new Error(error.response?.data?.message || "Error al crear material")
// // //     }
// // //   },

// // //   // Actualizar material
// // //   update: async (id, materialData) => {
// // //     try {
// // //       // Adaptar los datos al formato que espera el backend
// // //       const adaptedData = {
// // //         titulo: materialData.titulo,
// // //         descripcion: materialData.descripcion || "",
// // //         contenido: materialData.contenido,
// // //         tema: materialData.tema,
// // //         tipo: materialData.tipo || "documento",
// // //         archivo_url: materialData.archivo_url || "",
// // //         estado: materialData.estado === "Activo" ? "activo" : materialData.estado,
// // //       }

// // //       console.log("Datos para actualizar:", adaptedData)

// // //       const response = await api.put(`/support-materials/${id}`, adaptedData)
// // //       return response.data
// // //     } catch (error) {
// // //       console.error("Error completo:", error.response?.data)

// // //       // Mostrar errores específicos de validación
// // //       if (error.response?.data?.errors) {
// // //         console.error("Errores de validación específicos:", error.response.data.errors)
// // //         const errorMessages = error.response.data.errors.map((err) => err.message || err).join(", ")
// // //         throw new Error(`Errores de validación: ${errorMessages}`)
// // //       }

// // //       throw new Error(error.response?.data?.message || "Error al actualizar material")
// // //     }
// // //   },

// // //   // Eliminar material
// // //   delete: async (id) => {
// // //     try {
// // //       const response = await api.delete(`/support-materials/${id}`)
// // //       return response.data
// // //     } catch (error) {
// // //       throw new Error(error.response?.data?.message || "Error al eliminar material")
// // //     }
// // //   },
// // // }
// // import api from "./api"

// // export const supportMaterialService = {
// //   // Obtener todos los materiales
// //   getAll: async () => {
// //     try {
// //       const response = await api.get("/support-materials")
// //       return response.data
// //     } catch (error) {
// //       throw new Error(error.response?.data?.message || "Error al obtener materiales")
// //     }
// //   },

// //   // Obtener material por ID
// //   getById: async (id) => {
// //     try {
// //       const response = await api.get(`/support-materials/${id}`)
// //       return response.data
// //     } catch (error) {
// //       throw new Error(error.response?.data?.message || "Error al obtener material")
// //     }
// //   },

// //   // Crear nuevo material
// //   create: async (materialData) => {
// //     try {
// //       // Adaptar los datos al formato que espera el backend
// //       const adaptedData = {
// //         titulo: materialData.titulo,
// //         descripcion: materialData.descripcion || "",
// //         contenido: materialData.contenido,
// //         tema: materialData.tema,
// //         tipo: materialData.tipo || "documento",
// //         archivo_url: materialData.archivo_url || "",
// //         estado: materialData.estado === "Activo" ? "activo" : materialData.estado,
// //       }

// //       console.log("Datos originales:", materialData)
// //       console.log("Datos adaptados para enviar al backend:", adaptedData)

// //       const response = await api.post("/support-materials", adaptedData)
// //       return response.data
// //     } catch (error) {
// //       console.error("Error completo:", error.response?.data)

// //       // Manejar diferentes formatos de errores de forma más defensiva
// //       let errorMessage = "Error al crear material"

// //       if (error.response?.data) {
// //         const errorData = error.response.data

// //         // Si hay un mensaje directo
// //         if (errorData.message) {
// //           errorMessage = errorData.message
// //         }

// //         // Si hay errores específicos
// //         if (errorData.errors) {
// //           console.error("Errores específicos:", errorData.errors)

// //           // Si errors es un objeto con message
// //           if (errorData.errors.message) {
// //             errorMessage = errorData.errors.message
// //           }
// //           // Si errors es un array
// //           else if (Array.isArray(errorData.errors)) {
// //             const errorMessages = errorData.errors
// //               .map((err) => {
// //                 if (typeof err === "string") return err
// //                 if (err.message) return err.message
// //                 if (err.msg) return err.msg
// //                 return JSON.stringify(err)
// //               })
// //               .join(", ")
// //             errorMessage = `Errores de validación: ${errorMessages}`
// //           }
// //           // Si errors es un objeto (pero no tiene message)
// //           else if (typeof errorData.errors === "object" && !errorData.errors.message) {
// //             const errorMessages = Object.values(errorData.errors)
// //               .map((err) => {
// //                 if (typeof err === "string") return err
// //                 if (err && err.message) return err.message
// //                 if (err && err.msg) return err.msg
// //                 return JSON.stringify(err)
// //               })
// //               .join(", ")
// //             errorMessage = `Errores de validación: ${errorMessages}`
// //           }
// //           // Si errors es un string
// //           else if (typeof errorData.errors === "string") {
// //             errorMessage = `Error de validación: ${errorData.errors}`
// //           }
// //         }
// //       }

// //       throw new Error(errorMessage)
// //     }
// //   },

// //   // Actualizar material
// //   update: async (id, materialData) => {
// //     try {
// //       // Adaptar los datos al formato que espera el backend
// //       const adaptedData = {
// //         titulo: materialData.titulo,
// //         descripcion: materialData.descripcion || "",
// //         contenido: materialData.contenido,
// //         tema: materialData.tema,
// //         tipo: materialData.tipo || "documento",
// //         archivo_url: materialData.archivo_url || "",
// //         estado: materialData.estado === "Activo" ? "activo" : materialData.estado,
// //       }

// //       console.log("Datos para actualizar:", adaptedData)

// //       const response = await api.put(`/support-materials/${id}`, adaptedData)
// //       return response.data
// //     } catch (error) {
// //       console.error("Error completo:", error.response?.data)

// //       // Mismo manejo de errores que en create
// //       let errorMessage = "Error al actualizar material"

// //       if (error.response?.data) {
// //         const errorData = error.response.data

// //         if (errorData.message) {
// //           errorMessage = errorData.message
// //         }

// //         if (errorData.errors) {
// //           console.error("Errores específicos:", errorData.errors)

// //           if (errorData.errors.message) {
// //             errorMessage = errorData.errors.message
// //           } else if (Array.isArray(errorData.errors)) {
// //             const errorMessages = errorData.errors
// //               .map((err) => {
// //                 if (typeof err === "string") return err
// //                 if (err.message) return err.message
// //                 if (err.msg) return err.msg
// //                 return JSON.stringify(err)
// //               })
// //               .join(", ")
// //             errorMessage = `Errores de validación: ${errorMessages}`
// //           } else if (typeof errorData.errors === "object" && !errorData.errors.message) {
// //             const errorMessages = Object.values(errorData.errors)
// //               .map((err) => {
// //                 if (typeof err === "string") return err
// //                 if (err && err.message) return err.message
// //                 if (err && err.msg) return err.msg
// //                 return JSON.stringify(err)
// //               })
// //               .join(", ")
// //             errorMessage = `Errores de validación: ${errorMessages}`
// //           } else if (typeof errorData.errors === "string") {
// //             errorMessage = `Error de validación: ${errorData.errors}`
// //           }
// //         }
// //       }

// //       throw new Error(errorMessage)
// //     }
// //   },

// //   // Eliminar material
// //   delete: async (id) => {
// //     try {
// //       const response = await api.delete(`/support-materials/${id}`)
// //       return response.data
// //     } catch (error) {
// //       throw new Error(error.response?.data?.message || "Error al eliminar material")
// //     }
// //   },
// // }
// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

// class SupportMaterialService {
//   async getAllMaterials(page = 1, limit = 10, filters = {}) {
//     try {
//       const queryParams = new URLSearchParams({
//         page: page.toString(),
//         limit: limit.toString(),
//         ...filters,
//       })

//       const response = await fetch(`${API_BASE_URL}/support-materials?${queryParams}`)

//       if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${response.statusText}`)
//       }

//       const data = await response.json()

//       if (data.success) {
//         return data.data
//       } else {
//         throw new Error(data.message || "Error al obtener materiales")
//       }
//     } catch (error) {
//       console.error("Error en getAllMaterials:", error)
//       throw error
//     }
//   }

//   async getMaterialById(id) {
//     try {
//       const response = await fetch(`${API_BASE_URL}/support-materials/${id}`)

//       if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${response.statusText}`)
//       }

//       const data = await response.json()

//       if (data.success) {
//         return data.data
//       } else {
//         throw new Error(data.message || "Error al obtener material")
//       }
//     } catch (error) {
//       console.error("Error en getMaterialById:", error)
//       throw error
//     }
//   }

//   async createMaterial(materialData) {
//     try {
//       const response = await fetch(`${API_BASE_URL}/support-materials`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(materialData),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
//       }

//       const data = await response.json()

//       if (data.success) {
//         return data.data
//       } else {
//         throw new Error(data.message || "Error al crear material")
//       }
//     } catch (error) {
//       console.error("Error en createMaterial:", error)
//       throw error
//     }
//   }

//   async updateMaterial(id, materialData) {
//     try {
//       const response = await fetch(`${API_BASE_URL}/support-materials/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(materialData),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
//       }

//       const data = await response.json()

//       if (data.success) {
//         return data.data
//       } else {
//         throw new Error(data.message || "Error al actualizar material")
//       }
//     } catch (error) {
//       console.error("Error en updateMaterial:", error)
//       throw error
//     }
//   }

//   async deleteMaterial(id) {
//     try {
//       console.log(`Eliminando material con ID: ${id} de la base de datos...`)

//       const response = await fetch(`${API_BASE_URL}/support-materials/${id}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
//       }

//       const data = await response.json()

//       if (data.success) {
//         console.log("Material eliminado exitosamente de la base de datos")
//         return true
//       } else {
//         throw new Error(data.message || "Error al eliminar material")
//       }
//     } catch (error) {
//       console.error("Error en deleteMaterial:", error)
//       throw error
//     }
//   }

//   async getTopics() {
//     try {
//       const response = await fetch(`${API_BASE_URL}/support-materials/topics`)

//       if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${response.statusText}`)
//       }

//       const data = await response.json()

//       if (data.success) {
//         return data.data
//       } else {
//         throw new Error(data.message || "Error al obtener temas")
//       }
//     } catch (error) {
//       console.error("Error en getTopics:", error)
//       throw error
//     }
//   }

//   async searchMaterials(searchTerm) {
//     try {
//       const response = await fetch(`${API_BASE_URL}/support-materials/search?q=${encodeURIComponent(searchTerm)}`)

//       if (!response.ok) {
//         throw new Error(`Error ${response.status}: ${response.statusText}`)
//       }

//       const data = await response.json()

//       if (data.success) {
//         return data.data
//       } else {
//         throw new Error(data.message || "Error en búsqueda")
//       }
//     } catch (error) {
//       console.error("Error en searchMaterials:", error)
//       throw error
//     }
//   }
// }

// // Exportar una instancia de la clase
// const supportMaterialService = new SupportMaterialService()
// export default supportMaterialService
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

class SupportMaterialService {
  async getAllMaterials(page = 1, limit = 10, filters = {}) {
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...filters,
      })

      const response = await fetch(`${API_BASE_URL}/support-materials?${queryParams}`)

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success) {
        // Si es la primera página y no hay filtros específicos, devolver solo los materiales
        if (page === 1 && Object.keys(filters).length === 0) {
          return data.data.materials || data.data
        }
        return data.data
      } else {
        throw new Error(data.message || "Error al obtener materiales")
      }
    } catch (error) {
      console.error("Error en getAllMaterials:", error)
      throw error
    }
  }

  async getMaterialById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/support-materials/${id}`)

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success) {
        return data.data
      } else {
        throw new Error(data.message || "Error al obtener material")
      }
    } catch (error) {
      console.error("Error en getMaterialById:", error)
      throw error
    }
  }

  async createMaterial(materialData) {
    try {
      const response = await fetch(`${API_BASE_URL}/support-materials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(materialData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success) {
        return data.data
      } else {
        throw new Error(data.message || "Error al crear material")
      }
    } catch (error) {
      console.error("Error en createMaterial:", error)
      throw error
    }
  }

  async updateMaterial(id, materialData) {
    try {
      const response = await fetch(`${API_BASE_URL}/support-materials/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(materialData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success) {
        return data.data
      } else {
        throw new Error(data.message || "Error al actualizar material")
      }
    } catch (error) {
      console.error("Error en updateMaterial:", error)
      throw error
    }
  }

  async deleteMaterial(id) {
    try {
      console.log(`Eliminando material con ID: ${id} de la base de datos...`)

      const response = await fetch(`${API_BASE_URL}/support-materials/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success) {
        console.log("Material eliminado exitosamente de la base de datos")
        return true
      } else {
        throw new Error(data.message || "Error al eliminar material")
      }
    } catch (error) {
      console.error("Error en deleteMaterial:", error)
      throw error
    }
  }

  async getTopics() {
    try {
      const response = await fetch(`${API_BASE_URL}/support-materials/topics`)

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success) {
        return data.data
      } else {
        throw new Error(data.message || "Error al obtener temas")
      }
    } catch (error) {
      console.error("Error en getTopics:", error)
      throw error
    }
  }

  async searchMaterials(searchTerm) {
    try {
      const response = await fetch(`${API_BASE_URL}/support-materials/search?q=${encodeURIComponent(searchTerm)}`)

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.success) {
        return data.data
      } else {
        throw new Error(data.message || "Error en búsqueda")
      }
    } catch (error) {
      console.error("Error en searchMaterials:", error)
      throw error
    }
  }

  async getMaterials() {
    return this.getAllMaterials()
  }
}

// Exportar una instancia de la clase
const supportMaterialService = new SupportMaterialService()
export default supportMaterialService
