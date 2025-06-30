// // // // "use client"
// // // // import Modal from "../../../shared/components/Modal"

// // // // const SupportMaterialDetailModal = ({ isOpen, onClose, material }) => {
// // // //   if (!material) return null

// // // //   const formatDate = (dateString) => {
// // // //     if (!dateString) return "No especificada"
// // // //     return new Date(dateString).toLocaleDateString("es-ES", {
// // // //       year: "numeric",
// // // //       month: "long",
// // // //       day: "numeric",
// // // //     })
// // // //   }

// // // //   const getFileIcon = (tipo) => {
// // // //     switch (tipo) {
// // // //       case "documento":
// // // //         return "📄"
// // // //       case "imagen":
// // // //         return "🖼️"
// // // //       case "audio":
// // // //         return "🎵"
// // // //       case "video":
// // // //         return "🎥"
// // // //       default:
// // // //         return "📁"
// // // //     }
// // // //   }

// // // //   const getStatusBadge = (estado) => {
// // // //     return (
// // // //       <span
// // // //         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
// // // //           estado ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// // // //         }`}
// // // //       >
// // // //         {estado ? "Activo" : "Inactivo"}
// // // //       </span>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <Modal isOpen={isOpen} onClose={onClose} title="Detalle del Material de Apoyo">
// // // //       <div className="space-y-6">
// // // //         {/* Header con título y estado */}
// // // //         <div className="flex justify-between items-start">
// // // //           <div>
// // // //             <h3 className="text-lg font-semibold text-gray-900 mb-2">{material.titulo}</h3>
// // // //             {getStatusBadge(material.estado)}
// // // //           </div>
// // // //           <div className="text-4xl">{getFileIcon(material.tipo)}</div>
// // // //         </div>

// // // //         {/* Información básica */}
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-500 mb-1">Tema</label>
// // // //             <p className="text-gray-900">{material.tema || "No especificado"}</p>
// // // //           </div>

// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-500 mb-1">Tipo de Material</label>
// // // //             <p className="text-gray-900 capitalize">{material.tipo}</p>
// // // //           </div>

// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-500 mb-1">Fecha de Creación</label>
// // // //             <p className="text-gray-900">{formatDate(material.fechaCreacion)}</p>
// // // //           </div>

// // // //           <div>
// // // //             <label className="block text-sm font-medium text-gray-500 mb-1">Fecha de Registro</label>
// // // //             <p className="text-gray-900">{formatDate(material.createdAt)}</p>
// // // //           </div>
// // // //         </div>

// // // //         {/* Descripción */}
// // // //         <div>
// // // //           <label className="block text-sm font-medium text-gray-500 mb-1">Descripción</label>
// // // //           <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{material.descripcion || "Sin descripción"}</p>
// // // //         </div>

// // // //         {/* Información del archivo */}
// // // //         {material.archivo && (
// // // //           <div className="border-t pt-4">
// // // //             <label className="block text-sm font-medium text-gray-500 mb-2">Información del Archivo</label>
// // // //             <div className="bg-gray-50 p-3 rounded-md space-y-2">
// // // //               <div className="flex justify-between">
// // // //                 <span className="text-sm text-gray-600">Nombre original:</span>
// // // //                 <span className="text-sm text-gray-900">{material.archivo.originalName}</span>
// // // //               </div>
// // // //               <div className="flex justify-between">
// // // //                 <span className="text-sm text-gray-600">Tamaño:</span>
// // // //                 <span className="text-sm text-gray-900">
// // // //                   {material.archivo.size ? (material.archivo.size / 1024 / 1024).toFixed(2) + " MB" : "No disponible"}
// // // //                 </span>
// // // //               </div>
// // // //               <div className="flex justify-between">
// // // //                 <span className="text-sm text-gray-600">Tipo MIME:</span>
// // // //                 <span className="text-sm text-gray-900">{material.archivo.mimetype || "No disponible"}</span>
// // // //               </div>
// // // //               {material.archivo.url && (
// // // //                 <div className="pt-2">
// // // //                   <a
// // // //                     href={`http://localhost:3000${material.archivo.url}`}
// // // //                     target="_blank"
// // // //                     rel="noopener noreferrer"
// // // //                     className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
// // // //                   >
// // // //                     📥 Descargar Archivo
// // // //                   </a>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Botón de cerrar */}
// // // //         <div className="flex justify-end pt-4">
// // // //           <button
// // // //             onClick={onClose}
// // // //             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
// // // //           >
// // // //             Cerrar
// // // //           </button>
// // // //         </div>
// // // //       </div>
// // // //     </Modal>
// // // //   )
// // // // }

