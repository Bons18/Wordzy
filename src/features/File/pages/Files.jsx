// // // "use client"

// // // import { useState, useRef, useEffect } from "react"
// // // import { ChevronLeft, ChevronRight, Search, ChevronDown } from "lucide-react"
// // // import { useNavigate } from "react-router-dom"
// // // import { useAuth } from "../../auth/hooks/useAuth"

// // // export default function Files() {
// // //   const [showFichaModal, setShowFichaModal] = useState(false)
// // //   const [showEstudiantesModal, setShowEstudiantesModal] = useState(false)
// // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// // //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// // //   const { logout } = useAuth()
// // //   const navigate = useNavigate()
// // //   const dropdownRef = useRef(null)

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

// // //             {/* Logout Confirmation Modal */}
// // //             {showLogoutConfirm && (
// // //               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //                 <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 transform transition-all">
// // //                   <div className="p-6">
// // //                     <div className="text-center mb-6">
// // //                       <h3 className="text-xl font-semibold text-[#1f384c]">
// // //                         Cerrar Sesión
// // //                       </h3>
// // //                       <p className="mt-2 text-[#627b87]">
// // //                         ¿Está seguro de que desea cerrar la sesión actual?
// // //                       </p>
// // //                     </div>
                    
// // //                     <div className="flex justify-center gap-3">
// // //                       <button
// // //                         className="px-6 py-2.5 border border-[#d9d9d9] rounded-lg text-[#627b87] hover:bg-gray-50 font-medium transition-colors"
// // //                         onClick={() => setShowLogoutConfirm(false)}
// // //                       >
// // //                         Cancelar
// // //                       </button>
// // //                       <button
// // //                         className="px-6 py-2.5 bg-[#f44144] text-white rounded-lg hover:bg-red-600 font-medium transition-colors"
// // //                         onClick={handleLogout}
// // //                       >
// // //                         Cerrar Sesión
// // //                       </button>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </header>

// // //       <div className="container mx-auto px-6">
// // //         <div className="mb-4">
// // //           <div className="relative">
// // //             <input
// // //               type="text"
// // //               placeholder="Buscar..."
// // //               className="w-full max-w-md pl-10 pr-4 py-2 border border-[#d9d9d9] rounded"
// // //             />
// // //             <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#627b87]" />
// // //           </div>
// // //         </div>

// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-sm">
// // //             <thead>
// // //               <tr className="bg-[#f6f6fb]">
// // //                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Fichas</th>
// // //                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Programa</th>
// // //                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Instructor</th>
// // //                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Aprendices</th>
// // //                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Fecha Inicio</th>
// // //                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Fecha Fin</th>
// // //                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Nivel</th>
// // //                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Estado</th>
// // //                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Acciones</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody>
// // //               {fichasData.map((ficha, index) => (
// // //                 <tr key={index} className="border-b border-[#d9d9d9]">
// // //                   <td className="py-3 px-4">{ficha.id}</td>
// // //                   <td className="py-3 px-4">{ficha.programa}</td>
// // //                   <td className="py-3 px-4">{ficha.instructor}</td>
// // //                   <td className="py-3 px-4">{ficha.cantidad}</td>
// // //                   <td className="py-3 px-4">{ficha.fechaInicio}</td>
// // //                   <td className="py-3 px-4">{ficha.fechaFin}</td>
// // //                   <td className="py-3 px-4">{ficha.nivel}</td>
// // //                   <td className="py-3 px-4">
// // //                     <span
// // //                       className={`px-2 py-1 rounded text-xs ${
// // //                         ficha.estado === "En formación"
// // //                           ? "bg-[#e6f7f0] text-[#46ae69]"
// // //                           : ficha.estado === "Terminada"
// // //                             ? "bg-[#ecf0f8] text-[#707fdd]"
// // //                             : "bg-[#f9e6e6] text-[#c60b0e]"
// // //                       }`}
// // //                     >
// // //                       {ficha.estado}
// // //                     </span>
// // //                   </td>
// // //                   <td className="py-3 px-4">
// // //                     <button
// // //                       className="bg-[#1f384c] text-white text-xs px-3 py-1 rounded"
// // //                       onClick={() => setShowFichaModal(true)}
// // //                     >
// // //                       Ver Ficha
// // //                     </button>
// // //                   </td>
// // //                 </tr>
// // //               ))}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         <div className="flex justify-between items-center mt-4 text-sm">
// // //           <div className="flex items-center gap-2">
// // //             <span>10</span>
// // //             <span className="text-[#627b87]">por página</span>
// // //           </div>

