"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"
import useGetInstructors from "../hooks/useGetInstructors"
import usePutInstructor from "../hooks/usePutInstructor"
import useGetCourses from "../hooks/useGetCourses"
import {
  validateInstructorData,
  processServerError,
  prepareInstructorData,
} from "../services/instructorValidationService"

const EditInstructorPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const { instructors, loading: loadingInstructors } = useGetInstructors()
  const { updateInstructor, loading: updating } = usePutInstructor()
  const { courses, loading: coursesLoading, error: coursesError, hasLoaded, loadCoursesOnDemand } = useGetCourses()

  const [instructor, setInstructor] = useState(null)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    tipoDocumento: "CC",
    telefono: "",
    correo: "",
    fichas: [],
    estado: "Activo",
  })

  const [errors, setErrors] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [initialLoadComplete, setInitialLoadComplete] = useState(false)
  const dropdownRef = useRef(null)

  // Cargar datos del instructor (solo una vez)
  useEffect(() => {
    if (instructors.length > 0 && id && !instructor) {
      const foundInstructor = instructors.find((inst) => inst.id === id || inst._id === id)
      if (foundInstructor) {
        console.log("👤 Instructor encontrado para editar:", foundInstructor)
        console.log("📋 Fichas del instructor:", foundInstructor.fichas)
        setInstructor(foundInstructor)

        // Asegurar que las fichas sean un array de strings/IDs
        const fichasArray = Array.isArray(foundInstructor.fichas)
          ? foundInstructor.fichas.map((ficha) => (typeof ficha === "object" ? ficha._id || ficha.id : ficha))
          : []

        console.log("🔄 Fichas normalizadas:", fichasArray)

        setFormData({
          nombre: foundInstructor.nombre || "",
          apellido: foundInstructor.apellido || "",
          documento: foundInstructor.documento || "",
          tipoDocumento: foundInstructor.tipoDocumento || "CC",
          telefono: foundInstructor.telefono || "",
          correo: foundInstructor.correo || "",
          fichas: fichasArray,
          estado: foundInstructor.estado || "Activo",
        })
      } else {
        console.error("Instructor no encontrado")
        navigate("/formacion/instructores")
      }
    }
  }, [instructors, id, instructor, navigate])

  // Cargar fichas iniciales si el instructor tiene fichas asignadas (solo una vez)
  useEffect(() => {
    const loadInitialCourses = async () => {
      if (instructor && formData.fichas && formData.fichas.length > 0 && !hasLoaded && !initialLoadComplete) {
        console.log("📚 Cargando fichas iniciales para instructor en edición...")
        console.log("🎯 Fichas a mostrar:", formData.fichas)
        try {
          await loadCoursesOnDemand()
          setInitialLoadComplete(true)
          console.log("✅ Fichas iniciales cargadas para edición")
        } catch (error) {
          console.error("❌ Error al cargar fichas iniciales:", error)
          setInitialLoadComplete(true)
        }
      } else if (instructor && (!formData.fichas || formData.fichas.length === 0)) {
        // Si no tiene fichas, marcar como completado
        console.log("📝 Instructor sin fichas asignadas")
        setInitialLoadComplete(true)
      }
    }

    loadInitialCourses()
  }, [instructor, formData.fichas, hasLoaded, initialLoadComplete, loadCoursesOnDemand])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleFichaToggle = (fichaId) => {
    console.log("🔄 Toggling ficha:", fichaId)
    console.log("📋 Fichas actuales:", formData.fichas)

    setFormData((prev) => {
      const currentFichas = prev.fichas || []
      const isSelected = currentFichas.includes(fichaId)

      let newFichas
      if (isSelected) {
        newFichas = currentFichas.filter((id) => id !== fichaId)
        console.log("➖ Removiendo ficha:", fichaId)
      } else {
        newFichas = [...currentFichas, fichaId]
        console.log("➕ Agregando ficha:", fichaId)
      }

      console.log("📋 Nuevas fichas:", newFichas)
      return {
        ...prev,
        fichas: newFichas,
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar formulario (modo edición)
    const validationErrors = await validateInstructorData(formData, true, id)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const instructorData = prepareInstructorData(formData, true)

      await updateInstructor(id, instructorData)
      navigate("/formacion/instructores")
    } catch (error) {
      console.error("Error al actualizar instructor:", error)
      const serverErrors = processServerError(error)
      setErrors(serverErrors)
    }
  }

  const handleCancel = () => {
    navigate("/formacion/instructores")
  }

  const handleLogoutClick = () => {
    setIsDropdownOpen(false)
    setShowLogoutConfirm(true)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  // Manejar cambio en el campo de búsqueda
  const handleSearchChange = async (e) => {
    const value = e.target.value
    setSearchTerm(value)

    // Si el usuario empieza a escribir y no hemos cargado los cursos, cargarlos
    if (value.trim() && !hasLoaded && !coursesLoading) {
      try {
        console.log("🔄 Cargando cursos por búsqueda en edición...")
        await loadCoursesOnDemand()
        console.log("✅ Cursos cargados por búsqueda en edición")
      } catch (error) {
        console.error("❌ Error al cargar cursos por búsqueda:", error)
      }
    }
  }

  // Filtrar fichas basado en el término de búsqueda
  const getDisplayedCourses = () => {
    if (!hasLoaded) return []

    console.log("🔍 Filtrando cursos...")
    console.log("📚 Total cursos cargados:", courses.length)
    console.log("🔍 Término de búsqueda:", searchTerm)
    console.log("📋 Fichas seleccionadas:", formData.fichas)

    // Si no hay término de búsqueda, mostrar solo las fichas seleccionadas
    if (!searchTerm.trim()) {
      const selectedCourses = courses.filter((course) => {
        const courseId = course.id || course._id
        const isSelected = formData.fichas.includes(courseId)
        console.log(`🎯 Curso ${course.code} (${courseId}): ${isSelected ? "SELECCIONADO" : "no seleccionado"}`)
        return isSelected
      })
      console.log("📋 Cursos seleccionados a mostrar:", selectedCourses.length)
      return selectedCourses
    }

    // Si hay término de búsqueda, filtrar normalmente entre TODAS las fichas
    const searchLower = searchTerm.toLowerCase()
    const filteredCourses = courses.filter(
      (course) =>
        course.code?.toLowerCase().includes(searchLower) ||
        course.fk_programs?.toLowerCase().includes(searchLower) ||
        course.area?.toLowerCase().includes(searchLower) ||
        course.course_status?.toLowerCase().includes(searchLower),
    )
    console.log("🔍 Cursos filtrados por búsqueda:", filteredCourses.length)
    return filteredCourses
  }

  const displayedCourses = getDisplayedCourses()

  // Mostrar loading mientras se cargan los datos del instructor
  if (loadingInstructors || !instructor || !initialLoadComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f384c] mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando datos del instructor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-[#1f384c]">
                Editar Instructor: {instructor.nombre} {instructor.apellido}
              </h1>
            </div>

            {/* Dropdown de usuario */}
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
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Información del Instructor</h2>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {errors.general && (
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">{errors.general}</div>
            )}

            {/* Campos del formulario */}
            <div className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f384c] ${
                      errors.nombre ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f384c] ${
                      errors.apellido ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.apellido && <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Documento <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="tipoDocumento"
                    value={formData.tipoDocumento}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f384c]"
                    required
                  >
                    <option value="CC">Cédula de Ciudadanía</option>
                    <option value="TI">Tarjeta de Identidad</option>
                    <option value="PPT">Permiso por Protección Temporal</option>
                    <option value="PEP">Permiso Especial de Permanencia</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Documento <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="documento"
                    value={formData.documento}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f384c] ${
                      errors.documento ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.documento && <p className="text-red-500 text-sm mt-1">{errors.documento}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f384c] ${
                      errors.telefono ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.telefono && <p className="text-red-500 text-sm mt-1">{errors.telefono}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Correo Electrónico <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="correo"
                    value={formData.correo}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f384c] ${
                      errors.correo ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.correo && <p className="text-red-500 text-sm mt-1">{errors.correo}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="estado"
                    value={formData.estado}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f384c] ${
                      errors.estado ? "border-red-500" : "border-gray-300"
                    }`}
                    required
                  >
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                  {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado}</p>}
                </div>
              </div>
            </div>

            {/* Sección de Fichas */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-[#1f384c] mb-4">
                Fichas Asignadas
                {formData.fichas.length > 0 && (
                  <span className="ml-2 text-sm font-normal text-gray-600">
                    ({formData.fichas.length} seleccionada{formData.fichas.length !== 1 ? "s" : ""})
                  </span>
                )}
              </h3>

              <div className="border border-gray-200 rounded-md">
                {/* Buscador de fichas */}
                <div className="p-4 border-b border-gray-200 bg-gray-50">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Buscar fichas por código, programa, área o estado..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#1f384c] focus:border-[#1f384c]"
                    />
                    {coursesLoading && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#1f384c]"></div>
                      </div>
                    )}
                  </div>
                  {searchTerm && hasLoaded && (
                    <p className="text-sm text-gray-600 mt-2">
                      Mostrando {displayedCourses.length} de {courses.length} fichas
                    </p>
                  )}
                  {!searchTerm && hasLoaded && formData.fichas.length > 0 && (
                    <p className="text-sm text-gray-600 mt-2">
                      Mostrando {displayedCourses.length} ficha{displayedCourses.length !== 1 ? "s" : ""} seleccionada
                      {displayedCourses.length !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {coursesLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1f384c] mx-auto"></div>
                      <p className="text-sm text-gray-500 mt-2">Cargando fichas...</p>
                    </div>
                  ) : coursesError ? (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md m-4">
                      Error al cargar fichas: {coursesError}
                    </div>
                  ) : displayedCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                      {displayedCourses.map((course) => {
                        const courseId = course.id || course._id
                        const isSelected = formData.fichas.includes(courseId)

                        return (
                          <div
                            key={courseId}
                            className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                              isSelected ? "border-[#1f384c] bg-blue-50" : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => handleFichaToggle(courseId)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={isSelected}
                                  onChange={() => handleFichaToggle(courseId)}
                                  className="h-4 w-4 text-[#1f384c] focus:ring-[#1f384c] border-gray-300 rounded mr-2"
                                />
                                <div className="font-semibold text-sm text-[#1f384c]">{course.code}</div>
                              </div>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  course.course_status === "EN EJECUCION"
                                    ? "bg-green-100 text-green-800"
                                    : course.course_status === "TERMINADO"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {course.course_status}
                              </span>
                            </div>
                            <div className="text-xs text-gray-600 space-y-1">
                              <div>
                                <strong>Programa:</strong> {course.fk_programs}
                              </div>
                              <div>
                                <strong>Área:</strong> {course.area}
                              </div>
                              <div>
                                <strong>Tipo:</strong> {course.offer_type}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : hasLoaded && searchTerm ? (
                    <div className="text-center py-8 text-gray-500">
                      <svg
                        className="w-12 h-12 mx-auto mb-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <p>No se encontraron fichas que coincidan con "{searchTerm}"</p>
                    </div>
                  ) : hasLoaded && !searchTerm && formData.fichas.length === 0 ? (
                    <div className="text-gray-500 text-sm text-center py-8 bg-gray-50">
                      <svg
                        className="w-12 h-12 mx-auto mb-2 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <p>No hay fichas seleccionadas. Busca fichas para asignar al instructor.</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Botones centrados */}
            <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1f384c]"
                disabled={updating}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={updating || coursesLoading}
              >
                {updating ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Actualizando...
                  </div>
                ) : (
                  "Actualizar Instructor"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

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
    </div>
  )
}

export default EditInstructorPage
