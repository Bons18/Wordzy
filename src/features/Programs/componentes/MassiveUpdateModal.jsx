// // // // "use client"

// // // // import { useState } from "react"
// // // // import Modal from "../../../shared/components/Modal"
// // // // import Button from "../../../shared/components/Button"
// // // // import { processMassiveUpdate } from "../services/massiveUpdateService"
// // // // import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"

// // // // const MassiveUpdateModal = ({ isOpen, onClose, onComplete }) => {
// // // //   const [isProcessing, setIsProcessing] = useState(false)
// // // //   const [progress, setProgress] = useState({
// // // //     phase: "idle",
// // // //     message: "",
// // // //     percentage: 0,
// // // //     details: "",
// // // //   })
// // // //   const [results, setResults] = useState(null)
// // // //   const [error, setError] = useState(null)

// // // //   const handleStartUpdate = async () => {
// // // //     try {
// // // //       setIsProcessing(true)
// // // //       setError(null)
// // // //       setResults(null)
// // // //       setProgress({
// // // //         phase: "starting",
// // // //         message: "Iniciando sincronización...",
// // // //         percentage: 0,
// // // //         details: "",
// // // //       })

// // // //       const result = await processMassiveUpdate((progressData) => {
// // // //         setProgress(progressData)
// // // //       })

// // // //       setResults(result)
// // // //       if (onComplete) {
// // // //         onComplete(result)
// // // //       }
// // // //     } catch (err) {
// // // //       setError(err.message)
// // // //       setProgress({
// // // //         phase: "error",
// // // //         message: `Error: ${err.message}`,
// // // //         percentage: 0,
// // // //         details: "La sincronización ha fallado",
// // // //       })
// // // //     } finally {
// // // //       setIsProcessing(false)
// // // //     }
// // // //   }

// // // //   const handleClose = () => {
// // // //     if (!isProcessing) {
// // // //       setProgress({
// // // //         phase: "idle",
// // // //         message: "",
// // // //         percentage: 0,
// // // //         details: "",
// // // //       })
// // // //       setResults(null)
// // // //       setError(null)
// // // //       onClose()
// // // //     }
// // // //   }

// // // //   const getPhaseIcon = () => {
// // // //     switch (progress.phase) {
// // // //       case "completed":
// // // //         return <CheckCircle className="w-6 h-6 text-green-600" />
// // // //       case "error":
// // // //         return <XCircle className="w-6 h-6 text-red-600" />
// // // //       case "starting":
// // // //       case "download":
// // // //       case "sync":
// // // //         return <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
// // // //       default:
// // // //         return <AlertCircle className="w-6 h-6 text-gray-400" />
// // // //     }
// // // //   }

// // // //   const getPhaseColor = () => {
// // // //     switch (progress.phase) {
// // // //       case "completed":
// // // //         return "bg-green-600"
// // // //       case "error":
// // // //         return "bg-red-600"
// // // //       case "starting":
// // // //       case "download":
// // // //       case "sync":
// // // //         return "bg-blue-600"
// // // //       default:
// // // //         return "bg-gray-400"
// // // //     }
// // // //   }

// // // //   return (
// // // //     <Modal isOpen={isOpen} onClose={handleClose} title="Sincronización Masiva de Programas">
// // // //       <div className="p-6">
// // // //         <div className="mb-6">
// // // //           <p className="text-gray-600 mb-4">
// // // //             Esta función sincronizará todos los programas desde la API externa de SARA con la base de datos local.
// // // //           </p>

// // // //           {!isProcessing && !results && !error && (
// // // //             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
// // // //               <div className="flex">
// // // //                 <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
// // // //                 <div>
// // // //                   <h4 className="text-yellow-800 font-medium">Antes de continuar:</h4>
// // // //                   <ul className="text-yellow-700 text-sm mt-1 list-disc list-inside">
// // // //                     <li>Se verificará la conectividad con las APIs</li>
// // // //                     <li>Se descargarán todos los programas disponibles</li>
// // // //                     <li>Se actualizarán los registros existentes</li>
// // // //                     <li>Se crearán nuevos programas si no existen</li>
// // // //                   </ul>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>

// // // //         {/* Barra de progreso */}
// // // //         {(isProcessing || results || error) && (
// // // //           <div className="mb-6">
// // // //             <div className="flex items-center mb-2">
// // // //               {getPhaseIcon()}
// // // //               <span className="ml-2 font-medium text-gray-900">{progress.message}</span>
// // // //             </div>

