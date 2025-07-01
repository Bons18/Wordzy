

// // import { useEffect, useRef } from "react"

// // const ProgramDetailModal = ({ program, isOpen, onClose }) => {
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

// //   if (!isOpen || !program) return null

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

// //   const formatModality = (modality) => {
// //     const modalityMap = {
// //       PRESENCIAL: "Presencial",
// //       "A DISTANCIA": "A Distancia",
// //       VIRTUAL: "Virtual",
// //       COMBINADO: "Combinado",
// //     }
// //     return modalityMap[modality] || modality
// //   }

// //   // Datos simulados de fichas asociadas
// //   const fichasAsociadas = [
// //     { numero: "2006188", fechaInicio: "2024-01-15", fechaFin: "2025-12-15", nivel: 1, estudiantes: 18 },
// //     { numero: "2165383", fechaInicio: "2024-02-01", fechaFin: "2025-11-30", nivel: 2, estudiantes: 13 },
// //     { numero: "2255924", fechaInicio: "2024-03-01", fechaFin: "2026-01-15", nivel: 1, estudiantes: 18 },
// //   ]

// //   return (
// //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //       <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
// //         <h2 className="text-[18px] font-bold text-center text-[#1f384c] mb-6">DETALLE DEL PROGRAMA</h2>

// //         <div className="grid grid-cols-2 gap-4 mb-8">
// //           <div className="flex items-center">
// //             <div className="w-1/3 font-bold text-[14px]">Programa:</div>
// //             <div className="w-2/3 text-[14px] text-gray-500">{program.name}</div>
// //           </div>

// //           <div className="flex items-center">
// //             <div className="w-1/2 font-bold text-[14px]">Código:</div>
// //             <div className="w-1/2 text-[14px] text-gray-500">{program.code}</div>
// //           </div>

// //           <div className="flex items-center">
// //             <div className="w-1/3 font-bold text-[14px]">Nivel:</div>
// //             <div className="w-2/3 text-[14px] text-gray-500">{formatLevel(program.fk_level)}</div>
// //           </div>

// //           <div className="flex items-center">
// //             <div className="w-1/2 font-bold text-[14px]">Modalidad:</div>
// //             <div className="w-1/2 text-[14px] text-gray-500">{formatModality(program.fk_modality)}</div>
// //           </div>

// //           <div className="flex items-center">
// //             <div className="w-1/3 font-bold text-[14px]">Estado:</div>
// //             <div className="w-2/3 text-[14px] text-gray-500">
// //               <span
// //                 className={`px-2 py-1 rounded-full text-xs font-medium ${
// //                   program.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// //                 }`}
// //               >
// //                 {program.status ? "Activo" : "Inactivo"}
// //               </span>
// //             </div>
// //           </div>
// //         </div>

// //         <h3 className="text-[14px] font-bold mb-4">Fichas Asociadas al Programa</h3>

// //         <div className="overflow-x-auto mb-6">
// //           <table className="w-full border-collapse">
// //             <thead>
// //               <tr className="border-b border-gray-200">
// //                 <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Ficha</th>
// //                 <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Fecha Inicio</th>
// //                 <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Fecha Fin</th>
// //                 <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Nivel</th>
// //                 <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">N° Estudiantes</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {fichasAsociadas.map((ficha, index) => (
// //                 <tr key={index} className="border-b border-gray-200">
// //                   <td className="px-4 py-2 text-[14px] text-gray-700">{ficha.numero}</td>
// //                   <td className="px-4 py-2 text-[14px] text-gray-700">{ficha.fechaInicio}</td>
// //                   <td className="px-4 py-2 text-[14px] text-gray-700">{ficha.fechaFin}</td>
// //                   <td className="px-4 py-2 text-[14px] text-gray-700">Nivel {ficha.nivel}</td>
// //                   <td className="px-4 py-2 text-[14px] text-gray-700">{ficha.estudiantes}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         <div className="flex justify-center">
// //           <button
// //             onClick={onClose}
// //             className="bg-[#f44144] text-white py-2 px-8 rounded-lg text-[14px] font-medium hover:bg-red-600 transition-colors"
// //           >
// //             Cerrar
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default ProgramDetailModal
// "use client"

