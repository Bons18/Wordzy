// // // // // "use client"

// // // // // import { useState, useRef, useEffect } from "react"
// // // // // import { ChevronDown, ChevronLeft, ChevronRight, Eye, Search } from "lucide-react"
// // // // // import { useAuth } from "../../auth/hooks/useAuth"
// // // // // import { useNavigate } from "react-router-dom"

// // // // // export default function Programs() {
// // // // //   const [showProgramaDetalle, setShowProgramaDetalle] = useState(false)
// // // // //   const [showEstudiantesModal, setShowEstudiantesModal] = useState(false)
// // // // //   const [programaSeleccionado, setProgramaSeleccionado] = useState(null)
// // // // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// // // // //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// // // // //   const { logout } = useAuth()
// // // // //   const navigate = useNavigate()
// // // // //   const dropdownRef = useRef(null)

// // // // //   // Add click outside handler
// // // // //   useEffect(() => {
// // // // //     const handleClickOutside = (event) => {
// // // // //       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// // // // //         setIsDropdownOpen(false)
// // // // //       }
// // // // //     }

// // // // //     document.addEventListener("mousedown", handleClickOutside)
// // // // //     return () => document.removeEventListener("mousedown", handleClickOutside)
// // // // //   }, [])

// // // // //   const handleLogoutClick = () => {
// // // // //     setIsDropdownOpen(false)
// // // // //     setShowLogoutConfirm(true)
// // // // //   }

// // // // //   const handleLogout = () => {
// // // // //     logout()
// // // // //     navigate("/login")
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen">
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

// // // // //       <div className="container mx-auto px-6">
// // // // //         <div className="mb-4">
// // // // //           <div className="relative">
// // // // //             <input
// // // // //               type="text"
// // // // //               placeholder="Buscar..."
// // // // //               className="w-full max-w-md pl-10 pr-4 py-2 border border-[#d9d9d9] rounded"
// // // // //             />
// // // // //             <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#627b87]" />
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="overflow-x-auto">
// // // // //           <table className="w-full text-sm">
// // // // //             <thead>
// // // // //               <tr className="bg-[#f6f6fb]">
// // // // //                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Nombre</th>
// // // // //                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Tipo</th>
// // // // //                 <th className="font-medium text-center py-3 px-4 text-[#627b87] ">código del Programa</th>
// // // // //                 <th className="font-medium text-center py-3 px-4 text-[#627b87]">Cantidad de Niveles</th>
// // // // //                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Estado</th>
// // // // //                 <th className="font-medium text-left py-3 px-4 text-[#627b87]">Acciones</th>
// // // // //               </tr>
// // // // //             </thead>
// // // // //             <tbody>
// // // // //               {programasData.map((programa, index) => (
// // // // //                 <tr key={index} className="border-b border-[#d9d9d9]">
// // // // //                   <td className="py-3 px-4">{programa.nombre}</td>
// // // // //                   <td className="py-3 px-4 ">{programa.tipo}</td>
// // // // //                   <td className="py-3 px-4 text-center">{programa.codigo}</td>
// // // // //                   <td className="py-3 px-4 text-center">{programa.cantidadNiveles}</td>
// // // // //                   <td className="py-3 px-4">
// // // // //                     <span
// // // // //                       className={`px-2 py-1 rounded text-xs ${
// // // // //                         programa.estado === "En formación"
// // // // //                           ? "bg-[#e6f7f0] text-[#46ae69]"
// // // // //                           : "bg-[#f9e6e6] text-[#c60b0e]"
// // // // //                       }`}
// // // // //                     >
// // // // //                       {programa.estado}
// // // // //                     </span>
// // // // //                   </td>
// // // // //                   <td className="py-3 px-4">
// // // // //                     <button
// // // // //                       className="bg-[#1f384c] text-white rounded-full p-1.5"
// // // // //                       onClick={() => verPrograma(programa)}
// // // // //                     >
// // // // //                       <Eye className="h-4 w-4" />
// // // // //                     </button>
// // // // //                   </td>
// // // // //                 </tr>
// // // // //               ))}
// // // // //             </tbody>
// // // // //           </table>
// // // // //         </div>

// // // // //         <div className="flex justify-between items-center mt-4 text-sm">
// // // // //           <div className="flex items-center gap-2">
// // // // //             <span>10</span>
// // // // //             <span className="text-[#627b87]">por página</span>
// // // // //           </div>

// // // // //           <div className="flex items-center gap-2">
// // // // //             <span>1</span>
// // // // //             <span className="text-[#627b87]">de 1 páginas</span>
// // // // //             <button className="p-1 rounded border border-[#d9d9d9]">
// // // // //               <ChevronLeft className="h-4 w-4 text-[#627b87]" />
// // // // //             </button>
// // // // //             <button className="p-1 rounded border border-[#d9d9d9]">
// // // // //               <ChevronRight className="h-4 w-4 text-[#627b87]" />
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Logout Confirmation Modal */}
// // // // //       {showLogoutConfirm && (
// // // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // //           <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 transform transition-all">
// // // // //             <div className="p-6">
// // // // //               <div className="text-center mb-6">
// // // // //                 <h3 className="text-xl font-semibold text-[#1f384c]">
// // // // //                   Cerrar Sesión
// // // // //                 </h3>
// // // // //                 <p className="mt-2 text-[#627b87]">
// // // // //                   ¿Está seguro de que desea cerrar la sesión actual?
// // // // //                 </p>
// // // // //               </div>
              
// // // // //               <div className="flex justify-center gap-3">
// // // // //                 <button
// // // // //                   className="px-6 py-2.5 border border-[#d9d9d9] rounded-lg text-[#627b87] hover:bg-gray-50 font-medium transition-colors"
// // // // //                   onClick={() => setShowLogoutConfirm(false)}
// // // // //                 >
// // // // //                   Cancelar
// // // // //                 </button>
// // // // //                 <button
// // // // //                   className="px-6 py-2.5 bg-[#f44144] text-white rounded-lg hover:bg-red-600 font-medium transition-colors"
// // // // //                   onClick={handleLogout}
// // // // //                 >
// // // // //                   Cerrar Sesión
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Programa Detalle Modal */}
// // // // //       {showProgramaDetalle && programaSeleccionado && (
// // // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // //           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
// // // // //             <div className="p-6">
// // // // //               <div className="flex flex-col md:flex-row gap-6 mb-6">
// // // // //                 <div className="flex-1">
// // // // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //                     <div>
// // // // //                       <div className="text-sm text-[#627b87]">Nombre:</div>
// // // // //                       <div className="font-medium">ADSO</div>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <div className="text-sm text-[#627b87]">Tipo:</div>
// // // // //                       <div className="font-medium">Técnico</div>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <div className="text-sm text-[#627b87]">estado:</div>
// // // // //                       <div className="font-medium">
// // // // //                         <span className="px-2 py-1 rounded text-xs bg-[#e6f7f0] text-[#46ae69]">En formación</span>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                 </div>

// // // // //                 <div className="flex flex-col gap-2">
// // // // //                   <div>
// // // // //                     <div className="text-sm text-[#627b87]">Cantidad de Niveles:</div>
// // // // //                     <div className="font-medium">3</div>
// // // // //                   </div>
// // // // //                   <div>
// // // // //                     <div className="text-sm text-[#627b87]">Codigo del programa:</div>
// // // // //                     <div className="font-medium">332</div>
// // // // //                   </div>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="mb-4">
// // // // //                 <div className="text-sm font-medium text-[#627b87] mb-2">fichas asociadas al programa:</div>
// // // // //                 <div className="overflow-x-auto">
// // // // //                   <table className="min-w-full divide-y divide-[#eaeaea]">
// // // // //                     <thead className="bg-[#f6f6fb]">
// // // // //                       <tr>
// // // // //                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // // //                           Niveles
// // // // //                         </th>
// // // // //                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // // //                           Instructor
// // // // //                         </th>
// // // // //                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // // //                           N. Aprendices
// // // // //                         </th>
// // // // //                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // // //                           Acciones
// // // // //                         </th>
// // // // //                       </tr>
// // // // //                     </thead>
// // // // //                     <tbody className="bg-white divide-y divide-[#eaeaea]">
// // // // //                       <tr>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">nivel 1</td>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">20</td>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm">
// // // // //                           <button className="bg-[#1f384c] text-white rounded-full p-1.5" onClick={verEstudiantes}>
// // // // //                             <Eye className="h-4 w-4" />
// // // // //                           </button>
// // // // //                         </td>
// // // // //                       </tr>
// // // // //                       <tr>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">nivel 2</td>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">30</td>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm">
// // // // //                           <button className="bg-[#1f384c] text-white rounded-full p-1.5">
// // // // //                             <Eye className="h-4 w-4" />
// // // // //                           </button>
// // // // //                         </td>
// // // // //                       </tr>
// // // // //                       <tr>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">nivel 3</td>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">15</td>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm">
// // // // //                           <button className="bg-[#1f384c] text-white rounded-full p-1.5">
// // // // //                             <Eye className="h-4 w-4" />
// // // // //                           </button>
// // // // //                         </td>
// // // // //                       </tr>
// // // // //                     </tbody>
// // // // //                   </table>
// // // // //                 </div>
// // // // //               </div>

