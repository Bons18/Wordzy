import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import GenericTable from '../../../shared/components/Table'
import { useAuth } from '../../auth/hooks/useAuth'
import ConfirmationModal from '../../../shared/components/ConfirmationModal'

const Feedback = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  
  // Sample feedback data
  const feedbackData = [
    { id: 1, programa: 'ADSO', ficha: '2453267', nivel: 'Nivel 1', tema: 'Daily Routine', actividad: 'Examen', ejecutada: 'Si' },
    { id: 2, programa: 'ADSO', ficha: '2453267', nivel: 'Nivel 1', tema: 'Giving Advice', actividad: 'Actividad', ejecutada: 'Si' },
    { id: 3, programa: 'ADSO', ficha: '2453268', nivel: 'Nivel 1', tema: 'Past Experiences', actividad: 'Examen', ejecutada: 'No' },
    { id: 4, programa: 'ADSO', ficha: '2453268', nivel: 'Nivel 1', tema: 'Future Plans', actividad: 'Actividad', ejecutada: 'Si' },
    { id: 5, programa: 'ADSO', ficha: '2453269', nivel: 'Nivel 1', tema: 'Describing People', actividad: 'Examen', ejecutada: 'No' },
    { id: 6, programa: 'ADSO', ficha: '2453269', nivel: 'Nivel 1', tema: 'Making Comparisons', actividad: 'Actividad', ejecutada: 'Si' },
    { id: 7, programa: 'ADSO', ficha: '2453270', nivel: 'Nivel 1', tema: 'Ordering Food', actividad: 'Examen', ejecutada: 'No' },
  ]
  
  // Define columns for the table
  const columns = [
    { key: 'programa', label: 'Programa', width: '12%' },
    { key: 'ficha', label: 'Ficha', width: '12%' },
    { key: 'nivel', label: 'Nivel', width: '12%' },
    { key: 'tema', label: 'Tema', width: '24%' },
    { key: 'actividad', label: 'Actividad', width: '15%' },
    { key: 'ejecutada', label: 'Ejecutada', width: '15%' },
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
  
  // Handle actions
  const handleShow = (item) => {
    console.log('Ver detalles de:', item)
    navigate('/progreso/retroalimentacion/detalles')
  }
  
  const handleEdit = (item) => {
    console.log('Editar:', item)
  }
  
  const handleDelete = (id) => {
    console.log('Eliminar ID:', id)
  }
  
  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-[#1f384c]">Retroalimentación</h1>
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
          data={feedbackData}
          columns={columns}
          onShow={handleShow}
          onEdit={handleEdit}
          onDelete={handleDelete}
          defaultItemsPerPage={itemsPerPage}
          showActions={{ show: true, edit: false, delete: false, add: false }}
          tooltipText="Ver retroalimentación"
        />
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

export default Feedback
  
  