// import { useEffect, useRef, useState } from "react"
// import { Eye } from "lucide-react"

// const ProgramDetailModal = ({ program, isOpen, onClose }) => {
//   const modalRef = useRef(null)
//   const [fichasAsociadas, setFichasAsociadas] = useState([])
//   const [loading, setLoading] = useState(false)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [debugInfo, setDebugInfo] = useState(null)
//   const itemsPerPage = 3

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

//   // Función para obtener fichas asociadas al programa
//   const fetchFichasAsociadas = async (programCode) => {
//     setLoading(true)
//     try {
//       console.log("=== INICIO DEBUG FICHAS ===")
//       console.log("Programa seleccionado completo:", program)
//       console.log("Código del programa a buscar:", programCode)

//       const response = await fetch("http://localhost:3000/api/course")

//       if (!response.ok) {
//         throw new Error(`Error en la API: ${response.status}`)
//       }

//       const data = await response.json()
//       console.log("=== RESPUESTA COMPLETA DE LA API ===")
//       console.log("Tipo de respuesta:", typeof data)
//       console.log("Es array:", Array.isArray(data))
//       console.log("Respuesta completa:", data)

//       // Manejar diferentes estructuras de respuesta
//       let fichas = []
//       if (Array.isArray(data)) {
//         fichas = data
//         console.log("Usando data directamente (es array)")
//       } else if (data.data && Array.isArray(data.data)) {
//         fichas = data.data
//         console.log("Usando data.data")
//       } else if (data.courses && Array.isArray(data.courses)) {
//         fichas = data.courses
//         console.log("Usando data.courses")
//       } else if (data.fichas && Array.isArray(data.fichas)) {
//         fichas = data.fichas
//         console.log("Usando data.fichas")
//       } else {
//         console.log("Estructura de respuesta no reconocida:", Object.keys(data))
//       }

//       console.log("=== FICHAS OBTENIDAS ===")
//       console.log("Total de fichas:", fichas.length)
//       console.log("Primeras 3 fichas:", fichas.slice(0, 3))

//       // Analizar cada ficha para ver sus campos
//       console.log("=== ANÁLISIS DE CAMPOS DE FICHAS ===")
//       fichas.forEach((ficha, index) => {
//         if (index < 5) {
//           // Solo mostrar las primeras 5 para no saturar
//           console.log(`Ficha ${index + 1}:`, {
//             id: ficha.id,
//             code: ficha.code,
//             fk_programs: ficha.fk_programs,
//             fk_program: ficha.fk_program,
//             program: ficha.program,
//             programCode: ficha.programCode,
//             program_code: ficha.program_code,
//             allKeys: Object.keys(ficha),
//           })
//         }
//       })

//       console.log("=== PROCESO DE FILTRADO ===")
//       console.log("Buscando fichas con programa:", programCode)

//       // Filtrar fichas que pertenecen al programa actual
//       const fichasFiltradas = fichas.filter((ficha) => {
//         // Verificar diferentes formas de asociación
//         const fichaProgram =
//           ficha.fk_programs || ficha.fk_program || ficha.program || ficha.programCode || ficha.program_code

//         console.log(`Ficha ${ficha.code || ficha.id}:`)
//         console.log(`  - fk_programs: ${ficha.fk_programs}`)
//         console.log(`  - fk_program: ${ficha.fk_program}`)
//         console.log(`  - program: ${ficha.program}`)
//         console.log(`  - programCode: ${ficha.programCode}`)
//         console.log(`  - program_code: ${ficha.program_code}`)
//         console.log(`  - Valor a comparar: ${fichaProgram}`)

