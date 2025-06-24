// // "use client"

// // import { useState, useEffect } from "react"
// // import { courseService } from "../services/courseService"

// // export const useGetCourses = () => {
// //   const [courses, setCourses] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const [error, setError] = useState(null)

// //   const fetchCourses = async () => {
// //     try {
// //       setLoading(true)
// //       setError(null)
// //       const data = await courseService.getAll()
// //       setCourses(data)
// //     } catch (err) {
// //       setError(err.response?.data?.message || err.message || "Error al cargar cursos")
// //       console.error("Error fetching courses:", err)
// //     } finally {
// //       setLoading(false)
// //     }
// //   }

// //   useEffect(() => {
// //     fetchCourses()
// //   }, [])

// //   return {
// //     courses,
// //     loading,
// //     error,
// //     refetch: fetchCourses,
// //   }
// // }
// "use client"

// import { useState, useEffect } from "react"
// import { courseService } from "../services/courseService"

// export const useGetCourses = () => {
//   const [courses, setCourses] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalItems: 0,
//     itemsPerPage: 10,
//     hasNextPage: false,
//     hasPrevPage: false,
//   })

//   const fetchCourses = async (page = 1, limit = 10, search = "") => {
//     try {
//       setLoading(true)
//       setError(null)

//       const response = await courseService.getAll({ page, limit, search })

//       if (response.success) {
//         setCourses(response.data.courses || [])
//         setPagination(response.data.pagination || pagination)
//       } else {
//         throw new Error(response.message || "Error al obtener cursos")
//       }
//     } catch (err) {
//       console.error("❌ API Error:", err.response?.status, err.response?.data || err.message)
//       console.error("Error fetching courses:", err)
//       setError(err.message || "Error al cargar los cursos")
//       setCourses([])
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchCourses()
//   }, [])

//   const refetch = () => {
//     fetchCourses(pagination.currentPage)
//   }

//   return {
//     courses,
//     loading,
//     error,
//     pagination,
//     fetchCourses,
//     refetch,
//   }
// }

// export default useGetCourses
"use client"

import { useState, useEffect } from "react"
import { courseService } from "../services/courseService"

export const useGetCourses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCourses = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await courseService.getAll()
      setCourses(data)
    } catch (err) {
      console.error("❌ API Error:", err.response?.status, err.response?.data || err.message)
      console.error("Error fetching courses:", err)
      setError(err.response?.data?.message || err.message || "Error al cargar cursos")
      setCourses([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCourses()
  }, [])

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
  }
}

export default useGetCourses
