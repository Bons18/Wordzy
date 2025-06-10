import { useEffect, useState, useCallback } from "react";

export function useGetPrograms() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrograms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/program");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al obtener los programas");
      }

      setPrograms(data || []);
    } catch (err) {
      setError(err.message || "Error desconocido al obtener los programas");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrograms();
  }, [fetchPrograms]);

  return { programs, loading, error, refetch: fetchPrograms };
}