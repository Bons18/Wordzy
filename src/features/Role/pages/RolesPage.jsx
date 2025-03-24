import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GenericTable from "../../../shared/components/Table";
import { RoleContext } from "../../../shared/contexts/RoleContext/RoleContext";// Importa el contexto

const columns = [
  { key: "id", label: "Id" },
  { key: "nombre", label: "Nombre" },
  { key: "descripcion", label: "Descripción" },
  { key: "fechaCreacion", label: "Fecha de creación" },
  {
    key: "estado", label: "Estado", render: (item) => (
      <span className={`generic-table-status ${item.estado === "Activo" ? "activo" : "inactivo"}`}>
        {item.estado}
      </span>
    )
  },
];

const RolesPage = () => {
  const navigate = useNavigate();
  const { roles } = useContext(RoleContext); // Obtén los roles del contexto

  const handleAddRole = () => {
    navigate("/configuracion/roles/registrarRol"); // Redirige a la ruta de registro
  };

  const handleEditRole = (role) => {
    console.log("Editar Rol:", role);
  };

  const handleDeleteRole = (id) => {
    console.log("Eliminar Rol con ID:", id);
  };

  return (
    <div className="p-6">
      <GenericTable
        data={roles}
        columns={columns}
        onAdd={handleAddRole}
        onEdit={handleEditRole}
        onDelete={handleDeleteRole}
        title="GESTIÓN DE ROLES"
      />
    </div>
  );
};

export default RolesPage;