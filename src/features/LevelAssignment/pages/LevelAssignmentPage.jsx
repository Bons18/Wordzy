"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"

// Hooks personalizados
import { useFichaSearch } from "../hooks/useFichaSearch"
import { useRecentFichas } from "../hooks/useRecentFichas"
import { useLevelManagement } from "../hooks/useLevelManagement"

// Componentes
import SearchView from "../components/SearchView"
import LevelsView from "../components/LevelsView"

// Mock data
import { MOCK_FICHAS } from "../utils/mockData"

const LevelAssignmentPage = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()
  const dropdownRef = useRef(null)

  // Estados locales
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [currentView, setCurrentView] = useState("search")
  const [selectedFicha, setSelectedFicha] = useState(null)

  // Estados para modales
  const [showSaveConfirm, setShowSaveConfirm] = useState(false)
  const [showChangeConfirm, setShowChangeConfirm] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [pendingFichaChange, setPendingFichaChange] = useState(null)

  // Hooks personalizados
  const {
    searchTerm,
    searchResults,
    showSearchResults,
    isLoading: isSearchLoading,
    handleSearchInputChange,
    clearSearch,
    setShowSearchResults,
  } = useFichaSearch()

  const { recentFichas, addRecentFicha, clearRecentFichas } = useRecentFichas()

  const {
    currentLevelStates,
    tempLevelStates,
    hasChanges,
    isSaving,
    handleLevelToggle,
    handleQuickAction,
    saveLevels,
    resetChanges,
  } = useLevelManagement(selectedFicha)

  // Effect para cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Handlers
  const handleLogoutClick = () => {
    setIsDropdownOpen(false)
    setShowLogoutConfirm(true)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const handleSelectFicha = (ficha) => {
    // Si hay cambios sin guardar, mostrar confirmación
    if (hasChanges) {
      setPendingFichaChange(ficha)
      setShowChangeConfirm(true)
      return
    }

    proceedWithFichaChange(ficha)
  }

  const proceedWithFichaChange = (ficha) => {
    // Si la ficha viene de recientes, buscar los datos completos
    let fullFicha = ficha
    if (!ficha.programa || !ficha.instructor) {
      fullFicha = MOCK_FICHAS.find((f) => f.id === ficha.id) || ficha
    }

    setSelectedFicha(fullFicha)
    setCurrentView("levels")
    clearSearch()
    addRecentFicha(fullFicha)
  }

  const handleSaveChanges = () => {
    setShowSaveConfirm(true)
  }

  const confirmSaveChanges = async () => {
    const result = await saveLevels()
    setShowSaveConfirm(false)
    setSuccessMessage(result.message)
    setShowSuccessModal(true)
  }

  const handleChangeFicha = () => {
    if (hasChanges) {
      setShowChangeConfirm(true)
      return
    }
    proceedWithViewChange()
  }

  const proceedWithViewChange = () => {
    setCurrentView("search")
    setSelectedFicha(null)
    clearSearch()
    resetChanges()
  }

  const confirmChangeWithoutSaving = () => {
    if (pendingFichaChange) {
      proceedWithFichaChange(pendingFichaChange)
      setPendingFichaChange(null)
    } else {
      proceedWithViewChange()
    }
    setShowChangeConfirm(false)
  }

  // Render del header
  const renderHeader = () => (
    <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#1f384c]">Asignación de Niveles</h1>
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
  )

  // Render principal
  return (
    <>
      {renderHeader()}

      {currentView === "search" && (
        <SearchView
          searchTerm={searchTerm}
          searchResults={searchResults}
          showSearchResults={showSearchResults}
          isSearchLoading={isSearchLoading}
          recentFichas={recentFichas}
          onSearchChange={handleSearchInputChange}
          onSelectFicha={handleSelectFicha}
          onClearRecentFichas={clearRecentFichas}
          setShowSearchResults={setShowSearchResults}
        />
      )}

      {currentView === "levels" && selectedFicha && (
        <LevelsView
          selectedFicha={selectedFicha}
          currentLevelStates={currentLevelStates}
          tempLevelStates={tempLevelStates}
          hasChanges={hasChanges}
          onLevelToggle={handleLevelToggle}
          onQuickAction={handleQuickAction}
          onSaveChanges={handleSaveChanges}
          onChangeFicha={handleChangeFicha}
          isSaving={isSaving}
        />
      )}

      {/* Modales */}
      <ConfirmationModal
        isOpen={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
        title="Cerrar Sesión"
        message="¿Está seguro de que desea cerrar la sesión actual?"
        confirmText="Cerrar Sesión"
        confirmColor="bg-[#f44144] hover:bg-red-600"
      />

      <ConfirmationModal
        isOpen={showSaveConfirm}
        onClose={() => setShowSaveConfirm(false)}
        onConfirm={confirmSaveChanges}
        title="Confirmar Cambios"
        message={`¿Estás seguro que deseas guardar los cambios de niveles para la ficha ${selectedFicha?.codigo}?`}
        confirmText={isSaving ? "Guardando..." : "Guardar"}
        confirmColor="bg-green-500 hover:bg-green-600"
        isLoading={isSaving}
      />

      <ConfirmationModal
        isOpen={showChangeConfirm}
        onClose={() => {
          setShowChangeConfirm(false)
          setPendingFichaChange(null)
        }}
        onConfirm={confirmChangeWithoutSaving}
        title="Cambios sin Guardar"
        message="Tienes cambios sin guardar. ¿Deseas continuar sin guardar los cambios?"
        confirmText="Continuar sin Guardar"
        confirmColor="bg-red-500 hover:bg-red-600"
      />

      <ConfirmationModal
        isOpen={showSuccessModal}
        onConfirm={() => setShowSuccessModal(false)}
        title={successMessage.includes("Error") ? "Error" : "Operación Exitosa"}
        message={successMessage}
        confirmText="Aceptar"
        confirmColor={
          successMessage.includes("Error") ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
        }
        showButtonCancel={false}
      />
    </>
  )
}

export default LevelAssignmentPage