// // // // //               <div className="mt-6 flex justify-end">
// // // // //                 <button
// // // // //                   className="bg-[#dc3545] text-white px-4 py-2 rounded"
// // // // //                   onClick={() => setShowProgramaDetalle(false)}
// // // // //                 >
// // // // //                   Cerrar
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Estudiantes Modal */}
// // // // //       {showEstudiantesModal && (
// // // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // // //           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
// // // // //             <div className="p-6">
// // // // //               <h2 className="text-xl font-bold text-[#1f384c] mb-6">Listado de Estudiantes Nivel 1</h2>

// // // // //               <div className="overflow-x-auto">
// // // // //                 <table className="min-w-full divide-y divide-[#eaeaea]">
// // // // //                   <thead className="bg-[#f6f6fb]">
// // // // //                     <tr>
// // // // //                       <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // // //                         Nombre
// // // // //                       </th>
// // // // //                       <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // // //                         T.Documento
// // // // //                       </th>
// // // // //                       <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // // //                         Numero
// // // // //                       </th>
// // // // //                       <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // // //                         Estado
// // // // //                       </th>
// // // // //                       <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // // //                         Juicio Evaluativo
// // // // //                       </th>
// // // // //                     </tr>
// // // // //                   </thead>
// // // // //                   <tbody className="bg-white divide-y divide-[#eaeaea]">
// // // // //                     {estudiantesData.map((estudiante, index) => (
// // // // //                       <tr key={index}>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">{estudiante.nombre}</td>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">{estudiante.documento}</td>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">{estudiante.numero}</td>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm">
// // // // //                           <span
// // // // //                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// // // // //                               estudiante.activo ? "bg-[#e6f7f0] text-[#46ae69]" : "bg-[#f9e6e6] text-[#c60b0e]"
// // // // //                             }`}
// // // // //                           >
// // // // //                             {estudiante.activo ? "Activo" : "Inactivo"}
// // // // //                           </span>
// // // // //                         </td>
// // // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm">
// // // // //                           <span
// // // // //                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// // // // //                               estudiante.aprobado 
// // // // //                             }`}
// // // // //                           >
// // // // //                             {estudiante.aprobado ? "Aprobado" : "No aprobado"}
// // // // //                           </span>
// // // // //                         </td>
// // // // //                       </tr>
// // // // //                     ))}
// // // // //                   </tbody>
// // // // //                 </table>
// // // // //               </div>

// // // // //               <div className="mt-6 flex justify-end">
// // // // //                 <button
// // // // //                   className="bg-[#dc3545] text-white px-4 py-2 rounded"
// // // // //                   onClick={() => setShowEstudiantesModal(false)}
// // // // //                 >
// // // // //                   Cerrar
// // // // //                 </button>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}
// // // // //     </div>
// // // // //   )
// // // // // }

// // // // // // Datos de ejemplo
// // // // // const programasData = [
// // // // //   { nombre: "Desarrollo de Software", tipo: "Técnico", codigo: "332", cantidadNiveles: 3, estado: "En formación" },
// // // // //   { nombre: "Desarrollo de Software", tipo: "Tecnólogo", codigo: "001", cantidadNiveles: 6, estado: "cerrado" },
// // // // //   { nombre: "Telecomunicaciones", tipo: "Técnico", codigo: "002", cantidadNiveles: 3, estado: "En formación" },
// // // // //   { nombre: "Telecomunicaciones", tipo: "Tecnólogo", codigo: "003", cantidadNiveles: 6, estado: "En formación" },
// // // // //   { nombre: "Gestión Empresarial", tipo: "Técnico", codigo: "901", cantidadNiveles: 3, estado: "En formación" },
// // // // //   { nombre: "Gestión Empresarial", tipo: "Tecnólogo", codigo: "109", cantidadNiveles: 6, estado: "cerrado" },
// // // // //   { nombre: "Diseño Gráfico", tipo: "Tecnólogo", codigo: "989", cantidadNiveles: 6, estado: "cerrado" },
// // // // // ]

// // // // // const estudiantesData = [
// // // // //   { nombre: "Andres felip", documento: "C.C", numero: "2382829", activo: true, aprobado: true },
// // // // //   { nombre: "Daniel an", documento: "C.C", numero: "1092983", activo: true, aprobado: false },
// // // // //   { nombre: "nivel 3", documento: "C.C", numero: "293923", activo: false, aprobado: false },
// // // // //   { nombre: "Andres felip", documento: "C.C", numero: "283929", activo: true, aprobado: true },
// // // // //   { nombre: "nivel 2", documento: "C.C", numero: "292920", activo: true, aprobado: true },
// // // // //   { nombre: "nivel 3", documento: "T.I", numero: "282882", activo: false, aprobado: false },
// // // // //   { nombre: "Andres felip", documento: "C.C", numero: "392938", activo: true, aprobado: true },
// // // // //   { nombre: "nivel 2", documento: "C.C", numero: "3838293", activo: true, aprobado: false },
// // // // //   { nombre: "nivel 3", documento: "T.I", numero: "3838829", activo: false, aprobado: false },
// // // // // ]

// // // // // Mantener la vista principal como instructores pero conservar los modales originales
// // // // // Reemplazar todo el componente Programs con esta versión

// // // // "use client"

// // // // import { useState, useRef, useEffect } from "react"
// // // // import { ChevronDown } from "lucide-react"
// // // // import { useNavigate } from "react-router-dom"
// // // // import GenericTable from "../../../shared/components/Table"
// // // // import { useAuth } from "../../auth/hooks/useAuth"
// // // // import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// // // // // Datos de ejemplo
// // // // const programasData = [
// // // //   { nombre: "Desarrollo de Software", tipo: "Técnico", codigo: "332", cantidadNiveles: 3, estado: "En formación" },
// // // //   { nombre: "Desarrollo de Software", tipo: "Tecnólogo", codigo: "001", cantidadNiveles: 6, estado: "cerrado" },
// // // //   { nombre: "Telecomunicaciones", tipo: "Técnico", codigo: "002", cantidadNiveles: 3, estado: "En formación" },
// // // //   { nombre: "Telecomunicaciones", tipo: "Tecnólogo", codigo: "003", cantidadNiveles: 6, estado: "En formación" },
// // // //   { nombre: "Gestión Empresarial", tipo: "Técnico", codigo: "901", cantidadNiveles: 3, estado: "En formación" },
// // // //   { nombre: "Gestión Empresarial", tipo: "Tecnólogo", codigo: "109", cantidadNiveles: 6, estado: "cerrado" },
// // // //   { nombre: "Diseño Gráfico", tipo: "Tecnólogo", codigo: "989", cantidadNiveles: 6, estado: "cerrado" },
// // // // ]

// // // // const columns = [
// // // //   { key: "nombre", label: "Nombre" },
// // // //   { key: "tipo", label: "Tipo" },
// // // //   { key: "codigo", label: "Código del Programa" },
// // // //   { key: "cantidadNiveles", label: "Cantidad de Niveles" },
// // // //   {
// // // //     key: "estado",
// // // //     label: "Estado",
// // // //     render: (item) => (
// // // //       <span
// // // //         className={`px-2 py-1 rounded-full text-xs font-medium ${
// // // //           item.estado === "En formación" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// // // //         }`}
// // // //       >
// // // //         {item.estado}
// // // //       </span>
// // // //     ),
// // // //   },
// // // // ]

// // // // export default function Programs() {
// // // //   const [showProgramaDetalle, setShowProgramaDetalle] = useState(false)
// // // //   const [showEstudiantesModal, setShowEstudiantesModal] = useState(false)
// // // //   const [programaSeleccionado, setProgramaSeleccionado] = useState(null)
// // // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// // // //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// // // //   const { logout } = useAuth()
// // // //   const navigate = useNavigate()
// // // //   const dropdownRef = useRef(null)

