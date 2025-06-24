// // // // // // "use client"

// // // // // // import { useState, useRef, useEffect } from "react"
// // // // // // import { ChevronDown, Plus, RefreshCw } from "lucide-react"
// // // // // // import { useNavigate } from "react-router-dom"
// // // // // // import GenericTable from "../../../shared/components/Table"
// // // // // // import { useAuth } from "../../auth/hooks/useAuth"
// // // // // // import ConfirmationModal from "../../../shared/components/ConfirmationModal"
// // // // // // import ProgramDetailModal from "./ProgramDetailModal"
// // // // // // import ProgramForm from "../componentes/ProgramForm"
// // // // // // import MassiveUpdateModal from "../componentes/MassiveUpdateModal"
// // // // // // import Tooltip from "../../../shared/components/Tooltip"
// // // // // // import LoadingSpinner from "../../../shared/components/LoadingSpinner"
// // // // // // import ErrorMessage from "../../../shared/components/ErrorMessage"

// // // // // // // Hooks
// // // // // // import { useGetPrograms } from "../hooks/useGetPrograms"
// // // // // // import { usePostProgram } from "../hooks/usePostProgram"
// // // // // // import { usePutProgram } from "../hooks/usePutProgram"
// // // // // // import { useDeleteProgram } from "../hooks/useDeleteProgram"

// // // // // // const columns = [
// // // // // //   { key: "name", label: "Nombre" },
// // // // // //   { key: "code", label: "Código" },
// // // // // //   {
// // // // // //     key: "fk_level",
// // // // // //     label: "Nivel",
// // // // // //     render: (item) => {
// // // // // //       const levelMap = {
// // // // // //         TECNICO: "Técnico",
// // // // // //         TECNÓLOGO: "Tecnólogo",
// // // // // //         ESPECIALIZACION: "Especialización",
// // // // // //         AUXILIAR: "Auxiliar",
// // // // // //         OPERARIO: "Operario",
// // // // // //       }
// // // // // //       return levelMap[item.fk_level] || item.fk_level
// // // // // //     },
// // // // // //   },
// // // // // //   {
// // // // // //     key: "fk_modality",
// // // // // //     label: "Modalidad",
// // // // // //     render: (item) => {
// // // // // //       const modalityMap = {
// // // // // //         PRESENCIAL: "Presencial",
// // // // // //         "A DISTANCIA": "A Distancia",
// // // // // //         VIRTUAL: "Virtual",
// // // // // //         COMBINADO: "Combinado",
// // // // // //       }
// // // // // //       return modalityMap[item.fk_modality] || item.fk_modality
// // // // // //     },
// // // // // //   },
// // // // // //   {
// // // // // //     key: "version",
// // // // // //     label: "Versión",
// // // // // //     render: (item) => item.version || "N/A",
// // // // // //   },
// // // // // //   {
// // // // // //     key: "status",
// // // // // //     label: "Estado",
// // // // // //     render: (item) => (
// // // // // //       <span
// // // // // //         className={`px-2 py-1 rounded-full text-xs font-medium ${
// // // // // //           item.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// // // // // //         }`}
// // // // // //       >
// // // // // //         {item.status ? "Activo" : "Inactivo"}
// // // // // //       </span>
// // // // // //     ),
// // // // // //   },
// // // // // // ]

// // // // // // export default function Programs() {
// // // // // //   // Estados principales
// // // // // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// // // // // //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// // // // // //   const [selectedProgram, setSelectedProgram] = useState(null)
// // // // // //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
// // // // // //   const [isFormModalOpen, setIsFormModalOpen] = useState(false)
// // // // // //   const [isMassiveUpdateModalOpen, setIsMassiveUpdateModalOpen] = useState(false)
// // // // // //   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
// // // // // //   const [programToDelete, setProgramToDelete] = useState(null)

// // // // // //   // Hooks
// // // // // //   const { logout } = useAuth()
// // // // // //   const navigate = useNavigate()
// // // // // //   const dropdownRef = useRef(null)

// // // // // //   // Hooks de datos
// // // // // //   const { programs, loading, error, refetch } = useGetPrograms()
// // // // // //   const { createProgram, loading: createLoading } = usePostProgram()
// // // // // //   const { updateProgram, loading: updateLoading } = usePutProgram()
// // // // // //   const { deleteProgram, loading: deleteLoading } = useDeleteProgram()

// // // // // //   // Efectos
// // // // // //   useEffect(() => {
// // // // // //     const handleClickOutside = (event) => {
// // // // // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// // // // // //         setIsDropdownOpen(false)
// // // // // //       }
// // // // // //     }

// // // // // //     document.addEventListener("mousedown", handleClickOutside)
// // // // // //     return () => document.removeEventListener("mousedown", handleClickOutside)
// // // // // //   }, [])

// // // // // //   // Handlers de autenticación
// // // // // //   const handleLogoutClick = () => {
// // // // // //     setIsDropdownOpen(false)
// // // // // //     setShowLogoutConfirm(true)
// // // // // //   }

// // // // // //   const handleLogout = () => {
// // // // // //     logout()
// // // // // //     navigate("/login")
// // // // // //   }

// // // // // //   // Handlers de modales
// // // // // //   const handleOpenDetailModal = (program) => {
// // // // // //     setSelectedProgram(program)
// // // // // //     setIsDetailModalOpen(true)
// // // // // //   }

// // // // // //   const handleCloseDetailModal = () => {
// // // // // //     setSelectedProgram(null)
// // // // // //     setIsDetailModalOpen(false)
// // // // // //   }

// // // // // //   const handleOpenFormModal = (program = null) => {
// // // // // //     setSelectedProgram(program)
// // // // // //     setIsFormModalOpen(true)
// // // // // //   }

// // // // // //   const handleCloseFormModal = () => {
// // // // // //     setSelectedProgram(null)
// // // // // //     setIsFormModalOpen(false)
// // // // // //   }

// // // // // //   const handleOpenMassiveUpdateModal = () => {
// // // // // //     setIsMassiveUpdateModalOpen(true)
// // // // // //   }

// // // // // //   const handleCloseMassiveUpdateModal = () => {
// // // // // //     setIsMassiveUpdateModalOpen(false)
// // // // // //   }

