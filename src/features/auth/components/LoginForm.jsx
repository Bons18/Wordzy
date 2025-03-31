"use client"

import { useState } from "react"
import { Mail, Eye, EyeOff, Lock } from "lucide-react"
import InputField from "../../../shared/components/InputField"
import Checkbox from "../../../shared/components/Checkbox"

const LoginForm = ({ onLoginSuccess, login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

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
    <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
      <div>
        <InputField
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          icon={<Mail size={20} />}
          placeholder="example@gmail.com"
          label="Email"
          className="w-full text-sm lg:text-base"
        />
      </div>

      <div>
        <InputField
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          label="Contraseña"
          className="w-full text-sm lg:text-base"
          icon={<Lock size={20} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[#64748B] hover:text-[#1F384C] transition-colors p-1"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          }
        />
      </div>

      <div className="flex items-center">
        <Checkbox
          label={<span className="text-[#64748B] text-sm lg:text-base">Recuérdame</span>}
          name="rememberMe"
          checked={formData.rememberMe}
          onChange={handleChange}
        />
      </div>

      {error && (
        <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm lg:text-base">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-2.5 lg:py-3 bg-[#1F384C] text-white rounded-lg font-semibold hover:bg-[#162A3A] transition-colors text-sm lg:text-base"
      >
        {isLoading ? "Cargando..." : "Iniciar Sesión"}
      </button>
    </form>
  )
}

export default LoginForm

