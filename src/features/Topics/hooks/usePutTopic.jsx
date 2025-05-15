import { useState } from "react"

export const usePutTopic = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const putTopic = async (id, updatedData) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`http://localhost:3000/api/topic/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedData.name,
          description: updatedData.description,
          status: updatedData.status === "Activo",
        }),
      })

      if (!res.ok) throw new Error("Error al actualizar el tema")
      return await res.json()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { putTopic, loading, error }
}