// // // // // //   // Handlers CRUD
// // // // // //   const handleSubmitForm = async (formData) => {
// // // // // //     try {
// // // // // //       if (selectedProgram) {
// // // // // //         await updateProgram(selectedProgram._id, formData)
// // // // // //       } else {
// // // // // //         await createProgram(formData)
// // // // // //       }
// // // // // //       handleCloseFormModal()
// // // // // //       refetch()
// // // // // //     } catch (error) {
// // // // // //       console.error("Error submitting form:", error)
// // // // // //     }
// // // // // //   }

// // // // // //   const handleDeleteClick = (program) => {
// // // // // //     setProgramToDelete(program)
// // // // // //     setIsDeleteModalOpen(true)
// // // // // //   }

// // // // // //   const handleConfirmDelete = async () => {
// // // // // //     if (programToDelete) {
// // // // // //       try {
// // // // // //         await deleteProgram(programToDelete._id)
// // // // // //         setIsDeleteModalOpen(false)
// // // // // //         setProgramToDelete(null)
// // // // // //         refetch()
// // // // // //       } catch (error) {
// // // // // //         console.error("Error deleting program:", error)
// // // // // //       }
// // // // // //     }
// // // // // //   }

// // // // // //   const handleMassiveUpdateComplete = (results) => {
// // // // // //     console.log("Massive update completed:", results)
// // // // // //     refetch() // Recargar la lista de programas
// // // // // //   }

// // // // // //   // Renderizado condicional para estados de carga y error
// // // // // //   if (loading) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // // //         <LoadingSpinner />
// // // // // //       </div>
// // // // // //     )
// // // // // //   }

// // // // // //   if (error) {
// // // // // //     return (
// // // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // // //         <div className="text-center">
// // // // // //           <ErrorMessage message={error} />
// // // // // //           <button
// // // // // //             onClick={refetch}
// // // // // //             className="mt-4 px-4 py-2 bg-[#1f384c] text-white rounded-lg hover:bg-[#2d4a5c] transition-colors"
// // // // // //           >
// // // // // //             Reintentar
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>
// // // // // //     )
// // // // // //   }

// // // // // //   return (
// // // // // //     <div className="min-h-screen">
// // // // // //       {/* Header */}
// // // // // //       <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
// // // // // //         <div className="container mx-auto flex justify-between items-center">
// // // // // //           <h1 className="text-2xl font-bold text-[#1f384c]">PROGRAMAS</h1>
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

// // // // // //       {/* Contenido principal */}
// // // // // //       <div className="container mx-auto px-6">
// // // // // //         {/* Botones de acción */}
// // // // // //         <div className="flex justify-between items-center mb-6">
// // // // // //           <div className="flex gap-3">
// // // // // //             <Tooltip text="Crear nuevo programa">
// // // // // //               <button
// // // // // //                 onClick={() => handleOpenFormModal()}
// // // // // //                 className="flex items-center gap-2 px-4 py-2 bg-[#1f384c] text-white rounded-lg hover:bg-[#2d4a5c] transition-colors"
// // // // // //               >
// // // // // //                 <Plus className="w-4 h-4" />
// // // // // //                 Nuevo Programa
// // // // // //               </button>
// // // // // //             </Tooltip>

// // // // // //             <Tooltip text="Sincronización masiva desde API externa">
// // // // // //               <button
// // // // // //                 onClick={handleOpenMassiveUpdateModal}
// // // // // //                 className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
// // // // // //               >
// // // // // //                 <RefreshCw className="w-4 h-4" />
// // // // // //                 Sincronización Masiva
// // // // // //               </button>
// // // // // //             </Tooltip>
// // // // // //           </div>

// // // // // //           <div className="text-sm text-gray-600">Total: {programs.length} programas</div>
// // // // // //         </div>

// // // // // //         {/* Tabla */}
// // // // // //         <GenericTable
// // // // // //           data={programs}
// // // // // //           columns={columns}
// // // // // //           onShow={handleOpenDetailModal}
// // // // // //           onEdit={handleOpenFormModal}
// // // // // //           onDelete={handleDeleteClick}
// // // // // //           title=""
// // // // // //           showActions={{
// // // // // //             show: true,
// // // // // //             edit: true,
// // // // // //             delete: true,
// // // // // //           }}
// // // // // //         />
// // // // // //       </div>

// // // // // //       {/* Modales */}

// // // // // //       {/* Modal de detalle */}
// // // // // //       <ProgramDetailModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} program={selectedProgram} />

// // // // // //       {/* Modal de formulario */}
// // // // // //       <ProgramForm
// // // // // //         isOpen={isFormModalOpen}
// // // // // //         onClose={handleCloseFormModal}
// // // // // //         onSubmit={handleSubmitForm}
// // // // // //         program={selectedProgram}
// // // // // //         loading={createLoading || updateLoading}
// // // // // //       />

// // // // // //       {/* Modal de actualización masiva */}
// // // // // //       <MassiveUpdateModal
// // // // // //         isOpen={isMassiveUpdateModalOpen}
// // // // // //         onClose={handleCloseMassiveUpdateModal}
// // // // // //         onComplete={handleMassiveUpdateComplete}
// // // // // //       />

// // // // // //       {/* Modal de confirmación de eliminación */}
// // // // // //       <ConfirmationModal
// // // // // //         isOpen={isDeleteModalOpen}
// // // // // //         onClose={() => setIsDeleteModalOpen(false)}
// // // // // //         onConfirm={handleConfirmDelete}
// // // // // //         title="Eliminar Programa"
// // // // // //         message={`¿Está seguro de que desea eliminar el programa "${programToDelete?.name}"? Esta acción no se puede deshacer.`}
// // // // // //         confirmText="Eliminar"
// // // // // //         confirmColor="bg-red-600 hover:bg-red-700"
// // // // // //         loading={deleteLoading}
// // // // // //       />

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
// // // // // "use client"

// // // // // import { useState, useRef, useEffect } from "react"
// // // // // import { ChevronDown, Search } from "lucide-react"
// // // // // import { useNavigate } from "react-router-dom"
// // // // // import GenericTable from "../../../shared/components/Table"
// // // // // import { useAuth } from "../../auth/hooks/useAuth"
// // // // // import ConfirmationModal from "../../../shared/components/ConfirmationModal"
// // // // // import ProgramDetailModal from "./ProgramDetailModal"
// // // // // import LoadingSpinner from "../../../shared/components/LoadingSpinner"
// // // // // import ErrorMessage from "../../../shared/components/ErrorMessage"

