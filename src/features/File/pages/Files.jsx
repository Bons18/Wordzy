

// // // // "use client"

// // // // import { useState, useEffect, useRef } from "react"
// // // // import { ChevronDown } from "lucide-react"
// // // // import { useNavigate } from "react-router-dom"
// // // // import GenericTable from "../../../shared/components/Table"
// // // // import { useAuth } from "../../auth/hooks/useAuth"
// // // // import ConfirmationModal from "../../../shared/components/ConfirmationModal"
// // // // import Tooltip from "../../../shared/components/Tooltip"

// // // // // Datos de ejemplo
// // // // const fichasData = [
// // // //   {
// // // //     id: "2889927",
// // // //     programa: "ADSO",
// // // //     instructor: "Diego Gómez",
// // // //     cantidad: 30,
// // // //     fechaInicio: "21-03-2023",
// // // //     fechaFin: "21-03-2025",
// // // //     nivel: 1,
// // // //     estado: "En formación",
// // // //   },
// // // //   {
// // // //     id: "2345678",
// // // //     programa: "ADSO",
// // // //     instructor: "Juan Pérez",
// // // //     cantidad: 25,
// // // //     fechaInicio: "21-03-2022",
// // // //     fechaFin: "21-03-2024",
// // // //     nivel: 1,
// // // //     estado: "En formación",
// // // //   },
// // // //   {
// // // //     id: "5567653",
// // // //     programa: "ADSO",
// // // //     // instructor: "Yaritza Esquivel",
// // // //     cantidad: 10,
// // // //     fechaInicio: "21-03-2024",
// // // //     fechaFin: "21-03-2026",
// // // //     nivel: 2,
// // // //     estado: "En formación",
// // // //   },
  
// // // //   {
// // // //     id: "4847373",
// // // //     programa: "Redes",
// // // //     instructor: "Juan Pérez",
// // // //     cantidad: 14,
// // // //     fechaInicio: "21-03-2020",
// // // //     fechaFin: "21-03-2023",
// // // //     nivel: 3,
// // // //     estado: "Terminada",
// // // //   },
// // // //   {
// // // //     id: "3747477",
// // // //     programa: "Redes",
// // // //     instructor: "Diego Gómez",
// // // //     cantidad: 18,
// // // //     fechaInicio: "21-03-2023",
// // // //     fechaFin: "21-03-2025",
// // // //     nivel: 3,
// // // //     estado: "Terminada",
// // // //   },
// // // // ]

// // // // const columns = [
// // // //   { key: "id", label: "Ficha" },
// // // //   { key: "programa", label: "Programa" },
// // // //   // { key: "instructor", label: "Instructor" },
// // // //   { key: "cantidad", label: "Cantidad Aprendices" },
// // // //   { key: "fechaInicio", label: "Fecha Inicio" },
// // // //   { key: "fechaFin", label: "Fecha Fin" },
// // // //   { key: "nivel", label: "Nivel" },
// // // //   {
// // // //     key: "estado",
// // // //     label: "Estado",
// // // //     render: (item) => (
// // // //       <span
// // // //         className={`px-2 py-1 rounded-full text-xs font-medium ${
// // // //           item.estado === "En formación"
// // // //             ? "bg-green-100 text-green-800"
// // // //             : item.estado === "Terminada"
// // // //               ? "bg-blue-100 text-blue-800"
// // // //               : "bg-red-100 text-red-800"
// // // //         }`}
// // // //       >
// // // //         {item.estado}
// // // //       </span>
// // // //     ),
// // // //   },
// // // // ]

// // // // const Files = () => {
// // // //   const [showFichaModal, setShowFichaModal] = useState(false)
// // // //   const [showEstudiantesModal, setShowEstudiantesModal] = useState(false)
// // // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// // // //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// // // //   const { logout } = useAuth()
// // // //   const navigate = useNavigate()
// // // //   const dropdownRef = useRef(null)

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

// // // //   const handleShowFicha = () => {
// // // //     setShowFichaModal(true)
// // // //   }

// // // //   const verEstudiantes = () => {
// // // //     setShowFichaModal(false)
// // // //     setShowEstudiantesModal(true)
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen">
// // // //       <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
// // // //         <div className="container mx-auto flex justify-between items-center">
// // // //           <h1 className="text-2xl font-bold text-[#1f384c]">FICHAS</h1>
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
// // // //           data={fichasData}
// // // //           columns={columns}
// // // //           onShow={handleShowFicha}
// // // //           title=""
// // // //           showActions={{ show: true }}
// // // //         />
// // // //       </div>

// // // //       {/* Ficha Modal - Mantenido del original pero con mejor espaciado */}
// // // //       {showFichaModal && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // //           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
// // // //             <div className="p-6">
// // // //               <div className="flex justify-between mb-6">
// // // //                 <div className="flex-1">
// // // //                   <div className="grid grid-cols-2 gap-4">
// // // //                     <div>
// // // //                       <div className="text-sm text-[#6c757d]">Ficha:</div>
// // // //                       <div className="font-medium">2889927</div>
// // // //                     </div>
// // // //                     <div>
// // // //                       <div className="text-sm text-[#6c757d]">Programa:</div>
// // // //                       <div className="font-medium">ADSO</div>
// // // //                     </div>
// // // //                     <div>
// // // //                       <div className="text-sm text-[#6c757d]">Fecha Inicio:</div>
// // // //                       <div className="font-medium">23-01-2024</div>
// // // //                     </div>
// // // //                     <div>
// // // //                       <div className="text-sm text-[#6c757d]">Fecha fin:</div>
// // // //                       <div className="font-medium">30-01-2025</div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="overflow-x-auto">
// // // //                 <table className="min-w-full divide-y divide-[#eaeaea]">
// // // //                   <thead className="bg-white">
// // // //                     <tr>
// // // //                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // //                         Nivel
// // // //                       </th>
// // // //                       {/* <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // //                         Instructor
// // // //                       </th> */}
// // // //                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // //                         N. Aprendices
// // // //                       </th>
// // // //                       {/* <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // //                         Estado
// // // //                       </th> */}
// // // //                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // //                         Acciones
// // // //                       </th>
// // // //                     </tr>
// // // //                   </thead>
// // // //                   <tbody className="bg-white divide-y divide-[#eaeaea]">
// // // //                     <tr>
// // // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Nivel 1</td>
// // // //                       {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td> */}
// // // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">20</td>
// // // //                       {/* <td className="px-6 py-4 whitespace-nowrap">
// // // //                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#ecf0f8] text-[#707fdd]">
// // // //                           Terminado
// // // //                         </span>
// // // //                       </td> */}
// // // //                       <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // //                         <Tooltip text="Ver Aprendices" position="top">
// // // //                         <button className="bg-[#1f384c] text-white rounded-lg p-1.5" onClick={verEstudiantes}>
// // // //                             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // //                               <path
// // // //                                 strokeLinecap="round"
// // // //                                 strokeLinejoin="round"
// // // //                                 strokeWidth={2}
// // // //                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
// // // //                               />
// // // //                               <path
// // // //                                 strokeLinecap="round"
// // // //                                 strokeLinejoin="round"
// // // //                                 strokeWidth={2}
// // // //                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
// // // //                               />
// // // //                             </svg>
// // // //                           </button>
// // // //                           </Tooltip>
// // // //                       </td>
// // // //                     </tr>
// // // //                     <tr>
// // // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Nivel 2</td>
// // // //                       {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td> */}
// // // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">30</td>
// // // //                       {/* <td className="px-6 py-4 whitespace-nowrap">
// // // //                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#ecf0f8] text-[#707fdd]">
// // // //                           Terminado
// // // //                         </span>
// // // //                       </td> */}
// // // //                       <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // //                       <Tooltip text="Ver Aprendices" position="top">
// // // //                       <button className="bg-[#1f384c] text-white rounded-lg p-1.5" onClick={verEstudiantes}>
// // // //                             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // //                               <path
// // // //                                 strokeLinecap="round"
// // // //                                 strokeLinejoin="round"
// // // //                                 strokeWidth={2}
// // // //                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
// // // //                               />
// // // //                               <path
// // // //                                 strokeLinecap="round"
// // // //                                 strokeLinejoin="round"
// // // //                                 strokeWidth={2}
// // // //                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
// // // //                               />
// // // //                             </svg>
// // // //                           </button>     
// // // //                           </Tooltip>                 
// // // //                           </td>
// // // //                     </tr>
// // // //                     <tr>
// // // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Nivel 3</td>
// // // //                       {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td> */}
// // // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">15</td>
// // // //                       {/* <td className="px-6 py-4 whitespace-nowrap">
// // // //                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#e6f7f0] text-[#46ae69]">
// // // //                           En formación
// // // //                         </span>
// // // //                       </td> */}
// // // //                       <td className="px-6 py-4 whitespace-nowrap text-sm">
// // // //                       <Tooltip text="Ver Aprendices" position="top">
// // // //                       <button className="bg-[#1f384c] text-white rounded-lg p-1.5" onClick={verEstudiantes}>
// // // //                             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // // //                               <path
// // // //                                 strokeLinecap="round"
// // // //                                 strokeLinejoin="round"
// // // //                                 strokeWidth={2}
// // // //                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
// // // //                               />
// // // //                               <path
// // // //                                 strokeLinecap="round"
// // // //                                 strokeLinejoin="round"
// // // //                                 strokeWidth={2}
// // // //                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
// // // //                               />
// // // //                             </svg>
// // // //                           </button>
// // // //                           </Tooltip>           
// // // //                           </td>
// // // //                     </tr>
// // // //                   </tbody>
// // // //                 </table>
// // // //               </div>

