"use client"

import { useState, useEffect } from "react"
import { FiUpload, FiX, FiChevronDown, FiPlus } from "react-icons/fi"

const EvaluationForm = ({ evaluation = null, onSubmit, onCancel }) => {
  // Modificar el estado inicial para incluir un modo de edición de pregunta
  const [formData, setFormData] = useState({
    nombre: "",
    tipoEvaluacion: "Examen",
    estado: "Activo",
    descripcion: "",
    material: null,
    preguntas: [],
  })

  const [showQuestionTypes, setShowQuestionTypes] = useState(false)
  const [currentQuestionType, setCurrentQuestionType] = useState(null)
  const [questionData, setQuestionData] = useState({
    tipo: "",
    texto: "",
    opciones: ["", "", "", ""],
    respuestaCorrecta: 0,
    puntaje: 10,
    imagen: null,
    audio: null,
    completarTexto: "",
    palabrasCompletar: ["", ""],
    opcionesRelleno: ["", "", ""],
  })
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null)

  useEffect(() => {
    if (evaluation) {
      setFormData({
        nombre: evaluation.nombre || "",
        tipoEvaluacion: evaluation.tipoEvaluacion || "Examen",
        estado: evaluation.estado || "Activo",
        descripcion: evaluation.descripcion || "",
        material: evaluation.material || null,
        preguntas: evaluation.preguntas || [],
      })
    }
  }, [evaluation])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleQuestionChange = (e) => {
    const { name, value } = e.target
    setQuestionData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData((prev) => ({
        ...prev,
        material: file,
      }))
    }
  }

  const handleQuestionFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setQuestionData((prev) => ({
        ...prev,
        imagen: file,
      }))
    }
  }

  const handleQuestionAudioChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setQuestionData((prev) => ({
        ...prev,
        audio: file,
      }))
    }
  }

  // Agregar función para editar una pregunta existente
  const handleEditQuestion = (index) => {
    const questionToEdit = formData.preguntas[index]
    setQuestionData({
      ...questionToEdit,
      // Asegurarse de que las opciones de relleno existan
      opcionesRelleno: questionToEdit.opcionesRelleno || ["", "", ""],
    })
    setCurrentQuestionType(questionToEdit.tipo)
    setEditingQuestionIndex(index)
  }

  // Modificar la función addQuestion para manejar tanto agregar como actualizar
  const addQuestion = () => {
    if (editingQuestionIndex !== null) {
      // Actualizar pregunta existente
      setFormData((prev) => {
        const updatedPreguntas = [...prev.preguntas]
        updatedPreguntas[editingQuestionIndex] = { ...questionData, id: prev.preguntas[editingQuestionIndex].id }
        return {
          ...prev,
          preguntas: updatedPreguntas,
        }
      })
      setEditingQuestionIndex(null)
    } else {
      // Agregar nueva pregunta
      setFormData((prev) => ({
        ...prev,
        preguntas: [...prev.preguntas, { ...questionData, id: Date.now() }],
      }))
    }

    // Reset question form
    setQuestionData({
      tipo: "",
      texto: "",
      opciones: ["", "", "", ""],
      respuestaCorrecta: 0,
      puntaje: 10,
      imagen: null,
      audio: null,
      completarTexto: "",
      palabrasCompletar: ["", ""],
      opcionesRelleno: ["", "", ""],
    })
    setCurrentQuestionType(null)
  }

  const handleOptionChange = (index, value) => {
    const newOptions = [...questionData.opciones]
    newOptions[index] = value
    setQuestionData((prev) => ({
      ...prev,
      opciones: newOptions,
    }))
  }

  const handlePalabraCompletarChange = (index, value) => {
    const newPalabras = [...questionData.palabrasCompletar]
    newPalabras[index] = value
    setQuestionData((prev) => ({
      ...prev,
      palabrasCompletar: newPalabras,
    }))
  }

  const handleOpcionRellenoChange = (index, value) => {
    const newOpciones = [...questionData.opcionesRelleno]
    newOpciones[index] = value
    setQuestionData((prev) => ({
      ...prev,
      opcionesRelleno: newOpciones,
    }))
  }

  const addPalabraCompletar = () => {
    setQuestionData((prev) => ({
      ...prev,
      palabrasCompletar: [...prev.palabrasCompletar, ""],
    }))
  }

  const addOpcionRelleno = () => {
    setQuestionData((prev) => ({
      ...prev,
      opcionesRelleno: [...prev.opcionesRelleno, ""],
    }))
  }

  // Agregar función para eliminar una opción de relleno
  const removeOpcionRelleno = (index) => {
    if (questionData.opcionesRelleno.length > 1) {
      setQuestionData((prev) => ({
        ...prev,
        opcionesRelleno: prev.opcionesRelleno.filter((_, i) => i !== index),
      }))
    }
  }

  const selectQuestionType = (tipo) => {
    setCurrentQuestionType(tipo)
    setQuestionData((prev) => ({
      ...prev,
      tipo: tipo,
    }))
    setShowQuestionTypes(false)
  }

  const getTotalPoints = () => {
    return formData.preguntas.reduce((total, pregunta) => total + Number(pregunta.puntaje), 0)
  }

  const isPuntajeValid = () => {
    const total = getTotalPoints()
    return total === 100
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isPuntajeValid()) {
      onSubmit(formData)
    } else {
      // Si el puntaje no es válido, mostrar un mensaje o scroll hacia la advertencia
      const alertElement = document.getElementById("puntaje-alert")
      if (alertElement) {
        alertElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const handleCompletarTextoChange = (e) => {
    const text = e.target.value
    setQuestionData((prev) => ({
      ...prev,
      completarTexto: text,
    }))

    // Contar cuántos espacios [] hay en el texto
    const matches = text.match(/\[\s*\]/g) || []
    const numSpaces = matches.length

    // Ajustar el array de palabras para completar según el número de espacios
    if (numSpaces > questionData.palabrasCompletar.length) {
      // Añadir campos adicionales si hay más espacios
      const newPalabras = [...questionData.palabrasCompletar]
      for (let i = questionData.palabrasCompletar.length; i < numSpaces; i++) {
        newPalabras.push("")
      }
      setQuestionData((prev) => ({
        ...prev,
        palabrasCompletar: newPalabras,
      }))
    } else if (numSpaces < questionData.palabrasCompletar.length) {
      // Reducir campos si hay menos espacios
      setQuestionData((prev) => ({
        ...prev,
        palabrasCompletar: prev.palabrasCompletar.slice(0, numSpaces),
      }))
    }
  }

  return (
    <div className="bg-white rounded-lg p-4 w-full max-w-2xl mx-auto">
      <h2 className="text-[18px] font-bold text-center text-[#1f384c] mb-4">
        {evaluation && evaluation.id ? "EDITAR EVALUACIÓN" : "CREAR EVALUACION"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <div>
            <label className="block text-[14px] font-medium mb-1">Nombre de la Actividad</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
              placeholder="Ingrese el nombre de la actividad"
              required
            />
          </div>

          <div>
            <label className="block text-[14px] font-medium mb-1">Tipo evaluación</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tipoEvaluacion"
                  checked={formData.tipoEvaluacion === "Examen"}
                  onChange={() => handleRadioChange("tipoEvaluacion", "Examen")}
                  className="mr-2"
                />
                <span className="text-[14px]">Examen</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tipoEvaluacion"
                  checked={formData.tipoEvaluacion === "Actividad"}
                  onChange={() => handleRadioChange("tipoEvaluacion", "Actividad")}
                  className="mr-2"
                />
                <span className="text-[14px]">Actividad</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-medium mb-1">Estado</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="estado"
                  checked={formData.estado === "Activo"}
                  onChange={() => handleRadioChange("estado", "Activo")}
                  className="mr-2"
                />
                <span className="text-[14px]">Activo</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="estado"
                  checked={formData.estado === "Inactivo"}
                  onChange={() => handleRadioChange("estado", "Inactivo")}
                  className="mr-2"
                />
                <span className="text-[14px]">Inactivo</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-medium mb-1">Material de referencia</label>
            <div>
              <label className="block text-[14px] font-medium mb-1">Descripción General</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-[14px] min-h-[80px]"
                placeholder="Escriba una descripción general sobre esta actividad..."
              />
            </div>
          </div>

          <div>
            <label className="block text-[14px] font-medium mb-1">Material</label>
            <div className="flex items-center">
              <input type="file" id="material" onChange={handleFileChange} className="hidden" />
              <div className="flex-1 border border-gray-300 rounded-l-md p-2 text-[14px] bg-white text-gray-500 truncate">
                {formData.material ? formData.material.name : "Seleccionar archivo. Ningún archivo seleccionado"}
              </div>
              <label
                htmlFor="material"
                className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-r-md cursor-pointer text-[14px]"
              >
                <FiUpload className="mr-2" />
                Subir
              </label>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-[14px] font-medium">Preguntas</label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowQuestionTypes(!showQuestionTypes)}
                  className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md text-[14px]"
                >
                  Agregar nueva pregunta
                  <FiChevronDown className="ml-2" />
                </button>
                {showQuestionTypes && (
                  <div className="absolute right-0 bottom-full mb-1 w-64 bg-[#f3edf7] rounded-md shadow-lg z-10 p-2">
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => selectQuestionType("seleccion")}
                        className="block w-full text-left px-3 py-2 text-[14px] hover:bg-[#e8def8] rounded-md"
                      >
                        Selección múltiple única respuesta
                      </button>
                      <button
                        type="button"
                        onClick={() => selectQuestionType("verdaderoFalso")}
                        className="block w-full text-left px-3 py-2 text-[14px] hover:bg-[#e8def8] rounded-md"
                      >
                        Verdadero o falso
                      </button>
                      <button
                        type="button"
                        onClick={() => selectQuestionType("imagen")}
                        className="block w-full text-left px-3 py-2 text-[14px] hover:bg-[#e8def8] rounded-md"
                      >
                        Imagen con preguntas
                      </button>
                      <button
                        type="button"
                        onClick={() => selectQuestionType("audio")}
                        className="block w-full text-left px-3 py-2 text-[14px] hover:bg-[#e8def8] rounded-md"
                      >
                        Audio con pregunta
                      </button>
                      <button
                        type="button"
                        onClick={() => selectQuestionType("completar")}
                        className="block w-full text-left px-3 py-2 text-[14px] hover:bg-[#e8def8] rounded-md"
                      >
                        Completar espacios
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Lista de preguntas agregadas */}
            {formData.preguntas.length > 0 && (
              <div className="mb-4">
                <h3 className="text-[14px] font-medium mb-2">Preguntas agregadas:</h3>
                <div className="space-y-2">
                  {formData.preguntas.map((pregunta, index) => (
                    <div
                      key={pregunta.id}
                      className="flex justify-between items-center p-2 border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleEditQuestion(index)}
                    >
                      <div>
                        <p className="text-[14px]">
                          {index + 1}.{" "}
                          {pregunta.texto
                            ? pregunta.texto.substring(0, 30)
                            : pregunta.completarTexto
                              ? pregunta.completarTexto.substring(0, 30)
                              : ""}
                          {(pregunta.texto && pregunta.texto.length > 30) ||
                          (pregunta.completarTexto && pregunta.completarTexto.length > 30)
                            ? "..."
                            : ""}
                        </p>
                        <p className="text-[12px] text-gray-500">
                          Tipo: {pregunta.tipo} | Puntaje: {pregunta.puntaje}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setFormData((prev) => ({
                            ...prev,
                            preguntas: prev.preguntas.filter((_, i) => i !== index),
                          }))
                        }}
                        className="text-red-500"
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Formulario de pregunta con imagen */}
            {currentQuestionType === "imagen" && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[14px] font-medium">Pregunta con imagen</h3>
                  <div className="flex items-center">
                    <span className="text-[14px] mr-2">Puntos:</span>
                    <input
                      type="number"
                      name="puntaje"
                      value={questionData.puntaje}
                      onChange={handleQuestionChange}
                      className="w-16 p-1 border border-gray-300 rounded-md text-[14px]"
                      min="1"
                    />
                    <button type="button" onClick={() => setCurrentQuestionType(null)} className="ml-2 text-red-500">
                      <FiX />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="file"
                      id="imagen"
                      accept="image/*"
                      onChange={handleQuestionFileChange}
                      className="hidden"
                    />
                    <div className="flex-1 border border-gray-300 rounded-l-md p-2 text-[14px] bg-white text-gray-500 truncate">
                      {questionData.imagen
                        ? questionData.imagen.name
                        : "Seleccionar archivo. Ningún archivo seleccionado"}
                    </div>
                    <label
                      htmlFor="imagen"
                      className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-r-md cursor-pointer text-[14px]"
                    >
                      <FiUpload className="mr-2" />
                      Subir
                    </label>
                  </div>

                  <textarea
                    name="texto"
                    value={questionData.texto}
                    onChange={handleQuestionChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
                    placeholder="Ingrese la pregunta relacionada con la imagen"
                    required
                  />

                  {[0, 1, 2, 3].map((index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        name="respuestaCorrecta"
                        checked={questionData.respuestaCorrecta === index}
                        onChange={() => setQuestionData((prev) => ({ ...prev, respuestaCorrecta: index }))}
                        className="mr-2"
                      />
                      <input
                        type="text"
                        value={questionData.opciones[index]}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
                        placeholder={`Opción ${index + 1}`}
                        required
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="w-full py-2 bg-[#46ae69] text-white rounded-md hover:bg-green-600 transition-colors text-[14px]"
                  >
                    {editingQuestionIndex !== null ? "Actualizar Pregunta" : "Agregar Pregunta"}
                  </button>
                </div>
              </div>
            )}

            {/* Formulario de pregunta de selección múltiple */}
            {currentQuestionType === "seleccion" && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[14px] font-medium">Pregunta Selección Múltiple Única respuesta</h3>
                  <div className="flex items-center">
                    <span className="text-[14px] mr-2">Puntos:</span>
                    <input
                      type="number"
                      name="puntaje"
                      value={questionData.puntaje}
                      onChange={handleQuestionChange}
                      className="w-16 p-1 border border-gray-300 rounded-md text-[14px]"
                      min="1"
                    />
                    <button type="button" onClick={() => setCurrentQuestionType(null)} className="ml-2 text-red-500">
                      <FiX />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <textarea
                    name="texto"
                    value={questionData.texto}
                    onChange={handleQuestionChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
                    placeholder="Escriba la pregunta aquí"
                    required
                  />

                  {[0, 1, 2, 3].map((index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        name="respuestaCorrecta"
                        checked={questionData.respuestaCorrecta === index}
                        onChange={() => setQuestionData((prev) => ({ ...prev, respuestaCorrecta: index }))}
                        className="mr-2"
                      />
                      <input
                        type="text"
                        value={questionData.opciones[index]}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
                        placeholder={`Opción ${index + 1}`}
                        required
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="w-full py-2 bg-[#46ae69] text-white rounded-md hover:bg-green-600 transition-colors text-[14px]"
                  >
                    {editingQuestionIndex !== null ? "Actualizar Pregunta" : "Agregar Pregunta"}
                  </button>
                </div>
              </div>
            )}

            {/* Formulario de pregunta verdadero/falso */}
            {currentQuestionType === "verdaderoFalso" && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[14px] font-medium">Pregunta Verdadero o Falso</h3>
                  <div className="flex items-center">
                    <span className="text-[14px] mr-2">Puntos:</span>
                    <input
                      type="number"
                      name="puntaje"
                      value={questionData.puntaje}
                      onChange={handleQuestionChange}
                      className="w-16 p-1 border border-gray-300 rounded-md text-[14px]"
                      min="1"
                    />
                    <button type="button" onClick={() => setCurrentQuestionType(null)} className="ml-2 text-red-500">
                      <FiX />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <textarea
                    name="texto"
                    value={questionData.texto}
                    onChange={handleQuestionChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
                    placeholder="Escriba la pregunta aquí"
                    required
                  />

                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="respuestaCorrecta"
                      checked={questionData.respuestaCorrecta === 0}
                      onChange={() => setQuestionData((prev) => ({ ...prev, respuestaCorrecta: 0 }))}
                      className="mr-2"
                    />
                    <span className="text-[14px]">Verdadero</span>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="respuestaCorrecta"
                      checked={questionData.respuestaCorrecta === 1}
                      onChange={() => setQuestionData((prev) => ({ ...prev, respuestaCorrecta: 1 }))}
                      className="mr-2"
                    />
                    <span className="text-[14px]">Falso</span>
                  </div>

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="w-full py-2 bg-[#46ae69] text-white rounded-md hover:bg-green-600 transition-colors text-[14px]"
                  >
                    {editingQuestionIndex !== null ? "Actualizar Pregunta" : "Agregar Pregunta"}
                  </button>
                </div>
              </div>
            )}

            {/* Formulario de pregunta con audio */}
            {currentQuestionType === "audio" && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[14px] font-medium">Pregunta con audio</h3>
                  <div className="flex items-center">
                    <span className="text-[14px] mr-2">Puntos:</span>
                    <input
                      type="number"
                      name="puntaje"
                      value={questionData.puntaje}
                      onChange={handleQuestionChange}
                      className="w-16 p-1 border border-gray-300 rounded-md text-[14px]"
                      min="1"
                    />
                    <button type="button" onClick={() => setCurrentQuestionType(null)} className="ml-2 text-red-500">
                      <FiX />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="file"
                      id="audio"
                      accept="audio/*"
                      onChange={handleQuestionAudioChange}
                      className="hidden"
                    />
                    <div className="flex-1 border border-gray-300 rounded-l-md p-2 text-[14px] bg-white text-gray-500 truncate">
                      {questionData.audio
                        ? questionData.audio.name
                        : "Seleccionar archivo. Ningún archivo seleccionado"}
                    </div>
                    <label
                      htmlFor="audio"
                      className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-r-md cursor-pointer text-[14px]"
                    >
                      <FiUpload className="mr-2" />
                      Subir
                    </label>
                  </div>

                  <textarea
                    name="texto"
                    value={questionData.texto}
                    onChange={handleQuestionChange}
                    className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
                    placeholder="Ingrese la pregunta relacionada con el audio"
                    required
                  />

                  {[0, 1, 2, 3].map((index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        name="respuestaCorrecta"
                        checked={questionData.respuestaCorrecta === index}
                        onChange={() => setQuestionData((prev) => ({ ...prev, respuestaCorrecta: index }))}
                        className="mr-2"
                      />
                      <input
                        type="text"
                        value={questionData.opciones[index]}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
                        placeholder={`Opción ${index + 1}`}
                        required
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="w-full py-2 bg-[#46ae69] text-white rounded-md hover:bg-green-600 transition-colors text-[14px]"
                  >
                    {editingQuestionIndex !== null ? "Actualizar Pregunta" : "Agregar Pregunta"}
                  </button>
                </div>
              </div>
            )}

            {currentQuestionType === "completar" && (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[14px] font-medium">Pregunta de Completar Espacios</h3>
                  <div className="flex items-center">
                    <span className="text-[14px] mr-2">Puntos:</span>
                    <input
                      type="number"
                      name="puntaje"
                      value={questionData.puntaje}
                      onChange={handleQuestionChange}
                      className="w-16 p-1 border border-gray-300 rounded-md text-[14px]"
                      min="1"
                    />
                    <button type="button" onClick={() => setCurrentQuestionType(null)} className="ml-2 text-red-500">
                      <FiX />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-[12px] text-gray-500 mb-1">
                      Usa corchetes [] para indicar los espacios a completar. Ejemplo: "The [cat] is [black]"
                    </p>
                    <textarea
                      name="completarTexto"
                      value={questionData.completarTexto}
                      onChange={handleCompletarTextoChange}
                      className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
                      placeholder="Escribe el texto con espacios para completar usando []"
                      required
                    />
                  </div>

                  {questionData.palabrasCompletar.length > 0 && (
                    <div>
                      <h4 className="text-[14px] font-medium mb-2">Palabras para Completar</h4>
                      {questionData.palabrasCompletar.map((palabra, index) => (
                        <div key={index} className="mb-2">
                          <input
                            type="text"
                            value={palabra}
                            onChange={(e) => handlePalabraCompletarChange(index, e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
                            placeholder={`Palabra ${index + 1}`}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Opciones de relleno para completar espacios */}
                  <div>
                    <div className="flex justify-between items-center">
                      <h4 className="text-[14px] font-medium mb-2">Opciones de Relleno</h4>
                      <button
                        type="button"
                        onClick={addOpcionRelleno}
                        className="flex items-center text-[14px] text-blue-600 hover:text-blue-800"
                      >
                        <FiPlus className="mr-1" /> Agregar opción
                      </button>
                    </div>
                    {questionData.opcionesRelleno.map((opcion, index) => (
                      <div key={index} className="mb-2 flex items-center">
                        <input
                          type="text"
                          value={opcion}
                          onChange={(e) => handleOpcionRellenoChange(index, e.target.value)}
                          className="flex-1 p-2 border border-gray-300 rounded-md text-[14px]"
                          placeholder={`Opción de relleno ${index + 1}`}
                        />
                        <button
                          type="button"
                          onClick={() => removeOpcionRelleno(index)}
                          className="ml-2 p-1 text-red-500 hover:text-red-700"
                          disabled={questionData.opcionesRelleno.length <= 1}
                        >
                          <FiX />
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="w-full py-2 bg-[#46ae69] text-white rounded-md hover:bg-green-600 transition-colors text-[14px]"
                  >
                    {editingQuestionIndex !== null ? "Actualizar Pregunta" : "Agregar Pregunta"}
                  </button>
                </div>
              </div>
            )}
          </div>

          {formData.preguntas.length > 0 && !isPuntajeValid() && (
            <div className="flex items-center mt-6 border-t border-gray-200 pt-4" id="puntaje-alert">
              <div className="flex items-center p-2 w-full">
                <div className="text-red-500 mr-3">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 0L40 40H0L20 0Z" fill="#f44144" />
                    <text x="20" y="30" textAnchor="middle" fill="white" fontSize="24" fontWeight="bold">
                      !
                    </text>
                  </svg>
                </div>
                <div>
                  <p className="text-[16px] font-bold">Total puntos de las Preguntas</p>
                  <p className="text-[14px] text-gray-500">
                    El total de puntos es {getTotalPoints()}. Debe sumar 100 para poder guardar el examen
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-center space-x-4 mt-8">
            <button
              type="button"
              onClick={onCancel}
              className="px-8 py-2 bg-[#f44144] text-white rounded-md text-[14px] hover:bg-red-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className={`px-8 py-2 ${isPuntajeValid() ? "bg-[#46ae69] hover:bg-green-600" : "bg-gray-400 cursor-not-allowed"} text-white rounded-md text-[14px] transition-colors`}
              disabled={!isPuntajeValid() && formData.preguntas.length > 0}
            >
              {evaluation ? "Guardar Cambios" : "Guardar"}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EvaluationForm

