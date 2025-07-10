"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import EvaluationForm from "../components/EvaluationForm"
import usePostEvaluation from "../hooks/usePostEvaluation"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"

const CreateEvaluationPage = () => {
  const navigate = useNavigate()
  const { createEvaluation, loading, error } = usePostEvaluation()
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

  const handleSubmit = async (formData) => {
    try {
      await createEvaluation(formData)
      setIsSuccessModalOpen(true)
    } catch (err) {
      console.error("Error al crear la evaluación:", err)
      // El error se muestra a través del hook, pero se puede manejar aquí si es necesario
    }
  }

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false)
    navigate("/programacion/evaluaciones")
  }

  return (
    <div className="container mx-auto p-4">
      {loading && <p>Creando evaluación...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
      <EvaluationForm
        onSubmit={handleSubmit}
        onCancel={() => navigate("/programacion/evaluaciones")}
        isCreating={true}
      />

      <ConfirmationModal
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
        onConfirm={handleCloseSuccessModal}
        title="Operación Exitosa"
        message="Evaluación creada exitosamente."
        confirmText="Aceptar"
        confirmColor="bg-green-500 hover:bg-green-600"
        showButtonCancel={false}
      />
    </div>
  )
}

export default CreateEvaluationPage