// // //           <div className="flex items-center gap-2">
// // //             <span>1</span>
// // //             <span className="text-[#627b87]">de 1 páginas</span>
// // //             <button className="p-1 rounded border border-[#d9d9d9]">
// // //               <ChevronLeft className="h-4 w-4 text-[#627b87]" />
// // //             </button>
// // //             <button className="p-1 rounded border border-[#d9d9d9]">
// // //               <ChevronRight className="h-4 w-4 text-[#627b87]" />
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* Ficha Modal */}
// // //       {showFichaModal && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
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
// // //                       <div className="font-medium">23/01/2024</div>
// // //                     </div>
// // //                     <div>
// // //                       <div className="text-sm text-[#6c757d]">Fecha fin:</div>
// // //                       <div className="font-medium">30/01/2025</div>
// // //                     </div>
// // //                   </div>
// // //                 </div>
             
// // //               </div>

// // //               <div className="overflow-x-auto">
// // //                 <table className="min-w-full divide-y divide-[#eaeaea]">
// // //                   <thead className="bg-[#f6f6fb]">
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
// // //                     <tr>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">nivel 1</td>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">20</td>
// // //                       <td className="px-6 py-4 whitespace-nowrap">
// // //                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#ecf0f8] text-[#707fdd]">
// // //                           Terminado
// // //                         </span>
// // //                       </td>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm">
// // //                         <button
// // //                           className="bg-[#1f384c] text-white text-xs px-3 py-1 rounded"
// // //                           onClick={() => {
// // //                             setShowFichaModal(false)
// // //                             setShowEstudiantesModal(true)
// // //                           }}
// // //                         >
// // //                           Ver Aprendices
// // //                         </button>
// // //                       </td>
// // //                     </tr>
// // //                     <tr>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">nivel 2</td>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">30</td>
// // //                       <td className="px-6 py-4 whitespace-nowrap">
// // //                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#ecf0f8] text-[#707fdd]">
// // //                           Terminado
// // //                         </span>
// // //                       </td>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm">
// // //                         <button className="bg-[#1f384c] text-white text-xs px-3 py-1 rounded">Ver Aprendices</button>
// // //                       </td>
// // //                     </tr>
// // //                     <tr>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">nivel 3</td>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">15</td>
// // //                       <td className="px-6 py-4 whitespace-nowrap">
// // //                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#e6f7f0] text-[#46ae69]">
// // //                           En formación
// // //                         </span>
// // //                       </td>
// // //                       <td className="px-6 py-4 whitespace-nowrap text-sm">
// // //                         <button className="bg-[#1f384c] text-white text-xs px-3 py-1 rounded">Ver Aprendices</button>
// // //                       </td>
// // //                     </tr>
// // //                   </tbody>
// // //                 </table>
// // //               </div>

// // //               <div className="mt-6 flex justify-end">
// // //                 <button className="bg-[#dc3545] text-white px-4 py-2 rounded" onClick={() => setShowFichaModal(false)}>
// // //                   Cerrar
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Estudiantes Modal */}
// // //       {showEstudiantesModal && (
        
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //         <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
// // //           <div className="p-6">
// // //             <h2 className="text-xl font-bold text-[#1f384c] mb-6">Listado de Estudiantes Nivel 1</h2>