// // // // export default SupportMaterialDetailModal
// // // "use client"
// // // import Modal from "../../../shared/components/Modal"

// // // const SupportMaterialDetailModal = ({ isOpen, onClose, material }) => {
// // //   if (!material) return null

// // //   const formatDate = (dateString) => {
// // //     if (!dateString) return "No especificada"
// // //     return new Date(dateString).toLocaleDateString("es-ES", {
// // //       year: "numeric",
// // //       month: "long",
// // //       day: "numeric",
// // //     })
// // //   }

// // //   const getFileIcon = (tipo) => {
// // //     switch (tipo) {
// // //       case "documento":
// // //         return "📄"
// // //       case "imagen":
// // //         return "🖼️"
// // //       case "audio":
// // //         return "🎵"
// // //       case "video":
// // //         return "🎥"
// // //       default:
// // //         return "📁"
// // //     }
// // //   }

// // //   const getStatusBadge = (estado) => {
// // //     return (
// // //       <span
// // //         className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
// // //           estado
// // //             ? "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300"
// // //             : "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300"
// // //         }`}
// // //       >
// // //         <span className={`w-2 h-2 rounded-full mr-2 ${estado ? "bg-green-500" : "bg-red-500"}`}></span>
// // //         {estado ? "Activo" : "Inactivo"}
// // //       </span>
// // //     )
// // //   }

// // //   const getTipoBadge = (tipo) => {
// // //     const colors = {
// // //       documento: "bg-blue-100 text-blue-800 border-blue-300",
// // //       imagen: "bg-purple-100 text-purple-800 border-purple-300",
// // //       audio: "bg-yellow-100 text-yellow-800 border-yellow-300",
// // //       video: "bg-red-100 text-red-800 border-red-300",
// // //     }

// // //     return (
// // //       <span
// // //         className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${colors[tipo] || colors.documento}`}
// // //       >
// // //         {getFileIcon(tipo)} {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
// // //       </span>
// // //     )
// // //   }

// // //   return (
// // //     <Modal isOpen={isOpen} onClose={onClose} title="📋 Detalle del Material de Apoyo" size="large">
// // //       <div className="space-y-6">
// // //         {/* Header con título y estado */}
// // //         <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
// // //           <div className="flex justify-between items-start mb-4">
// // //             <div className="flex-1">
// // //               <h3 className="text-xl font-bold text-gray-900 mb-2">{material.titulo}</h3>
// // //               <p className="text-gray-600 text-sm">📚 {material.tema || "Sin tema especificado"}</p>
// // //             </div>
// // //             <div className="text-5xl opacity-80">{getFileIcon(material.tipo)}</div>
// // //           </div>

// // //           <div className="flex flex-wrap gap-3">
// // //             {getStatusBadge(material.estado)}
// // //             {getTipoBadge(material.tipo)}
// // //           </div>
// // //         </div>

// // //         {/* Descripción */}
// // //         <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
// // //           <label className="block text-sm font-semibold text-gray-700 mb-2">📝 Descripción</label>
// // //           <p className="text-gray-900 leading-relaxed">{material.descripcion || "Sin descripción disponible"}</p>
// // //         </div>

// // //         {/* Información de fechas */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //           <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
// // //             <label className="block text-sm font-semibold text-gray-700 mb-1">📅 Fecha de Creación</label>
// // //             <p className="text-gray-900 font-medium">{formatDate(material.fechaCreacion)}</p>
// // //           </div>

// // //           <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
// // //             <label className="block text-sm font-semibold text-gray-700 mb-1">🕒 Fecha de Registro</label>
// // //             <p className="text-gray-900 font-medium">{formatDate(material.createdAt)}</p>
// // //           </div>
// // //         </div>

// // //         {/* Información del archivo */}
// // //         {material.archivo && (
// // //           <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
// // //             <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
// // //               <h4 className="text-sm font-semibold text-gray-700">📎 Información del Archivo</h4>
// // //             </div>
// // //             <div className="p-4 space-y-3">
// // //               <div className="flex justify-between items-center py-2 border-b border-gray-100">
// // //                 <span className="text-sm text-gray-600 font-medium">📄 Nombre original:</span>
// // //                 <span className="text-sm text-gray-900 font-semibold">{material.archivo.originalName}</span>
// // //               </div>