// // // // // // Hooks
// // // // // import { useGetPrograms } from "../hooks/useGetPrograms"

// // // // // const columns = [
// // // // //   { key: "name", label: "Nombre" },
// // // // //   { key: "code", label: "Código" },
// // // // //   {
// // // // //     key: "fk_level",
// // // // //     label: "Nivel",
// // // // //     render: (item) => {
// // // // //       const levelMap = {
// // // // //         TECNICO: "Técnico",
// // // // //         TECNÓLOGO: "Tecnólogo",
// // // // //         ESPECIALIZACION: "Especialización",
// // // // //         AUXILIAR: "Auxiliar",
// // // // //         OPERARIO: "Operario",
// // // // //       }
// // // // //       return levelMap[item.fk_level] || item.fk_level
// // // // //     },
// // // // //   },
// // // // //   {
// // // // //     key: "fk_modality",
// // // // //     label: "Modalidad",
// // // // //     render: (item) => {
// // // // //       const modalityMap = {
// // // // //         PRESENCIAL: "Presencial",
// // // // //         "A DISTANCIA": "A Distancia",
// // // // //         VIRTUAL: "Virtual",
// // // // //         COMBINADO: "Combinado",
// // // // //       }
// // // // //       return modalityMap[item.fk_modality] || item.fk_modality
// // // // //     },
// // // // //   },
// // // // //   {
// // // // //     key: "version",
// // // // //     label: "Versión",
// // // // //     render: (item) => item.version || "N/A",
// // // // //   },
// // // // //   {
// // // // //     key: "status",
// // // // //     label: "Estado",
// // // // //     render: (item) => (
// // // // //       <span
// // // // //         className={`px-2 py-1 rounded-full text-xs font-medium ${
// // // // //           item.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// // // // //         }`}
// // // // //       >
// // // // //         {item.status ? "Activo" : "Inactivo"}
// // // // //       </span>
// // // // //     ),
// // // // //   },
// // // // // ]

// // // // // export default function Programs() {
// // // // //   // Estados principales
// // // // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// // // // //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// // // // //   const [selectedProgram, setSelectedProgram] = useState(null)
// // // // //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
// // // // //   const [searchTerm, setSearchTerm] = useState("")

// // // // //   // Hooks
// // // // //   const { logout } = useAuth()
// // // // //   const navigate = useNavigate()
// // // // //   const dropdownRef = useRef(null)

// // // // //   // Hooks de datos
// // // // //   const { programs, loading, error, refetch } = useGetPrograms()

// // // // //   // Efectos
// // // // //   useEffect(() => {
// // // // //     const handleClickOutside = (event) => {
// // // // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// // // // //         setIsDropdownOpen(false)
// // // // //       }
// // // // //     }

// // // // //     document.addEventListener("mousedown", handleClickOutside)
// // // // //     return () => document.removeEventListener("mousedown", handleClickOutside)
// // // // //   }, [])

// // // // //   // Handlers de autenticación
// // // // //   const handleLogoutClick = () => {
// // // // //     setIsDropdownOpen(false)
// // // // //     setShowLogoutConfirm(true)
// // // // //   }

// // // // //   const handleLogout = () => {
// // // // //     logout()
// // // // //     navigate("/login")
// // // // //   }

// // // // //   // Handlers de modales
// // // // //   const handleOpenDetailModal = (program) => {
// // // // //     setSelectedProgram(program)
// // // // //     setIsDetailModalOpen(true)
// // // // //   }

// // // // //   const handleCloseDetailModal = () => {
// // // // //     setSelectedProgram(null)
// // // // //     setIsDetailModalOpen(false)
// // // // //   }

// // // // //   // Filtrar programas por búsqueda
// // // // //   const filteredPrograms = programs.filter((program) => {
// // // // //     if (!searchTerm) return true

// // // // //     const searchLower = searchTerm.toLowerCase()
// // // // //     return (
// // // // //       program.name?.toLowerCase().includes(searchLower) ||
// // // // //       program.code?.toLowerCase().includes(searchLower) ||
// // // // //       program.fk_level?.toLowerCase().includes(searchLower) ||
// // // // //       program.fk_modality?.toLowerCase().includes(searchLower)
// // // // //     )
// // // // //   })

// // // // //   // Renderizado condicional para estados de carga y error
// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // //         <LoadingSpinner />
// // // // //       </div>
// // // // //     )
// // // // //   }

// // // // //   if (error) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center">
// // // // //         <div className="text-center">
// // // // //           <ErrorMessage message={error} />
// // // // //           <button
// // // // //             onClick={refetch}
// // // // //             className="mt-4 px-4 py-2 bg-[#1f384c] text-white rounded-lg hover:bg-[#2d4a5c] transition-colors"
// // // // //           >
// // // // //             Reintentar
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>
// // // // //     )
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen">
// // // // //       {/* Header */}
// // // // //       <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
// // // // //         <div className="container mx-auto flex justify-between items-center">
// // // // //           <h1 className="text-2xl font-bold text-[#1f384c]">PROGRAMAS</h1>
// // // // //           <div className="relative" ref={dropdownRef}>
// // // // //             <button
// // // // //               onClick={() => setIsDropdownOpen(!isDropdownOpen)}
// // // // //               className="flex items-center gap-2 text-[#1f384c] font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
// // // // //             >
// // // // //               <span>Administrador</span>
// // // // //               <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
// // // // //             </button>

// // // // //             {isDropdownOpen && (
// // // // //               <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
// // // // //                 <button
// // // // //                   onClick={handleLogoutClick}
// // // // //                   className="w-full text-left px-4 py-2 text-[#f44144] hover:bg-gray-50 rounded-lg"
// // // // //                 >
// // // // //                   Cerrar Sesión
// // // // //                 </button>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>

// // // // //       {/* Contenido principal */}
// // // // //       <div className="container mx-auto px-6">
// // // // //         {/* Barra de búsqueda y contador */}
// // // // //         <div className="flex justify-between items-center mb-6">
// // // // //           <div className="relative flex-1 max-w-md">
// // // // //             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// // // // //             <input
// // // // //               type="text"
// // // // //               placeholder="Buscar programas..."
// // // // //               value={searchTerm}
// // // // //               onChange={(e) => setSearchTerm(e.target.value)}
// // // // //               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f384c] focus:border-transparent"
// // // // //             />
// // // // //           </div>