//         // Comparar de diferentes formas
//         const matches =
//           fichaProgram === programCode ||
//           fichaProgram === String(programCode) ||
//           fichaProgram === Number(programCode) ||
//           (ficha.program && ficha.program.code === programCode) ||
//           (ficha.program && ficha.program.id === programCode) ||
//           // Comparar también con el nombre del programa
//           fichaProgram === program.name ||
//           (ficha.program && ficha.program.name === program.name)

//         console.log(`  - ¿Coincide?: ${matches}`)
//         return matches
//       })

//       console.log("=== RESULTADO FINAL ===")
//       console.log("Fichas filtradas:", fichasFiltradas.length)
//       console.log("Fichas que coinciden:", fichasFiltradas)

//       // Guardar información de debug
//       setDebugInfo({
//         totalFichas: fichas.length,
//         programCode: programCode,
//         programName: program.name,
//         fichasFiltradas: fichasFiltradas.length,
//         primerasFichas: fichas.slice(0, 3).map((f) => ({
//           code: f.code,
//           fk_programs: f.fk_programs,
//           program: f.program,
//         })),
//       })

//       setFichasAsociadas(fichasFiltradas)
//     } catch (error) {
//       console.error("=== ERROR AL OBTENER FICHAS ===")
//       console.error("Error completo:", error)
//       setFichasAsociadas([])
//       setDebugInfo({ error: error.message })
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Obtener fichas cuando se abre el modal
//   useEffect(() => {
//     if (isOpen && program) {
//       setCurrentPage(1)
//       // Usar el código del programa para buscar fichas asociadas
//       const programCode = program.code || program.id
//       fetchFichasAsociadas(programCode)
//     }
//   }, [isOpen, program])

//   if (!isOpen || !program) return null

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

//   // Paginación
//   const totalPages = Math.ceil(fichasAsociadas.length / itemsPerPage)
//   const startIndex = (currentPage - 1) * itemsPerPage
//   const endIndex = startIndex + itemsPerPage
//   const currentFichas = fichasAsociadas.slice(startIndex, endIndex)

//   const handleViewFicha = (ficha) => {
//     console.log("Ver ficha:", ficha)
//     // Aquí iría la lógica para ver el detalle de la ficha
//   }

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div ref={modalRef} className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
//         <h2 className="text-[18px] font-bold text-center text-[#1f384c] mb-6">DETALLE DEL PROGRAMA</h2>

//         <div className="grid grid-cols-2 gap-4 mb-8">
//           <div className="flex items-center">
//             <div className="w-1/3 font-bold text-[14px]">Programa:</div>
//             <div className="w-2/3 text-[14px] text-gray-500">{program.name}</div>
//           </div>

//           <div className="flex items-center">
//             <div className="w-1/2 font-bold text-[14px]">Código:</div>
//             <div className="w-1/2 text-[14px] text-gray-500">{program.code}</div>
//           </div>

//           <div className="flex items-center">
//             <div className="w-1/3 font-bold text-[14px]">Nivel:</div>
//             <div className="w-2/3 text-[14px] text-gray-500">{formatLevel(program.fk_level)}</div>
//           </div>

//           <div className="flex items-center">
//             <div className="w-1/2 font-bold text-[14px]">Modalidad:</div>
//             <div className="w-1/2 text-[14px] text-gray-500">{formatModality(program.fk_modality)}</div>
//           </div>

//           <div className="flex items-center">
//             <div className="w-1/3 font-bold text-[14px]">Estado:</div>
//             <div className="w-2/3 text-[14px] text-gray-500">
//               <span
//                 className={`px-2 py-1 rounded-full text-xs font-medium ${
//                   program.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                 }`}
//               >
//                 {program.status ? "Activo" : "Inactivo"}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Información de debug (solo en desarrollo) */}
//         {debugInfo && (
//           <div className="mb-4 p-3 bg-gray-100 rounded text-xs">
//             <strong>Debug Info:</strong>
//             <br />
//             Total fichas en API: {debugInfo.totalFichas}
//             <br />
//             Programa buscado: {debugInfo.programCode} ({debugInfo.programName})
//             <br />
//             Fichas encontradas: {debugInfo.fichasFiltradas}
//             {debugInfo.error && (
//               <>
//                 <br />
//                 Error: {debugInfo.error}
//               </>
//             )}
//           </div>
//         )}