// // // //             <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
// // // //               <div
// // // //                 className={`h-2 rounded-full transition-all duration-300 ${getPhaseColor()}`}
// // // //                 style={{ width: `${progress.percentage}%` }}
// // // //               ></div>
// // // //             </div>

// // // //             <p className="text-sm text-gray-600">{progress.details}</p>
// // // //           </div>
// // // //         )}

// // // //         {/* Resultados */}
// // // //         {results && (
// // // //           <div className="mb-6">
// // // //             <h4 className="font-medium text-gray-900 mb-3">Resultados de la Sincronización:</h4>
// // // //             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// // // //               <div className="bg-blue-50 p-3 rounded-lg text-center">
// // // //                 <div className="text-2xl font-bold text-blue-600">{results.summary.total}</div>
// // // //                 <div className="text-sm text-blue-800">Total</div>
// // // //               </div>
// // // //               <div className="bg-green-50 p-3 rounded-lg text-center">
// // // //                 <div className="text-2xl font-bold text-green-600">{results.summary.created}</div>
// // // //                 <div className="text-sm text-green-800">Creados</div>
// // // //               </div>
// // // //               <div className="bg-yellow-50 p-3 rounded-lg text-center">
// // // //                 <div className="text-2xl font-bold text-yellow-600">{results.summary.updated}</div>
// // // //                 <div className="text-sm text-yellow-800">Actualizados</div>
// // // //               </div>
// // // //               <div className="bg-gray-50 p-3 rounded-lg text-center">
// // // //                 <div className="text-2xl font-bold text-gray-600">{results.summary.skipped}</div>
// // // //                 <div className="text-sm text-gray-800">Sin cambios</div>
// // // //               </div>
// // // //             </div>

// // // //             {results.summary.errors > 0 && (
// // // //               <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
// // // //                 <h5 className="font-medium text-red-800 mb-2">Errores encontrados ({results.summary.errors}):</h5>
// // // //                 {results.errorDetails && (
// // // //                   <ul className="text-sm text-red-700 space-y-1">
// // // //                     {results.errorDetails.slice(0, 5).map((error, index) => (
// // // //                       <li key={index}>
// // // //                         <strong>{error.program}:</strong> {error.error}
// // // //                       </li>
// // // //                     ))}
// // // //                     {results.errorDetails.length > 5 && (
// // // //                       <li className="text-red-600">... y {results.errorDetails.length - 5} errores más</li>
// // // //                     )}
// // // //                   </ul>
// // // //                 )}
// // // //               </div>
// // // //             )}
// // // //           </div>
// // // //         )}

// // // //         {/* Error */}
// // // //         {error && (
// // // //           <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
// // // //             <div className="flex">
// // // //               <XCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
// // // //               <div>
// // // //                 <h4 className="text-red-800 font-medium">Error en la sincronización:</h4>
// // // //                 <p className="text-red-700 text-sm mt-1">{error}</p>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         )}

// // // //         {/* Botones */}
// // // //         <div className="flex justify-end space-x-3">
// // // //           <Button type="button" onClick={handleClose} variant="secondary" disabled={isProcessing}>
// // // //             {results || error ? "Cerrar" : "Cancelar"}
// // // //           </Button>

// // // //           {!results && !error && (
// // // //             <Button onClick={handleStartUpdate} loading={isProcessing} disabled={isProcessing}>
// // // //               {isProcessing ? "Sincronizando..." : "Iniciar Sincronización"}
// // // //             </Button>
// // // //           )}

// // // //           {(results || error) && (
// // // //             <Button onClick={handleStartUpdate} disabled={isProcessing}>
// // // //               Sincronizar Nuevamente
// // // //             </Button>
// // // //           )}
// // // //         </div>
// // // //       </div>
// // // //     </Modal>
// // // //   )
// // // // }

// // // // export default MassiveUpdateModal
// // // "use client"

// // // import { useState } from "react"
// // // import Modal from "../../../shared/components/Modal"
// // // import { massiveUpdatePrograms } from "../services/massiveUpdateService"

// // // export default function MassiveUpdateModal({ isOpen, onClose, onComplete }) {
// // //   const [loading, setLoading] = useState(false)
// // //   const [results, setResults] = useState(null)
// // //   const [error, setError] = useState(null)

// // //   const handleMassiveUpdate = async () => {
// // //     setLoading(true)
// // //     setError(null)
// // //     setResults(null)

