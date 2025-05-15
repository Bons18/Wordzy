import { useEffect, useState, useCallback } from "react";

export function useGetTopics() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTopics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/topic");

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al obtener los temas");
      }

      const data = await response.json();
      setTopics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  return { topics, loading, error, refetch: fetchTopics };
}
