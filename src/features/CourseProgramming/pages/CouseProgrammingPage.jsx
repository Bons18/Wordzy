import { useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"
import GenericTable from "../../../shared/components/Table"


const schedules = [
    { id: 1, nombre: "Programa 1", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
    { id: 2, nombre: "Programa 2", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
    { id: 3, nombre: "Programa 3", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
    { id: 4, nombre: "Programa 4", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
    { id: 5, nombre: "Programa 5", fechaInicio: "01-01-2023", fechaFin: "01-06-2025", estado: "Activo" },
    { id: 6, nombre: "Programa 6", fechaInicio: "01-01-2023", fechaFin: "01-01-2024", estado: "Inactivo" },
    { id: 7, nombre: "Programa 7", fechaInicio: "01-02-2023", fechaFin: "01-07-2025", estado: "Activo" },
    { id: 8, nombre: "Programa 8", fechaInicio: "01-03-2023", fechaFin: "01-08-2025", estado: "Activo" },
    { id: 9, nombre: "Programa 9", fechaInicio: "01-04-2023", fechaFin: "01-09-2025", estado: "Inactivo" },
    { id: 10, nombre: "Programa 10", fechaInicio: "01-05-2023", fechaFin: "01-10-2025", estado: "Activo" },
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

const CouseProgrammingPage = () => {
    const navigate = useNavigate()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
    const { logout } = useAuth()

    const dropdownRef = useRef(null)

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
    }

    const handleDeleteProgramming = (id) => {
        console.log("Eliminar Programación con ID:", id)
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

                        {/* Logout Confirmation Modal */}
                        {showLogoutConfirm && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                                <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 transform transition-all">
                                    <div className="p-6">
                                        <div className="text-center mb-6">
                                            <h3 className="text-xl font-semibold text-[#1f384c]">
                                                Cerrar Sesión
                                            </h3>
                                            <p className="mt-2 text-[#627b87]">
                                                ¿Está seguro de que desea cerrar la sesión actual?
                                            </p>
                                        </div>

                                        <div className="flex justify-center gap-3">
                                            <button
                                                className="px-6 py-2.5 border border-[#d9d9d9] rounded-lg text-[#627b87] hover:bg-gray-50 font-medium transition-colors"
                                                onClick={() => setShowLogoutConfirm(false)}
                                            >
                                                Cancelar
                                            </button>
                                            <button
                                                className="px-6 py-2.5 bg-[#f44144] text-white rounded-lg hover:bg-red-600 font-medium transition-colors"
                                                onClick={handleLogout}
                                            >
                                                Cerrar Sesión
                                            </button>
                                        </div>
                                    </div>
                                </div>
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
            </div>
        </div>

    )
}

export default CouseProgrammingPage