// // //     try {
// // //       const response = await massiveUpdatePrograms()
// // //       setResults(response)
// // //       if (onComplete) {
// // //         onComplete(response)
// // //       }
// // //     } catch (err) {
// // //       setError(err.message || "Error en la actualización masiva")
// // //     } finally {
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const handleClose = () => {
// // //     setResults(null)
// // //     setError(null)
// // //     onClose()
// // //   }

// // //   return (
// // //     <Modal isOpen={isOpen} onClose={handleClose} title="Sincronización Masiva de Programas">
// // //       <div className="p-4">
// // //         {!results && !error && (
// // //           <div className="text-center">
// // //             <p className="text-gray-600 mb-6">
// // //               Esta acción sincronizará los programas desde la API externa del SENA. Los programas existentes se
// // //               actualizarán y los nuevos se agregarán.
// // //             </p>

// // //             <div className="flex justify-center gap-4">
// // //               <button
// // //                 onClick={handleClose}
// // //                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
// // //                 disabled={loading}
// // //               >
// // //                 Cancelar
// // //               </button>
// // //               <button
// // //                 onClick={handleMassiveUpdate}
// // //                 disabled={loading}
// // //                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
// // //               >
// // //                 {loading ? (
// // //                   <div className="flex items-center gap-2">
// // //                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
// // //                     Sincronizando...
// // //                   </div>
// // //                 ) : (
// // //                   "Iniciar Sincronización"
// // //                 )}
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}

// // //         {results && (
// // //           <div className="text-center">
// // //             <div className="mb-4">
// // //               <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
// // //                 <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
// // //                 </svg>
// // //               </div>
// // //               <h3 className="text-lg font-semibold text-gray-900 mb-2">Sincronización Completada</h3>
// // //             </div>

// // //             <div className="bg-gray-50 p-4 rounded-lg mb-6">
// // //               <div className="grid grid-cols-2 gap-4 text-sm">
// // //                 <div>
// // //                   <p className="text-gray-600">Programas procesados:</p>
// // //                   <p className="font-semibold text-gray-900">{results.processed || 0}</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-gray-600">Programas actualizados:</p>
// // //                   <p className="font-semibold text-green-600">{results.updated || 0}</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-gray-600">Programas nuevos:</p>
// // //                   <p className="font-semibold text-blue-600">{results.created || 0}</p>
// // //                 </div>
// // //                 <div>
// // //                   <p className="text-gray-600">Errores:</p>
// // //                   <p className="font-semibold text-red-600">{results.errors || 0}</p>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <button
// // //               onClick={handleClose}
// // //               className="px-4 py-2 bg-[#1f384c] text-white rounded-lg hover:bg-[#2d4a5c] transition-colors"
// // //             >
// // //               Cerrar
// // //             </button>
// // //           </div>
// // //         )}

// // //         {error && (
// // //           <div className="text-center">
// // //             <div className="mb-4">
// // //               <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
// // //                 <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// // //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
// // //                 </svg>
// // //               </div>
// // //               <h3 className="text-lg font-semibold text-gray-900 mb-2">Error en la Sincronización</h3>
// // //               <p className="text-red-600 mb-6">{error}</p>
// // //             </div>

// // //             <div className="flex justify-center gap-4">
// // //               <button
// // //                 onClick={handleClose}
// // //                 className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
// // //               >
// // //                 Cerrar
// // //               </button>
// // //               <button
// // //                 onClick={handleMassiveUpdate}
// // //                 className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
// // //               >
// // //                 Reintentar
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </Modal>
// // //   )
// // // }
// // "use client"

// // import { useState } from "react"
// // import Modal from "../../../shared/components/Modal"
// // import Button from "../../../shared/components/Button"
// // import { processMassiveUpdate } from "../services/massiveUpdateService"
// // import { CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react"

// // const MassiveUpdateModal = ({ isOpen, onClose, onComplete }) => {
// //   const [isProcessing, setIsProcessing] = useState(false)
// //   const [progress, setProgress] = useState({
// //     phase: "idle",
// //     message: "",
// //     percentage: 0,
// //     details: "",
// //   })
// //   const [results, setResults] = useState(null)
// //   const [error, setError] = useState(null)

// //   const handleStartUpdate = async () => {
// //     try {
// //       setIsProcessing(true)
// //       setError(null)
// //       setResults(null)
// //       setProgress({
// //         phase: "starting",
// //         message: "Iniciando sincronización...",
// //         percentage: 0,
// //         details: "",
// //       })

// //       const result = await processMassiveUpdate((progressData) => {
// //         setProgress(progressData)
// //       })

// //       setResults(result)
// //       if (onComplete) {
// //         onComplete(result)
// //       }
// //     } catch (err) {
// //       setError(err.message)
// //       setProgress({
// //         phase: "error",
// //         message: `Error: ${err.message}`,
// //         percentage: 0,
// //         details: "La sincronización ha fallado",
// //       })
// //     } finally {
// //       setIsProcessing(false)
// //     }
// //   }