// // // //               <div className="mt-6 flex justify-end">
// // // //                 <button className="bg-[#f44144] text-white text-sm py-2 px-2 rounded-lg  font-medium hover:bg-red-600 transition-colors" onClick={() => setShowFichaModal(false)}>
// // // //                   Cerrar
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Estudiantes Modal - Mantenido del original pero con mejor espaciado */}
// // // //       {showEstudiantesModal && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // //           <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-4 max-h-[80vh] ">
// // // //             <div className="p-4">
// // // //               <h2 className="text-xl font-bold text-center text-[#1f384c] mb-4">Listado de Estudiantes Nivel 1</h2>

// // // //               <div className="mb-4">
// // // //                 <table className="min-w-full divide-y divide-gray-200 text-sm">
// // // //                   <thead className="bg-white">
// // // //                     <tr className="border-b">
// // // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
// // // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">T.Documento</th>
// // // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Número</th>
// // // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Estado</th>
// // // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nivel 1</th>
// // // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nivel 2</th>
// // // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nivel 3</th>
// // // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Ranking</th>
// // // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Total</th>
// // // //                     </tr>
// // // //                   </thead>
// // // //                   <tbody className="bg-white divide-y divide-gray-200">
// // // //                     {estudiantesNuevosData.map((estudiante, index) => (
// // // //                       <tr key={index}>
// // // //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nombre}</td>
// // // //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.documento}</td>
// // // //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.numero}</td>
// // // //                         <td className="px-3 py-2 whitespace-nowrap">
// // // //                           <span
// // // //                             className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
// // // //                               estudiante.estado === "activo"
// // // //                                 ? "bg-green-100 text-green-800"
// // // //                                 : estudiante.estado === "retirado"
// // // //                                   ? "bg-yellow-100 text-yellow-800"
// // // //                                   : estudiante.estado === "completado"
// // // //                                     ? "bg-blue-100 text-blue-800"
// // // //                                     : "bg-red-100 text-red-800"
// // // //                             }`}
// // // //                           >
// // // //                             {estudiante.estado}
// // // //                           </span>
// // // //                         </td>
// // // //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nivel1}</td>
// // // //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nivel2}</td>
// // // //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nivel3}</td>
// // // //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.ranking}</td>
// // // //                         <td className="px-3 py-2 whitespace-nowrap text-sm">
// // // //                           <span
// // // //                             className={`px-2 py-0.5 rounded-full text-xs font-medium ${
// // // //                               estudiante.total === "Aprobado"
// // // //                                 ? "bg-green-100 text-green-800"
// // // //                                 : "bg-red-100 text-red-800"
// // // //                             }`}
// // // //                           >
// // // //                             {estudiante.total}
// // // //                           </span>
// // // //                         </td>
// // // //                       </tr>
// // // //                     ))}
// // // //                   </tbody>
// // // //                 </table>
// // // //               </div>

// // // //               <div className="flex justify-center">
// // // //                 <button
// // // //                   className="bg-[#f44144] text-white px-4 py-1.5 rounded-lg text-sm"
// // // //                   onClick={() => setShowEstudiantesModal(false)}
// // // //                 >
// // // //                   Cerrar
// // // //                 </button>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

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

// // // // // Datos de ejemplo para estudiantes
// // // // const estudiantesNuevosData = [
// // // //   {
// // // //     nombre: "Andres felipe",
// // // //     documento: "C.C",
// // // //     numero: "2382829",
// // // //     estado: "activo",
// // // //     nivel1: "Aprobado",
// // // //     nivel2: "Aprobado",
// // // //     nivel3: "No aprobado",
// // // //     ranking: "900",
// // // //     total: "No aprobado",
// // // //   },
// // // //   {
// // // //     nombre: "Daniel andres",
// // // //     documento: "C.C",
// // // //     numero: "1092983",
// // // //     estado: "activo",
// // // //     nivel1: "Aprobado",
// // // //     nivel2: "Aprobado",
// // // //     nivel3: "Aprobado",
// // // //     ranking: "700",
// // // //     total: "Aprobado",
// // // //   },
// // // //   {
// // // //     nombre: "Gohan Esteban",
// // // //     documento: "C.C",
// // // //     numero: "293923",
// // // //     estado: "activo",
// // // //     nivel1: "Aprobado",
// // // //     nivel2: "No aprobado",
// // // //     nivel3: "No aprobado",
// // // //     ranking: "500",
// // // //     total: "No aprobado",
// // // //   },
// // // //   {
// // // //     nombre: "Andres felipe",
// // // //     documento: "C.C",
// // // //     numero: "283929",
// // // //     estado: "activo",
// // // //     nivel1: "Aprobado",
// // // //     nivel2: "Aprobado",
// // // //     nivel3: "Aprobado",
// // // //     ranking: "400",
// // // //     total: "Aprobado",
// // // //   },
// // // //   {
// // // //     nombre: "Tito Cuartaz",
// // // //     documento: "C.C",
// // // //     numero: "292920",
// // // //     estado: "activo",
// // // //     nivel1: "No aprobado",
// // // //     nivel2: "No aprobado",
// // // //     nivel3: "No aprobado",
// // // //     ranking: "350",
// // // //     total: "No aprobado",
// // // //   },
// // // //   {
// // // //     nombre: "Osman Foronda",
// // // //     documento: "T.I",
// // // //     numero: "282882",
// // // //     estado: "retirado",
// // // //     nivel1: "No aprobado",
// // // //     nivel2: "No aprobado",
// // // //     nivel3: "No aprobado",
// // // //     ranking: "300",
// // // //     total: "No aprobado",
// // // //   },
// // // //   {
// // // //     nombre: "Andres felipe",
// // // //     documento: "C.C",
// // // //     numero: "392938",
// // // //     estado: "completado",
// // // //     nivel1: "No aprobado",
// // // //     nivel2: "No aprobado",
// // // //     nivel3: "No aprobado",
// // // //     ranking: "250",
// // // //     total: "No aprobado",
// // // //   },
// // // //   {
// // // //     nombre: "Yean Fernandez",
// // // //     documento: "C.C",
// // // //     numero: "3838293",
// // // //     estado: "cancelado",
// // // //     nivel1: "aprobado",
// // // //     nivel2: "aprobado",
// // // //     nivel3: "aprobado",
// // // //     ranking: "200",
// // // //     total: "Aprobado",
// // // //   },
// // // //   {
// // // //     nombre: "Bryan Moreno",
// // // //     documento: "T.I",
// // // //     numero: "3838829",
// // // //     estado: "cancelado",
// // // //     nivel1: "aprobado",
// // // //     nivel2: "aprobado",
// // // //     nivel3: "Aprobado",
// // // //     ranking: "150",
// // // //     total: "Aprobado",
// // // //   },
// // // // ]

// // // // export default Files

// // // "use client"

// // // import { useState, useEffect, useRef } from "react"
// // // import { ChevronDown } from "lucide-react"
// // // import { useNavigate } from "react-router-dom"
// // // import GenericTable from "../../../shared/components/Table"
// // // import { useAuth } from "../../auth/hooks/useAuth"
// // // import ConfirmationModal from "../../../shared/components/ConfirmationModal"
// // // import Tooltip from "../../../shared/components/Tooltip"

// // // // Datos de ejemplo
// // // const fichasData = [
// // //   {
// // //     id: "2889927",
// // //     programa: "ADSO",
// // //     instructor: "Diego Gómez",
// // //     cantidad: 30,
// // //     fechaInicio: "21-03-2023",
// // //     fechaFin: "21-03-2025",
// // //     nivel: 1,
// // //     estado: "En formación",
// // //   },
// // //   {
// // //     id: "2345678",
// // //     programa: "ADSO",
// // //     instructor: "Juan Pérez",
// // //     cantidad: 25,
// // //     fechaInicio: "21-03-2022",
// // //     fechaFin: "21-03-2024",
// // //     nivel: 1,
// // //     estado: "En formación",
// // //   },
// // //   {
// // //     id: "5567653",
// // //     programa: "ADSO",
// // //     instructor: "Yaritza Esquivel",
// // //     cantidad: 10,
// // //     fechaInicio: "21-03-2024",
// // //     fechaFin: "21-03-2026",
// // //     nivel: 2,
// // //     estado: "En formación",
// // //   },
// // //   {
// // //     id: "3747477",
// // //     programa: "Redes",
// // //     instructor: "Patricia López",
// // //     cantidad: 26,
// // //     fechaInicio: "21-03-2023",
// // //     fechaFin: "21-03-2024",
// // //     nivel: 2,
// // //     estado: "cerrada",
// // //   },
// // //   {
// // //     id: "4847373",
// // //     programa: "Redes",
// // //     instructor: "Juan Pérez",
// // //     cantidad: 14,
// // //     fechaInicio: "21-03-2020",
// // //     fechaFin: "21-03-2023",
// // //     nivel: 3,
// // //     estado: "Terminada",
// // //   },
// // //   {
// // //     id: "3747477",
// // //     programa: "Redes",
// // //     instructor: "Diego Gómez",
// // //     cantidad: 18,
// // //     fechaInicio: "21-03-2023",
// // //     fechaFin: "21-03-2025",
// // //     nivel: 3,
// // //     estado: "Terminada",
// // //   },
// // // ]

