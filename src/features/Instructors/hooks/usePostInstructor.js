"use client"

import { useState } from "react"
import { createInstructor } from "../services/instructorApiService"

export function usePostInstructor() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const postInstructor = async (instructorData) => {
    setLoading(true)
    setError(null)

    try {
      console.log("=== HOOK: CREANDO INSTRUCTOR ===")
      const result = await createInstructor(instructorData)
      console.log("Instructor creado desde hook:", result)
      return result
    } catch (err) {
      console.error("Error en hook postInstructor:", err)
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { postInstructor, loading, error }
}
