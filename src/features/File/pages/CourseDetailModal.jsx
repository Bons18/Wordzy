// "use client"

// import { X } from "lucide-react"

// export default function CourseDetailModal({ course, isOpen, onClose }) {
//   if (!isOpen || !course) return null

//   const formatDate = (dateString) => {
//     if (!dateString) return "No especificada"
//     return new Date(dateString).toLocaleDateString("es-ES", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })
//   }

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "EN EJECUCION":
//         return "bg-green-100 text-green-800"
//       case "TERMINADO":
//         return "bg-blue-100 text-blue-800"
//       case "SUSPENDIDO":
//         return "bg-yellow-100 text-yellow-800"
//       default:
//         return "bg-red-100 text-red-800"
//     }
//   }

//   const getOfferTypeText = (type) => {
//     const typeMap = {
//       ABIERTA: "Abierta",
//       CERRADA: "Cerrada",
//       ESPECIAL: "Especial",
//     }
//     return typeMap[type] || type
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <div>
//             <h2 className="text-2xl font-bold text-[#1f384c]">Detalle de Ficha</h2>
//             <p className="text-gray-600 mt-1">Código: {course.code}</p>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-gray-100 rounded-full transition-colors"
//             aria-label="Cerrar modal"
//           >
//             <X className="w-6 h-6 text-gray-500" />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//             {/* Información General */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-[#1f384c] border-b border-gray-200 pb-2">
//                 Información General
//               </h3>

//               <div className="space-y-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Código</label>
//                   <p className="text-gray-900 bg-gray-50 p-2 rounded border">{course.code}</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Programa</label>
//                   <p className="text-gray-900 bg-gray-50 p-2 rounded border">{course.fk_programs}</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Área</label>
//                   <p className="text-gray-900 bg-gray-50 p-2 rounded border">{course.area}</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Coordinación</label>
//                   <p className="text-gray-900 bg-gray-50 p-2 rounded border">{course.fk_coordination}</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Itinerario</label>
//                   <p className="text-gray-900 bg-gray-50 p-2 rounded border">{course.fk_itinerary}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Información de Fechas y Estado */}
//             <div className="space-y-4">
//               <h3 className="text-lg font-semibold text-[#1f384c] border-b border-gray-200 pb-2">Fechas y Estado</h3>

//               <div className="space-y-3">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Oferta</label>
//                   <p className="text-gray-900 bg-gray-50 p-2 rounded border">{getOfferTypeText(course.offer_type)}</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Estado del Curso</label>
//                   <span
//                     className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
//                       course.course_status,
//                     )}`}
//                   >
//                     {course.course_status}
//                   </span>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Inicio</label>
//                   <p className="text-gray-900 bg-gray-50 p-2 rounded border">{formatDate(course.start_date)}</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Fin</label>
//                   <p className="text-gray-900 bg-gray-50 p-2 rounded border">{formatDate(course.end_date)}</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Inicio de Prácticas</label>
//                   <p className="text-gray-900 bg-gray-50 p-2 rounded border">
//                     {formatDate(course.internship_start_date)}
//                   </p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Vencimiento de Términos</label>
//                   <p className="text-gray-900 bg-gray-50 p-2 rounded border">{formatDate(course.terms_expiry_date)}</p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Información Adicional */}
//           <div className="mt-6 pt-6 border-t border-gray-200">
//             <h3 className="text-lg font-semibold text-[#1f384c] mb-4">Información Adicional</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Trimestre</label>
//                 <p className="text-gray-900 bg-gray-50 p-2 rounded border">{course.quarter || "No especificado"}</p>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
//                 <span
//                   className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
//                     course.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                   }`}
//                 >
//                   {course.status ? "Activo" : "Inactivo"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex justify-end p-6 border-t border-gray-200">
//           <button
//             onClick={onClose}
//             className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
//           >
//             Cerrar
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useEffect, useRef } from "react"

const CourseDetailModal = ({ course, isOpen, onClose }) => {
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

  if (!isOpen || !course) return null

  const formatDate = (dateString) => {
    if (!dateString) return "No especificada"
    return new Date(dateString).toLocaleDateString("es-ES")
  }

  const formatOfferType = (type) => {
    const typeMap = {
      ABIERTA: "Abierta",
      CERRADA: "Cerrada",
      ESPECIAL: "Especial",
    }
    return typeMap[type] || type
  }

  const formatCourseStatus = (status) => {
    const statusMap = {
      "EN EJECUCION": "En Ejecución",
      TERMINADO: "Terminado",
      SUSPENDIDO: "Suspendido",
    }
    return statusMap[status] || status
  }

  // Datos simulados de aprendices asociados
  const aprendicesAsociados = [
    { documento: "1234567890", nombre: "Juan Carlos Pérez", nivel: 1, estado: "Activo" },
    { documento: "0987654321", nombre: "María Fernanda López", nivel: 2, estado: "Activo" },
    { documento: "1122334455", nombre: "Carlos Alberto Ruiz", nivel: 1, estado: "Inactivo" },
    { documento: "5544332211", nombre: "Ana Sofía Martínez", nivel: 3, estado: "Activo" },
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-[18px] font-bold text-center text-[#1f384c] mb-6">DETALLE DE LA FICHA</h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center">
            <div className="w-1/3 font-bold text-[14px]">Código:</div>
            <div className="w-2/3 text-[14px] text-gray-500">{course.code}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/2 font-bold text-[14px]">Programa:</div>
            <div className="w-1/2 text-[14px] text-gray-500">{course.fk_programs}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold text-[14px]">Área:</div>
            <div className="w-2/3 text-[14px] text-gray-500">{course.area}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/2 font-bold text-[14px]">Coordinación:</div>
            <div className="w-1/2 text-[14px] text-gray-500">{course.fk_coordination}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold text-[14px]">Tipo de Oferta:</div>
            <div className="w-2/3 text-[14px] text-gray-500">{formatOfferType(course.offer_type)}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/2 font-bold text-[14px]">Estado del Curso:</div>
            <div className="w-1/2 text-[14px] text-gray-500">{formatCourseStatus(course.course_status)}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold text-[14px]">Fecha Inicio:</div>
            <div className="w-2/3 text-[14px] text-gray-500">{formatDate(course.start_date)}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/2 font-bold text-[14px]">Fecha Fin:</div>
            <div className="w-1/2 text-[14px] text-gray-500">{formatDate(course.end_date)}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold text-[14px]">Inicio Prácticas:</div>
            <div className="w-2/3 text-[14px] text-gray-500">{formatDate(course.internship_start_date)}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/2 font-bold text-[14px]">Estado:</div>
            <div className="w-1/2 text-[14px] text-gray-500">
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {course.status ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>
        </div>

        <h3 className="text-[14px] font-bold mb-4">Aprendices Asociados a la Ficha</h3>

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Documento</th>
                <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Nombre Completo</th>
                <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Nivel</th>
                <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Estado</th>
              </tr>
            </thead>
            <tbody>
              {aprendicesAsociados.map((aprendiz, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="px-4 py-2 text-[14px] text-gray-700">{aprendiz.documento}</td>
                  <td className="px-4 py-2 text-[14px] text-gray-700">{aprendiz.nombre}</td>
                  <td className="px-4 py-2 text-[14px] text-gray-700">Nivel {aprendiz.nivel}</td>
                  <td className="px-4 py-2 text-[14px] text-gray-700">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        aprendiz.estado === "Activo" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {aprendiz.estado}
                    </span>
                  </td>
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

export default CourseDetailModal