// // // //   // Add click outside handler
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

// // // //   const verPrograma = (programa) => {
// // // //     setProgramaSeleccionado(programa)
// // // //     setShowProgramaDetalle(true)
// // // //   }

// // // //   const verEstudiantes = () => {
// // // //     setShowProgramaDetalle(false)
// // // //     setShowEstudiantesModal(true)
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen">
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

// // // //       <div className="container mx-auto px-6">
// // // //         <GenericTable
// // // //           data={programasData}
// // // //           columns={columns}
// // // //           onShow={verPrograma}
// // // //           title=""
// // // //           showActions={{ show: true }}
// // // //         />
// // // //       </div>

// // // //       {/* Programa Detalle Modal - Mantenido del original pero con mejor espaciado */}
// // // //       {showProgramaDetalle && programaSeleccionado && (
// // // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // // //           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
// // // //             <div className="p-6">
// // // //               <div className="flex flex-col md:flex-row gap-6 mb-6">
// // // //                 <div className="flex-1">
// // // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //                     <div>
// // // //                       <div className="text-sm text-[#627b87]">Nombre:</div>
// // // //                       <div className="font-medium">ADSO</div>
// // // //                     </div>
// // // //                     <div>
// // // //                       <div className="text-sm text-[#627b87]">Tipo:</div>
// // // //                       <div className="font-medium">Técnico</div>
// // // //                     </div>
// // // //                     <div>
// // // //                       <div className="text-sm text-[#627b87]">estado:</div>
// // // //                       <div className="font-medium">
// // // //                         <span className="px-2 py-1 rounded text-xs bg-[#e6f7f0] text-[#46ae69]">En formación</span>
// // // //                       </div>
// // // //                     </div>
// // // //                   </div>
// // // //                 </div>

// // // //                 <div className="flex flex-col gap-2">
// // // //                   <div>
// // // //                     <div className="text-sm text-[#627b87]">Cantidad de Niveles:</div>
// // // //                     <div className="font-medium">3</div>
// // // //                   </div>
// // // //                   <div>
// // // //                     <div className="text-sm text-[#627b87]">Codigo del programa:</div>
// // // //                     <div className="font-medium">332</div>
// // // //                   </div>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="mb-4">
// // // //                 <div className="text-sm font-medium text-[#627b87] mb-2">fichas asociadas al programa:</div>
// // // //                 <div className="overflow-x-auto">
// // // //                   <table className="min-w-full divide-y divide-[#eaeaea]">
// // // //                     <thead className="bg-[#f6f6fb]">
// // // //                       <tr>
// // // //                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // //                           Fichas
// // // //                         </th>
// // // //                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // //                           Instructor
// // // //                         </th>
// // // //                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // //                           N. Aprendices
// // // //                         </th>
// // // //                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // //                           Acciones
// // // //                         </th>
// // // //                       </tr>
// // // //                     </thead>
// // // //                     <tbody className="bg-white divide-y divide-[#eaeaea]">
// // // //                       <tr>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">2347278</td>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">20</td>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm">
// // // //                           <button className="bg-[#1f384c] text-white rounded-full p-1.5" onClick={verEstudiantes}>
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
// // // //                         </td>
// // // //                       </tr>
// // // //                       <tr>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">2889382</td>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">30</td>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm">
// // // //                           <button className="bg-[#1f384c] text-white rounded-full p-1.5">
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
// // // //                         </td>
// // // //                       </tr>
// // // //                       <tr>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">2983837</td>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">15</td>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm">
// // // //                           <button className="bg-[#1f384c] text-white rounded-full p-1.5">
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
// // // //                         </td>
// // // //                       </tr>
// // // //                     </tbody>
// // // //                   </table>
// // // //                 </div>
// // // //               </div>

// // // //               <div className="mt-6 flex justify-end">
// // // //                 <button
// // // //                   className="bg-[#dc3545] text-white px-4 py-2 rounded"
// // // //                   onClick={() => setShowProgramaDetalle(false)}
// // // //                 >
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
// // // //           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
// // // //             <div className="p-6">
// // // //               <h2 className="text-xl font-bold text-[#1f384c] mb-6">Listado de Estudiantes Nivel 1</h2>

// // // //               <div className="overflow-x-auto">
// // // //                 <table className="min-w-full divide-y divide-[#eaeaea]">
// // // //                   <thead className="bg-[#f6f6fb]">
// // // //                     <tr>
// // // //                       <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // //                         Nombre
// // // //                       </th>
// // // //                       <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // //                         T.Documento
// // // //                       </th>
// // // //                       <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // //                         Numero
// // // //                       </th>
// // // //                       <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // //                         Estado
// // // //                       </th>
// // // //                       <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // // //                         Juicio Evaluativo
// // // //                       </th>
// // // //                     </tr>
// // // //                   </thead>
// // // //                   <tbody className="bg-white divide-y divide-[#eaeaea]">
// // // //                     {estudiantesData.map((estudiante, index) => (
// // // //                       <tr key={index}>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">{estudiante.nombre}</td>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">{estudiante.documento}</td>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">{estudiante.numero}</td>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm">
// // // //                           <span
// // // //                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// // // //                               estudiante.activo ? "bg-[#e6f7f0] text-[#46ae69]" : "bg-[#f9e6e6] text-[#c60b0e]"
// // // //                             }`}
// // // //                           >
// // // //                             {estudiante.activo ? "Activo" : "Inactivo"}
// // // //                           </span>
// // // //                         </td>
// // // //                         <td className="px-4 py-2 whitespace-nowrap text-sm">
// // // //                           <span
// // // //                             className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
// // // //                               estudiante.aprobado ? "bg-[#e6f7f0] text-[#46ae69]" : "bg-[#f9e6e6] text-[#c60b0e]"
// // // //                             }`}
// // // //                           >
// // // //                             {estudiante.aprobado ? "Aprobado" : "No aprobado"}
// // // //                           </span>
// // // //                         </td>
// // // //                       </tr>
// // // //                     ))}
// // // //                   </tbody>
// // // //                 </table>
// // // //               </div>

// // // //               <div className="mt-6 flex justify-end">
// // // //                 <button
// // // //                   className="bg-[#dc3545] text-white px-4 py-2 rounded"
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
// // // // const estudiantesData = [
// // // //   { nombre: "Andres felip", documento: "C.C", numero: "2382829", activo: true, aprobado: true },
// // // //   { nombre: "Daniel an", documento: "C.C", numero: "1092983", activo: true, aprobado: false },
// // // //   { nombre: "nivel 3", documento: "C.C", numero: "293923", activo: false, aprobado: false },
// // // //   { nombre: "Andres felip", documento: "C.C", numero: "283929", activo: true, aprobado: true },
// // // //   { nombre: "nivel 2", documento: "C.C", numero: "292920", activo: true, aprobado: true },
// // // //   { nombre: "nivel 3", documento: "T.I", numero: "282882", activo: false, aprobado: false },
// // // //   { nombre: "Andres felip", documento: "C.C", numero: "392938", activo: true, aprobado: true },
// // // //   { nombre: "nivel 2", documento: "C.C", numero: "3838293", activo: true, aprobado: false },
// // // //   { nombre: "nivel 3", documento: "T.I", numero: "3838829", activo: false, aprobado: false },
// // // // ]

// // // // Mantener la vista principal como instructores pero conservar los modales originales
// // // // Reemplazar todo el componente Programs con esta versión

// // // "use client"

// // // import { useState, useRef, useEffect } from "react"
// // // import { ChevronDown } from "lucide-react"
// // // import { useNavigate } from "react-router-dom"
// // // import GenericTable from "../../../shared/components/Table"
// // // import { useAuth } from "../../auth/hooks/useAuth"
// // // import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// // // // Datos de ejemplo
// // // const programasData = [
// // //   { nombre: "Desarrollo de Software", tipo: "Técnico", codigo: "332", cantidadNiveles: 3, estado: "En formación" },
// // //   { nombre: "Desarrollo de Software", tipo: "Tecnólogo", codigo: "001", cantidadNiveles: 6, estado: "cerrado" },
// // //   { nombre: "Telecomunicaciones", tipo: "Técnico", codigo: "002", cantidadNiveles: 3, estado: "En formación" },
// // //   { nombre: "Telecomunicaciones", tipo: "Tecnólogo", codigo: "003", cantidadNiveles: 6, estado: "En formación" },
// // //   { nombre: "Gestión Empresarial", tipo: "Técnico", codigo: "901", cantidadNiveles: 3, estado: "En formación" },
// // //   { nombre: "Gestión Empresarial", tipo: "Tecnólogo", codigo: "109", cantidadNiveles: 6, estado: "cerrado" },
// // //   { nombre: "Diseño Gráfico", tipo: "Tecnólogo", codigo: "989", cantidadNiveles: 6, estado: "cerrado" },
// // // ]