// //   const handleClose = () => {
// //     if (!isProcessing) {
// //       setProgress({
// //         phase: "idle",
// //         message: "",
// //         percentage: 0,
// //         details: "",
// //       })
// //       setResults(null)
// //       setError(null)
// //       onClose()
// //     }
// //   }

// //   const getPhaseIcon = () => {
// //     switch (progress.phase) {
// //       case "completed":
// //         return <CheckCircle className="w-6 h-6 text-green-600" />
// //       case "error":
// //         return <XCircle className="w-6 h-6 text-red-600" />
// //       case "starting":
// //       case "download":
// //       case "sync":
// //         return <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
// //       default:
// //         return <AlertCircle className="w-6 h-6 text-gray-400" />
// //     }
// //   }

// //   const getPhaseColor = () => {
// //     switch (progress.phase) {
// //       case "completed":
// //         return "bg-green-600"
// //       case "error":
// //         return "bg-red-600"
// //       case "starting":
// //       case "download":
// //       case "sync":
// //         return "bg-blue-600"
// //       default:
// //         return "bg-gray-400"
// //     }
// //   }

// //   return (
// //     <Modal isOpen={isOpen} onClose={handleClose} title="Sincronización Masiva de Programas">
// //       <div className="p-6">
// //         <div className="mb-6">
// //           <p className="text-gray-600 mb-4">
// //             Esta función sincronizará todos los programas desde la API externa de SARA con la base de datos local.
// //           </p>

// //           {!isProcessing && !results && !error && (
// //             <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
// //               <div className="flex">
// //                 <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
// //                 <div>
// //                   <h4 className="text-yellow-800 font-medium">Antes de continuar:</h4>
// //                   <ul className="text-yellow-700 text-sm mt-1 list-disc list-inside">
// //                     <li>Se verificará la conectividad con las APIs</li>
// //                     <li>Se descargarán todos los programas disponibles</li>
// //                     <li>Se actualizarán los registros existentes</li>
// //                     <li>Se crearán nuevos programas si no existen</li>
// //                   </ul>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Barra de progreso */}
// //         {(isProcessing || results || error) && (
// //           <div className="mb-6">
// //             <div className="flex items-center mb-2">
// //               {getPhaseIcon()}
// //               <span className="ml-2 font-medium text-gray-900">{progress.message}</span>
// //             </div>

// //             <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
// //               <div
// //                 className={`h-2 rounded-full transition-all duration-300 ${getPhaseColor()}`}
// //                 style={{ width: `${progress.percentage}%` }}
// //               ></div>
// //             </div>

// //             <p className="text-sm text-gray-600">{progress.details}</p>
// //           </div>
// //         )}

// //         {/* Resultados */}
// //         {results && (
// //           <div className="mb-6">
// //             <h4 className="font-medium text-gray-900 mb-3">Resultados de la Sincronización:</h4>
// //             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
// //               <div className="bg-blue-50 p-3 rounded-lg text-center">
// //                 <div className="text-2xl font-bold text-blue-600">{results.summary.total}</div>
// //                 <div className="text-sm text-blue-800">Total</div>
// //               </div>
// //               <div className="bg-green-50 p-3 rounded-lg text-center">
// //                 <div className="text-2xl font-bold text-green-600">{results.summary.created}</div>
// //                 <div className="text-sm text-green-800">Creados</div>
// //               </div>
// //               <div className="bg-yellow-50 p-3 rounded-lg text-center">
// //                 <div className="text-2xl font-bold text-yellow-600">{results.summary.updated}</div>
// //                 <div className="text-sm text-yellow-800">Actualizados</div>
// //               </div>
// //               <div className="bg-gray-50 p-3 rounded-lg text-center">
// //                 <div className="text-2xl font-bold text-gray-600">{results.summary.skipped}</div>
// //                 <div className="text-sm text-gray-800">Sin cambios</div>
// //               </div>
// //             </div>

// //             {results.summary.errors > 0 && (
// //               <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
// //                 <h5 className="font-medium text-red-800 mb-2">Errores encontrados ({results.summary.errors}):</h5>
// //                 {results.errorDetails && (
// //                   <ul className="text-sm text-red-700 space-y-1">
// //                     {results.errorDetails.slice(0, 5).map((error, index) => (
// //                       <li key={index}>
// //                         <strong>{error.program}:</strong> {error.error}
// //                       </li>
// //                     ))}
// //                     {results.errorDetails.length > 5 && (
// //                       <li className="text-red-600">... y {results.errorDetails.length - 5} errores más</li>
// //                     )}
// //                   </ul>
// //                 )}
// //               </div>
// //             )}
// //           </div>
// //         )}

// //         {/* Error */}
// //         {error && (
// //           <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
// //             <div className="flex">
// //               <XCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
// //               <div>
// //                 <h4 className="text-red-800 font-medium">Error en la sincronización:</h4>
// //                 <p className="text-red-700 text-sm mt-1">{error}</p>
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {/* Botones */}
// //         <div className="flex justify-end space-x-3">
// //           <Button type="button" onClick={handleClose} variant="secondary" disabled={isProcessing}>
// //             {results || error ? "Cerrar" : "Cancelar"}
// //           </Button>

// //           {!results && !error && (
// //             <Button onClick={handleStartUpdate} loading={isProcessing} disabled={isProcessing}>
// //               {isProcessing ? "Sincronizando..." : "Iniciar Sincronización"}
// //             </Button>
// //           )}

// //           {(results || error) && (
// //             <Button onClick={handleStartUpdate} disabled={isProcessing}>
// //               Sincronizar Nuevamente
// //             </Button>
// //           )}
// //         </div>
// //       </div>
// //     </Modal>
// //   )
// // }

// // export default MassiveUpdateModal
// "use client"

// import { useState } from "react"
// import { X, Download, Database, CheckCircle, AlertCircle, RefreshCw, Wifi, WifiOff } from "lucide-react"
// import Modal from "../../../shared/components/Modal"

// const MassiveUpdateModal = ({ isOpen, onClose, onComplete }) => {
//   const [isProcessing, setIsProcessing] = useState(false)
//   const [progress, setProgress] = useState({
//     phase: "idle",
//     message: "",
//     percentage: 0,
//     details: "",
//   })
//   const [results, setResults] = useState(null)
//   const [showDetails, setShowDetails] = useState(false)
//   const [connectivity, setConnectivity] = useState(null)

//   const checkConnectivity = async () => {
//     try {
//       const { checkApiConnectivity } = await import("../services/massiveUpdateService")
//       const result = await checkApiConnectivity()
//       setConnectivity(result)
//       return result
//     } catch (error) {
//       console.error("Error verificando conectividad:", error)
//       setConnectivity({
//         external: false,
//         local: false,
//         errors: [error.message],
//       })
//       return null
//     }
//   }

//   const handleStartUpdate = async () => {
//     setIsProcessing(true)
//     setResults(null)
//     setProgress({
//       phase: "starting",
//       message: "Verificando conectividad...",
//       percentage: 0,
//       details: "",
//     })

//     try {
//       // Verificar conectividad primero
//       const connectivityResult = await checkConnectivity()
//       if (!connectivityResult || !connectivityResult.external || !connectivityResult.local) {
//         throw new Error("Error de conectividad con las APIs")
//       }

//       const { processMassiveUpdate } = await import("../services/massiveUpdateService")

//       await processMassiveUpdate((progressData) => {
//         setProgress(progressData)
//       })
//     } catch (error) {
//       console.error("Error en actualización masiva:", error)
//       setProgress({
//         phase: "error",
//         message: `Error: ${error.message}`,
//         percentage: 0,
//         details: "",
//       })
//     } finally {
//       setIsProcessing(false)
//     }
//   }

//   const handleClose = () => {
//     if (!isProcessing) {
//       onClose()
//       // Reset state
//       setProgress({
//         phase: "idle",
//         message: "",
//         percentage: 0,
//         details: "",
//       })
//       setResults(null)
//       setShowDetails(false)
//       setConnectivity(null)
//     }
//   }

//   const getPhaseIcon = () => {
//     switch (progress.phase) {
//       case "download":
//         return <Download className="w-5 h-5 text-blue-500 animate-pulse" />
//       case "sync":
//         return <Database className="w-5 h-5 text-green-500 animate-pulse" />
//       case "completed":
//         return <CheckCircle className="w-5 h-5 text-green-500" />
//       case "error":
//         return <AlertCircle className="w-5 h-5 text-red-500" />
//       default:
//         return <RefreshCw className="w-5 h-5 text-gray-500" />
//     }
//   }

//   const getPhaseTitle = () => {
//     switch (progress.phase) {
//       case "download":
//         return "Descargando desde API Externa"
//       case "sync":
//         return "Sincronizando con Base de Datos Local"
//       case "completed":
//         return "Sincronización Completada"
//       case "error":
//         return "Error en la Sincronización"
//       default:
//         return "Sincronización Masiva de Programas"
//     }
//   }

//   // Manejar cuando se completa la sincronización
//   if (progress.phase === "completed" && !results) {
//     const finalResults = {
//       total: progress.details?.match(/Total: (\d+)/)?.[1] || 0,
//       created: progress.details?.match(/Creados: (\d+)/)?.[1] || 0,
//       updated: progress.details?.match(/Actualizados: (\d+)/)?.[1] || 0,
//       skipped: progress.details?.match(/Sin cambios: (\d+)/)?.[1] || 0,
//       errors: progress.details?.match(/Errores: (\d+)/)?.[1] || 0,
//     }
//     setResults(finalResults)
//     if (onComplete) {
//       onComplete(finalResults)
//     }
//   }

//   return (
//     <Modal isOpen={isOpen} onClose={handleClose}>
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-3">
//           {getPhaseIcon()}
//           <h1 className="text-xl font-bold text-[#1f384c]">{getPhaseTitle()}</h1>
//         </div>
//         {!isProcessing && (
//           <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
//             <X className="w-6 h-6" />
//           </button>
//         )}
//       </div>

//       {/* Content */}
//       {!isProcessing && !results && (
//         <div className="text-center py-6">
//           <div className="mb-6">
//             <RefreshCw className="w-16 h-16 text-[#1f384c] mx-auto mb-4" />
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">Sincronización Masiva de Programas</h3>
//             <p className="text-sm font-medium text-gray-700 mb-4">
//               Esta operación descargará todos los programas de la API externa y los sincronizará con tu base de datos
//               local.
//             </p>

//             {/* Información de conectividad */}
//             {connectivity && (
//               <div className="mb-4 p-3 bg-gray-50 rounded-md border border-gray-300">
//                 <div className="flex items-center justify-center gap-4 text-sm">
//                   <div className="flex items-center gap-2">
//                     {connectivity.external ? (
//                       <Wifi className="w-4 h-4 text-green-500" />
//                     ) : (
//                       <WifiOff className="w-4 h-4 text-red-500" />
//                     )}
//                     <span className={connectivity.external ? "text-green-700" : "text-red-700"}>
//                       API Externa: {connectivity.external ? "Conectada" : "Error"}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     {connectivity.local ? (
//                       <Wifi className="w-4 h-4 text-green-500" />
//                     ) : (
//                       <WifiOff className="w-4 h-4 text-red-500" />
//                     )}
//                     <span className={connectivity.local ? "text-green-700" : "text-red-700"}>
//                       API Local: {connectivity.local ? "Conectada" : "Error"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
//               <div className="flex items-start gap-3">
//                 <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
//                 <div className="text-sm text-yellow-800">
//                   <p className="font-medium mb-1">Importante:</p>
//                   <ul className="list-disc list-inside space-y-1 text-left">
//                     <li>Esta operación puede tardar varios minutos</li>
//                     <li>Se procesarán todos los programas disponibles</li>
//                     <li>Los duplicados se actualizarán automáticamente</li>
//                     <li>No cierres esta ventana durante el proceso</li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-between space-x-4 mt-6">
//             <button
//               onClick={checkConnectivity}
//               className="px-3 py-2 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 bg-gray-500 hover:bg-gray-600 focus:ring-gray-500"
//             >
//               Verificar Conectividad
//             </button>
//             <button
//               onClick={handleStartUpdate}
//               disabled={connectivity && (!connectivity.external || !connectivity.local)}
//               className={`px-3 py-2 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 transition-colors ${
//                 connectivity && (!connectivity.external || !connectivity.local)
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-green-500 hover:bg-green-600 focus:ring-green-500"
//               }`}
//             >
//               Iniciar Sincronización
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Progress */}
//       {isProcessing && (
//         <div className="py-6">
//           <div className="mb-4">
//             <div className="flex items-center justify-between mb-2">
//               <span className="text-sm font-medium text-gray-700">{progress.message}</span>
//               <span className="text-sm text-gray-500">{progress.percentage}%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-[#1f384c] h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${progress.percentage}%` }}
//               />
//             </div>
//           </div>
//           {progress.details && <p className="text-sm font-medium text-gray-700 text-center">{progress.details}</p>}
//         </div>
//       )}

