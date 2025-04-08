"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"

const trainees = [
    {
        id: 1,
        nombre: "Juan Perez",
        correo: "juan@gmail.com",
        telefono: "1234567890",
        progreso: "10%",
        puntosTotales: "100",
    },
    {
        id: 2,
        nombre: "Maria Rodriguez",
        correo: "maria@gmail.com",
        telefono: "1234567890",
        progreso: "20%",
        puntosTotales: "200",
    },
    {
        id: 3,
        nombre: "Pedro Gomez",
        correo: "pedro@gmail.com",
        telefono: "1234567890",
        progreso: "30%",
        puntosTotales: "300",
    },
    {
        id: 4,
        nombre: "Ana Perez",
        correo: "ana@gmail.com",
        telefono: "1234567890",
        progreso: "40%",
        puntosTotales: "400",
    },
    {
        id: 5,
        nombre: "Luisa Rodriguez",
        correo: "luisa@gmail.com",
        telefono: "1234567890",
        progreso: "50%",
        puntosTotales: "500",
    },
    {
        id: 6,
        nombre: "Carlos Gomez",
        correo: "carlos@gmail.com",
        telefono: "1234567890",
        progreso: "60%",
        puntosTotales: "600",
    },
    {
        id: 7,
        nombre: "Sofia Martinez",
        correo: "sofia@gmail.com",
        telefono: "9876543210",
        progreso: "70%",
        puntosTotales: "700",
    },
    {
        id: 8,
        nombre: "Diego Torres",
        correo: "diego@gmail.com",
        telefono: "9876543211",
        progreso: "80%",
        puntosTotales: "800",
    },
    {
        id: 9,
        nombre: "Laura Ramirez",
        correo: "laura@gmail.com",
        telefono: "9876543212",
        progreso: "90%",
        puntosTotales: "900",
    },
    {
        id: 10,
        nombre: "Miguel Sanchez",
        correo: "miguel@gmail.com",
        telefono: "9876543213",
        progreso: "100%",
        puntosTotales: "1000",
    },
]

const columns = [
    { key: "nombre", label: "Nombre" },
    { key: "correo", label: "Correo" },
    { key: "telefono", label: "Teléfono" },
    {
        key: "progreso",
        label: "Progreso",
        width: '18%', // Aumenté el ancho de la columna
        render: (item) => (
            <div className="flex items-center gap-2 w-full"> {/* Añadí mr-4 para espaciado extra */}
                <div className="flex-1 min-w-[100px]">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: item.progreso }}
                        ></div>
                    </div>
                </div>
                <span className="text-sm text-gray-600 w-11 text-right mr-8">
                    {item.progreso}
                </span>
            </div>
        ),
    },
    { key: "puntosTotales", label: "Puntos Totales", width: '12%' },
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

    const handleShowProgress = (trainee) => {
        // Navegar a la página de progreso del aprendiz usando la ruta correcta
        navigate(`/progreso/cursosProgramados/fichas/aprendices/progreso/${encodeURIComponent(trainee.nombre)}`)
    }

    const handleBack = () => {
        navigate('/progreso/cursosProgramados/fichas');
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
                    </div>
                </div>
            </header>


            <div className="container mx-auto px-6">
                <div className="flex items-center mb-6">
                    <button
                        onClick={handleBack}
                        className="flex items-center gap-1 bg-gray-200 text-black px-3 py-1.5 text-sm rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        ← Volver a Fichas
                    </button>
                </div>
                <GenericTable
                    data={trainees}
                    columns={columns}
                    onShow={handleShowProgress}
                    tooltipText="Ver Progreso"
                    showActions={{ show: true, edit: false, delete: false, add: false }}
                />
                <ConfirmationModal
                    isOpen={showLogoutConfirm}
                    onClose={() => setShowLogoutConfirm(false)}
                    onConfirm={handleLogout}
                    title="Cerrar Sesión"
                    message="¿Está seguro de que desea cerrar la sesión actual?"
                    confirmText="Cerrar Sesión"
                />
            </div>
        </div>
    )
}

export default TraineesPage

