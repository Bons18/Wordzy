"use client"

import { useState } from "react"
import { User, Eye, EyeOff, Lock, CreditCard } from "lucide-react"

const LoginForm = ({ onLoginSuccess, login }) => {
  const [formData, setFormData] = useState({
    documentType: "",
    document: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const documentTypes = [
    { value: "", label: "Seleccionar tipo de documento" },
    { value: "CC", label: "Cédula de Ciudadanía (CC)" },
    { value: "TI", label: "Tarjeta de Identidad (TI)" },
    { value: "CE", label: "Cédula de Extranjería (CE)" },
    { value: "PEP", label: "Permiso Especial de Permanencia (PEP)" },
  ]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await login(formData)
      onLoginSuccess()
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo de Documento */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de Documento</label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              name="documentType"
              value={formData.documentType}
              onChange={handleChange}
              className="w-full pl-10 pr-12 py-3 
                         border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                         text-base text-gray-900
                         bg-white appearance-none cursor-pointer
                         hover:border-gray-400 transition-colors
                         placeholder:text-gray-400"
              required
            >
              {documentTypes.map((type) => (
                <option
                  key={type.value}
                  value={type.value}
                  className="text-base text-gray-900"
                  disabled={type.value === ""}
                >
                  {type.label}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Número de Documento */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Número de Documento</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              name="document"
              type="text"
              value={formData.document}
              onChange={handleChange}
              placeholder="Ingrese su número de documento"
              className="w-full pl-10 pr-4 py-3
                         border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         text-base text-gray-900
                         placeholder:text-gray-400
                         hover:border-gray-400 transition-colors"
              pattern="[0-9]*"
              inputMode="numeric"
              required
            />
          </div>
        </div>

        {/* Contraseña (Documento) */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Confirme su número de documento"
              className="w-full pl-10 pr-12 py-3
                         border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         text-base text-gray-900
                         placeholder:text-gray-400
                         hover:border-gray-400 transition-colors"
              pattern="[0-9]*"
              inputMode="numeric"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2
                         text-gray-400 hover:text-gray-600 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Su contraseña es el mismo número de documento</p>
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">Recuérdame</label>
        </div>

        {/* Error Message */}
        {error && (
          <div className="w-full p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm text-red-700 font-medium">{error}</span>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4
                     bg-[#1F384C] text-white rounded-lg font-semibold text-base
                     hover:bg-[#162A3A] active:bg-[#0F1F2A]
                     focus:outline-none focus:ring-2 focus:ring-[#1F384C] focus:ring-offset-2
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1F384C]
                     transition-all duration-200
                     transform hover:scale-[1.02] active:scale-[0.98]
                     shadow-md hover:shadow-lg"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span>Verificando documento...</span>
            </div>
          ) : (
            "Iniciar Sesión"
          )}
        </button>

        {/* Help Text */}
        <div className="text-center space-y-1 pt-4">
          <p className="text-sm text-gray-500">¿Problemas para acceder?</p>
          <p className="text-sm text-gray-700 font-medium">Contacte al administrador del sistema</p>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
