// // // // // // "use client"

// // // // // // import { useState, useEffect, useRef } from "react"
// // // // // // import { ChevronDown } from "lucide-react"
// // // // // // import { useNavigate } from "react-router-dom"
// // // // // // import GenericTable from "../../../shared/components/Table"
// // // // // // import { useAuth } from "../../auth/hooks/useAuth"
// // // // // // import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// // // // // // // Datos de ejemplo
// // // // // // const escalasData = [
// // // // // //   {
// // // // // //     id: 1,
// // // // // //     fechaInicial: "20-10-2023",
// // // // // //     fechaFinal: "20-10-2026",
// // // // // //     rangoInicial: 1,
// // // // // //     rangoFinal: 69,
// // // // // //     valoracion: "No aprueba",
// // // // // //     descripcion:
// // // // // //       "Rango de valoración para calificaciones insuficientes. Los estudiantes que obtengan una calificación en este rango deberán realizar actividades de refuerzo.",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 2,
// // // // // //     fechaInicial: "20-10-2020",
// // // // // //     fechaFinal: "20-10-2026",
// // // // // //     rangoInicial: 70,
// // // // // //     rangoFinal: 90,
// // // // // //     valoracion: "Aprueba",
// // // // // //     descripcion:
// // // // // //       "Rango de valoración para calificaciones satisfactorias. Los estudiantes que obtengan una calificación en este rango han demostrado un dominio adecuado de los contenidos.",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 3,
// // // // // //     fechaInicial: "20-10-2024",
// // // // // //     fechaFinal: "20-10-2026",
// // // // // //     rangoInicial: 70,
// // // // // //     rangoFinal: 80,
// // // // // //     valoracion: "No aprueba",
// // // // // //     descripcion:
// // // // // //       "Rango de valoración especial para evaluaciones de nivel avanzado. A pesar de estar en un rango normalmente aprobatorio, en este contexto se requiere un desempeño superior.",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 4,
// // // // // //     fechaInicial: "20-10-2021",
// // // // // //     fechaFinal: "20-10-2026",
// // // // // //     rangoInicial: 70,
// // // // // //     rangoFinal: 75,
// // // // // //     valoracion: "Aprueba",
// // // // // //     descripcion:
// // // // // //       "Rango de valoración para calificaciones mínimas aprobatorias. Los estudiantes en este rango han cumplido con los requisitos básicos del curso.",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 5,
// // // // // //     fechaInicial: "20-10-2022",
// // // // // //     fechaFinal: "20-10-2026",
// // // // // //     rangoInicial: 70,
// // // // // //     rangoFinal: 100,
// // // // // //     valoracion: "No aprueba",
// // // // // //     descripcion:
// // // // // //       "Rango de valoración especial para evaluaciones de certificación internacional. Requiere revisión adicional independientemente del puntaje obtenido.",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 6,
// // // // // //     fechaInicial: "20-03-2023",
// // // // // //     fechaFinal: "20-0-2026",
// // // // // //     rangoInicial: 70,
// // // // // //     rangoFinal: 85,
// // // // // //     valoracion: "No aprueba",
// // // // // //     descripcion:
// // // // // //       "Rango de valoración para evaluaciones de nivel experto. Se requiere un desempeño excepcional para aprobar este tipo de evaluaciones.",
// // // // // //   },
// // // // // //   {
// // // // // //     id: 7,
// // // // // //     fechaInicial: "20-02-2022",
// // // // // //     fechaFinal: "20-10-2026",
// // // // // //     rangoInicial: 70,
// // // // // //     rangoFinal: 95,
// // // // // //     valoracion: "Aprueba",
// // // // // //     descripcion:
// // // // // //       "Rango de valoración para calificaciones en cursos de nivelación. Los estudiantes en este rango han demostrado un progreso significativo.",
// // // // // //   },
// // // // // // ]

// // // // // // const columns = [
// // // // // //   { key: "fechaInicial", label: "Fecha Inicial" },
// // // // // //   { key: "fechaFinal", label: "Fecha Final" },
// // // // // //   { key: "rangoInicial", label: "Rango Inicial", render: (item) => `${item.rangoInicial}%` },
// // // // // //   { key: "rangoFinal", label: "Rango Final", render: (item) => `${item.rangoFinal}%` },
// // // // // //   {
// // // // // //     key: "valoracion",
// // // // // //     label: "Valoración",
// // // // // //     render: (item) => (
// // // // // //       <span
// // // // // //         className={`px-2 py-1 rounded-full text-xs font-medium ${
// // // // // //           item.valoracion === "Aprueba" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// // // // // //         }`}
// // // // // //       >
// // // // // //         {item.valoracion}
// // // // // //       </span>
// // // // // //     ),
// // // // // //   },
// // // // // // ]

// // // // // // const Scale = () => {
// // // // // //   const [selectedEscala, setSelectedEscala] = useState(null)
// // // // // //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
// // // // // //   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
// // // // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
// // // // // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// // // // // //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// // // // // //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
// // // // // //   const [itemToDelete, setItemToDelete] = useState(null)
// // // // // //   const [successMessage, setSuccessMessage] = useState("")
// // // // // //   const [showSuccessModal, setShowSuccessModal] = useState(false)
// // // // // //   const [scales, setScales] = useState([...escalasData])
// // // // // //   const { logout } = useAuth()
// // // // // //   const navigate = useNavigate()
// // // // // //   const dropdownRef = useRef(null)

// // // // // //   // Formulario para crear/editar
// // // // // //   const [formData, setFormData] = useState({
// // // // // //     fechaInicial: "",
// // // // // //     fechaFinal: "",
// // // // // //     rangoInicial: "",
// // // // // //     rangoFinal: "",
// // // // // //     valoracion: "Aprueba",
// // // // // //     descripcion: "",
// // // // // //   })

// // // // // //   useEffect(() => {
// // // // // //     const handleClickOutside = (event) => {
// // // // // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// // // // // //         setIsDropdownOpen(false)
// // // // // //       }
// // // // // //     }

// // // // // //     document.addEventListener("mousedown", handleClickOutside)
// // // // // //     return () => document.removeEventListener("mousedown", handleClickOutside)
// // // // // //   }, [])

// // // // // //   const handleLogoutClick = () => {
// // // // // //     setIsDropdownOpen(false)
// // // // // //     setShowLogoutConfirm(true)
// // // // // //   }

// // // // // //   const handleLogout = () => {
// // // // // //     logout()
// // // // // //     navigate("/login")
// // // // // //   }

// // // // // //   const handleShowEscala = (escala) => {
// // // // // //     setSelectedEscala(escala)
// // // // // //     setIsDetailModalOpen(true)
// // // // // //   }

// // // // // //   const handleCloseDetailModal = () => {
// // // // // //     setIsDetailModalOpen(false)
// // // // // //   }

// // // // // //   const handleAddScale = () => {
// // // // // //     setFormData({
// // // // // //       fechaInicial: "",
// // // // // //       fechaFinal: "",
// // // // // //       rangoInicial: "",
// // // // // //       rangoFinal: "",
// // // // // //       valoracion: "Aprueba",
// // // // // //       descripcion: "",
// // // // // //     })
// // // // // //     setIsCreateModalOpen(true)
// // // // // //   }

// // // // // //   const handleEditScale = (scale) => {
// // // // // //     setSelectedEscala(scale)
// // // // // //     setFormData({
// // // // // //       fechaInicial: scale.fechaInicial,
// // // // // //       fechaFinal: scale.fechaFinal,
// // // // // //       rangoInicial: scale.rangoInicial,
// // // // // //       rangoFinal: scale.rangoFinal,
// // // // // //       valoracion: scale.valoracion,
// // // // // //       descripcion: scale.descripcion,
// // // // // //     })
// // // // // //     setIsEditModalOpen(true)
// // // // // //   }

// // // // // //   const handleDeleteScale = (id) => {
// // // // // //     setItemToDelete(id)
// // // // // //     setShowDeleteConfirm(true)
// // // // // //   }

// // // // // //   const confirmDeleteScale = () => {
// // // // // //     try {
// // // // // //       // Eliminar de la lista local
// // // // // //       const updatedScales = scales.filter((s) => s.id !== itemToDelete)
// // // // // //       setScales(updatedScales)

// // // // // //       // Mostrar mensaje de éxito
// // // // // //       setSuccessMessage("Escala eliminada exitosamente")
// // // // // //       setShowSuccessModal(true)
// // // // // //     } catch (error) {
// // // // // //       console.error("Error al eliminar la escala:", error)
// // // // // //       setSuccessMessage("Ocurrió un error al eliminar la escala")
// // // // // //       setShowSuccessModal(true)
// // // // // //     } finally {
// // // // // //       setShowDeleteConfirm(false)
// // // // // //       setItemToDelete(null)
// // // // // //     }
// // // // // //   }

// // // // // //   const handleInputChange = (e) => {
// // // // // //     const { name, value } = e.target
// // // // // //     setFormData({
// // // // // //       ...formData,
// // // // // //       [name]: name === "rangoInicial" || name === "rangoFinal" ? Number.parseInt(value) || "" : value,
// // // // // //     })
// // // // // //   }

// // // // // //   const handleToggleValoracion = () => {
// // // // // //     setFormData({
// // // // // //       ...formData,
// // // // // //       valoracion: formData.valoracion === "Aprueba" ? "No aprueba" : "Aprueba",
// // // // // //     })
// // // // // //   }

// // // // // //   const handleCreateSubmit = (e) => {
// // // // // //     e.preventDefault()
// // // // // //     const newScale = {
// // // // // //       id: Math.max(...scales.map((s) => s.id)) + 1,
// // // // // //       ...formData,
// // // // // //     }
// // // // // //     setScales([...scales, newScale])
// // // // // //     setIsCreateModalOpen(false)
// // // // // //     setSuccessMessage("Escala creada exitosamente")
// // // // // //     setShowSuccessModal(true)
// // // // // //   }

// // // // // //   const handleEditSubmit = (e) => {
// // // // // //     e.preventDefault()
// // // // // //     const updatedScales = scales.map((scale) => (scale.id === selectedEscala.id ? { ...scale, ...formData } : scale))
// // // // // //     setScales(updatedScales)
// // // // // //     setIsEditModalOpen(false)
// // // // // //     setSuccessMessage("Escala actualizada exitosamente")
// // // // // //     setShowSuccessModal(true)
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="min-h-screen">
// // // // // //       <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
// // // // // //         <div className="container mx-auto flex justify-between items-center">
// // // // // //           <h1 className="text-2xl font-bold text-[#1f384c]">ESCALA DE VALORACIÓN</h1>
// // // // // //           <div className="relative" ref={dropdownRef}>
// // // // // //             <button
// // // // // //               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
// // // // // //               className="flex items-center gap-2 text-[#1f384c] font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
// // // // // //             >
// // // // // //               <span>Administrador</span>
// // // // // //               <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
// // // // // //             </button>

// // // // // //             {isDropdownOpen && (
// // // // // //               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
// // // // // //                 <button
// // // // // //                   onClick={handleLogoutClick}
// // // // // //                   className="w-full text-left px-4 py-2 text-[#f44144] hover:bg-gray-50 rounded-lg"
// // // // // //                 >
// // // // // //                   Cerrar Sesión
// // // // // //                 </button>
// // // // // //               </div>
// // // // // //             )}
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </header>

// // // // // //       <div className="container mx-auto px-6">
// // // // // //         <GenericTable
// // // // // //           data={scales}
// // // // // //           columns={columns}
// // // // // //           onShow={handleShowEscala}
// // // // // //           onAdd={handleAddScale}
// // // // // //           onEdit={handleEditScale}
// // // // // //           onDelete={handleDeleteScale}
// // // // // //           showActions={{ show: true, edit: true, delete: true, add: true }}
// // // // // //         />

// // // // // //         {selectedEscala && (
// // // // // //           <ScaleDetailModal escala={selectedEscala} isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} />
// // // // // //         )}

// // // // // //         {/* Create Scale Modal */}
// // // // // //         {isCreateModalOpen && (
// // // // // //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // // //             <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[80vh] overflow-auto">
// // // // // //               <div className="p-4">
// // // // // //                 <h2 className="text-xl font-bold text-[#1f384c] mb-4">CREAR ESCALA DE VALORACIÓN</h2>

// // // // // //                 <form onSubmit={handleCreateSubmit}>
// // // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// // // // // //                     <div>
// // // // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial*</label>
// // // // // //                       <input
// // // // // //                         type="Date"
// // // // // //                         name="fechaInicial"
// // // // // //                         value={formData.fechaInicial}
// // // // // //                         onChange={handleInputChange}
// // // // // //                         placeholder="DD/MM/YYYY"
// // // // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // // // //                         required
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final*</label>
// // // // // //                       <input
// // // // // //                         type="Date"
// // // // // //                         name="fechaFinal"
// // // // // //                         value={formData.fechaFinal}
// // // // // //                         onChange={handleInputChange}
// // // // // //                         placeholder="DD/MM/YYYY"
// // // // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // // // //                         required
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Rango Inicial (%)*</label>
// // // // // //                       <input
// // // // // //                         type="number"
// // // // // //                         name="rangoInicial"
// // // // // //                         value={formData.rangoInicial}
// // // // // //                         onChange={handleInputChange}
// // // // // //                         min="0"
// // // // // //                         max="100"
// // // // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // // // //                         required
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Rango Final (%)*</label>
// // // // // //                       <input
// // // // // //                         type="number"
// // // // // //                         name="rangoFinal"
// // // // // //                         value={formData.rangoFinal}
// // // // // //                         onChange={handleInputChange}
// // // // // //                         min="0"
// // // // // //                         max="100"
// // // // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // // // //                         required
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
// // // // // //                       <div className="flex items-center">
// // // // // //                         <label className="relative inline-flex items-center cursor-pointer">
// // // // // //                           <input
// // // // // //                             type="checkbox"
// // // // // //                             checked={formData.valoracion === "Aprueba"}
// // // // // //                             onChange={handleToggleValoracion}
// // // // // //                             className="sr-only peer"
// // // // // //                           />
// // // // // //                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
// // // // // //                           <span className="ml-3 text-sm font-medium text-gray-700">{formData.valoracion}</span>
// // // // // //                         </label>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   <div className="mb-4">
// // // // // //                     <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
// // // // // //                     <textarea
// // // // // //                       name="descripcion"
// // // // // //                       value={formData.descripcion}
// // // // // //                       onChange={handleInputChange}
// // // // // //                       rows="3"
// // // // // //                       className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // // // //                       placeholder="Descripción de la escala de valoración..."
// // // // // //                     ></textarea>
// // // // // //                   </div>

// // // // // //                   <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4 mb-4">
// // // // // //                     <div className="text-center font-medium mb-2 text-sm">Visualización de la escala</div>

// // // // // //                     <div className="mb-2 text-sm text-center">
// // // // // //                       {formData.valoracion === "Aprueba"
// // // // // //                         ? `Aprueba a partir = ${formData.rangoInicial || 0}%`
// // // // // //                         : `Aprueba a partir = ${(formData.rangoFinal || 0) + 1}%`}
// // // // // //                     </div>

// // // // // //                     {formData.valoracion === "No aprueba" ? (
// // // // // //                       <>
// // // // // //                         <div className="flex items-center justify-between mb-1 text-sm">
// // // // // //                           <span>0%</span>
// // // // // //                           <span>{formData.rangoFinal || 0}% Deficiente</span>
// // // // // //                         </div>
// // // // // //                         <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // // // // //                           <div
// // // // // //                             className="bg-[#dc3545] h-5 rounded"
// // // // // //                             style={{ width: `${formData.rangoFinal || 0}%` }}
// // // // // //                           ></div>
// // // // // //                         </div>
// // // // // //                         <div className="flex items-center justify-between mb-1 text-sm">
// // // // // //                           <span>{(formData.rangoFinal || 0) + 1}%</span>
// // // // // //                           <span>100% Excelente</span>
// // // // // //                         </div>
// // // // // //                         <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // // // // //                           <div
// // // // // //                             className="bg-[#46ae69] h-5 rounded"
// // // // // //                             style={{
// // // // // //                               width: `${100 - ((formData.rangoFinal || 0) + 1)}%`,
// // // // // //                               marginLeft: `${(formData.rangoFinal || 0) + 1}%`,
// // // // // //                             }}
// // // // // //                           ></div>
// // // // // //                         </div>
// // // // // //                       </>
// // // // // //                     ) : (
// // // // // //                       <>
// // // // // //                         <div className="flex items-center justify-between mb-1 text-sm">
// // // // // //                           <span>0%</span>
// // // // // //                           <span>{(formData.rangoInicial || 0) - 1}% Deficiente</span>
// // // // // //                         </div>
// // // // // //                         <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // // // // //                           <div
// // // // // //                             className="bg-[#dc3545] h-5 rounded"
// // // // // //                             style={{ width: `${(formData.rangoInicial || 0) - 1}%` }}
// // // // // //                           ></div>
// // // // // //                         </div>
// // // // // //                         <div className="flex items-center justify-between mb-1 text-sm">
// // // // // //                           <span>{formData.rangoInicial || 0}%</span>
// // // // // //                           <span>100% Excelente</span>
// // // // // //                         </div>
// // // // // //                         <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // // // // //                           <div
// // // // // //                             className="bg-[#46ae69] h-5 rounded"
// // // // // //                             style={{
// // // // // //                               width: `${100 - (formData.rangoInicial || 0)}%`,
// // // // // //                               marginLeft: `${formData.rangoInicial || 0}%`,
// // // // // //                             }}
// // // // // //                           ></div>
// // // // // //                         </div>
// // // // // //                       </>
// // // // // //                     )}
// // // // // //                   </div>

// // // // // //                   <div className="flex justify-between px-4">
// // // // // //                     <button
// // // // // //                       type="button"
// // // // // //                       onClick={() => setIsCreateModalOpen(false)}
// // // // // //                       className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
// // // // // //                     >
// // // // // //                       Cancelar
// // // // // //                     </button>
// // // // // //                     <button
// // // // // //                       type="submit"
// // // // // //                       className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
// // // // // //                     >
// // // // // //                       Crear
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 </form>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Edit Scale Modal */}
// // // // // //         {isEditModalOpen && selectedEscala && (
// // // // // //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // // //             <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[80vh] overflow-auto">
// // // // // //               <div className="p-4">
// // // // // //                 <h2 className="text-xl font-bold text-[#1f384c] mb-4">EDITAR ESCALA DE VALORACIÓN</h2>

