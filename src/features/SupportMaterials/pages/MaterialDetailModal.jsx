// "use client"

// import { useEffect, useRef } from "react"

// const MaterialDetailModal = ({ material, isOpen, onClose }) => {
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

//   if (!isOpen || !material) return null

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
//         <h2 className="text-[18px] font-bold text-center text-[#1f384c] mb-6">DETALLE MATERIAL DE APOYO</h2>

//         <div className="space-y-3">
//           <div className="flex items-center">
//             <div className="w-1/3 font-bold text-[14px]">Nombre:</div>
//             <div className="w-2/3 text-[14px] text-gray-500">{material.nombre}</div>
//           </div>

//           <div className="flex items-center">
//             <div className="w-1/3 font-bold text-[14px]">Tema:</div>
//             <div className="w-2/3 text-[14px] text-gray-500">{material.tema}</div>
//           </div>

//           <div className="flex items-center">
//             <div className="w-1/3 font-bold text-[14px]">Estado:</div>
//             <div className="w-2/3 text-[14px] text-gray-500">{material.estado}</div>
//           </div>

//           <div className="mt-4">
//             <h3 className="text-[14px] font-bold mb-2">Contenido:</h3>
//             <div className="border border-gray-300 rounded-lg p-3">
//               <div
//                 dangerouslySetInnerHTML={{ __html: material.contenido || "<div>No hay contenido disponible</div>" }}
//               />
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-center mt-8">
//           <button
//             onClick={onClose}
//             className="bg-[#f44144] text-white py-2 px-8 rounded-lg text-[14px] font-medium hover:bg-red-600 transition-colors"
//           >
//             Cerrar
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MaterialDetailModal
"use client"

import { useEffect, useRef } from "react"

const MaterialDetailModal = ({ material, isOpen, onClose }) => {
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

  if (!isOpen || !material) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-[18px] font-bold text-center text-[#1f384c] mb-6">DETALLE MATERIAL DE APOYO</h2>

        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-1/3 font-bold text-[14px]">Nombre:</div>
            <div className="w-2/3 text-[14px] text-gray-500">{material.nombre}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold text-[14px]">Tema:</div>
            <div className="w-2/3 text-[14px] text-gray-500">{material.tema}</div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 font-bold text-[14px]">Estado:</div>
            <div className="w-2/3 text-[14px] text-gray-500">{material.estado}</div>
          </div>

          <div className="mt-4">
            <h3 className="text-[14px] font-bold mb-2">Contenido:</h3>
            <div className="border border-gray-300 rounded-lg p-3">
              <div
                dangerouslySetInnerHTML={{ __html: material.contenido || "<div>No hay contenido disponible</div>" }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
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

export default MaterialDetailModal
