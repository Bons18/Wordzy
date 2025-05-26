import { useEffect, useCallback, useState } from "react";

export function useGetRoles() {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchRoles = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:3000/api/role");

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || "Error al obtener los roles");
            }

            const data = await response.json();
            setRoles(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    return { roles, loading, error, refetch: fetchRoles };
}