import { useState } from "react"

export const useDeleteTopic = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const deleteTopic = async (id) => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch(`http://localhost:3000/api/topic/${id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Error al eliminar el tema")
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  return { deleteTopic, loading, error }
}