// // // // //           <div className="text-sm text-gray-600">
// // // // //             {searchTerm ? (
// // // // //               <>
// // // // //                 Mostrando {filteredPrograms.length} de {programs.length} programas
// // // // //               </>
// // // // //             ) : (
// // // // //               <>Total: {programs.length} programas</>
// // // // //             )}
// // // // //           </div>
// // // // //         </div>

// // // // //         {/* Tabla */}
// // // // //         <GenericTable
// // // // //           data={filteredPrograms}
// // // // //           columns={columns}
// // // // //           onShow={handleOpenDetailModal}
// // // // //           title=""
// // // // //           showActions={{
// // // // //             show: true,
// // // // //             edit: false,
// // // // //             delete: false,
// // // // //           }}
// // // // //         />
// // // // //       </div>

// // // // //       {/* Modal de detalle */}
// // // // //       <ProgramDetailModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} program={selectedProgram} />

// // // // //       {/* Modal de confirmación para cerrar sesión */}
// // // // //       <ConfirmationModal
// // // // //         isOpen={showLogoutConfirm}
// // // // //         onClose={() => setShowLogoutConfirm(false)}
// // // // //         onConfirm={handleLogout}
// // // // //         title="Cerrar Sesión"
// // // // //         message="¿Está seguro de que desea cerrar la sesión actual?"
// // // // //         confirmText="Cerrar Sesión"
// // // // //         confirmColor="bg-[#f44144] hover:bg-red-600"
// // // // //       />
// // // // //     </div>
// // // // //   )
// // // // // }
// // // // "use client"

// // // // import { useState, useRef, useEffect } from "react"
// // // // import { ChevronDown, Search, RefreshCw } from "lucide-react"
// // // // import { useNavigate } from "react-router-dom"
// // // // import GenericTable from "../../../shared/components/Table"
// // // // import { useAuth } from "../../auth/hooks/useAuth"
// // // // import ConfirmationModal from "../../../shared/components/ConfirmationModal"
// // // // import ProgramDetailModal from "./ProgramDetailModal"
// // // // import MassiveUpdateModal from "../componentes/MassiveUpdateModal"
// // // // import LoadingSpinner from "../../../shared/components/LoadingSpinner"
// // // // import ErrorMessage from "../../../shared/components/ErrorMessage"
// // // // import Tooltip from "../../../shared/components/Tooltip"

// // // // // Hooks
// // // // import { useGetPrograms } from "../hooks/useGetPrograms"

// // // // const columns = [
// // // //   { key: "name", label: "Nombre" },
// // // //   { key: "code", label: "Código" },
// // // //   {
// // // //     key: "fk_level",
// // // //     label: "Nivel",
// // // //     render: (item) => {
// // // //       const levelMap = {
// // // //         TECNICO: "Técnico",
// // // //         TECNÓLOGO: "Tecnólogo",
// // // //         ESPECIALIZACION: "Especialización",
// // // //         AUXILIAR: "Auxiliar",
// // // //         OPERARIO: "Operario",
// // // //       }
// // // //       return levelMap[item.fk_level] || item.fk_level
// // // //     },
// // // //   },
// // // //   {
// // // //     key: "fk_modality",
// // // //     label: "Modalidad",
// // // //     render: (item) => {
// // // //       const modalityMap = {
// // // //         PRESENCIAL: "Presencial",
// // // //         "A DISTANCIA": "A Distancia",
// // // //         VIRTUAL: "Virtual",
// // // //         COMBINADO: "Combinado",
// // // //       }
// // // //       return modalityMap[item.fk_modality] || item.fk_modality
// // // //     },
// // // //   },
// // // //   {
// // // //     key: "version",
// // // //     label: "Versión",
// // // //     render: (item) => item.version || "N/A",
// // // //   },
// // // //   {
// // // //     key: "status",
// // // //     label: "Estado",
// // // //     render: (item) => (
// // // //       <span
// // // //         className={`px-2 py-1 rounded-full text-xs font-medium ${
// // // //           item.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// // // //         }`}
// // // //       >
// // // //         {item.status ? "Activo" : "Inactivo"}
// // // //       </span>
// // // //     ),
// // // //   },
// // // // ]

// // // // export default function Programs() {
// // // //   // Estados principales
// // // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// // // //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// // // //   const [selectedProgram, setSelectedProgram] = useState(null)
// // // //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
// // // //   const [isMassiveUpdateModalOpen, setIsMassiveUpdateModalOpen] = useState(false)
// // // //   const [searchTerm, setSearchTerm] = useState("")

// // // //   // Hooks
// // // //   const { logout } = useAuth()
// // // //   const navigate = useNavigate()
// // // //   const dropdownRef = useRef(null)

// // // //   // Hooks de datos
// // // //   const { programs, loading, error, refetch } = useGetPrograms()

// // // //   // Efectos
// // // //   useEffect(() => {
// // // //     const handleClickOutside = (event) => {
// // // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// // // //         setIsDropdownOpen(false)
// // // //       }
// // // //     }

// // // //     document.addEventListener("mousedown", handleClickOutside)
// // // //     return () => document.removeEventListener("mousedown", handleClickOutside)
// // // //   }, [])

// // // //   // Handlers de autenticación
// // // //   const handleLogoutClick = () => {
// // // //     setIsDropdownOpen(false)
// // // //     setShowLogoutConfirm(true)
// // // //   }

// // // //   const handleLogout = () => {
// // // //     logout()
// // // //     navigate("/login")
// // // //   }

// // // //   // Handlers de modales
// // // //   const handleOpenDetailModal = (program) => {
// // // //     setSelectedProgram(program)
// // // //     setIsDetailModalOpen(true)
// // // //   }

// // // //   const handleCloseDetailModal = () => {
// // // //     setSelectedProgram(null)
// // // //     setIsDetailModalOpen(false)
// // // //   }

// // // //   const handleOpenMassiveUpdateModal = () => {
// // // //     setIsMassiveUpdateModalOpen(true)
// // // //   }

// // // //   const handleCloseMassiveUpdateModal = () => {
// // // //     setIsMassiveUpdateModalOpen(false)
// // // //   }

// // // //   const handleMassiveUpdateComplete = (results) => {
// // // //     console.log("Massive update completed:", results)
// // // //     refetch() // Recargar la lista de programas
// // // //   }