// // // // // //                 <form onSubmit={handleEditSubmit}>
// // // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// // // // // //                     <div>
// // // // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial*</label>
// // // // // //                       <input
// // // // // //                         type="Date"
// // // // // //                         name="fechaInicial"
// // // // // //                         value={formData.fechaInicial}
// // // // // //                         onChange={handleInputChange}
// // // // // //                         placeholder="DD/MM/YYYY"
// // // // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // // // //                         required
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final*</label>
// // // // // //                       <input
// // // // // //                         type="Date"
// // // // // //                         name="fechaFinal"
// // // // // //                         value={formData.fechaFinal}
// // // // // //                         onChange={handleInputChange}
// // // // // //                         placeholder="DD/MM/YYYY"
// // // // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // // // //                         required
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Rango Inicial (%)*</label>
// // // // // //                       <input
// // // // // //                         type="number"
// // // // // //                         name="rangoInicial"
// // // // // //                         value={formData.rangoInicial}
// // // // // //                         onChange={handleInputChange}
// // // // // //                         min="0"
// // // // // //                         max="100"
// // // // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // // // //                         required
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Rango Final (%)*</label>
// // // // // //                       <input
// // // // // //                         type="number"
// // // // // //                         name="rangoFinal"
// // // // // //                         value={formData.rangoFinal}
// // // // // //                         onChange={handleInputChange}
// // // // // //                         min="0"
// // // // // //                         max="100"
// // // // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // // // //                         required
// // // // // //                       />
// // // // // //                     </div>
// // // // // //                     <div>
// // // // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
// // // // // //                       <div className="flex items-center">
// // // // // //                         <label className="relative inline-flex items-center cursor-pointer">
// // // // // //                           <input
// // // // // //                             type="checkbox"
// // // // // //                             checked={formData.valoracion === "Aprueba"}
// // // // // //                             onChange={handleToggleValoracion}
// // // // // //                             className="sr-only peer"
// // // // // //                           />
// // // // // //                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
// // // // // //                           <span className="ml-3 text-sm font-medium text-gray-700">{formData.valoracion}</span>
// // // // // //                         </label>
// // // // // //                       </div>
// // // // // //                     </div>
// // // // // //                   </div>

// // // // // //                   <div className="mb-4">
// // // // // //                     <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
// // // // // //                     <textarea
// // // // // //                       name="descripcion"
// // // // // //                       value={formData.descripcion}
// // // // // //                       onChange={handleInputChange}
// // // // // //                       rows="3"
// // // // // //                       className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // // // //                       placeholder="Descripción de la escala de valoración..."
// // // // // //                     ></textarea>
// // // // // //                   </div>

// // // // // //                   <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4 mb-4">
// // // // // //                     <div className="text-center font-medium mb-2 text-sm">Visualización de la escala</div>

// // // // // //                     <div className="mb-2 text-sm text-center">
// // // // // //                       {formData.valoracion === "Aprueba"
// // // // // //                         ? `Aprueba a partir = ${formData.rangoInicial || 0}%`
// // // // // //                         : `Aprueba a partir = ${(formData.rangoFinal || 0) + 1}%`}
// // // // // //                     </div>

// // // // // //                     {formData.valoracion === "No aprueba" ? (
// // // // // //                       <>
// // // // // //                         <div className="flex items-center justify-between mb-1 text-sm">
// // // // // //                           <span>0%</span>
// // // // // //                           <span>{formData.rangoFinal || 0}% Deficiente</span>
// // // // // //                         </div>
// // // // // //                         <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // // // // //                           <div
// // // // // //                             className="bg-[#dc3545] h-5 rounded"
// // // // // //                             style={{ width: `${formData.rangoFinal || 0}%` }}
// // // // // //                           ></div>
// // // // // //                         </div>
// // // // // //                         <div className="flex items-center justify-between mb-1 text-sm">
// // // // // //                           <span>{(formData.rangoFinal || 0) + 1}%</span>
// // // // // //                           <span>100% Excelente</span>
// // // // // //                         </div>
// // // // // //                         <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // // // // //                           <div
// // // // // //                             className="bg-[#46ae69] h-5 rounded"
// // // // // //                             style={{
// // // // // //                               width: `${100 - ((formData.rangoFinal || 0) + 1)}%`,
// // // // // //                               marginLeft: `${(formData.rangoFinal || 0) + 1}%`,
// // // // // //                             }}
// // // // // //                           ></div>
// // // // // //                         </div>
// // // // // //                       </>
// // // // // //                     ) : (
// // // // // //                       <>
// // // // // //                         <div className="flex items-center justify-between mb-1 text-sm">
// // // // // //                           <span>0%</span>
// // // // // //                           <span>{(formData.rangoInicial || 0) - 1}% Deficiente</span>
// // // // // //                         </div>
// // // // // //                         <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // // // // //                           <div
// // // // // //                             className="bg-[#dc3545] h-5 rounded"
// // // // // //                             style={{ width: `${(formData.rangoInicial || 0) - 1}%` }}
// // // // // //                           ></div>
// // // // // //                         </div>
// // // // // //                         <div className="flex items-center justify-between mb-1 text-sm">
// // // // // //                           <span>{formData.rangoInicial || 0}%</span>
// // // // // //                           <span>100% Excelente</span>
// // // // // //                         </div>
// // // // // //                         <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // // // // //                           <div
// // // // // //                             className="bg-[#46ae69] h-5 rounded"
// // // // // //                             style={{
// // // // // //                               width: `${100 - (formData.rangoInicial || 0)}%`,
// // // // // //                               marginLeft: `${formData.rangoInicial || 0}%`,
// // // // // //                             }}
// // // // // //                           ></div>
// // // // // //                         </div>
// // // // // //                       </>
// // // // // //                     )}
// // // // // //                   </div>

// // // // // //                   <div className="flex justify-between px-4">
// // // // // //                     <button
// // // // // //                       type="button"
// // // // // //                       onClick={() => setIsEditModalOpen(false)}
// // // // // //                       className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
// // // // // //                     >
// // // // // //                       Cancelar
// // // // // //                     </button>
// // // // // //                     <button
// // // // // //                       type="submit"
// // // // // //                       className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
// // // // // //                     >
// // // // // //                       Guardar Cambios
// // // // // //                     </button>
// // // // // //                   </div>
// // // // // //                 </form>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         )}

// // // // // //         {/* Modal de confirmación para eliminar escala */}
// // // // // //         <ConfirmationModal
// // // // // //           isOpen={showDeleteConfirm}
// // // // // //           onClose={() => setShowDeleteConfirm(false)}
// // // // // //           onConfirm={confirmDeleteScale}
// // // // // //           title="Eliminar Escala"
// // // // // //           message="¿Está seguro que desea eliminar esta escala de valoración? Esta acción no se puede deshacer."
// // // // // //           confirmText="Eliminar"
// // // // // //           confirmColor="bg-[#f44144] hover:bg-red-600"
// // // // // //         />

// // // // // //         {/* Modal de éxito */}
// // // // // //         <ConfirmationModal
// // // // // //           isOpen={showSuccessModal}
// // // // // //           onConfirm={() => setShowSuccessModal(false)}
// // // // // //           title="Operación Exitosa"
// // // // // //           message={successMessage}
// // // // // //           confirmText="Aceptar"
// // // // // //           confirmColor="bg-green-500 hover:bg-green-600"
// // // // // //           showButtonCancel={false}
// // // // // //         />
// // // // // //       </div>

// // // // // //       {/* Modal de confirmación para cerrar sesión */}
// // // // // //       <ConfirmationModal
// // // // // //         isOpen={showLogoutConfirm}
// // // // // //         onClose={() => setShowLogoutConfirm(false)}
// // // // // //         onConfirm={handleLogout}
// // // // // //         title="Cerrar Sesión"
// // // // // //         message="¿Está seguro de que desea cerrar la sesión actual?"
// // // // // //         confirmText="Cerrar Sesión"
// // // // // //         confirmColor="bg-[#f44144] hover:bg-red-600"
// // // // // //       />
// // // // // //     </div>
// // // // // //   )
// // // // // // }

// // // // // // // Componente para el modal de detalle de escala
// // // // // // const ScaleDetailModal = ({ escala, isOpen, onClose }) => {
// // // // // //   const modalRef = useRef(null)

// // // // // //   useEffect(() => {
// // // // // //     const handleClickOutside = (event) => {
// // // // // //       if (modalRef.current && !modalRef.current.contains(event.target)) {
// // // // // //         onClose()
// // // // // //       }
// // // // // //     }

// // // // // //     if (isOpen) {
// // // // // //       document.addEventListener("mousedown", handleClickOutside)
// // // // // //     }

// // // // // //     return () => {
// // // // // //       document.removeEventListener("mousedown", handleClickOutside)
// // // // // //     }
// // // // // //   }, [isOpen, onClose])

// // // // // //   if (!isOpen || !escala) return null

// // // // // //   return (
// // // // // //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // // //       <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[80vh] overflow-y-auto">
// // // // // //         <div className="p-4">
// // // // // //           <h2 className="text-xl font-bold text-center text-[#1f384c] mb-4">DETALLE ESCALA DE VALORACIÓN</h2>

// // // // // //           <div className="grid grid-cols-2 gap-4 mb-6">
// // // // // //             <div className="flex">
// // // // // //               <div className="w-1/3 font-medium text-base">Fecha Inicial:</div>
// // // // // //               <div className="w-2/3 text-base text-gray-500">{escala.fechaInicial}</div>
// // // // // //             </div>

// // // // // //             <div className="flex">
// // // // // //               <div className="w-1/2 font-medium text-base">Fecha Final:</div>
// // // // // //               <div className="w-1/2 text-base text-gray-500">{escala.fechaFinal}</div>
// // // // // //             </div>

// // // // // //             <div className="flex">
// // // // // //               <div className="w-1/3 font-medium text-base">Rango Inicial:</div>
// // // // // //               <div className="w-2/3 text-base text-gray-500">{escala.rangoInicial}%</div>
// // // // // //             </div>

// // // // // //             <div className="flex">
// // // // // //               <div className="w-1/2 font-medium text-base">Rango Final:</div>
// // // // // //               <div className="w-1/2 text-base text-gray-500">{escala.rangoFinal}%</div>
// // // // // //             </div>

// // // // // //             <div className="flex">
// // // // // //               <div className="w-1/3 font-medium text-base">Valoración:</div>
// // // // // //               <div className="w-2/3 text-base text-gray-500">
// // // // // //                 <span
// // // // // //                   className={`px-2 py-1 rounded-full text-xs font-medium ${
// // // // // //                     escala.valoracion === "Aprueba" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// // // // // //                   }`}
// // // // // //                 >
// // // // // //                   {escala.valoracion}
// // // // // //                 </span>
// // // // // //               </div>
// // // // // //             </div>
// // // // // //           </div>

// // // // // //           <h3 className="text-lg font-medium mb-3">Descripción</h3>

// // // // // //           <div className="bg-gray-50 p-4 rounded-lg mb-6">
// // // // // //             <p className="text-gray-700 text-sm">{escala.descripcion}</p>
// // // // // //           </div>

// // // // // //           <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4 mb-6">
// // // // // //             <div className="text-center font-medium mb-2 text-sm">Visualización de la escala</div>

// // // // // //             <div className="mb-2 text-sm text-center">
// // // // // //               {escala.valoracion === "Aprueba"
// // // // // //                 ? `Aprueba a partir = ${escala.rangoInicial}%`
// // // // // //                 : `Aprueba a partir = ${escala.rangoFinal + 1}%`}
// // // // // //             </div>

// // // // // //             {escala.valoracion === "No aprueba" ? (
// // // // // //               <>
// // // // // //                 <div className="flex items-center justify-between mb-1 text-sm">
// // // // // //                   <span>0%</span>
// // // // // //                   <span>{escala.rangoFinal}% Deficiente</span>
// // // // // //                 </div>
// // // // // //                 <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // // // // //                   <div className="bg-[#dc3545] h-5 rounded" style={{ width: `${escala.rangoFinal}%` }}></div>
// // // // // //                 </div>
// // // // // //                 <div className="flex items-center justify-between mb-1 text-sm">
// // // // // //                   <span>{escala.rangoFinal + 1}%</span>
// // // // // //                   <span>100% Excelente</span>
// // // // // //                 </div>
// // // // // //                 <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // // // // //                   <div
// // // // // //                     className="bg-[#46ae69] h-5 rounded"
// // // // // //                     style={{ width: `${100 - (escala.rangoFinal + 1)}%`, marginLeft: `${escala.rangoFinal + 1}%` }}
// // // // // //                   ></div>
// // // // // //                 </div>
// // // // // //               </>
// // // // // //             ) : (
// // // // // //               <>
// // // // // //                 <div className="flex items-center justify-between mb-1 text-sm">
// // // // // //                   <span>0%</span>
// // // // // //                   <span>{escala.rangoInicial - 1}% Deficiente</span>
// // // // // //                 </div>
// // // // // //                 <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // // // // //                   <div className="bg-[#dc3545] h-5 rounded" style={{ width: `${escala.rangoInicial - 1}%` }}></div>
// // // // // //                 </div>
// // // // // //                 <div className="flex items-center justify-between mb-1 text-sm">
// // // // // //                   <span>{escala.rangoInicial}%</span>
// // // // // //                   <span>100% Excelente</span>
// // // // // //                 </div>
// // // // // //                 <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // // // // //                   <div
// // // // // //                     className="bg-[#46ae69] h-5 rounded"
// // // // // //                     style={{ width: `${100 - escala.rangoInicial}%`, marginLeft: `${escala.rangoInicial}%` }}
// // // // // //                   ></div>
// // // // // //                 </div>
// // // // // //               </>
// // // // // //             )}
// // // // // //           </div>

// // // // // //           <div className="flex justify-center">
// // // // // //             <button
// // // // // //               onClick={onClose}
// // // // // //               className="bg-[#f44144] text-white py-2 px-6 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
// // // // // //             >
// // // // // //               Cerrar
// // // // // //             </button>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     </div>
// // // // // //   )
// // // // // // }

// // // // // // export default Scale

// // // // "use client"

// // // // import { useState, useEffect, useRef } from "react"
// // // // import { ChevronDown } from "lucide-react"
// // // // import { useNavigate } from "react-router-dom"
// // // // import GenericTable from "../../../shared/components/Table"
// // // // import { useAuth } from "../../auth/hooks/useAuth"
// // // // import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// // // // // Datos de ejemplo
// // // // const escalasData = [
// // // //   {
// // // //     id: 1,
// // // //     fechaInicial: "20/10/2023",
// // // //     fechaFinal: "20/10/2026",
// // // //     rangoInicial: 1,
// // // //     rangoFinal: 69,
// // // //     valoracion: "No aprueba",
// // // //     concepto: "Deficiente",
// // // //   },
// // // //   {
// // // //     id: 2,
// // // //     fechaInicial: "20/10/2020",
// // // //     fechaFinal: "20/10/2026",
// // // //     rangoInicial: 70,
// // // //     rangoFinal: 90,
// // // //     valoracion: "Aprueba",
// // // //     concepto: "Aceptable",
// // // //   },
// // // //   {
// // // //     id: 3,
// // // //     fechaInicial: "20/10/2024",
// // // //     fechaFinal: "20/10/2026",
// // // //     rangoInicial: 70,
// // // //     rangoFinal: 80,
// // // //     valoracion: "No aprueba",
// // // //     concepto: "Bueno",
// // // //   },
// // // //   {
// // // //     id: 4,
// // // //     fechaInicial: "20/10/2021",
// // // //     fechaFinal: "20/10/2026",
// // // //     rangoInicial: 70,
// // // //     rangoFinal: 75,
// // // //     valoracion: "Aprueba",
// // // //     concepto: "Medio",
// // // //   },
// // // //   {
// // // //     id: 5,
// // // //     fechaInicial: "20/10/2022",
// // // //     fechaFinal: "20/10/2026",
// // // //     rangoInicial: 70,
// // // //     rangoFinal: 100,
// // // //     valoracion: "No aprueba",
// // // //     concepto: "Excelente",
// // // //   },
// // // //   {
// // // //     id: 6,
// // // //     fechaInicial: "20/03/2023",
// // // //     fechaFinal: "20/10/2026",
// // // //     rangoInicial: 70,
// // // //     rangoFinal: 85,
// // // //     valoracion: "No aprueba",
// // // //     concepto: "Bueno",
// // // //   },
// // // //   {
// // // //     id: 7,
// // // //     fechaInicial: "20/02/2022",
// // // //     fechaFinal: "20/10/2026",
// // // //     rangoInicial: 70,
// // // //     rangoFinal: 95,
// // // //     valoracion: "Aprueba",
// // // //     concepto: "Excelente",
// // // //   },
// // // // ]

// // // // const columns = [
// // // //   { key: "fechaInicial", label: "Fecha Inicial" },
// // // //   { key: "fechaFinal", label: "Fecha Final" },
// // // //   {
// // // //     key: "rangoAprobatorio",
// // // //     label: "Rango Aprobatorio",
// // // //     render: (item) => `${item.rangoInicial}%`,
// // // //   },
// // // // ]

// // // // const Scale = () => {
// // // //   const [selectedEscala, setSelectedEscala] = useState(null)
// // // //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
// // // //   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
// // // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
// // // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// // // //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// // // //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
// // // //   const [itemToDelete, setItemToDelete] = useState(null)
// // // //   const [successMessage, setSuccessMessage] = useState("")
// // // //   const [showSuccessModal, setShowSuccessModal] = useState(false)
// // // //   const [scales, setScales] = useState([...escalasData])
// // // //   const { logout } = useAuth()
// // // //   const navigate = useNavigate()
// // // //   const dropdownRef = useRef(null)

// // // //   // Formulario para crear/editar
// // // //   const [formData, setFormData] = useState({
// // // //     fechaInicial: "",
// // // //     fechaFinal: "",
// // // //     rangoInicial: "75",
// // // //     rangoFinal: "100",
// // // //     valoracion: "Aprueba",
// // // //     concepto: "Deficiente",
// // // //   })

// // // //   useEffect(() => {
// // // //     const handleClickOutside = (event) => {
// // // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// // // //         setIsDropdownOpen(false)
// // // //       }
// // // //     }

// // // //     document.addEventListener("mousedown", handleClickOutside)
// // // //     return () => document.removeEventListener("mousedown", handleClickOutside)
// // // //   }, [])

// // // //   const handleLogoutClick = () => {
// // // //     setIsDropdownOpen(false)
// // // //     setShowLogoutConfirm(true)
// // // //   }

// // // //   const handleLogout = () => {
// // // //     logout()
// // // //     navigate("/login")
// // // //   }

// // // //   const handleShowEscala = (escala) => {
// // // //     setSelectedEscala(escala)
// // // //     setIsDetailModalOpen(true)
// // // //   }

// // // //   const handleCloseDetailModal = () => {
// // // //     setIsDetailModalOpen(false)
// // // //   }

// // // //   const handleAddScale = () => {
// // // //     setFormData({
// // // //       fechaInicial: "",
// // // //       fechaFinal: "",
// // // //       rangoInicial: "75",
// // // //       rangoFinal: "100",
// // // //       valoracion: "Aprueba",
// // // //       concepto: "Deficiente",
// // // //     })
// // // //     setIsCreateModalOpen(true)
// // // //   }

// // // //   const handleEditScale = (scale) => {
// // // //     setSelectedEscala(scale)
// // // //     setFormData({
// // // //       fechaInicial: scale.fechaInicial,
// // // //       fechaFinal: scale.fechaFinal,
// // // //       rangoInicial: scale.rangoInicial.toString(),
// // // //       rangoFinal: scale.rangoFinal.toString(),
// // // //       valoracion: scale.valoracion,
// // // //       concepto: scale.concepto,
// // // //     })
// // // //     setIsEditModalOpen(true)
// // // //   }

// // // //   const handleDeleteScale = (id) => {
// // // //     setItemToDelete(id)
// // // //     setShowDeleteConfirm(true)
// // // //   }

