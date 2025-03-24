import React from "react";
import { FiSearch, FiEdit, FiTrash, FiChevronLeft, FiChevronRight, FiEye } from "react-icons/fi";
import { MdAddCircleOutline } from "react-icons/md";
import Tooltip from "../components/Tooltip"; // Importa el componente Tooltip

const GenericTable = ({
  data = [],
  onAdd,
  onShow,
  onEdit,
  onDelete,
  title = "TABLA",
  defaultItemsPerPage = 10,
  columns = [],
  showActions = { show: false, edit: true, delete: true, add: true },
  tooltipText = "Ver detalle", // Texto personalizado para el tooltip
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(defaultItemsPerPage);

  const filteredData = data.filter((item) =>
    columns.some((column) =>
      String(item[column.key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white rounded-[10px] shadow-sm p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-100">
          <input
            type="text"
            placeholder="Buscar..."
            className="w-full pl-3 pr-10 py-1 border border-gray-200 rounded-[10px] focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        {showActions.delete && (
          <button
            onClick={onAdd}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-[10px] hover:bg-green-600 transition-colors"
          >
            <MdAddCircleOutline size={20} />
            Añadir
          </button>
        )}
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
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Acciones</th>
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
                <td className="px-4 py-3 border-b border-gray-200">
                  <div className="flex items-center gap-2 justify-center">
                    {showActions.show && (
                      <Tooltip text={tooltipText} position="top">
                        <button
                          onClick={() => onShow(item)}
                          className="p-2 text-white rounded-[10px] transition-colors flex items-center justify-center"
                          style={{ backgroundColor: '#1F384C' }}
                          aria-label="Detalle"
                        >
                          <FiEye size={16} />
                        </button>
                      </Tooltip>
                    )}
                    {showActions.edit && (
                      <Tooltip text="Editar" position="top">
                        <button
                          onClick={() => onEdit(item)}
                          className="p-2 bg-yellow-500 text-white rounded-[10px] hover:bg-yellow-600 transition-colors flex items-center justify-center"
                          aria-label="Editar"
                        >
                          <FiEdit size={16} />
                        </button>
                      </Tooltip>
                    )}
                    {showActions.delete && (
                      <Tooltip text="Eliminar" position="top">
                        <button
                          onClick={() => onDelete(item.id)}
                          className="p-2 bg-red-500 text-white rounded-[10px] hover:bg-red-600 transition-colors flex items-center justify-center"
                          aria-label="Eliminar"
                        >
                          <FiTrash size={16} />
                        </button>
                      </Tooltip>
                    )}
                  </div>
                </td>
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
  );
};

export default GenericTable;