// // // //   // Filtrar programas por búsqueda
// // // //   const filteredPrograms = programs.filter((program) => {
// // // //     if (!searchTerm) return true

// // // //     const searchLower = searchTerm.toLowerCase()
// // // //     return (
// // // //       program.name?.toLowerCase().includes(searchLower) ||
// // // //       program.code?.toLowerCase().includes(searchLower) ||
// // // //       program.fk_level?.toLowerCase().includes(searchLower) ||
// // // //       program.fk_modality?.toLowerCase().includes(searchLower)
// // // //     )
// // // //   })

// // // //   // Renderizado condicional para estados de carga y error
// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center">
// // // //         <LoadingSpinner />
// // // //       </div>
// // // //     )
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <ErrorMessage message={error} />
// // // //           <button
// // // //             onClick={refetch}
// // // //             className="mt-4 px-4 py-2 bg-[#1f384c] text-white rounded-lg hover:bg-[#2d4a5c] transition-colors"
// // // //           >
// // // //             Reintentar
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen">
// // // //       {/* Header */}
// // // //       <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
// // // //         <div className="container mx-auto flex justify-between items-center">
// // // //           <h1 className="text-2xl font-bold text-[#1f384c]">PROGRAMAS</h1>
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

// // // //       {/* Contenido principal */}
// // // //       <div className="container mx-auto px-6">
// // // //         {/* Barra de búsqueda, botón de actualización masiva y contador */}
// // // //         <div className="flex justify-between items-center mb-6">
// // // //           <div className="flex items-center gap-4">
// // // //             <div className="relative flex-1 max-w-md">
// // // //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// // // //               <input
// // // //                 type="text"
// // // //                 placeholder="Buscar programas..."
// // // //                 value={searchTerm}
// // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f384c] focus:border-transparent"
// // // //               />
// // // //             </div>

// // // //             <Tooltip text="Sincronización masiva desde API externa">
// // // //               <button
// // // //                 onClick={handleOpenMassiveUpdateModal}
// // // //                 className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
// // // //               >
// // // //                 <RefreshCw className="w-4 h-4" />
// // // //                 Sincronización Masiva
// // // //               </button>
// // // //             </Tooltip>
// // // //           </div>

// // // //           <div className="text-sm text-gray-600">
// // // //             {searchTerm ? (
// // // //               <>
// // // //                 Mostrando {filteredPrograms.length} de {programs.length} programas
// // // //               </>
// // // //             ) : (
// // // //               <>Total: {programs.length} programas</>
// // // //             )}
// // // //           </div>
// // // //         </div>

// // // //         {/* Tabla */}
// // // //         <GenericTable
// // // //           data={filteredPrograms}
// // // //           columns={columns}
// // // //           onShow={handleOpenDetailModal}
// // // //           title=""
// // // //           showActions={{
// // // //             show: true,
// // // //             edit: false,
// // // //             delete: false,
// // // //           }}
// // // //         />
// // // //       </div>

// // // //       {/* Modal de detalle */}
// // // //       <ProgramDetailModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} program={selectedProgram} />

// // // //       {/* Modal de actualización masiva */}
// // // //       <MassiveUpdateModal
// // // //         isOpen={isMassiveUpdateModalOpen}
// // // //         onClose={handleCloseMassiveUpdateModal}
// // // //         onComplete={handleMassiveUpdateComplete}
// // // //       />

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
// // // "use client"

// // // import { useState, useRef, useEffect } from "react"
// // // import { ChevronDown, Search } from "lucide-react"
// // // import { useNavigate } from "react-router-dom"
// // // import GenericTable from "../../../shared/components/Table"
// // // import { useAuth } from "../../auth/hooks/useAuth"
// // // import ConfirmationModal from "../../../shared/components/ConfirmationModal"
// // // import ProgramDetailModal from "./ProgramDetailModal"
// // // import LoadingSpinner from "../../../shared/components/LoadingSpinner"
// // // import ErrorMessage from "../../../shared/components/ErrorMessage"

// // // // Hooks
// // // import { useGetPrograms } from "../hooks/useGetPrograms"

// // // const columns = [
// // //   { key: "name", label: "Nombre" },
// // //   { key: "code", label: "Código" },
// // //   {
// // //     key: "fk_level",
// // //     label: "Nivel",
// // //     render: (item) => {
// // //       const levelMap = {
// // //         TECNICO: "Técnico",
// // //         TECNÓLOGO: "Tecnólogo",
// // //         ESPECIALIZACION: "Especialización",
// // //         AUXILIAR: "Auxiliar",
// // //         OPERARIO: "Operario",
// // //       }
// // //       return levelMap[item.fk_level] || item.fk_level
// // //     },
// // //   },
// // //   {
// // //     key: "fk_modality",
// // //     label: "Modalidad",
// // //     render: (item) => {
// // //       const modalityMap = {
// // //         PRESENCIAL: "Presencial",
// // //         "A DISTANCIA": "A Distancia",
// // //         VIRTUAL: "Virtual",
// // //         COMBINADO: "Combinado",
// // //       }
// // //       return modalityMap[item.fk_modality] || item.fk_modality
// // //     },
// // //   },
// // //   {
// // //     key: "version",
// // //     label: "Versión",
// // //     render: (item) => item.version || "N/A",
// // //   },
// // //   {
// // //     key: "status",
// // //     label: "Estado",
// // //     render: (item) => (
// // //       <span
// // //         className={`px-2 py-1 rounded-full text-xs font-medium ${
// // //           item.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// // //         }`}
// // //       >
// // //         {item.status ? "Activo" : "Inactivo"}
// // //       </span>
// // //     ),
// // //   },
// // // ]

// // // export default function Programs() {
// // //   // Estados principales
// // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// // //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// // //   const [selectedProgram, setSelectedProgram] = useState(null)
// // //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
// // //   const [searchTerm, setSearchTerm] = useState("")

// // //   // Hooks
// // //   const { logout } = useAuth()
// // //   const navigate = useNavigate()
// // //   const dropdownRef = useRef(null)

// // //   // Hooks de datos
// // //   const { programs, loading, error, refetch } = useGetPrograms()

// // //   // Efectos
// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// // //         setIsDropdownOpen(false)
// // //       }
// // //     }