//       {/* Results */}
//       {results && (
//         <div className="py-4">
//           <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
//             <div className="flex items-center gap-2 mb-3">
//               <CheckCircle className="w-5 h-5 text-green-600" />
//               <h3 className="font-semibold text-green-800">Sincronización Completada</h3>
//             </div>
//             <div className="grid grid-cols-2 gap-4 text-sm">
//               <div>
//                 <span className="text-gray-700 font-medium">Total procesados:</span>
//                 <span className="font-bold ml-2">{results.total}</span>
//               </div>
//               <div>
//                 <span className="text-gray-700 font-medium">Creados:</span>
//                 <span className="font-bold ml-2 text-green-600">{results.created}</span>
//               </div>
//               <div>
//                 <span className="text-gray-700 font-medium">Actualizados:</span>
//                 <span className="font-bold ml-2 text-blue-600">{results.updated}</span>
//               </div>
//               <div>
//                 <span className="text-gray-700 font-medium">Sin cambios:</span>
//                 <span className="font-bold ml-2 text-gray-600">{results.skipped}</span>
//               </div>
//               <div className="col-span-2">
//                 <span className="text-gray-700 font-medium">Errores:</span>
//                 <span className="font-bold ml-2 text-red-600">{results.errors}</span>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end mt-6">
//             <button
//               onClick={handleClose}
//               className="px-3 py-2 text-sm text-white rounded-[10px] focus:outline-none focus:ring-1 bg-green-500 hover:bg-green-600 focus:ring-green-500"
//             >
//               Cerrar
//             </button>
//           </div>
//         </div>
//       )}
//     </Modal>
//   )
// }

// export default MassiveUpdateModal
"use client"

import { useState, useEffect } from "react"
import { X, Download, Database, CheckCircle, AlertCircle, RefreshCw, Wifi, WifiOff } from "lucide-react"
import { processMassiveUpdate, checkApiConnectivity } from "../services/massiveUpdateService"

