import { useEffect, useState, useCallback } from "react";

export function useGetSupportMaterials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMaterials = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/api/material");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al obtener los materiales de apoyo");
      }

      setMaterials(data || []);
    } catch (err) {
      setError(err.message || "Error desconocido al obtener los materiales de apoyo");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMaterials();
  }, [fetchMaterials]);

  return { materials, loading, error, refetch: fetchMaterials };
}