// // // const columns = [
// // //   { key: "nombre", label: "Nombre" },
// // //   { key: "tipo", label: "Tipo" },
// // //   { key: "codigo", label: "Código del Programa" },
// // //   { key: "cantidadNiveles", label: "Cantidad de Niveles" },
// // //   {
// // //     key: "estado",
// // //     label: "Estado",
// // //     render: (item) => (
// // //       <span
// // //         className={`px-2 py-1 rounded-full text-xs font-medium ${
// // //           item.estado === "En formación" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// // //         }`}
// // //       >
// // //         {item.estado}
// // //       </span>
// // //     ),
// // //   },
// // // ]

// // // export default function Programs() {
// // //   const [showProgramaDetalle, setShowProgramaDetalle] = useState(false)
// // //   const [showEstudiantesModal, setShowEstudiantesModal] = useState(false)
// // //   const [programaSeleccionado, setProgramaSeleccionado] = useState(null)
// // //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// // //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// // //   const { logout } = useAuth()
// // //   const navigate = useNavigate()
// // //   const dropdownRef = useRef(null)

// // //   // Add click outside handler
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

// // //   const verPrograma = (programa) => {
// // //     setProgramaSeleccionado(programa)
// // //     setShowProgramaDetalle(true)
// // //   }

// // //   const verEstudiantes = () => {
// // //     setShowProgramaDetalle(false)
// // //     setShowEstudiantesModal(true)
// // //   }

// // //   return (
// // //     <div className="min-h-screen">
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

// // //       <div className="container mx-auto px-6">
// // //         <GenericTable
// // //           data={programasData}
// // //           columns={columns}
// // //           onShow={verPrograma}
// // //           title=""
// // //           showActions={{ show: true }}
// // //         />
// // //       </div>

// // //       {/* Programa Detalle Modal - Mantenido del original pero con mejor espaciado */}
// // //       {showProgramaDetalle && programaSeleccionado && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
// // //             <div className="p-6">
// // //               <div className="flex flex-col md:flex-row gap-6 mb-6">
// // //                 <div className="flex-1">
// // //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // //                     <div>
// // //                       <div className="text-sm text-[#627b87]">Nombre:</div>
// // //                       <div className="font-medium">ADSO</div>
// // //                     </div>
// // //                     <div>
// // //                       <div className="text-sm text-[#627b87]">Tipo:</div>
// // //                       <div className="font-medium">Técnico</div>
// // //                     </div>
// // //                     <div>
// // //                       <div className="text-sm text-[#627b87]">estado:</div>
// // //                       <div className="font-medium">
// // //                         <span className="px-2 py-1 rounded text-xs bg-[#e6f7f0] text-[#46ae69]">En formación</span>
// // //                       </div>
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 <div className="flex flex-col gap-2">
// // //                   <div>
// // //                     <div className="text-sm text-[#627b87]">Cantidad de Niveles:</div>
// // //                     <div className="font-medium">3</div>
// // //                   </div>
// // //                   <div>
// // //                     <div className="text-sm text-[#627b87]">Codigo del programa:</div>
// // //                     <div className="font-medium">332</div>
// // //                   </div>
// // //                 </div>
// // //               </div>

// // //               <div className="mb-4">
// // //                 <div className="text-sm font-medium text-[#627b87] mb-2">fichas asociadas al programa:</div>
// // //                 <div className="overflow-x-auto">
// // //                   <table className="min-w-full divide-y divide-[#eaeaea]">
// // //                     <thead className="bg-[#f6f6fb]">
// // //                       <tr>
// // //                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // //                           Niveles
// // //                         </th>
// // //                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // //                           Instructor
// // //                         </th>
// // //                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // //                           N. Aprendices
// // //                         </th>
// // //                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// // //                           Acciones
// // //                         </th>
// // //                       </tr>
// // //                     </thead>
// // //                     <tbody className="bg-white divide-y divide-[#eaeaea]">
// // //                       <tr>
// // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">nivel 1</td>
// // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">20</td>
// // //                         <td className="px-4 py-2 whitespace-nowrap text-sm">
// // //                           <button className="bg-[#1f384c] text-white rounded-full p-1.5" onClick={verEstudiantes}>
// // //                             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //                               <path
// // //                                 strokeLinecap="round"
// // //                                 strokeLinejoin="round"
// // //                                 strokeWidth={2}
// // //                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
// // //                               />
// // //                               <path
// // //                                 strokeLinecap="round"
// // //                                 strokeLinejoin="round"
// // //                                 strokeWidth={2}
// // //                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
// // //                               />
// // //                             </svg>
// // //                           </button>
// // //                         </td>
// // //                       </tr>
// // //                       <tr>
// // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">nivel 2</td>
// // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">30</td>
// // //                         <td className="px-4 py-2 whitespace-nowrap text-sm">
// // //                           <button className="bg-[#1f384c] text-white rounded-full p-1.5">
// // //                             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //                               <path
// // //                                 strokeLinecap="round"
// // //                                 strokeLinejoin="round"
// // //                                 strokeWidth={2}
// // //                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
// // //                               />
// // //                               <path
// // //                                 strokeLinecap="round"
// // //                                 strokeLinejoin="round"
// // //                                 strokeWidth={2}
// // //                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
// // //                               />
// // //                             </svg>
// // //                           </button>
// // //                         </td>
// // //                       </tr>
// // //                       <tr>
// // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">nivel 3</td>
// // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// // //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">15</td>
// // //                         <td className="px-4 py-2 whitespace-nowrap text-sm">
// // //                           <button className="bg-[#1f384c] text-white rounded-full p-1.5">
// // //                             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //                               <path
// // //                                 strokeLinecap="round"
// // //                                 strokeLinejoin="round"
// // //                                 strokeWidth={2}
// // //                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
// // //                               />
// // //                               <path
// // //                                 strokeLinecap="round"
// // //                                 strokeLinejoin="round"
// // //                                 strokeWidth={2}
// // //                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
// // //                               />
// // //                             </svg>
// // //                           </button>
// // //                         </td>
// // //                       </tr>
// // //                     </tbody>
// // //                   </table>
// // //                 </div>
// // //               </div>

// // //               <div className="mt-6 flex justify-end">
// // //                 <button
// // //                   className="bg-[#dc3545] text-white px-4 py-2 rounded"
// // //                   onClick={() => setShowProgramaDetalle(false)}
// // //                 >
// // //                   Cerrar
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Estudiantes Modal - Mantenido del original pero con mejor espaciado */}
// // //       {showEstudiantesModal && (
// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// // //           <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-4 max-h-[80vh] overflow-auto">
// // //             <div className="p-4">
// // //               <h2 className="text-xl font-bold text-center text-[#1f384c] mb-4">Listado de Estudiantes Nivel 1</h2>

// // //               <div className="overflow-x-auto mb-4">
// // //                 <table className="min-w-full divide-y divide-gray-200 text-sm">
// // //                   <thead className="bg-white">
// // //                     <tr className="border-b">
// // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
// // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">T.Documento</th>
// // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Número</th>
// // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Estado</th>
// // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nivel 1</th>
// // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nivel 2</th>
// // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nivel 3</th>
// // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Ranking</th>
// // //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Total</th>
// // //                     </tr>
// // //                   </thead>
// // //                   <tbody className="bg-white divide-y divide-gray-200">
// // //                     {estudiantesNuevosData.map((estudiante, index) => (
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
// // //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nivel1}</td>
// // //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nivel2}</td>
// // //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nivel3}</td>
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

