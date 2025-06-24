// // // // "use client"

// // // // import { useState, useEffect } from "react"
// // // // import Modal from "../../../shared/components/Modal"

// // // // const ProgramDetailModal = ({ isOpen, onClose, program }) => {
// // // //   const [programData, setProgramData] = useState(null)
// // // //   const [loading, setLoading] = useState(true)

// // // //   useEffect(() => {
// // // //     if (program) {
// // // //       setProgramData(program)
// // // //       setLoading(false)
// // // //     } else if (isOpen) {
// // // //       setLoading(false)
// // // //     }
// // // //   }, [program, isOpen])

// // // //   const formatLevel = (level) => {
// // // //     const levelMap = {
// // // //       TECNICO: "Técnico",
// // // //       TECNÓLOGO: "Tecnólogo",
// // // //       ESPECIALIZACION: "Especialización",
// // // //       AUXILIAR: "Auxiliar",
// // // //       OPERARIO: "Operario",
// // // //     }
// // // //     return levelMap[level] || level
// // // //   }

// // // //   const formatModality = (modality) => {
// // // //     const modalityMap = {
// // // //       PRESENCIAL: "Presencial",
// // // //       "A DISTANCIA": "A Distancia",
// // // //       VIRTUAL: "Virtual",
// // // //       COMBINADO: "Combinado",
// // // //     }
// // // //     return modalityMap[modality] || modality
// // // //   }

// // // //   return (
// // // //     <Modal isOpen={isOpen} onClose={onClose} title="Detalle del Programa">
// // // //       {loading ? (
// // // //         <div className="flex justify-center items-center h-64">
// // // //           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1f384c]"></div>
// // // //         </div>
// // // //       ) : programData ? (
// // // //         <div className="p-4">
// // // //           <h2 className="text-xl font-bold mb-4 text-[#1f384c]">{programData.name}</h2>

