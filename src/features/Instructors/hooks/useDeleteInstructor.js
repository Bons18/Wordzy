"use client"

import { useState } from "react"

const useDeleteInstructor = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const deleteInstructor = async (id) => {
    try {
      setLoading(true)
      setError(null)
      setSuccess(false)

      console.log("Eliminando instructor:", id)

      const response = await fetch(`http://localhost:3000/api/instructor/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
      }

      console.log("Instructor eliminado exitosamente")
      setSuccess(true)
      return true
    } catch (err) {
      console.error("Error al eliminar instructor:", err)
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
    deleteInstructor,
    loading,
    error,
    success,
    resetState,
  }
}

export default useDeleteInstructor
