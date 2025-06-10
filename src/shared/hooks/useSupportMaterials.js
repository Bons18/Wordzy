// // // // // "use client"

// // // // // import { useState, useEffect } from "react"
// // // // // import { supportMaterialService } from "../services/supportMaterialService"

// // // // // export const useSupportMaterials = () => {
// // // // //   const [materials, setMaterials] = useState([])
// // // // //   const [loading, setLoading] = useState(false)
// // // // //   const [error, setError] = useState(null)

// // // // //   // Cargar materiales
// // // // //   const loadMaterials = async () => {
// // // // //     setLoading(true)
// // // // //     setError(null)
// // // // //     try {
// // // // //       const data = await supportMaterialService.getAll()
// // // // //       setMaterials(data.data || [])
// // // // //     } catch (err) {
// // // // //       setError(err.message)
// // // // //     } finally {
// // // // //       setLoading(false)
// // // // //     }
// // // // //   }

// // // // //   // Crear material
// // // // //   const createMaterial = async (materialData) => {
// // // // //     setLoading(true)
// // // // //     setError(null)
// // // // //     try {
// // // // //       const newMaterial = await supportMaterialService.create(materialData)
// // // // //       setMaterials((prev) => [...prev, newMaterial.data])
// // // // //       return newMaterial
// // // // //     } catch (err) {
// // // // //       setError(err.message)
// // // // //       throw err
// // // // //     } finally {
// // // // //       setLoading(false)
// // // // //     }
// // // // //   }

// // // // //   // Actualizar material
// // // // //   const updateMaterial = async (id, materialData) => {
// // // // //     setLoading(true)
// // // // //     setError(null)
// // // // //     try {
// // // // //       const updatedMaterial = await supportMaterialService.update(id, materialData)
// // // // //       setMaterials((prev) => prev.map((material) => (material._id === id ? updatedMaterial.data : material)))
// // // // //       return updatedMaterial
// // // // //     } catch (err) {
// // // // //       setError(err.message)
// // // // //       throw err
// // // // //     } finally {
// // // // //       setLoading(false)
// // // // //     }
// // // // //   }

// // // // //   // Eliminar material
// // // // //   const deleteMaterial = async (id) => {
// // // // //     setLoading(true)
// // // // //     setError(null)
// // // // //     try {
// // // // //       await supportMaterialService.delete(id)
// // // // //       setMaterials((prev) => prev.filter((material) => material._id !== id))
// // // // //     } catch (err) {
// // // // //       setError(err.message)
// // // // //       throw err
// // // // //     } finally {
// // // // //       setLoading(false)
// // // // //     }
// // // // //   }

// // // // //   // Cargar materiales al montar el componente
// // // // //   useEffect(() => {
// // // // //     loadMaterials()
// // // // //   }, [])

// // // // //   return {
// // // // //     materials,
// // // // //     loading,
// // // // //     error,
// // // // //     loadMaterials,
// // // // //     createMaterial,
// // // // //     updateMaterial,
// // // // //     deleteMaterial,
// // // // //     setError,
// // // // //   }
// // // // // }


// // // // "use client"

// // // // import { useState, useEffect } from "react"
// // // // import { supportMaterialService } from "../services/supportMaterialService"

// // // // export const useSupportMaterials = () => {
// // // //   const [materials, setMaterials] = useState([])
// // // //   console.log("Hook useSupportMaterials - materials:", materials)
// // // //   const [loading, setLoading] = useState(false)
// // // //   const [error, setError] = useState(null)