// // // // Añadir los nuevos datos de estudiantes
// // // const estudiantesNuevosData = [
// // //   {
// // //     nombre: "Andres felipe",
// // //     documento: "C.C",
// // //     numero: "2382829",
// // //     estado: "activo",
// // //     nivel1: "Aprobado",
// // //     nivel2: "Aprobado",
// // //     nivel3: "No aprobado",
// // //     ranking: "900",
// // //     total: "No aprobado",
// // //   },
// // //   {
// // //     nombre: "Daniel Huerta",
// // //     documento: "C.C",
// // //     numero: "1092983",
// // //     estado: "activo",
// // //     nivel1: "Aprobado",
// // //     nivel2: "Aprobado",
// // //     nivel3: "Aprobado",
// // //     ranking: "700",
// // //     total: "Aprobado",
// // //   },
// // //   {
// // //     nombre: "Gerson Parra",
// // //     documento: "C.C",
// // //     numero: "293923",
// // //     estado: "activo",
// // //     nivel1: "Aprobado",
// // //     nivel2: "No aprobado",
// // //     nivel3: "No aprobado",
// // //     ranking: "500",
// // //     total: "No aprobado",
// // //   },
// // //   {
// // //     nombre: "Andres felipe",
// // //     documento: "C.C",
// // //     numero: "283929",
// // //     estado: "activo",
// // //     nivel1: "Aprobado",
// // //     nivel2: "Aprobado",
// // //     nivel3: "Aprobado",
// // //     ranking: "400",
// // //     total: "Aprobado",
// // //   },
// // //   {
// // //     nombre: "Andres Puerta",
// // //     documento: "C.C",
// // //     numero: "292920",
// // //     estado: "activo",
// // //     nivel1: "No aprobado",
// // //     nivel2: "No aprobado",
// // //     nivel3: "No aprobado",
// // //     ranking: "350",
// // //     total: "No aprobado",
// // //   },
// // //   {
// // //     nombre: "Matias Giraldo",
// // //     documento: "T.I",
// // //     numero: "282882",
// // //     estado: "retirado",
// // //     nivel1: "No aprobado",
// // //     nivel2: "No aprobado",
// // //     nivel3: "No aprobado",
// // //     ranking: "300",
// // //     total: "No aprobado",
// // //   },
// // //   {
// // //     nombre: "Andres felipe",
// // //     documento: "C.C",
// // //     numero: "392938",
// // //     estado: "completado",
// // //     nivel1: "No aprobado",
// // //     nivel2: "No aprobado",
// // //     nivel3: "No aprobado",
// // //     ranking: "250",
// // //     total: "No aprobado",
// // //   },
// // //   {
// // //     nombre: "Daniel David",
// // //     documento: "C.C",
// // //     numero: "3838293",
// // //     estado: "cancelado",
// // //     nivel1: "aprobado",
// // //     nivel2: "aprobado",
// // //     nivel3: "aprobado",
// // //     ranking: "200",
// // //     total: "Aprobado",
// // //   },
// // //   {
// // //     nombre: "Diego David",
// // //     documento: "T.I",
// // //     numero: "3838829",
// // //     estado: "cancelado",
// // //     nivel1: "aprobado",
// // //     nivel2: "aprobado",
// // //     nivel3: "Aprobado",
// // //     ranking: "150",
// // //     total: "Aprobado",
// // //   },
// // // ]

// // "use client"

// // import { useState, useRef, useEffect } from "react"
// // import { ChevronDown } from "lucide-react"
// // import { useNavigate } from "react-router-dom"
// // import GenericTable from "../../../shared/components/Table"
// // import { useAuth } from "../../auth/hooks/useAuth"
// // import ConfirmationModal from "../../../shared/components/ConfirmationModal"
// // import ProgramDetailModal from "./ProgramDetailModal"
// // import Tooltip from "../../../shared/components/Tooltip"

// // // Datos de ejemplo
// // const programasData = [
// //   { nombre: "Desarrollo de Software", tipo: "Técnico", codigo: "332", cantidadNiveles: 3, estado: "En formación" },
// //   { nombre: "Desarrollo de Software", tipo: "Tecnólogo", codigo: "001", cantidadNiveles: 6, estado: "cerrado" },
// //   { nombre: "Telecomunicaciones", tipo: "Técnico", codigo: "002", cantidadNiveles: 3, estado: "En formación" },
// //   { nombre: "Telecomunicaciones", tipo: "Tecnólogo", codigo: "003", cantidadNiveles: 6, estado: "En formación" },
// //   { nombre: "Gestión Empresarial", tipo: "Técnico", codigo: "901", cantidadNiveles: 3, estado: "En formación" },
// //   { nombre: "Gestión Empresarial", tipo: "Tecnólogo", codigo: "109", cantidadNiveles: 6, estado: "cerrado" },
// //   { nombre: "Diseño Gráfico", tipo: "Tecnólogo", codigo: "989", cantidadNiveles: 6, estado: "cerrado" },
// // ]

// // const columns = [
// //   { key: "nombre", label: "Nombre" },
// //   { key: "tipo", label: "Tipo" },
// //   { key: "codigo", label: "Código del Programa" },
// //   { key: "cantidadNiveles", label: "Cantidad de Niveles" },
// //   {
// //     key: "estado",
// //     label: "Estado",
// //     render: (item) => (
// //       <span
// //         className={`px-2 py-1 rounded-full text-xs font-medium ${
// //           item.estado === "En formación" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
// //         }`}
// //       >
// //         {item.estado}
// //       </span>
// //     ),
// //   },
// // ]

// // export default function Programs() {
// //   const [showProgramaDetalle, setShowProgramaDetalle] = useState(false)
// //   const [showEstudiantesModal, setShowEstudiantesModal] = useState(false)
// //   const [programaSeleccionado, setProgramaSeleccionado] = useState(null)
// //   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
// //   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
// //   const { logout } = useAuth()
// //   const navigate = useNavigate()
// //   const dropdownRef = useRef(null)

// //   const [selectedProgram, setSelectedProgram] = useState(null)
// //   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

// //   // Add click outside handler
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

// //   const verPrograma = (programa) => {
// //     setProgramaSeleccionado(programa)
// //     setShowProgramaDetalle(true)
// //   }

// //   const verEstudiantes = () => {
// //     setShowProgramaDetalle(false)
// //     setShowEstudiantesModal(true)
// //   }

// //   const handleOpenDetailModal = (program) => {
// //     setSelectedProgram(program)
// //     setIsDetailModalOpen(true)
// //   }

// //   const handleCloseDetailModal = () => {
// //     setSelectedProgram(null)
// //     setIsDetailModalOpen(false)
// //   }

// //   return (
// //     <div className="min-h-screen">
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

// //       <div className="container mx-auto px-6">
// //         <GenericTable
// //           data={programasData}
// //           columns={columns}
// //           onShow={verPrograma}
// //           title=""
// //           showActions={{ show: true }}
// //         />
// //       </div>

// //       {/* Programa Detalle Modal - Mantenido del original pero con mejor espaciado */}
// //       {showProgramaDetalle && programaSeleccionado && (
// //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
// //           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
// //             <div className="p-6">
// //               <div className="flex flex-col md:flex-row gap-6 mb-6">
// //                 <div className="flex-1">
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div>
// //                       <div className="text-sm text-[#627b87]">Nombre:</div>
// //                       <div className="font-medium">ADSO</div>
// //                     </div>
// //                     <div>
// //                       <div className="text-sm text-[#627b87]">Tipo:</div>
// //                       <div className="font-medium">Técnico</div>
// //                     </div>
// //                     <div>
// //                       <div className="text-sm text-[#627b87]">estado:</div>
// //                       <div className="font-medium">
// //                         <span className="px-2 py-1 rounded text-xs bg-[#e6f7f0] text-[#46ae69]">En formación</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="flex flex-col gap-2">
// //                   <div>
// //                     <div className="text-sm text-[#627b87]">Cantidad de Niveles:</div>
// //                     <div className="font-medium">3</div>
// //                   </div>
// //                   <div>
// //                     <div className="text-sm text-[#627b87]">Codigo del programa:</div>
// //                     <div className="font-medium">332</div>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="mb-4">
// //                 <div className="text-sm font-medium text-[#627b87] mb-2">fichas asociadas al programa:</div>
// //                 <div className="overflow-x-auto">
// //                   <table className="min-w-full divide-y divide-[#eaeaea]">
// //                     <thead className="bg-white">
// //                       <tr>
// //                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// //                           Niveles
// //                         </th>
// //                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// //                           Instructor
// //                         </th>
// //                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// //                           N. Aprendices
// //                         </th>
// //                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
// //                           Acciones
// //                         </th>
// //                       </tr>
// //                     </thead>
// //                     <tbody className="bg-white divide-y divide-[#eaeaea]">
// //                       <tr>
// //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Nivel 1</td>
// //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">20</td>
// //                         <td className="px-4 py-2 whitespace-nowrap text-sm">
// //                         <Tooltip text="Ver Aprendices" position="top">
// //                           <button className="bg-[#1f384c] text-white rounded-lg p-1.5" onClick={verEstudiantes}>
// //                             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                               <path
// //                                 strokeLinecap="round"
// //                                 strokeLinejoin="round"
// //                                 strokeWidth={2}
// //                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
// //                               />
// //                               <path
// //                                 strokeLinecap="round"
// //                                 strokeLinejoin="round"
// //                                 strokeWidth={2}
// //                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
// //                               />
// //                             </svg>
// //                           </button>
// //                           </Tooltip>
// //                         </td>
// //                       </tr>
// //                       <tr>
// //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Nivel 2</td>
// //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">30</td>
// //                         <td className="px-4 py-2 whitespace-nowrap text-sm">
// //                         <Tooltip text="Ver Aprendices" position="top">
// //                           <button className="bg-[#1f384c] text-white rounded-lg p-1.5">
// //                             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                               <path
// //                                 strokeLinecap="round"
// //                                 strokeLinejoin="round"
// //                                 strokeWidth={2}
// //                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
// //                               />
// //                               <path
// //                                 strokeLinecap="round"
// //                                 strokeLinejoin="round"
// //                                 strokeWidth={2}
// //                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
// //                               />
// //                             </svg>
// //                           </button>
// //                           </Tooltip>
// //                         </td>
// //                       </tr>
// //                       <tr>
// //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Nivel 3</td>
// //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
// //                         <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">15</td>
// //                         <td className="px-4 py-2 whitespace-nowrap text-sm">
// //                           <Tooltip text="Ver Aprendices" position="top">
// //                           <button className="bg-[#1f384c] text-white rounded-lg p-1.5">
// //                             <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                               <path
// //                                 strokeLinecap="round"
// //                                 strokeLinejoin="round"
// //                                 strokeWidth={2}
// //                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
// //                               />
// //                               <path
// //                                 strokeLinecap="round"
// //                                 strokeLinejoin="round"
// //                                 strokeWidth={2}
// //                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
// //                               />
// //                             </svg>
// //                           </button>
// //                           </Tooltip>
                          