// // // //   const confirmDeleteScale = () => {
// // // //     try {
// // // //       // Eliminar de la lista local
// // // //       const updatedScales = scales.filter((s) => s.id !== itemToDelete)
// // // //       setScales(updatedScales)

// // // //       // Mostrar mensaje de éxito
// // // //       setSuccessMessage("Escala eliminada exitosamente")
// // // //       setShowSuccessModal(true)
// // // //     } catch (error) {
// // // //       console.error("Error al eliminar la escala:", error)
// // // //       setSuccessMessage("Ocurrió un error al eliminar la escala")
// // // //       setShowSuccessModal(true)
// // // //     } finally {
// // // //       setShowDeleteConfirm(false)
// // // //       setItemToDelete(null)
// // // //     }
// // // //   }

// // // //   const handleInputChange = (e) => {
// // // //     const { name, value } = e.target
// // // //     setFormData({
// // // //       ...formData,
// // // //       [name]: value,
// // // //     })
// // // //   }

// // // //   const handleToggleValoracion = () => {
// // // //     setFormData({
// // // //       ...formData,
// // // //       valoracion: formData.valoracion === "Aprueba" ? "No aprueba" : "Aprueba",
// // // //     })
// // // //   }

// // // //   const handleCreateSubmit = (e) => {
// // // //     e.preventDefault()
// // // //     const newScale = {
// // // //       id: Math.max(...scales.map((s) => s.id)) + 1,
// // // //       ...formData,
// // // //       rangoInicial: Number.parseInt(formData.rangoInicial),
// // // //       rangoFinal: Number.parseInt(formData.rangoFinal),
// // // //     }
// // // //     setScales([...scales, newScale])
// // // //     setIsCreateModalOpen(false)
// // // //     setSuccessMessage("Escala creada exitosamente")
// // // //     setShowSuccessModal(true)
// // // //   }

// // // //   const handleEditSubmit = (e) => {
// // // //     e.preventDefault()
// // // //     const updatedScales = scales.map((scale) =>
// // // //       scale.id === selectedEscala.id
// // // //         ? {
// // // //             ...scale,
// // // //             ...formData,
// // // //             rangoInicial: Number.parseInt(formData.rangoInicial),
// // // //             rangoFinal: Number.parseInt(formData.rangoFinal),
// // // //           }
// // // //         : scale,
// // // //     )
// // // //     setScales(updatedScales)
// // // //     setIsEditModalOpen(false)
// // // //     setSuccessMessage("Escala actualizada exitosamente")
// // // //     setShowSuccessModal(true)
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen">
// // // //       <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
// // // //         <div className="container mx-auto flex justify-between items-center">
// // // //           <h1 className="text-2xl font-bold text-[#1f384c]">ESCALA DE VALORACIÓN</h1>
// // // //           <div className="relative" ref={dropdownRef}>
// // // //             <button
// // // //               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
// // // //               className="flex items-center gap-2 text-[#1f384c] font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
// // // //             >
// // // //               <span>Administrador</span>
// // // //               <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
// // // //             </button>

// // // //             {isDropdownOpen && (
// // // //               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
// // // //                 <button
// // // //                   onClick={handleLogoutClick}
// // // //                   className="w-full text-left px-4 py-2 text-[#f44144] hover:bg-gray-50 rounded-lg"
// // // //                 >
// // // //                   Cerrar Sesión
// // // //                 </button>
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         </div>
// // // //       </header>

// // // //       <div className="container mx-auto px-6">
// // // //         <GenericTable
// // // //           data={scales}
// // // //           columns={columns}
// // // //           onShow={handleShowEscala}
// // // //           onAdd={handleAddScale}
// // // //           onEdit={handleEditScale}
// // // //           onDelete={handleDeleteScale}
// // // //           showActions={{ show: true, edit: true, delete: true, add: true }}
// // // //         />

// // // //         {/* Modal para añadir escala */}
// // // //         {isCreateModalOpen && (
// // // //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // //             <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
// // // //               <div className="p-6">
// // // //                 <h2 className="text-xl font-bold text-[#1f384c] mb-6">Añadir Métrica de Valoración:</h2>

// // // //                 <form onSubmit={handleCreateSubmit}>
// // // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial*</label>
// // // //                       <input
// // // //                         type="text"
// // // //                         name="fechaInicial"
// // // //                         value={formData.fechaInicial}
// // // //                         onChange={handleInputChange}
// // // //                         placeholder="DD/MM/YYYY"
// // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // //                         required
// // // //                       />
// // // //                     </div>
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final*</label>
// // // //                       <input
// // // //                         type="text"
// // // //                         name="fechaFinal"
// // // //                         value={formData.fechaFinal}
// // // //                         onChange={handleInputChange}
// // // //                         placeholder="DD/MM/YYYY"
// // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // //                         required
// // // //                       />
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="mb-4">
// // // //                     <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
// // // //                     <div className="flex items-center">
// // // //                       <label className="relative inline-flex items-center cursor-pointer">
// // // //                         <input
// // // //                           type="checkbox"
// // // //                           checked={formData.valoracion === "Aprueba"}
// // // //                           onChange={handleToggleValoracion}
// // // //                           className="sr-only peer"
// // // //                         />
// // // //                         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
// // // //                         <span className="ml-3 text-sm font-medium text-gray-700">{formData.valoracion}</span>
// // // //                       </label>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Rango Inicial (%)*</label>
// // // //                       <input
// // // //                         type="number"
// // // //                         name="rangoInicial"
// // // //                         value={formData.rangoInicial}
// // // //                         onChange={handleInputChange}
// // // //                         min="0"
// // // //                         max="100"
// // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // //                         required
// // // //                       />
// // // //                     </div>
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Rango Final (%)*</label>
// // // //                       <input
// // // //                         type="number"
// // // //                         name="rangoFinal"
// // // //                         value={formData.rangoFinal}
// // // //                         onChange={handleInputChange}
// // // //                         min="0"
// // // //                         max="100"
// // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // //                         required
// // // //                       />
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="mb-4">
// // // //                     <label className="block text-sm font-medium text-gray-700 mb-1">Concepto*</label>
// // // //                     <input
// // // //                       type="text"
// // // //                       name="concepto"
// // // //                       value={formData.concepto}
// // // //                       onChange={handleInputChange}
// // // //                       className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // //                       required
// // // //                     />
// // // //                   </div>

// // // //                   <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4 mb-4">
// // // //                     <div className="text-center font-medium mb-2 text-sm">
// // // //                       Aprueba a partir ={" "}
// // // //                       {formData.valoracion === "Aprueba"
// // // //                         ? formData.rangoInicial
// // // //                         : Number.parseInt(formData.rangoFinal) + 1}
// // // //                       %
// // // //                     </div>

// // // //                     <div className="space-y-2">
// // // //                       <div className="flex items-center">
// // // //                         <span className="w-8 text-xs text-right pr-2">0</span>
// // // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // // //                           <div className="absolute -top-1.5 left-[40%] h-4 w-0.5 bg-gray-400"></div>
// // // //                         </div>
// // // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // // //                           40% No cumple <span className="ml-1 text-red-500">🗑</span>
// // // //                         </span>
// // // //                       </div>

// // // //                       <div className="flex items-center">
// // // //                         <span className="w-8 text-xs text-right pr-2">40%</span>
// // // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // // //                           <div className="absolute -top-1.5 left-[60%] h-4 w-0.5 bg-gray-400"></div>
// // // //                         </div>
// // // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // // //                           60% Deficiente <span className="ml-1 text-red-500">🗑</span>
// // // //                         </span>
// // // //                       </div>

// // // //                       <div className="flex items-center">
// // // //                         <span className="w-8 text-xs text-right pr-2">60%</span>
// // // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // // //                           <div className="absolute -top-1.5 left-[75%] h-4 w-0.5 bg-gray-400"></div>
// // // //                         </div>
// // // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // // //                           75% Medio: Bueno <span className="ml-1 text-red-500">🗑</span>
// // // //                         </span>
// // // //                       </div>

// // // //                       <div className="flex items-center">
// // // //                         <span className="w-8 text-xs text-right pr-2">75%</span>
// // // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // // //                           <div className="absolute -top-1.5 left-[80%] h-4 w-0.5 bg-gray-400"></div>
// // // //                         </div>
// // // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // // //                           80% Bueno <span className="ml-1 text-red-500">🗑</span>
// // // //                         </span>
// // // //                       </div>

// // // //                       <div className="flex items-center">
// // // //                         <span className="w-8 text-xs text-right pr-2">80%</span>
// // // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // // //                           <div className="absolute -top-1.5 left-[100%] h-4 w-0.5 bg-gray-400"></div>
// // // //                         </div>
// // // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // // //                           100% Excelente <span className="ml-1 text-red-500">🗑</span>
// // // //                         </span>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="flex justify-between">
// // // //                     <button
// // // //                       type="button"
// // // //                       onClick={() => setIsCreateModalOpen(false)}
// // // //                       className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
// // // //                     >
// // // //                       Cancelar
// // // //                     </button>
// // // //                     <button
// // // //                       type="submit"
// // // //                       className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
// // // //                     >
// // // //                       Añadir
// // // //                     </button>
// // // //                   </div>
// // // //                 </form>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Modal para editar escala */}
// // // //         {isEditModalOpen && selectedEscala && (
// // // //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // //             <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
// // // //               <div className="p-6">
// // // //                 <h2 className="text-xl font-bold text-[#1f384c] mb-6">Editar Métrica de Valoración:</h2>

// // // //                 <form onSubmit={handleEditSubmit}>
// // // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial*</label>
// // // //                       <input
// // // //                         type="text"
// // // //                         name="fechaInicial"
// // // //                         value={formData.fechaInicial}
// // // //                         onChange={handleInputChange}
// // // //                         placeholder="DD/MM/YYYY"
// // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // //                         required
// // // //                       />
// // // //                     </div>
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final*</label>
// // // //                       <input
// // // //                         type="text"
// // // //                         name="fechaFinal"
// // // //                         value={formData.fechaFinal}
// // // //                         onChange={handleInputChange}
// // // //                         placeholder="DD/MM/YYYY"
// // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // //                         required
// // // //                       />
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="mb-4">
// // // //                     <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
// // // //                     <div className="flex items-center">
// // // //                       <label className="relative inline-flex items-center cursor-pointer">
// // // //                         <input
// // // //                           type="checkbox"
// // // //                           checked={formData.valoracion === "Aprueba"}
// // // //                           onChange={handleToggleValoracion}
// // // //                           className="sr-only peer"
// // // //                         />
// // // //                         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
// // // //                         <span className="ml-3 text-sm font-medium text-gray-700">{formData.valoracion}</span>
// // // //                       </label>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Rango Inicial (%)*</label>
// // // //                       <input
// // // //                         type="number"
// // // //                         name="rangoInicial"
// // // //                         value={formData.rangoInicial}
// // // //                         onChange={handleInputChange}
// // // //                         min="0"
// // // //                         max="100"
// // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // //                         required
// // // //                       />
// // // //                     </div>
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Rango Final (%)*</label>
// // // //                       <input
// // // //                         type="number"
// // // //                         name="rangoFinal"
// // // //                         value={formData.rangoFinal}
// // // //                         onChange={handleInputChange}
// // // //                         min="0"
// // // //                         max="100"
// // // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // //                         required
// // // //                       />
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="mb-4">
// // // //                     <label className="block text-sm font-medium text-gray-700 mb-1">Concepto*</label>
// // // //                     <input
// // // //                       type="text"
// // // //                       name="concepto"
// // // //                       value={formData.concepto}
// // // //                       onChange={handleInputChange}
// // // //                       className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // // //                       required
// // // //                     />
// // // //                   </div>

// // // //                   <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4 mb-4">
// // // //                     <div className="text-center font-medium mb-2 text-sm">
// // // //                       Aprueba a partir ={" "}
// // // //                       {formData.valoracion === "Aprueba"
// // // //                         ? formData.rangoInicial
// // // //                         : Number.parseInt(formData.rangoFinal) + 1}
// // // //                       %
// // // //                     </div>

// // // //                     <div className="space-y-2">
// // // //                       <div className="flex items-center">
// // // //                         <span className="w-8 text-xs text-right pr-2">0</span>
// // // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // // //                           <div className="absolute -top-1.5 left-[40%] h-4 w-0.5 bg-gray-400"></div>
// // // //                         </div>
// // // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // // //                           40% No cumple <span className="ml-1 text-red-500">🗑</span>
// // // //                         </span>
// // // //                       </div>

// // // //                       <div className="flex items-center">
// // // //                         <span className="w-8 text-xs text-right pr-2">40%</span>
// // // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // // //                           <div className="absolute -top-1.5 left-[60%] h-4 w-0.5 bg-gray-400"></div>
// // // //                         </div>
// // // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // // //                           60% Deficiente <span className="ml-1 text-red-500">🗑</span>
// // // //                         </span>
// // // //                       </div>

// // // //                       <div className="flex items-center">
// // // //                         <span className="w-8 text-xs text-right pr-2">60%</span>
// // // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // // //                           <div className="absolute -top-1.5 left-[75%] h-4 w-0.5 bg-gray-400"></div>
// // // //                         </div>
// // // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // // //                           75% Medio: Bueno <span className="ml-1 text-red-500">🗑</span>
// // // //                         </span>
// // // //                       </div>

// // // //                       <div className="flex items-center">
// // // //                         <span className="w-8 text-xs text-right pr-2">75%</span>
// // // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // // //                           <div className="absolute -top-1.5 left-[80%] h-4 w-0.5 bg-gray-400"></div>
// // // //                         </div>
// // // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // // //                           80% Bueno <span className="ml-1 text-red-500">🗑</span>
// // // //                         </span>
// // // //                       </div>

// // // //                       <div className="flex items-center">
// // // //                         <span className="w-8 text-xs text-right pr-2">80%</span>
// // // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // // //                           <div className="absolute -top-1.5 left-[100%] h-4 w-0.5 bg-gray-400"></div>
// // // //                         </div>
// // // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // // //                           100% Excelente <span className="ml-1 text-red-500">🗑</span>
// // // //                         </span>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div className="flex justify-between">
// // // //                     <button
// // // //                       type="button"
// // // //                       onClick={() => setIsEditModalOpen(false)}
// // // //                       className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
// // // //                     >
// // // //                       Cancelar
// // // //                     </button>
// // // //                     <button
// // // //                       type="submit"
// // // //                       className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
// // // //                     >
// // // //                       Guardar
// // // //                     </button>
// // // //                   </div>
// // // //                 </form>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Modal de detalle */}
// // // //         {isDetailModalOpen && selectedEscala && (
// // // //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // //             <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">
// // // //               <div className="p-6">
// // // //                 <h2 className="text-xl font-bold text-center text-[#1f384c] mb-6">DETALLE ESCALA DE VALORACIÓN</h2>

// // // //                 <div className="grid grid-cols-2 gap-6 mb-6">
// // // //                   <div>
// // // //                     <div className="font-medium text-base mb-1">Fecha Inicial:</div>
// // // //                     <div className="text-base text-gray-700 bg-gray-50 p-2 rounded">{selectedEscala.fechaInicial}</div>
// // // //                   </div>

// // // //                   <div>
// // // //                     <div className="font-medium text-base mb-1">Fecha Final:</div>
// // // //                     <div className="text-base text-gray-700 bg-gray-50 p-2 rounded">{selectedEscala.fechaFinal}</div>
// // // //                   </div>

// // // //                   <div>
// // // //                     <div className="font-medium text-base mb-1">Rango Inicial:</div>
// // // //                     <div className="text-base text-gray-700 bg-gray-50 p-2 rounded">{selectedEscala.rangoInicial}%</div>
// // // //                   </div>

// // // //                   <div>
// // // //                     <div className="font-medium text-base mb-1">Rango Final:</div>
// // // //                     <div className="text-base text-gray-700 bg-gray-50 p-2 rounded">{selectedEscala.rangoFinal}%</div>
// // // //                   </div>

// // // //                   <div>
// // // //                     <div className="font-medium text-base mb-1">Valoración:</div>
// // // //                     <div className="text-base text-gray-700 bg-gray-50 p-2 rounded">
// // // //                       <span
// // // //                         className={`px-2 py-1 rounded-full text-xs font-medium ${
// // // //                           selectedEscala.valoracion === "Aprueba"
// // // //                             ? "bg-green-100 text-green-800"
// // // //                             : "bg-red-100 text-red-800"
// // // //                         }`}
// // // //                       >
// // // //                         {selectedEscala.valoracion}
// // // //                       </span>
// // // //                     </div>
// // // //                   </div>

// // // //                   <div>
// // // //                     <div className="font-medium text-base mb-1">Concepto:</div>
// // // //                     <div className="text-base text-gray-700 bg-gray-50 p-2 rounded">{selectedEscala.concepto}</div>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4 mb-6">
// // // //                   <div className="text-center font-medium mb-4 text-sm">
// // // //                     Aprueba a partir ={" "}
// // // //                     {selectedEscala.valoracion === "Aprueba"
// // // //                       ? selectedEscala.rangoInicial
// // // //                       : selectedEscala.rangoFinal + 1}
// // // //                     %
// // // //                   </div>

// // // //                   {selectedEscala.valoracion === "No aprueba" ? (
// // // //                     <>
// // // //                       <div className="flex items-center justify-between mb-1 text-sm">
// // // //                         <span>0%</span>
// // // //                         <span>{selectedEscala.rangoFinal}% Deficiente</span>
// // // //                       </div>
// // // //                       <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // // //                         <div
// // // //                           className="bg-[#dc3545] h-5 rounded"
// // // //                           style={{ width: `${selectedEscala.rangoFinal}%` }}
// // // //                         ></div>
// // // //                       </div>
// // // //                       <div className="flex items-center justify-between mb-1 text-sm">
// // // //                         <span>{selectedEscala.rangoFinal + 1}%</span>
// // // //                         <span>100% Excelente</span>
// // // //                       </div>
// // // //                       <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // // //                         <div
// // // //                           className="bg-[#46ae69] h-5 rounded"
// // // //                           style={{
// // // //                             width: `${100 - (selectedEscala.rangoFinal + 1)}%`,
// // // //                             marginLeft: `${selectedEscala.rangoFinal + 1}%`,
// // // //                           }}
// // // //                         ></div>
// // // //                       </div>
// // // //                     </>
// // // //                   ) : (
// // // //                     <>
// // // //                       <div className="flex items-center justify-between mb-1 text-sm">
// // // //                         <span>0%</span>
// // // //                         <span>{selectedEscala.rangoInicial - 1}% Deficiente</span>
// // // //                       </div>
// // // //                       <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // // //                         <div
// // // //                           className="bg-[#dc3545] h-5 rounded"
// // // //                           style={{ width: `${selectedEscala.rangoInicial - 1}%` }}
// // // //                         ></div>
// // // //                       </div>
// // // //                       <div className="flex items-center justify-between mb-1 text-sm">
// // // //                         <span>{selectedEscala.rangoInicial}%</span>
// // // //                         <span>100% Excelente</span>
// // // //                       </div>
// // // //                       <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // // //                         <div
// // // //                           className="bg-[#46ae69] h-5 rounded"
// // // //                           style={{
// // // //                             width: `${100 - selectedEscala.rangoInicial}%`,
// // // //                             marginLeft: `${selectedEscala.rangoInicial}%`,
// // // //                           }}
// // // //                         ></div>
// // // //                       </div>
// // // //                     </>
// // // //                   )}
// // // //                 </div>