// // // //   // Cargar materiales
// // // //   const loadMaterials = async () => {
// // // //     setLoading(true)
// // // //     setError(null)
// // // //     try {
// // // //       const data = await supportMaterialService.getAll()
// // // //       // Asegurar que siempre sea un array
// // // //       const materialsArray = Array.isArray(data) ? data : data?.data || []
// // // //       setMaterials(materialsArray)
// // // //       console.log("Materiales cargados:", materialsArray)
// // // //     } catch (err) {
// // // //       setError(err.message)
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   // Crear material
// // // //   const createMaterial = async (materialData) => {
// // // //     setLoading(true)
// // // //     setError(null)
// // // //     try {
// // // //       const newMaterial = await supportMaterialService.create(materialData)
// // // //       setMaterials((prev) => [...prev, newMaterial.data])
// // // //       return newMaterial
// // // //     } catch (err) {
// // // //       setError(err.message)
// // // //       throw err
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   // Actualizar material
// // // //   const updateMaterial = async (id, materialData) => {
// // // //     setLoading(true)
// // // //     setError(null)
// // // //     try {
// // // //       const updatedMaterial = await supportMaterialService.update(id, materialData)
// // // //       setMaterials((prev) => prev.map((material) => (material._id === id ? updatedMaterial.data : material)))
// // // //       return updatedMaterial
// // // //     } catch (err) {
// // // //       setError(err.message)
// // // //       throw err
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   // Eliminar material
// // // //   const deleteMaterial = async (id) => {
// // // //     setLoading(true)
// // // //     setError(null)
// // // //     try {
// // // //       await supportMaterialService.delete(id)
// // // //       setMaterials((prev) => prev.filter((material) => material._id !== id))
// // // //     } catch (err) {
// // // //       setError(err.message)
// // // //       throw err
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   // Cargar materiales al montar el componente
// // // //   useEffect(() => {
// // // //     loadMaterials()
// // // //   }, [])

// // // //   return {
// // // //     materials,
// // // //     loading,
// // // //     error,
// // // //     loadMaterials,
// // // //     createMaterial,
// // // //     updateMaterial,
// // // //     deleteMaterial,
// // // //     setError,
// // // //   }
// // // // }
// // // "use client"

// // // import { useState, useEffect } from "react"
// // // import { supportMaterialService } from "../services/supportMaterialService"

// // // export const useSupportMaterials = () => {
// // //   const [materials, setMaterials] = useState([]) // Asegurar que siempre sea un array
// // //   console.log("Hook useSupportMaterials - materials:", materials)
// // //   const [loading, setLoading] = useState(false)
// // //   const [error, setError] = useState(null)

// // //   // Cargar materiales
// // //   const loadMaterials = async () => {
// // //     setLoading(true)
// // //     setError(null)
// // //     try {
// // //       const data = await supportMaterialService.getAll()
// // //       // Asegurar que siempre sea un array
// // //       const materialsArray = Array.isArray(data) ? data : data?.data || []
// // //       setMaterials(Array.isArray(materialsArray) ? materialsArray : [])
// // //       console.log("Materiales cargados:", materialsArray)
// // //     } catch (err) {
// // //       console.error("Error al cargar materiales:", err)
// // //       setError(err.message)
// // //       // En caso de error, asegurar que materials siga siendo un array
// // //       setMaterials([])
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   // Crear material
// // //   const createMaterial = async (materialData) => {
// // //     setLoading(true)
// // //     setError(null)
// // //     try {
// // //       const newMaterial = await supportMaterialService.create(materialData)
// // //       console.log("Material creado:", newMaterial)

// // //       // Asegurar que prev sea un array y que newMaterial tenga datos
// // //       setMaterials((prev) => {
// // //         const currentMaterials = Array.isArray(prev) ? prev : []
// // //         const materialToAdd = newMaterial?.data || newMaterial || {}
// // //         return [...currentMaterials, materialToAdd]
// // //       })

// // //       return newMaterial
// // //     } catch (err) {
// // //       console.error("Error al crear material:", err)
// // //       setError(err.message)
// // //       throw err
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   // Actualizar material
// // //   const updateMaterial = async (id, materialData) => {
// // //     setLoading(true)
// // //     setError(null)
// // //     try {
// // //       const updatedMaterial = await supportMaterialService.update(id, materialData)
// // //       console.log("Material actualizado:", updatedMaterial)

// // //       setMaterials((prev) => {
// // //         const currentMaterials = Array.isArray(prev) ? prev : []
// // //         const materialToUpdate = updatedMaterial?.data || updatedMaterial || {}
// // //         return currentMaterials.map((material) => (material._id === id ? materialToUpdate : material))
// // //       })

// // //       return updatedMaterial
// // //     } catch (err) {
// // //       console.error("Error al actualizar material:", err)
// // //       setError(err.message)
// // //       throw err
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   // Eliminar material
// // //   const deleteMaterial = async (id) => {
// // //     setLoading(true)
// // //     setError(null)
// // //     try {
// // //       await supportMaterialService.delete(id)
// // //       console.log("Material eliminado:", id)