// // //             <div className="overflow-x-auto">
// // //               <table className="min-w-full divide-y divide-[#eaeaea] text-base">
// // //                 <thead className="bg-[#f6f6fb]">
// // //                   <tr>
// // //                     {['Nombre', 'T.Doc', 'Número', 'Estado', 'Juicio'].map((header) => (
// // //                       <th key={header} className="px-5 py-3 text-left font-medium text-[#627b87] uppercase tracking-wider">
// // //                         {header}
// // //                       </th>
// // //                     ))}
// // //                   </tr>
// // //                 </thead>
// // //                 <tbody className="bg-white divide-y divide-[#eaeaea]">
// // //                   {estudiantesData.map((estudiante, index) => (
// // //                     <tr key={index}>
// // //                       <td className="px-5 py-3 whitespace-nowrap">{estudiante.nombre}</td>
// // //                       <td className="px-5 py-3 whitespace-nowrap">{estudiante.documento}</td>
// // //                       <td className="px-5 py-3 whitespace-nowrap">{estudiante.numero}</td>
// // //                       <td className="px-5 py-3 whitespace-nowrap">
// // //                         <span
// // //                           className={`px-3 inline-flex text-sm leading-5 font-semibold rounded-full ${
// // //                             estudiante.activo ? 'bg-[#e6f7f0] text-[#46ae69]' : 'bg-[#f9e6e6] text-[#c60b0e]'
// // //                           }`}
// // //                         >
// // //                           {estudiante.activo ? 'Activo' : 'Inactivo'}
// // //                         </span>
// // //                       </td>
// // //                       <td className="px-5 py-3 whitespace-nowrap">
// // //                         <span
// // //                           className={`px-3 inline-flex text-sm leading-5 font-semibold rounded-full ${
// // //                             estudiante.aprobado 
// // //                           }`}
// // //                         >
// // //                           {estudiante.aprobado ? 'Aprobado' : 'No aprobado'}
// // //                         </span>
// // //                       </td>
// // //                     </tr>
// // //                   ))}
// // //                 </tbody>
// // //               </table>
// // //             </div>

// // //             <div className="mt-6 flex justify-end">
// // //               <button
// // //                 className="bg-[#dc3545] text-white px-5 py-2 rounded text-base"
// // //                 onClick={() => setShowEstudiantesModal(false)}
// // //               >
// // //                 Cerrar
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       )}
// // //     </div>
// // //   )
// // // }

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

// // // const estudiantesData = [
// // //   { nombre: "Andres felip", documento: "C.C", numero: "2382829", activo: true, aprobado: true },
// // //   { nombre: "Daniel an", documento: "C.C", numero: "1092983", activo: true, aprobado: false },
// // //   { nombre: "nivel 3", documento: "C.C", numero: "293923", activo: false, aprobado: false },
// // //   { nombre: "Andres felip", documento: "C.C", numero: "283929", activo: true, aprobado: true },
// // //   { nombre: "nivel 2", documento: "C.C", numero: "292920", activo: true, aprobado: true },
// // //   { nombre: "nivel 3", documento: "T.I", numero: "282882", activo: false, aprobado: false },
// // //   { nombre: "Andres felip", documento: "C.C", numero: "392938", activo: true, aprobado: true },
// // //   { nombre: "nivel 2", documento: "C.C", numero: "3838293", activo: true, aprobado: false },
// // //   { nombre: "nivel 3", documento: "T.I", numero: "3838829", activo: false, aprobado: false },
// // // ]

// // "use client"

// // import { useState, useEffect, useRef } from "react"
// // import { ChevronDown } from "lucide-react"
// // import { useNavigate } from "react-router-dom"
// // import GenericTable from "../../../shared/components/Table"
// // import { useAuth } from "../../auth/hooks/useAuth"
// // import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// // // Datos de ejemplo
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

// // const Files = () => {
// //   const [showFichaModal, setShowFichaModal] = useState(false)
// //   const [showEstudiantesModal, setShowEstudiantesModal] = useState(false)
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// //   const { logout } = useAuth()
// //   const navigate = useNavigate()
// //   const dropdownRef = useRef(null)

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

// //   const handleShowFicha = () => {
// //     setShowFichaModal(true)
// //   }

// //   const verEstudiantes = () => {
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