const MassiveUpdateModal = ({ isOpen, onClose, onComplete }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState({
    phase: "idle",
    message: "",
    percentage: 0,
    details: "",
  })
  const [results, setResults] = useState(null)
  const [connectivity, setConnectivity] = useState(null)
  const [connectivityLoading, setConnectivityLoading] = useState(false)

  // Verificar conectividad automáticamente al abrir el modal
  useEffect(() => {
    if (isOpen && !connectivity && !connectivityLoading) {
      checkConnectivityAutomatically()
    }
  }, [isOpen])

  // useEffect para manejar cuando se completa la sincronización
  useEffect(() => {
    if (progress.phase === "completed" && !results) {
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
      } catch (error) {
        console.error("❌ Error procesando resultados:", error)
      }
    }
  }, [progress.phase, results, progress.details])

  const checkConnectivityAutomatically = async () => {
    setConnectivityLoading(true)
    try {
      const result = await checkApiConnectivity()
      setConnectivity(result)
    } catch (error) {
      console.error("Error verificando conectividad:", error)
      setConnectivity({
        external: false,
        local: false,
        errors: [error.message],
      })
    } finally {
      setConnectivityLoading(false)
    }
  }

  const handleStartUpdate = async () => {
    setIsProcessing(true)
    setResults(null)
    setProgress({
      phase: "starting",
      message: "Iniciando sincronización...",
      percentage: 0,
      details: "",
    })

    try {
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

  const handleClose = async () => {
    console.log("🔒 Intentando cerrar modal...")
    if (isProcessing) {
      console.log("⚠️ No se puede cerrar durante el procesamiento")
      return
    }

    // Si hay resultados, ejecutar onComplete antes de cerrar
    if (results && onComplete) {
      try {
        console.log("📞 Ejecutando onComplete con resultados:", results)
        await onComplete(results)
        console.log("✅ onComplete ejecutado exitosamente")
      } catch (error) {
        console.error("❌ Error en onComplete:", error)
      }
    }

    // Reset state
    console.log("🔄 Reseteando estado del modal...")
    setProgress({
      phase: "idle",
      message: "",
      percentage: 0,
      details: "",
    })
    setResults(null)
    setConnectivity(null)
    setConnectivityLoading(false)

    // Cerrar modal
    console.log("🚪 Cerrando modal...")
    onClose()
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isProcessing) {
      handleClose()
    }
  }

  const getPhaseIcon = () => {
    switch (progress.phase) {
      case "connectivity":
        return <Wifi className="w-5 h-5 text-blue-500 animate-pulse" />
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
      case "connectivity":
        return "Verificando Conectividad"
      case "download":
        return "Descargando desde API Externa"
      case "sync":
        return "Sincronizando con Base de Datos Local"
      case "completed":
        return "Sincronización Completada"
      case "error":
        return "Error en la Sincronización"
      default:
        return "Sincronización Masiva de Programas"
    }
  }

  // No renderizar nada si el modal no está abierto
  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            {getPhaseIcon()}
            <h1 className="text-xl font-bold text-[#1f384c]">{getPhaseTitle()}</h1>
          </div>
          {!isProcessing && (
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 transition-colors" type="button">
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {!isProcessing && !results && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Columna izquierda - Información principal */}
              <div className="space-y-4">
                <div className="text-center lg:text-left">
                  <RefreshCw className="w-16 h-16 text-[#1f384c] mx-auto lg:mx-0 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Sincronización Masiva de Programas</h3>
                  <p className="text-sm font-medium text-gray-700">
                    Esta operación descargará todos los programas de la API externa y los sincronizará con tu base de
                    datos local.
                  </p>
                </div>

                {/* Información de conectividad */}
                <div className="p-4 bg-gray-50 rounded-md border border-gray-300">
                  <h4 className="font-medium text-gray-800 mb-3">Estado de Conectividad</h4>
                  {connectivityLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                      <span className="text-gray-600">Verificando conectividad...</span>
                    </div>
                  ) : connectivity ? (
                    <div className="space-y-2">
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
                      {connectivity.errors && connectivity.errors.length > 0 && (
                        <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                          <strong>Errores:</strong>
                          <ul className="list-disc list-inside mt-1">
                            {connectivity.errors.map((error, index) => (
                              <li key={index}>{error}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-500">Verificando conectividad...</div>
                  )}
                </div>
              </div>

              {/* Columna derecha - Advertencias y acciones */}
              <div className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium mb-2">Importante:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Se sugiere realizar la actualización en horario nocturno</li>
                        <li>Esta operación puede tardar varios minutos</li>
                        <li>Los duplicados se actualizarán automáticamente</li>
                        <li>No cierres esta ventana durante el proceso</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Botón de acción */}
                <div className="space-y-3">
                  <button
                    onClick={handleStartUpdate}
                    type="button"
                    disabled={!connectivity || !connectivity.external || !connectivity.local || connectivityLoading}
                    className={`w-full px-4 py-3 text-sm text-white rounded-[10px] focus:outline-none focus:ring-2 transition-colors ${
                      !connectivity || !connectivity.external || !connectivity.local || connectivityLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 hover:bg-green-600 focus:ring-green-500"
                    }`}
                  >
                    {connectivityLoading
                      ? "Verificando Conectividad..."
                      : !connectivity || !connectivity.external || !connectivity.local
                        ? "Error de Conectividad - No se puede iniciar"
                        : "Iniciar Sincronización"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Progress */}
          {isProcessing && (
            <div className="max-w-2xl mx-auto">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">{progress.message}</span>
                  <span className="text-sm text-gray-500">{Math.round(progress.percentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-[#1f384c] h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress.percentage}%` }}
                  />
                </div>
              </div>
              {progress.details && (
                <p className="text-sm font-medium text-gray-700 text-center bg-gray-50 p-3 rounded-md">
                  {progress.details}
                </p>
              )}
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-green-50 border border-green-200 rounded-md p-6 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-800">Sincronización Completada</h3>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-3 bg-white rounded-md">
                    <span className="block text-gray-700 font-medium">Total procesados</span>
                    <span className="block text-xl font-bold text-gray-900 mt-1">{results.total}</span>
                  </div>
                  <div className="text-center p-3 bg-white rounded-md">
                    <span className="block text-gray-700 font-medium">Creados</span>
                    <span className="block text-xl font-bold text-green-600 mt-1">{results.created}</span>
                  </div>
                  <div className="text-center p-3 bg-white rounded-md">
                    <span className="block text-gray-700 font-medium">Actualizados</span>
                    <span className="block text-xl font-bold text-blue-600 mt-1">{results.updated}</span>
                  </div>
                  <div className="text-center p-3 bg-white rounded-md">
                    <span className="block text-gray-700 font-medium">Sin cambios</span>
                    <span className="block text-xl font-bold text-gray-600 mt-1">{results.skipped}</span>
                  </div>
                </div>
                {Number.parseInt(results.errors) > 0 && (
                  <div className="mt-4 text-center p-3 bg-red-50 rounded-md border border-red-200">
                    <span className="block text-gray-700 font-medium">Errores</span>
                    <span className="block text-xl font-bold text-red-600 mt-1">{results.errors}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                <button
                  onClick={handleClose}
                  type="button"
                  className="px-6 py-3 text-sm text-white rounded-[10px] focus:outline-none focus:ring-2 bg-green-500 hover:bg-green-600 focus:ring-green-500 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MassiveUpdateModal
