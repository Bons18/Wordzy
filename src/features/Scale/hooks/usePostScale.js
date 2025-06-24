// // "use client"

// // import { useState } from "react"
// // import { createScale } from "../services/scaleService"

// // export const usePostScale = () => {
// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState(null)
// //   const [success, setSuccess] = useState(false)

// //   const createNewScale = async (scaleData) => {
// //   try {
// //     setLoading(true)
// //     setError(null)
// //     setSuccess(false)

// //     console.log("🔄 Creando nueva escala:", scaleData)

// //     const response = await createScale(scaleData)

// //     // ✅ Si llega aquí, todo salió bien
// //     setSuccess(true)

// //     console.log("✅ Escala creada exitosamente")
// //     return response
// //   } catch (err) {
// //   console.error("❌ Error en usePostScale:", err)

// //   if (err?.errors?.length) {
// //     err.errors.forEach((e, i) => {
// //       console.error(`  ${i + 1}. ${e}`)
// //     })
// //   }

// //   setError(err.message || "Error al crear la escala de valoración")
// //   setSuccess(false)
// //   throw err
// // }
// //  finally {
// //     setLoading(false)
// //   }
// // }


// //   const reset = () => {
// //     setError(null)
// //     setSuccess(false)
// //     setLoading(false)
// //   }

// //   return {
// //     createNewScale,
// //     loading,
// //     error,
// //     success,
// //     reset,
// //   }
// // }

// // export default usePostScale
// "use client"

// import { useState } from "react"
// import { createScale } from "../services/scaleService"

// export const usePostScale = () => {
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)

//   const createNewScale = async (scaleData) => {
//     try {
//       setLoading(true)
//       setError(null)

//       console.log("📤 usePostScale - Enviando datos:", scaleData)

//       const response = await createScale(scaleData)

//       if (response.success) {
//         console.log("✅ usePostScale - Escala creada exitosamente:", response.data)
//         return response.data
//       } else {
//         console.error("❌ usePostScale - Error:", response.message)
//         throw new Error(response.message)
//       }
//     } catch (err) {
//       console.error("❌ usePostScale - Error capturado:", err)
//       setError(err.message || "Error al crear la escala")
//       throw err
//     } finally {
//       setLoading(false)
//     }
//   }

//   return {
//     createNewScale,
//     loading,
//     error,
//   }
// }

// export default usePostScale
"use client"

import { useState } from "react"
import { createScale } from "../services/scaleService"

export const usePostScale = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const createNewScale = async (scaleData) => {
    try {
      console.log("🚀 usePostScale.createNewScale - INICIANDO")
      setLoading(true)
      setError(null)

      console.log("📤 usePostScale - Datos a enviar:", scaleData)

      const response = await createScale(scaleData)
      console.log("📥 usePostScale - Respuesta:", response)

      setLoading(false)

      // Verificar si la respuesta indica éxito
      if (response && response.success !== false) {
        console.log("✅ usePostScale - Escala creada exitosamente")
        return { success: true, data: response }
      } else {
        console.error("❌ usePostScale - Error en respuesta:", response)
        return {
          success: false,
          message: response?.message || "Error al crear la escala",
          errors: response?.errors || [],
        }
      }
    } catch (err) {
      console.error("❌ usePostScale - ERROR:", err)
      setLoading(false)
      setError(err.message)

      return {
        success: false,
        message: err.message || "Error al crear la escala",
        errors: [],
      }
    }
  }

  return {
    createNewScale,
    loading,
    error,
  }
}

export default usePostScale
