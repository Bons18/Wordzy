// // import axios from "axios"

// // // Configuración base de axios
// // const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api"

// // const api = axios.create({
// //   baseURL: API_BASE_URL,
// //   headers: {
// //     "Content-Type": "application/json",
// //   },
// // })

// // // Interceptor para agregar el token de autenticación
// // api.interceptors.request.use(
// //   (config) => {
// //     const token = localStorage.getItem("token")
// //     if (token) {
// //       config.headers.Authorization = `Bearer ${token}`
// //     }
// //     return config
// //   },
// //   (error) => {
// //     return Promise.reject(error)
// //   },
// // )

// // // Interceptor para manejar respuestas y errores
// // api.interceptors.response.use(
// //   (response) => {
// //     return response.data
// //   },
// //   (error) => {
// //     if (error.response?.status === 401) {
// //       // Token expirado o inválido
// //       localStorage.removeItem("token")
// //       localStorage.removeItem("user")
// //       window.location.href = "/login"
// //     }
// //     return Promise.reject(error.response?.data || error.message)
// //   },
// // )

// // export default api
// import axios from "axios"

// const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

// // Crear instancia de axios
// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// // Interceptor para requests
// api.interceptors.request.use(
//   (config) => {
//     // Aquí puedes añadir tokens de autenticación si los necesitas
//     const token = localStorage.getItem("authToken")
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     return Promise.reject(error)
//   },
// )

// // Interceptor para responses
// api.interceptors.response.use(
//   (response) => {
//     return response
//   },
//   (error) => {
//     // Manejo global de errores
//     if (error.response?.status === 401) {
//       // Token expirado o no válido
//       localStorage.removeItem("authToken")
//       window.location.href = "/login"
//     }
//     return Promise.reject(error)
//   },
// )

// export default api

import axios from "axios"

// Configuración base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

// Crear instancia de axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para requests - agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    // Obtener token del localStorage
    const user = localStorage.getItem("user")
    if (user) {
      try {
        const userData = JSON.parse(user)
        if (userData.token) {
          config.headers.Authorization = `Bearer ${userData.token}`
        }
      } catch (error) {
        console.error("Error parsing user data:", error)
        // Si hay error parseando, limpiar localStorage
        localStorage.removeItem("user")
      }
    }

    console.log("API Request:", config.method?.toUpperCase(), config.url)
    return config
  },
  (error) => {
    console.error("Request interceptor error:", error)
    return Promise.reject(error)
  },
)

// Interceptor para responses - manejar errores de autenticación
api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url)
    return response
  },
  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data)

    // Si es error 401 (no autorizado), limpiar sesión y redirigir
    if (error.response?.status === 401) {
      console.log("Token inválido o expirado, limpiando sesión...")
      localStorage.removeItem("user")

      // Solo redirigir si no estamos ya en login
      if (window.location.pathname !== "/login" && window.location.pathname !== "/") {
        window.location.href = "/login"
      }
    }

    return Promise.reject(error)
  },
)

export default api