// // // //                 <div className="flex justify-center">
// // // //                   <button
// // // //                     onClick={handleCloseDetailModal}
// // // //                     className="bg-[#f44144] text-white py-2 px-6 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
// // // //                   >
// // // //                     Cerrar
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Modal de confirmación para eliminar escala */}
// // // //         <ConfirmationModal
// // // //           isOpen={showDeleteConfirm}
// // // //           onClose={() => setShowDeleteConfirm(false)}
// // // //           onConfirm={confirmDeleteScale}
// // // //           title="Eliminar Escala"
// // // //           message="¿Está seguro que desea eliminar esta escala de valoración? Esta acción no se puede deshacer."
// // // //           confirmText="Eliminar"
// // // //           confirmColor="bg-[#f44144] hover:bg-red-600"
// // // //         />

// // // //         {/* Modal de éxito */}
// // // //         <ConfirmationModal
// // // //           isOpen={showSuccessModal}
// // // //           onConfirm={() => setShowSuccessModal(false)}
// // // //           title="Operación Exitosa"
// // // //           message={successMessage}
// // // //           confirmText="Aceptar"
// // // //           confirmColor="bg-green-500 hover:bg-green-600"
// // // //           showButtonCancel={false}
// // // //         />
// // // //       </div>

// // // //       {/* Modal de confirmación para cerrar sesión */}
// // // //       <ConfirmationModal
// // // //         isOpen={showLogoutConfirm}
// // // //         onClose={() => setShowLogoutConfirm(false)}
// // // //         onConfirm={handleLogout}
// // // //         title="Cerrar Sesión"
// // // //         message="¿Está seguro de que desea cerrar la sesión actual?"
// // // //         confirmText="Cerrar Sesión"
// // // //         confirmColor="bg-[#f44144] hover:bg-red-600"
// // // //       />
// // // //     </div>
// // // //   )
// // // // }

// // // // export default Scale
// // // "use client"

// // // import { useState, useEffect, useRef } from "react"
// // // import { ChevronDown } from "lucide-react"
// // // import { useNavigate } from "react-router-dom"
// // // import { useAuth } from "../../auth/hooks/useAuth"
// // // import ConfirmationModal from "../../../shared/components/ConfirmationModal"
// // // import GenericTable from "../../../shared/components/Table"

// // // // Datos de ejemplo
// // // const escalasData = [
// // //   {
// // //     id: 1,
// // //     fechaInicial: "20/10/2023",
// // //     fechaFinal: "20/10/2026",
// // //     rangoInicial: 1,
// // //     rangoFinal: 69,
// // //     valoracion: "No aprueba",
// // //     concepto: "Deficiente",
// // //   },
// // //   {
// // //     id: 2,
// // //     fechaInicial: "20/10/2020",
// // //     fechaFinal: "20/10/2026",
// // //     rangoInicial: 70,
// // //     rangoFinal: 90,
// // //     valoracion: "Aprueba",
// // //     concepto: "Aceptable",
// // //   },
// // //   {
// // //     id: 3,
// // //     fechaInicial: "20/10/2024",
// // //     fechaFinal: "20/10/2026",
// // //     rangoInicial: 70,
// // //     rangoFinal: 80,
// // //     valoracion: "No aprueba",
// // //     concepto: "Bueno",
// // //   },
// // //   {
// // //     id: 4,
// // //     fechaInicial: "20/10/2021",
// // //     fechaFinal: "20/10/2026",
// // //     rangoInicial: 70,
// // //     rangoFinal: 75,
// // //     valoracion: "Aprueba",
// // //     concepto: "Medio",
// // //   },
// // //   {
// // //     id: 5,
// // //     fechaInicial: "20/10/2022",
// // //     fechaFinal: "20/10/2026",
// // //     rangoInicial: 70,
// // //     rangoFinal: 100,
// // //     valoracion: "No aprueba",
// // //     concepto: "Excelente",
// // //   },
// // //   {
// // //     id: 6,
// // //     fechaInicial: "20/03/2023",
// // //     fechaFinal: "20/10/2026",
// // //     rangoInicial: 70,
// // //     rangoFinal: 85,
// // //     valoracion: "No aprueba",
// // //     concepto: "Bueno",
// // //   },
// // //   {
// // //     id: 7,
// // //     fechaInicial: "20/02/2022",
// // //     fechaFinal: "20/10/2026",
// // //     rangoInicial: 70,
// // //     rangoFinal: 95,
// // //     valoracion: "Aprueba",
// // //     concepto: "Excelente",
// // //   },
// // // ]

// // // const columns = [
// // //   { key: "fechaInicial", label: "Fecha Inicial" },
// // //   { key: "fechaFinal", label: "Fecha Final" },
// // //   {
// // //     key: "rangoAprobatorio",
// // //     label: "Rango Aprobatorio",
// // //     render: (item) => `${item.rangoInicial}% - ${item.rangoFinal}%`,
// // //   },
// // // ]

// // // const Scale = () => {
// // //   const [selectedEscala, setSelectedEscala] = useState(null)
// // //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
// // //   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
// // //   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
// // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// // //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// // //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
// // //   const [itemToDelete, setItemToDelete] = useState(null)
// // //   const [successMessage, setSuccessMessage] = useState("")
// // //   const [showSuccessModal, setShowSuccessModal] = useState(false)
// // //   const [scales, setScales] = useState([...escalasData])
// // //   const { logout } = useAuth()
// // //   const navigate = useNavigate()
// // //   const dropdownRef = useRef(null)

// // //   // Formulario para crear/editar
// // //   const [formData, setFormData] = useState({
// // //     fechaInicial: "",
// // //     fechaFinal: "",
// // //     rangoInicial: "75",
// // //     rangoFinal: "100",
// // //     valoracion: "Aprueba",
// // //     concepto: "Deficiente",
// // //   })

// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// // //         setIsDropdownOpen(false)
// // //       }
// // //     }

// // //     document.addEventListener("mousedown", handleClickOutside)
// // //     return () => document.removeEventListener("mousedown", handleClickOutside)
// // //   }, [])

// // //   const handleLogoutClick = () => {
// // //     setIsDropdownOpen(false)
// // //     setShowLogoutConfirm(true)
// // //   }

// // //   const handleLogout = () => {
// // //     logout()
// // //     navigate("/login")
// // //   }

// // //   const handleShowEscala = (escala) => {
// // //     setSelectedEscala(escala)
// // //     setIsDetailModalOpen(true)
// // //   }

// // //   const handleCloseDetailModal = () => {
// // //     setIsDetailModalOpen(false)
// // //   }

// // //   const handleAddScale = () => {
// // //     setFormData({
// // //       fechaInicial: "",
// // //       fechaFinal: "",
// // //       rangoInicial: "75",
// // //       rangoFinal: "100",
// // //       valoracion: "Aprueba",
// // //       concepto: "Deficiente",
// // //     })
// // //     setIsCreateModalOpen(true)
// // //   }

// // //   const handleEditScale = (scale) => {
// // //     setSelectedEscala(scale)
// // //     setFormData({
// // //       fechaInicial: scale.fechaInicial,
// // //       fechaFinal: scale.fechaFinal,
// // //       rangoInicial: scale.rangoInicial.toString(),
// // //       rangoFinal: scale.rangoFinal.toString(),
// // //       valoracion: scale.valoracion,
// // //       concepto: scale.concepto,
// // //     })
// // //     setIsEditModalOpen(true)
// // //   }

// // //   const handleDeleteScale = (id) => {
// // //     setItemToDelete(id)
// // //     setShowDeleteConfirm(true)
// // //   }

// // //   const confirmDeleteScale = () => {
// // //     try {
// // //       // Eliminar de la lista local
// // //       const updatedScales = scales.filter((s) => s.id !== itemToDelete)
// // //       setScales(updatedScales)

// // //       // Mostrar mensaje de éxito
// // //       setSuccessMessage("Escala eliminada exitosamente")
// // //       setShowSuccessModal(true)
// // //     } catch (error) {
// // //       console.error("Error al eliminar la escala:", error)
// // //       setSuccessMessage("Ocurrió un error al eliminar la escala")
// // //       setShowSuccessModal(true)
// // //     } finally {
// // //       setShowDeleteConfirm(false)
// // //       setItemToDelete(null)
// // //     }
// // //   }

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target
// // //     setFormData({
// // //       ...formData,
// // //       [name]: value,
// // //     })
// // //   }

// // //   const handleToggleValoracion = () => {
// // //     setFormData({
// // //       ...formData,
// // //       valoracion: formData.valoracion === "Aprueba" ? "No aprueba" : "Aprueba",
// // //     })
// // //   }

// // //   const handleCreateSubmit = (e) => {
// // //     e.preventDefault()
// // //     const newScale = {
// // //       id: Math.max(...scales.map((s) => s.id)) + 1,
// // //       ...formData,
// // //       rangoInicial: Number.parseInt(formData.rangoInicial),
// // //       rangoFinal: Number.parseInt(formData.rangoFinal),
// // //     }
// // //     setScales([...scales, newScale])
// // //     setIsCreateModalOpen(false)
// // //     setSuccessMessage("Escala creada exitosamente")
// // //     setShowSuccessModal(true)
// // //   }

// // //   const handleEditSubmit = (e) => {
// // //     e.preventDefault()
// // //     const updatedScales = scales.map((scale) =>
// // //       scale.id === selectedEscala.id
// // //         ? {
// // //             ...scale,
// // //             ...formData,
// // //             rangoInicial: Number.parseInt(formData.rangoInicial),
// // //             rangoFinal: Number.parseInt(formData.rangoFinal),
// // //           }
// // //         : scale,
// // //     )
// // //     setScales(updatedScales)
// // //     setIsEditModalOpen(false)
// // //     setSuccessMessage("Escala actualizada exitosamente")
// // //     setShowSuccessModal(true)
// // //   }

// // //   return (
// // //     <div className="min-h-screen">
// // //       <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
// // //         <div className="container mx-auto flex justify-between items-center">
// // //           <h1 className="text-2xl font-bold text-[#1f384c]">ESCALA DE VALORACIÓN</h1>
// // //           <div className="relative" ref={dropdownRef}>
// // //             <button
// // //               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
// // //               className="flex items-center gap-2 text-[#1f384c] font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
// // //             >
// // //               <span>Administrador</span>
// // //               <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
// // //             </button>

// // //             {isDropdownOpen && (
// // //               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
// // //                 <button
// // //                   onClick={handleLogoutClick}
// // //                   className="w-full text-left px-4 py-2 text-[#f44144] hover:bg-gray-50 rounded-lg"
// // //                 >
// // //                   Cerrar Sesión
// // //                 </button>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <div className="container mx-auto px-6">
// // //         <GenericTable
// // //           data={scales}
// // //           columns={columns}
// // //           onShow={handleShowEscala}
// // //           onAdd={handleAddScale}
// // //           onEdit={handleEditScale}
// // //           onDelete={handleDeleteScale}
// // //           showActions={{ show: true, edit: true, delete: true, add: true }}
// // //         />

// // //         {/* Modal para añadir escala */}
// // //         {isCreateModalOpen && (
// // //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //             <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
// // //               <div className="p-6">
// // //                 <h2 className="text-xl font-bold text-[#1f384c] mb-6">Añadir Métrica de Valoración:</h2>

// // //                 <form onSubmit={handleCreateSubmit}>
// // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial*</label>
// // //                       <input
// // //                         type="text"
// // //                         name="fechaInicial"
// // //                         value={formData.fechaInicial}
// // //                         onChange={handleInputChange}
// // //                         placeholder="DD/MM/YYYY"
// // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // //                         required
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final*</label>
// // //                       <input
// // //                         type="text"
// // //                         name="fechaFinal"
// // //                         value={formData.fechaFinal}
// // //                         onChange={handleInputChange}
// // //                         placeholder="DD/MM/YYYY"
// // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // //                         required
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   <div className="mb-4">
// // //                     <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
// // //                     <div className="flex items-center">
// // //                       <label className="relative inline-flex items-center cursor-pointer">
// // //                         <input
// // //                           type="checkbox"
// // //                           checked={formData.valoracion === "Aprueba"}
// // //                           onChange={handleToggleValoracion}
// // //                           className="sr-only peer"
// // //                         />
// // //                         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
// // //                         <span className="ml-3 text-sm font-medium text-gray-700">{formData.valoracion}</span>
// // //                       </label>
// // //                     </div>
// // //                   </div>

// // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Rango Inicial (%)*</label>
// // //                       <input
// // //                         type="number"
// // //                         name="rangoInicial"
// // //                         value={formData.rangoInicial}
// // //                         onChange={handleInputChange}
// // //                         min="0"
// // //                         max="100"
// // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // //                         required
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Rango Final (%)*</label>
// // //                       <input
// // //                         type="number"
// // //                         name="rangoFinal"
// // //                         value={formData.rangoFinal}
// // //                         onChange={handleInputChange}
// // //                         min="0"
// // //                         max="100"
// // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // //                         required
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   <div className="mb-4">
// // //                     <label className="block text-sm font-medium text-gray-700 mb-1">Concepto*</label>
// // //                     <input
// // //                       type="text"
// // //                       name="concepto"
// // //                       value={formData.concepto}
// // //                       onChange={handleInputChange}
// // //                       className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // //                       required
// // //                     />
// // //                   </div>

// // //                   <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4 mb-4">
// // //                     <div className="text-center font-medium mb-2 text-sm">
// // //                       Aprueba a partir ={" "}
// // //                       {formData.valoracion === "Aprueba"
// // //                         ? formData.rangoInicial
// // //                         : Number.parseInt(formData.rangoFinal) + 1}
// // //                       %
// // //                     </div>

// // //                     <div className="space-y-2">
// // //                       <div className="flex items-center">
// // //                         <span className="w-8 text-xs text-right pr-2">0</span>
// // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // //                           <div className="absolute -top-1.5 left-[40%] h-4 w-0.5 bg-gray-400"></div>
// // //                         </div>
// // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // //                           40% No cumple <span className="ml-1 text-red-500">🗑</span>
// // //                         </span>
// // //                       </div>

// // //                       <div className="flex items-center">
// // //                         <span className="w-8 text-xs text-right pr-2">40%</span>
// // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // //                           <div className="absolute -top-1.5 left-[60%] h-4 w-0.5 bg-gray-400"></div>
// // //                         </div>
// // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // //                           60% Deficiente <span className="ml-1 text-red-500">🗑</span>
// // //                         </span>
// // //                       </div>

// // //                       <div className="flex items-center">
// // //                         <span className="w-8 text-xs text-right pr-2">60%</span>
// // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // //                           <div className="absolute -top-1.5 left-[75%] h-4 w-0.5 bg-gray-400"></div>
// // //                         </div>
// // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // //                           75% Medio: Bueno <span className="ml-1 text-red-500">🗑</span>
// // //                         </span>
// // //                       </div>

// // //                       <div className="flex items-center">
// // //                         <span className="w-8 text-xs text-right pr-2">75%</span>
// // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // //                           <div className="absolute -top-1.5 left-[80%] h-4 w-0.5 bg-gray-400"></div>
// // //                         </div>
// // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // //                           80% Bueno <span className="ml-1 text-red-500">🗑</span>
// // //                         </span>
// // //                       </div>

// // //                       <div className="flex items-center">
// // //                         <span className="w-8 text-xs text-right pr-2">80%</span>
// // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // //                           <div className="absolute -top-1.5 left-[100%] h-4 w-0.5 bg-gray-400"></div>
// // //                         </div>
// // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // //                           100% Excelente <span className="ml-1 text-red-500">🗑</span>
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex justify-between">
// // //                     <button
// // //                       type="button"
// // //                       onClick={() => setIsCreateModalOpen(false)}
// // //                       className="px-6 py-2 bg-[#f44144] text-white rounded-md hover:bg-red-600 text-sm"
// // //                     >
// // //                       Cancelar
// // //                     </button>
// // //                     <button
// // //                       type="submit"
// // //                       className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
// // //                     >
// // //                       Añadir
// // //                     </button>
// // //                   </div>
// // //                 </form>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Modal para editar escala */}
// // //         {isEditModalOpen && selectedEscala && (
// // //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //             <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
// // //               <div className="p-6">
// // //                 <h2 className="text-xl font-bold text-[#1f384c] mb-6">Editar Métrica de Valoración:</h2>

// // //                 <form onSubmit={handleEditSubmit}>
// // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial*</label>
// // //                       <input
// // //                         type="text"
// // //                         name="fechaInicial"
// // //                         value={formData.fechaInicial}
// // //                         onChange={handleInputChange}
// // //                         placeholder="DD/MM/YYYY"
// // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // //                         required
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final*</label>
// // //                       <input
// // //                         type="text"
// // //                         name="fechaFinal"
// // //                         value={formData.fechaFinal}
// // //                         onChange={handleInputChange}
// // //                         placeholder="DD/MM/YYYY"
// // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // //                         required
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   <div className="mb-4">
// // //                     <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
// // //                     <div className="flex items-center">
// // //                       <label className="relative inline-flex items-center cursor-pointer">
// // //                         <input
// // //                           type="checkbox"
// // //                           checked={formData.valoracion === "Aprueba"}
// // //                           onChange={handleToggleValoracion}
// // //                           className="sr-only peer"
// // //                         />
// // //                         <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
// // //                         <span className="ml-3 text-sm font-medium text-gray-700">{formData.valoracion}</span>
// // //                       </label>
// // //                     </div>
// // //                   </div>

// // //                   <div className="grid grid-cols-2 gap-4 mb-4">
// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Rango Inicial (%)*</label>
// // //                       <input
// // //                         type="number"
// // //                         name="rangoInicial"
// // //                         value={formData.rangoInicial}
// // //                         onChange={handleInputChange}
// // //                         min="0"
// // //                         max="100"
// // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // //                         required
// // //                       />
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-sm font-medium text-gray-700 mb-1">Rango Final (%)*</label>
// // //                       <input
// // //                         type="number"
// // //                         name="rangoFinal"
// // //                         value={formData.rangoFinal}
// // //                         onChange={handleInputChange}
// // //                         min="0"
// // //                         max="100"
// // //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // //                         required
// // //                       />
// // //                     </div>
// // //                   </div>

// // //                   <div className="mb-4">
// // //                     <label className="block text-sm font-medium text-gray-700 mb-1">Concepto*</label>
// // //                     <input
// // //                       type="text"
// // //                       name="concepto"
// // //                       value={formData.concepto}
// // //                       onChange={handleInputChange}
// // //                       className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// // //                       required
// // //                     />
// // //                   </div>

// // //                   <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4 mb-4">
// // //                     <div className="text-center font-medium mb-2 text-sm">
// // //                       Aprueba a partir ={" "}
// // //                       {formData.valoracion === "Aprueba"
// // //                         ? formData.rangoInicial
// // //                         : Number.parseInt(formData.rangoFinal) + 1}
// // //                       %
// // //                     </div>

// // //                     <div className="space-y-2">
// // //                       <div className="flex items-center">
// // //                         <span className="w-8 text-xs text-right pr-2">0</span>
// // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // //                           <div className="absolute -top-1.5 left-[40%] h-4 w-0.5 bg-gray-400"></div>
// // //                         </div>
// // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // //                           40% No cumple <span className="ml-1 text-red-500">🗑</span>
// // //                         </span>
// // //                       </div>

