import { useNavigate } from "react-router-dom";
import GenericTable from "../../../shared/components/Table"
import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"


const files = [
    { fichas: "4556778", programa: "Programa 1", Instructor: "Instructor 1", cantidadAprendices: 10, fechaInicio: "10-10-2021", fechaFin: "10-10-2022", progreso: "10%" },
    { fichas: "2345543", programa: "Programa 2", Instructor: "Instructor 2", cantidadAprendices: 20, fechaInicio: "10-10-2021", fechaFin: "10-10-2022", progreso: "20%" },
    { fichas: "1925422", programa: "Programa 3", Instructor: "Instructor 3", cantidadAprendices: 15, fechaInicio: "10-10-2021", fechaFin: "10-10-2022", progreso: "30%" },
    { fichas: "4435672", programa: "Programa 4", Instructor: "Instructor 4", cantidadAprendices: 12, fechaInicio: "10-10-2021", fechaFin: "10-10-2022", progreso: "40%" },
    { fichas: "5543673", programa: "Programa 5", Instructor: "Instructor 5", cantidadAprendices: 22, fechaInicio: "10-10-2021", fechaFin: "10-10-2022", progreso: "50%" },
    { fichas: "6893354", programa: "Programa 6", Instructor: "Instructor 6", cantidadAprendices: 30, fechaInicio: "10-10-2021", fechaFin: "10-10-2022", progreso: "60%" },
    { fichas: "7665544", programa: "Programa 7", Instructor: "Instructor 7", cantidadAprendices: 20, fechaInicio: "10-10-2021", fechaFin: "10-10-2022", progreso: "70%" },
    { fichas: "8765432", programa: "Programa 8", Instructor: "Instructor 8", cantidadAprendices: 25, fechaInicio: "01-01-2022", fechaFin: "01-01-2023", progreso: "80%" },
    { fichas: "9876543", programa: "Programa 9", Instructor: "Instructor 9", cantidadAprendices: 18, fechaInicio: "05-05-2022", fechaFin: "05-05-2023", progreso: "90%" },
    { fichas: "1234567", programa: "Programa 10", Instructor: "Instructor 10", cantidadAprendices: 35, fechaInicio: "07-07-2022", fechaFin: "07-07-2023", progreso: "100%" },
    
]

const columns = [
    { key: "fichas", label: "Fichas" },
    { key: "programa", label: "Programa" },
    { key: "Instructor", label: "Instructor" },
    { key: "cantidadAprendices", label: "N° Aprendices" },
    { key: "fechaInicio", label: "Fecha de Inicio" },
    { key: "fechaFin", label: "Fecha de Fin" },
    {
        key: "progreso",
        label: "Progreso",
        render: (item) => (
            <div className="flex items-center">
                <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: item.progreso }}></div>
                </div>
                <span>{item.progreso}</span>
            </div>
        ),
    },

]

const FilePage = () => {
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

    const handleShowTrainees = () => {
        navigate("/progreso/cursosProgramados/fichas/aprendices");
    }

    const handleBack = () => {
        navigate('/progreso/cursosProgramados');
    };

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
            <div className="flex items-center mb-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-1 bg-gray-200 text-black px-3 py-1.5 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        ← Volver a Niveles
                    </button>
                </div>
                <GenericTable
                    data={files}
                    columns={columns}
                    onShow={handleShowTrainees}
                    tooltipText="Ver Aprendices"
                    showActions={{ show: true, edit: false, delete: false, add: false }}
                />
            </div>
        </div>

    )
}

export default FilePage