// //       {/* Ficha Modal - Mantenido del original pero con mejor espaciado */}
// //       {showFichaModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
// //             <div className="p-6">
// //               <div className="flex justify-between mb-6">
// //                 <div className="flex-1">
// //                   <div className="grid grid-cols-2 gap-4">
// //                     <div>
// //                       <div className="text-sm text-[#6c757d]">Ficha:</div>
// //                       <div className="font-medium">2889927</div>
// //                     </div>
// //                     <div>
// //                       <div className="text-sm text-[#6c757d]">Programa:</div>
// //                       <div className="font-medium">ADSO</div>
// //                     </div>
// //                     <div>
// //                       <div className="text-sm text-[#6c757d]">Fecha Inicio:</div>
// //                       <div className="font-medium">23/01/2024</div>
// //                     </div>
// //                     <div>
// //                       <div className="text-sm text-[#6c757d]">Fecha fin:</div>
// //                       <div className="font-medium">30/01/2025</div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="overflow-x-auto">
// //                 <table className="min-w-full divide-y divide-[#eaeaea]">
// //                   <thead className="bg-[#f6f6fb]">
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
// //                     <tr>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">nivel 1</td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">20</td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#ecf0f8] text-[#707fdd]">
// //                           Terminado
// //                         </span>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                         <button className="bg-[#1f384c] text-white text-xs px-3 py-1 rounded" onClick={verEstudiantes}>
// //                           Ver Aprendices
// //                         </button>
// //                       </td>
// //                     </tr>
// //                     <tr>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">nivel 2</td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">30</td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#ecf0f8] text-[#707fdd]">
// //                           Terminado
// //                         </span>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                         <button className="bg-[#1f384c] text-white text-xs px-3 py-1 rounded">Ver Aprendices</button>
// //                       </td>
// //                     </tr>
// //                     <tr>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">nivel 3</td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">15</td>
// //                       <td className="px-6 py-4 whitespace-nowrap">
// //                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#e6f7f0] text-[#46ae69]">
// //                           En formación
// //                         </span>
// //                       </td>
// //                       <td className="px-6 py-4 whitespace-nowrap text-sm">
// //                         <button className="bg-[#1f384c] text-white text-xs px-3 py-1 rounded">Ver Aprendices</button>
// //                       </td>
// //                     </tr>
// //                   </tbody>
// //                 </table>
// //               </div>

// //               <div className="mt-6 flex justify-end">
// //                 <button className="bg-[#dc3545] text-white px-4 py-2 rounded" onClick={() => setShowFichaModal(false)}>
// //                   Cerrar
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Estudiantes Modal - Mantenido del original pero con mejor espaciado */}
// //       {showEstudiantesModal && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
// //             <div className="p-6">
// //               <h2 className="text-xl font-bold text-[#1f384c] mb-6">Listado de Estudiantes Nivel 1</h2>

// //               <div className="overflow-x-auto">
// //                 <table className="min-w-full divide-y divide-[#eaeaea] text-base">
// //                   <thead className="bg-[#f6f6fb]">
// //                     <tr>
// //                       {["Nombre", "T.Doc", "Número", "Estado", "Juicio"].map((header) => (
// //                         <th
// //                           key={header}
// //                           className="px-5 py-3 text-left font-medium text-[#627b87] uppercase tracking-wider"
// //                         >
// //                           {header}
// //                         </th>
// //                       ))}
// //                     </tr>
// //                   </thead>
// //                   <tbody className="bg-white divide-y divide-[#eaeaea]">
// //                     {estudiantesData.map((estudiante, index) => (
// //                       <tr key={index}>
// //                         <td className="px-5 py-3 whitespace-nowrap">{estudiante.nombre}</td>
// //                         <td className="px-5 py-3 whitespace-nowrap">{estudiante.documento}</td>
// //                         <td className="px-5 py-3 whitespace-nowrap">{estudiante.numero}</td>
// //                         <td className="px-5 py-3 whitespace-nowrap">
// //                           <span
// //                             className={`px-3 inline-flex text-sm leading-5 font-semibold rounded-full ${
// //                               estudiante.activo ? "bg-[#e6f7f0] text-[#46ae69]" : "bg-[#f9e6e6] text-[#c60b0e]"
// //                             }`}
// //                           >
// //                             {estudiante.activo ? "Activo" : "Inactivo"}
// //                           </span>
// //                         </td>
// //                         <td className="px-5 py-3 whitespace-nowrap">
// //                           <span
// //                             className={`px-3 inline-flex text-sm leading-5 font-semibold rounded-full ${
// //                               estudiante.aprobado ? "bg-[#e6f7f0] text-[#46ae69]" : "bg-[#f9e6e6] text-[#c60b0e]"
// //                             }`}
// //                           >
// //                             {estudiante.aprobado ? "Aprobado" : "No aprobado"}
// //                           </span>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>

// //               <div className="mt-6 flex justify-end">
// //                 <button
// //                   className="bg-[#dc3545] text-white px-5 py-2 rounded text-base"
// //                   onClick={() => setShowEstudiantesModal(false)}
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