// // //                       <div className="flex items-center">
// // //                         <span className="w-8 text-xs text-right pr-2">40%</span>
// // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // //                           <div className="absolute -top-1.5 left-[60%] h-4 w-0.5 bg-gray-400"></div>
// // //                         </div>
// // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // //                           60% Deficiente <span className="ml-1 text-red-500">🗑</span>
// // //                         </span>
// // //                       </div>

// // //                       <div className="flex items-center">
// // //                         <span className="w-8 text-xs text-right pr-2">60%</span>
// // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // //                           <div className="absolute -top-1.5 left-[75%] h-4 w-0.5 bg-gray-400"></div>
// // //                         </div>
// // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // //                           75% Medio: Bueno <span className="ml-1 text-red-500">🗑</span>
// // //                         </span>
// // //                       </div>

// // //                       <div className="flex items-center">
// // //                         <span className="w-8 text-xs text-right pr-2">75%</span>
// // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // //                           <div className="absolute -top-1.5 left-[80%] h-4 w-0.5 bg-gray-400"></div>
// // //                         </div>
// // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // //                           80% Bueno <span className="ml-1 text-red-500">🗑</span>
// // //                         </span>
// // //                       </div>

// // //                       <div className="flex items-center">
// // //                         <span className="w-8 text-xs text-right pr-2">80%</span>
// // //                         <div className="flex-1 h-1 bg-gray-300 relative">
// // //                           <div className="absolute -top-1.5 left-[100%] h-4 w-0.5 bg-gray-400"></div>
// // //                         </div>
// // //                         <span className="w-24 text-xs pl-2 flex items-center">
// // //                           100% Excelente <span className="ml-1 text-red-500">🗑</span>
// // //                         </span>
// // //                       </div>
// // //                     </div>
// // //                   </div>

// // //                   <div className="flex justify-between">
// // //                     <button
// // //                       type="button"
// // //                       onClick={() => setIsEditModalOpen(false)}
// // //                       className="px-6 py-2 bg-[#f44144] text-white rounded-md hover:bg-red-600 text-sm"
// // //                     >
// // //                       Cancelar
// // //                     </button>
// // //                     <button
// // //                       type="submit"
// // //                       className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm"
// // //                     >
// // //                       Guardar
// // //                     </button>
// // //                   </div>
// // //                 </form>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Modal de detalle */}
// // //         {isDetailModalOpen && selectedEscala && (
// // //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //             <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">
// // //               <div className="p-6">
// // //                 <h2 className="text-xl font-bold text-center text-[#1f384c] mb-6">DETALLE ESCALA DE VALORACIÓN</h2>

// // //                 <div className="grid grid-cols-2 gap-6 mb-6">
// // //                   <div>
// // //                     <div className="font-medium text-base mb-1">Fecha Inicial:</div>
// // //                     <div className="text-base text-gray-700 bg-gray-50 p-2 rounded">{selectedEscala.fechaInicial}</div>
// // //                   </div>

// // //                   <div>
// // //                     <div className="font-medium text-base mb-1">Fecha Final:</div>
// // //                     <div className="text-base text-gray-700 bg-gray-50 p-2 rounded">{selectedEscala.fechaFinal}</div>
// // //                   </div>

// // //                   <div>
// // //                     <div className="font-medium text-base mb-1">Rango Inicial:</div>
// // //                     <div className="text-base text-gray-700 bg-gray-50 p-2 rounded">{selectedEscala.rangoInicial}%</div>
// // //                   </div>

// // //                   <div>
// // //                     <div className="font-medium text-base mb-1">Rango Final:</div>
// // //                     <div className="text-base text-gray-700 bg-gray-50 p-2 rounded">{selectedEscala.rangoFinal}%</div>
// // //                   </div>

// // //                   <div>
// // //                     <div className="font-medium text-base mb-1">Valoración:</div>
// // //                     <div className="text-base text-gray-700 bg-gray-50 p-2 rounded">
// // //                       <span
// // //                         className={`px-2 py-1 rounded-full text-xs font-medium ${
// // //                           selectedEscala.valoracion === "Aprueba"
// // //                             ? "bg-green-100 text-green-800"
// // //                             : "bg-red-100 text-red-800"
// // //                         }`}
// // //                       >
// // //                         {selectedEscala.valoracion}
// // //                       </span>
// // //                     </div>
// // //                   </div>

// // //                   <div>
// // //                     <div className="font-medium text-base mb-1">Concepto:</div>
// // //                     <div className="text-base text-gray-700 bg-gray-50 p-2 rounded">{selectedEscala.concepto}</div>
// // //                   </div>
// // //                 </div>

// // //                 <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4 mb-6">
// // //                   <div className="text-center font-medium mb-4 text-sm">
// // //                     Aprueba a partir ={" "}
// // //                     {selectedEscala.valoracion === "Aprueba"
// // //                       ? selectedEscala.rangoInicial
// // //                       : selectedEscala.rangoFinal + 1}
// // //                     %
// // //                   </div>

// // //                   {selectedEscala.valoracion === "No aprueba" ? (
// // //                     <>
// // //                       <div className="flex items-center justify-between mb-1 text-sm">
// // //                         <span>0%</span>
// // //                         <span>{selectedEscala.rangoFinal}% Deficiente</span>
// // //                       </div>
// // //                       <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // //                         <div
// // //                           className="bg-[#dc3545] h-5 rounded"
// // //                           style={{ width: `${selectedEscala.rangoFinal}%` }}
// // //                         ></div>
// // //                       </div>
// // //                       <div className="flex items-center justify-between mb-1 text-sm">
// // //                         <span>{selectedEscala.rangoFinal + 1}%</span>
// // //                         <span>100% Excelente</span>
// // //                       </div>
// // //                       <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // //                         <div
// // //                           className="bg-[#46ae69] h-5 rounded"
// // //                           style={{
// // //                             width: `${100 - (selectedEscala.rangoFinal + 1)}%`,
// // //                             marginLeft: `${selectedEscala.rangoFinal + 1}%`,
// // //                           }}
// // //                         ></div>
// // //                       </div>
// // //                     </>
// // //                   ) : (
// // //                     <>
// // //                       <div className="flex items-center justify-between mb-1 text-sm">
// // //                         <span>0%</span>
// // //                         <span>{selectedEscala.rangoInicial - 1}% Deficiente</span>
// // //                       </div>
// // //                       <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // //                         <div
// // //                           className="bg-[#dc3545] h-5 rounded"
// // //                           style={{ width: `${selectedEscala.rangoInicial - 1}%` }}
// // //                         ></div>
// // //                       </div>
// // //                       <div className="flex items-center justify-between mb-1 text-sm">
// // //                         <span>{selectedEscala.rangoInicial}%</span>
// // //                         <span>100% Excelente</span>
// // //                       </div>
// // //                       <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// // //                         <div
// // //                           className="bg-[#46ae69] h-5 rounded"
// // //                           style={{
// // //                             width: `${100 - selectedEscala.rangoInicial}%`,
// // //                             marginLeft: `${selectedEscala.rangoInicial}%`,
// // //                           }}
// // //                         ></div>
// // //                       </div>
// // //                     </>
// // //                   )}
// // //                 </div>

// // //                 <div className="flex justify-center">
// // //                   <button
// // //                     onClick={handleCloseDetailModal}
// // //                     className="bg-[#f44144] text-white py-2 px-6 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
// // //                   >
// // //                     Cerrar
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Modal de confirmación para eliminar escala */}
// // //         <ConfirmationModal
// // //           isOpen={showDeleteConfirm}
// // //           onClose={() => setShowDeleteConfirm(false)}
// // //           onConfirm={confirmDeleteScale}
// // //           title="Eliminar Escala"
// // //           message="¿Está seguro que desea eliminar esta escala de valoración? Esta acción no se puede deshacer."
// // //           confirmText="Eliminar"
// // //           confirmColor="bg-[#f44144] hover:bg-red-600"
// // //         />

// // //         {/* Modal de éxito */}
// // //         <ConfirmationModal
// // //           isOpen={showSuccessModal}
// // //           onConfirm={() => setShowSuccessModal(false)}
// // //           title="Operación Exitosa"
// // //           message={successMessage}
// // //           confirmText="Aceptar"
// // //           confirmColor="bg-green-500 hover:bg-green-600"
// // //           showButtonCancel={false}
// // //         />
// // //       </div>

// // //       {/* Modal de confirmación para cerrar sesión */}
// // //       <ConfirmationModal
// // //         isOpen={showLogoutConfirm}
// // //         onClose={() => setShowLogoutConfirm(false)}
// // //         onConfirm={handleLogout}
// // //         title="Cerrar Sesión"
// // //         message="¿Está seguro de que desea cerrar la sesión actual?"
// // //         confirmText="Cerrar Sesión"
// // //         confirmColor="bg-[#f44144] hover:bg-red-600"
// // //       />
// // //     </div>
// // //   )
// // // }

// // // export default Scale
// // "use client"

// // import { useState, useEffect, useRef } from "react"
// // import { ChevronDown } from "lucide-react"
// // import { useNavigate } from "react-router-dom"
// // import GenericTable from "../../../shared/components/Table"
// // import { useAuth } from "../../auth/hooks/useAuth"
// // import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// // // Datos de ejemplo
// // const escalasData = [
// //   {
// //     id: 1,
// //     fechaInicial: "20-10-2023",
// //     fechaFinal: "20-10-2026",
// //     rangoInicial: 1,
// //     rangoFinal: 69,
// //     valoracion: "No aprueba",
// //     descripcion:
// //       "Rango de valoración para calificaciones insuficientes. Los estudiantes que obtengan una calificación en este rango deberán realizar actividades de refuerzo.",
// //   },
// //   {
// //     id: 2,
// //     fechaInicial: "20-10-2020",
// //     fechaFinal: "20-10-2026",
// //     rangoInicial: 70,
// //     rangoFinal: 90,
// //     valoracion: "Aprueba",
// //     descripcion:
// //       "Rango de valoración para calificaciones satisfactorias. Los estudiantes que obtengan una calificación en este rango han demostrado un dominio adecuado de los contenidos.",
// //   },
// //   {
// //     id: 3,
// //     fechaInicial: "20-10-2024",
// //     fechaFinal: "20-10-2026",
// //     rangoInicial: 70,
// //     rangoFinal: 80,
// //     valoracion: "No aprueba",
// //     descripcion:
// //       "Rango de valoración especial para evaluaciones de nivel avanzado. A pesar de estar en un rango normalmente aprobatorio, en este contexto se requiere un desempeño superior.",
// //   },
// //   {
// //     id: 4,
// //     fechaInicial: "20-10-2021",
// //     fechaFinal: "20-10-2026",
// //     rangoInicial: 70,
// //     rangoFinal: 75,
// //     valoracion: "Aprueba",
// //     descripcion:
// //       "Rango de valoración para calificaciones mínimas aprobatorias. Los estudiantes en este rango han cumplido con los requisitos básicos del curso.",
// //   },
// //   {
// //     id: 5,
// //     fechaInicial: "20-10-2022",
// //     fechaFinal: "20-10-2026",
// //     rangoInicial: 70,
// //     rangoFinal: 100,
// //     valoracion: "No aprueba",
// //     descripcion:
// //       "Rango de valoración especial para evaluaciones de certificación internacional. Requiere revisión adicional independientemente del puntaje obtenido.",
// //   },
// //   {
// //     id: 6,
// //     fechaInicial: "20-03-2023",
// //     fechaFinal: "20-0-2026",
// //     rangoInicial: 70,
// //     rangoFinal: 85,
// //     valoracion: "No aprueba",
// //     descripcion:
// //       "Rango de valoración para evaluaciones de nivel experto. Se requiere un desempeño excepcional para aprobar este tipo de evaluaciones.",
// //   },
// //   {
// //     id: 7,
// //     fechaInicial: "20-02-2022",
// //     fechaFinal: "20-10-2026",
// //     rangoInicial: 70,
// //     rangoFinal: 95,
// //     valoracion: "Aprueba",
// //     descripcion:
// //       "Rango de valoración para calificaciones en cursos de nivelación. Los estudiantes en este rango han demostrado un progreso significativo.",
// //   },
// // ]

// // // Update the columns definition to match the screenshot layout
// // const columns = [
// //   { key: "fechaInicial", label: "Fecha Inicial" },
// //   { key: "fechaFinal", label: "Fecha Final" },
// //   {
// //     key: "rangoInicial",
// //     label: "Rango Aprobatorio",
// //     render: (item) => `${item.rangoInicial}%`,
// //   },
// //   // Remove the "Rango Final" column as it's not shown in the screenshot
// // ]

// // const Scale = () => {
// //   const [selectedEscala, setSelectedEscala] = useState(null)
// //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
// //   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
// //   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// //   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
// //   const [itemToDelete, setItemToDelete] = useState(null)
// //   const [successMessage, setSuccessMessage] = useState("")
// //   const [showSuccessModal, setShowSuccessModal] = useState(false)
// //   const [scales, setScales] = useState([...escalasData])
// //   const { logout } = useAuth()
// //   const navigate = useNavigate()
// //   const dropdownRef = useRef(null)

// //   // Formulario para crear/editar
// //   const [formData, setFormData] = useState({
// //     fechaInicial: "",
// //     fechaFinal: "",
// //     rangoInicial: "",
// //     rangoFinal: "",
// //     valoracion: "Aprueba",
// //     descripcion: "",
// //   })

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setIsDropdownOpen(false)
// //       }
// //     }

// //     document.addEventListener("mousedown", handleClickOutside)
// //     return () => document.removeEventListener("mousedown", handleClickOutside)
// //   }, [])

// //   const handleLogoutClick = () => {
// //     setIsDropdownOpen(false)
// //     setShowLogoutConfirm(true)
// //   }

// //   const handleLogout = () => {
// //     logout()
// //     navigate("/login")
// //   }

// //   const handleShowEscala = (escala) => {
// //     setSelectedEscala(escala)
// //     setIsDetailModalOpen(true)
// //   }

// //   const handleCloseDetailModal = () => {
// //     setIsDetailModalOpen(false)
// //   }

// //   const handleAddScale = () => {
// //     setFormData({
// //       fechaInicial: "",
// //       fechaFinal: "",
// //       rangoInicial: "",
// //       rangoFinal: "",
// //       valoracion: "Aprueba",
// //       descripcion: "",
// //     })
// //     setIsCreateModalOpen(true)
// //   }

// //   const handleEditScale = (scale) => {
// //     setSelectedEscala(scale)
// //     setFormData({
// //       fechaInicial: scale.fechaInicial,
// //       fechaFinal: scale.fechaFinal,
// //       rangoInicial: scale.rangoInicial,
// //       rangoFinal: scale.rangoFinal,
// //       valoracion: scale.valoracion,
// //       descripcion: scale.descripcion,
// //     })
// //     setIsEditModalOpen(true)
// //   }

// //   const handleDeleteScale = (id) => {
// //     setItemToDelete(id)
// //     setShowDeleteConfirm(true)
// //   }

// //   const confirmDeleteScale = () => {
// //     try {
// //       // Eliminar de la lista local
// //       const updatedScales = scales.filter((s) => s.id !== itemToDelete)
// //       setScales(updatedScales)

// //       // Mostrar mensaje de éxito
// //       setSuccessMessage("Escala eliminada exitosamente")
// //       setShowSuccessModal(true)
// //     } catch (error) {
// //       console.error("Error al eliminar la escala:", error)
// //       setSuccessMessage("Ocurrió un error al eliminar la escala")
// //       setShowSuccessModal(true)
// //     } finally {
// //       setShowDeleteConfirm(false)
// //       setItemToDelete(null)
// //     }
// //   }

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target
// //     setFormData({
// //       ...formData,
// //       [name]: name === "rangoInicial" || name === "rangoFinal" ? Number.parseInt(value) || "" : value,
// //     })
// //   }

// //   const handleToggleValoracion = () => {
// //     setFormData({
// //       ...formData,
// //       valoracion: formData.valoracion === "Aprueba" ? "No aprueba" : "Aprueba",
// //     })
// //   }

// //   const handleCreateSubmit = (e) => {
// //     e.preventDefault()
// //     const newScale = {
// //       id: Math.max(...scales.map((s) => s.id)) + 1,
// //       ...formData,
// //     }
// //     setScales([...scales, newScale])
// //     setIsCreateModalOpen(false)
// //     setSuccessMessage("Escala creada exitosamente")
// //     setShowSuccessModal(true)
// //   }

// //   const handleEditSubmit = (e) => {
// //     e.preventDefault()
// //     const updatedScales = scales.map((scale) => (scale.id === selectedEscala.id ? { ...scale, ...formData } : scale))
// //     setScales(updatedScales)
// //     setIsEditModalOpen(false)
// //     setSuccessMessage("Escala actualizada exitosamente")
// //     setShowSuccessModal(true)
// //   }

// //   return (
// //     <div className="min-h-screen">
// //       <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
// //         <div className="container mx-auto flex justify-between items-center">
// //           <h1 className="text-2xl font-bold text-[#1f384c]">ESCALA DE VALORACIÓN</h1>
// //           <div className="relative" ref={dropdownRef}>
// //             <button
// //               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
// //               className="flex items-center gap-2 text-[#1f384c] font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
// //             >
// //               <span>Administrador</span>
// //               <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
// //             </button>

// //             {isDropdownOpen && (
// //               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
// //                 <button
// //                   onClick={handleLogoutClick}
// //                   className="w-full text-left px-4 py-2 text-[#f44144] hover:bg-gray-50 rounded-lg"
// //                 >
// //                   Cerrar Sesión
// //                 </button>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </header>

// //       <div className="container mx-auto px-6">
// //         <GenericTable
// //           data={scales}
// //           columns={columns}
// //           onShow={handleShowEscala}
// //           onAdd={handleAddScale}
// //           onEdit={handleEditScale}
// //           onDelete={handleDeleteScale}
// //           showActions={{ show: true, edit: true, delete: true, add: true }}
// //           addButtonText="Añadir Escala"
// //         />

// //         {selectedEscala && (
// //           <ScaleDetailModal escala={selectedEscala} isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} />
// //         )}

// //         {/* Create Scale Modal */}
// //         {isCreateModalOpen && (
// //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //             <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[80vh] overflow-auto">
// //               <div className="p-4">
// //                 <h2 className="text-xl font-bold text-[#1f384c] mb-4">CREAR ESCALA DE VALORACIÓN</h2>

// //                 <form onSubmit={handleCreateSubmit}>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial*</label>
// //                       <input
// //                         type="Date"
// //                         name="fechaInicial"
// //                         value={formData.fechaInicial}
// //                         onChange={handleInputChange}
// //                         placeholder="DD/MM/YYYY"
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// //                         required
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final*</label>
// //                       <input
// //                         type="Date"
// //                         name="fechaFinal"
// //                         value={formData.fechaFinal}
// //                         onChange={handleInputChange}
// //                         placeholder="DD/MM/YYYY"
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// //                         required
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">Rango Inicial (%)*</label>
// //                       <input
// //                         type="number"
// //                         name="rangoInicial"
// //                         value={formData.rangoInicial}
// //                         onChange={handleInputChange}
// //                         min="0"
// //                         max="100"
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// //                         required
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">Rango Final (%)*</label>
// //                       <input
// //                         type="number"
// //                         name="rangoFinal"
// //                         value={formData.rangoFinal}
// //                         onChange={handleInputChange}
// //                         min="0"
// //                         max="100"
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// //                         required
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
// //                       <div className="flex items-center">
// //                         <label className="relative inline-flex items-center cursor-pointer">
// //                           <input
// //                             type="checkbox"
// //                             checked={formData.valoracion === "Aprueba"}
// //                             onChange={handleToggleValoracion}
// //                             className="sr-only peer"
// //                           />
// //                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
// //                           <span className="ml-3 text-sm font-medium text-gray-700">{formData.valoracion}</span>
// //                         </label>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="mb-4">
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
// //                     <textarea
// //                       name="descripcion"
// //                       value={formData.descripcion}
// //                       onChange={handleInputChange}
// //                       rows="3"
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// //                       placeholder="Descripción de la escala de valoración..."
// //                     ></textarea>
// //                   </div>

// //                   <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4 mb-4">
// //                     <div className="text-center font-medium mb-2 text-sm">Visualización de la escala</div>

// //                     <div className="mb-2 text-sm text-center">
// //                       {formData.valoracion === "Aprueba"
// //                         ? `Aprueba a partir = ${formData.rangoInicial || 0}%`
// //                         : `Aprueba a partir = ${(formData.rangoFinal || 0) + 1}%`}
// //                     </div>

// //                     {formData.valoracion === "No aprueba" ? (
// //                       <>
// //                         <div className="flex items-center justify-between mb-1 text-sm">
// //                           <span>0%</span>
// //                           <span>{formData.rangoFinal || 0}% Deficiente</span>
// //                         </div>
// //                         <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// //                           <div
// //                             className="bg-[#dc3545] h-5 rounded"
// //                             style={{ width: `${formData.rangoFinal || 0}%` }}
// //                           ></div>
// //                         </div>
// //                         <div className="flex items-center justify-between mb-1 text-sm">
// //                           <span>{(formData.rangoFinal || 0) + 1}%</span>
// //                           <span>100% Excelente</span>
// //                         </div>
// //                         <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// //                           <div
// //                             className="bg-[#46ae69] h-5 rounded"
// //                             style={{
// //                               width: `${100 - ((formData.rangoFinal || 0) + 1)}%`,
// //                               marginLeft: `${(formData.rangoFinal || 0) + 1}%`,
// //                             }}
// //                           ></div>
// //                         </div>
// //                       </>
// //                     ) : (
// //                       <>
// //                         <div className="flex items-center justify-between mb-1 text-sm">
// //                           <span>0%</span>
// //                           <span>{(formData.rangoInicial || 0) - 1}% Deficiente</span>
// //                         </div>
// //                         <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// //                           <div
// //                             className="bg-[#dc3545] h-5 rounded"
// //                             style={{ width: `${(formData.rangoInicial || 0) - 1}%` }}
// //                           ></div>
// //                         </div>
// //                         <div className="flex items-center justify-between mb-1 text-sm">
// //                           <span>{formData.rangoInicial || 0}%</span>
// //                           <span>100% Excelente</span>
// //                         </div>
// //                         <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// //                           <div
// //                             className="bg-[#46ae69] h-5 rounded"
// //                             style={{
// //                               width: `${100 - (formData.rangoInicial || 0)}%`,
// //                               marginLeft: `${formData.rangoInicial || 0}%`,
// //                             }}
// //                           ></div>
// //                         </div>
// //                       </>
// //                     )}
// //                   </div>

// //                   <div className="flex justify-between px-4">
// //                     <button
// //                       type="button"
// //                       onClick={() => setIsCreateModalOpen(false)}
// //                       className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
// //                     >
// //                       Cancelar
// //                     </button>
// //                     <button
// //                       type="submit"
// //                       className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
// //                     >
// //                       Crear
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Edit Scale Modal */}
// //         {isEditModalOpen && selectedEscala && (
// //           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //             <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[80vh] overflow-auto">
// //               <div className="p-4">
// //                 <h2 className="text-xl font-bold text-[#1f384c] mb-4">EDITAR ESCALA DE VALORACIÓN</h2>

// //                 <form onSubmit={handleEditSubmit}>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial*</label>
// //                       <input
// //                         type="Date"
// //                         name="fechaInicial"
// //                         value={formData.fechaInicial}
// //                         onChange={handleInputChange}
// //                         placeholder="DD/MM/YYYY"
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// //                         required
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final*</label>
// //                       <input
// //                         type="Date"
// //                         name="fechaFinal"
// //                         value={formData.fechaFinal}
// //                         onChange={handleInputChange}
// //                         placeholder="DD/MM/YYYY"
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// //                         required
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">Rango Inicial (%)*</label>
// //                       <input
// //                         type="number"
// //                         name="rangoInicial"
// //                         value={formData.rangoInicial}
// //                         onChange={handleInputChange}
// //                         min="0"
// //                         max="100"
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// //                         required
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">Rango Final (%)*</label>
// //                       <input
// //                         type="number"
// //                         name="rangoFinal"
// //                         value={formData.rangoFinal}
// //                         onChange={handleInputChange}
// //                         min="0"
// //                         max="100"
// //                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// //                         required
// //                       />
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
// //                       <div className="flex items-center">
// //                         <label className="relative inline-flex items-center cursor-pointer">
// //                           <input
// //                             type="checkbox"
// //                             checked={formData.valoracion === "Aprueba"}
// //                             onChange={handleToggleValoracion}
// //                             className="sr-only peer"
// //                           />
// //                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
// //                           <span className="ml-3 text-sm font-medium text-gray-700">{formData.valoracion}</span>
// //                         </label>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="mb-4">
// //                     <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
// //                     <textarea
// //                       name="descripcion"
// //                       value={formData.descripcion}
// //                       onChange={handleInputChange}
// //                       rows="3"
// //                       className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
// //                       placeholder="Descripción de la escala de valoración..."
// //                     ></textarea>
// //                   </div>

// //                   <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4 mb-4">
// //                     <div className="text-center font-medium mb-2 text-sm">Visualización de la escala</div>

// //                     <div className="mb-2 text-sm text-center">
// //                       {formData.valoracion === "Aprueba"
// //                         ? `Aprueba a partir = ${formData.rangoInicial || 0}%`
// //                         : `Aprueba a partir = ${(formData.rangoFinal || 0) + 1}%`}
// //                     </div>

// //                     {formData.valoracion === "No aprueba" ? (
// //                       <>
// //                         <div className="flex items-center justify-between mb-1 text-sm">
// //                           <span>0%</span>
// //                           <span>{formData.rangoFinal || 0}% Deficiente</span>
// //                         </div>
// //                         <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// //                           <div
// //                             className="bg-[#dc3545] h-5 rounded"
// //                             style={{ width: `${formData.rangoFinal || 0}%` }}
// //                           ></div>
// //                         </div>
// //                         <div className="flex items-center justify-between mb-1 text-sm">
// //                           <span>{(formData.rangoFinal || 0) + 1}%</span>
// //                           <span>100% Excelente</span>
// //                         </div>
// //                         <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// //                           <div
// //                             className="bg-[#46ae69] h-5 rounded"
// //                             style={{
// //                               width: `${100 - ((formData.rangoFinal || 0) + 1)}%`,
// //                               marginLeft: `${(formData.rangoFinal || 0) + 1}%`,
// //                             }}
// //                           ></div>
// //                         </div>
// //                       </>
// //                     ) : (
// //                       <>
// //                         <div className="flex items-center justify-between mb-1 text-sm">
// //                           <span>0%</span>
// //                           <span>{(formData.rangoInicial || 0) - 1}% Deficiente</span>
// //                         </div>
// //                         <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// //                           <div
// //                             className="bg-[#dc3545] h-5 rounded"
// //                             style={{ width: `${(formData.rangoInicial || 0) - 1}%` }}
// //                           ></div>
// //                         </div>
// //                         <div className="flex items-center justify-between mb-1 text-sm">
// //                           <span>{formData.rangoInicial || 0}%</span>
// //                           <span>100% Excelente</span>
// //                         </div>
// //                         <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// //                           <div
// //                             className="bg-[#46ae69] h-5 rounded"
// //                             style={{
// //                               width: `${100 - (formData.rangoInicial || 0)}%`,
// //                               marginLeft: `${formData.rangoInicial || 0}%`,
// //                             }}
// //                           ></div>
// //                         </div>
// //                       </>
// //                     )}
// //                   </div>

// //                   <div className="flex justify-between px-4">
// //                     <button
// //                       type="button"
// //                       onClick={() => setIsEditModalOpen(false)}
// //                       className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 text-sm"
// //                     >
// //                       Cancelar
// //                     </button>
// //                     <button
// //                       type="submit"
// //                       className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
// //                     >
// //                       Guardar Cambios
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Modal de confirmación para eliminar escala */}
// //         <ConfirmationModal
// //           isOpen={showDeleteConfirm}
// //           onClose={() => setShowDeleteConfirm(false)}
// //           onConfirm={confirmDeleteScale}
// //           title="Eliminar Escala"
// //           message="¿Está seguro que desea eliminar esta escala de valoración? Esta acción no se puede deshacer."
// //           confirmText="Eliminar"
// //           confirmColor="bg-[#f44144] hover:bg-red-600"
// //         />

// //         {/* Modal de éxito */}
// //         <ConfirmationModal
// //           isOpen={showSuccessModal}
// //           onConfirm={() => setShowSuccessModal(false)}
// //           title="Operación Exitosa"
// //           message={successMessage}
// //           confirmText="Aceptar"
// //           confirmColor="bg-green-500 hover:bg-green-600"
// //           showButtonCancel={false}
// //         />
// //       </div>

// //       {/* Modal de confirmación para cerrar sesión */}
// //       <ConfirmationModal
// //         isOpen={showLogoutConfirm}
// //         onClose={() => setShowLogoutConfirm(false)}
// //         onConfirm={handleLogout}
// //         title="Cerrar Sesión"
// //         message="¿Está seguro de que desea cerrar la sesión actual?"
// //         confirmText="Cerrar Sesión"
// //         confirmColor="bg-[#f44144] hover:bg-red-600"
// //       />
// //     </div>
// //   )
// // }

// // // Componente para el modal de detalle de escala
// // const ScaleDetailModal = ({ escala, isOpen, onClose }) => {
// //   const modalRef = useRef(null)

// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (modalRef.current && !modalRef.current.contains(event.target)) {
// //         onClose()
// //       }
// //     }

// //     if (isOpen) {
// //       document.addEventListener("mousedown", handleClickOutside)
// //     }

// //     return () => {
// //       document.removeEventListener("mousedown", handleClickOutside)
// //     }
// //   }, [isOpen, onClose])

// //   if (!isOpen || !escala) return null

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[80vh] overflow-y-auto">
// //         <div className="p-4">
// //           <h2 className="text-xl font-bold text-center text-[#1f384c] mb-4">DETALLE ESCALA DE VALORACIÓN</h2>

// //           <div className="grid grid-cols-2 gap-4 mb-6">
// //             <div className="flex">
// //               <div className="w-1/3 font-medium text-base">Fecha Inicial:</div>
// //               <div className="w-2/3 text-base text-gray-500">{escala.fechaInicial}</div>
// //             </div>

// //             <div className="flex">
// //               <div className="w-1/2 font-medium text-base">Fecha Final:</div>
// //               <div className="w-1/2 text-base text-gray-500">{escala.fechaFinal}</div>
// //             </div>

// //             <div className="flex">
// //               <div className="w-1/3 font-medium text-base">Rango Inicial:</div>
// //               <div className="w-2/3 text-base text-gray-500">{escala.rangoInicial}%</div>
// //             </div>

// //             <div className="flex">
// //               <div className="w-1/2 font-medium text-base">Rango Final:</div>
// //               <div className="w-1/2 text-base text-gray-500">{escala.rangoFinal}%</div>
// //             </div>

// //             <div className="flex">
// //               <div className="w-1/3 font-medium text-base">Valoración:</div>
// //               <div className="w-2/3 text-base text-gray-500">
// //                 <span
// //                   className={`px-2 py-1 rounded-full text-xs font-medium ${
// //                     escala.valoracion === "Aprueba" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// //                   }`}
// //                 >
// //                   {escala.valoracion}
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           <h3 className="text-lg font-medium mb-3">Descripción</h3>

// //           <div className="bg-gray-50 p-4 rounded-lg mb-6">
// //             <p className="text-gray-700 text-sm">{escala.descripcion}</p>
// //           </div>

// //           <div className="border-t border-dashed border-[#d9d9d9] pt-4 mt-4 mb-6">
// //             <div className="text-center font-medium mb-2 text-sm">Visualización de la escala</div>

// //             <div className="mb-2 text-sm text-center">
// //               {escala.valoracion === "Aprueba"
// //                 ? `Aprueba a partir = ${escala.rangoInicial}%`
// //                 : `Aprueba a partir = ${escala.rangoFinal + 1}%`}
// //             </div>

// //             {escala.valoracion === "No aprueba" ? (
// //               <>
// //                 <div className="flex items-center justify-between mb-1 text-sm">
// //                   <span>0%</span>
// //                   <span>{escala.rangoFinal}% Deficiente</span>
// //                 </div>
// //                 <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// //                   <div className="bg-[#dc3545] h-5 rounded" style={{ width: `${escala.rangoFinal}%` }}></div>
// //                 </div>
// //                 <div className="flex items-center justify-between mb-1 text-sm">
// //                   <span>{escala.rangoFinal + 1}%</span>
// //                   <span>100% Excelente</span>
// //                 </div>
// //                 <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// //                   <div
// //                     className="bg-[#46ae69] h-5 rounded"
// //                     style={{ width: `${100 - (escala.rangoFinal + 1)}%`, marginLeft: `${escala.rangoFinal + 1}%` }}
// //                   ></div>
// //                 </div>
// //               </>
// //             ) : (
// //               <>
// //                 <div className="flex items-center justify-between mb-1 text-sm">
// //                   <span>0%</span>
// //                   <span>{escala.rangoInicial - 1}% Deficiente</span>
// //                 </div>
// //                 <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// //                   <div className="bg-[#dc3545] h-5 rounded" style={{ width: `${escala.rangoInicial - 1}%` }}></div>
// //                 </div>
// //                 <div className="flex items-center justify-between mb-1 text-sm">
// //                   <span>{escala.rangoInicial}%</span>
// //                   <span>100% Excelente</span>
// //                 </div>
// //                 <div className="w-full bg-gray-200 h-5 mb-2 rounded">
// //                   <div
// //                     className="bg-[#46ae69] h-5 rounded"
// //                     style={{ width: `${100 - escala.rangoInicial}%`, marginLeft: `${escala.rangoInicial}%` }}
// //                   ></div>
// //                 </div>
// //               </>
// //             )}
// //           </div>

// //           <div className="flex justify-center">
// //             <button
// //               onClick={onClose}
// //               className="bg-[#f44144] text-white py-2 px-6 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
// //             >
// //               Cerrar
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default Scale
// "use client"

// import { useState, useEffect, useRef } from "react"
// import { ChevronDown, Plus, Trash2 } from "lucide-react"
// import { useNavigate } from "react-router-dom"
// import GenericTable from "../../../shared/components/Table"
// import { useAuth } from "../../auth/hooks/useAuth"
// import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// // Datos de ejemplo
// const escalasData = [
//   {
//     id: 1,
//     fechaInicial: "20-10-2023",
//     fechaFinal: "20-10-2026",
//     rangoInicial: 1,
//     rangoFinal: 69,
//     valoracion: "No aprueba",
//     descripcion:
//       "Rango de valoración para calificaciones insuficientes. Los estudiantes que obtengan una calificación en este rango deberán realizar actividades de refuerzo.",
//     metricas: [
//       { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
//       { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
//       { id: 3, rangoInicial: 70, rangoFinal: 100, concepto: "Excelente" },
//     ],
//     apruebaPorcentaje: 70,
//   },
//   {
//     id: 2,
//     fechaInicial: "20-10-2020",
//     fechaFinal: "20-10-2026",
//     rangoInicial: 70,
//     rangoFinal: 90,
//     valoracion: "Aprueba",
//     descripcion:
//       "Rango de valoración para calificaciones satisfactorias. Los estudiantes que obtengan una calificación en este rango han demostrado un dominio adecuado de los contenidos.",
//     metricas: [
//       { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
//       { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
//       { id: 3, rangoInicial: 70, rangoFinal: 100, concepto: "Excelente" },
//     ],
//     apruebaPorcentaje: 70,
//   },
//   {
//     id: 3,
//     fechaInicial: "20-10-2024",
//     fechaFinal: "20-10-2026",
//     rangoInicial: 70,
//     rangoFinal: 80,
//     valoracion: "No aprueba",
//     descripcion:
//       "Rango de valoración especial para evaluaciones de nivel avanzado. A pesar de estar en un rango normalmente aprobatorio, en este contexto se requiere un desempeño superior.",
//     metricas: [
//       { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
//       { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
//       { id: 3, rangoInicial: 70, rangoFinal: 100, concepto: "Excelente" },
//     ],
//     apruebaPorcentaje: 80,
//   },
//   {
//     id: 4,
//     fechaInicial: "20-10-2021",
//     fechaFinal: "20-10-2026",
//     rangoInicial: 70,
//     rangoFinal: 75,
//     valoracion: "Aprueba",
//     descripcion:
//       "Rango de valoración para calificaciones mínimas aprobatorias. Los estudiantes en este rango han cumplido con los requisitos básicos del curso.",
//     metricas: [
//       { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
//       { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
//       { id: 3, rangoInicial: 70, rangoFinal: 100, concepto: "Excelente" },
//     ],
//     apruebaPorcentaje: 70,
//   },
//   {
//     id: 5,
//     fechaInicial: "20-10-2022",
//     fechaFinal: "20-10-2026",
//     rangoInicial: 70,
//     rangoFinal: 100,
//     valoracion: "No aprueba",
//     descripcion:
//       "Rango de valoración especial para evaluaciones de certificación internacional. Requiere revisión adicional independientemente del puntaje obtenido.",
//     metricas: [
//       { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
//       { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
//       { id: 3, rangoInicial: 70, rangoFinal: 100, concepto: "Excelente" },
//     ],
//     apruebaPorcentaje: 80,
//   },
//   {
//     id: 6,
//     fechaInicial: "20-03-2023",
//     fechaFinal: "20-0-2026",
//     rangoInicial: 70,
//     rangoFinal: 85,
//     valoracion: "No aprueba",
//     descripcion:
//       "Rango de valoración para evaluaciones de nivel experto. Se requiere un desempeño excepcional para aprobar este tipo de evaluaciones.",
//     metricas: [
//       { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
//       { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
//       { id: 3, rangoInicial: 70, rangoFinal: 100, concepto: "Excelente" },
//     ],
//     apruebaPorcentaje: 80,
//   },
//   {
//     id: 7,
//     fechaInicial: "20-02-2022",
//     fechaFinal: "20-10-2026",
//     rangoInicial: 70,
//     rangoFinal: 95,
//     valoracion: "Aprueba",
//     descripcion:
//       "Rango de valoración para calificaciones en cursos de nivelación. Los estudiantes en este rango han demostrado un progreso significativo.",
//     metricas: [
//       { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
//       { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
//       { id: 3, rangoInicial: 70, rangoFinal: 100, concepto: "Excelente" },
//     ],
//     apruebaPorcentaje: 70,
//   },
// ]

// // Update the columns definition to match the screenshot layout
// const columns = [
//   { key: "fechaInicial", label: "Fecha Inicial" },
//   { key: "fechaFinal", label: "Fecha Final" },
//   {
//     key: "rangoInicial",
//     label: "Rango Aprobatorio",
//     render: (item) => `${item.rangoInicial}%`,
//   },
//   // Remove the "Rango Final" column as it's not shown in the screenshot
// ]

// const Scale = () => {
//   const [selectedEscala, setSelectedEscala] = useState(null)
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
//   const [itemToDelete, setItemToDelete] = useState(null)
//   const [successMessage, setSuccessMessage] = useState("")
//   const [showSuccessModal, setShowSuccessModal] = useState(false)
//   const [scales, setScales] = useState([...escalasData])
//   const { logout } = useAuth()
//   const navigate = useNavigate()
//   const dropdownRef = useRef(null)

//   // Formulario para crear/editar
//   const [formData, setFormData] = useState({
//     fechaInicial: "",
//     fechaFinal: "",
//     rangoInicial: "",
//     rangoFinal: "",
//     valoracion: "Aprueba",
//     descripcion: "",
//     metricas: [
//       { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
//       { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
//       { id: 3, rangoInicial: 80, rangoFinal: 100, concepto: "Excelente" },
//     ],
//     apruebaPorcentaje: 80,
//   })

