import { useNavigate } from "react-router-dom";
import GenericTable from "../../../shared/components/Table"
import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"


const scheduledCourses = [
    { nivel: "Nivel 1", cantidadFichas: "25", cantidadInstructores: "3", progresoGeneral: "25%" },
    { nivel: "Nivel 2", cantidadFichas: "30", cantidadInstructores: "4", progresoGeneral: "100%" },
    { nivel: "Nivel 3", cantidadFichas: "29", cantidadInstructores: "1", progresoGeneral: "50%" },
    { nivel: "Nivel 4", cantidadFichas: "10", cantidadInstructores: "5", progresoGeneral: "10%" },
    { nivel: "Nivel 5", cantidadFichas: "13", cantidadInstructores: "2", progresoGeneral: "75%" },
    { nivel: "Nivel 6", cantidadFichas: "8", cantidadInstructores: "3", progresoGeneral: "80%" },
]

const columns = [
    { key: "nivel", label: "Nivel" },
    { key: "cantidadFichas", label: "Cantidad Fichas" },
    { key: "cantidadInstructores", label: "Cantidad Instructores" },
    { key: "progresoGeneral", label: "Progreso General" },

]

const ScheduledCoursesPage = () => {
    const navigate = useNavigate();
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

    const handleShowProgramming = () => {
        navigate("/progreso/cursosProgramados/fichas");
    }

    return (
        <div className="min-h-screen">
            <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-[#1f384c]">Cursos Programados</h1>
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
                    data={scheduledCourses}
                    columns={columns}
                    onShow={handleShowProgramming}
                    tooltipText="Ver Fichas"
                    showActions={{ show: true, edit: false, delete: false, add: false }}
                />
            </div>
        </div>

    )
}

export default ScheduledCoursesPage