// // // Datos de ejemplo para estudiantes
// // const estudiantesData = [
// //   { nombre: "Andres felip", documento: "C.C", numero: "2382829", activo: true, aprobado: true },
// //   { nombre: "Daniel an", documento: "C.C", numero: "1092983", activo: true, aprobado: false },
// //   { nombre: "nivel 3", documento: "C.C", numero: "293923", activo: false, aprobado: false },
// //   { nombre: "Andres felip", documento: "C.C", numero: "283929", activo: true, aprobado: true },
// //   { nombre: "nivel 2", documento: "C.C", numero: "292920", activo: true, aprobado: true },
// //   { nombre: "nivel 3", documento: "T.I", numero: "282882", activo: false, aprobado: false },
// //   { nombre: "Andres felip", documento: "C.C", numero: "392938", activo: true, aprobado: true },
// //   { nombre: "nivel 2", documento: "C.C", numero: "3838293", activo: true, aprobado: false },
// //   { nombre: "nivel 3", documento: "T.I", numero: "3838829", activo: false, aprobado: false },
// // ]

// // export default Files

// "use client"

// import { useState, useEffect, useRef } from "react"
// import { ChevronDown } from "lucide-react"
// import { useNavigate } from "react-router-dom"
// import GenericTable from "../../../shared/components/Table"
// import { useAuth } from "../../auth/hooks/useAuth"
// import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// // Datos de ejemplo
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
//   },
//   {
//     id: "3747477",
//     programa: "Redes",
//     instructor: "Patricia López",
//     cantidad: 26,
//     fechaInicio: "21-03-2023",
//     fechaFin: "21-03-2024",
//     nivel: 2,
//     estado: "cerrada",
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
//   },
// ]

// const columns = [
//   { key: "id", label: "Ficha" },
//   { key: "programa", label: "Programa" },
//   { key: "instructor", label: "Instructor" },
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

// const Files = () => {
//   const [showFichaModal, setShowFichaModal] = useState(false)
//   const [showEstudiantesModal, setShowEstudiantesModal] = useState(false)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
//   const { logout } = useAuth()
//   const navigate = useNavigate()
//   const dropdownRef = useRef(null)

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

//   const handleShowFicha = () => {
//     setShowFichaModal(true)
//   }

//   const verEstudiantes = () => {
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

//       {/* Ficha Modal - Mantenido del original pero con mejor espaciado */}
//       {showFichaModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
//             <div className="p-6">
//               <div className="flex justify-between mb-6">
//                 <div className="flex-1">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <div className="text-sm text-[#6c757d]">Ficha:</div>
//                       <div className="font-medium">2889927</div>
//                     </div>
//                     <div>
//                       <div className="text-sm text-[#6c757d]">Programa:</div>
//                       <div className="font-medium">ADSO</div>
//                     </div>
//                     <div>
//                       <div className="text-sm text-[#6c757d]">Fecha Inicio:</div>
//                       <div className="font-medium">23/01/2024</div>
//                     </div>
//                     <div>
//                       <div className="text-sm text-[#6c757d]">Fecha fin:</div>
//                       <div className="font-medium">30/01/2025</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-[#eaeaea]">
//                   <thead className="bg-[#f6f6fb]">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
//                         Nivel
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
//                         Instructor
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
//                         N. Aprendices
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
//                         Estado
//                       </th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
//                         Acciones
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-[#eaeaea]">
//                     <tr>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">nivel 1</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">20</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#ecf0f8] text-[#707fdd]">
//                           Terminado
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm">
//                         <button className="bg-[#1f384c] text-white text-xs px-3 py-1 rounded" onClick={verEstudiantes}>
//                           Ver Aprendices
//                         </button>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">nivel 2</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">30</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#ecf0f8] text-[#707fdd]">
//                           Terminado
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm">
//                         <button className="bg-[#1f384c] text-white text-xs px-3 py-1 rounded">Ver Aprendices</button>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">nivel 3</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">15</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#e6f7f0] text-[#46ae69]">
//                           En formación
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm">
//                         <button className="bg-[#1f384c] text-white text-xs px-3 py-1 rounded">Ver Aprendices</button>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>

//               <div className="mt-6 flex justify-end">
//                 <button className="bg-[#dc3545] text-white px-4 py-2 rounded" onClick={() => setShowFichaModal(false)}>
//                   Cerrar
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Estudiantes Modal - Mantenido del original pero con mejor espaciado */}
//       {showEstudiantesModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-6xl mx-4">
//             <div className="p-6">
//               <h2 className="text-xl font-bold text-center text-[#1f384c] mb-6">Listado de Estudiantes Nivel 1</h2>

