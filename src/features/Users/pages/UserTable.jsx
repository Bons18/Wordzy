"use client"

import { useState } from "react"
import { FiSearch, FiChevronLeft, FiChevronRight } from "react-icons/fi"

/**
 * Componente de tabla específico para usuarios, basado en GenericTable pero sin columna de acciones
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.data - Array de objetos con la información de los elementos
 * @param {string} props.title - Título de la tabla (opcional)
 * @param {number} props.defaultItemsPerPage - Número de elementos por página por defecto (opcional)
 * @param {Array} props.columns - Array de objetos con la configuración de las columnas
 * @returns {JSX.Element} Componente UserTable
 */
const UserTable = ({ data = [], title = "TABLA", defaultItemsPerPage = 10, columns = [] }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(defaultItemsPerPage)

  // Filtrar datos basados en el término de búsqueda
  const filteredData = data.filter((item) =>
    columns.some((column) => String(item[column.key]).toLowerCase().includes(searchTerm.toLowerCase())),
  )

  // Calcular paginación
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-100">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-3 pr-10 py-1 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm text-center border-b border-gray-200 text-gray-700">
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center text-sm text-gray-600">
        <div>{itemsPerPage} por página</div>

        <div className="flex items-center gap-4">
          <span>
            {currentPage} de {totalPages || 1} páginas
          </span>

          <div className="flex gap-1">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-100 disabled:cursor-not-allowed"
              aria-label="Página anterior"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={() => handlePageChange(Math.min(totalPages || 1, currentPage + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-100 disabled:cursor-not-allowed"
              aria-label="Página siguiente"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserTable

