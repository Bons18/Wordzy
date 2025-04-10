"use client"

import React from "react"
import { FiSearch, FiEdit, FiTrash, FiChevronLeft, FiChevronRight, FiEye, FiDownload } from "react-icons/fi"
import { MdAddCircleOutline } from "react-icons/md"
import Tooltip from "../components/Tooltip"

const GenericTable = ({
  data = [],
  onAdd,
  onShow,
  onEdit,
  onDelete,
  defaultItemsPerPage = 9,
  columns = [],
  showActions = { show: false, edit: true, delete: true, add: true },
  tooltipText = "Ver detalle",
  showSearch = true,
  showPagination = true, // Nueva prop para controlar la visibilidad del paginador
  exportToExcel = { enabled: false, filename: "datos", exportFunction: null }, // Nueva prop para exportar a Excel
}) => {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage] = React.useState(defaultItemsPerPage)

  const filteredData = showSearch
    ? data.filter((item) =>
        columns.some((column) => String(item[column.key]).toLowerCase().includes(searchTerm.toLowerCase())),
      )
    : data

  // Si no hay paginación, mostramos todos los datos
  const currentData = showPagination
    ? filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : filteredData

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const handleExportToExcel = () => {
    if (exportToExcel.exportFunction) {
      exportToExcel.exportFunction(filteredData)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-2">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          {showSearch && (
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-3 pr-8 py-1 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            </div>
          )}

          {exportToExcel.enabled && (
            <button
              onClick={handleExportToExcel}
              className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiDownload size={16} />
              <span>Exportar a Excel</span>
            </button>
          )}
        </div>

        {showActions.add && (
          <button
            onClick={onAdd}
            className="flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-green-600"
          >
            <MdAddCircleOutline size={16} />
            <span>Añadir</span>
          </button>
        )}
      </div>

      <div className="overflow-hidden mb-3">
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-2 py-2 text-left text-sm font-semibold text-gray-600 truncate"
                  style={{ width: column.width || "auto" }}
                >
                  {column.label}
                </th>
              ))}
              {(showActions.show || showActions.edit || showActions.delete) && (
                <th className="px-2 py-2 text-center text-sm font-semibold text-gray-600 w-28">Acciones</th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-2 py-2 text-sm text-left border-b border-gray-200 text-gray-700 truncate"
                    title={column.render ? String(column.render(item)) : String(item[column.key])}
                  >
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
                {(showActions.show || showActions.edit || showActions.delete) && (
                  <td className="px-2 py-2 border-b border-gray-200">
                    <div className="flex items-center gap-2 justify-center">
                      {showActions.show && (
                        <Tooltip text={tooltipText} position="top">
                          <button
                            onClick={() => onShow(item)}
                            className="p-1.5 text-white rounded-lg transition-colors"
                            style={{ backgroundColor: "#1F384C" }}
                            aria-label="Detalle"
                          >
                            <FiEye size={15} />
                          </button>
                        </Tooltip>
                      )}
                      {showActions.edit && (
                        <Tooltip text="Editar" position="top">
                          <button
                            onClick={() => onEdit(item)}
                            className="p-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                            aria-label="Editar"
                          >
                            <FiEdit size={15} />
                          </button>
                        </Tooltip>
                      )}
                      {showActions.delete && (
                        <Tooltip text="Eliminar" position="top">
                          <button
                            onClick={() => onDelete(item.id)}
                            className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            aria-label="Eliminar"
                          >
                            <FiTrash size={15} />
                          </button>
                        </Tooltip>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showPagination && (
        <div className="flex justify-between items-center text-xs text-gray-600">
          <div>{filteredData.length} elementos</div>

          <div className="flex items-center gap-2">
            <span>
              Página {currentPage} de {totalPages || 1}
            </span>

            <div className="flex gap-1">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                aria-label="Página anterior"
              >
                <FiChevronLeft size={14} />
              </button>
              <button
                onClick={() => handlePageChange(Math.min(totalPages || 1, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                aria-label="Página siguiente"
              >
                <FiChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GenericTable