//               <div className="overflow-x-auto mb-6">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-white">
//                     <tr className="border-b">
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nombre</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">T.Documento</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Número</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Estado</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nivel 1</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nivel 2</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Nivel 3</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Ranking</th>
//                       <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Total</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {estudiantesNuevosData.map((estudiante, index) => (
//                       <tr key={index}>
//                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{estudiante.nombre}</td>
//                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{estudiante.documento}</td>
//                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{estudiante.numero}</td>
//                         <td className="px-4 py-3 whitespace-nowrap">
//                           <span
//                             className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                               estudiante.estado === "activo"
//                                 ? "bg-green-100 text-green-800"
//                                 : estudiante.estado === "retirado"
//                                   ? "bg-yellow-100 text-yellow-800"
//                                   : estudiante.estado === "completado"
//                                     ? "bg-blue-100 text-blue-800"
//                                     : "bg-red-100 text-red-800"
//                             }`}
//                           >
//                             {estudiante.estado}
//                           </span>
//                         </td>
//                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{estudiante.nivel1}</td>
//                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{estudiante.nivel2}</td>
//                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{estudiante.nivel3}</td>
//                         <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">{estudiante.ranking}</td>
//                         <td className="px-4 py-3 whitespace-nowrap text-sm">
//                           <span
//                             className={`px-2 py-1 rounded-full text-xs font-medium ${
//                               estudiante.total === "Aprobado"
//                                 ? "bg-green-100 text-green-800"
//                                 : "bg-red-100 text-red-800"
//                             }`}
//                           >
//                             {estudiante.total}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="flex justify-center">
//                 <button
//                   className="bg-[#f44144] text-white px-5 py-2 rounded-lg text-base"
//                   onClick={() => setShowEstudiantesModal(false)}
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

// // Datos de ejemplo para estudiantes
// const estudiantesNuevosData = [
//   {
//     nombre: "Andres felip",
//     documento: "C.C",
//     numero: "2382829",
//     estado: "activo",
//     nivel1: "Aprobado",
//     nivel2: "Aprobado",
//     nivel3: "No aprobado",
//     ranking: "900",
//     total: "No aprobado",
//   },
//   {
//     nombre: "Daniel an",
//     documento: "C.C",
//     numero: "1092983",
//     estado: "activo",
//     nivel1: "Aprobado",
//     nivel2: "Aprobado",
//     nivel3: "Aprobado",
//     ranking: "700",
//     total: "Aprobado",
//   },
//   {
//     nombre: "Hugo Serna",
//     documento: "C.C",
//     numero: "293923",
//     estado: "activo",
//     nivel1: "Aprobado",
//     nivel2: "No aprobado",
//     nivel3: "No aprobado",
//     ranking: "500",
//     total: "No aprobado",
//   },
//   {
//     nombre: "Andres felipe",
//     documento: "C.C",
//     numero: "283929",
//     estado: "activo",
//     nivel1: "Aprobado",
//     nivel2: "Aprobado",
//     nivel3: "Aprobado",
//     ranking: "400",
//     total: "Aprobado",
//   },
//   {
//     nombre: "Diego David",
//     documento: "C.C",
//     numero: "292920",
//     estado: "activo",
//     nivel1: "No aprobado",
//     nivel2: "No aprobado",
//     nivel3: "No aprobado",
//     ranking: "350",
//     total: "No aprobado",
//   },
//   {
//     nombre: "Dickson Moreno",
//     documento: "T.I",
//     numero: "282882",
//     estado: "retirado",
//     nivel1: "No aprobado",
//     nivel2: "No aprobado",
//     nivel3: "No aprobado",
//     ranking: "300",
//     total: "No aprobado",
//   },
//   {
//     nombre: "Andres felip",
//     documento: "C.C",
//     numero: "392938",
//     estado: "completado",
//     nivel1: "No aprobado",
//     nivel2: "No aprobado",
//     nivel3: "No aprobado",
//     ranking: "250",
//     total: "No aprobado",
//   },
//   {
//     nombre: "Matias Giraldo",
//     documento: "C.C",
//     numero: "3838293",
//     estado: "cancelado",
//     nivel1: "aprobado",
//     nivel2: "aprobado",
//     nivel3: "aprobado",
//     ranking: "200",
//     total: "Aprobado",
//   },
//   {
//     nombre: "Hilder Osman",
//     documento: "T.I",
//     numero: "3838829",
//     estado: "cancelado",
//     nivel1: "aprobado",
//     nivel2: "aprobado",
//     nivel3: "Aprobado",
//     ranking: "150",
//     total: "Aprobado",
//   },
// ]

