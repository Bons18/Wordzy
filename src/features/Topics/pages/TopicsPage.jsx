import React, { useState } from "react";
import GenericTable from "../../../shared/components/Table";
import TopicModal from "../components/TopicModal"; // Importa el componente del modal

const topics = [
  { id: 1, nombre: "Verbo to be", estado: "Activo" },
  { id: 2, nombre: "Artículos", estado: "Inactivo" },
  { id: 3, nombre: "Presente simple", estado: "Activo" },
  { id: 4, nombre: "Pronombres", estado: "Inactivo" },
  { id: 5, nombre: "Pasado simple", estado: "Activo" },
  { id: 6, nombre: "Adjetivos", estado: "Inactivo" },
];

const columns = [
  { key: "id", label: "Id" },
  { key: "nombre", label: "Nombre" },
  {
    key: "estado", label: "Estado", render: (item) => (
      <span className={`generic-table-status ${item.estado === "Activo" ? "activo" : "inactivo"}`}>
        {item.estado}
      </span>
    )
  },
];

const TopicsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topicsList, setTopicsList] = useState(topics);

  const handleAddTopic = () => {
    setIsModalOpen(true); // Abre el modal
  };

  const handleEditTopic = (topic) => {
    console.log("Editar Tema:", topic);
  };

  const handleDeleteTopic = (id) => {
    console.log("Eliminar Tema con ID:", id);
  };

  const handleSubmitTopic = (newTopic) => {
    const newId = topicsList.length + 1;
    const newTema = { ...newTopic, id: newId, estado: "Activo" };
    setTopicsList([...topicsList, newTema]); // Agrega el nuevo tema a la lista
  };

  return (
    <div>
      <GenericTable
        data={topicsList}
        columns={columns}
        onAdd={handleAddTopic}
        onEdit={handleEditTopic}
        onDelete={handleDeleteTopic}
        title="GESTIÓN DE TEMAS"
      />
      <TopicModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmitTopic}
      />
    </div>
  );
};

export default TopicsPage;