// // // //           <div className="mb-6">
// // // //             <h3 className="text-lg font-semibold mb-3 text-gray-800">Información General</h3>
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //               <div className="bg-gray-50 p-3 rounded-lg">
// // // //                 <p className="text-gray-600 text-sm font-medium">Código:</p>
// // // //                 <p className="text-gray-900 font-semibold">{programData.code}</p>
// // // //               </div>
// // // //               <div className="bg-gray-50 p-3 rounded-lg">
// // // //                 <p className="text-gray-600 text-sm font-medium">Nivel:</p>
// // // //                 <p className="text-gray-900 font-semibold">{formatLevel(programData.fk_level)}</p>
// // // //               </div>
// // // //               <div className="bg-gray-50 p-3 rounded-lg">
// // // //                 <p className="text-gray-600 text-sm font-medium">Modalidad:</p>
// // // //                 <p className="text-gray-900 font-semibold">{formatModality(programData.fk_modality)}</p>
// // // //               </div>
// // // //               <div className="bg-gray-50 p-3 rounded-lg">
// // // //                 <p className="text-gray-600 text-sm font-medium">Estado:</p>
// // // //                 <span
// // // //                   className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
// // // //                     programData.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// // // //                   }`}
// // // //                 >
// // // //                   {programData.status ? "Activo" : "Inactivo"}
// // // //                 </span>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {(programData.abbreviation || programData.version) && (
// // // //             <div className="mb-6">
// // // //               <h3 className="text-lg font-semibold mb-3 text-gray-800">Información Adicional</h3>
// // // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                 {programData.abbreviation && (
// // // //                   <div className="bg-gray-50 p-3 rounded-lg">
// // // //                     <p className="text-gray-600 text-sm font-medium">Abreviación:</p>
// // // //                     <p className="text-gray-900 font-semibold">{programData.abbreviation}</p>
// // // //                   </div>
// // // //                 )}
// // // //                 {programData.version && (
// // // //                   <div className="bg-gray-50 p-3 rounded-lg">
// // // //                     <p className="text-gray-600 text-sm font-medium">Versión:</p>
// // // //                     <p className="text-gray-900 font-semibold">{programData.version}</p>
// // // //                   </div>
// // // //                 )}
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           {programData.description && (
// // // //             <div className="mb-6">
// // // //               <h3 className="text-lg font-semibold mb-2 text-gray-800">Descripción</h3>
// // // //               <div className="bg-gray-50 p-3 rounded-lg">
// // // //                 <p className="text-gray-700">{programData.description}</p>
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           {programData.duration && (
// // // //             <div className="mb-6">
// // // //               <h3 className="text-lg font-semibold mb-2 text-gray-800">Duración</h3>
// // // //               <div className="bg-gray-50 p-3 rounded-lg">
// // // //                 <p className="text-gray-700">{programData.duration}</p>
// // // //               </div>
// // // //             </div>
// // // //           )}

// // // //           <div className="mb-4">
// // // //             <h3 className="text-lg font-semibold mb-2 text-gray-800">Información del Sistema</h3>
// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
// // // //               <div className="bg-gray-50 p-3 rounded-lg">
// // // //                 <p className="text-gray-600 font-medium">Creado:</p>
// // // //                 <p className="text-gray-700">
// // // //                   {programData.createdAt ? new Date(programData.createdAt).toLocaleDateString("es-ES") : "N/A"}
// // // //                 </p>
// // // //               </div>
// // // //               <div className="bg-gray-50 p-3 rounded-lg">
// // // //                 <p className="text-gray-600 font-medium">Última actualización:</p>
// // // //                 <p className="text-gray-700">
// // // //                   {programData.updatedAt ? new Date(programData.updatedAt).toLocaleDateString("es-ES") : "N/A"}
// // // //                 </p>
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           <div className="flex justify-end mt-6">
// // // //             <button
// // // //               onClick={onClose}
// // // //               className="px-4 py-2 bg-[#1f384c] text-white rounded-lg hover:bg-[#2d4a5c] transition-colors"
// // // //             >
// // // //               Cerrar
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       ) : (
// // // //         <div className="flex justify-center items-center h-64">
// // // //           <p className="text-gray-500">No se ha seleccionado ningún programa</p>
// // // //         </div>
// // // //       )}
// // // //     </Modal>
// // // //   )
// // // // }

// // // // export default ProgramDetailModal
// // // "use client"

// // // import { useState, useEffect } from "react"
// // // import Modal from "../../../shared/components/Modal"

// // // const ProgramDetailModal = ({ isOpen, onClose, program }) => {
// // //   const [programData, setProgramData] = useState(null)
// // //   const [loading, setLoading] = useState(true)

// // //   useEffect(() => {
// // //     if (program) {
// // //       setProgramData(program)
// // //       setLoading(false)
// // //     } else if (isOpen) {
// // //       setLoading(false)
// // //     }
// // //   }, [program, isOpen])

// // //   const formatLevel = (level) => {
// // //     const levelMap = {
// // //       TECNICO: "Técnico",
// // //       TECNÓLOGO: "Tecnólogo",
// // //       ESPECIALIZACION: "Especialización",
// // //       AUXILIAR: "Auxiliar",
// // //       OPERARIO: "Operario",
// // //     }
// // //     return levelMap[level] || level
// // //   }

// // //   const formatModality = (modality) => {
// // //     const modalityMap = {
// // //       PRESENCIAL: "Presencial",
// // //       "A DISTANCIA": "A Distancia",
// // //       VIRTUAL: "Virtual",
// // //       COMBINADO: "Combinado",
// // //     }
// // //     return modalityMap[modality] || modality
// // //   }

// // //   return (
// // //     <Modal isOpen={isOpen} onClose={onClose} title="Detalle del Programa">
// // //       {loading ? (
// // //         <div className="flex justify-center items-center h-64">
// // //           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1f384c]"></div>
// // //         </div>
// // //       ) : programData ? (
// // //         <div className="p-4">
// // //           <h2 className="text-xl font-bold mb-4 text-[#1f384c]">{programData.name}</h2>

// // //           <div className="mb-6">
// // //             <h3 className="text-lg font-semibold mb-3 text-gray-800">Información General</h3>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //               <div className="bg-gray-50 p-3 rounded-lg">
// // //                 <p className="text-gray-600 text-sm font-medium">Código:</p>
// // //                 <p className="text-gray-900 font-semibold">{programData.code}</p>
// // //               </div>
// // //               <div className="bg-gray-50 p-3 rounded-lg">
// // //                 <p className="text-gray-600 text-sm font-medium">Nivel:</p>
// // //                 <p className="text-gray-900 font-semibold">{formatLevel(programData.fk_level)}</p>
// // //               </div>
// // //               <div className="bg-gray-50 p-3 rounded-lg">
// // //                 <p className="text-gray-600 text-sm font-medium">Modalidad:</p>
// // //                 <p className="text-gray-900 font-semibold">{formatModality(programData.fk_modality)}</p>
// // //               </div>
// // //               <div className="bg-gray-50 p-3 rounded-lg">
// // //                 <p className="text-gray-600 text-sm font-medium">Estado:</p>
// // //                 <span
// // //                   className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
// // //                     programData.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// // //                   }`}
// // //                 >
// // //                   {programData.status ? "Activo" : "Inactivo"}
// // //                 </span>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           {(programData.abbreviation || programData.version) && (
// // //             <div className="mb-6">
// // //               <h3 className="text-lg font-semibold mb-3 text-gray-800">Información Adicional</h3>
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                 {programData.abbreviation && (
// // //                   <div className="bg-gray-50 p-3 rounded-lg">
// // //                     <p className="text-gray-600 text-sm font-medium">Abreviación:</p>
// // //                     <p className="text-gray-900 font-semibold">{programData.abbreviation}</p>
// // //                   </div>
// // //                 )}
// // //                 {programData.version && (
// // //                   <div className="bg-gray-50 p-3 rounded-lg">
// // //                     <p className="text-gray-600 text-sm font-medium">Versión:</p>
// // //                     <p className="text-gray-900 font-semibold">{programData.version}</p>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           )}

// // //           {programData.description && (
// // //             <div className="mb-6">
// // //               <h3 className="text-lg font-semibold mb-2 text-gray-800">Descripción</h3>
// // //               <div className="bg-gray-50 p-3 rounded-lg">
// // //                 <p className="text-gray-700">{programData.description}</p>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {programData.duration && (
// // //             <div className="mb-6">
// // //               <h3 className="text-lg font-semibold mb-2 text-gray-800">Duración</h3>
// // //               <div className="bg-gray-50 p-3 rounded-lg">
// // //                 <p className="text-gray-700">{programData.duration}</p>
// // //               </div>
// // //             </div>
// // //           )}

// // //           <div className="mb-4">
// // //             <h3 className="text-lg font-semibold mb-2 text-gray-800">Información del Sistema</h3>
// // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
// // //               <div className="bg-gray-50 p-3 rounded-lg">
// // //                 <p className="text-gray-600 font-medium">Creado:</p>
// // //                 <p className="text-gray-700">
// // //                   {programData.createdAt ? new Date(programData.createdAt).toLocaleDateString("es-ES") : "N/A"}
// // //                 </p>
// // //               </div>
// // //               <div className="bg-gray-50 p-3 rounded-lg">
// // //                 <p className="text-gray-600 font-medium">Última actualización:</p>
// // //                 <p className="text-gray-700">
// // //                   {programData.updatedAt ? new Date(programData.updatedAt).toLocaleDateString("es-ES") : "N/A"}
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div className="flex justify-end mt-6">
// // //             <button
// // //               onClick={onClose}
// // //               className="px-4 py-2 bg-[#1f384c] text-white rounded-lg hover:bg-[#2d4a5c] transition-colors"
// // //             >
// // //               Cerrar
// // //             </button>
// // //           </div>
// // //         </div>
// // //       ) : (
// // //         <div className="flex justify-center items-center h-64">
// // //           <p className="text-gray-500">No se ha seleccionado ningún programa</p>
// // //         </div>
// // //       )}
// // //     </Modal>
// // //   )
// // // }

// // // export default ProgramDetailModal
// // "use client"

// // import { useState, useEffect } from "react"
// // import { Eye } from "lucide-react"

// // const ProgramDetailModal = ({ isOpen, onClose, program }) => {
// //   const [programData, setProgramData] = useState(null)
// //   const [loading, setLoading] = useState(true)
// //   const [currentPage, setCurrentPage] = useState(1)
// //   const itemsPerPage = 3

// //   // Datos simulados de fichas asociadas (esto debería venir de una API)
// //   const [associatedFichas] = useState([
// //     { id: "2006188", apprentices: 18 },
// //     { id: "2165383", apprentices: 13 },
// //     { id: "2255924", apprentices: 18 },
// //     { id: "2006189", apprentices: 25 },
// //     { id: "2165384", apprentices: 20 },
// //   ])

// //   useEffect(() => {
// //     if (program) {
// //       setProgramData(program)
// //       setLoading(false)
// //     } else if (isOpen) {
// //       setLoading(false)
// //     }
// //   }, [program, isOpen])

// //   const formatLevel = (level) => {
// //     const levelMap = {
// //       TECNICO: "Técnico",
// //       TECNÓLOGO: "Tecnólogo",
// //       ESPECIALIZACION: "Especialización",
// //       AUXILIAR: "Auxiliar",
// //       OPERARIO: "Operario",
// //     }
// //     return levelMap[level] || level
// //   }

// //   // Paginación
// //   const totalPages = Math.ceil(associatedFichas.length / itemsPerPage)
// //   const startIndex = (currentPage - 1) * itemsPerPage
// //   const endIndex = startIndex + itemsPerPage
// //   const currentFichas = associatedFichas.slice(startIndex, endIndex)

// //   const handleViewFicha = (ficha) => {
// //     console.log("Ver ficha:", ficha)
// //     // Aquí iría la lógica para ver el detalle de la ficha
// //   }

// //   if (!isOpen) return null

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
// //         {loading ? (
// //           <div className="flex justify-center items-center h-64">
// //             <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1f384c]"></div>
// //           </div>
// //         ) : programData ? (
// //           <div className="p-6">
// //             {/* Información principal del programa */}
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
// //               {/* Nombre */}
// //               <div>
// //                 <p className="text-gray-600 text-sm font-medium mb-1">Nombre:</p>
// //                 <p className="text-gray-900 font-semibold text-lg">{programData.name}</p>
// //               </div>

// //               {/* Tipo */}
// //               <div>
// //                 <p className="text-gray-600 text-sm font-medium mb-1">Tipo:</p>
// //                 <p className="text-gray-900 font-semibold">{formatLevel(programData.fk_level)}</p>
// //               </div>

// //               {/* Cantidad de Niveles */}
// //               <div>
// //                 <p className="text-gray-600 text-sm font-medium mb-1">Cantidad de Niveles:</p>
// //                 <p className="text-gray-900 font-semibold">3</p>
// //               </div>
// //             </div>

// //             {/* Segunda fila */}
// //             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
// //               {/* Código del programa */}
// //               <div>
// //                 <p className="text-gray-600 text-sm font-medium mb-1">Código del programa:</p>
// //                 <p className="text-gray-900 font-semibold">{programData.code}</p>
// //               </div>

// //               {/* Estado */}
// //               <div>
// //                 <p className="text-gray-600 text-sm font-medium mb-1">Estado:</p>
// //                 <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
// //                   En formación
// //                 </span>
// //               </div>
// //             </div>

// //             {/* Fichas asociadas */}
// //             <div className="mb-6">
// //               <h3 className="text-gray-700 font-medium mb-4">Fichas asociadas al programa:</h3>

// //               {/* Tabla de fichas */}
// //               <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
// //                 <table className="w-full">
// //                   <thead className="bg-gray-50">
// //                     <tr>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                         FICHAS
// //                       </th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                         N. APRENDICES
// //                       </th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
// //                         ACCIONES
// //                       </th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="bg-white divide-y divide-gray-200">
// //                     {currentFichas.map((ficha, index) => (
// //                       <tr key={ficha.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
// //                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ficha.id}</td>
// //                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{ficha.apprentices}</td>
// //                         <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
// //                           <button
// //                             onClick={() => handleViewFicha(ficha)}
// //                             className="bg-[#1f384c] text-white p-2 rounded-full hover:bg-[#2d4a5c] transition-colors"
// //                             title="Ver detalle de ficha"
// //                           >
// //                             <Eye className="w-4 h-4" />
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>

// //               {/* Paginación */}
// //               {totalPages > 1 && (
// //                 <div className="flex justify-end items-center mt-4 text-sm text-gray-600">
// //                   <span className="mr-4">
// //                     Página {currentPage} de {totalPages}
// //                   </span>
// //                   <div className="flex gap-2">
// //                     <button
// //                       onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
// //                       disabled={currentPage === 1}
// //                       className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       ‹
// //                     </button>
// //                     <button
// //                       onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
// //                       disabled={currentPage === totalPages}
// //                       className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
// //                     >
// //                       ›
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </div>

// //             {/* Botón cerrar */}
// //             <div className="flex justify-end">
// //               <button
// //                 onClick={onClose}
// //                 className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
// //               >
// //                 Cerrar
// //               </button>
// //             </div>
// //           </div>
// //         ) : (
// //           <div className="flex justify-center items-center h-64">
// //             <p className="text-gray-500">No se ha seleccionado ningún programa</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }

// // export default ProgramDetailModal
// "use client"

// import { useState, useEffect } from "react"
// import Modal from "../../../shared/components/Modal"

// const ProgramDetailModal = ({ isOpen, onClose, program }) => {
//   const [programData, setProgramData] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (program) {
//       setProgramData(program)
//       setLoading(false)
//     } else if (isOpen) {
//       setLoading(false)
//     }
//   }, [program, isOpen])

//   const formatLevel = (level) => {
//     const levelMap = {
//       TECNICO: "Técnico",
//       TECNÓLOGO: "Tecnólogo",
//       ESPECIALIZACION: "Especialización",
//       AUXILIAR: "Auxiliar",
//       OPERARIO: "Operario",
//     }
//     return levelMap[level] || level
//   }

//   const formatModality = (modality) => {
//     const modalityMap = {
//       PRESENCIAL: "Presencial",
//       "A DISTANCIA": "A Distancia",
//       VIRTUAL: "Virtual",
//       COMBINADO: "Combinado",
//     }
//     return modalityMap[modality] || modality
//   }

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="Detalle del Programa">
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1f384c]"></div>
//         </div>
//       ) : programData ? (
//         <div className="p-4">
//           <h2 className="text-xl font-bold mb-4 text-[#1f384c]">{programData.name}</h2>

//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-3 text-gray-800">Información General</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-gray-600 text-sm font-medium">Código:</p>
//                 <p className="text-gray-900 font-semibold">{programData.code}</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-gray-600 text-sm font-medium">Nivel:</p>
//                 <p className="text-gray-900 font-semibold">{formatLevel(programData.fk_level)}</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-gray-600 text-sm font-medium">Modalidad:</p>
//                 <p className="text-gray-900 font-semibold">{formatModality(programData.fk_modality)}</p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-gray-600 text-sm font-medium">Estado:</p>
//                 <span
//                   className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
//                     programData.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {programData.status ? "Activo" : "Inactivo"}
//                 </span>
//               </div>
//             </div>
//           </div>

//           {(programData.abbreviation || programData.version) && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-3 text-gray-800">Información Adicional</h3>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {programData.abbreviation && (
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <p className="text-gray-600 text-sm font-medium">Abreviación:</p>
//                     <p className="text-gray-900 font-semibold">{programData.abbreviation}</p>
//                   </div>
//                 )}
//                 {programData.version && (
//                   <div className="bg-gray-50 p-3 rounded-lg">
//                     <p className="text-gray-600 text-sm font-medium">Versión:</p>
//                     <p className="text-gray-900 font-semibold">{programData.version}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {programData.description && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-2 text-gray-800">Descripción</h3>
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-gray-700">{programData.description}</p>
//               </div>
//             </div>
//           )}

//           {programData.duration && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-2 text-gray-800">Duración</h3>
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-gray-700">{programData.duration}</p>
//               </div>
//             </div>
//           )}

//           <div className="mb-4">
//             <h3 className="text-lg font-semibold mb-2 text-gray-800">Información del Sistema</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-gray-600 font-medium">Creado:</p>
//                 <p className="text-gray-700">
//                   {programData.createdAt ? new Date(programData.createdAt).toLocaleDateString("es-ES") : "N/A"}
//                 </p>
//               </div>
//               <div className="bg-gray-50 p-3 rounded-lg">
//                 <p className="text-gray-600 font-medium">Última actualización:</p>
//                 <p className="text-gray-700">
//                   {programData.updatedAt ? new Date(programData.updatedAt).toLocaleDateString("es-ES") : "N/A"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end mt-6">
//             <button
//               onClick={onClose}
//               className="px-4 py-2 bg-[#1f384c] text-white rounded-lg hover:bg-[#2d4a5c] transition-colors"
//             >
//               Cerrar
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className="flex justify-center items-center h-64">
//           <p className="text-gray-500">No se ha seleccionado ningún programa</p>
//         </div>
//       )}
//     </Modal>
//   )
// }

// export default ProgramDetailModal
"use client"

import { useEffect, useRef } from "react"

const ProgramDetailModal = ({ program, isOpen, onClose }) => {
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

  if (!isOpen || !program) return null

  const formatLevel = (level) => {
    const levelMap = {
      TECNICO: "Técnico",
      TECNÓLOGO: "Tecnólogo",
      ESPECIALIZACION: "Especialización",
      AUXILIAR: "Auxiliar",
      OPERARIO: "Operario",
    }
    return levelMap[level] || level
  }

  const formatModality = (modality) => {
    const modalityMap = {
      PRESENCIAL: "Presencial",
      "A DISTANCIA": "A Distancia",
      VIRTUAL: "Virtual",
      COMBINADO: "Combinado",
    }
    return modalityMap[modality] || modality
  }

  // Datos simulados de fichas asociadas
  const fichasAsociadas = [
    { numero: "2006188", fechaInicio: "2024-01-15", fechaFin: "2025-12-15", nivel: 1, estudiantes: 18 },
    { numero: "2165383", fechaInicio: "2024-02-01", fechaFin: "2025-11-30", nivel: 2, estudiantes: 13 },
    { numero: "2255924", fechaInicio: "2024-03-01", fechaFin: "2026-01-15", nivel: 1, estudiantes: 18 },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-[18px] font-bold text-center text-[#1f384c] mb-6">DETALLE DEL PROGRAMA</h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center">
            <div className="w-1/3 font-bold text-[14px]">Programa:</div>
            <div className="w-2/3 text-[14px] text-gray-500">{program.name}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/2 font-bold text-[14px]">Código:</div>
            <div className="w-1/2 text-[14px] text-gray-500">{program.code}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold text-[14px]">Nivel:</div>
            <div className="w-2/3 text-[14px] text-gray-500">{formatLevel(program.fk_level)}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/2 font-bold text-[14px]">Modalidad:</div>
            <div className="w-1/2 text-[14px] text-gray-500">{formatModality(program.fk_modality)}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold text-[14px]">Estado:</div>
            <div className="w-2/3 text-[14px] text-gray-500">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  program.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {program.status ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-[14px] font-bold mb-4">Fichas Asociadas al Programa</h3>

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Ficha</th>
                <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Fecha Inicio</th>
                <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Fecha Fin</th>
                <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Nivel</th>
                <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">N° Estudiantes</th>
              </tr>
            </thead>
            <tbody>
              {fichasAsociadas.map((ficha, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-[14px] text-gray-700">{ficha.numero}</td>
                  <td className="px-4 py-2 text-[14px] text-gray-700">{ficha.fechaInicio}</td>
                  <td className="px-4 py-2 text-[14px] text-gray-700">{ficha.fechaFin}</td>
                  <td className="px-4 py-2 text-[14px] text-gray-700">Nivel {ficha.nivel}</td>
                  <td className="px-4 py-2 text-[14px] text-gray-700">{ficha.estudiantes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="bg-[#f44144] text-white py-2 px-8 rounded-lg text-[14px] font-medium hover:bg-red-600 transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProgramDetailModal
