// "use client"

// import { useState, useEffect } from "react"
// import Modal from "../../../shared/components/Modal"
// import Table from "../../../shared/components/Table"
// import Button from "../../../shared/components/Button"
// import Tooltip from "../../../shared/components/Tooltip"

// const ProgramDetailModal = ({ isOpen, onClose, program }) => {
//   const [programData, setProgramData] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (program) {
//       // Aquí podrías cargar datos adicionales del programa si es necesario
//       setProgramData(program)
//       setLoading(false)
//     }
//   }, [program])

//   const columns = [
//     { header: "Nombre", accessor: "name" },
//     { header: "Descripción", accessor: "description" },
//     { header: "Duración", accessor: "duration" },
//     { header: "Estado", accessor: "status" },
//     {
//       header: "Acciones",
//       accessor: "actions",
//       Cell: ({ row }) => (
//         <Tooltip text="Ver aprendices">
//           <Button
//             onClick={() => handleViewApprentices(row.id)}
//             className="!w-10 !h-10 !p-0 flex items-center justify-center"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </Button>
//         </Tooltip>
//       ),
//     },
//   ]

//   const handleViewApprentices = (id) => {
//     // Implementar la navegación o acción para ver los aprendices
//     console.log(`Ver aprendices del programa con ID: ${id}`)
//   }

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} title="Detalle del Programa">
//       {loading ? (
//         <div className="flex justify-center items-center h-64">
//           <p>Cargando...</p>
//         </div>
//       ) : (
//         <div className="p-4">
//           <h2 className="text-xl font-bold mb-4">{programData?.name}</h2>

//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-2">Información General</h3>
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-gray-600">Descripción:</p>
//                 <p>{programData?.description}</p>
//               </div>
//               <div>
//                 <p className="text-gray-600">Duración:</p>
//                 <p>{programData?.duration}</p>
//               </div>
//               <div>
//                 <p className="text-gray-600">Estado:</p>
//                 <p>{programData?.status}</p>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h3 className="text-lg font-semibold mb-2">Cursos del Programa</h3>
//             <Table columns={columns} data={programData?.courses || []} pagination={true} itemsPerPage={5} />
//           </div>
//         </div>
//       )}
//     </Modal>
//   )
// }

// export default ProgramDetailModal

"use client"

import { useState, useEffect } from "react"
import Modal from "../../../shared/components/Modal"
import Table from "../../../shared/components/Table"
import Button from "../../../shared/components/Button"
import Tooltip from "../../../shared/components/Tooltip"

const ProgramDetailModal = ({ isOpen, onClose, program }) => {
  const [programData, setProgramData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (program) {
      // Cargar datos del programa
      setProgramData(program)
      setLoading(false)
    } else if (isOpen) {
      // Si el modal está abierto pero no hay programa, establecer loading en false
      setLoading(false)
    }
  }, [program, isOpen])

  const columns = [
    { header: "Nombre", accessor: "name" },
    { header: "Descripción", accessor: "description" },
    { header: "Duración", accessor: "duration" },
    {
      header: "Estado",
      accessor: "status",
      Cell: ({ row }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.status === "Activo" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "Acciones",
      accessor: "actions",
      Cell: ({ row }) => (
        <Tooltip text="Ver aprendices">
          <Button
            onClick={() => handleViewApprentices(row.id)}
            className="!w-9 !h-9 !p-0 flex items-center justify-center rounded-lg bg-[#1f384c]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </Button>
        </Tooltip>
      ),
    },
  ]

  const handleViewApprentices = (id) => {
    // Implementar la navegación o acción para ver los aprendices
    console.log(`Ver aprendices del curso con ID: ${id}`)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalle del Programa">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1f384c]"></div>
        </div>
      ) : programData ? (
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">{programData.name}</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Información General</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Descripción:</p>
                <p>{programData.description}</p>
              </div>
              <div>
                <p className="text-gray-600">Duración:</p>
                <p>{programData.duration}</p>
              </div>
              <div>
                <p className="text-gray-600">Estado:</p>
                <p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      programData.status === "En formación" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {programData.status}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-600">Código:</p>
                <p>{programData.code}</p>
              </div>
              <div>
                <p className="text-gray-600">Tipo:</p>
                <p>{programData.type}</p>
              </div>
              <div>
                <p className="text-gray-600">Niveles:</p>
                <p>{programData.levels}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Cursos del Programa</h3>
            {programData.courses && programData.courses.length > 0 ? (
              <Table columns={columns} data={programData.courses} pagination={true} itemsPerPage={5} />
            ) : (
              <div className="text-center py-6 bg-gray-50 rounded-lg">
                <p className="text-gray-500">No hay cursos asociados a este programa</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">No se ha seleccionado ningún programa</p>
        </div>
      )}
    </Modal>
  )
}

export default ProgramDetailModal