// // //               <div className="flex justify-between items-center py-2 border-b border-gray-100">
// // //                 <span className="text-sm text-gray-600 font-medium">📏 Tamaño:</span>
// // //                 <span className="text-sm text-gray-900 font-semibold">
// // //                   {material.archivo.size ? (material.archivo.size / 1024 / 1024).toFixed(2) + " MB" : "No disponible"}
// // //                 </span>
// // //               </div>

// // //               <div className="flex justify-between items-center py-2 border-b border-gray-100">
// // //                 <span className="text-sm text-gray-600 font-medium">🏷️ Tipo MIME:</span>
// // //                 <span className="text-sm text-gray-900 font-semibold">
// // //                   {material.archivo.mimetype || "No disponible"}
// // //                 </span>
// // //               </div>

// // //               {material.archivo.url && (
// // //                 <div className="pt-3">
// // //                   <a
// // //                     href={`http://localhost:3000${material.archivo.url}`}
// // //                     target="_blank"
// // //                     rel="noopener noreferrer"
// // //                     className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all shadow-md"
// // //                   >
// // //                     <span className="mr-2">📥</span>
// // //                     Descargar Archivo
// // //                   </a>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Botón de cerrar */}
// // //         <div className="flex justify-end pt-4 border-t border-gray-200">
// // //           <button
// // //             onClick={onClose}
// // //             className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all font-medium shadow-md"
// // //           >
// // //             ✖️ Cerrar
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </Modal>
// // //   )
// // // }

// // // export default SupportMaterialDetailModal
// // "use client"
// // import Modal from "../../../shared/components/Modal"

// // const SupportMaterialDetailModal = ({ isOpen, onClose, material }) => {
// //   if (!material) return null

// //   const formatDate = (dateString) => {
// //     if (!dateString) return "No especificada"
// //     return new Date(dateString).toLocaleDateString("es-ES", {
// //       year: "numeric",
// //       month: "long",
// //       day: "numeric",
// //     })
// //   }

// //   const getStatusBadge = (estado) => {
// //     return (
// //       <span
// //         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
// //           estado ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// //         }`}
// //       >
// //         {estado ? "Activo" : "Inactivo"}
// //       </span>
// //     )
// //   }

// //   return (
// //     <Modal isOpen={isOpen} onClose={onClose} title="Detalle del Material de Apoyo">
// //       <div className="space-y-6">
// //         {/* Header con título y estado */}
// //         <div className="flex justify-between items-start">
// //           <div>
// //             <h3 className="text-lg font-semibold text-gray-900 mb-2">{material.titulo}</h3>
// //             {getStatusBadge(material.estado)}
// //           </div>
// //         </div>

// //         {/* Información básica */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //           <div>
// //             <label className="block text-sm font-medium text-gray-500 mb-1">Tema</label>
// //             <p className="text-gray-900">{material.tema || "No especificado"}</p>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-500 mb-1">Tipo de Material</label>
// //             <p className="text-gray-900 capitalize">{material.tipo}</p>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-500 mb-1">Fecha de Creación</label>
// //             <p className="text-gray-900">{formatDate(material.fechaCreacion)}</p>
// //           </div>

// //           <div>
// //             <label className="block text-sm font-medium text-gray-500 mb-1">Fecha de Registro</label>
// //             <p className="text-gray-900">{formatDate(material.createdAt)}</p>
// //           </div>
// //         </div>

// //         {/* Descripción */}
// //         <div>
// //           <label className="block text-sm font-medium text-gray-500 mb-1">Descripción</label>
// //           <p className="text-gray-900 bg-gray-50 p-3 rounded-md">{material.descripcion || "Sin descripción"}</p>
// //         </div>

// //         {/* Información del archivo */}
// //         {material.archivo && (
// //           <div className="border-t pt-4">
// //             <label className="block text-sm font-medium text-gray-500 mb-2">Información del Archivo</label>
// //             <div className="bg-gray-50 p-3 rounded-md space-y-2">
// //               <div className="flex justify-between">
// //                 <span className="text-sm text-gray-600">Nombre original:</span>
// //                 <span className="text-sm text-gray-900">{material.archivo.originalName}</span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span className="text-sm text-gray-600">Tamaño:</span>
// //                 <span className="text-sm text-gray-900">
// //                   {material.archivo.size ? (material.archivo.size / 1024 / 1024).toFixed(2) + " MB" : "No disponible"}
// //                 </span>
// //               </div>
// //               <div className="flex justify-between">
// //                 <span className="text-sm text-gray-600">Tipo MIME:</span>
// //                 <span className="text-sm text-gray-900">{material.archivo.mimetype || "No disponible"}</span>
// //               </div>
// //               {material.archivo.url && (
// //                 <div className="pt-2">
// //                   <a
// //                     href={`http://localhost:3000${material.archivo.url}`}
// //                     target="_blank"
// //                     rel="noopener noreferrer"
// //                     className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
// //                   >
// //                     Descargar Archivo
// //                   </a>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}