// // //     document.addEventListener("mousedown", handleClickOutside)
// // //     return () => document.removeEventListener("mousedown", handleClickOutside)
// // //   }, [])

// // //   // Handlers de autenticación
// // //   const handleLogoutClick = () => {
// // //     setIsDropdownOpen(false)
// // //     setShowLogoutConfirm(true)
// // //   }

// // //   const handleLogout = () => {
// // //     logout()
// // //     navigate("/login")
// // //   }

// // //   // Handlers de modales
// // //   const handleOpenDetailModal = (program) => {
// // //     setSelectedProgram(program)
// // //     setIsDetailModalOpen(true)
// // //   }

// // //   const handleCloseDetailModal = () => {
// // //     setSelectedProgram(null)
// // //     setIsDetailModalOpen(false)
// // //   }

// // //   // Filtrar programas por búsqueda
// // //   const filteredPrograms = programs.filter((program) => {
// // //     if (!searchTerm) return true

// // //     const searchLower = searchTerm.toLowerCase()
// // //     return (
// // //       program.name?.toLowerCase().includes(searchLower) ||
// // //       program.code?.toLowerCase().includes(searchLower) ||
// // //       program.fk_level?.toLowerCase().includes(searchLower) ||
// // //       program.fk_modality?.toLowerCase().includes(searchLower)
// // //     )
// // //   })

// // //   // Renderizado condicional para estados de carga y error
// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <LoadingSpinner />
// // //       </div>
// // //     )
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center">
// // //         <div className="text-center">
// // //           <ErrorMessage message={error} />
// // //           <button
// // //             onClick={refetch}
// // //             className="mt-4 px-4 py-2 bg-[#1f384c] text-white rounded-lg hover:bg-[#2d4a5c] transition-colors"
// // //           >
// // //             Reintentar
// // //           </button>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <div className="min-h-screen">
// // //       {/* Header */}
// // //       <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
// // //         <div className="container mx-auto flex justify-between items-center">
// // //           <h1 className="text-2xl font-bold text-[#1f384c]">PROGRAMAS</h1>
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

// // //       {/* Contenido principal */}
// // //       <div className="container mx-auto px-6">
// // //         {/* Barra de búsqueda y contador */}
// // //         <div className="flex justify-between items-center mb-6">
// // //           <div className="relative flex-1 max-w-md">
// // //             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// // //             <input
// // //               type="text"
// // //               placeholder="Buscar programas..."
// // //               value={searchTerm}
// // //               onChange={(e) => setSearchTerm(e.target.value)}
// // //               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f384c] focus:border-transparent"
// // //             />
// // //           </div>

// // //           <div className="text-sm text-gray-600">
// // //             {searchTerm ? (
// // //               <>
// // //                 Mostrando {filteredPrograms.length} de {programs.length} programas
// // //               </>
// // //             ) : (
// // //               <>Total: {programs.length} programas</>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Tabla */}
// // //         <GenericTable
// // //           data={filteredPrograms}
// // //           columns={columns}
// // //           onShow={handleOpenDetailModal}
// // //           title=""
// // //           showActions={{
// // //             show: true,
// // //             edit: false,
// // //             delete: false,
// // //           }}
// // //         />
// // //       </div>

// // //       {/* Modal de detalle */}
// // //       <ProgramDetailModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} program={selectedProgram} />

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


// // "use client"

// // import { useState, useRef, useEffect } from "react"
// // import { ChevronDown, Search, RefreshCw } from "lucide-react"
// // import { useNavigate } from "react-router-dom"
// // import GenericTable from "../../../shared/components/Table"
// // import { useAuth } from "../../auth/hooks/useAuth"
// // import ConfirmationModal from "../../../shared/components/ConfirmationModal"
// // import ProgramDetailModal from "./ProgramDetailModal"
// // import MassiveUpdateModal from "../componentes/MassiveUpdateModal"
// // import LoadingSpinner from "../../../shared/components/LoadingSpinner"
// // import ErrorMessage from "../../../shared/components/ErrorMessage"
// // import Tooltip from "../../../shared/components/Tooltip"

// // // Hooks
// // import { useGetPrograms } from "../hooks/useGetPrograms"

// // const columns = [
// //   { key: "name", label: "Nombre" },
// //   { key: "code", label: "Código" },
// //   {
// //     key: "fk_level",
// //     label: "Nivel",
// //     render: (item) => {
// //       const levelMap = {
// //         TECNICO: "Técnico",
// //         TECNÓLOGO: "Tecnólogo",
// //         ESPECIALIZACION: "Especialización",
// //         AUXILIAR: "Auxiliar",
// //         OPERARIO: "Operario",
// //       }
// //       return levelMap[item.fk_level] || item.fk_level
// //     },
// //   },
// //   {
// //     key: "fk_modality",
// //     label: "Modalidad",
// //     render: (item) => {
// //       const modalityMap = {
// //         PRESENCIAL: "Presencial",
// //         "A DISTANCIA": "A Distancia",
// //         VIRTUAL: "Virtual",
// //         COMBINADO: "Combinado",
// //       }
// //       return modalityMap[item.fk_modality] || item.fk_modality
// //     },
// //   },
// //   {
// //     key: "version",
// //     label: "Versión",
// //     render: (item) => item.version || "N/A",
// //   },
// //   {
// //     key: "status",
// //     label: "Estado",
// //     render: (item) => (
// //       <span
// //         className={`px-2 py-1 rounded-full text-xs font-medium ${
// //           item.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// //         }`}
// //       >
// //         {item.status ? "Activo" : "Inactivo"}
// //       </span>
// //     ),
// //   },
// // ]

// // export default function Programs() {
// //   // Estados principales
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// //   const [selectedProgram, setSelectedProgram] = useState(null)
// //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
// //   const [isMassiveUpdateModalOpen, setIsMassiveUpdateModalOpen] = useState(false)
// //   const [searchTerm, setSearchTerm] = useState("")

// //   // Hooks
// //   const { logout } = useAuth()
// //   const navigate = useNavigate()
// //   const dropdownRef = useRef(null)

// //   // Hooks de datos
// //   const { programs, loading, error, refetch } = useGetPrograms()

// //   // Efectos
// //   useEffect(() => {
// //     const handleClickOutside = (event) => {
// //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //         setIsDropdownOpen(false)
// //       }
// //     }