// // // const columns = [
// // //   { key: "id", label: "Ficha" },
// // //   { key: "programa", label: "Programa" },
// // //   { key: "instructor", label: "Instructor" },
// // //   { key: "cantidad", label: "Cantidad Aprendices" },
// // //   { key: "fechaInicio", label: "Fecha Inicio" },
// // //   { key: "fechaFin", label: "Fecha Fin" },
// // //   { key: "nivel", label: "Nivel" },
// // //   {
// // //     key: "estado",
// // //     label: "Estado",
// // //     render: (item) => (
// // //       <span
// // //         className={`px-2 py-1 rounded-full text-xs font-medium ${
// // //           item.estado === "En formación"
// // //             ? "bg-green-100 text-green-800"
// // //             : item.estado === "Terminada"
// // //               ? "bg-blue-100 text-blue-800"
// // //               : "bg-red-100 text-red-800"
// // //         }`}
// // //       >
// // //         {item.estado}
// // //       </span>
// // //     ),
// // //   },
// // // ]

// // // // Datos de ejemplo para estudiantes según el nivel
// // // const estudiantesDataPorNivel = {
// // //   1: [
// // //     {
// // //       nombre: "Andres felipe",
// // //       documento: "C.C",
// // //       numero: "2382829",
// // //       estado: "activo",
// // //       calificacion: "Aprobado",
// // //       ranking: "900",
// // //       total: "Aprobado",
// // //     },
// // //     {
// // //       nombre: "Daniel andres",
// // //       documento: "C.C",
// // //       numero: "1092983",
// // //       estado: "activo",
// // //       calificacion: "Aprobado",
// // //       ranking: "700",
// // //       total: "Aprobado",
// // //     },
// // //     {
// // //       nombre: "Gohan Esteban",
// // //       documento: "C.C",
// // //       numero: "293923",
// // //       estado: "activo",
// // //       calificacion: "No aprobado",
// // //       ranking: "500",
// // //       total: "No aprobado",
// // //     },
// // //   ],
// // //   2: [
// // //     {
// // //       nombre: "Andres felipe",
// // //       documento: "C.C",
// // //       numero: "283929",
// // //       estado: "activo",
// // //       calificacion: "Aprobado",
// // //       ranking: "400",
// // //       total: "Aprobado",
// // //     },
// // //     {
// // //       nombre: "Tito Cuartaz",
// // //       documento: "C.C",
// // //       numero: "292920",
// // //       estado: "activo",
// // //       calificacion: "No aprobado",
// // //       ranking: "350",
// // //       total: "No aprobado",
// // //     },
// // //     {
// // //       nombre: "Osman Foronda",
// // //       documento: "T.I",
// // //       numero: "282882",
// // //       estado: "retirado",
// // //       calificacion: "No aprobado",
// // //       ranking: "300",
// // //       total: "No aprobado",
// // //     },
// // //   ],
// // //   3: [
// // //     {
// // //       nombre: "Andres felipe",
// // //       documento: "C.C",
// // //       numero: "392938",
// // //       estado: "completado",
// // //       calificacion: "No aprobado",
// // //       ranking: "250",
// // //       total: "No aprobado",
// // //     },
// // //     {
// // //       nombre: "Yean Fernandez",
// // //       documento: "C.C",
// // //       numero: "3838293",
// // //       estado: "cancelado",
// // //       calificacion: "Aprobado",
// // //       ranking: "200",
// // //       total: "Aprobado",
// // //     },
// // //     {
// // //       nombre: "Bryan Moreno",
// // //       documento: "T.I",
// // //       numero: "3838829",
// // //       estado: "cancelado",
// // //       calificacion: "Aprobado",
// // //       ranking: "150",
// // //       total: "Aprobado",
// // //     },
// // //   ],
// // //   4: [
// // //     {
// // //       nombre: "Laura Gómez",
// // //       documento: "C.C",
// // //       numero: "1234567",
// // //       estado: "activo",
// // //       calificacion: "Aprobado",
// // //       ranking: "850",
// // //       total: "Aprobado",
// // //     },
// // //     {
// // //       nombre: "Carlos Pérez",
// // //       documento: "C.C",
// // //       numero: "7654321",
// // //       estado: "activo",
// // //       calificacion: "No aprobado",
// // //       ranking: "320",
// // //       total: "No aprobado",
// // //     },
// // //   ],
// // //   5: [
// // //     {
// // //       nombre: "María Rodríguez",
// // //       documento: "C.C",
// // //       numero: "9876543",
// // //       estado: "activo",
// // //       calificacion: "Aprobado",
// // //       ranking: "780",
// // //       total: "Aprobado",
// // //     },
// // //     {
// // //       nombre: "Juan López",
// // //       documento: "T.I",
// // //       numero: "3456789",
// // //       estado: "retirado",
// // //       calificacion: "No aprobado",
// // //       ranking: "290",
// // //       total: "No aprobado",
// // //     },
// // //   ],
// // // }

// // // const Files = () => {
// // //   const [showFichaModal, setShowFichaModal] = useState(false)
// // //   const [showEstudiantesModal, setShowEstudiantesModal] = useState(false)
// // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// // //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// // //   const { logout } = useAuth()
// // //   const navigate = useNavigate()
// // //   const dropdownRef = useRef(null)
// // //   const [currentNivel, setCurrentNivel] = useState(1)
// // //   const [estudiantesActuales, setEstudiantesActuales] = useState([])

// // //   // Función para determinar cuántos niveles tiene el programa de la ficha seleccionada
// // //   const getNivelesCount = () => {
// // //     // Para demostración, usaremos un número aleatorio entre 2 y 5
// // //     return Math.floor(Math.random() * 4) + 2 // Esto dará entre 2 y 5 niveles
// // //   }

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

// // //   const handleShowFicha = () => {
// // //     setShowFichaModal(true)
// // //   }

// // //   const verEstudiantes = (nivel) => {
// // //     console.log("Mostrando estudiantes del nivel:", nivel)
// // //     setCurrentNivel(nivel)

// // //     // Cargar los estudiantes correspondientes al nivel seleccionado
// // //     if (estudiantesDataPorNivel[nivel]) {
// // //       setEstudiantesActuales(estudiantesDataPorNivel[nivel])
// // //     } else {
// // //       // Si no hay datos para este nivel, mostrar un array vacío
// // //       setEstudiantesActuales([])
// // //     }

// // //     setShowFichaModal(false)
// // //     setShowEstudiantesModal(true)
// // //   }

// // //   return (
// // //     <div className="min-h-screen">
// // //       <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
// // //         <div className="container mx-auto flex justify-between items-center">
// // //           <h1 className="text-2xl font-bold text-[#1f384c]">FICHAS</h1>
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
// // //           data={fichasData}
// // //           columns={columns}
// // //           onShow={handleShowFicha}
// // //           title=""
// // //           showActions={{ show: true }}
// // //         />
// // //       </div>

// // //       {/* Ficha Modal - Mantenido del original pero con mejor espaciado */}
// // //       {showFichaModal && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
// // //             <div className="p-6">
// // //               <div className="flex justify-between mb-6">
// // //                 <div className="flex-1">
// // //                   <div className="grid grid-cols-2 gap-4">
// // //                     <div>
// // //                       <div className="text-sm text-[#6c757d]">Ficha:</div>
// // //                       <div className="font-medium">2889927</div>
// // //                     </div>
// // //                     <div>
// // //                       <div className="text-sm text-[#6c757d]">Programa:</div>
// // //                       <div className="font-medium">ADSO</div>
// // //                     </div>
// // //                     <div>
// // //                       <div className="text-sm text-[#6c757d]">Fecha Inicio:</div>
// // //                       <div className="font-medium">23-01-2024</div>
// // //                     </div>
// // //                     <div>
// // //                       <div className="text-sm text-[#6c757d]">Fecha fin:</div>
// // //                       <div className="font-medium">30-01-2025</div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="overflow-x-auto">
// // //                 <div className="mb-4 text-center text-sm text-gray-600">
// // //                   Mostrando {getNivelesCount()} niveles para esta ficha
// // //                 </div>
// // //                 <table className="min-w-full divide-y divide-[#eaeaea]">
// // //                   <thead className="bg-white">
// // //                     <tr>
// // //                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // //                         Nivel
// // //                       </th>
// // //                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // //                         Instructor
// // //                       </th>
// // //                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // //                         N. Aprendices
// // //                       </th>
// // //                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // //                         Estado
// // //                       </th>
// // //                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // //                         Acciones
// // //                       </th>
// // //                     </tr>
// // //                   </thead>
// // //                   <tbody className="bg-white divide-y divide-[#eaeaea]">
// // //                     {/* Generar niveles dinámicamente según el programa de la ficha seleccionada */}
// // //                     {Array.from({ length: getNivelesCount() }).map((_, index) => (
// // //                       <tr key={index}>
// // //                         <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Nivel {index + 1}</td>
// // //                         <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// // //                         <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">{15 + index * 5}</td>
// // //                         <td className="px-6 py-4 whitespace-nowrap">
// // //                           <span
// // //                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// // //                               index === 2 ? "bg-[#e6f7f0] text-[#46ae69]" : "bg-[#ecf0f8] text-[#707fdd]"
// // //                             }`}
// // //                           >
// // //                             {index === 2 ? "En formación" : "Terminado"}
// // //                           </span>
// // //                         </td>
// // //                         <td className="px-6 py-4 whitespace-nowrap text-sm">
// // //                           <Tooltip text="Ver Aprendices" position="top">
// // //                             <button
// // //                               className="bg-[#1f384c] text-white rounded-lg p-1.5"
// // //                               onClick={() => verEstudiantes(index + 1)}
// // //                             >
// // //                               <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //                                 <path
// // //                                   strokeLinecap="round"
// // //                                   strokeLinejoin="round"
// // //                                   strokeWidth={2}
// // //                                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
// // //                                 />
// // //                                 <path
// // //                                   strokeLinecap="round"
// // //                                   strokeLinejoin="round"
// // //                                   strokeWidth={2}
// // //                                   d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
// // //                                 />
// // //                               </svg>
// // //                             </button>
// // //                           </Tooltip>
// // //                         </td>
// // //                       </tr>
// // //                     ))}
// // //                   </tbody>
// // //                 </table>
// // //               </div>

// // //               <div className="mt-6 flex justify-end">
// // //                 <button
// // //                   className="bg-[#f44144] text-white text-sm py-2 px-2 rounded-lg  font-medium hover:bg-red-600 transition-colors"
// // //                   onClick={() => setShowFichaModal(false)}
// // //                 >
// // //                   Cerrar
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Estudiantes Modal - Ahora muestra solo la columna del nivel seleccionado */}
// // //       {showEstudiantesModal && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //           <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-4 max-h-[80vh] ">
// // //             <div className="p-4">
// // //               <h2 className="text-xl font-bold text-center text-[#1f384c] mb-4">
// // //                 Listado de Estudiantes - <span className="text-[#f44144]">NIVEL {currentNivel}</span>
// // //               </h2>

// // //               <div className="mb-4">
// // //                 <table className="min-w-full divide-y divide-gray-200 text-sm">
// // //                   <thead className="bg-white">
// // //                     <tr className="border-b">
// // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
// // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">T.Documento</th>
// // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Número</th>
// // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Estado</th>
// // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nivel {currentNivel}</th>
// // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Ranking</th>
// // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Total</th>
// // //                     </tr>
// // //                   </thead>
// // //                   <tbody className="bg-white divide-y divide-gray-200">
// // //                     {estudiantesActuales.map((estudiante, index) => (
// // //                       <tr key={index}>
// // //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nombre}</td>
// // //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.documento}</td>
// // //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.numero}</td>
// // //                         <td className="px-3 py-2 whitespace-nowrap">
// // //                           <span
// // //                             className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
// // //                               estudiante.estado === "activo"
// // //                                 ? "bg-green-100 text-green-800"
// // //                                 : estudiante.estado === "retirado"
// // //                                   ? "bg-yellow-100 text-yellow-800"
// // //                                   : estudiante.estado === "completado"
// // //                                     ? "bg-blue-100 text-blue-800"
// // //                                     : "bg-red-100 text-red-800"
// // //                             }`}
// // //                           >
// // //                             {estudiante.estado}
// // //                           </span>
// // //                         </td>
// // //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">
// // //                           <span
// // //                             className={`px-2 py-0.5 rounded-full text-xs font-medium ${
// // //                               estudiante.calificacion === "Aprobado"
// // //                                 ? "bg-green-100 text-green-800"
// // //                                 : "bg-red-100 text-red-800"
// // //                             }`}
// // //                           >
// // //                             {estudiante.calificacion}
// // //                           </span>
// // //                         </td>
// // //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.ranking}</td>
// // //                         <td className="px-3 py-2 whitespace-nowrap text-sm">
// // //                           <span
// // //                             className={`px-2 py-0.5 rounded-full text-xs font-medium ${
// // //                               estudiante.total === "Aprobado"
// // //                                 ? "bg-green-100 text-green-800"
// // //                                 : "bg-red-100 text-red-800"
// // //                             }`}
// // //                           >
// // //                             {estudiante.total}
// // //                           </span>
// // //                         </td>
// // //                       </tr>
// // //                     ))}
// // //                   </tbody>
// // //                 </table>
// // //               </div>

// // //               <div className="flex justify-center">
// // //                 <button
// // //                   className="bg-[#f44144] text-white px-4 py-1.5 rounded-lg text-sm"
// // //                   onClick={() => setShowEstudiantesModal(false)}
// // //                 >
// // //                   Cerrar
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

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

// // // export default Files
// // "use client"

// // import { useState, useEffect, useRef } from "react"
// // import { ChevronDown } from "lucide-react"
// // import { useNavigate } from "react-router-dom"
// // import GenericTable from "../../../shared/components/Table"
// // import { useAuth } from "../../auth/hooks/useAuth"
// // import ConfirmationModal from "../../../shared/components/ConfirmationModal"
// // import Tooltip from "../../../shared/components/Tooltip"

// // // Datos reales de fichas
// // const fichasData = [
// //   {
// //     id: "2889927",
// //     programa: "ADSO",
// //     instructor: "Diego Gómez",
// //     cantidad: 30,
// //     fechaInicio: "21-03-2023",
// //     fechaFin: "21-03-2025",
// //     nivel: 1,
// //     estado: "En formación",
// //     niveles: 3, // Este programa tiene 3 niveles
// //   },
// //   {
// //     id: "2345678",
// //     programa: "ADSO",
// //     instructor: "Juan Pérez",
// //     cantidad: 25,
// //     fechaInicio: "21-03-2022",
// //     fechaFin: "21-03-2024",
// //     nivel: 1,
// //     estado: "En formación",
// //     niveles: 3,
// //   },
// //   {
// //     id: "5567653",
// //     programa: "ADSO",
// //     instructor: "Yaritza Esquivel",
// //     cantidad: 10,
// //     fechaInicio: "21-03-2024",
// //     fechaFin: "21-03-2026",
// //     nivel: 2,
// //     estado: "En formación",
// //     niveles: 3,
// //   },
// //   {
// //     id: "3747477",
// //     programa: "Redes",
// //     instructor: "Patricia López",
// //     cantidad: 26,
// //     fechaInicio: "21-03-2023",
// //     fechaFin: "21-03-2024",
// //     nivel: 2,
// //     estado: "cerrada",
// //     niveles: 4, // Este programa tiene 4 niveles
// //   },
// //   {
// //     id: "4847373",
// //     programa: "Redes",
// //     instructor: "Juan Pérez",
// //     cantidad: 14,
// //     fechaInicio: "21-03-2020",
// //     fechaFin: "21-03-2023",
// //     nivel: 3,
// //     estado: "Terminada",
// //     niveles: 4,
// //   },
// //   {
// //     id: "3747477",
// //     programa: "Redes",
// //     instructor: "Diego Gómez",
// //     cantidad: 18,
// //     fechaInicio: "21-03-2023",
// //     fechaFin: "21-03-2025",
// //     nivel: 3,
// //     estado: "Terminada",
// //     niveles: 4,
// //   },
// // ]

// // const columns = [
// //   { key: "id", label: "Ficha" },
// //   { key: "programa", label: "Programa" },
// //   { key: "instructor", label: "Instructor" },
// //   { key: "cantidad", label: "Cantidad Aprendices" },
// //   { key: "fechaInicio", label: "Fecha Inicio" },
// //   { key: "fechaFin", label: "Fecha Fin" },
// //   { key: "nivel", label: "Nivel" },
// //   {
// //     key: "estado",
// //     label: "Estado",
// //     render: (item) => (
// //       <span
// //         className={`px-2 py-1 rounded-full text-xs font-medium ${
// //           item.estado === "En formación"
// //             ? "bg-green-100 text-green-800"
// //             : item.estado === "Terminada"
// //               ? "bg-blue-100 text-blue-800"
// //               : "bg-red-100 text-red-800"
// //         }`}
// //       >
// //         {item.estado}
// //       </span>
// //     ),
// //   },
// // ]

// // // Datos de instructores por nivel
// // const instructoresPorNivel = {
// //   ADSO: {
// //     1: "Yaritza Ortiz",
// //     2: "Diego Gómez",
// //     3: "Juan Pérez",
// //   },
// //   Redes: {
// //     1: "Patricia López",
// //     2: "Carlos Rodríguez",
// //     3: "María González",
// //     4: "Luis Martínez",
// //   },
// // }

