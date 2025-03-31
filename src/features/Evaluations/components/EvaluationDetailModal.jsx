"use client"

import { useEffect, useRef, useState } from "react"
import { FiDownload, FiPlay, FiPause } from "react-icons/fi"

const EvaluationDetailModal = ({ evaluation, isOpen, onClose }) => {
  const modalRef = useRef(null)
  const [audioPlaying, setAudioPlaying] = useState(null)
  const audioRefs = useRef({})

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      // Pause any playing audio when modal closes
      Object.values(audioRefs.current).forEach((audio) => {
        if (audio && !audio.paused) {
          audio.pause()
        }
      })
    }
  }, [isOpen, onClose])

  const handlePlayAudio = (id) => {
    // Pause any currently playing audio
    if (audioPlaying && audioPlaying !== id) {
      const currentAudio = audioRefs.current[audioPlaying]
      if (currentAudio && !currentAudio.paused) {
        currentAudio.pause()
      }
    }

    const audio = audioRefs.current[id]
    if (audio) {
      if (audio.paused) {
        audio.play()
        setAudioPlaying(id)
      } else {
        audio.pause()
        setAudioPlaying(null)
      }
    }
  }

  const handleAudioEnded = () => {
    setAudioPlaying(null)
  }

  const renderCompletarEspacios = (pregunta) => {
    if (!pregunta.completarTexto) return null

    // Reemplazar los corchetes con spans para las palabras
    const parts = []
    let lastIndex = 0
    let wordIndex = 0
    const regex = /\[\s*\]/g
    let match

    while ((match = regex.exec(pregunta.completarTexto)) !== null) {
      // Texto antes del corchete
      if (match.index > lastIndex) {
        parts.push(pregunta.completarTexto.substring(lastIndex, match.index))
      }

      // Palabra para completar
      const palabra = pregunta.palabrasCompletar[wordIndex] || ""
      parts.push(
        <span key={wordIndex} className="inline-block px-2 py-1 mx-1 bg-gray-100 rounded border border-gray-300">
          {palabra}
        </span>,
      )

      wordIndex++
      lastIndex = match.index + match[0].length
    }

    // Texto restante después del último corchete
    if (lastIndex < pregunta.completarTexto.length) {
      parts.push(pregunta.completarTexto.substring(lastIndex))
    }

    return <div className="mt-2">{parts}</div>
  }

  if (!isOpen || !evaluation) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto py-8">
      <div ref={modalRef} className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-[18px] font-bold text-center mb-6">{evaluation.nombre}</h2>

          {/* Descripción General */}
          <div className="border border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="text-[16px] font-bold mb-2">Descripción General</h3>
            <p className="text-[14px] text-gray-700">{evaluation.descripcion || "Sin descripción"}</p>
          </div>

          {/* Material */}
          {evaluation.material && (
            <div className="border border-gray-300 rounded-lg p-4 mb-4">
              <h3 className="text-[16px] font-bold mb-2">Material</h3>
              <div className="flex items-center justify-between bg-gray-50 border border-gray-300 rounded p-2">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-[14px]">
                    {typeof evaluation.material === "string"
                      ? evaluation.material
                      : evaluation.material.name || "Material adjunto"}
                  </span>
                </div>
                <button className="text-gray-600 hover:text-gray-800">
                  <FiDownload size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Preguntas */}
          <div className="border border-gray-300 rounded-lg p-4">
            <h3 className="text-[16px] font-bold mb-2">Preguntas</h3>
            <p className="text-[14px] text-gray-500 mb-4">Total preguntas: {evaluation.preguntas.length}</p>

            <div className="space-y-4">
              {evaluation.preguntas.map((pregunta, index) => (
                <div key={pregunta.id} className="border border-gray-300 rounded-lg p-4">
                  {/* Título de la pregunta según su tipo */}
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-[14px] font-bold">
                      {pregunta.tipo === "seleccion" && "Selección múltiple"}
                      {pregunta.tipo === "verdaderoFalso" && "Verdadero o falso"}
                      {pregunta.tipo === "imagen" && "Pregunta con imagen"}
                      {pregunta.tipo === "audio" && "Pregunta con audio"}
                      {pregunta.tipo === "completar" && "Completar espacios"}
                      {" | pregunta "}
                      {index + 1}
                    </h4>
                    <span className="text-[14px] font-medium">Puntos: {pregunta.puntaje}</span>
                  </div>

                  {/* Enunciado */}
                  <div className="mb-2">
                    <p className="text-[14px] text-gray-500">Enunciado</p>
                    <p className="text-[14px]">{pregunta.texto || pregunta.completarTexto || "Sin enunciado"}</p>
                  </div>

                  {/* Imagen (si aplica) */}
                  {pregunta.tipo === "imagen" && pregunta.imagen && (
                    <div className="mb-4">
                      <p className="text-[14px] text-gray-500 mb-1">Imagen</p>
                      <div className="border border-gray-300 rounded-lg p-2 flex justify-center">
                        {typeof pregunta.imagen === "string" ? (
                          <img
                            src={pregunta.imagen || "/placeholder.svg"}
                            alt="Imagen de la pregunta"
                            className="max-h-48 object-contain"
                          />
                        ) : (
                          <div className="w-32 h-32 border border-gray-300 rounded-lg flex items-center justify-center">
                            <svg
                              className="w-16 h-16 text-gray-300"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Audio (si aplica) */}
                  {pregunta.tipo === "audio" && pregunta.audio && (
                    <div className="mb-4">
                      <p className="text-[14px] text-gray-500 mb-1">Audio</p>
                      <div className="border border-gray-300 rounded-lg p-2 flex items-center">
                        <button
                          onClick={() => handlePlayAudio(pregunta.id)}
                          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 mr-2"
                        >
                          {audioPlaying === pregunta.id ? <FiPause /> : <FiPlay />}
                        </button>

                        <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gray-400 ${audioPlaying === pregunta.id ? "animate-pulse" : ""}`}
                            style={{ width: audioPlaying === pregunta.id ? "100%" : "0%" }}
                          ></div>
                        </div>

                        <audio
                          ref={(el) => (audioRefs.current[pregunta.id] = el)}
                          src={
                            typeof pregunta.audio === "string" ? pregunta.audio : URL.createObjectURL(pregunta.audio)
                          }
                          onEnded={handleAudioEnded}
                          className="hidden"
                        />

                        <button className="p-2 ml-2">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 012.728-2.728"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Opciones para preguntas de selección múltiple, verdadero/falso, imagen y audio */}
                  {(pregunta.tipo === "seleccion" || pregunta.tipo === "imagen" || pregunta.tipo === "audio") && (
                    <div>
                      <p className="text-[14px] text-gray-500 mb-1">Opciones</p>
                      <div className="space-y-2">
                        {pregunta.opciones &&
                          pregunta.opciones.map((opcion, idx) => (
                            <div key={idx} className="flex items-center">
                              <div
                                className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${idx === pregunta.respuestaCorrecta ? "bg-black border-black" : "border-gray-400"}`}
                              >
                                {idx === pregunta.respuestaCorrecta && (
                                  <div className="w-2 h-2 rounded-full bg-white"></div>
                                )}
                              </div>
                              <span className="text-[14px]">{opcion}</span>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Opciones para verdadero/falso */}
                  {pregunta.tipo === "verdaderoFalso" && (
                    <div>
                      <p className="text-[14px] text-gray-500 mb-1">Opciones</p>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${pregunta.respuestaCorrecta === 0 ? "bg-black border-black" : "border-gray-400"}`}
                          >
                            {pregunta.respuestaCorrecta === 0 && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                          <span className="text-[14px]">Verdadero</span>
                        </div>
                        <div className="flex items-center">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center mr-2 ${pregunta.respuestaCorrecta === 1 ? "bg-black border-black" : "border-gray-400"}`}
                          >
                            {pregunta.respuestaCorrecta === 1 && <div className="w-2 h-2 rounded-full bg-white"></div>}
                          </div>
                          <span className="text-[14px]">Falso</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Completar espacios */}
                  {pregunta.tipo === "completar" && (
                    <>
                      {renderCompletarEspacios(pregunta)}

                      {pregunta.palabrasCompletar && pregunta.palabrasCompletar.length > 0 && (
                        <div className="mt-3">
                          <p className="text-[14px] text-gray-500 mb-1">Palabras a completar</p>
                          <div className="flex flex-wrap gap-2">
                            {pregunta.palabrasCompletar.map((palabra, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-3 py-1 bg-gray-100 rounded border border-gray-300 text-[14px]"
                              >
                                {palabra}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={onClose}
              className="px-8 py-2 bg-[#f44144] text-white rounded-md text-[14px] hover:bg-red-600 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EvaluationDetailModal