// //     document.addEventListener("mousedown", handleClickOutside)
// //     return () => document.removeEventListener("mousedown", handleClickOutside)
// //   }, [])

// //   // Handlers de autenticación
// //   const handleLogoutClick = () => {
// //     setIsDropdownOpen(false)
// //     setShowLogoutConfirm(true)
// //   }

// //   const handleLogout = () => {
// //     logout()
// //     navigate("/login")
// //   }

// //   // Handlers de modales
// //   const handleOpenDetailModal = (program) => {
// //     setSelectedProgram(program)
// //     setIsDetailModalOpen(true)
// //   }

// //   const handleCloseDetailModal = () => {
// //     setSelectedProgram(null)
// //     setIsDetailModalOpen(false)
// //   }

// //   const handleOpenMassiveUpdateModal = () => {
// //     setIsMassiveUpdateModalOpen(true)
// //   }

// //   const handleCloseMassiveUpdateModal = () => {
// //     setIsMassiveUpdateModalOpen(false)
// //   }

// //   const handleMassiveUpdateComplete = (results) => {
// //     console.log("Massive update completed:", results)
// //     refetch() // Recargar la lista de programas
// //   }

// //   // Filtrar programas por búsqueda
// //   const filteredPrograms = programs.filter((program) => {
// //     if (!searchTerm) return true

// //     const searchLower = searchTerm.toLowerCase()
// //     return (
// //       program.name?.toLowerCase().includes(searchLower) ||
// //       program.code?.toLowerCase().includes(searchLower) ||
// //       program.fk_level?.toLowerCase().includes(searchLower) ||
// //       program.fk_modality?.toLowerCase().includes(searchLower)
// //     )
// //   })

// //   // Renderizado condicional para estados de carga y error
// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <LoadingSpinner />
// //       </div>
// //     )
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="text-center">
// //           <ErrorMessage message={error} />
// //           <button
// //             onClick={refetch}
// //             className="mt-4 px-4 py-2 bg-[#1f384c] text-white rounded-lg hover:bg-[#2d4a5c] transition-colors"
// //           >
// //             Reintentar
// //           </button>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen">
// //       {/* Header */}
// //       <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
// //         <div className="container mx-auto flex justify-between items-center">
// //           <h1 className="text-2xl font-bold text-[#1f384c]">PROGRAMAS</h1>
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

// //       {/* Contenido principal */}
// //       <div className="container mx-auto px-6">
// //         {/* Barra de búsqueda, botón de actualización masiva y contador */}
// //         <div className="flex justify-between items-center mb-6">
// //           <div className="flex items-center gap-4">
// //             <div className="relative flex-1 max-w-md">
// //               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// //               <input
// //                 type="text"
// //                 placeholder="Buscar programas..."
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f384c] focus:border-transparent"
// //               />
// //             </div>

// //             <Tooltip text="Sincronización masiva desde API externa">
// //               <button
// //                 onClick={handleOpenMassiveUpdateModal}
// //                 className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
// //               >
// //                 <RefreshCw className="w-4 h-4" />
// //                 Sincronización Masiva
// //               </button>
// //             </Tooltip>
// //           </div>

// //           <div className="text-sm text-gray-600">
// //             {searchTerm ? (
// //               <>
// //                 Mostrando {filteredPrograms.length} de {programs.length} programas
// //               </>
// //             ) : (
// //               <>Total: {programs.length} programas</>
// //             )}
// //           </div>
// //         </div>

// //         {/* Tabla */}
// //         <GenericTable
// //           data={filteredPrograms}
// //           columns={columns}
// //           onShow={handleOpenDetailModal}
// //           title=""
// //           showActions={{
// //             show: true,
// //             edit: false,
// //             delete: false,
// //           }}
// //         />
// //       </div>

// //       {/* Modal de detalle */}
// //       <ProgramDetailModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} program={selectedProgram} />

// //       {/* Modal de actualización masiva */}
// //       <MassiveUpdateModal
// //         isOpen={isMassiveUpdateModalOpen}
// //         onClose={handleCloseMassiveUpdateModal}
// //         onComplete={handleMassiveUpdateComplete}
// //       />

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
// "use client"

// import { useState, useRef, useEffect } from "react"
// import { ChevronDown, RefreshCw } from "lucide-react"
// import { useNavigate } from "react-router-dom"
// import GenericTable from "../../../shared/components/Table"
// import { useAuth } from "../../auth/hooks/useAuth"
// import ConfirmationModal from "../../../shared/components/ConfirmationModal"
// import ProgramDetailModal from "./ProgramDetailModal"
// import MassiveUpdateModal from "../componentes/MassiveUpdateModal"
// import Tooltip from "../../../shared/components/Tooltip"
// import LoadingSpinner from "../../../shared/components/LoadingSpinner"
// import ErrorMessage from "../../../shared/components/ErrorMessage"

// // Hooks
// import { useGetPrograms } from "../hooks/useGetPrograms"

// const columns = [
//   { key: "name", label: "Nombre" },
//   { key: "code", label: "Código" },
//   {
//     key: "fk_level",
//     label: "Nivel",
//     render: (item) => {
//       const levelMap = {
//         TECNICO: "Técnico",
//         TECNÓLOGO: "Tecnólogo",
//         ESPECIALIZACION: "Especialización",
//         AUXILIAR: "Auxiliar",
//         OPERARIO: "Operario",
//       }
//       return levelMap[item.fk_level] || item.fk_level
//     },
//   },
//   {
//     key: "fk_modality",
//     label: "Modalidad",
//     render: (item) => {
//       const modalityMap = {
//         PRESENCIAL: "Presencial",
//         "A DISTANCIA": "A Distancia",
//         VIRTUAL: "Virtual",
//         COMBINADO: "Combinado",
//       }
//       return modalityMap[item.fk_modality] || item.fk_modality
//     },
//   },
//   {
//     key: "version",
//     label: "Versión",
//     render: (item) => item.version || "N/A",
//   },
//   {
//     key: "status",
//     label: "Estado",
//     render: (item) => (
//       <span
//         className={`px-2 py-1 rounded-full text-xs font-medium ${
//           item.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//         }`}
//       >
//         {item.status ? "Activo" : "Inactivo"}
//       </span>
//     ),
//   },
// ]

// export default function Programs() {
//   // Estados principales
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
//   const [selectedProgram, setSelectedProgram] = useState(null)
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
//   const [isMassiveUpdateModalOpen, setIsMassiveUpdateModalOpen] = useState(false)