// // //       setMaterials((prev) => {
// // //         const currentMaterials = Array.isArray(prev) ? prev : []
// // //         return currentMaterials.filter((material) => material._id !== id)
// // //       })
// // //     } catch (err) {
// // //       console.error("Error al eliminar material:", err)
// // //       setError(err.message)
// // //       throw err
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   // Cargar materiales al montar el componente
// // //   useEffect(() => {
// // //     loadMaterials()
// // //   }, [])

// // //   return {
// // //     materials: Array.isArray(materials) ? materials : [], // Asegurar que siempre retorne un array
// // //     loading,
// // //     error,
// // //     loadMaterials,
// // //     createMaterial,
// // //     updateMaterial,
// // //     deleteMaterial,
// // //     setError,
// // //   }
// // // }
// // "use client"

// // import { useState, useEffect } from "react"
// // import * as supportMaterialService from "../services/supportMaterialService"

// // const useSupportMaterials = () => {
// //   const [materials, setMaterials] = useState([])
// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState(null)

// //   useEffect(() => {
// //     const fetchMaterials = async () => {
// //       setLoading(true)
// //       setError(null)
// //       try {
// //         const data = await supportMaterialService.getMaterials()
// //         setMaterials(data)
// //       } catch (error) {
// //         console.error("Error fetching materials:", error)
// //         setError(error.message || "Failed to fetch materials")
// //       } finally {
// //         setLoading(false)
// //       }
// //     }

// //     fetchMaterials()
// //   }, [])

// //   const createMaterial = async (materialData) => {
// //     try {
// //       setLoading(true)
// //       setError(null)
// //       const newMaterial = await supportMaterialService.createMaterial(materialData)
// //       setMaterials((prevMaterials) => [...prevMaterials, newMaterial])
// //       return newMaterial // Return the newly created material
// //     } catch (error) {
// //       console.error("Error creating material:", error)
// //       setError(error.message || "Failed to create material")
// //       throw error // Re-throw the error to be handled by the component
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const updateMaterial = async (id, materialData) => {
// //     try {
// //       setLoading(true)
// //       setError(null)
// //       const updatedMaterial = await supportMaterialService.updateMaterial(id, materialData)
// //       setMaterials((prevMaterials) =>
// //         prevMaterials.map((material) => (material._id === id ? updatedMaterial : material)),
// //       )
// //     } catch (error) {
// //       console.error("Error updating material:", error)
// //       setError(error.message || "Failed to update material")
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const deleteMaterial = async (id) => {
// //     try {
// //       setLoading(true)
// //       setError(null)

// //       // Llamar al servicio para eliminar de la base de datos
// //       await supportMaterialService.deleteMaterial(id)

// //       // Actualizar el estado local removiendo el material eliminado
// //       setMaterials((prevMaterials) => prevMaterials.filter((material) => material._id !== id))

// //       console.log("Material eliminado exitosamente de la base de datos")
// //     } catch (error) {
// //       console.error("Error al eliminar material:", error)
// //       setError(error.message || "Error al eliminar el material")
// //       throw error
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return {
// //     materials,
// //     loading,
// //     error,
// //     createMaterial,
// //     updateMaterial,
// //     deleteMaterial,
// //     setMaterials, // Expose setMaterials for potential external updates
// //   }
// // }

// // export default useSupportMaterials
// "use client"

// import { useState, useEffect } from "react"
// import * as supportMaterialService from "../services/supportMaterialService"

// const useSupportMaterials = () => {
//   const [materials, setMaterials] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchMaterials = async () => {
//       setLoading(true)
//       setError(null)
//       try {
//         const data = await supportMaterialService.getAllMaterials()
//         // Si la respuesta tiene estructura con materials y pagination
//         if (data && data.materials) {
//           setMaterials(data.materials)
//         } else if (Array.isArray(data)) {
//           setMaterials(data)
//         } else {
//           setMaterials([])
//         }
//       } catch (error) {
//         console.error("Error fetching materials:", error)
//         setError(error.message || "Failed to fetch materials")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchMaterials()
//   }, [])

//   const createMaterial = async (materialData) => {
//     try {
//       setLoading(true)
//       setError(null)
//       const newMaterial = await supportMaterialService.createMaterial(materialData)
//       setMaterials((prevMaterials) => [...prevMaterials, newMaterial])
//       return newMaterial // Return the newly created material
//     } catch (error) {
//       console.error("Error creating material:", error)
//       setError(error.message || "Failed to create material")
//       throw error // Re-throw the error to be handled by the component
//     } finally {
//       setLoading(false)
//     }
//   }

//   const updateMaterial = async (id, materialData) => {
//     try {
//       setLoading(true)
//       setError(null)
//       const updatedMaterial = await supportMaterialService.updateMaterial(id, materialData)
//       setMaterials((prevMaterials) =>
//         prevMaterials.map((material) => (material._id === id ? updatedMaterial : material)),
//       )
//     } catch (error) {
//       console.error("Error updating material:", error)
//       setError(error.message || "Failed to update material")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const deleteMaterial = async (id) => {
//     try {
//       setLoading(true)
//       setError(null)

//       // Llamar al servicio para eliminar de la base de datos
//       await supportMaterialService.deleteMaterial(id)

//       // Actualizar el estado local removiendo el material eliminado
//       setMaterials((prevMaterials) => prevMaterials.filter((material) => material._id !== id))

//       console.log("Material eliminado exitosamente de la base de datos")
//     } catch (error) {
//       console.error("Error al eliminar material:", error)
//       setError(error.message || "Error al eliminar el material")
//       throw error
//     } finally {
//       setLoading(false)
//     }
//   }

//   return {
//     materials,
//     loading,
//     error,
//     createMaterial,
//     updateMaterial,
//     deleteMaterial,
//     setMaterials, // Expose setMaterials for potential external updates
//   }
// }

// export default useSupportMaterials
import { useState, useEffect } from "react"
import supportMaterialService from "../services/supportMaterialService"

const useSupportMaterials = () => {
  const [materials, setMaterials] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await supportMaterialService.getAllMaterials()
        // Si la respuesta tiene estructura con materials y pagination
        if (data && data.materials) {
          setMaterials(data.materials)
        } else if (Array.isArray(data)) {
          setMaterials(data)
        } else {
          setMaterials([])
        }
      } catch (error) {
        console.error("Error fetching materials:", error)
        setError(error.message || "Failed to fetch materials")
      } finally {
        setLoading(false)
      }
    }

    fetchMaterials()
  }, [])

  const createMaterial = async (materialData) => {
    try {
      setLoading(true)
      setError(null)
      const newMaterial = await supportMaterialService.createMaterial(materialData)
      setMaterials((prevMaterials) => [...prevMaterials, newMaterial])
      return newMaterial // Return the newly created material
    } catch (error) {
      console.error("Error creating material:", error)
      setError(error.message || "Failed to create material")
      throw error // Re-throw the error to be handled by the component
    } finally {
      setLoading(false)
    }
  }

  const updateMaterial = async (id, materialData) => {
    try {
      setLoading(true)
      setError(null)
      const updatedMaterial = await supportMaterialService.updateMaterial(id, materialData)
      setMaterials((prevMaterials) =>
        prevMaterials.map((material) => (material._id === id ? updatedMaterial : material)),
      )
    } catch (error) {
      console.error("Error updating material:", error)
      setError(error.message || "Failed to update material")
    } finally {
      setLoading(false)
    }
  }

  const deleteMaterial = async (id) => {
    try {
      setLoading(true)
      setError(null)

      // Llamar al servicio para eliminar de la base de datos
      await supportMaterialService.deleteMaterial(id)

      // Actualizar el estado local removiendo el material eliminado
      setMaterials((prevMaterials) => prevMaterials.filter((material) => material._id !== id))

      console.log("Material eliminado exitosamente de la base de datos")
    } catch (error) {
      console.error("Error al eliminar material:", error)
      setError(error.message || "Error al eliminar el material")
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    materials,
    loading,
    error,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    setMaterials, // Expose setMaterials for potential external updates
    setError,
  }
}

export default useSupportMaterials
