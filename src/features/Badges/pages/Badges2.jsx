"use client"

import { useState } from "react"
import { Search, Upload, X, ChevronDown } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Badges = () => {
  // Hook de navegación de React Router
  const navigate = useNavigate()

  // Estado para controlar la vista (formulario o lista)
  const [view, setView] = useState("list") // "list" o "form"
  const [showEditConfirm, setShowEditConfirm] = useState(false)

  // Estado para los campos del formulario
  const [badgeName, setBadgeName] = useState("")
  const [points, setPoints] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState(null)
  const [filePreview, setFilePreview] = useState(null)
  const [fileSize, setFileSize] = useState(null)

  // Estado para almacenar las insignias creadas
  const [badges, setBadges] = useState([
    {
      id: 1,
      name: "Insignia Experto",
      points: 5000,
      description:
        "¡El máximo reconocimiento! Otorgado al reunir 5,000 puntos. ¡Felicidades por ser un experto indiscutible!",
      color: "#ff5a87",
      image: "/public/experto.png",
    },
    {
      id: 2,
      name: "Insignia Intermedio",
      points: 3000,
      description: "¡Excelente progreso! Has alcanzado 3,000 puntos. Representa un nivel avanzado de logros.",
      color: "#9747ff",
      image: "/public/intermedia.png",
    },
    {
      id: 3,
      name: "Insignia Principiante",
      points: 1000,
      description: "Se obtiene al alcanzar 1,000 puntos en tu progreso. ¡Es el primer paso para destacar!",
      color: "#ffcc33",
      image: "/public/principiante.png",
    },
  ])

  // Función para manejar el cambio de archivo
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setFilePreview(URL.createObjectURL(selectedFile))
      setFileSize((selectedFile.size / (1024 * 1024)).toFixed(1))
    }
  }

  // Función para eliminar el archivo
  const removeFile = () => {
    setFile(null)
    setFilePreview(null)
    setFileSize(null)
  }

  // Función para generar un color aleatorio para la insignia
  const getRandomColor = () => {
    const colors = ["#ff5a87", "#9747ff", "#ffcc33", "#33cc99", "#3399ff"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault()

    // Crear nueva insignia
    const newBadge = {
      id: Date.now(),
      name: badgeName,
      points: Number(points),
      description: description,
      color: getRandomColor(),
      image: filePreview || "/placeholder.svg?height=60&width=60",
    }

    // Añadir la nueva insignia al array
    setBadges([...badges, newBadge])

    // Resetear el formulario
    setBadgeName("")
    setPoints("")
    setDescription("")
    setFile(null)
    setFilePreview(null)
    setFileSize(null)

    // Cambiar a la vista de lista
    setView("list")
  }

  // Función para navegar a la página de edición de insignias
  const handleEditClick = () => {
    setShowEditConfirm(true)
  }

  const handleEditConfirm = () => {
    setShowEditConfirm(false)
    navigate("/programacion/insigneas3")
  }

  // Remove or comment out the old handleEditBadges function since we're not using it anymore
  // const handleEditBadges = () => {
  //   navigate("/programacion/insigneas3")
  // }

  // Renderizar la vista de lista de insignias
  const renderBadgesList = () => {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white py-3 px-4 sm:px-6 border-b border-[#d6dade] shadow-sm">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1f384c]">INSIGNIAS</h1>
            <button
              onClick={handleEditClick}
              className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
            >
              Editar insignias
            </button>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
          <div className="grid gap-6">
            {badges.map((badge) => (
              <div key={badge.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white rounded-lg p-6 shadow-sm">
                <div className="w-16 h-16 flex-shrink-0">
                  <img
                    src={badge.image}
                    alt={badge.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <h3 className="font-semibold text-[#1f384c] text-lg mb-2">{badge.name}</h3>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: badge.color }}>
                    <p className="text-white text-sm">{badge.description}</p>
                  </div>
                </div>
                <div className="text-3xl font-bold sm:ml-4" style={{ color: badge.color }}>
                  {badge.points.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Edit Confirmation Modal */}
        {showEditConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 transform transition-all">
              <div className="p-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-[#1f384c]">
                    Editar Insignias
                  </h3>
                  <p className="mt-2 text-[#627b87]">
                    ¿Está seguro de que desea editar las insignias?
                  </p>
                </div>
                
                <div className="flex justify-center gap-3">
                  <button
                    className="px-6 py-2.5 border border-[#d9d9d9] rounded-lg text-[#627b87] hover:bg-gray-50 font-medium transition-colors"
                    onClick={() => setShowEditConfirm(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors"
                    onClick={handleEditConfirm}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderBadgeForm = () => {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="bg-white py-3 px-4 sm:px-6 border-b border-[#d6dade] shadow-sm">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-[#1f384c]">CREAR INSIGNIAS</h1>
            <div className="flex items-center gap-2 text-[#1f384c] font-medium">
              <span>Administrador</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 sm:px-6 py-6 max-w-7xl">
          <div className="max-w-3xl mx-auto bg-white rounded-lg p-6 sm:p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form fields remain the same but with adjusted spacing */}
              {/* ... existing form fields ... */}

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className="bg-[#ee4848] text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors font-medium w-full sm:w-1/2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#0ead69] text-white py-3 px-6 rounded-md hover:bg-opacity-90 transition-colors font-medium w-full sm:w-1/2"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // Renderizar la vista correspondiente
  return view === "list" ? renderBadgesList() : renderBadgeForm()
}

export default Badges