//         <h3 className="text-[14px] font-bold mb-4">
//           Fichas Asociadas al Programa {loading ? "(Cargando...)" : `(${fichasAsociadas.length})`}
//         </h3>

//         {loading ? (
//           <div className="flex justify-center items-center h-32">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1f384c]"></div>
//           </div>
//         ) : fichasAsociadas.length === 0 ? (
//           <div className="text-center py-8">
//             <p className="text-gray-500 text-[14px]">No hay fichas asociadas a este programa</p>
//             {debugInfo && (
//               <p className="text-xs text-gray-400 mt-2">Se revisaron {debugInfo.totalFichas} fichas en total</p>
//             )}
//           </div>
//         ) : (
//           <>
//             <div className="overflow-x-auto mb-6">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="border-b border-gray-200">
//                     <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">FICHAS</th>
//                     <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">N. APRENDICES</th>
//                     <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">ACCIONES</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {currentFichas.map((ficha, index) => (
//                     <tr key={ficha.id || ficha.code || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
//                       <td className="px-4 py-2 text-[14px] text-gray-700">
//                         {ficha.code || ficha.number || ficha.id || "N/A"}
//                       </td>
//                       <td className="px-4 py-2 text-[14px] text-gray-700">
//                         {ficha.apprentices_count || ficha.students_count || ficha.totalStudents || 0}
//                       </td>
//                       <td className="px-4 py-2 text-[14px] text-gray-700">
//                         <button
//                           onClick={() => handleViewFicha(ficha)}
//                           className="bg-[#1f384c] text-white p-2 rounded-full hover:bg-[#2d4a5c] transition-colors"
//                           title="Ver detalle de ficha"
//                         >
//                           <Eye className="w-4 h-4" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Paginación */}
//             {totalPages > 1 && (
//               <div className="flex justify-end items-center mb-4 text-sm text-gray-600">
//                 <span className="mr-4">
//                   Página {currentPage} de {totalPages}
//                 </span>
//                 <div className="flex gap-2">
//                   <button
//                     onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     ‹
//                   </button>
//                   <button
//                     onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     ›
//                   </button>
//                 </div>
//               </div>
//             )}
//           </>
//         )}

//         <div className="flex justify-center">
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

// export default ProgramDetailModal
"use client"

import { useEffect, useRef, useState } from "react"
import { Eye } from "lucide-react"

