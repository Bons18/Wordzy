"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import UserDetailModal from "./UserDetailModal"
import { useAuth } from "../../auth/hooks/useAuth"

// Datos de ejemplo
const users = [
  { id: 1, nombre: "Juan Pérez", correo: "juan@example.com", estado: "Activo", rol: "Admin" },
  { id: 2, nombre: "María Gómez", correo: "maria@example.com", estado: "Inactivo", rol: "Usuario" },
  { id: 3, nombre: "Carlos López", correo: "carlos@example.com", estado: "Activo", rol: "Moderador" },
  { id: 4, nombre: "Ana Ramírez", correo: "ana@example.com", estado: "Activo", rol: "Usuario" },
  { id: 5, nombre: "Pedro Martínez", correo: "pedro@example.com", estado: "Inactivo", rol: "Admin" },
  { id: 6, nombre: "Albert Einstein", correo: "albert@example.com", estado: "Activo", rol: "Instructor" },
  { id: 7, nombre: "Isaac Newton", correo: "isaac@example.com", estado: "Activo", rol: "Instructor" },
  { id: 8, nombre: "Nikola Tesla", correo: "nikola@example.com", estado: "Inactivo", rol: "Investigador" },
  { id: 9, nombre: "Ada Lovelace", correo: "ada@example.com", estado: "Activo", rol: "Desarrollador" },
  { id: 10, nombre: "Marie Curie", correo: "marie@example.com", estado: "Activo", rol: "Científico" },
  { id: 11, nombre: "Galileo Galilei", correo: "galileo@example.com", estado: "Inactivo", rol: "Astrónomo" },
  { id: 12, nombre: "Leonardo da Vinci", correo: "leonardo@example.com", estado: "Activo", rol: "Artista" },
  { id: 13, nombre: "Katherine Johnson", correo: "katherine@example.com", estado: "Activo", rol: "Matemático" },
  { id: 14, nombre: "Alan Turing", correo: "alan@example.com", estado: "Inactivo", rol: "Criptógrafo" },
  { id: 15, nombre: "Sophie Germain", correo: "sophie@example.com", estado: "Activo", rol: "Matemático" },
]

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "correo", label: "Correo" },
  {
    key: "estado",
    label: "Estado",
    render: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {item.estado}
      </span>
    ),
  },
  { key: "rol", label: "Rol" },
]

const Usuarios = () => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
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

  const handleShowUser = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Usuarios</h1>
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
                  onClick={handleLogout}
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
          data={users}
          columns={columns}
          onShow={handleShowUser}
          title="LISTA DE USUARIOS"
          showActions={{ show: true, edit: false, delete: false }}
        />

        {selectedUser && <UserDetailModal user={selectedUser} isOpen={isModalOpen} onClose={handleCloseModal} />}
      </div>
    </div>
  )
}

export default Usuarios

