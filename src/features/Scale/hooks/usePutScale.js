
// // // "use client"

// // // import { useState } from "react"
// // // import { updateScale } from "../services/scaleService"

// // // export const usePutScale = () => {
// // //   const [loading, setLoading] = useState(false)
// // //   const [error, setError] = useState(null)
// // //   const [success, setSuccess] = useState(false)

// // //   const updateExistingScale = async (id, scaleData) => {
// // //     try {
// // //       setLoading(true)
// // //       setError(null)
// // //       setSuccess(false)

// // //       console.log(`🔄 Actualizando escala ${id}:`, scaleData)

// // //       const response = await updateScale(id, scaleData)

// // //       if (response.success) {
// // //         setSuccess(true)
// // //         console.log("✅ Escala actualizada exitosamente:", response.data)
// // //         return response.data
// // //       } else {
// // //         throw new Error(response.message || "Error al actualizar la escala")
// // //       }
// // //     } catch (err) {
// // //       console.error("❌ Error en usePutScale:", err)
// // //       setError(err.message || "Error al actualizar la escala de valoración")
// // //       setSuccess(false)
// // //       throw err
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const reset = () => {
// // //     setError(null)
// // //     setSuccess(false)
// // //     setLoading(false)
// // //   }

// // //   return {
// // //     updateExistingScale,
// // //     loading,
// // //     error,
// // //     success,
// // //     reset,
// // //   }
// // // }

// // // export default usePutScale
// // "use client"

// // import { useState } from "react"
// // import { updateScale } from "../services/scaleService"

// // export const usePutScale = () => {
// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState(null)

// //   const updateExistingScale = async (id, scaleData) => {
// //     try {
// //       setLoading(true)
// //       setError(null)

// //       console.log("📤 usePutScale - Actualizando escala:", id, scaleData)

// //       const response = await updateScale(id, scaleData)

// //       if (response.success) {
// //         console.log("✅ usePutScale - Escala actualizada exitosamente:", response.data)
// //         return response.data
// //       } else {
// //         console.error("❌ usePutScale - Error:", response.message)
// //         throw new Error(response.message)
// //       }
// //     } catch (err) {
// //       console.error("❌ usePutScale - Error capturado:", err)
// //       setError(err.message || "Error al actualizar la escala")
// //       throw err
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   return {
// //     updateExistingScale,
// //     loading,
// //     error,
// //   }
// // }

// // export default usePutScale
// "use client"

// import { useState } from "react"
// import { updateScale } from "../services/scaleService"

// export const usePutScale = () => {
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   const updateExistingScale = async (id, scaleData) => {
//     try {
//       setLoading(true)
//       setError(null)

//       console.log("📤 usePutScale - INICIANDO actualización")
//       console.log("🆔 ID:", id)
//       console.log("📋 Datos recibidos en hook:", JSON.stringify(scaleData, null, 2))

//       const response = await updateScale(id, scaleData)

//       console.log("📥 usePutScale - Respuesta del servicio:", response)

//       if (response && response.success !== false) {
//         console.log("✅ usePutScale - Actualización exitosa")
//         return { success: true, data: response.data || response }
//       } else {
//         console.error("❌ usePutScale - Respuesta indica error:", response)
//         const errorMessage = response.message || "Error al actualizar la escala"
//         setError(errorMessage)
//         return {
//           success: false,
//           message: errorMessage,
//           errors: response.errors || [],
//         }
//       }
//     } catch (err) {
//       console.error("❌ usePutScale - Error capturado:", err)
//       console.error("❌ usePutScale - Error message:", err.message)
//       console.error("❌ usePutScale - Error stack:", err.stack)

//       const errorMessage = err.message || "Error al actualizar la escala"
//       setError(errorMessage)

//       return {
//         success: false,
//         message: errorMessage,
//         errors: [],
//       }
//     } finally {
//       setLoading(false)
//     }
//   }

//   return {
//     updateExistingScale,
//     loading,
//     error,
//   }
// }

// export default usePutScale
"use client"

import { useState } from "react"
import { updateScale } from "../services/scaleService"

export const usePutScale = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const updateExistingScale = async (id, scaleData) => {
    try {
      setLoading(true)
      setError(null)

      console.log("📤 usePutScale - Actualizando escala:", id)
      console.log("📋 Datos recibidos en hook:", JSON.stringify(scaleData, null, 2))

      const response = await updateScale(id, scaleData)

      console.log("📥 usePutScale - Respuesta del servicio:", response)

      if (response && response.success !== false) {
        console.log("✅ usePutScale - Escala actualizada exitosamente")
        return { success: true, data: response.data || response }
      } else {
        console.error("❌ usePutScale - Error en respuesta:", response)
        const errorMessage = response.message || "Error al actualizar la escala"
        setError(errorMessage)
        return {
          success: false,
          message: errorMessage,
          errors: response.errors || [],
        }
      }
    } catch (err) {
      console.error("❌ usePutScale - Error capturado:", err)
      console.error("❌ usePutScale - Error message:", err.message)

      const errorMessage = err.message || "Error al actualizar la escala"
      setError(errorMessage)

      return {
        success: false,
        message: errorMessage,
        errors: [],
      }
    } finally {
      setLoading(false)
    }
  }

  return {
    updateExistingScale,
    loading,
    error,
  }
}

export default usePutScale
