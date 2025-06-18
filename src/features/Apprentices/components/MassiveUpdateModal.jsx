"use client"

import { useState, useEffect } from "react"
import { X, Download, Database, CheckCircle, AlertCircle, RefreshCw, Wifi, WifiOff } from "lucide-react"
import Modal from "../../../shared/components/Modal"

const MassiveUpdateModal = ({ isOpen, onClose, onComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState({
    phase: "idle",
    message: "",
    percentage: 0,
    details: "",
  })
  const [results, setResults] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const [connectivity, setConnectivity] = useState(null)
  const [connectivityVerified, setConnectivityVerified] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  // useEffect para manejar cuando se completa la sincronización
  useEffect(() => {
    if (progress.phase === "completed" && !results && !showSuccessModal) {
      console.log("🎉 Sincronización completada, procesando resultados...")

      try {
        const finalResults = {
          total: progress.details?.match(/Total: (\d+)/)?.[1] || 0,
          created: progress.details?.match(/Creados: (\d+)/)?.[1] || 0,
          updated: progress.details?.match(/Actualizados: (\d+)/)?.[1] || 0,
          skipped: progress.details?.match(/Sin cambios: (\d+)/)?.[1] || 0,
          errors: progress.details?.match(/Errores: (\d+)/)?.[1] || 0,
        }

        console.log("📊 Resultados procesados:", finalResults)
        setResults(finalResults)

        // Mostrar modal de éxito después de un delay
        const timer = setTimeout(() => {
          console.log("✅ Mostrando modal de éxito...")
          setShowSuccessModal(true)
        }, 1500)

        return () => clearTimeout(timer)
      } catch (error) {
        console.error("❌ Error procesando resultados:", error)
      }
    }
  }, [progress.phase, results, showSuccessModal, progress.details])

  const checkConnectivity = async () => {
    try {
      const { checkApiConnectivity } = await import("../services/massiveUpdateService")
      const result = await checkApiConnectivity()
      setConnectivity(result)
      setConnectivityVerified(true)
      return result
    } catch (error) {
      console.error("Error verificando conectividad:", error)
      setConnectivity({
        external: false,
        local: false,
        errors: [error.message],
      })
      setConnectivityVerified(false)
      return null
    }
  }

  const handleStartUpdate = async () => {
    setIsProcessing(true)
    setResults(null)
    setShowSuccessModal(false)
    setProgress({
      phase: "starting",
      message: "Verificando conectividad...",
      percentage: 0,
      details: "",
    })

    try {
      // Verificar conectividad primero
      const connectivityResult = await checkConnectivity()
      if (!connectivityResult || !connectivityResult.external || !connectivityResult.local) {
        throw new Error("Error de conectividad con las APIs")
      }

      const { processMassiveUpdate } = await import("../services/massiveUpdateService")

      await processMassiveUpdate((progressData) => {
        setProgress(progressData)
      })
    } catch (error) {
      console.error("Error en actualización masiva:", error)
      setProgress({
        phase: "error",
        message: `Error: ${error.message}`,
        percentage: 0,
        details: "",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClose = () => {
    if (!isProcessing) {
      console.log("🔒 Cerrando modal principal...")
      onClose()
      // Reset state
      setProgress({
        phase: "idle",
        message: "",
        percentage: 0,
        details: "",
      })
      setResults(null)
      setShowDetails(false)
      setConnectivity(null)
      setConnectivityVerified(false)
      setShowSuccessModal(false)
    }
  }

  const handleSuccessModalClose = () => {
    console.log("✅ Cerrando modal de éxito...")
    setShowSuccessModal(false)

    // Llamar onComplete solo cuando el usuario cierre el modal de éxito
    if (onComplete && results) {
      try {
        console.log("📞 Llamando onComplete con resultados:", results)
        onComplete(results)
      } catch (error) {
        console.error("❌ Error en onComplete:", error)
      }
    }

    // Cerrar el modal principal después de un pequeño delay
    setTimeout(() => {
      handleClose()
    }, 100)
  }

  const getPhaseIcon = () => {
    switch (progress.phase) {
      case "download":
        return <Download className="w-5 h-5 text-blue-500 animate-pulse" />
      case "sync":
        return <Database className="w-5 h-5 text-green-500 animate-pulse" />
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <RefreshCw className="w-5 h-5 text-gray-500" />
    }
  }

  const getPhaseTitle = () => {
    switch (progress.phase) {
      case "download":
        return "Descargando desde API Externa"
      case "sync":
        return "Sincronizando con Base de Datos Local"
      case "completed":
        return "Sincronización Completada"
      case "error":
        return "Error en la Sincronización"
      default:
        return "Sincronización Masiva de Aprendices"
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {getPhaseIcon()}
            <h1 className="text-xl font-bold text-[#1f384c]">{getPhaseTitle()}</h1>
          </div>
          {!isProcessing && (
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Content */}
        {!isProcessing && !results && (
          <div className="text-center py-6">
            <div className="mb-6">
              <RefreshCw className="w-16 h-16 text-[#1f384c] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Sincronización Masiva de Aprendices</h3>
              <p className="text-sm font-medium text-gray-700 mb-4">
                Esta operación descargará todos los aprendices de la API externa y los sincronizará con tu base de datos
                local.
              </p>

              {/* Información de conectividad */}
              {connectivity && (
                <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-300">
                  <div className="flex items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      {connectivity.external ? (
                        <Wifi className="w-4 h-4 text-green-500" />
                      ) : (
                        <WifiOff className="w-4 h-4 text-red-500" />
                      )}
                      <span className={connectivity.external ? "text-green-700" : "text-red-700"}>
                        API Externa: {connectivity.external ? "Conectada" : "Error"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {connectivity.local ? (
                        <Wifi className="w-4 h-4 text-green-500" />
                      ) : (
                        <WifiOff className="w-4 h-4 text-red-500" />
                      )}
                      <span className={connectivity.local ? "text-green-700" : "text-red-700"}>
                        API Local: {connectivity.local ? "Conectada" : "Error"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Importante:</p>
                    <ul className="list-disc list-inside space-y-1 text-left">
                      <li>Se sugiere realizar la actualización en horario nocturno</li>
                      <li>Esta operación puede tardar varios minutos</li>
                      <li>Los duplicados se actualizarán automáticamente</li>
                      <li>No cierres esta ventana durante el proceso</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col space-y-3 mt-6">
              <button
                onClick={checkConnectivity}
                className="w-full px-4 py-2 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
              >
                Verificar Conectividad
              </button>
              <button
                onClick={handleStartUpdate}
                disabled={!connectivityVerified || (connectivity && (!connectivity.external || !connectivity.local))}
                className={`w-full px-4 py-2 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 transition-colors ${
                  !connectivityVerified || (connectivity && (!connectivity.external || !connectivity.local))
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 focus:ring-green-500"
                }`}
              >
                {!connectivityVerified ? "Verificar Conectividad Primero" : "Iniciar Sincronización"}
              </button>
            </div>
          </div>
        )}

        {/* Progress */}
        {isProcessing && (
          <div className="py-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">{progress.message}</span>
                <span className="text-sm text-gray-500">{progress.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#1f384c] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
            {progress.details && <p className="text-sm font-medium text-gray-700 text-center">{progress.details}</p>}
          </div>
        )}

        {/* Results - Solo mostrar si no hay modal de éxito */}
        {results && !showSuccessModal && (
          <div className="py-4">
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Sincronización Completada</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-700 font-medium">Total procesados:</span>
                  <span className="font-bold ml-2">{results.total}</span>
                </div>
                <div>
                  <span className="text-gray-700 font-medium">Creados:</span>
                  <span className="font-bold ml-2 text-green-600">{results.created}</span>
                </div>
                <div>
                  <span className="text-gray-700 font-medium">Actualizados:</span>
                  <span className="font-bold ml-2 text-blue-600">{results.updated}</span>
                </div>
                <div>
                  <span className="text-gray-700 font-medium">Sin cambios:</span>
                  <span className="font-bold ml-2 text-gray-600">{results.skipped}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-gray-700 font-medium">Errores:</span>
                  <span className="font-bold ml-2 text-red-600">{results.errors}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={handleClose}
                className="px-3 py-2 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 bg-green-500 hover:bg-green-600 focus:ring-green-500"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal de éxito - Renderizado independiente */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 mb-2">¡Actualización Completada Exitosamente!</h3>
              <p className="text-sm text-gray-600 mb-6">
                La sincronización masiva de aprendices se ha ejecutado correctamente.
              </p>
              {results && (
                <div className="bg-gray-50 rounded-md p-3 mb-4 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      Creados: <span className="font-bold text-green-600">{results.created}</span>
                    </div>
                    <div>
                      Actualizados: <span className="font-bold text-blue-600">{results.updated}</span>
                    </div>
                    <div>
                      Sin cambios: <span className="font-bold text-gray-600">{results.skipped}</span>
                    </div>
                    <div>
                      Errores: <span className="font-bold text-red-600">{results.errors}</span>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={handleSuccessModalClose}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MassiveUpdateModal