const ProgramDetailModal = ({ program, isOpen, onClose }) => {
  const modalRef = useRef(null)
  const aprendicesModalRef = useRef(null)
  const [fichasAsociadas, setFichasAsociadas] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [debugInfo, setDebugInfo] = useState(null)
  const [selectedFicha, setSelectedFicha] = useState(null)
  const [showAprendicesModal, setShowAprendicesModal] = useState(false)
  const [aprendicesFicha, setAprendicesFicha] = useState([])
  const [loadingAprendices, setLoadingAprendices] = useState(false)
  const [currentAprendicesPage, setCurrentAprendicesPage] = useState(1)
  const itemsPerPage = 3
  const aprendicesPerPage = 5

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Solo cerrar el modal principal si no está abierto el modal de aprendices
      if (!showAprendicesModal && modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
      // Cerrar modal de aprendices si se hace clic fuera de él
      if (showAprendicesModal && aprendicesModalRef.current && !aprendicesModalRef.current.contains(event.target)) {
        closeAprendicesModal()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose, showAprendicesModal])

  // Función para contar aprendices por ficha
  const contarAprendicesPorFicha = async (fichas) => {
    try {
      console.log("=== CONTANDO APRENDICES POR FICHA ===")
      console.log("Fichas a procesar:", fichas.length)

      const response = await fetch("http://localhost:3000/api/apprentice")

      if (!response.ok) {
        console.error("Error al obtener aprendices:", response.status)
        return fichas
      }

      const data = await response.json()
      console.log("Respuesta de API apprentice:", data)

      let aprendices = []

      if (Array.isArray(data)) {
        aprendices = data
      } else if (data.apprentices && Array.isArray(data.apprentices)) {
        aprendices = data.apprentices
      } else if (data.data && Array.isArray(data.data)) {
        aprendices = data.data
      } else if (data.users && Array.isArray(data.users)) {
        aprendices = data.users
      }

      console.log("Total aprendices obtenidos:", aprendices.length)
      console.log("Primeros 3 aprendices:", aprendices.slice(0, 3))

      // Contar aprendices por cada ficha
      const fichasConConteo = fichas.map((ficha) => {
        const codigoFicha = ficha.code || ficha.id
        console.log(`\n--- Procesando ficha: ${codigoFicha} ---`)

        const aprendicesEnFicha = aprendices.filter((aprendiz) => {
          console.log(`Aprendiz: ${aprendiz.nombre} ${aprendiz.apellido}`)
          console.log(`  - Fichas del aprendiz:`, aprendiz.ficha)

          if (!aprendiz.ficha || !Array.isArray(aprendiz.ficha)) {
            console.log(`  - No tiene fichas o no es array`)
            return false
          }

          const tieneAsociacion = aprendiz.ficha.some((fichaAprendiz) => {
            const coincide =
              fichaAprendiz === codigoFicha ||
              fichaAprendiz === Number.parseInt(codigoFicha) ||
              fichaAprendiz.toString() === codigoFicha.toString() ||
              Number.parseInt(fichaAprendiz) === Number.parseInt(codigoFicha)

            if (coincide) {
              console.log(`  - ✅ COINCIDENCIA: ${fichaAprendiz} === ${codigoFicha}`)
            }

            return coincide
          })

          console.log(`  - Resultado: ${tieneAsociacion ? "SÍ" : "NO"} está en la ficha`)
          return tieneAsociacion
        })

        console.log(`Ficha ${codigoFicha}: ${aprendicesEnFicha.length} aprendices encontrados`)
        console.log(
          `Aprendices en esta ficha:`,
          aprendicesEnFicha.map((a) => `${a.nombre} ${a.apellido}`),
        )

        return {
          ...ficha,
          apprentices_count: aprendicesEnFicha.length,
        }
      })

      console.log("=== RESULTADO FINAL DEL CONTEO ===")
      fichasConConteo.forEach((ficha) => {
        console.log(`Ficha ${ficha.code}: ${ficha.apprentices_count} aprendices`)
      })

      return fichasConConteo
    } catch (error) {
      console.error("Error al contar aprendices:", error)
      return fichas
    }
  }

  // Función para obtener aprendices de una ficha específica
  const obtenerAprendicesDeFicha = async (codigoFicha) => {
    setLoadingAprendices(true)
    try {
      console.log("=== OBTENIENDO APRENDICES DE FICHA ===")
      console.log("Código de ficha:", codigoFicha)

      const response = await fetch("http://localhost:3000/api/apprentice")

      if (!response.ok) {
        throw new Error(`Error al obtener aprendices: ${response.status}`)
      }

      const data = await response.json()
      let aprendices = []

      if (Array.isArray(data)) {
        aprendices = data
      } else if (data.apprentices && Array.isArray(data.apprentices)) {
        aprendices = data.apprentices
      } else if (data.data && Array.isArray(data.data)) {
        aprendices = data.data
      } else if (data.users && Array.isArray(data.users)) {
        aprendices = data.users
      }

      console.log("Total aprendices para filtrar:", aprendices.length)

      // Filtrar aprendices de esta ficha específica
      const aprendicesEnFicha = aprendices.filter((aprendiz) => {
        if (!aprendiz.ficha || !Array.isArray(aprendiz.ficha)) return false

        return aprendiz.ficha.some(
          (fichaAprendiz) =>
            fichaAprendiz === codigoFicha ||
            fichaAprendiz === Number.parseInt(codigoFicha) ||
            fichaAprendiz.toString() === codigoFicha.toString() ||
            Number.parseInt(fichaAprendiz) === Number.parseInt(codigoFicha),
        )
      })

      console.log("Aprendices encontrados para la ficha:", aprendicesEnFicha.length)

      // Formatear datos para mostrar
      const aprendicesFormateados = aprendicesEnFicha.map((aprendiz) => ({
        documento: aprendiz.documento || "Sin documento",
        nombre: `${aprendiz.nombre || "Sin nombre"} ${aprendiz.apellido || ""}`.trim(),
        nivel: aprendiz.nivel || 1,
        estado: mapearEstado(aprendiz.estado),
        correo: aprendiz.correo || "Sin correo",
        telefono: aprendiz.telefono || "Sin teléfono",
      }))

      setAprendicesFicha(aprendicesFormateados)
      setCurrentAprendicesPage(1)
    } catch (error) {
      console.error("Error al obtener aprendices de la ficha:", error)
      setAprendicesFicha([])
    } finally {
      setLoadingAprendices(false)
    }
  }

  const mapearEstado = (estado) => {
    if (!estado) return "Activo"
    const estadosActivos = ["En formación", "Condicionado", "Graduado", "Activo"]
    return estadosActivos.includes(estado) ? "Activo" : "Inactivo"
  }

  // Función para obtener fichas asociadas al programa
  const fetchFichasAsociadas = async (programCode) => {
    setLoading(true)
    try {
      console.log("=== INICIO DEBUG FICHAS ===")
      console.log("Programa seleccionado completo:", program)
      console.log("Código del programa a buscar:", programCode)

      const response = await fetch("http://localhost:3000/api/course")

      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status}`)
      }

      const data = await response.json()
      console.log("=== RESPUESTA COMPLETA DE LA API COURSE ===")
      console.log("Tipo de respuesta:", typeof data)
      console.log("Es array:", Array.isArray(data))

      // Manejar diferentes estructuras de respuesta
      let fichas = []
      if (Array.isArray(data)) {
        fichas = data
        console.log("Usando data directamente (es array)")
      } else if (data.data && Array.isArray(data.data)) {
        fichas = data.data
        console.log("Usando data.data")
      } else if (data.courses && Array.isArray(data.courses)) {
        fichas = data.courses
        console.log("Usando data.courses")
      } else if (data.fichas && Array.isArray(data.fichas)) {
        fichas = data.fichas
        console.log("Usando data.fichas")
      }

      console.log("=== FICHAS OBTENIDAS ===")
      console.log("Total de fichas:", fichas.length)

      console.log("=== PROCESO DE FILTRADO ===")
      console.log("Buscando fichas con programa:", programCode)

      // Filtrar fichas que pertenecen al programa actual
      const fichasFiltradas = fichas.filter((ficha) => {
        const fichaProgram =
          ficha.fk_programs || ficha.fk_program || ficha.program || ficha.programCode || ficha.program_code

        const matches =
          fichaProgram === programCode ||
          fichaProgram === String(programCode) ||
          fichaProgram === Number(programCode) ||
          (ficha.program && ficha.program.code === programCode) ||
          (ficha.program && ficha.program.id === programCode) ||
          fichaProgram === program.name ||
          (ficha.program && ficha.program.name === program.name)

        return matches
      })

      console.log("=== RESULTADO INICIAL ===")
      console.log("Fichas filtradas:", fichasFiltradas.length)

      // Contar aprendices para cada ficha
      const fichasConAprendices = await contarAprendicesPorFicha(fichasFiltradas)

      console.log("=== RESULTADO FINAL CON CONTEO ===")
      console.log("Fichas con conteo de aprendices:", fichasConAprendices)

      setDebugInfo({
        totalFichas: fichas.length,
        programCode: programCode,
        programName: program.name,
        fichasFiltradas: fichasConAprendices.length,
      })

      setFichasAsociadas(fichasConAprendices)
    } catch (error) {
      console.error("=== ERROR AL OBTENER FICHAS ===")
      console.error("Error completo:", error)
      setFichasAsociadas([])
      setDebugInfo({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  // Obtener fichas cuando se abre el modal
  useEffect(() => {
    if (isOpen && program) {
      setCurrentPage(1)
      const programCode = program.code || program.id
      fetchFichasAsociadas(programCode)
    }
  }, [isOpen, program])

  // Función para manejar ver aprendices de una ficha
  const handleViewFicha = async (ficha) => {
    console.log("Ver aprendices de la ficha:", ficha)
    setSelectedFicha(ficha)
    setShowAprendicesModal(true)
    await obtenerAprendicesDeFicha(ficha.code || ficha.id)
  }

  // Cerrar modal de aprendices
  const closeAprendicesModal = () => {
    setShowAprendicesModal(false)
    setSelectedFicha(null)
    setAprendicesFicha([])
  }

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

  // Paginación para fichas
  const totalPages = Math.ceil(fichasAsociadas.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentFichas = fichasAsociadas.slice(startIndex, endIndex)

  // Paginación para aprendices
  const totalAprendicesPages = Math.ceil(aprendicesFicha.length / aprendicesPerPage)
  const startAprendicesIndex = (currentAprendicesPage - 1) * aprendicesPerPage
  const endAprendicesIndex = startAprendicesIndex + aprendicesPerPage
  const currentAprendices = aprendicesFicha.slice(startAprendicesIndex, endAprendicesIndex)

  return (
    <>
      {/* Modal principal de programa */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${showAprendicesModal ? "z-40" : "z-50"}`}
      >
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

          {/* Información de debug */}
          {/* {debugInfo && (
            <div className="mb-4 p-3 bg-gray-100 rounded text-xs">
              <strong>Debug Info:</strong>
              <br />
              Total fichas en API: {debugInfo.totalFichas}
              <br />
              Programa buscado: {debugInfo.programCode} ({debugInfo.programName})
              <br />
              Fichas encontradas: {debugInfo.fichasFiltradas}
              {debugInfo.error && (
                <>
                  <br />
                  Error: {debugInfo.error}
                </>
              )}
            </div>
          )} */}

          <h3 className="text-[14px] font-bold mb-4">
            Fichas Asociadas al Programa {loading ? "(Cargando...)" : `(${fichasAsociadas.length})`}
          </h3>

          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1f384c]"></div>
            </div>
          ) : fichasAsociadas.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-[14px]">No hay fichas asociadas a este programa</p>
              {debugInfo && (
                <p className="text-xs text-gray-400 mt-2">Se revisaron {debugInfo.totalFichas} fichas en total</p>
              )}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">FICHAS</th>
                      <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">N. APRENDICES</th>
                      <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">ACCIONES</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentFichas.map((ficha, index) => (
                      <tr key={ficha.id || ficha.code || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-2 text-[14px] text-gray-700">
                          {ficha.code || ficha.number || ficha.id || "N/A"}
                        </td>
                        <td className="px-4 py-2 text-[14px] text-gray-700 font-semibold">
                          {ficha.apprentices_count || 0}
                        </td>
                        <td className="px-4 py-2 text-[14px] text-gray-700">
                          <button
                            onClick={() => handleViewFicha(ficha)}
                            className="bg-[#1f384c] text-white p-2 rounded-full hover:bg-[#2d4a5c] transition-colors"
                            title="Ver aprendices de la ficha"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              {totalPages > 1 && (
                <div className="flex justify-end items-center mb-4 text-sm text-gray-600">
                  <span className="mr-4">
                    Página {currentPage} de {totalPages}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ›
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

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

      {/* Modal de aprendices de la ficha */}
      {showAprendicesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={aprendicesModalRef}
            className="bg-white rounded-lg p-6 w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-[18px] font-bold text-center text-[#1f384c] mb-6">
              APRENDICES DE LA FICHA {selectedFicha?.code || selectedFicha?.id}
            </h2>

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[14px] font-bold">Lista de Aprendices</h3>
              <span className="text-[12px] text-gray-500">Total: {aprendicesFicha.length} aprendices</span>
            </div>

            {loadingAprendices ? (
              <div className="flex justify-center items-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1f384c]"></div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Documento</th>
                        <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Nombre Completo</th>
                        <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Nivel</th>
                        <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Estado</th>
                        <th className="px-4 py-2 text-left text-[14px] font-medium text-gray-600">Correo</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAprendices.length > 0 ? (
                        currentAprendices.map((aprendiz, index) => (
                          <tr key={index} className="border-b border-gray-200">
                            <td className="px-4 py-2 text-[14px] text-gray-700">{aprendiz.documento}</td>
                            <td className="px-4 py-2 text-[14px] text-gray-700">{aprendiz.nombre}</td>
                            <td className="px-4 py-2 text-[14px] text-gray-700">Nivel {aprendiz.nivel}</td>
                            <td className="px-4 py-2 text-[14px] text-gray-700">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  aprendiz.estado === "Activo"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {aprendiz.estado}
                              </span>
                            </td>
                            <td className="px-4 py-2 text-[14px] text-gray-700">{aprendiz.correo}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-4 py-8 text-center text-[14px] text-gray-500">
                            No hay aprendices asociados a esta ficha
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Paginador para aprendices */}
                {totalAprendicesPages > 1 && (
                  <div className="flex justify-center items-center space-x-1 mb-4">
                    <button
                      onClick={() => setCurrentAprendicesPage((prev) => Math.max(prev - 1, 1))}
                      disabled={currentAprendicesPage === 1}
                      className={`px-2 py-1 rounded text-[12px] ${
                        currentAprendicesPage === 1
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                    >
                      ‹
                    </button>

                    {[...Array(totalAprendicesPages)].map((_, index) => {
                      const pageNumber = index + 1
                      return (
                        <button
                          key={pageNumber}
                          onClick={() => setCurrentAprendicesPage(pageNumber)}
                          className={`px-2 py-1 rounded text-[12px] min-w-[24px] ${
                            currentAprendicesPage === pageNumber
                              ? "bg-[#1f384c] text-white"
                              : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                          }`}
                        >
                          {pageNumber}
                        </button>
                      )
                    })}

                    <button
                      onClick={() => setCurrentAprendicesPage((prev) => Math.min(prev + 1, totalAprendicesPages))}
                      disabled={currentAprendicesPage === totalAprendicesPages}
                      className={`px-2 py-1 rounded text-[12px] ${
                        currentAprendicesPage === totalAprendicesPages
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                      }`}
                    >
                      ›
                    </button>

                    <span className="text-[11px] text-gray-500 ml-2">
                      {startAprendicesIndex + 1}-{Math.min(endAprendicesIndex, aprendicesFicha.length)} de{" "}
                      {aprendicesFicha.length}
                    </span>
                  </div>
                )}
              </>
            )}

            <div className="flex justify-center">
              <button
                onClick={closeAprendicesModal}
                className="bg-[#f44144] text-white py-2 px-8 rounded-lg text-[14px] font-medium hover:bg-red-600 transition-colors"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProgramDetailModal
