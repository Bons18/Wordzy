// // // // "use client"

// // // // import { useState, useEffect } from "react"
// // // // import { getScales } from "../services/scaleService"

// // // // export const useGetScales = (params = {}) => {
// // // //   const [scales, setScales] = useState([])
// // // //   const [loading, setLoading] = useState(false)
// // // //   const [error, setError] = useState(null)
// // // //   const [pagination, setPagination] = useState({
// // // //     total: 0,
// // // //     page: 1,
// // // //     limit: 10,
// // // //     totalPages: 0,
// // // //   })

// // // //   const fetchScales = async (fetchParams = {}) => {
// // // //     try {
// // // //       setLoading(true)
// // // //       setError(null)

// // // //       const mergedParams = { ...params, ...fetchParams }
// // // //       console.log("🔄 Cargando escalas con parámetros:", mergedParams)

// // // //       const response = await getScales(mergedParams)

// // // //       if (response.success) {
// // // //         setScales(response.data || [])
// // // //         setPagination(
// // // //           response.pagination || {
// // // //             total: 0,
// // // //             page: 1,
// // // //             limit: 10,
// // // //             totalPages: 0,
// // // //           },
// // // //         )
// // // //         console.log("✅ Escalas cargadas exitosamente:", response.data?.length || 0)
// // // //       } else {
// // // //         throw new Error(response.message || "Error al cargar escalas")
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("❌ Error en useGetScales:", err)
// // // //       setError(err.message || "Error al cargar las escalas de valoración")
// // // //       setScales([])
// // // //       setPagination({
// // // //         total: 0,
// // // //         page: 1,
// // // //         limit: 10,
// // // //         totalPages: 0,
// // // //       })
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   const refetch = (newParams = {}) => {
// // // //     fetchScales(newParams)
// // // //   }

// // // //   const nextPage = () => {
// // // //     if (pagination.page < pagination.totalPages) {
// // // //       fetchScales({ ...params, page: pagination.page + 1 })
// // // //     }
// // // //   }

// // // //   const prevPage = () => {
// // // //     if (pagination.page > 1) {
// // // //       fetchScales({ ...params, page: pagination.page - 1 })
// // // //     }
// // // //   }

// // // //   const goToPage = (page) => {
// // // //     if (page >= 1 && page <= pagination.totalPages) {
// // // //       fetchScales({ ...params, page })
// // // //     }
// // // //   }

// // // //   useEffect(() => {
// // // //     fetchScales()
// // // //   }, [])

// // // //   return {
// // // //     scales,
// // // //     loading,
// // // //     error,
// // // //     pagination,
// // // //     refetch,
// // // //     nextPage,
// // // //     prevPage,
// // // //     goToPage,
// // // //     fetchScales,
// // // //   }
// // // // }

// // // // export default useGetScales
// // // "use client"

// // // import { useState, useEffect } from "react"
// // // import { getScales } from "../services/scaleService"

// // // export const useGetScales = (params = {}) => {
// // //   const [data, setData] = useState([])
// // //   const [loading, setLoading] = useState(false)
// // //   const [error, setError] = useState(null)
// // //   const [pagination, setPagination] = useState({
// // //     total: 0,
// // //     page: 1,
// // //     limit: 10,
// // //     totalPages: 0,
// // //   })

// // //   const fetchScales = async (fetchParams = {}) => {
// // //     try {
// // //       setLoading(true)
// // //       setError(null)

// // //       const mergedParams = { ...params, ...fetchParams }
// // //       console.log("🔄 Cargando escalas con parámetros:", mergedParams)

// // //       const response = await getScales(mergedParams)
// // //       console.log("📥 Respuesta completa del servicio:", response)

// // //       if (response.success) {
// // //         // La respuesta viene con { scales: [...], pagination: {...} }
// // //         const scales = response.data?.scales || []
// // //         const paginationData = response.data?.pagination || {
// // //           total: 0,
// // //           page: 1,
// // //           limit: 10,
// // //           totalPages: 0,
// // //         }

// // //         console.log("✅ Escalas obtenidas:", scales.length, scales)
// // //         console.log("📊 Paginación:", paginationData)

// // //         setData(scales)
// // //         setPagination(paginationData)
// // //       } else {
// // //         console.error("❌ Error en respuesta:", response.message)
// // //         throw new Error(response.message || "Error al cargar escalas")
// // //       }
// // //     } catch (err) {
// // //       console.error("❌ Error en useGetScales:", err)
// // //       setError(err.message || "Error al cargar las escalas de valoración")
// // //       setData([])
// // //       setPagination({
// // //         total: 0,
// // //         page: 1,
// // //         limit: 10,
// // //         totalPages: 0,
// // //       })
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const refetch = (newParams = {}) => {
// // //     console.log("🔄 Refetch solicitado con parámetros:", newParams)
// // //     fetchScales(newParams)
// // //   }

// // //   const nextPage = () => {
// // //     if (pagination.hasNextPage) {
// // //       fetchScales({ ...params, page: pagination.currentPage + 1 })
// // //     }
// // //   }

// // //   const prevPage = () => {
// // //     if (pagination.hasPrevPage) {
// // //       fetchScales({ ...params, page: pagination.currentPage - 1 })
// // //     }
// // //   }

// // //   const goToPage = (page) => {
// // //     if (page >= 1 && page <= pagination.totalPages) {
// // //       fetchScales({ ...params, page })
// // //     }
// // //   }

// // //   useEffect(() => {
// // //     console.log("🚀 useGetScales inicializando...")
// // //     fetchScales()
// // //   }, [])

// // //   return {
// // //     data, // Array de escalas
// // //     loading,
// // //     error,
// // //     pagination,
// // //     refetch,
// // //     nextPage,
// // //     prevPage,
// // //     goToPage,
// // //     fetchScales,
// // //   }
// // // }

// // // export default useGetScales
// // "use client"

// // import { useState, useEffect } from "react"
// // import { getScales } from "../services/scaleService"

// // export const useGetScales = (params = {}) => {
// //   const [data, setData] = useState([])
// //   const [loading, setLoading] = useState(false)
// //   const [error, setError] = useState(null)
// //   const [pagination, setPagination] = useState({
// //     total: 0,
// //     page: 1,
// //     limit: 10,
// //     totalPages: 0,
// //   })

// //   const fetchScales = async (fetchParams = {}) => {
// //     try {
// //       setLoading(true)
// //       setError(null)

// //       const mergedParams = { ...params, ...fetchParams }
// //       console.log("🔄 Cargando escalas con parámetros:", mergedParams)

// //       const response = await getScales(mergedParams)
// //       console.log("📥 Respuesta completa del servicio:", response)

// //       // Manejar diferentes formatos de respuesta
// //       let scales = []
// //       let paginationData = {
// //         total: 0,
// //         page: 1,
// //         limit: 10,
// //         totalPages: 0,
// //       }

// //       if (response && response.success) {
// //         // Formato: { success: true, data: { scales: [...], pagination: {...} } }
// //         if (response.data && response.data.scales) {
// //           scales = response.data.scales
// //           paginationData = response.data.pagination || paginationData
// //         }
// //         // Formato alternativo: { success: true, data: [...] }
// //         else if (Array.isArray(response.data)) {
// //           scales = response.data
// //         }
// //       }
// //       // Formato directo: [...]
// //       else if (Array.isArray(response)) {
// //         scales = response
// //       }
// //       // Formato: { scales: [...] }
// //       else if (response && response.scales) {
// //         scales = response.scales
// //         paginationData = response.pagination || paginationData
// //       }

// //       console.log("✅ Escalas procesadas:", scales.length, scales)
// //       console.log("📊 Paginación:", paginationData)

// //       setData(scales)
// //       setPagination(paginationData)
// //     } catch (err) {
// //       console.error("❌ Error en useGetScales:", err)
// //       setError(err.message || "Error al cargar las escalas de valoración")
// //       setData([])
// //       setPagination({
// //         total: 0,
// //         page: 1,
// //         limit: 10,
// //         totalPages: 0,
// //       })
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   const refetch = (newParams = {}) => {
// //     console.log("🔄 Refetch solicitado con parámetros:", newParams)
// //     return fetchScales(newParams)
// //   }

// //   const nextPage = () => {
// //     if (pagination.hasNextPage) {
// //       fetchScales({ ...params, page: pagination.currentPage + 1 })
// //     }
// //   }

// //   const prevPage = () => {
// //     if (pagination.hasPrevPage) {
// //       fetchScales({ ...params, page: pagination.currentPage - 1 })
// //     }
// //   }

// //   const goToPage = (page) => {
// //     if (page >= 1 && page <= pagination.totalPages) {
// //       fetchScales({ ...params, page })
// //     }
// //   }

// //   useEffect(() => {
// //     console.log("🚀 useGetScales inicializando...")
// //     fetchScales()
// //   }, [])

// //   return {
// //     data, // Array de escalas
// //     loading,
// //     error,
// //     pagination,
// //     refetch,
// //     nextPage,
// //     prevPage,
// //     goToPage,
// //     fetchScales,
// //   }
// // }

// // export default useGetScales
// "use client"

// import { useState, useEffect } from "react"
// import { getScales } from "../services/scaleService"

// export const useGetScales = (params = {}) => {
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(null)
//   const [pagination, setPagination] = useState({
//     total: 0,
//     page: 1,
//     limit: 10,
//     totalPages: 0,
//   })

//   const fetchScales = async (fetchParams = {}) => {
//     try {
//       setLoading(true)
//       setError(null)

//       const mergedParams = { ...params, ...fetchParams }
//       console.log("🔄 useGetScales.fetchScales - Parámetros:", mergedParams)

//       const response = await getScales(mergedParams)
//       console.log("🧪 Respuesta REAL de la API (cruda):", response); // ⬅️ ESTE LOG
//       console.log("📥 useGetScales.fetchScales - Respuesta del servicio:", response)

//       // Manejar diferentes formatos de respuesta
//       let scales = []
//       let paginationData = {
//         total: 0,
//         page: 1,
//         limit: 10,
//         totalPages: 0,
//       }

//       if (response) {
//         console.log("🔍 useGetScales.fetchScales - Analizando respuesta...")
//         console.log("  - response.success:", response.success)
//         console.log("  - response.data:", response.data)
//         console.log("  - response.scales:", response.scales)
//         console.log("  - Array.isArray(response):", Array.isArray(response))

//         if (response.success && response.data) {
//           console.log("✅ useGetScales.fetchScales - Formato: { success: true, data: {...} }")

//           if (response.data.scales && Array.isArray(response.data.scales)) {
//             scales = response.data.scales
//             paginationData = response.data.pagination || paginationData
//             console.log("📋 useGetScales.fetchScales - Escalas encontradas en data.scales:", scales.length)
//           } else if (Array.isArray(response.data)) {
//             scales = response.data
//             console.log("📋 useGetScales.fetchScales - Escalas encontradas en data (array):", scales.length)
//           }
//         } else if (response.scales && Array.isArray(response.scales)) {
//           console.log("✅ useGetScales.fetchScales - Formato: { scales: [...] }")
//           scales = response.scales
//           paginationData = response.pagination || paginationData
//         } else if (Array.isArray(response)) {
//           console.log("✅ useGetScales.fetchScales - Formato: [...]")
//           scales = response
//         } else {
//           console.warn("⚠️ useGetScales.fetchScales - Formato de respuesta no reconocido")
//           console.log("📄 useGetScales.fetchScales - Respuesta completa:", JSON.stringify(response, null, 2))
//         }
//       }

//       console.log("✅ useGetScales.fetchScales - Escalas procesadas:", scales.length)
//       console.log("📊 useGetScales.fetchScales - Paginación:", paginationData)
//       console.log("📋 useGetScales.fetchScales - Escalas:", scales)

//       setData(scales)
//       setPagination(paginationData)
//     } catch (err) {
//       console.error("❌ useGetScales.fetchScales - Error:", err)
//       console.error("❌ useGetScales.fetchScales - Error message:", err.message)
//       console.error("❌ useGetScales.fetchScales - Error stack:", err.stack)

//       setError(err.message || "Error al cargar las escalas de valoración")
//       setData([])
//       setPagination({
//         total: 0,
//         page: 1,
//         limit: 10,
//         totalPages: 0,
//       })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const refetch = (newParams = {}) => {
//     console.log("🔄 useGetScales.refetch - Parámetros:", newParams)
//     return fetchScales(newParams)
//   }

//   const nextPage = () => {
//     if (pagination.hasNextPage) {
//       fetchScales({ ...params, page: pagination.currentPage + 1 })
//     }
//   }

//   const prevPage = () => {
//     if (pagination.hasPrevPage) {
//       fetchScales({ ...params, page: pagination.currentPage - 1 })
//     }
//   }

//   const goToPage = (page) => {
//     if (page >= 1 && page <= pagination.totalPages) {
//       fetchScales({ ...params, page })
//     }
//   }

//   useEffect(() => {
//     console.log("🚀 useGetScales - Inicializando hook...")
//     fetchScales()
//   }, [])

//   return {
//     data, // Array de escalas
//     loading,
//     error,
//     pagination,
//     refetch,
//     nextPage,
//     prevPage,
//     goToPage,
//     fetchScales,
//   }
// }

// export default useGetScales
"use client"

import { useState, useEffect } from "react"
import { getScales } from "../services/scaleService"

export const useGetScales = (params = {}) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  })

  const fetchScales = async (fetchParams = {}) => {
    try {
      console.log("🚀 useGetScales.fetchScales - INICIANDO")
      setLoading(true)
      setError(null)

      const mergedParams = { ...params, ...fetchParams }
      console.log("📋 useGetScales - Parámetros finales:", mergedParams)

      const response = await getScales(mergedParams)
      console.log("📥 useGetScales - Respuesta del servicio:", response)
      console.log("📊 useGetScales - Tipo de respuesta:", typeof response)
      console.log("📋 useGetScales - Es array?:", Array.isArray(response))

      // Procesar respuesta
      let scales = []
      let paginationData = {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      }

      if (response) {
        console.log("🔍 useGetScales - Analizando estructura de respuesta...")

        // Caso 1: { success: true, data: { scales: [...], pagination: {...} } }
        if (response.success && response.data && response.data.scales) {
          console.log("✅ Formato 1: success + data.scales")
          scales = response.data.scales
          paginationData = response.data.pagination || paginationData
        }
        // Caso 2: { scales: [...], pagination: {...} }
        else if (response.scales) {
          console.log("✅ Formato 2: scales directas")
          scales = response.scales
          paginationData = response.pagination || paginationData
        }
        // Caso 3: [escala1, escala2, ...]
        else if (Array.isArray(response)) {
          console.log("✅ Formato 3: array directo")
          scales = response
        }
        // Caso 4: { success: true, data: [...] }
        else if (response.success && Array.isArray(response.data)) {
          console.log("✅ Formato 4: success + data array")
          scales = response.data
        } else {
          console.warn("⚠️ Formato de respuesta no reconocido")
          console.log("📄 Respuesta completa:", JSON.stringify(response, null, 2))
        }
      }

      console.log("✅ useGetScales - Escalas procesadas:", scales.length)
      console.log("📋 useGetScales - Escalas:", scales)
      console.log("📊 useGetScales - Paginación:", paginationData)

      setData(scales)
      setPagination(paginationData)
    } catch (err) {
      console.error("❌ useGetScales - ERROR:", err)
      console.error("❌ Error message:", err.message)
      console.error("❌ Error stack:", err.stack)

      setError(err.message || "Error al cargar las escalas de valoración")
      setData([])
      setPagination({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      })
    } finally {
      setLoading(false)
      console.log("🏁 useGetScales.fetchScales - FINALIZADO")
    }
  }

  const refetch = (newParams = {}) => {
    console.log("🔄 useGetScales.refetch - Parámetros:", newParams)
    return fetchScales(newParams)
  }

  useEffect(() => {
    console.log("🚀 useGetScales - Hook inicializando...")
    fetchScales()
  }, [])

  return {
    data,
    loading,
    error,
    pagination,
    refetch,
    fetchScales,
  }
}

export default useGetScales
