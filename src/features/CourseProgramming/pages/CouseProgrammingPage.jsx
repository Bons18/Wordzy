import { useNavigate, useLocation } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { ChevronDown } from 'lucide-react'
import { useAuth } from "../../auth/hooks/useAuth"
import GenericTable from "../../../shared/components/Table"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// Datos predeterminados
const defaultSchedules = [
    { id: 1, nombre: "Programa 1", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
    { id: 2, nombre: "Programa 2", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
    { id: 3, nombre: "Programa 3", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
    { id: 4, nombre: "Programa 4", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
    { id: 5, nombre: "Programa 5", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
]

const columns = [
    { key: "id", label: "Id" },
    { key: "nombre", label: "Nombre" },
    { key: "fechaInicio", label: "Fecha Inicio" },
    { key: "fechaFin", label: "Fecha Fin" },
    {
        key: "estado",
        label: "Estado",
        render: (item) => (
            <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${item.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
            >
                {item.estado}
            </span>
        ),
    },
]

const CourseProgrammingPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    const [successMessage, setSuccessMessage] = useState("")
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const { logout } = useAuth()
    const [schedules, setSchedules] = useState([...defaultSchedules])

    const dropdownRef = useRef(null)

    // Función para cargar las programaciones
    const loadSchedules = () => {
        try {
            const savedSchedules = JSON.parse(localStorage.getItem('courseSchedules') || '[]');

            if (savedSchedules.length > 0) {
                // Filtrar para evitar duplicados por ID
                const existingIds = new Set(defaultSchedules.map(s => s.id));
                const filteredSavedSchedules = savedSchedules.filter(s => !existingIds.has(s.id));

                // Combinar con las programaciones predeterminadas
                setSchedules([...defaultSchedules, ...filteredSavedSchedules]);
            } else {
                setSchedules([...defaultSchedules]);
            }
        } catch (error) {
            console.error("Error al cargar programaciones:", error);
            setSchedules([...defaultSchedules]);
        }
    };

    // Cargar programaciones al montar el componente
    useEffect(() => {
        loadSchedules();
    }, []);

    // Recargar programaciones cuando la ubicación cambia (volvemos a esta página)
    useEffect(() => {
        loadSchedules();
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleLogoutClick = () => {
        setIsDropdownOpen(false)
        setShowLogoutConfirm(true)
    }

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    const handleAddProgramming = () => {
        navigate("/programacion/programacionCursos/registrarProgramacion")
    }

    const handleShowProgramming = (programming) => {
        console.log("Detalle de la Programación:", programming)
    }

    const handleEditProgramming = (programming) => {
        console.log("Editar Programación:", programming)
        // navigate(`/programacion/programacionCursos/editarProgramacion/${programming.id}`)
    }

    const handleDeleteProgramming = (id) => {
        setItemToDelete(id);
        setShowDeleteConfirm(true);
    }

    const confirmDeleteProgramming = () => {
        try {
            // Eliminar de la lista local
            const updatedSchedules = schedules.filter(s => s.id !== itemToDelete);
            setSchedules(updatedSchedules);

            // Actualizar localStorage
            const savedSchedules = JSON.parse(localStorage.getItem('courseSchedules') || '[]');
            const updatedSavedSchedules = savedSchedules.filter(s => s.id !== itemToDelete);
            localStorage.setItem('courseSchedules', JSON.stringify(updatedSavedSchedules));

            // Mostrar mensaje de éxito
            setSuccessMessage("Programación eliminada exitosamente");
            setShowSuccessModal(true);
        } catch (error) {
            console.error("Error al eliminar la programación:", error);
            setSuccessMessage("Ocurrió un error al eliminar la programación");
            setShowSuccessModal(true);
        } finally {
            setShowDeleteConfirm(false);
            setItemToDelete(null);
        }
    }

    return (
        <div className="min-h-screen">
            <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-[#1f384c]">Programacion De Cursos</h1>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 text-[#1f384c] font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
                        >
                            <span>Administrador</span>
                            <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                                <button
                                    onClick={handleLogoutClick}
                                    className="w-full text-left px-4 py-2 text-[#f44144] hover:bg-gray-50 rounded-lg"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-6">
                <GenericTable
                    data={schedules}
                    columns={columns}
                    onAdd={handleAddProgramming}
                    onShow={handleShowProgramming}
                    onEdit={handleEditProgramming}
                    onDelete={handleDeleteProgramming}
                    showActions={{ show: true, edit: true, delete: true, add: true }}
                />

                {/* Modal de confirmación para cerrar sesión */}
                <ConfirmationModal
                    isOpen={showLogoutConfirm}
                    onClose={() => setShowLogoutConfirm(false)}
                    onConfirm={handleLogout}
                    title="Cerrar Sesión"
                    message="¿Está seguro de que desea cerrar la sesión actual?"
                    confirmText="Cerrar Sesión"
                    confirmColor="bg-[#f44144] hover:bg-red-600"
                />

                {/* Modal de confirmación para eliminar programación */}
                <ConfirmationModal
                    isOpen={showDeleteConfirm}
                    onClose={() => setShowDeleteConfirm(false)}
                    onConfirm={confirmDeleteProgramming}
                    title="Eliminar Programación"
                    message="¿Está seguro que desea eliminar esta programación? Esta acción no se puede deshacer."
                    confirmText="Eliminar"
                    confirmColor="bg-[#f44144] hover:bg-red-600"
                />

                {/* Modal de éxito */}
                <ConfirmationModal
                    isOpen={showSuccessModal}
                    onConfirm={() => setShowSuccessModal(false)}
                    title="Operación Exitosa"
                    message={successMessage}
                    confirmText="Aceptar"
                    confirmColor="bg-green-500 hover:bg-green-600"
                    showButtonCancel={false}
                />
            </div>
        </div>
    )
}

export default CourseProgrammingPage