// //         {/* Botón de cerrar */}
// //         <div className="flex justify-end pt-4">
// //           <button
// //             onClick={onClose}
// //             className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
// //           >
// //             Cerrar
// //           </button>
// //         </div>
// //       </div>
// //     </Modal>
// //   )
// // }

// // export default SupportMaterialDetailModal
// "use client"

// const SupportMaterialDetailModal = ({ isOpen, onClose, material }) => {
//   if (!isOpen || !material) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
//         {/* Header fijo */}
//         <div className="p-6 border-b border-gray-200 flex-shrink-0">
//           <h2 className="text-xl font-bold text-[#1f384c]">Detalle de material de apoyo</h2>
//         </div>

//         {/* Contenido con scroll */}
//         <div className="flex-1 overflow-y-auto p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div>
//               <label className="block text-sm text-[#627b87] mb-1">Título:</label>
//               <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">
//                 {material.titulo || material.nombre}
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm text-[#627b87] mb-1">Tema:</label>
//               <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">{material.tema}</div>
//             </div>
//             <div>
//               <label className="block text-sm text-[#627b87] mb-1">Fecha:</label>
//               <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">
//                 {material.fecha_creacion ? new Date(material.fecha_creacion).toLocaleDateString() : "Sin fecha"}
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm text-[#627b87] mb-1">Estado:</label>
//               <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     material.estado === "Activo" || material.estado === "activo"
//                       ? "bg-green-100 text-green-800"
//                       : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {material.estado}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="mb-6">
//             <label className="block text-sm text-[#627b87] mb-1">Contenido:</label>
//             <div className="border border-[#d9d9d9] rounded bg-white">
//               <div className="p-4 min-h-[300px] overflow-auto">
//                 <div
//                   className="text-sm text-[#627b87] editor-content"
//                   dangerouslySetInnerHTML={{
//                     __html: material.contenido || "<div>Material de Apoyo...</div>",
//                   }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer fijo */}
//         <div className="p-6 border-t border-gray-200 flex justify-end flex-shrink-0">
//           <button
//             className="px-6 py-2 bg-[#dc3545] text-white rounded-lg hover:bg-red-600 transition-colors"
//             onClick={onClose}
//           >
//             Cerrar
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SupportMaterialDetailModal
"use client"

const SupportMaterialDetailModal = ({ isOpen, onClose, material }) => {
  if (!isOpen || !material) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header fijo */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-[#1f384c]">Detalle de material de apoyo</h2>
        </div>

        {/* Contenido con scroll */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-[#627b87] mb-1">Título:</label>
              <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">
                {material.titulo || material.nombre}
              </div>
            </div>
            {/* <div>
              <label className="block text-sm text-[#627b87] mb-1">Tema:</label>
              <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">{material.tema}</div>
            </div> */}
            <div>
              <label className="block text-sm text-[#627b87] mb-1">Fecha:</label>
              <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">
                {material.fecha_creacion ? new Date(material.fecha_creacion).toLocaleDateString() : "Sin fecha"}
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#627b87] mb-1">Estado:</label>
              <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    material.estado === "Activo" || material.estado === "activo"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {material.estado}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-[#627b87] mb-1">Contenido:</label>
            <div className="border border-[#d9d9d9] rounded bg-white">
              <div className="p-4 min-h-[300px] overflow-auto">
                <div
                  className="text-sm text-[#627b87] editor-content"
                  dangerouslySetInnerHTML={{
                    __html: material.contenido || "<div>Material de Apoyo...</div>",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer fijo */}
        <div className="p-6 border-t border-gray-200 flex justify-end flex-shrink-0">
          <button
            className="px-6 py-2 bg-[#dc3545] text-white rounded-lg hover:bg-red-600 transition-colors"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}

export default SupportMaterialDetailModal