// export default Files

"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import { useAuth } from "../../auth/hooks/useAuth"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// Datos de ejemplo
const fichasData = [
  {
    id: "2889927",
    programa: "ADSO",
    instructor: "Diego Gómez",
    cantidad: 30,
    fechaInicio: "21-03-2023",
    fechaFin: "21-03-2025",
    nivel: 1,
    estado: "En formación",
  },
  {
    id: "2345678",
    programa: "ADSO",
    instructor: "Juan Pérez",
    cantidad: 25,
    fechaInicio: "21-03-2022",
    fechaFin: "21-03-2024",
    nivel: 1,
    estado: "En formación",
  },
  {
    id: "5567653",
    programa: "ADSO",
    instructor: "Yaritza Esquivel",
    cantidad: 10,
    fechaInicio: "21-03-2024",
    fechaFin: "21-03-2026",
    nivel: 2,
    estado: "En formación",
  },
  {
    id: "3747477",
    programa: "Redes",
    instructor: "Patricia López",
    cantidad: 26,
    fechaInicio: "21-03-2023",
    fechaFin: "21-03-2024",
    nivel: 2,
    estado: "cerrada",
  },
  {
    id: "4847373",
    programa: "Redes",
    instructor: "Juan Pérez",
    cantidad: 14,
    fechaInicio: "21-03-2020",
    fechaFin: "21-03-2023",
    nivel: 3,
    estado: "Terminada",
  },
  {
    id: "3747477",
    programa: "Redes",
    instructor: "Diego Gómez",
    cantidad: 18,
    fechaInicio: "21-03-2023",
    fechaFin: "21-03-2025",
    nivel: 3,
    estado: "Terminada",
  },
]

const columns = [
  { key: "id", label: "Ficha" },
  { key: "programa", label: "Programa" },
  { key: "instructor", label: "Instructor" },
  { key: "cantidad", label: "Cantidad Aprendices" },
  { key: "fechaInicio", label: "Fecha Inicio" },
  { key: "fechaFin", label: "Fecha Fin" },
  { key: "nivel", label: "Nivel" },
  {
    key: "estado",
    label: "Estado",
    render: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.estado === "En formación"
            ? "bg-green-100 text-green-800"
            : item.estado === "Terminada"
              ? "bg-blue-100 text-blue-800"
              : "bg-red-100 text-red-800"
        }`}
      >
        {item.estado}
      </span>
    ),
  },
]

const Files = () => {
  const [showFichaModal, setShowFichaModal] = useState(false)
  const [showEstudiantesModal, setShowEstudiantesModal] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

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

  const handleShowFicha = () => {
    setShowFichaModal(true)
  }

  const verEstudiantes = () => {
    setShowFichaModal(false)
    setShowEstudiantesModal(true)
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">FICHAS</h1>
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
          data={fichasData}
          columns={columns}
          onShow={handleShowFicha}
          title=""
          showActions={{ show: true }}
        />
      </div>

      {/* Ficha Modal - Mantenido del original pero con mejor espaciado */}
      {showFichaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4">
            <div className="p-6">
              <div className="flex justify-between mb-6">
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-[#6c757d]">Ficha:</div>
                      <div className="font-medium">2889927</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#6c757d]">Programa:</div>
                      <div className="font-medium">ADSO</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#6c757d]">Fecha Inicio:</div>
                      <div className="font-medium">23/01/2024</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#6c757d]">Fecha fin:</div>
                      <div className="font-medium">30/01/2025</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#eaeaea]">
                  <thead className="bg-[#f6f6fb]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                        Nivel
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                        Instructor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                        N. Aprendices
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#eaeaea]">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">nivel 1</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">20</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#ecf0f8] text-[#707fdd]">
                          Terminado
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="bg-[#1f384c] text-white text-xs px-3 py-1 rounded" onClick={verEstudiantes}>
                          Ver Aprendices
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">nivel 2</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">30</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#ecf0f8] text-[#707fdd]">
                          Terminado
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="bg-[#1f384c] text-white text-xs px-3 py-1 rounded">Ver Aprendices</button>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">nivel 3</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-[#333333]">15</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[#e6f7f0] text-[#46ae69]">
                          En formación
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="bg-[#1f384c] text-white text-xs px-3 py-1 rounded">Ver Aprendices</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="bg-[#dc3545] text-white px-4 py-2 rounded" onClick={() => setShowFichaModal(false)}>
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estudiantes Modal - Mantenido del original pero con mejor espaciado */}
      {showEstudiantesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-4 max-h-[80vh] overflow-auto">
            <div className="p-4">
              <h2 className="text-xl font-bold text-center text-[#1f384c] mb-4">Listado de Estudiantes Nivel 1</h2>

              <div className="overflow-x-auto mb-4">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-white">
                    <tr className="border-b">
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">T.Documento</th>
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Número</th>
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Estado</th>
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nivel 1</th>
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nivel 2</th>
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nivel 3</th>
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Ranking</th>
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {estudiantesNuevosData.map((estudiante, index) => (
                      <tr key={index}>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nombre}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.documento}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.numero}</td>
                        <td className="px-3 py-2 whitespace-nowrap">
                          <span
                            className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              estudiante.estado === "activo"
                                ? "bg-green-100 text-green-800"
                                : estudiante.estado === "retirado"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : estudiante.estado === "completado"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-red-100 text-red-800"
                            }`}
                          >
                            {estudiante.estado}
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nivel1}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nivel2}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nivel3}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.ranking}</td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              estudiante.total === "Aprobado"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {estudiante.total}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-[#f44144] text-white px-4 py-1.5 rounded-lg text-sm"
                  onClick={() => setShowEstudiantesModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  )
}