//   // Hooks
//   const { logout } = useAuth()
//   const navigate = useNavigate()
//   const dropdownRef = useRef(null)

//   // Hooks de datos
//   const { programs, loading, error, refetch } = useGetPrograms()

//   // Efectos
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   // Handlers de autenticación
//   const handleLogoutClick = () => {
//     setIsDropdownOpen(false)
//     setShowLogoutConfirm(true)
//   }

//   const handleLogout = () => {
//     logout()
//     navigate("/login")
//   }

//   // Handlers de modales
//   const handleOpenDetailModal = (program) => {
//     setSelectedProgram(program)
//     setIsDetailModalOpen(true)
//   }

//   const handleCloseDetailModal = () => {
//     setSelectedProgram(null)
//     setIsDetailModalOpen(false)
//   }

//   const handleOpenMassiveUpdateModal = () => {
//     setIsMassiveUpdateModalOpen(true)
//   }

//   const handleCloseMassiveUpdateModal = () => {
//     setIsMassiveUpdateModalOpen(false)
//   }

//   const handleMassiveUpdateComplete = (results) => {
//     console.log("Massive update completed:", results)
//     refetch() // Recargar la lista de programas
//   }

//   // Renderizado condicional para estados de carga y error
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <LoadingSpinner />
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <ErrorMessage message={error} />
//           <button
//             onClick={refetch}
//             className="mt-4 px-4 py-2 bg-[#1f384c] text-white rounded-lg hover:bg-[#2d4a5c] transition-colors"
//           >
//             Reintentar
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen">
//       {/* Header */}
//       <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-[#1f384c]">PROGRAMAS</h1>
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

//       {/* Contenido principal */}
//       <div className="container mx-auto px-6">
//         {/* Botones de acción */}
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex gap-3">
//             <Tooltip text="Sincronización masiva desde API externa">
//               <button
//                 onClick={handleOpenMassiveUpdateModal}
//                 className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//               >
//                 <RefreshCw className="w-4 h-4" />
//                 Sincronización Masiva
//               </button>
//             </Tooltip>
//           </div>

//           <div className="text-sm text-gray-600">Total: {programs.length} programas</div>
//         </div>

//         {/* Tabla */}
//         <GenericTable
//           data={programs}
//           columns={columns}
//           onShow={handleOpenDetailModal}
//           title=""
//           showActions={{
//             show: true,
//             edit: false,
//             delete: false,
//           }}
//         />
//       </div>

//       {/* Modal de detalle */}
//       <ProgramDetailModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} program={selectedProgram} />

//       {/* Modal de actualización masiva */}
//       <MassiveUpdateModal
//         isOpen={isMassiveUpdateModalOpen}
//         onClose={handleCloseMassiveUpdateModal}
//         onComplete={handleMassiveUpdateComplete}
//       />

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
"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, RefreshCw } from "lucide-react"
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import { useAuth } from "../../auth/hooks/useAuth"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"
import ProgramDetailModal from "./ProgramDetailModal"
import MassiveUpdateModal from "../componentes/MassiveUpdateModal"

// Hooks
import { useGetPrograms } from "../hooks/useGetPrograms"

const columns = [
  { key: "name", label: "Nombre" },
  { key: "code", label: "Código" },
  {
    key: "fk_level",
    label: "Nivel",
    render: (item) => {
      const levelMap = {
        TECNICO: "Técnico",
        TECNÓLOGO: "Tecnólogo",
        ESPECIALIZACION: "Especialización",
        AUXILIAR: "Auxiliar",
        OPERARIO: "Operario",
      }
      return levelMap[item.fk_level] || item.fk_level
    },
  },
  {
    key: "fk_modality",
    label: "Modalidad",
    render: (item) => {
      const modalityMap = {
        PRESENCIAL: "Presencial",
        "A DISTANCIA": "A Distancia",
        VIRTUAL: "Virtual",
        COMBINADO: "Combinado",
      }
      return modalityMap[item.fk_modality] || item.fk_modality
    },
  },
  {
    key: "version",
    label: "Versión",
    render: (item) => item.version || "N/A",
  },
  {
    key: "status",
    label: "Estado",
    render: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {item.status ? "Activo" : "Inactivo"}
      </span>
    ),
  },
]

export default function Programs() {
  // Estados principales
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [selectedProgram, setSelectedProgram] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [showMassiveUpdateModal, setShowMassiveUpdateModal] = useState(false)

  // Hooks
  const { logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  // Hooks de datos
  const { programs, loading, error, refetch } = useGetPrograms()

  // Efectos
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handlers de autenticación
  const handleLogoutClick = () => {
    setIsDropdownOpen(false)
    setShowLogoutConfirm(true)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  // Handlers de modales
  const handleShowProgram = (program) => {
    setSelectedProgram(program)
    setIsDetailModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedProgram(null)
  }

  const handleMassiveUpdate = () => {
    setShowMassiveUpdateModal(true)
  }

  const handleMassiveUpdateComplete = (results) => {
    console.log("Actualización masiva completada:", results)
    // Refrescar la lista de programas
    refetch()
  }

  // Renderizado condicional para estados de carga y error
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f384c] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando programas...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Programas</h1>
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
        {/* Mostrar errores si los hay */}
        {error && <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

        {/* Botón de Actualización Masiva */}
        <div className="mb-6 flex justify-end">
          <button
            onClick={handleMassiveUpdate}
            className="flex items-center gap-2 bg-[#1f384c] text-white px-4 py-2 rounded-lg hover:bg-[#2a4a5e] transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Actualización Masiva
          </button>
        </div>

        <GenericTable
          data={programs}
          columns={columns}
          onShow={handleShowProgram}
          title="LISTA DE PROGRAMAS"
          showActions={{ show: true, edit: false, delete: false, add: false }}
          tooltipText="Ver detalle del programa"
        />

        {/* Modal de detalle del programa */}
        {selectedProgram && (
          <ProgramDetailModal program={selectedProgram} isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} />
        )}

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

        {/* Modal de actualización masiva */}
        <MassiveUpdateModal
          isOpen={showMassiveUpdateModal}
          onClose={() => setShowMassiveUpdateModal(false)}
          onComplete={handleMassiveUpdateComplete}
        />
      </div>
    </div>
  )
}
