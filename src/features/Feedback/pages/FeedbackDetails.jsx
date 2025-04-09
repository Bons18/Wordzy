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
  const [showQuestionsModal, setShowQuestionsModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { id } = useParams()
  const dropdownRef = useRef(null)
  
  // Sample student data for the feedback
  const studentData = [
    { id: 1, aprendiz: 'Lucía', ficha: '2453267', estado: 'Aprobado', hora: '10:00', calificacion: '90%' },
    { id: 2, aprendiz: 'Valeria', ficha: '2453267', estado: 'No Aprobado', hora: '10:15', calificacion: '45%' },
    { id: 3, aprendiz: 'Sebastian', ficha: '2453268', estado: 'Aprobado', hora: '10:30', calificacion: '85%' },
    { id: 4, aprendiz: 'Mateo', ficha: '2453268', estado: 'No Aprobado', hora: '10:45', calificacion: '40%' },
    { id: 5, aprendiz: 'Andrea', ficha: '2453269', estado: 'Aprobado', hora: '11:00', calificacion: '95%' },
    { id: 6, aprendiz: 'Camilo', ficha: '2453269', estado: 'No Aprobado', hora: '11:15', calificacion: '30%' },
    { id: 7, aprendiz: 'Diego', ficha: '2453270', estado: 'Aprobado', hora: '11:30', calificacion: '88%' },
  ]
  
  // Sample questions data
  const questionsData = [
    { id: 1, pregunta: 'Are you a student?', fecha: '2023-10-15' },
    { id: 2, pregunta: 'Do you like English?', fecha: '2023-10-15' },
    { id: 3, pregunta: 'Can you swim?', fecha: '2023-10-15' },
    { id: 4, pregunta: 'Is your favorite color blue?', fecha: '2023-10-15' },
    { id: 6, pregunta: 'Do you have a pet?', fecha: '2023-10-15' },
    { id: 7, pregunta: 'Are you from Spain?', fecha: '2023-10-15' },
    { id: 8, pregunta: 'Did you study yesterday?', fecha: '2023-10-15' },
  ]
  
  // Define columns for the table
  const columns = [
    { key: 'aprendiz', label: 'Aprendiz', width: '25%' },
    { key: 'ficha', label: 'Ficha', width: '15%' },
    { key: 'hora', label: 'Hora', width: '15%' },
    { key: 'estado', label: 'Estado', width: '20%', 
      render: (item) => (
        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
          item.estado === 'Aprobado' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {item.estado}
        </span>
      )
    },
    { key: 'calificacion', label: 'Calificación', width: '25%' },
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
    setSelectedStudent(item)
    setShowQuestionsModal(true)
  }
  
  // First, add the state for the question details modal
  const [showQuestionDetailsModal, setShowQuestionDetailsModal] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  
  // Add the handler function for viewing question details
  const handleViewQuestionDetails = (question) => {
    setSelectedQuestion(question)
    setShowQuestionDetailsModal(true)
  }
  
  // Then add the modal component at the end of the file, before the closing div
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

      {/* Modal para mostrar las preguntas */}
      {showQuestionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-auto">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-[#1f384c]">
                  Preguntas para {selectedStudent?.aprendiz}
                </h2>
                <button 
                  onClick={() => setShowQuestionsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preguntas Totales
                      </th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th scope="col" className="px-4 py-2 text-center text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {questionsData.map((question, index) => (
                      <tr key={question.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {index + 1}. {question.pregunta}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {question.fecha}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <div className="flex justify-center items-center">
                            <button 
                              className="p-1 bg-[#1f384c] rounded-[8px] hover:bg-[#2a4a64] text-white transition-colors w-7 h-7 flex items-center justify-center"
                              onClick={() => handleViewQuestionDetails(question)}
                              title="Ver detalles"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="flex items-center justify-between mt-3 text-xs text-gray-700">
                <div>7 por página</div>
                <div className="flex items-center">
                  <span>1 de 1 páginas</span>
                  <button className="ml-2 px-2 py-1 rounded border border-gray-300 disabled:opacity-50">
                    &lt;
                  </button>
                  <button className="ml-2 px-2 py-1 rounded border border-gray-300 disabled:opacity-50">
                    &gt;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para mostrar detalles de la pregunta */}
      {showQuestionDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] overflow-auto">
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-[#1f384c]">
                  Detalles
                </h2>
                <button 
                  onClick={() => setShowQuestionDetailsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <hr className="my-3 border-gray-200" />
              
              <div className="space-y-5">
                {/* Nombre de la Actividad */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de la Actividad
                  </label>
                  <input 
                    type="text" 
                    value="Daily Routine" 
                    disabled 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                  />
                </div>
                
                {/* Pregunta */}
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-3">
                    {selectedQuestion?.pregunta || "Are you a student?"}
                  </h3>
                  
                  {/* Opciones */}
                  <div className="space-y-3">
                    {(selectedQuestion?.options || [
                      { text: 'Yes, I am.', isSelected: false, isCorrect: true, explanation: 'Correcta' },
                      { text: 'Yes, I is.', isSelected: true, isCorrect: false, explanation: 'Incorrecta' },
                      { text: 'No, I\'m not.', isSelected: false, isCorrect: true, explanation: 'Correcta' },
                      { text: 'Yes, I am a student.', isSelected: false, isCorrect: true, explanation: 'Correcta' }
                    ]).map((option, index) => (
                      <div key={index} className="flex items-center justify-between border border-gray-200 rounded-md px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center justify-center h-6 w-6 rounded-full flex-shrink-0 ${option.isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {option.isCorrect ? '✅' : '❌'}
                          </span>
                          <span className="text-sm text-gray-700">
                            {option.text} <span className="text-gray-500">→ {option.explanation}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Retroalimentación */}
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-2">
                    Retroalimentacion
                  </h3>
                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-md text-sm text-gray-700">
                  {selectedQuestion?.feedback || "Error: \"Yes, I is\" → en inglés, con el pronombre \"I\" se debe usar \"am\" y no \"is\". La forma correcta sería: \"Yes, I am.\""}
                  </div>
                </div>
                
                {/* Línea divisoria */}
                <hr className="my-2 border-gray-200" />
                
                {/* Puntos */}
                <div className="flex justify-end">
                  <div className="text-base font-medium text-gray-900">
                    Puntos: <span className="font-bold bg-gray-100 px-3 py-1 rounded-md">{selectedQuestion?.points || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default FeedbackDetails