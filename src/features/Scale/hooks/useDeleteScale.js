// "use client"

// import { useState } from "react"
// import { deleteScale } from "../services/scaleService"

// export const useDeleteScale = () => {
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [success, setSuccess] = useState(false)

//   const deleteExistingScale = async (id) => {
//     try {
//       setLoading(true)
//       setError(null)
//       setSuccess(false)

//       console.log(`🔄 Eliminando escala ${id}`)

//       const response = await deleteScale(id)

//       if (response.success) {
//         setSuccess(true)
//         console.log("✅ Escala eliminada exitosamente")
//         return response
//       } else {
//         throw new Error(response.message || "Error al eliminar la escala")
//       }
//     } catch (err) {
//       console.error("❌ Error en useDeleteScale:", err)
//       setError(err.message || "Error al eliminar la escala de valoración")
//       setSuccess(false)
//       throw err
//     } finally {
//       setLoading(false)
//     }
//   }

//   const reset = () => {
//     setError(null)
//     setSuccess(false)
//     setLoading(false)
//   }

//   return {
//     deleteExistingScale,
//     loading,
//     error,
//     success,
//     reset,
//   }
// }

// export default useDeleteScale
"use client"

import { useState } from "react"
import { deleteScale } from "../services/scaleService"

export const useDeleteScale = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const deleteExistingScale = async (id) => {
    try {
      setLoading(true)
      setError(null)

      console.log("📤 useDeleteScale - Eliminando escala:", id)

      const response = await deleteScale(id)

      if (response.success) {
        console.log("✅ useDeleteScale - Escala eliminada exitosamente")
        return response.data
      } else {
        console.error("❌ useDeleteScale - Error:", response.message)
        throw new Error(response.message)
      }
    } catch (err) {
      console.error("❌ useDeleteScale - Error capturado:", err)
      setError(err.message || "Error al eliminar la escala")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    deleteExistingScale,
    loading,
    error,
  }
}

export default useDeleteScale