// // // Datos reales de estudiantes por nivel
// // const estudiantesDataPorNivel = {
// //   // Nivel 1 - ADSO
// //   "ADSO-1": [
// //     {
// //       nombre: "Andres Felipe Gómez",
// //       documento: "C.C",
// //       numero: "1023456789",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "900",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Daniel Andrés Pérez",
// //       documento: "C.C",
// //       numero: "1029876543",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "850",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Gohan Esteban Martínez",
// //       documento: "C.C",
// //       numero: "1034567890",
// //       estado: "activo",
// //       calificacion: "No aprobado",
// //       ranking: "500",
// //       total: "No aprobado",
// //     },
// //     {
// //       nombre: "Laura Sofía Rodríguez",
// //       documento: "C.C",
// //       numero: "1045678901",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "820",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Carlos Eduardo López",
// //       documento: "C.C",
// //       numero: "1056789012",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "780",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "María Fernanda Torres",
// //       documento: "C.C",
// //       numero: "1067890123",
// //       estado: "activo",
// //       calificacion: "No aprobado",
// //       ranking: "450",
// //       total: "No aprobado",
// //     },
// //     {
// //       nombre: "Juan David Sánchez",
// //       documento: "C.C",
// //       numero: "1078901234",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "750",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Valentina Ramírez",
// //       documento: "C.C",
// //       numero: "1089012345",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "830",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Santiago Herrera",
// //       documento: "C.C",
// //       numero: "1090123456",
// //       estado: "retirado",
// //       calificacion: "No aprobado",
// //       ranking: "300",
// //       total: "No aprobado",
// //     },
// //     {
// //       nombre: "Isabella Gómez",
// //       documento: "C.C",
// //       numero: "1001234567",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "790",
// //       total: "Aprobado",
// //     },
// //   ],
// //   // Nivel 2 - ADSO
// //   "ADSO-2": [
// //     {
// //       nombre: "Andrés Felipe Gómez",
// //       documento: "C.C",
// //       numero: "1023456789",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "880",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Daniel Andrés Pérez",
// //       documento: "C.C",
// //       numero: "1029876543",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "830",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Laura Sofía Rodríguez",
// //       documento: "C.C",
// //       numero: "1045678901",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "800",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Carlos Eduardo López",
// //       documento: "C.C",
// //       numero: "1056789012",
// //       estado: "activo",
// //       calificacion: "No aprobado",
// //       ranking: "400",
// //       total: "No aprobado",
// //     },
// //     {
// //       nombre: "Juan David Sánchez",
// //       documento: "C.C",
// //       numero: "1078901234",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "730",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Valentina Ramírez",
// //       documento: "C.C",
// //       numero: "1089012345",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "810",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Isabella Gómez",
// //       documento: "C.C",
// //       numero: "1001234567",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "770",
// //       total: "Aprobado",
// //     },
// //   ],
// //   // Nivel 3 - ADSO
// //   "ADSO-3": [
// //     {
// //       nombre: "Andrés Felipe Gómez",
// //       documento: "C.C",
// //       numero: "1023456789",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "860",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Daniel Andrés Pérez",
// //       documento: "C.C",
// //       numero: "1029876543",
// //       estado: "activo",
// //       calificacion: "No aprobado",
// //       ranking: "420",
// //       total: "No aprobado",
// //     },
// //     {
// //       nombre: "Laura Sofía Rodríguez",
// //       documento: "C.C",
// //       numero: "1045678901",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "780",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Juan David Sánchez",
// //       documento: "C.C",
// //       numero: "1078901234",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "710",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Valentina Ramírez",
// //       documento: "C.C",
// //       numero: "1089012345",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "790",
// //       total: "Aprobado",
// //     },
// //   ],
// //   // Nivel 1 - Redes
// //   "Redes-1": [
// //     {
// //       nombre: "Mateo Alejandro Díaz",
// //       documento: "C.C",
// //       numero: "1112345678",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "850",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Sofía Catalina Vargas",
// //       documento: "C.C",
// //       numero: "1123456789",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "820",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Sebastián Andrés Morales",
// //       documento: "C.C",
// //       numero: "1134567890",
// //       estado: "activo",
// //       calificacion: "No aprobado",
// //       ranking: "480",
// //       total: "No aprobado",
// //     },
// //     {
// //       nombre: "Camila Andrea Ortiz",
// //       documento: "C.C",
// //       numero: "1145678901",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "800",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Nicolás Alejandro Jiménez",
// //       documento: "C.C",
// //       numero: "1156789012",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "760",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Valentina Isabel Castro",
// //       documento: "C.C",
// //       numero: "1167890123",
// //       estado: "retirado",
// //       calificacion: "No aprobado",
// //       ranking: "320",
// //       total: "No aprobado",
// //     },
// //     {
// //       nombre: "Samuel Esteban Ríos",
// //       documento: "C.C",
// //       numero: "1178901234",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "730",
// //       total: "Aprobado",
// //     },
// //   ],
// //   // Nivel 2 - Redes
// //   "Redes-2": [
// //     {
// //       nombre: "Mateo Alejandro Díaz",
// //       documento: "C.C",
// //       numero: "1112345678",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "830",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Sofía Catalina Vargas",
// //       documento: "C.C",
// //       numero: "1123456789",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "800",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Camila Andrea Ortiz",
// //       documento: "C.C",
// //       numero: "1145678901",
// //       estado: "activo",
// //       calificacion: "No aprobado",
// //       ranking: "430",
// //       total: "No aprobado",
// //     },
// //     {
// //       nombre: "Nicolás Alejandro Jiménez",
// //       documento: "C.C",
// //       numero: "1156789012",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "740",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Samuel Esteban Ríos",
// //       documento: "C.C",
// //       numero: "1178901234",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "710",
// //       total: "Aprobado",
// //     },
// //   ],
// //   // Nivel 3 - Redes
// //   "Redes-3": [
// //     {
// //       nombre: "Mateo Alejandro Díaz",
// //       documento: "C.C",
// //       numero: "1112345678",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "810",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Sofía Catalina Vargas",
// //       documento: "C.C",
// //       numero: "1123456789",
// //       estado: "activo",
// //       calificacion: "No aprobado",
// //       ranking: "410",
// //       total: "No aprobado",
// //     },
// //     {
// //       nombre: "Nicolás Alejandro Jiménez",
// //       documento: "C.C",
// //       numero: "1156789012",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "720",
// //       total: "Aprobado",
// //     },
// //   ],
// //   // Nivel 4 - Redes
// //   "Redes-4": [
// //     {
// //       nombre: "Mateo Alejandro Díaz",
// //       documento: "C.C",
// //       numero: "1112345678",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "790",
// //       total: "Aprobado",
// //     },
// //     {
// //       nombre: "Nicolás Alejandro Jiménez",
// //       documento: "C.C",
// //       numero: "1156789012",
// //       estado: "activo",
// //       calificacion: "Aprobado",
// //       ranking: "700",
// //       total: "Aprobado",
// //     },
// //   ],
// // }

// // const Files = () => {
// //   const [showFichaModal, setShowFichaModal] = useState(false)
// //   const [showEstudiantesModal, setShowEstudiantesModal] = useState(false)
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// //   const { logout } = useAuth()
// //   const navigate = useNavigate()
// //   const dropdownRef = useRef(null)
// //   const [currentNivel, setCurrentNivel] = useState(1)
// //   const [estudiantesActuales, setEstudiantesActuales] = useState([])
// //   const [selectedFicha, setSelectedFicha] = useState(null)
// //   const [nivelesCount, setNivelesCount] = useState(3)

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

// //   const handleShowFicha = (ficha) => {
// //     setSelectedFicha(ficha)
// //     setNivelesCount(ficha.niveles || 3) // Usar la cantidad de niveles de la ficha o 3 por defecto
// //     setShowFichaModal(true)
// //   }

// //   const verEstudiantes = (nivel) => {
// //     console.log("Mostrando estudiantes del nivel:", nivel)
// //     setCurrentNivel(nivel)

// //     // Cargar los estudiantes correspondientes al programa y nivel seleccionados
// //     const programaNivel = `${selectedFicha.programa}-${nivel}`
// //     if (estudiantesDataPorNivel[programaNivel]) {
// //       setEstudiantesActuales(estudiantesDataPorNivel[programaNivel])
// //     } else {
// //       // Si no hay datos para este nivel, mostrar un array vacío
// //       setEstudiantesActuales([])
// //     }

// //     setShowFichaModal(false)
// //     setShowEstudiantesModal(true)
// //   }

// //   return (
// //     <div className="min-h-screen">
// //       <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
// //         <div className="container mx-auto flex justify-between items-center">
// //           <h1 className="text-2xl font-bold text-[#1f384c]">FICHAS</h1>
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
// //           data={fichasData}
// //           columns={columns}
// //           onShow={handleShowFicha}
// //           title=""
// //           showActions={{ show: true }}
// //         />
// //       </div>

