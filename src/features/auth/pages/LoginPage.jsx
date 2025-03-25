"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import LoginForm from "../components/LoginForm"
import logo from "../../../assets/logo.png"

const LoginPage = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLoginSuccess = () => {
    setIsSuccess(true)
    // Show success alert with improved styling and animation
    const alert = document.createElement('div')
    alert.className = 'fixed top-4 right-4 left-4 md:left-auto md:w-96 bg-white border border-green-200 rounded-xl shadow-lg z-50 transform transition-all duration-300 ease-out translate-y-[-100%] opacity-0'
    alert.innerHTML = `
      <div class="flex items-center p-4">
        <div class="flex-shrink-0 bg-green-100 rounded-full p-2">
          <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div class="ml-4">
          <p class="font-medium text-gray-800">¡Inicio de sesión exitoso!</p>
          <p class="text-sm text-gray-500">Redirigiendo al dashboard...</p>
        </div>
      </div>
    `
    document.body.appendChild(alert)

    // Trigger animation
    setTimeout(() => {
      alert.style.transform = 'translateY(0)'
      alert.style.opacity = '1'
    }, 100)

    // Remove alert and navigate
    setTimeout(() => {
      alert.style.transform = 'translateY(-100%)'
      alert.style.opacity = '0'
      setTimeout(() => {
        alert.remove()
        navigate("/dashboard")
      }, 300)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-8 lg:px-16 lg:py-0 items-center lg:items-start">
        <div className="mb-6 lg:mb-10">
          <img src={logo} alt="Wordzy Logo" className="h-24 lg:h-32 w-auto" />
        </div>
        <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-center lg:text-left">
          Bienvenido a<br />
          <span className="text-[#1F384C]">plataforma Wordzy</span>
        </h1>
        <p className="text-[#64748B] text-base lg:text-lg max-w-md text-center lg:text-left">
          Mejora tu inglés con contenido personalizado, seguimiento de avances y retroalimentación para reforzar tus habilidades.
        </p>
      </div>

      {/* Right Section - With animation */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-0">
        {!isSuccess ? (
          <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 border-gray-50 
            animate-[fadeIn_0.5s_ease-out] hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-shadow duration-300"
          >
            <h2 className="text-xl lg:text-2xl font-bold text-[#1F384C] mb-8 text-center lg:text-left">
              Inicio de Sesión
            </h2>
            <LoginForm onLoginSuccess={handleLoginSuccess} login={login} />
          </div>
        ) : (
          <div className="text-center p-4 animate-[fadeIn_0.5s_ease-out]">
            <img src={logo} alt="Wordzy Logo" className="h-16 w-auto mx-auto" />
            <h2 className="mt-6 text-xl lg:text-2xl font-semibold text-green-600">
              ¡Inicio de sesión exitoso!
            </h2>
          </div>
        )}
      </div>

      {/* Success Alert - Make it responsive */}
      <div className="fixed top-4 right-4 left-4 lg:left-auto z-50">
        {isSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center justify-center lg:justify-start">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
            </svg>
            <span className="font-medium">¡Inicio de sesión exitoso!</span>
          </div>
        )}
      </div>
    </div>
)
}

export default LoginPage