// //                         </td>
// //                       </tr>
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               </div>

// //               <div className="mt-6 flex justify-end">
// //                 <button
// //                   className="bg-[#f44144] text-white text-sm py-2 px-2 rounded-lg  font-medium hover:bg-red-600 transition-colors"
// //                   onClick={() => setShowProgramaDetalle(false)}
// //                 >
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
// //           <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-4 max-h-[90vh]">
// //             <div className="p-4">
// //               <h2 className="text-xl font-bold text-center text-[#1f384c] mb-4">Listado de Estudiantes Nivel 1</h2>

// //               <div className=" mb-4">
// //                 <table className="min-w-full divide-y divide-gray-200 text-sm">
// //                   <thead className="bg-white">
// //                     <tr className="border-b">
// //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
// //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">T.Documento</th>
// //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Número</th>
// //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Estado</th>
// //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nivel 1</th>
// //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nivel 2</th>
// //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nivel 3</th>
// //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Ranking</th>
// //                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Total</th>
// //                     </tr>
// //                   </thead>
// //                   <tbody className="bg-white divide-y divide-gray-200">
// //                     {estudiantesNuevosData.map((estudiante, index) => (
// //                       <tr key={index}>
// //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nombre}</td>
// //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.documento}</td>
// //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.numero}</td>
// //                         <td className="px-3 py-2 whitespace-nowrap">
// //                           <span
// //                             className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
// //                               estudiante.estado === "activo"
// //                                 ? "bg-green-100 text-green-800"
// //                                 : estudiante.estado === "retirado"
// //                                   ? "bg-yellow-100 text-yellow-800"
// //                                   : estudiante.estado === "completado"
// //                                     ? "bg-blue-100 text-blue-800"
// //                                     : "bg-red-100 text-red-800"
// //                             }`}
// //                           >
// //                             {estudiante.estado}
// //                           </span>
// //                         </td>
// //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nivel1}</td>
// //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nivel2}</td>
// //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nivel3}</td>
// //                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.ranking}</td>
// //                         <td className="px-3 py-2 whitespace-nowrap text-sm">
// //                           <span
// //                             className={`px-2 py-0.5 rounded-full text-xs font-medium ${
// //                               estudiante.total === "Aprobado"
// //                                 ? "bg-green-100 text-green-800"
// //                                 : "bg-red-100 text-red-800"
// //                             }`}
// //                           >
// //                             {estudiante.total}
// //                           </span>
// //                         </td>
// //                       </tr>
// //                     ))}
// //                   </tbody>
// //                 </table>
// //               </div>

// //               <div className="flex justify-center">
// //                 <button
// //                   className="bg-[#f44144] text-white px-4 py-1.5 rounded-lg text-sm"
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
// //       <ProgramDetailModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} program={selectedProgram} />
// //     </div>
// //   )
// // }

// // // Añadir los nuevos datos de estudiantes
// // const estudiantesNuevosData = [
// //   {
// //     nombre: "Andres felipe",
// //     documento: "C.C",
// //     numero: "2382829",
// //     estado: "activo",
// //     nivel1: "Aprobado",
// //     nivel2: "Aprobado",
// //     nivel3: "No aprobado",
// //     ranking: "900",
// //     total: "No aprobado",
// //   },
// //   {
// //     nombre: "Daniel Huerta",
// //     documento: "C.C",
// //     numero: "1092983",
// //     estado: "activo",
// //     nivel1: "Aprobado",
// //     nivel2: "Aprobado",
// //     nivel3: "Aprobado",
// //     ranking: "700",
// //     total: "Aprobado",
// //   },
// //   {
// //     nombre: "Gerson Parra",
// //     documento: "C.C",
// //     numero: "293923",
// //     estado: "activo",
// //     nivel1: "Aprobado",
// //     nivel2: "No aprobado",
// //     nivel3: "No aprobado",
// //     ranking: "500",
// //     total: "No aprobado",
// //   },
// //   {
// //     nombre: "Andres felipe",
// //     documento: "C.C",
// //     numero: "283929",
// //     estado: "activo",
// //     nivel1: "Aprobado",
// //     nivel2: "Aprobado",
// //     nivel3: "Aprobado",
// //     ranking: "400",
// //     total: "Aprobado",
// //   },
// //   {
// //     nombre: "Andres Puerta",
// //     documento: "C.C",
// //     numero: "292920",
// //     estado: "activo",
// //     nivel1: "No aprobado",
// //     nivel2: "No aprobado",
// //     nivel3: "No aprobado",
// //     ranking: "350",
// //     total: "No aprobado",
// //   },
// //   {
// //     nombre: "Matias Giraldo",
// //     documento: "T.I",
// //     numero: "282882",
// //     estado: "retirado",
// //     nivel1: "No aprobado",
// //     nivel2: "No aprobado",
// //     nivel3: "No aprobado",
// //     ranking: "300",
// //     total: "No aprobado",
// //   },
// //   {
// //     nombre: "Andres felipe",
// //     documento: "C.C",
// //     numero: "392938",
// //     estado: "completado",
// //     nivel1: "No aprobado",
// //     nivel2: "No aprobado",
// //     nivel3: "No aprobado",
// //     ranking: "250",
// //     total: "No aprobado",
// //   },
// //   {
// //     nombre: "Daniel David",
// //     documento: "C.C",
// //     numero: "3838293",
// //     estado: "cancelado",
// //     nivel1: "aprobado",
// //     nivel2: "aprobado",
// //     nivel3: "aprobado",
// //     ranking: "200",
// //     total: "Aprobado",
// //   },
// //   {
// //     nombre: "Diego David",
// //     documento: "T.I",
// //     numero: "3838829",
// //     estado: "cancelado",
// //     nivel1: "aprobado",
// //     nivel2: "aprobado",
// //     nivel3: "Aprobado",
// //     ranking: "150",
// //     total: "Aprobado",
// //   },
// // ]

// "use client"

// import { useState, useRef, useEffect } from "react"
// import { ChevronDown } from "lucide-react"
// import { useNavigate } from "react-router-dom"
// import GenericTable from "../../../shared/components/Table"
// import { useAuth } from "../../auth/hooks/useAuth"
// import ConfirmationModal from "../../../shared/components/ConfirmationModal"
// import ProgramDetailModal from "./ProgramDetailModal"
// import Tooltip from "../../../shared/components/Tooltip"

// // Datos de ejemplo
// const programasData = [
//   { nombre: "Desarrollo de Software", tipo: "Técnico", codigo: "332", cantidadNiveles: 3, estado: "En formación" },
//   { nombre: "Desarrollo de Software", tipo: "Tecnólogo", codigo: "001", cantidadNiveles: 6, estado: "cerrado" },
//   { nombre: "Telecomunicaciones", tipo: "Técnico", codigo: "002", cantidadNiveles: 3, estado: "En formación" },
//   { nombre: "Telecomunicaciones", tipo: "Tecnólogo", codigo: "003", cantidadNiveles: 6, estado: "En formación" },
//   { nombre: "Gestión Empresarial", tipo: "Técnico", codigo: "901", cantidadNiveles: 3, estado: "En formación" },
//   { nombre: "Gestión Empresarial", tipo: "Tecnólogo", codigo: "109", cantidadNiveles: 6, estado: "cerrado" },
//   { nombre: "Diseño Gráfico", tipo: "Tecnólogo", codigo: "989", cantidadNiveles: 6, estado: "cerrado" },
// ]

// const columns = [
//   { key: "nombre", label: "Nombre" },
//   { key: "tipo", label: "Tipo" },
//   { key: "codigo", label: "Código del Programa" },
//   { key: "cantidadNiveles", label: "Cantidad de Niveles" },
//   {
//     key: "estado",
//     label: "Estado",
//     render: (item) => (
//       <span
//         className={`px-2 py-1 rounded-full text-xs font-medium ${
//           item.estado === "En formación" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//         }`}
//       >
//         {item.estado}
//       </span>
//     ),
//   },
// ]

// export default function Programs() {
//   const [showProgramaDetalle, setShowProgramaDetalle] = useState(false)
//   const [showEstudiantesModal, setShowEstudiantesModal] = useState(false)
//   const [programaSeleccionado, setProgramaSeleccionado] = useState(null)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
//   const { logout } = useAuth()
//   const navigate = useNavigate()
//   const dropdownRef = useRef(null)

//   const [selectedProgram, setSelectedProgram] = useState(null)
//   const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

//   const [currentNivel, setCurrentNivel] = useState(null)

//   // Add click outside handler
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

//   const verEstudiantes = (nivel) => {
//     setCurrentNivel(nivel)
//     setShowProgramaDetalle(false)
//     setShowEstudiantesModal(true)
//   }

//   const verPrograma = (programa) => {
//     // Crear datos de estudiantes para cada nivel
//     const generarEstudiantes = (nivel, cantidad) => {
//       return Array.from({ length: cantidad }, (_, i) => ({
//         nombre: `Estudiante ${i + 1} - ${nivel}`,
//         documento: Math.random() > 0.5 ? "C.C" : "T.I",
//         numero: Math.floor(1000000 + Math.random() * 9000000).toString(),
//         estado: ["activo", "retirado", "completado", "cancelado"][Math.floor(Math.random() * 4)],
//         calificacion: Math.random() > 0.4 ? "Aprobado" : "No aprobado",
//         ranking: Math.floor(Math.random() * 1000).toString(),
//       }))
//     }

//     // Generar niveles con sus estudiantes
//     const niveles = Array.from({ length: programa.cantidadNiveles }, (_, i) => ({
//       id: i + 1,
//       nombre: `Nivel ${i + 1}`,
//       instructor: ["Yaritza Ortiz", "Carlos Pérez", "María López", "Juan Rodríguez"][i % 4],
//       aprendices: 10 + Math.floor(Math.random() * 20),
//       estado: i === 0 ? "En formación" : i === programa.cantidadNiveles - 1 ? "No iniciado" : "Terminado",
//     }))

//     // Asignar estudiantes a cada nivel
//     niveles.forEach((nivel) => {
//       nivel.estudiantes = generarEstudiantes(nivel.nombre, nivel.aprendices)
//     })

//     // Crear un objeto con la estructura que espera el modal
//     const programaConNiveles = {
//       ...programa,
//       name: programa.nombre,
//       description: `Descripción del programa ${programa.nombre}`,
//       duration: `${programa.cantidadNiveles} niveles`,
//       status: programa.estado,
//       code: programa.codigo,
//       type: programa.tipo,
//       levels: programa.cantidadNiveles,
//       niveles: niveles,
//     }

//     setProgramaSeleccionado(programaConNiveles)
//     setShowProgramaDetalle(true)
//   }

//   const handleOpenDetailModal = (program) => {
//     setSelectedProgram(program)
//     setIsDetailModalOpen(true)
//   }

//   const handleCloseDetailModal = () => {
//     setSelectedProgram(null)
//     setIsDetailModalOpen(false)
//   }

//   return (
//     <div className="min-h-screen">
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

//       <div className="container mx-auto px-6">
//         <GenericTable
//           data={programasData}
//           columns={columns}
//           onShow={verPrograma}
//           title=""
//           showActions={{ show: true }}
//         />
//       </div>

//       {/* Programa Detalle Modal - Mantenido del original pero con mejor espaciado */}
//       {showProgramaDetalle && programaSeleccionado && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
//             <div className="p-6">
//               <div className="flex flex-col md:flex-row gap-6 mb-6">
//                 <div className="flex-1">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <div className="text-sm text-[#627b87]">Nombre:</div>
//                       <div className="font-medium">{programaSeleccionado.name}</div>
//                     </div>
//                     <div>
//                       <div className="text-sm text-[#627b87]">Tipo:</div>
//                       <div className="font-medium">{programaSeleccionado.tipo}</div>
//                     </div>
//                     <div>
//                       <div className="text-sm text-[#627b87]">estado:</div>
//                       <div className="font-medium">
//                         <span className="px-2 py-1 rounded text-xs bg-[#e6f7f0] text-[#46ae69]">
//                           {programaSeleccionado.status}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex flex-col gap-2">
//                   <div>
//                     <div className="text-sm text-[#627b87]">Cantidad de Niveles:</div>
//                     <div className="font-medium">{programaSeleccionado.levels}</div>
//                   </div>
//                   <div>
//                     <div className="text-sm text-[#627b87]">Codigo del programa:</div>
//                     <div className="font-medium">{programaSeleccionado.code}</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="mb-4">
//                 <div className="text-sm font-medium text-[#627b87] mb-2">Fichas asociados al programa:</div>
//                 <div className="overflow-x-auto">
//                   <table className="min-w-full divide-y divide-[#eaeaea]">
//                     <thead className="bg-white">
//                       <tr>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
//                           Ficha
//                         </th>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
//                           Instructor
//                         </th>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
//                           N. Aprendices
//                         </th>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
//                           Estado
//                         </th>
//                         <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
//                           Acciones
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-[#eaeaea]">
//                       {programaSeleccionado.niveles.map((nivel, index) => (
//                         <tr key={index}>
//                           <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">{nivel.nombre}</td>
//                           <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">{nivel.instructor}</td>
//                           <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">{nivel.aprendices}</td>
//                           <td className="px-4 py-2 whitespace-nowrap text-sm">
//                             <span
//                               className={`px-2 py-1 rounded-full text-xs font-medium ${
//                                 nivel.estado === "En formación"
//                                   ? "bg-green-100 text-green-800"
//                                   : nivel.estado === "Terminado"
//                                     ? "bg-blue-100 text-blue-800"
//                                     : "bg-yellow-100 text-yellow-800"
//                               }`}
//                             >
//                               {nivel.estado}
//                             </span>
//                           </td>
//                           <td className="px-4 py-2 whitespace-nowrap text-sm">
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
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               <div className="mt-6 flex justify-end">
//                 <button
//                   className="bg-[#f44144] text-white text-sm py-2 px-2 rounded-lg  font-medium hover:bg-red-600 transition-colors"
//                   onClick={() => setShowProgramaDetalle(false)}
//                 >
//                   Cerrar
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Estudiantes Modal - Versión mejorada */}
//       {showEstudiantesModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-4 max-h-[90vh] overflow-auto">
//             <div className="p-4">
//               <h2 className="text-xl font-bold text-center text-[#1f384c] mb-4">
//                 Listado de Estudiantes - {currentNivel?.nombre || ""}
//               </h2>

//               <div className="mb-4 overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200 text-sm">
//                   <thead className="bg-white">
//                     <tr className="border-b">
//                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
//                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">T.Documento</th>
//                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Número</th>
//                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Estado</th>
//                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
//                         {currentNivel?.nombre || ""}
//                       </th>
//                       <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Ranking</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     {currentNivel?.estudiantes?.map((estudiante, index) => (
//                       <tr key={index}>
//                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.nombre}</td>
//                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.documento}</td>
//                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.numero}</td>
//                         <td className="px-3 py-2 whitespace-nowrap">
//                           <span
//                             className={`px-2 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
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
//                         <td className="px-3 py-2 whitespace-nowrap text-sm">
//                           <span
//                             className={`px-2 py-0.5 rounded-full text-xs font-medium ${
//                               estudiante.calificacion === "Aprobado"
//                                 ? "bg-green-100 text-green-800"
//                                 : "bg-red-100 text-red-800"
//                             }`}
//                           >
//                             {estudiante.calificacion}
//                           </span>
//                         </td>
//                         <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.ranking}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="flex justify-center">
//                 <button
//                   className="bg-[#f44144] text-white px-4 py-1.5 rounded-lg text-sm"
//                   onClick={() => {
//                     setShowEstudiantesModal(false)
//                     setShowProgramaDetalle(true)
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
//       <ProgramDetailModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} program={selectedProgram} />
//     </div>
//   )
// }
"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import GenericTable from "../../../shared/components/Table"
import { useAuth } from "../../auth/hooks/useAuth"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"
import ProgramDetailModal from "./ProgramDetailModal"
import Tooltip from "../../../shared/components/Tooltip"

// Datos de ejemplo
const programasData = [
  { nombre: "Desarrollo de Software", tipo: "Técnico", codigo: "332", cantidadNiveles: 3, estado: "En formación" },
  // { nombre: "Desarrollo de Software", tipo: "Tecnólogo", codigo: "001", cantidadNiveles: 6, estado: "cerrado" },
  { nombre: "Telecomunicaciones", tipo: "Técnico", codigo: "002", cantidadNiveles: 3, estado: "En formación" },
  { nombre: "Telecomunicaciones", tipo: "Tecnólogo", codigo: "003", cantidadNiveles: 6, estado: "En formación" },
  { nombre: "Gestión Empresarial", tipo: "Técnico", codigo: "901", cantidadNiveles: 3, estado: "En formación" },
  // { nombre: "Gestión Empresarial", tipo: "Tecnólogo", codigo: "109", cantidadNiveles: 6, estado: "cerrado" },
  // { nombre: "Diseño Gráfico", tipo: "Tecnólogo", codigo: "989", cantidadNiveles: 6, estado: "cerrado" },
]

const columns = [
  { key: "nombre", label: "Nombre" },
  { key: "tipo", label: "Tipo" },
  { key: "codigo", label: "Código del Programa" },
  { key: "cantidadNiveles", label: "Cantidad de Niveles" },
  {
    key: "estado",
    label: "Estado",
    render: (item) => (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.estado === "En formación" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
        }`}
      >
        {item.estado}
      </span>
    ),
  },
]

export default function Programs() {
  const [showProgramaDetalle, setShowProgramaDetalle] = useState(false)
  const [showEstudiantesModal, setShowEstudiantesModal] = useState(false)
  const [programaSeleccionado, setProgramaSeleccionado] = useState(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  const [selectedProgram, setSelectedProgram] = useState(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const [currentNivel, setCurrentNivel] = useState(null)

  // Add click outside handler
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

  const verEstudiantes = (nivel) => {
    setCurrentNivel(nivel)
    setShowProgramaDetalle(false)
    setShowEstudiantesModal(true)
  }

  const verPrograma = (programa) => {
    // Crear datos de estudiantes para cada nivel
    const generarEstudiantes = (nivel, cantidad) => {
      return Array.from({ length: cantidad }, (_, i) => ({
        nombre: `Estudiante ${i + 1} - ${nivel}`,
        documento: Math.random() > 0.5 ? "C.C" : "T.I",
        numero: Math.floor(1000000 + Math.random() * 9000000).toString(),
        estado: ["activo", "retirado", "completado", "cancelado"][Math.floor(Math.random() * 4)],
        calificacion: Math.random() > 0.4 ? "Aprobado" : "No aprobado",
        ranking: Math.floor(Math.random() * 1000).toString(),
      }))
    }

    // Generar niveles con sus estudiantes
    const niveles = Array.from({ length: programa.cantidadNiveles }, (_, i) => ({
      id: i + 1,
      nombre: ` ${2000000 + i * 100000 + Math.floor(Math.random() * 100000)}`,
      instructor: ["Yaritza Ortiz", "Carlos Pérez", "María López", "Juan Rodríguez"][i % 4],
      aprendices: 10 + Math.floor(Math.random() * 20),
      estado: i === 0 ? "En formación" : i === programa.cantidadNiveles - 1 ? "No iniciado" : "Terminado",
    }))

    // Asignar estudiantes a cada nivel
    niveles.forEach((nivel) => {
      nivel.estudiantes = generarEstudiantes(nivel.nombre, nivel.aprendices)
    })

    // Crear un objeto con la estructura que espera el modal
    const programaConNiveles = {
      ...programa,
      name: programa.nombre,
      description: `Descripción del programa ${programa.nombre}`,
      duration: `${programa.cantidadNiveles} niveles`,
      status: programa.estado,
      code: programa.codigo,
      type: programa.tipo,
      levels: programa.cantidadNiveles,
      niveles: niveles,
    }

    setProgramaSeleccionado(programaConNiveles)
    setShowProgramaDetalle(true)
  }

  const handleOpenDetailModal = (program) => {
    setSelectedProgram(program)
    setIsDetailModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setSelectedProgram(null)
    setIsDetailModalOpen(false)
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">PROGRAMAS</h1>
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
          data={programasData}
          columns={columns}
          onShow={verPrograma}
          title=""
          showActions={{ show: true }}
        />
      </div>

      {/* Programa Detalle Modal - Mantenido del original pero con mejor espaciado */}
      {showProgramaDetalle && programaSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-[#627b87]">Nombre:</div>
                      <div className="font-medium">{programaSeleccionado.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#627b87]">Tipo:</div>
                      <div className="font-medium">{programaSeleccionado.tipo}</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#627b87]">estado:</div>
                      <div className="font-medium">
                        <span className="px-2 py-1 rounded text-xs bg-[#e6f7f0] text-[#46ae69]">
                          {programaSeleccionado.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div>
                    <div className="text-sm text-[#627b87]">Cantidad de Niveles:</div>
                    <div className="font-medium">{programaSeleccionado.levels}</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#627b87]">Codigo del programa:</div>
                    <div className="font-medium">{programaSeleccionado.code}</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-[#627b87] mb-2">Fichas asociadas al programa:</div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[#eaeaea]">
                    <thead className="bg-white">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                          Fichas
                        </th>
                        {/* <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                          Instructor
                        </th> */}
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                          N. Aprendices
                        </th>
                        {/* <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                          Estado
                        </th> */}
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#eaeaea]">
                      {programaSeleccionado.niveles.map((nivel, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">{nivel.nombre}</td>
                          {/* <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">{nivel.instructor}</td> */}
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">{nivel.aprendices}</td>
                          {/* <td className="px-4 py-2 whitespace-nowrap text-sm">
                             <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                nivel.estado === "En formación"
                                  ? "bg-green-100 text-green-800"
                                  : nivel.estado === "Terminado"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {nivel.estado}
                            </span> 
                          </td> */}
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            <Tooltip text="Ver Aprendices" position="top">
                              <button
                                className="bg-[#1f384c] text-white rounded-lg p-1.5"
                                onClick={() => verEstudiantes(nivel)}
                              >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              </button>
                            </Tooltip>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="bg-[#f44144] text-white text-sm py-2 px-2 rounded-lg  font-medium hover:bg-red-600 transition-colors"
                  onClick={() => setShowProgramaDetalle(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estudiantes Modal - Versión mejorada */}
      {showEstudiantesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl mx-4 max-h-[90vh] overflow-auto">
            <div className="p-4">
              <h2 className="text-xl font-bold text-center text-[#1f384c] mb-4">
                Listado de Estudiantes - {currentNivel?.nombre || ""}
              </h2>

              <div className="mb-4 overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-white">
                    <tr className="border-b">
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Nombre</th>
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">T.Documento</th>
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Número</th>
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Estado</th>
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">
                        {currentNivel?.nombre || ""}
                      </th>
                      <th className="px-3 py-2 text-left text-sm font-medium text-gray-700">Ranking</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentNivel?.estudiantes?.map((estudiante, index) => (
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
                        <td className="px-3 py-2 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                              estudiante.calificacion === "Aprobado"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {estudiante.calificacion}
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">{estudiante.ranking}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-center">
                <button
                  className="bg-[#f44144] text-white px-4 py-1.5 rounded-lg text-sm"
                  onClick={() => {
                    setShowEstudiantesModal(false)
                    setShowProgramaDetalle(true)
                  }}
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
      <ProgramDetailModal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal} program={selectedProgram} />
    </div>
  )
}
