"use client"

import { useState } from "react"

const usePostInstructor = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const createInstructor = async (instructorData) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      console.log("Creando instructor:", instructorData)

      // Asegurar que el tipo de usuario sea instructor
      const dataToSend = {
        ...instructorData,
        tipoUsuario: "instructor",
        fichas: [], // Inicializar con array vacío
      }

      const response = await fetch("http://localhost:3000/api/instructor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log("Instructor creado exitosamente:", result)
      setSuccess(true)
      return result
    } catch (err) {
      console.error("Error al crear instructor:", err)
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const resetState = () => {
    setError(null)
    setSuccess(false)
    setLoading(false)
  }

  return {
    createInstructor,
    loading,
    error,
    success,
    resetState,
  }
}

export default usePostInstructor
