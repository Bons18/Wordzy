"use client"

import { useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, Eye, Search } from "lucide-react"

export default function Programs() {
  const [showProgramaDetalle, setShowProgramaDetalle] = useState(false)
  const [showEstudiantesModal, setShowEstudiantesModal] = useState(false)
  const [programaSeleccionado, setProgramaSeleccionado] = useState(null)

  const verPrograma = (programa) => {
    setProgramaSeleccionado(programa)
    setShowProgramaDetalle(true)
  }

  const verEstudiantes = () => {
    setShowProgramaDetalle(false)
    setShowEstudiantesModal(true)
  }

  return (
    <div className="min-h-screen bg-[#f6f6fb] p-6">
      {/* Main Content */}
      <div className="bg-white p-6 rounded-md shadow-sm">
        <div className="flex justify-between mb-6">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-[#1f384c]">PROGRAMAS</h2>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-[#627b87]">Administrador</span>
              <ChevronDown className="h-4 w-4 text-[#627b87]" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full max-w-md pl-10 pr-4 py-2 border border-[#d9d9d9] rounded"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#627b87]" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f6f6fb]">
                <th className="font-medium text-left py-3 px-4 text-[#627b87]">Nombre</th>
                <th className="font-medium text-left py-3 px-4 text-[#627b87]">Tipo</th>
                <th className="font-medium text-center py-3 px-4 text-[#627b87] ">código del Programa</th>
                <th className="font-medium text-center py-3 px-4 text-[#627b87]">Cantidad de Niveles</th>
                <th className="font-medium text-left py-3 px-4 text-[#627b87]">Estado</th>
                <th className="font-medium text-left py-3 px-4 text-[#627b87]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {programasData.map((programa, index) => (
                <tr key={index} className="border-b border-[#d9d9d9]">
                  <td className="py-3 px-4">{programa.nombre}</td>
                  <td className="py-3 px-4 ">{programa.tipo}</td>
                  <td className="py-3 px-4 text-center">{programa.codigo}</td>
                  <td className="py-3 px-4 text-center">{programa.cantidadNiveles}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        programa.estado === "En formación"
                          ? "bg-[#e6f7f0] text-[#46ae69]"
                          : "bg-[#f9e6e6] text-[#c60b0e]"
                      }`}
                    >
                      {programa.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      className="bg-[#1f384c] text-white rounded-full p-1.5"
                      onClick={() => verPrograma(programa)}
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="flex items-center gap-2">
            <span>10</span>
            <span className="text-[#627b87]">por página</span>
          </div>

          <div className="flex items-center gap-2">
            <span>1</span>
            <span className="text-[#627b87]">de 1 páginas</span>
            <button className="p-1 rounded border border-[#d9d9d9]">
              <ChevronLeft className="h-4 w-4 text-[#627b87]" />
            </button>
            <button className="p-1 rounded border border-[#d9d9d9]">
              <ChevronRight className="h-4 w-4 text-[#627b87]" />
            </button>
          </div>
        </div>
      </div>

      {/* Programa Detalle Modal */}
      {showProgramaDetalle && programaSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6 mb-6">
                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-[#627b87]">Nombre:</div>
                      <div className="font-medium">ADSO</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#627b87]">Tipo:</div>
                      <div className="font-medium">Técnico</div>
                    </div>
                    <div>
                      <div className="text-sm text-[#627b87]">estado:</div>
                      <div className="font-medium">
                        <span className="px-2 py-1 rounded text-xs bg-[#e6f7f0] text-[#46ae69]">En formación</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <div>
                    <div className="text-sm text-[#627b87]">Cantidad de Niveles:</div>
                    <div className="font-medium">3</div>
                  </div>
                  <div>
                    <div className="text-sm text-[#627b87]">Codigo del programa:</div>
                    <div className="font-medium">332</div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-sm font-medium text-[#627b87] mb-2">fichas asociadas al programa:</div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-[#eaeaea]">
                    <thead className="bg-[#f6f6fb]">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                          Niveles
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                          Instructor
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                          N. Aprendices
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-[#eaeaea]">
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">nivel 1</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">20</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                          <button className="bg-[#1f384c] text-white rounded-full p-1.5" onClick={verEstudiantes}>
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">nivel 2</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">30</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                          <button className="bg-[#1f384c] text-white rounded-full p-1.5">
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">nivel 3</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">Yaritza Ortiz</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">15</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                          <button className="bg-[#1f384c] text-white rounded-full p-1.5">
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="bg-[#dc3545] text-white px-4 py-2 rounded"
                  onClick={() => setShowProgramaDetalle(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estudiantes Modal */}
      {showEstudiantesModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
            <div className="p-6">
              <h2 className="text-xl font-bold text-[#1f384c] mb-6">Listado de Estudiantes Nivel 1</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#eaeaea]">
                  <thead className="bg-[#f6f6fb]">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                        T.Documento
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                        Numero
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-[#627b87] uppercase tracking-wider">
                        Juicio Evaluativo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-[#eaeaea]">
                    {estudiantesData.map((estudiante, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">{estudiante.nombre}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">{estudiante.documento}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-[#333333]">{estudiante.numero}</td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              estudiante.activo ? "bg-[#e6f7f0] text-[#46ae69]" : "bg-[#f9e6e6] text-[#c60b0e]"
                            }`}
                          >
                            {estudiante.activo ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="px-4 py-2 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              estudiante.aprobado 
                            }`}
                          >
                            {estudiante.aprobado ? "Aprobado" : "No aprobado"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  className="bg-[#dc3545] text-white px-4 py-2 rounded"
                  onClick={() => setShowEstudiantesModal(false)}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Datos de ejemplo
const programasData = [
  { nombre: "Desarrollo de Software", tipo: "Técnico", codigo: "332", cantidadNiveles: 3, estado: "En formación" },
  { nombre: "Desarrollo de Software", tipo: "Tecnólogo", codigo: "001", cantidadNiveles: 6, estado: "cerrado" },
  { nombre: "Telecomunicaciones", tipo: "Técnico", codigo: "002", cantidadNiveles: 3, estado: "En formación" },
  { nombre: "Telecomunicaciones", tipo: "Tecnólogo", codigo: "003", cantidadNiveles: 6, estado: "En formación" },
  { nombre: "Gestión Empresarial", tipo: "Técnico", codigo: "901", cantidadNiveles: 3, estado: "En formación" },
  { nombre: "Gestión Empresarial", tipo: "Tecnólogo", codigo: "109", cantidadNiveles: 6, estado: "cerrado" },
  { nombre: "Diseño Gráfico", tipo: "Tecnólogo", codigo: "989", cantidadNiveles: 6, estado: "cerrado" },
]

const estudiantesData = [
  { nombre: "Andres felip", documento: "C.C", numero: "2382829", activo: true, aprobado: true },
  { nombre: "Daniel an", documento: "C.C", numero: "1092983", activo: true, aprobado: false },
  { nombre: "nivel 3", documento: "C.C", numero: "293923", activo: false, aprobado: false },
  { nombre: "Andres felip", documento: "C.C", numero: "283929", activo: true, aprobado: true },
  { nombre: "nivel 2", documento: "C.C", numero: "292920", activo: true, aprobado: true },
  { nombre: "nivel 3", documento: "T.I", numero: "282882", activo: false, aprobado: false },
  { nombre: "Andres felip", documento: "C.C", numero: "392938", activo: true, aprobado: true },
  { nombre: "nivel 2", documento: "C.C", numero: "3838293", activo: true, aprobado: false },
  { nombre: "nivel 3", documento: "T.I", numero: "3838829", activo: false, aprobado: false },
]