//   // Nueva métrica temporal
//   const [newMetrica, setNewMetrica] = useState({
//     rangoInicial: 75,
//     rangoFinal: 100,
//     concepto: "Deficiente",
//   })

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   const handleLogoutClick = () => {
//     setIsDropdownOpen(false)
//     setShowLogoutConfirm(true)
//   }

//   const handleLogout = () => {
//     logout()
//     navigate("/login")
//   }

//   const handleShowEscala = (escala) => {
//     setSelectedEscala(escala)
//     setIsDetailModalOpen(true)
//   }

//   const handleCloseDetailModal = () => {
//     setIsDetailModalOpen(false)
//   }

//   const handleAddScale = () => {
//     setFormData({
//       fechaInicial: "",
//       fechaFinal: "",
//       rangoInicial: "",
//       rangoFinal: "",
//       valoracion: "Aprueba",
//       descripcion: "",
//       metricas: [
//         { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
//         { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
//         { id: 3, rangoInicial: 80, rangoFinal: 100, concepto: "Excelente" },
//       ],
//       apruebaPorcentaje: 80,
//     })
//     setNewMetrica({
//       rangoInicial: 75,
//       rangoFinal: 100,
//       concepto: "Deficiente",
//     })
//     setIsCreateModalOpen(true)
//   }

//   const handleEditScale = (scale) => {
//     setSelectedEscala(scale)
//     setFormData({
//       fechaInicial: scale.fechaInicial,
//       fechaFinal: scale.fechaFinal,
//       rangoInicial: scale.rangoInicial,
//       rangoFinal: scale.rangoFinal,
//       valoracion: scale.valoracion,
//       descripcion: scale.descripcion,
//       metricas: [...scale.metricas],
//       apruebaPorcentaje: scale.apruebaPorcentaje,
//     })
//     setIsEditModalOpen(true)
//   }

//   const handleDeleteScale = (id) => {
//     setItemToDelete(id)
//     setShowDeleteConfirm(true)
//   }

//   const confirmDeleteScale = () => {
//     try {
//       // Eliminar de la lista local
//       const updatedScales = scales.filter((s) => s.id !== itemToDelete)
//       setScales(updatedScales)

//       // Mostrar mensaje de éxito
//       setSuccessMessage("Escala eliminada exitosamente")
//       setShowSuccessModal(true)
//     } catch (error) {
//       console.error("Error al eliminar la escala:", error)
//       setSuccessMessage("Ocurrió un error al eliminar la escala")
//       setShowSuccessModal(true)
//     } finally {
//       setShowDeleteConfirm(false)
//       setItemToDelete(null)
//     }
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData({
//       ...formData,
//       [name]:
//         name === "rangoInicial" || name === "rangoFinal" || name === "apruebaPorcentaje"
//           ? Number.parseInt(value) || ""
//           : value,
//     })
//   }

//   const handleNewMetricaChange = (e) => {
//     const { name, value } = e.target
//     setNewMetrica({
//       ...newMetrica,
//       [name]: name === "rangoInicial" || name === "rangoFinal" ? Number.parseInt(value) || "" : value,
//     })
//   }

//   const handleToggleValoracion = () => {
//     setFormData({
//       ...formData,
//       valoracion: formData.valoracion === "Aprueba" ? "No aprueba" : "Aprueba",
//     })
//   }

//   const handleAddMetrica = () => {
//     // Validar que los rangos no se superpongan
//     const newId = Math.max(...formData.metricas.map((m) => m.id), 0) + 1
//     const newMetricaWithId = { ...newMetrica, id: newId }

//     setFormData({
//       ...formData,
//       metricas: [...formData.metricas, newMetricaWithId],
//     })

//     // Resetear la nueva métrica
//     setNewMetrica({
//       rangoInicial: 0,
//       rangoFinal: 0,
//       concepto: "",
//     })
//   }

//   const handleDeleteMetrica = (id) => {
//     const updatedMetricas = formData.metricas.filter((m) => m.id !== id)
//     setFormData({
//       ...formData,
//       metricas: updatedMetricas,
//     })
//   }

//   const handleCreateSubmit = (e) => {
//     e.preventDefault()
//     const newScale = {
//       id: Math.max(...scales.map((s) => s.id)) + 1,
//       ...formData,
//     }
//     setScales([...scales, newScale])
//     setIsCreateModalOpen(false)
//     setSuccessMessage("Escala creada exitosamente")
//     setShowSuccessModal(true)
//   }

//   const handleEditSubmit = (e) => {
//     e.preventDefault()
//     const updatedScales = scales.map((scale) => (scale.id === selectedEscala.id ? { ...scale, ...formData } : scale))
//     setScales(updatedScales)
//     setIsEditModalOpen(false)
//     setSuccessMessage("Escala actualizada exitosamente")
//     setShowSuccessModal(true)
//   }

//   return (
//     <div className="min-h-screen">
//       <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-[#1f384c]">ESCALA DE VALORACIÓN</h1>
//           <div className="relative" ref={dropdownRef}>
//             <button
//               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
//               className="flex items-center gap-2 text-[#1f384c] font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
//             >
//               <span>Administrador</span>
//               <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
//             </button>

//             {isDropdownOpen && (
//               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
//                 <button
//                   onClick={handleLogoutClick}
//                   className="w-full text-left px-4 py-2 text-[#f44144] hover:bg-gray-50 rounded-lg"
//                 >
//                   Cerrar Sesión
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-6">
//         <GenericTable
//           data={scales}
//           columns={columns}
//           onShow={handleShowEscala}
//           onAdd={handleAddScale}
//           onEdit={handleEditScale}
//           onDelete={handleDeleteScale}
//           showActions={{ show: true, edit: true, delete: true, add: true }}
//           addButtonText="Añadir Escala"
//         />

//         {selectedEscala && (
//           <ScaleDetailModal escala={selectedEscala} isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} />
//         )}

//         {/* Create Scale Modal */}
//         {isCreateModalOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[80vh] overflow-auto">
//               <div className="p-4">
//                 <h2 className="text-xl font-bold text-[#1f384c] mb-4">CREAR ESCALA DE VALORACIÓN</h2>

//                 <form onSubmit={handleCreateSubmit}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial*</label>
//                       <input
//                         type="Date"
//                         name="fechaInicial"
//                         value={formData.fechaInicial}
//                         onChange={handleInputChange}
//                         placeholder="DD/MM/YYYY"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final*</label>
//                       <input
//                         type="Date"
//                         name="fechaFinal"
//                         value={formData.fechaFinal}
//                         onChange={handleInputChange}
//                         placeholder="DD/MM/YYYY"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
//                       <div className="flex items-center">
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={formData.valoracion === "Aprueba"}
//                             onChange={handleToggleValoracion}
//                             className="sr-only peer"
//                           />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
//                           <span className="ml-3 text-sm font-medium text-gray-700">{formData.valoracion}</span>
//                         </label>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Aprueba a partir de (%)*</label>
//                       <input
//                         type="number"
//                         name="apruebaPorcentaje"
//                         value={formData.apruebaPorcentaje}
//                         onChange={handleInputChange}
//                         min="0"
//                         max="100"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
//                     <textarea
//                       name="descripcion"
//                       value={formData.descripcion}
//                       onChange={handleInputChange}
//                       rows="3"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                       placeholder="Descripción de la escala de valoración..."
//                     ></textarea>
//                   </div>

//                   {/* Sección para añadir métricas de valoración */}
//                   <div className="border border-gray-200 rounded-lg p-4 mb-6">
//                     <h3 className="text-lg font-medium mb-4 text-center">Añadir Métrica de Valoración:</h3>

//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial</label>
//                         <input
//                           type="text"
//                           value={formData.fechaInicial}
//                           disabled
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final</label>
//                         <input
//                           type="text"
//                           value={formData.fechaFinal}
//                           disabled
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
//                         <input
//                           type="text"
//                           value={formData.valoracion}
//                           disabled
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-3 gap-4 mb-4 items-end">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Rango Inicial</label>
//                         <input
//                           type="number"
//                           name="rangoInicial"
//                           value={newMetrica.rangoInicial}
//                           onChange={handleNewMetricaChange}
//                           min="0"
//                           max="100"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Rango Final</label>
//                         <input
//                           type="number"
//                           name="rangoFinal"
//                           value={newMetrica.rangoFinal}
//                           onChange={handleNewMetricaChange}
//                           min="0"
//                           max="100"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
//                         <div className="flex items-center">
//                           <input
//                             type="text"
//                             name="concepto"
//                             value={newMetrica.concepto}
//                             onChange={handleNewMetricaChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                           />
//                           <button
//                             type="button"
//                             onClick={handleAddMetrica}
//                             className="ml-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
//                           >
//                             <Plus className="w-5 h-5" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="border-t border-dashed border-gray-300 my-4"></div>

//                     <div className="text-center mb-2">
//                       <span className="text-sm font-medium">Aprueba a partir = {formData.apruebaPorcentaje}%</span>
//                     </div>

//                     {/* Lista de métricas */}
//                     <div className="space-y-2">
//                       {formData.metricas.map((metrica) => (
//                         <div key={metrica.id} className="flex items-center justify-between">
//                           <span className="text-sm">
//                             {metrica.rangoInicial}% — {metrica.rangoFinal}%: {metrica.concepto}
//                           </span>
//                           <button
//                             type="button"
//                             onClick={() => handleDeleteMetrica(metrica.id)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <Trash2 className="w-5 h-5" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex justify-between">
//                     <button
//                       type="button"
//                       onClick={() => setIsCreateModalOpen(false)}
//                       className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
//                     >
//                       Cancelar
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
//                     >
//                       Añadir
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Edit Scale Modal */}
//         {isEditModalOpen && selectedEscala && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[80vh] overflow-auto">
//               <div className="p-4">
//                 <h2 className="text-xl font-bold text-[#1f384c] mb-4">EDITAR ESCALA DE VALORACIÓN</h2>

//                 <form onSubmit={handleEditSubmit}>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial*</label>
//                       <input
//                         type="Date"
//                         name="fechaInicial"
//                         value={formData.fechaInicial}
//                         onChange={handleInputChange}
//                         placeholder="DD/MM/YYYY"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final*</label>
//                       <input
//                         type="Date"
//                         name="fechaFinal"
//                         value={formData.fechaFinal}
//                         onChange={handleInputChange}
//                         placeholder="DD/MM/YYYY"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                         required
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
//                       <div className="flex items-center">
//                         <label className="relative inline-flex items-center cursor-pointer">
//                           <input
//                             type="checkbox"
//                             checked={formData.valoracion === "Aprueba"}
//                             onChange={handleToggleValoracion}
//                             className="sr-only peer"
//                           />
//                           <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
//                           <span className="ml-3 text-sm font-medium text-gray-700">{formData.valoracion}</span>
//                         </label>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-1">Aprueba a partir de (%)*</label>
//                       <input
//                         type="number"
//                         name="apruebaPorcentaje"
//                         value={formData.apruebaPorcentaje}
//                         onChange={handleInputChange}
//                         min="0"
//                         max="100"
//                         className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                         required
//                       />
//                     </div>
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
//                     <textarea
//                       name="descripcion"
//                       value={formData.descripcion}
//                       onChange={handleInputChange}
//                       rows="3"
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                       placeholder="Descripción de la escala de valoración..."
//                     ></textarea>
//                   </div>

//                   {/* Sección para añadir métricas de valoración */}
//                   <div className="border border-gray-200 rounded-lg p-4 mb-6">
//                     <h3 className="text-lg font-medium mb-4 text-center">Añadir Métrica de Valoración:</h3>

//                     <div className="grid grid-cols-2 gap-4 mb-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial</label>
//                         <input
//                           type="text"
//                           value={formData.fechaInicial}
//                           disabled
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final</label>
//                         <input
//                           type="text"
//                           value={formData.fechaFinal}
//                           disabled
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
//                         <input
//                           type="text"
//                           value={formData.valoracion}
//                           disabled
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
//                         />
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-3 gap-4 mb-4 items-end">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Rango Inicial</label>
//                         <input
//                           type="number"
//                           name="rangoInicial"
//                           value={newMetrica.rangoInicial}
//                           onChange={handleNewMetricaChange}
//                           min="0"
//                           max="100"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Rango Final</label>
//                         <input
//                           type="number"
//                           name="rangoFinal"
//                           value={newMetrica.rangoFinal}
//                           onChange={handleNewMetricaChange}
//                           min="0"
//                           max="100"
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
//                         <div className="flex items-center">
//                           <input
//                             type="text"
//                             name="concepto"
//                             value={newMetrica.concepto}
//                             onChange={handleNewMetricaChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                           />
//                           <button
//                             type="button"
//                             onClick={handleAddMetrica}
//                             className="ml-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
//                           >
//                             <Plus className="w-5 h-5" />
//                           </button>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="border-t border-dashed border-gray-300 my-4"></div>

//                     <div className="text-center mb-2">
//                       <span className="text-sm font-medium">Aprueba a partir = {formData.apruebaPorcentaje}%</span>
//                     </div>

//                     {/* Lista de métricas */}
//                     <div className="space-y-2">
//                       {formData.metricas.map((metrica) => (
//                         <div key={metrica.id} className="flex items-center justify-between">
//                           <span className="text-sm">
//                             {metrica.rangoInicial}% — {metrica.rangoFinal}%: {metrica.concepto}
//                           </span>
//                           <button
//                             type="button"
//                             onClick={() => handleDeleteMetrica(metrica.id)}
//                             className="text-red-500 hover:text-red-700"
//                           >
//                             <Trash2 className="w-5 h-5" />
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="flex justify-between">
//                     <button
//                       type="button"
//                       onClick={() => setIsEditModalOpen(false)}
//                       className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
//                     >
//                       Cancelar
//                     </button>
//                     <button
//                       type="submit"
//                       className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
//                     >
//                       Guardar Cambios
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Modal de confirmación para eliminar escala */}
//         <ConfirmationModal
//           isOpen={showDeleteConfirm}
//           onClose={() => setShowDeleteConfirm(false)}
//           onConfirm={confirmDeleteScale}
//           title="Eliminar Escala"
//           message="¿Está seguro que desea eliminar esta escala de valoración? Esta acción no se puede deshacer."
//           confirmText="Eliminar"
//           confirmColor="bg-[#f44144] hover:bg-red-600"
//         />

//         {/* Modal de éxito */}
//         <ConfirmationModal
//           isOpen={showSuccessModal}
//           onConfirm={() => setShowSuccessModal(false)}
//           title="Operación Exitosa"
//           message={successMessage}
//           confirmText="Aceptar"
//           confirmColor="bg-green-500 hover:bg-green-600"
//           showButtonCancel={false}
//         />
//       </div>

//       {/* Modal de confirmación para cerrar sesión */}
//       <ConfirmationModal
//         isOpen={showLogoutConfirm}
//         onClose={() => setShowLogoutConfirm(false)}
//         onConfirm={handleLogout}
//         title="Cerrar Sesión"
//         message="¿Está seguro de que desea cerrar la sesión actual?"
//         confirmText="Cerrar Sesión"
//         confirmColor="bg-[#f44144] hover:bg-red-600"
//       />
//     </div>
//   )
// }

// // Componente para el modal de detalle de escala
// const ScaleDetailModal = ({ escala, isOpen, onClose }) => {
//   const modalRef = useRef(null)

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (modalRef.current && !modalRef.current.contains(event.target)) {
//         onClose()
//       }
//     }

//     if (isOpen) {
//       document.addEventListener("mousedown", handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside)
//     }
//   }, [isOpen, onClose])

//   if (!isOpen || !escala) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[80vh] overflow-y-auto">
//         <div className="p-4">
//           <h2 className="text-xl font-bold text-center text-[#1f384c] mb-4">DETALLE ESCALA DE VALORACIÓN</h2>

//           <div className="grid grid-cols-2 gap-4 mb-6">
//             <div className="flex">
//               <div className="w-1/3 font-medium text-base">Fecha Inicial:</div>
//               <div className="w-2/3 text-base text-gray-500">{escala.fechaInicial}</div>
//             </div>

//             <div className="flex">
//               <div className="w-1/2 font-medium text-base">Fecha Final:</div>
//               <div className="w-1/2 text-base text-gray-500">{escala.fechaFinal}</div>
//             </div>

//             <div className="flex">
//               <div className="w-1/3 font-medium text-base">Rango Inicial:</div>
//               <div className="w-2/3 text-base text-gray-500">{escala.rangoInicial}%</div>
//             </div>

//             <div className="flex">
//               <div className="w-1/2 font-medium text-base">Rango Final:</div>
//               <div className="w-1/2 text-base text-gray-500">{escala.rangoFinal}%</div>
//             </div>

//             <div className="flex">
//               <div className="w-1/3 font-medium text-base">Valoración:</div>
//               <div className="w-2/3 text-base text-gray-500">
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     escala.valoracion === "Aprueba" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {escala.valoracion}
//                 </span>
//               </div>
//             </div>

//             <div className="flex">
//               <div className="w-1/2 font-medium text-base">Aprueba a partir de:</div>
//               <div className="w-1/2 text-base text-gray-500">{escala.apruebaPorcentaje || 70}%</div>
//             </div>
//           </div>

//           <h3 className="text-lg font-medium mb-3">Descripción</h3>

//           <div className="bg-gray-50 p-4 rounded-lg mb-6">
//             <p className="text-gray-700 text-sm">{escala.descripcion}</p>
//           </div>

//           <h3 className="text-lg font-medium mb-3">Métricas de Valoración</h3>

//           <div className="bg-gray-50 p-4 rounded-lg mb-6">
//             <div className="space-y-2">
//               {escala.metricas &&
//                 escala.metricas.map((metrica) => (
//                   <div key={metrica.id} className="flex items-center justify-between">
//                     <span className="text-sm">
//                       {metrica.rangoInicial}% — {metrica.rangoFinal}%: {metrica.concepto}
//                     </span>
//                   </div>
//                 ))}
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <button
//               onClick={onClose}
//               className="bg-[#f44144] text-white py-2 px-6 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
//             >
//               Cerrar
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Scale
"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, Plus, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import { useAuth } from "../../auth/hooks/useAuth"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// Datos de ejemplo
const escalasData = [
  {
    id: 1,
    fechaInicial: "20-10-2023",
    fechaFinal: "20-10-2026",
    rangoInicial: 1,
    rangoFinal: 69,
    valoracion: "No aprueba",
    descripcion:
      "Rango de valoración para calificaciones insuficientes. Los estudiantes que obtengan una calificación en este rango deberán realizar actividades de refuerzo.",
    metricas: [
      { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
      { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
      { id: 3, rangoInicial: 70, rangoFinal: 100, concepto: "Excelente" },
    ],
    apruebaPorcentaje: 70,
  },
  {
    id: 2,
    fechaInicial: "20-10-2020",
    fechaFinal: "20-10-2026",
    rangoInicial: 70,
    rangoFinal: 90,
    valoracion: "Aprueba",
    descripcion:
      "Rango de valoración para calificaciones satisfactorias. Los estudiantes que obtengan una calificación en este rango han demostrado un dominio adecuado de los contenidos.",
    metricas: [
      { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
      { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
      { id: 3, rangoInicial: 70, rangoFinal: 100, concepto: "Excelente" },
    ],
    apruebaPorcentaje: 70,
  },
  {
    id: 3,
    fechaInicial: "20-10-2024",
    fechaFinal: "20-10-2026",
    rangoInicial: 70,
    rangoFinal: 80,
    valoracion: "No aprueba",
    descripcion:
      "Rango de valoración especial para evaluaciones de nivel avanzado. A pesar de estar en un rango normalmente aprobatorio, en este contexto se requiere un desempeño superior.",
    metricas: [
      { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
      { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
      { id: 3, rangoInicial: 70, rangoFinal: 100, concepto: "Excelente" },
    ],
    apruebaPorcentaje: 80,
  },
  {
    id: 4,
    fechaInicial: "20-10-2021",
    fechaFinal: "20-10-2026",
    rangoInicial: 70,
    rangoFinal: 75,
    valoracion: "Aprueba",
    descripcion:
      "Rango de valoración para calificaciones mínimas aprobatorias. Los estudiantes en este rango han cumplido con los requisitos básicos del curso.",
    metricas: [
      { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
      { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
      { id: 3, rangoInicial: 70, rangoFinal: 100, concepto: "Excelente" },
    ],
    apruebaPorcentaje: 70,
  },
  {
    id: 5,
    fechaInicial: "20-10-2022",
    fechaFinal: "20-10-2026",
    rangoInicial: 70,
    rangoFinal: 100,
    valoracion: "No aprueba",
    descripcion:
      "Rango de valoración especial para evaluaciones de certificación internacional. Requiere revisión adicional independientemente del puntaje obtenido.",
    metricas: [
      { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
      { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
      { id: 3, rangoInicial: 70, rangoFinal: 100, concepto: "Excelente" },
    ],
    apruebaPorcentaje: 80,
  },
  {
    id: 6,
    fechaInicial: "20-03-2023",
    fechaFinal: "20-0-2026",
    rangoInicial: 70,
    rangoFinal: 85,
    valoracion: "No aprueba",
    descripcion:
      "Rango de valoración para evaluaciones de nivel experto. Se requiere un desempeño excepcional para aprobar este tipo de evaluaciones.",
    metricas: [
      { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
      { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
      { id: 3, rangoInicial: 70, rangoFinal: 100, concepto: "Excelente" },
    ],
    apruebaPorcentaje: 80,
  },
  {
    id: 7,
    fechaInicial: "20-02-2022",
    fechaFinal: "20-10-2026",
    rangoInicial: 70,
    rangoFinal: 95,
    valoracion: "Aprueba",
    descripcion:
      "Rango de valoración para calificaciones en cursos de nivelación. Los estudiantes en este rango han demostrado un progreso significativo.",
    metricas: [
      { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
      { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
      { id: 3, rangoInicial: 70, rangoFinal: 100, concepto: "Excelente" },
    ],
    apruebaPorcentaje: 70,
  },
]

// Actualizar la definición de columnas para usar apruebaPorcentaje en lugar de rangoInicial
const columns = [
  { key: "fechaInicial", label: "Fecha Inicial" },
  { key: "fechaFinal", label: "Fecha Final" },
  {
    key: "apruebaPorcentaje",
    label: "Rango Aprobatorio",
    render: (item) => `${item.apruebaPorcentaje || item.rangoInicial}%`,
  },
]

const Scale = () => {
  const [selectedEscala, setSelectedEscala] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [itemToDelete, setItemToDelete] = useState(null)
  const [successMessage, setSuccessMessage] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [scales, setScales] = useState([...escalasData])
  const { logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  // Formulario para crear/editar
  const [formData, setFormData] = useState({
    fechaInicial: "",
    fechaFinal: "",
    rangoInicial: "",
    rangoFinal: "",
    valoracion: "Aprueba",
    descripcion: "",
    metricas: [
      { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
      { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
      { id: 3, rangoInicial: 80, rangoFinal: 100, concepto: "Excelente" },
    ],
    apruebaPorcentaje: 80,
  })

  // Nueva métrica temporal
  const [newMetrica, setNewMetrica] = useState({
    rangoInicial: 75,
    rangoFinal: 100,
    concepto: "Deficiente",
  })

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

  const handleShowEscala = (escala) => {
    setSelectedEscala(escala)
    setIsDetailModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
  }

  const handleAddScale = () => {
    setFormData({
      fechaInicial: "",
      fechaFinal: "",
      rangoInicial: "",
      rangoFinal: "",
      valoracion: "Aprueba",
      descripcion: "",
      metricas: [
        { id: 1, rangoInicial: 0, rangoFinal: 40, concepto: "No cumple" },
        { id: 2, rangoInicial: 40, rangoFinal: 70, concepto: "Deficiente" },
        { id: 3, rangoInicial: 80, rangoFinal: 100, concepto: "Excelente" },
      ],
      apruebaPorcentaje: 80,
    })
    setNewMetrica({
      rangoInicial: 75,
      rangoFinal: 100,
      concepto: "Deficiente",
    })
    setIsCreateModalOpen(true)
  }

  const handleEditScale = (scale) => {
    setSelectedEscala(scale)
    setFormData({
      fechaInicial: scale.fechaInicial,
      fechaFinal: scale.fechaFinal,
      rangoInicial: scale.rangoInicial,
      rangoFinal: scale.rangoFinal,
      valoracion: scale.valoracion,
      descripcion: scale.descripcion,
      metricas: [...scale.metricas],
      apruebaPorcentaje: scale.apruebaPorcentaje,
    })
    setIsEditModalOpen(true)
  }

  const handleDeleteScale = (id) => {
    setItemToDelete(id)
    setShowDeleteConfirm(true)
  }

  const confirmDeleteScale = () => {
    try {
      // Eliminar de la lista local
      const updatedScales = scales.filter((s) => s.id !== itemToDelete)
      setScales(updatedScales)

      // Mostrar mensaje de éxito
      setSuccessMessage("Escala eliminada exitosamente")
      setShowSuccessModal(true)
    } catch (error) {
      console.error("Error al eliminar la escala:", error)
      setSuccessMessage("Ocurrió un error al eliminar la escala")
      setShowSuccessModal(true)
    } finally {
      setShowDeleteConfirm(false)
      setItemToDelete(null)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]:
        name === "rangoInicial" || name === "rangoFinal" || name === "apruebaPorcentaje"
          ? Number.parseInt(value) || ""
          : value,
    })
  }

  const handleNewMetricaChange = (e) => {
    const { name, value } = e.target
    setNewMetrica({
      ...newMetrica,
      [name]: name === "rangoInicial" || name === "rangoFinal" ? Number.parseInt(value) || "" : value,
    })
  }

  const handleToggleValoracion = () => {
    setFormData({
      ...formData,
      valoracion: formData.valoracion === "Aprueba" ? "No aprueba" : "Aprueba",
    })
  }

  const handleAddMetrica = () => {
    // Validar que los rangos no se superpongan
    const newId = Math.max(...formData.metricas.map((m) => m.id), 0) + 1
    const newMetricaWithId = { ...newMetrica, id: newId }

    setFormData({
      ...formData,
      metricas: [...formData.metricas, newMetricaWithId],
    })

    // Resetear la nueva métrica
    setNewMetrica({
      rangoInicial: 0,
      rangoFinal: 0,
      concepto: "",
    })
  }

  const handleDeleteMetrica = (id) => {
    const updatedMetricas = formData.metricas.filter((m) => m.id !== id)
    setFormData({
      ...formData,
      metricas: updatedMetricas,
    })
  }

  const handleCreateSubmit = (e) => {
    e.preventDefault()
    const newScale = {
      id: Math.max(...scales.map((s) => s.id)) + 1,
      ...formData,
      // Asegurarse de que apruebaPorcentaje esté definido
      apruebaPorcentaje: formData.apruebaPorcentaje || formData.rangoInicial,
    }
    setScales([...scales, newScale])
    setIsCreateModalOpen(false)
    setSuccessMessage("Escala creada exitosamente")
    setShowSuccessModal(true)
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    const updatedScales = scales.map((scale) => (scale.id === selectedEscala.id ? { ...scale, ...formData } : scale))
    setScales(updatedScales)
    setIsEditModalOpen(false)
    setSuccessMessage("Escala actualizada exitosamente")
    setShowSuccessModal(true)
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">ESCALA DE VALORACIÓN</h1>
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
        <GenericTable
          data={scales}
          columns={columns}
          onShow={handleShowEscala}
          onAdd={handleAddScale}
          onEdit={handleEditScale}
          onDelete={handleDeleteScale}
          showActions={{ show: true, edit: true, delete: true, add: true }}
          addButtonText="Añadir Escala"
        />

        {selectedEscala && (
          <ScaleDetailModal escala={selectedEscala} isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} />
        )}

        {/* Create Scale Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[80vh] overflow-auto">
              <div className="p-4">
                <h2 className="text-xl font-bold text-[#1f384c] mb-4">CREAR ESCALA DE VALORACIÓN</h2>

                <form onSubmit={handleCreateSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial*</label>
                      <input
                        type="Date"
                        name="fechaInicial"
                        value={formData.fechaInicial}
                        onChange={handleInputChange}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final*</label>
                      <input
                        type="Date"
                        name="fechaFinal"
                        value={formData.fechaFinal}
                        onChange={handleInputChange}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                    {/* <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.valoracion === "Aprueba"}
                            onChange={handleToggleValoracion}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
                          <span className="ml-3 text-sm font-medium text-gray-700">{formData.valoracion}</span>
                        </label>
                      </div>
                    </div> */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Aprueba a partir de (%)*</label>
                      <input
                        type="number"
                        name="apruebaPorcentaje"
                        value={formData.apruebaPorcentaje}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Descripción de la escala de valoración..."
                    ></textarea>
                  </div>

                  {/* Sección para añadir métricas de valoración */}
                  <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-medium mb-4 text-center">Añadir Métrica de Valoración:</h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial</label>
                        <input
                          type="text"
                          value={formData.fechaInicial}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final</label>
                        <input
                          type="text"
                          value={formData.fechaFinal}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
                        />
                      </div>
                      {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
                        <input
                          type="text"
                          value={formData.valoracion}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
                        />
                      </div> */}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 items-end">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rango Inicial</label>
                        <input
                          type="number"
                          name="rangoInicial"
                          value={newMetrica.rangoInicial}
                          onChange={handleNewMetricaChange}
                          min="0"
                          max="100"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rango Final</label>
                        <input
                          type="number"
                          name="rangoFinal"
                          value={newMetrica.rangoFinal}
                          onChange={handleNewMetricaChange}
                          min="0"
                          max="100"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
                        <div className="flex items-center">
                          <input
                            type="text"
                            name="concepto"
                            value={newMetrica.concepto}
                            onChange={handleNewMetricaChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          />
                          <button
                            type="button"
                            onClick={handleAddMetrica}
                            className="ml-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-gray-300 my-4"></div>

                    <div className="text-center mb-2">
                      <span className="text-sm font-medium">Aprueba a partir = {formData.apruebaPorcentaje}%</span>
                    </div>

                    {/* Lista de métricas */}
                    <div className="space-y-2">
                      {formData.metricas.map((metrica) => (
                        <div key={metrica.id} className="flex items-center justify-between">
                          <span className="text-sm">
                            {metrica.rangoInicial}% — {metrica.rangoFinal}%: {metrica.concepto}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteMetrica(metrica.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setIsCreateModalOpen(false)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                    >
                      Añadir
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Edit Scale Modal */}
        {isEditModalOpen && selectedEscala && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[80vh] overflow-auto">
              <div className="p-4">
                <h2 className="text-xl font-bold text-[#1f384c] mb-4">EDITAR ESCALA DE VALORACIÓN</h2>

                <form onSubmit={handleEditSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial*</label>
                      <input
                        type="Date"
                        name="fechaInicial"
                        value={formData.fechaInicial}
                        onChange={handleInputChange}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final*</label>
                      <input
                        type="Date"
                        name="fechaFinal"
                        value={formData.fechaFinal}
                        onChange={handleInputChange}
                        placeholder="DD/MM/YYYY"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                    {/* <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.valoracion === "Aprueba"}
                            onChange={handleToggleValoracion}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
                          <span className="ml-3 text-sm font-medium text-gray-700">{formData.valoracion}</span>
                        </label>
                      </div>
                    </div> */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Aprueba a partir de (%)*</label>
                      <input
                        type="number"
                        name="apruebaPorcentaje"
                        value={formData.apruebaPorcentaje}
                        onChange={handleInputChange}
                        min="0"
                        max="100"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                    <textarea
                      name="descripcion"
                      value={formData.descripcion}
                      onChange={handleInputChange}
                      rows="3"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Descripción de la escala de valoración..."
                    ></textarea>
                  </div>

                  {/* Sección para añadir métricas de valoración */}
                  <div className="border border-gray-200 rounded-lg p-4 mb-6">
                    <h3 className="text-lg font-medium mb-4 text-center">Añadir Métrica de Valoración:</h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicial</label>
                        <input
                          type="text"
                          value={formData.fechaInicial}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Final</label>
                        <input
                          type="text"
                          value={formData.fechaFinal}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
                        />
                      </div>
                      {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Valoración</label>
                        <input
                          type="text"
                          value={formData.valoracion}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50"
                        />
                      </div> */}
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4 items-end">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rango Inicial</label>
                        <input
                          type="number"
                          name="rangoInicial"
                          value={newMetrica.rangoInicial}
                          onChange={handleNewMetricaChange}
                          min="0"
                          max="100"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rango Final</label>
                        <input
                          type="number"
                          name="rangoFinal"
                          value={newMetrica.rangoFinal}
                          onChange={handleNewMetricaChange}
                          min="0"
                          max="100"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Concepto</label>
                        <div className="flex items-center">
                          <input
                            type="text"
                            name="concepto"
                            value={newMetrica.concepto}
                            onChange={handleNewMetricaChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                          />
                          <button
                            type="button"
                            onClick={handleAddMetrica}
                            className="ml-2 bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                          >
                            <Plus className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-dashed border-gray-300 my-4"></div>

                    <div className="text-center mb-2">
                      <span className="text-sm font-medium">Aprueba a partir = {formData.apruebaPorcentaje}%</span>
                    </div>

                    {/* Lista de métricas */}
                    <div className="space-y-2">
                      {formData.metricas.map((metrica) => (
                        <div key={metrica.id} className="flex items-center justify-between">
                          <span className="text-sm">
                            {metrica.rangoInicial}% — {metrica.rangoFinal}%: {metrica.concepto}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleDeleteMetrica(metrica.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Modal de confirmación para eliminar escala */}
        <ConfirmationModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={confirmDeleteScale}
          title="Eliminar Escala"
          message="¿Está seguro que desea eliminar esta escala de valoración? Esta acción no se puede deshacer."
          confirmText="Eliminar"
          confirmColor="bg-[#f44144] hover:bg-red-600"
        />

        {/* Modal de éxito */}
        <ConfirmationModal
          isOpen={showSuccessModal}
          onConfirm={() => setShowSuccessModal(false)}
          title="Operación Exitosa"
          message={successMessage}
          confirmText="Aceptar"
          confirmColor="bg-green-500 hover:bg-green-600"
          showButtonCancel={false}
        />
      </div>

      {/* Modal de confirmación para cerrar sesión */}
      <ConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Cerrar Sesión"
        message="¿Está seguro de que desea cerrar la sesión actual?"
        confirmText="Cerrar Sesión"
        confirmColor="bg-[#f44144] hover:bg-red-600"
      />
    </div>
  )
}

// Componente para el modal de detalle de escala
const ScaleDetailModal = ({ escala, isOpen, onClose }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !escala) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-4 max-h-[80vh] overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xl font-bold text-center text-[#1f384c] mb-4">DETALLE ESCALA DE VALORACIÓN</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex">
              <div className="w-1/3 font-medium text-base">Fecha Inicial:</div>
              <div className="w-2/3 text-base text-gray-500">{escala.fechaInicial}</div>
            </div>

            <div className="flex">
              <div className="w-1/2 font-medium text-base">Fecha Final:</div>
              <div className="w-1/2 text-base text-gray-500">{escala.fechaFinal}</div>
            </div>

            <div className="flex">
              <div className="w-1/3 font-medium text-base">Rango Inicial:</div>
              <div className="w-2/3 text-base text-gray-500">{escala.rangoInicial}%</div>
            </div>

            <div className="flex">
              <div className="w-1/2 font-medium text-base">Rango Final:</div>
              <div className="w-1/2 text-base text-gray-500">{escala.rangoFinal}%</div>
            </div>

            {/* <div className="flex">
              <div className="w-1/3 font-medium text-base">Valoración:</div>
              <div className="w-2/3 text-base text-gray-500">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    escala.valoracion === "Aprueba" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {escala.valoracion}
                </span>
              </div>
            </div> */}

            <div className="flex">
              <div className="w-1/2 font-medium text-base">Aprueba a partir de:</div>
              <div className="w-1/2 text-base text-gray-500">{escala.apruebaPorcentaje || 70}%</div>
            </div>
          </div>

          <h3 className="text-lg font-medium mb-3">Descripción</h3>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-700 text-sm">{escala.descripcion}</p>
          </div>

          <h3 className="text-lg font-medium mb-3">Métricas de Valoración</h3>

          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <div className="space-y-2">
              {escala.metricas &&
                escala.metricas.map((metrica) => (
                  <div key={metrica.id} className="flex items-center justify-between">
                    <span className="text-sm">
                      {metrica.rangoInicial}% — {metrica.rangoFinal}%: {metrica.concepto}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="bg-[#f44144] text-white py-2 px-6 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Scale
