import { useState, useRef, useEffect } from 'react'
import { ChevronDown, ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import GenericTable from '../../../shared/components/Table'
import { useAuth } from '../../auth/hooks/useAuth'
import ConfirmationModal from '../../../shared/components/ConfirmationModal'

const FeedbackDetails = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { id } = useParams()
  const dropdownRef = useRef(null)
  
  // Sample student data for the feedback
  const studentData = [
    { id: 1, aprendiz: 'Lucía', estado: 'Aprobado' },
    { id: 2, aprendiz: 'Valeria', estado: 'No Aprobado' },
    { id: 3, aprendiz: 'Sebastian', estado: 'Aprobado' },
    { id: 4, aprendiz: 'Mateo', estado: 'No Aprobado' },
    { id: 5, aprendiz: 'Andrea', estado: 'Aprobado' },
    { id: 6, aprendiz: 'Camilo', estado: 'No Aprobado' },
    { id: 7, aprendiz: 'Diego', estado: 'Aprobado' },
  ]
  
  // Define columns for the table
  const columns = [
    { key: 'aprendiz', label: 'Aprendiz', width: '50%' },
    { key: 'estado', label: 'Estado', width: '40%', 
      render: (item) => (
        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
          item.estado === 'Aprobado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {item.estado}
        </span>
      )
    },
  ]
  
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
  
  const handleGoBack = () => {
    navigate("/progreso/retroalimentacion")
  }
  
  // Handle actions
  const handleShow = (item) => {
    console.log('Ver detalles del estudiante:', item)
  }
  
  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <button 
              onClick={handleGoBack}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5 text-[#1f384c]" />
            </button>
            <h1 className="text-xl font-bold text-[#1f384c]">Detalles de Retroalimentación</h1>
          </div>
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
        {/* Students table */}
        <div>
          <h2 className="text-lg font-semibold text-[#1f384c] mb-4">Resultados por Aprendiz</h2>
          <GenericTable 
            data={studentData}
            columns={columns}
            onShow={handleShow}
            defaultItemsPerPage={itemsPerPage}
            showActions={{ show: true, edit: false, delete: false, add: false }}
            tooltipText="Ver detalle del aprendiz"
          />
        </div>
      </div>

      {/* Modal de confirmación para cerrar sesión */}
      <ConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Cerrar Sesión"
        message="¿Está seguro de que desea cerrar la sesión actual?"
        confirmButtonText="Cerrar Sesión"
        confirmButtonClass="bg-[#f44144] hover:bg-red-600"
      />
    </div>
  )
}

export default FeedbackDetails