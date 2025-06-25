"use client"

import { useState } from "react"
import { updateInstructor } from "../services/instructorApiService"

export function usePutInstructor() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const putInstructor = async (id, instructorData) => {
    setLoading(true)
    setError(null)

    try {
      console.log("=== HOOK: ACTUALIZANDO INSTRUCTOR ===")
      const result = await updateInstructor(id, instructorData)
      console.log("Instructor actualizado desde hook:", result)
      return result
    } catch (err) {
      console.error("Error en hook putInstructor:", err)
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { putInstructor, loading, error }
}