// //       {/* Ficha Modal - Ahora muestra los niveles correctos según el programa */}
// //       {showFichaModal && selectedFicha && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
// //             <div className="p-6">
// //               <div className="flex justify-between mb-6">
// //                 <div className="flex-1">
// //                   <div className="grid grid-cols-2 gap-4">
// //                     <div>
// //                       <div className="text-sm text-[#6c757d]">Ficha:</div>
// //                       <div className="font-medium">{selectedFicha.id}</div>
// //                     </div>
// //                     <div>
// //                       <div className="text-sm text-[#6c757d]">Programa:</div>
// //                       <div className="font-medium">{selectedFicha.programa}</div>
// //                     </div>
// //                     <div>
// //                       <div className="text-sm text-[#6c757d]">Fecha Inicio:</div>
// //                       <div className="font-medium">{selectedFicha.fechaInicio}</div>
// //                     </div>
// //                     <div>
// //                       <div className="text-sm text-[#6c757d]">Fecha fin:</div>
// //                       <div className="font-medium">{selectedFicha.fechaFin}</div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="overflow-x-auto">
// //                 <div className="mb-4 text-center text-sm text-gray-600">
// //                   Mostrando {nivelesCount} niveles para esta ficha
// //                 </div>
// //                 <table className="min-w-full divide-y divide-[#eaeaea]">
// //                   <thead className="bg-white">
// //                     <tr>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// //                         Nivel
// //                       </th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// //                         Instructor
// //                       </th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// //                         N. Aprendices
// //                       </th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// //                         Estado
// //                       </th>
// //                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// //                         Acciones
// //                       </th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="bg-white divide-y divide-[#eaeaea]">
// //                     {/* Generar niveles dinámicamente según el programa de la ficha seleccionada */}
// //                     {Array.from({ length: nivelesCount }).map((_, index) => {
// //                       const nivel = index + 1
// //                       const programaNivel = `${selectedFicha.programa}-${nivel}`
// //                       const cantidadEstudiantes = estudiantesDataPorNivel[programaNivel]?.length || 0
// //                       const instructor = instructoresPorNivel[selectedFicha.programa]?.[nivel] || "No asignado"

// //                       return (
// //                         <tr key={index}>
// //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Nivel {nivel}</td>
// //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">{instructor}</td>
// //                           <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">{cantidadEstudiantes}</td>
// //                           <td className="px-6 py-4 whitespace-nowrap">
// //                             <span
// //                               className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                                 nivel === selectedFicha.nivel
// //                                   ? "bg-[#e6f7f0] text-[#46ae69]"
// //                                   : nivel < selectedFicha.nivel
// //                                     ? "bg-[#ecf0f8] text-[#707fdd]"
// //                                     : "bg-[#f9e6e6] text-[#c60b0e]"
// //                               }`}
// //                             >
// //                               {nivel === selectedFicha.nivel
// //                                 ? "En formación"
// //                                 : nivel < selectedFicha.nivel
// //                                   ? "Terminado"
// //                                   : "No iniciado"}
// //                             </span>
// //                           </td>
// //                           <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                             <Tooltip text="Ver Aprendices" position="top">
// //                               <button
// //                                 className="bg-[#1f384c] text-white rounded-lg p-1.5"
// //                                 onClick={() => verEstudiantes(nivel)}
// //                               >
// //                                 <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                                   <path
// //                                     strokeLinecap="round"
// //                                     strokeLinejoin="round"
// //                                     strokeWidth={2}
// //                                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
// //                                   />
// //                                   <path
// //                                     strokeLinecap="round"
// //                                     strokeLinejoin="round"
// //                                     strokeWidth={2}
// //                                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
// //                                   />
// //                                 </svg>
// //                               </button>
// //                             </Tooltip>
// //                           </td>
// //                         </tr>
// //                       )
// //                     })}
// //                   </tbody>
// //                 </table>
// //               </div>

// //               <div className="mt-6 flex justify-end">
// //                 <button
// //                   className="bg-[#f44144] text-white text-sm py-2 px-2 rounded-lg  font-medium hover:bg-red-600 transition-colors"
// //                   onClick={() => setShowFichaModal(false)}
// //                 >
// //                   Cerrar
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Estudiantes Modal - Ahora muestra solo la columna del nivel seleccionado */}
// //       {showEstudiantesModal && selectedFicha && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-4 max-h-[80vh] overflow-auto">
// //             <div className="p-4">
// //               <h2 className="text-xl font-bold text-center text-[#1f384c] mb-4">
// //                 Listado de Estudiantes -  <span className="text-[#1f384c] mb-4">nivel {currentNivel}</span>
// //               </h2>

