"use client"

import { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChevronDown } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"
import ConfirmationModal from "../../../shared/components/ConfirmationModal"
import useGetInstructors from "../hooks/useGetInstructors"
import usePutInstructor from "../hooks/usePutInstructor"
import useGetCourses from "../hooks/useGetCourses"
import { validateInstructorData, processServerError, extractFichaIds } from "../services/instructorValidationService"

const EditInstructorPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { logout } = useAuth()
  const { instructors, loading: loadingInstructors } = useGetInstructors()
  const { updateInstructor, loading } = usePutInstructor()
  const { courses, loading: coursesLoading, error: coursesError } = useGetCourses()

  const [instructor, setInstructor] = useState(null)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    documento: "",
    tipoDocumento: "CC",
    estado: "Activo",
    telefono: "",
    correo: "",
    fichas: [],
  })

  const [errors, setErrors] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Cargar datos del instructor
  useEffect(() => {
    if (instructors.length > 0 && id) {
      const foundInstructor = instructors.find((inst) => inst._id === id || inst.id === id)
      if (foundInstructor) {
        setInstructor(foundInstructor)

        // Extraer IDs de fichas si vienen como objetos poblados
        const fichasIds = extractFichaIds(foundInstructor.fichas || [])

        setFormData({
          nombre: foundInstructor.nombre || "",
          apellido: foundInstructor.apellido || "",
          documento: foundInstructor.documento || "",
          tipoDocumento: foundInstructor.tipoDocumento || "CC",
          estado: foundInstructor.estado || "Activo",
          telefono: foundInstructor.telefono || "",
          correo: foundInstructor.correo || "",
          fichas: fichasIds,
        })
      }
    }
  }, [instructors, id])

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

  const toggleEstado = () => {
    setFormData((prev) => ({
      ...prev,
      estado: prev.estado === "Activo" ? "Inactivo" : "Activo",
    }))
  }

  const handleFichaToggle = (fichaId) => {
    setFormData((prev) => {
      const currentFichas = prev.fichas || []
      const isSelected = currentFichas.includes(fichaId)

      let newFichas
      if (isSelected) {
        newFichas = currentFichas.filter((id) => id !== fichaId)
      } else {
        newFichas = [...currentFichas, fichaId]
      }

      return {
        ...prev,
        fichas: newFichas,
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validar formulario
    const validationErrors = await validateInstructorData(formData, true, id)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const instructorData = {
        tipoUsuario: "instructor",
        nombre: formData.nombre?.trim(),
        apellido: formData.apellido?.trim(),
        documento: formData.documento?.trim(),
        tipoDocumento: formData.tipoDocumento,
        estado: formData.estado,
        telefono: formData.telefono?.trim(),
        correo: formData.correo?.toLowerCase().trim(),
        fichas: formData.fichas || [],
      }

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

  // Filtrar fichas basado en el término de búsqueda
  const filteredCourses = courses.filter((course) => {
    if (!searchTerm) return true

    const searchLower = searchTerm.toLowerCase()
    return (
      course.code?.toLowerCase().includes(searchLower) ||
      course.fk_programs?.toLowerCase().includes(searchLower) ||
      course.area?.toLowerCase().includes(searchLower) ||
      course.course_status?.toLowerCase().includes(searchLower)
    )
  })

  if (loadingInstructors) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1f384c] mx-auto mb-4"></div>
          <p className="text-[#1f384c] font-medium">Cargando instructor...</p>
        </div>
      </div>
    )
  }

  if (!instructor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Instructor no encontrado</p>
          <button
            onClick={handleCancel}
            className="mt-4 px-4 py-2 bg-[#1f384c] text-white rounded-md hover:bg-[#2d4a5c]"
          >
            Volver a la lista
          </button>
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
              <h1 className="text-2xl font-bold text-[#1f384c]">Editar Instructor</h1>
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
            <h2 className="text-lg font-semibold text-gray-900">
              {instructor.nombre} {instructor.apellido}
            </h2>
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
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center mt-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.estado === "Activo"}
                        onChange={toggleEstado}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#16A34A]"></div>
                    </label>
                    <span className="ml-3 text-sm text-gray-700">
                      {formData.estado === "Activo" ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                  {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado}</p>}
                </div>
              </div>

              <div className="mt-6">
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

              {coursesLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1f384c] mx-auto"></div>
                  <p className="text-sm text-gray-500 mt-2">Cargando fichas...</p>
                </div>
              ) : coursesError ? (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">
                  Error al cargar fichas: {coursesError}
                </div>
              ) : courses.length > 0 ? (
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
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#1f384c] focus:border-[#1f384c]"
                      />
                    </div>
                    {searchTerm && (
                      <p className="text-sm text-gray-600 mt-2">
                        Mostrando {filteredCourses.length} de {courses.length} fichas
                      </p>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {filteredCourses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
                        {filteredCourses.map((course) => (
                          <div
                            key={course.id}
                            className={`border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md ${
                              formData.fichas.includes(course.id)
                                ? "border-[#1f384c] bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => handleFichaToggle(course.id)}
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center">
                                <input
                                  type="checkbox"
                                  checked={formData.fichas.includes(course.id)}
                                  onChange={() => handleFichaToggle(course.id)}
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
                        ))}
                      </div>
                    ) : (
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
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-gray-500 text-sm text-center py-8 bg-gray-50 rounded-md">
                  No hay fichas disponibles
                </div>
              )}
            </div>

            {/* Botones centrados */}
            <div className="flex justify-center space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1f384c]"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading || coursesLoading}
              >
                {loading ? (
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
