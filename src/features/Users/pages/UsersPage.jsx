import { useState } from "react"
import GenericTable from "../../../shared/components/Table"
import UserDetailModal from "./UserDetailModal"

// Datos de ejemplo
const users = [
  { id: 1, nombre: "Juan Pérez", correo: "juan@example.com", estado: "Activo", rol: "Admin" },
  { id: 2, nombre: "María Gómez", correo: "maria@example.com", estado: "Inactivo", rol: "Usuario" },
  { id: 3, nombre: "Carlos López", correo: "carlos@example.com", estado: "Activo", rol: "Moderador" },
  { id: 4, nombre: "Ana Ramírez", correo: "ana@example.com", estado: "Activo", rol: "Usuario" },
  { id: 5, nombre: "Pedro Martínez", correo: "pedro@example.com", estado: "Inactivo", rol: "Admin" },
  { id: 6, nombre: "Albert Einstein", correo: "albert@example.com", estado: "Activo", rol: "Instructor" },
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

  const handleShowUser = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div>
      <GenericTable
        data={users}
        columns={columns}
        onShow={handleShowUser}
        title="LISTA DE USUARIOS"
        showActions={{ show: true, edit: false, delete: false }}
      />

      {selectedUser && <UserDetailModal user={selectedUser} isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  )
}

export default Usuarios