// //               <div className="mb-4">
// //                 {estudiantesActuales.length > 0 ? (
// //                   <table className="min-w-full divide-y divide-gray-200 text-sm">
// //                     <thead className="bg-white">
// //                       <tr className="border-b">
// //                         <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
// //                         <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">T.Documento</th>
// //                         <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Número</th>
// //                         <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Estado</th>
// //                         <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nivel {currentNivel}</th>
// //                         <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Ranking</th>
// //                         <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Total</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="bg-white divide-y divide-gray-200">
// //                       {estudiantesActuales.map((estudiante, index) => (
// //                         <tr key={index}>
// //                           <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nombre}</td>
// //                           <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.documento}</td>
// //                           <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.numero}</td>
// //                           <td className="px-3 py-2 whitespace-nowrap">
// //                             <span
// //                               className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                                 estudiante.estado === "activo"
// //                                   ? "bg-green-100 text-green-800"
// //                                   : estudiante.estado === "retirado"
// //                                     ? "bg-yellow-100 text-yellow-800"
// //                                     : estudiante.estado === "completado"
// //                                       ? "bg-blue-100 text-blue-800"
// //                                       : "bg-red-100 text-red-800"
// //                               }`}
// //                             >
// //                               {estudiante.estado}
// //                             </span>
// //                           </td>
// //                           <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">
// //                             <span
// //                               className={`px-2 py-0.5 rounded-full text-xs font-medium ${
// //                                 estudiante.calificacion === "Aprobado"
// //                                   ? "bg-green-100 text-green-800"
// //                                   : "bg-red-100 text-red-800"
// //                               }`}
// //                             >
// //                               {estudiante.calificacion}
// //                             </span>
// //                           </td>
// //                           <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.ranking}</td>
// //                           <td className="px-3 py-2 whitespace-nowrap text-sm">
// //                             <span
// //                               className={`px-2 py-0.5 rounded-full text-xs font-medium ${
// //                                 estudiante.total === "Aprobado"
// //                                   ? "bg-green-100 text-green-800"
// //                                   : "bg-red-100 text-red-800"
// //                               }`}
// //                             >
// //                               {estudiante.total}
// //                             </span>
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 ) : (
// //                   <div className="text-center py-8 bg-gray-50 rounded-lg">
// //                     <p className="text-gray-500">No hay estudiantes registrados para este nivel</p>
// //                   </div>
// //                 )}
// //               </div>

// //               <div className="flex justify-between">
// //                 <button
// //                   className="bg-[#1f384c] text-white px-4 py-1.5 rounded-lg text-sm"
// //                   onClick={() => {
// //                     setShowEstudiantesModal(false)
// //                     setShowFichaModal(true)
// //                   }}
// //                 >
// //                   Volver a Ficha
// //                 </button>
// //                 <button
// //                   className="bg-[#f44144] text-white px-4 py-1.5 rounded-lg text-sm"
// //                   onClick={() => {
// //                     setShowEstudiantesModal(false)
// //                     setShowFichaModal(true)
// //                   }}
// //                 >
// //                   Cerrar
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

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

// // export default Files
// "use client"

// import { useState, useEffect, useRef } from "react"
// import { ChevronDown } from "lucide-react"
// import { useNavigate } from "react-router-dom"
// import GenericTable from "../../../shared/components/Table"
// import { useAuth } from "../../auth/hooks/useAuth"
// import ConfirmationModal from "../../../shared/components/ConfirmationModal"
// import Tooltip from "../../../shared/components/Tooltip"

// // Datos reales de fichas
// const fichasData = [
//   {
//     id: "2889927",
//     programa: "ADSO",
//     instructor: "Diego Gómez",
//     cantidad: 30,
//     fechaInicio: "21-03-2023",
//     fechaFin: "21-03-2025",
//     nivel: 1,
//     estado: "En formación",
//     niveles: 3, // Este programa tiene 3 niveles
//   },
//   {
//     id: "2345678",
//     programa: "ADSO",
//     instructor: "Juan Pérez",
//     cantidad: 25,
//     fechaInicio: "21-03-2022",
//     fechaFin: "21-03-2024",
//     nivel: 1,
//     estado: "En formación",
//     niveles: 3,
//   },
//   {
//     id: "5567653",
//     programa: "ADSO",
//     instructor: "Yaritza Esquivel",
//     cantidad: 10,
//     fechaInicio: "21-03-2024",
//     fechaFin: "21-03-2026",
//     nivel: 2,
//     estado: "En formación",
//     niveles: 3,
//   },
//   {
//     id: "4847373",
//     programa: "Redes",
//     instructor: "Juan Pérez",
//     cantidad: 14,
//     fechaInicio: "21-03-2020",
//     fechaFin: "21-03-2023",
//     nivel: 3,
//     estado: "Terminada",
//     niveles: 4,
//   },
//   {
//     id: "3747477",
//     programa: "Redes",
//     instructor: "Diego Gómez",
//     cantidad: 18,
//     fechaInicio: "21-03-2023",
//     fechaFin: "21-03-2025",
//     nivel: 3,
//     estado: "Terminada",
//     niveles: 4,
//   },
// ]

// const columns = [
//   { key: "id", label: "Ficha" },
//   { key: "programa", label: "Programa" },
//   // { key: "instructor", label: "Instructor" },
//   { key: "cantidad", label: "Cantidad Aprendices" },
//   { key: "fechaInicio", label: "Fecha Inicio" },
//   { key: "fechaFin", label: "Fecha Fin" },
//   { key: "nivel", label: "Nivel" },
//   {
//     key: "estado",
//     label: "Estado",
//     render: (item) => (
//       <span
//         className={`px-2 py-1 rounded-full text-xs font-medium ${
//           item.estado === "En formación"
//             ? "bg-green-100 text-green-800"
//             : item.estado === "Terminada"
//               ? "bg-blue-100 text-blue-800"
//               : "bg-red-100 text-red-800"
//         }`}
//       >
//         {item.estado}
//       </span>
//     ),
//   },
// ]

// // Datos de instructores por nivel
// const instructoresPorNivel = {
//   ADSO: {
//     1: "Yaritza Ortiz",
//     2: "Diego Gómez",
//     3: "Juan Pérez",
//   },
//   Redes: {
//     1: "Patricia López",
//     2: "Carlos Rodríguez",
//     3: "María González",
//     4: "Luis Martínez",
//   },
// }

// // Datos reales de estudiantes por nivel
// const estudiantesDataPorNivel = {
//   // Nivel 1 - ADSO
//   "ADSO-1": [
//     {
//       nombre: "Andres Felipe Gómez",
//       documento: "C.C",
//       numero: "1023456789",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "900",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Daniel Andrés Pérez",
//       documento: "C.C",
//       numero: "1029876543",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "850",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Gohan Esteban Martínez",
//       documento: "C.C",
//       numero: "1034567890",
//       estado: "activo",
//       calificacion: "No aprobado",
//       ranking: "500",
//       total: "No aprobado",
//     },
//     {
//       nombre: "Laura Sofía Rodríguez",
//       documento: "C.C",
//       numero: "1045678901",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "820",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Carlos Eduardo López",
//       documento: "C.C",
//       numero: "1056789012",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "780",
//       total: "Aprobado",
//     },
//     {
//       nombre: "María Fernanda Torres",
//       documento: "C.C",
//       numero: "1067890123",
//       estado: "activo",
//       calificacion: "No aprobado",
//       ranking: "450",
//       total: "No aprobado",
//     },
//     {
//       nombre: "Juan David Sánchez",
//       documento: "C.C",
//       numero: "1078901234",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "750",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Valentina Ramírez",
//       documento: "C.C",
//       numero: "1089012345",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "830",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Santiago Herrera",
//       documento: "C.C",
//       numero: "1090123456",
//       estado: "retirado",
//       calificacion: "No aprobado",
//       ranking: "300",
//       total: "No aprobado",
//     },
//     {
//       nombre: "Isabella Gómez",
//       documento: "C.C",
//       numero: "1001234567",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "790",
//       total: "Aprobado",
//     },
//   ],
//   // Nivel 2 - ADSO
//   "ADSO-2": [
//     {
//       nombre: "Andrés Felipe Gómez",
//       documento: "C.C",
//       numero: "1023456789",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "880",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Daniel Andrés Pérez",
//       documento: "C.C",
//       numero: "1029876543",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "830",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Laura Sofía Rodríguez",
//       documento: "C.C",
//       numero: "1045678901",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "800",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Carlos Eduardo López",
//       documento: "C.C",
//       numero: "1056789012",
//       estado: "activo",
//       calificacion: "No aprobado",
//       ranking: "400",
//       total: "No aprobado",
//     },
//     {
//       nombre: "Juan David Sánchez",
//       documento: "C.C",
//       numero: "1078901234",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "730",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Valentina Ramírez",
//       documento: "C.C",
//       numero: "1089012345",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "810",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Isabella Gómez",
//       documento: "C.C",
//       numero: "1001234567",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "770",
//       total: "Aprobado",
//     },
//   ],
//   // Nivel 3 - ADSO
//   "ADSO-3": [
//     {
//       nombre: "Andrés Felipe Gómez",
//       documento: "C.C",
//       numero: "1023456789",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "860",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Daniel Andrés Pérez",
//       documento: "C.C",
//       numero: "1029876543",
//       estado: "activo",
//       calificacion: "No aprobado",
//       ranking: "420",
//       total: "No aprobado",
//     },
//     {
//       nombre: "Laura Sofía Rodríguez",
//       documento: "C.C",
//       numero: "1045678901",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "780",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Juan David Sánchez",
//       documento: "C.C",
//       numero: "1078901234",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "710",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Valentina Ramírez",
//       documento: "C.C",
//       numero: "1089012345",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "790",
//       total: "Aprobado",
//     },
//   ],
//   // Nivel 1 - Redes
//   "Redes-1": [
//     {
//       nombre: "Mateo Alejandro Díaz",
//       documento: "C.C",
//       numero: "1112345678",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "850",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Sofía Catalina Vargas",
//       documento: "C.C",
//       numero: "1123456789",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "820",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Sebastián Andrés Morales",
//       documento: "C.C",
//       numero: "1134567890",
//       estado: "activo",
//       calificacion: "No aprobado",
//       ranking: "480",
//       total: "No aprobado",
//     },
//     {
//       nombre: "Camila Andrea Ortiz",
//       documento: "C.C",
//       numero: "1145678901",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "800",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Nicolás Alejandro Jiménez",
//       documento: "C.C",
//       numero: "1156789012",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "760",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Valentina Isabel Castro",
//       documento: "C.C",
//       numero: "1167890123",
//       estado: "retirado",
//       calificacion: "No aprobado",
//       ranking: "320",
//       total: "No aprobado",
//     },
//     {
//       nombre: "Samuel Esteban Ríos",
//       documento: "C.C",
//       numero: "1178901234",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "730",
//       total: "Aprobado",
//     },
//   ],
//   // Nivel 2 - Redes
//   "Redes-2": [
//     {
//       nombre: "Mateo Alejandro Díaz",
//       documento: "C.C",
//       numero: "1112345678",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "830",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Sofía Catalina Vargas",
//       documento: "C.C",
//       numero: "1123456789",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "800",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Camila Andrea Ortiz",
//       documento: "C.C",
//       numero: "1145678901",
//       estado: "activo",
//       calificacion: "No aprobado",
//       ranking: "430",
//       total: "No aprobado",
//     },
//     {
//       nombre: "Nicolás Alejandro Jiménez",
//       documento: "C.C",
//       numero: "1156789012",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "740",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Samuel Esteban Ríos",
//       documento: "C.C",
//       numero: "1178901234",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "710",
//       total: "Aprobado",
//     },
//   ],
//   // Nivel 3 - Redes
//   "Redes-3": [
//     {
//       nombre: "Mateo Alejandro Díaz",
//       documento: "C.C",
//       numero: "1112345678",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "810",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Sofía Catalina Vargas",
//       documento: "C.C",
//       numero: "1123456789",
//       estado: "activo",
//       calificacion: "No aprobado",
//       ranking: "410",
//       total: "No aprobado",
//     },
//     {
//       nombre: "Nicolás Alejandro Jiménez",
//       documento: "C.C",
//       numero: "1156789012",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "720",
//       total: "Aprobado",
//     },
//   ],
//   // Nivel 4 - Redes
//   "Redes-4": [
//     {
//       nombre: "Mateo Alejandro Díaz",
//       documento: "C.C",
//       numero: "1112345678",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "790",
//       total: "Aprobado",
//     },
//     {
//       nombre: "Nicolás Alejandro Jiménez",
//       documento: "C.C",
//       numero: "1156789012",
//       estado: "activo",
//       calificacion: "Aprobado",
//       ranking: "700",
//       total: "Aprobado",
//     },
//   ],
// }

// const Files = () => {
//   const [showFichaModal, setShowFichaModal] = useState(false)
//   const [showEstudiantesModal, setShowEstudiantesModal] = useState(false)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
//   const { logout } = useAuth()
//   const navigate = useNavigate()
//   const dropdownRef = useRef(null)
//   const [currentNivel, setCurrentNivel] = useState(1)
//   const [estudiantesActuales, setEstudiantesActuales] = useState([])
//   const [selectedFicha, setSelectedFicha] = useState(null)
//   const [nivelesCount, setNivelesCount] = useState(3)

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

//   const handleShowFicha = (ficha) => {
//     setSelectedFicha(ficha)
//     setNivelesCount(ficha.niveles || 3) // Usar la cantidad de niveles de la ficha o 3 por defecto
//     setShowFichaModal(true)
//   }

//   const verEstudiantes = (nivel) => {
//     console.log("Mostrando estudiantes del nivel:", nivel)
//     setCurrentNivel(nivel)

//     // Cargar los estudiantes correspondientes al programa y nivel seleccionados
//     const programaNivel = `${selectedFicha.programa}-${nivel}`
//     if (estudiantesDataPorNivel[programaNivel]) {
//       setEstudiantesActuales(estudiantesDataPorNivel[programaNivel])
//     } else {
//       // Si no hay datos para este nivel, mostrar un array vacío
//       setEstudiantesActuales([])
//     }

//     setShowFichaModal(false)
//     setShowEstudiantesModal(true)
//   }

//   return (
//     <div className="min-h-screen">
//       <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
//         <div className="container mx-auto flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-[#1f384c]">FICHAS</h1>
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
//           data={fichasData}
//           columns={columns}
//           onShow={handleShowFicha}
//           title=""
//           showActions={{ show: true }}
//         />
//       </div>

//       {/* Ficha Modal - Ahora muestra los niveles correctos según el programa */}
//       {showFichaModal && selectedFicha && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
//             <div className="p-6">
//               <div className="flex justify-between mb-6">
//                 <div className="flex-1">
                  
//                   <div className="grid grid-cols-2 gap-4">

//                     <div>
//                       <div className="text-sm text-[#6c757d]">Ficha:</div>
//                       <div className="font-medium">{selectedFicha.id}</div>
//                     </div>
//                     <div>
//                       <div className="text-sm text-[#6c757d]">Programa:</div>
//                       <div className="font-medium">{selectedFicha.programa}</div>
//                     </div>
//                     <div>
//                       <div className="text-sm text-[#6c757d]">Fecha Inicio:</div>
//                       <div className="font-medium">{selectedFicha.fechaInicio}</div>
//                     </div>
//                     <div>
//                       <div className="text-sm text-[#6c757d]">Fecha fin:</div>
//                       <div className="font-medium">{selectedFicha.fechaFin}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="overflow-x-auto">
//                 {/* <div className="mb-4 text-center text-sm text-gray-600">
//                   Mostrando {nivelesCount} niveles para esta ficha
//                 </div> */}
//                                 <div className="text-sm font-medium text-[#627b87] mb-2">Niveles asociados a la ficha:</div>

//                 <table className="min-w-full divide-y divide-[#eaeaea]">
//                   <thead className="bg-white">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
//                         Nivel
//                       </th>
//                       {/* <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
//                         Instructor
//                       </th> */}
//                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
//                         N. Aprendices
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
//                         Estado
//                       </th>
//                       {/* <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
//                         Acciones
//                       </th> */}
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-[#eaeaea]">
//                     {/* Generar niveles dinámicamente según el programa de la ficha seleccionada */}
//                     {Array.from({ length: nivelesCount }).map((_, index) => {
//                       const nivel = index + 1
//                       const programaNivel = `${selectedFicha.programa}-${nivel}`
//                       const cantidadEstudiantes = estudiantesDataPorNivel[programaNivel]?.length || 0
//                       const instructor = instructoresPorNivel[selectedFicha.programa]?.[nivel] || "No asignado"

//                       return (
//                         <tr key={index}>
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Nivel {nivel}</td>
//                           {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">{instructor}</td> */}
//                           <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">{cantidadEstudiantes}</td>
//                           {/* <td className="px-6 py-4 whitespace-nowrap">
//                             <span
//                               className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                                 nivel === selectedFicha.nivel
//                                   ? "bg-[#e6f7f0] text-[#46ae69]"
//                                   : nivel < selectedFicha.nivel
//                                     ? "bg-[#ecf0f8] text-[#707fdd]"
//                                     : "bg-[#f9e6e6] text-[#c60b0e]"
//                               }`}
//                             >
//                               {nivel === selectedFicha.nivel
//                                 ? "En formación"
//                                 : nivel < selectedFicha.nivel
//                                   ? "Terminado"
//                                   : "No iniciado"}
//                             </span>
//                           </td> */}
//                           <td className="px-6 py-4 whitespace-nowrap text-sm">
//                             <Tooltip text="Ver Aprendices" position="top">
//                               <button
//                                 className="bg-[#1f384c] text-white rounded-lg p-1.5"
//                                 onClick={() => verEstudiantes(nivel)}
//                               >
//                                 <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                                   />
//                                   <path
//                                     strokeLinecap="round"
//                                     strokeLinejoin="round"
//                                     strokeWidth={2}
//                                     d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                                   />
//                                 </svg>
//                               </button>
//                             </Tooltip>
//                           </td>
//                         </tr>
//                       )
//                     })}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="mt-6 flex justify-end">
//                 <button
//                   className="bg-[#f44144] text-white text-sm py-2 px-2 rounded-lg  font-medium hover:bg-red-600 transition-colors"
//                   onClick={() => setShowFichaModal(false)}
//                 >
//                   Cerrar
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Estudiantes Modal - Ahora muestra solo la columna del nivel seleccionado */}
//       {showEstudiantesModal && selectedFicha && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-4 max-h-[80vh] overflow-auto">
//             <div className="p-4">
//               <h2 className="text-xl font-bold text-center text-[#1f384c] mb-4">
//                 Listado de Estudiantes - <span className="text-[#1f384c] mb-4">Nivel {currentNivel}</span>
//               </h2>

//               <div className="mb-4">
//                 {estudiantesActuales.length > 0 ? (
//                   <table className="min-w-full divide-y divide-gray-200 text-sm">
//                     <thead className="bg-white">
//                       <tr className="border-b">
//                         <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
//                         <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">T.Documento</th>
//                         <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Número</th>
//                         <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Estado</th>
//                         <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nivel {currentNivel}</th>
//                         <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Ranking</th>
//                         <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Total</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {estudiantesActuales.map((estudiante, index) => (
//                         <tr key={index}>
//                           <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nombre}</td>
//                           <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.documento}</td>
//                           <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.numero}</td>
//                           <td className="px-3 py-2 whitespace-nowrap">
//                             <span
//                               className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                                 estudiante.estado === "activo"
//                                   ? "bg-green-100 text-green-800"
//                                   : estudiante.estado === "retirado"
//                                     ? "bg-yellow-100 text-yellow-800"
//                                     : estudiante.estado === "completado"
//                                       ? "bg-blue-100 text-blue-800"
//                                       : "bg-red-100 text-red-800"
//                               }`}
//                             >
//                               {estudiante.estado}
//                             </span>
//                           </td>
//                           <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">
//                             <span
//                               className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                                 estudiante.calificacion === "Aprobado"
//                                   ? "bg-green-100 text-green-800"
//                                   : "bg-red-100 text-red-800"
//                               }`}
//                             >
//                               {estudiante.calificacion}
//                             </span>
//                           </td>
//                           <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.ranking}</td>
//                           <td className="px-3 py-2 whitespace-nowrap text-sm">
//                             <span
//                               className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                                 estudiante.total === "Aprobado"
//                                   ? "bg-green-100 text-green-800"
//                                   : "bg-red-100 text-red-800"
//                               }`}
//                             >
//                               {estudiante.total}
//                             </span>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : (
//                   <div className="text-center py-8 bg-gray-50 rounded-lg">
//                     <p className="text-gray-500">No hay estudiantes registrados para este nivel</p>
//                   </div>
//                 )}
//               </div>

//               <div className="flex justify-center">
//                 <button
//                   className="bg-[#f44144] text-white px-4 py-1.5 rounded-lg text-sm"
//                   onClick={() => {
//                     setShowEstudiantesModal(false)
//                     setShowFichaModal(true)
//                   }}
//                 >
//                   Cerrar
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

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

// export default Files
"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, RefreshCw } from "lucide-react"
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import { useAuth } from "../../auth/hooks/useAuth"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"
import CourseDetailModal from "./CourseDetailModal"
import MassiveUpdateModal from "../componentes/MassiveUpdateModal"

// Hooks
import { useGetCourses } from "../hooks/useGetCourses"

const columns = [
  { key: "code", label: "Código" },
  { key: "fk_programs", label: "Programa" },
  { key: "area", label: "Área" },
  {
    key: "offer_type",
    label: "Tipo de Oferta",
    render: (item) => {
      const typeMap = {
        ABIERTA: "Abierta",
        CERRADA: "Cerrada",
        ESPECIAL: "Especial",
      }
      return typeMap[item.offer_type] || item.offer_type
    },
  },
  {
    key: "start_date",
    label: "Fecha Inicio",
    render: (item) => new Date(item.start_date).toLocaleDateString("es-ES"),
  },
  {
    key: "end_date",
    label: "Fecha Fin",
    render: (item) => new Date(item.end_date).toLocaleDateString("es-ES"),
  },
  {
    key: "course_status",
    label: "Estado",
    render: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.course_status === "EN EJECUCION"
            ? "bg-green-100 text-green-800"
            : item.course_status === "TERMINADO"
              ? "bg-blue-100 text-blue-800"
              : item.course_status === "SUSPENDIDO"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
        }`}
      >
        {item.course_status}
      </span>
    ),
  },
]

export default function Courses() {
  // Estados principales
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [showMassiveUpdateModal, setShowMassiveUpdateModal] = useState(false)

  // Hooks
  const { logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  // Hooks de datos
  const { courses, loading, error, refetch } = useGetCourses()

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
  const handleShowCourse = (course) => {
    setSelectedCourse(course)
    setIsDetailModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedCourse(null)
  }

  const handleMassiveUpdate = () => {
    setShowMassiveUpdateModal(true)
  }

  const handleMassiveUpdateComplete = (results) => {
    console.log("Actualización masiva completada:", results)
    // Refrescar la lista de cursos
    refetch()
  }

  // Renderizado condicional para estados de carga y error
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f384c] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando cursos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Fichas</h1>
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
          data={courses}
          columns={columns}
          onShow={handleShowCourse}
          title="LISTA DE FICHAS"
          showActions={{ show: true, edit: false, delete: false, add: false }}
          tooltipText="Ver detalle de la ficha"
        />

        {/* Modal de detalle del curso */}
        {selectedCourse && (
          <CourseDetailModal course={selectedCourse} isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} />
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
