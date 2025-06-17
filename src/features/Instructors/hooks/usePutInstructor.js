"use client"

import { useState } from "react"

const usePutInstructor = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const updateInstructor = async (id, instructorData) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      console.log("Actualizando instructor con ID:", id)
      console.log("Datos a enviar:", instructorData)

      if (!id) {
        throw new Error("ID de instructor requerido")
      }

      // Asegurar que el tipo de usuario sea instructor
      const dataToSend = {
        ...instructorData,
        tipoUsuario: "instructor",
      }

      const response = await fetch(`http://localhost:3000/api/instructor/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Error del servidor:", errorData)
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }

      const result = await response.json()
      console.log("Instructor actualizado exitosamente:", result)
      setSuccess(true)
      return result
    } catch (err) {
      console.error("Error al actualizar instructor:", err)
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
    updateInstructor,
    loading,
    error,
    success,
    resetState,
  }
}

export default usePutInstructor