// Datos de ejemplo para estudiantes
const estudiantesNuevosData = [
  {
    nombre: "Andres felipe",
    documento: "C.C",
    numero: "2382829",
    estado: "activo",
    nivel1: "Aprobado",
    nivel2: "Aprobado",
    nivel3: "No aprobado",
    ranking: "900",
    total: "No aprobado",
  },
  {
    nombre: "Daniel andres",
    documento: "C.C",
    numero: "1092983",
    estado: "activo",
    nivel1: "Aprobado",
    nivel2: "Aprobado",
    nivel3: "Aprobado",
    ranking: "700",
    total: "Aprobado",
  },
  {
    nombre: "Gohan Esteban",
    documento: "C.C",
    numero: "293923",
    estado: "activo",
    nivel1: "Aprobado",
    nivel2: "No aprobado",
    nivel3: "No aprobado",
    ranking: "500",
    total: "No aprobado",
  },
  {
    nombre: "Andres felipe",
    documento: "C.C",
    numero: "283929",
    estado: "activo",
    nivel1: "Aprobado",
    nivel2: "Aprobado",
    nivel3: "Aprobado",
    ranking: "400",
    total: "Aprobado",
  },
  {
    nombre: "Tito Cuartaz",
    documento: "C.C",
    numero: "292920",
    estado: "activo",
    nivel1: "No aprobado",
    nivel2: "No aprobado",
    nivel3: "No aprobado",
    ranking: "350",
    total: "No aprobado",
  },
  {
    nombre: "Osman Foronda",
    documento: "T.I",
    numero: "282882",
    estado: "retirado",
    nivel1: "No aprobado",
    nivel2: "No aprobado",
    nivel3: "No aprobado",
    ranking: "300",
    total: "No aprobado",
  },
  {
    nombre: "Andres felipe",
    documento: "C.C",
    numero: "392938",
    estado: "completado",
    nivel1: "No aprobado",
    nivel2: "No aprobado",
    nivel3: "No aprobado",
    ranking: "250",
    total: "No aprobado",
  },
  {
    nombre: "Yean Fernandez",
    documento: "C.C",
    numero: "3838293",
    estado: "cancelado",
    nivel1: "aprobado",
    nivel2: "aprobado",
    nivel3: "aprobado",
    ranking: "200",
    total: "Aprobado",
  },
  {
    nombre: "Bryan Moreno",
    documento: "T.I",
    numero: "3838829",
    estado: "cancelado",
    nivel1: "aprobado",
    nivel2: "aprobado",
    nivel3: "Aprobado",
    ranking: "150",
    total: "Aprobado",
  },
]

export default Files

