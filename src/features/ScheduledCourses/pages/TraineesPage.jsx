import GenericTable from "../../../shared/components/Table"
import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"
import { useNavigate } from "react-router-dom"


const trainees = [
    { nombre: "Juan Perez", correo: "juan@gmail.com", telefono: "1234567890", progreso: "10%", puntosTotales: "100", ultimaConexion: "10-10-2021" },
    { nombre: "Maria Rodriguez", correo: "maria@gmail.com", telefono: "1234567890", progreso: "20%", puntosTotales: "200", ultimaConexion: "10-10-2021" },
    { nombre: "Pedro Gomez", correo: "pedro@gmail.com", telefono: "1234567890", progreso: "30%", puntosTotales: "300", ultimaConexion: "10-10-2021" },
    { nombre: "Ana Perez", correo: "ana@gmail.com", telefono: "1234567890", progreso: "40%", puntosTotales: "400", ultimaConexion: "10-10-2021" },
    { nombre: "Luisa Rodriguez", correo: "luisa@gmail.com", telefono: "1234567890", progreso: "50%", puntosTotales: "500", ultimaConexion: "10-10-2021" },
    { nombre: "Carlos Gomez", correo: "carlos@gmail.com", telefono: "1234567890", progreso: "60%", puntosTotales: "600", ultimaConexion: "10-10-2021" },
]

const columns = [
    { key: "nombre", label: "Nombre" },
    { key: "correo", label: "Correo" },
    { key: "telefono", label: "Teléfono" },
    { key: "progreso", label: "Progreso" },
    { key: "puntosTotales", label: "Puntos Totales" },
    { key: "ultimaConexion", label: "Última Conexión" },

]

const TraineesPage = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
    const { logout } = useAuth()
    const navigate = useNavigate()
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

    const handleShowProgress = (progress) => {
        console.log("Detalle del progreso:", progress)
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
                    data={trainees}
                    columns={columns}
                    onShow={handleShowProgress}
                    title="LISTA DE APRENDICES"
                    tooltipText="Ver Progreso"
                    showActions={{ show: true, edit: false, delete: false, add: false }}
                />
            </div>
        </div>

    )
}

export default TraineesPage