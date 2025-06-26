"use client"

import { useState, useEffect } from "react"
import { FiUpload, FiChevronDown, FiPlus } from "react-icons/fi"
import { Trash, Pencil } from "lucide-react" // Importar Pencil para el botón de editar

const EvaluationForm = ({ evaluation = null, onSubmit, onCancel }) => {
  // Modificar el estado inicial para incluir un modo de edición de pregunta
  const [formData, setFormData] = useState({
    nombre: "",
    tematica: "", // Añadir esta línea
    tipoEvaluacion: "Examen",
    estado: "Activo",
    descripcion: "",
    material: null,
    materialName: "", // Añadir para mostrar el nombre del archivo existente
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
    imagenName: "", // Añadir para mostrar el nombre del archivo existente
    audio: null,
    audioName: "", // Añadir para mostrar el nombre del archivo existente
    completarTexto: "",
    palabrasCompletar: ["", ""],
    opcionesRelleno: ["", "", ""],
  })
  const [editingQuestionIndex, setEditingQuestionIndex] = useState(null)
  // Agregar un nuevo estado para manejar errores de validación
  const [validationError, setValidationError] = useState("")

  useEffect(() => {
    if (evaluation) {
      // Extraer nombres de archivo de las rutas
      const extractFileName = (filePath) => {
        if (!filePath) return ""
        if (typeof filePath === "string") {
          return filePath.split("/").pop() || filePath
        }
        return filePath.name || ""
      }

      setFormData({
        nombre: evaluation.nombre || "",
        tematica: evaluation.tematica || "",
        tipoEvaluacion: evaluation.tipoEvaluacion || "Examen",
        estado: evaluation.estado || "Activo",
        descripcion: evaluation.descripcion || "",
        material: evaluation.material || null,
        materialName: extractFileName(evaluation.material),
        preguntas: evaluation.preguntas
          ? evaluation.preguntas.map((pregunta) => {
              // Para cada pregunta, extraer nombres de archivo si existen
              return {
                ...pregunta,
                imagenName: pregunta.tipo === "imagen" ? extractFileName(pregunta.imagen) : "",
                audioName: pregunta.tipo === "audio" ? extractFileName(pregunta.audio) : "",
              }
            })
          : [],
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

  const handleToggleEstado = () => {
    setFormData((prev) => ({
      ...prev,
      estado: prev.estado === "Activo" ? "Inactivo" : "Activo",
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
        materialName: file.name,
      }))
    }
  }

  const handleQuestionFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setQuestionData((prev) => ({
        ...prev,
        imagen: file,
        imagenName: file.name,
      }))
    }
  }

  const handleQuestionAudioChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setQuestionData((prev) => ({
        ...prev,
        audio: file,
        audioName: file.name,
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
      // Mantener los nombres de archivo
      imagenName: questionToEdit.imagenName || "",
      audioName: questionToEdit.audioName || "",
    })
    setCurrentQuestionType(questionToEdit.tipo)
    setEditingQuestionIndex(index)
  }

  // Modificar la función addQuestion para manejar tanto agregar como actualizar
  const addQuestion = () => {
    // Validar que el enunciado no esté vacío
    if (
      (currentQuestionType !== "completar" && (!questionData.texto || questionData.texto.trim() === "")) ||
      (currentQuestionType === "completar" &&
        (!questionData.completarTexto || questionData.completarTexto.trim() === ""))
    ) {
      setValidationError("El enunciado de la pregunta no puede estar vacío")
      return
    }

    // Validar opciones según el tipo de pregunta
    if (currentQuestionType === "seleccion" || currentQuestionType === "imagen" || currentQuestionType === "audio") {
      // Verificar que todas las opciones tengan contenido
      if (questionData.opciones.some((opcion) => !opcion || opcion.trim() === "")) {
        setValidationError("Todas las opciones deben tener contenido")
        return
      }
    }

    // Validaciones adicionales para preguntas de completar espacios
    if (currentQuestionType === "completar") {
      // Verificar que haya al menos un espacio para completar
      const matches = questionData.completarTexto.match(/\[\s*\]/g) || []
      if (matches.length === 0) {
        setValidationError("Debe incluir al menos un espacio para completar usando []")
        return
      }

      // Verificar que todas las palabras a completar tengan contenido
      if (questionData.palabrasCompletar.some((palabra) => !palabra || palabra.trim() === "")) {
        setValidationError("Todas las palabras a completar deben tener contenido")
        return
      }

      // Verificar que las opciones de relleno no estén vacías
      if (questionData.opcionesRelleno.some((opcion) => !opcion || opcion.trim() === "")) {
        setValidationError("Todas las opciones de relleno deben tener contenido")
        return
      }
    }

    // Validar que se haya seleccionado un archivo para preguntas con imagen
    // Para modo edición, permitir que imagen sea un string (URL existente) o un File
    if (currentQuestionType === "imagen" && !questionData.imagen && !questionData.imagenName) {
      setValidationError("Debe seleccionar una imagen para este tipo de pregunta")
      return
    }

    // Validar que se haya seleccionado un archivo para preguntas con audio
    // Para modo edición, permitir que audio sea un string (URL existente) o un File
    if (currentQuestionType === "audio" && !questionData.audio && !questionData.audioName) {
      setValidationError("Debe seleccionar un archivo de audio para este tipo de pregunta")
      return
    }

    // Si pasa todas las validaciones, limpiar el error
    setValidationError("")

    if (editingQuestionIndex !== null) {
      // Actualizar pregunta existente
      setFormData((prev) => {
        const updatedPreguntas = [...prev.preguntas]
        updatedPreguntas[editingQuestionIndex] = {
          ...questionData,
          id: prev.preguntas[editingQuestionIndex].id,
          // Preservar URLs originales si no se seleccionó un nuevo archivo
          imagen: questionData.imagen || (questionData.imagenName ? prev.preguntas[editingQuestionIndex].imagen : null),
          audio: questionData.audio || (questionData.audioName ? prev.preguntas[editingQuestionIndex].audio : null),
        }
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
      imagenName: "",
      audio: null,
      audioName: "",
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

    // Validar que el puntaje sea válido
    if (!isPuntajeValid()) {
      // Si el puntaje no es válido, mostrar un mensaje o scroll hacia la advertencia
      const alertElement = document.getElementById("puntaje-alert")
      if (alertElement) {
        alertElement.scrollIntoView({ behavior: "smooth" })
      }
      return
    }

    // Crear un nuevo FormData para enviar los archivos
    const data = new FormData()

    // Añadir campos básicos
    data.append("nombre", formData.nombre)
    data.append("tematica", formData.tematica)
    data.append("tipoEvaluacion", formData.tipoEvaluacion)
    data.append("estado", formData.estado)
    data.append("descripcion", formData.descripcion || "")

    // Añadir el ID si estamos editando
    if (evaluation && evaluation.id) {
      data.append("id", evaluation.id)
    }

    // Añadir material si existe y es un File (nuevo archivo)
    if (formData.material instanceof File) {
      data.append("material", formData.material)
      console.log("Añadiendo nuevo material:", formData.material.name)
    } else if (formData.material && typeof formData.material === "string" && evaluation) {
      // Si es una edición y el material es una URL existente, conservarla
      data.append("materialUrl", formData.material)
      console.log("Conservando material existente:", formData.material)
    }

    // Procesar preguntas para manejar archivos
    const preguntasModificadas = JSON.parse(JSON.stringify(formData.preguntas))

    // Procesar archivos de preguntas
    formData.preguntas.forEach((pregunta, index) => {
      // Limpiar propiedades auxiliares que no queremos enviar al servidor
      delete preguntasModificadas[index].imagenName
      delete preguntasModificadas[index].audioName

      // Manejar preguntas con imágenes
      if (pregunta.tipo === "imagen") {
        if (pregunta.imagen instanceof File) {
          // Si es un nuevo archivo, añadirlo al FormData
          const fileKey = `imagen_pregunta_${index}`
          data.append(fileKey, pregunta.imagen)
          preguntasModificadas[index].imagen = fileKey
          console.log(`Añadiendo nueva imagen para pregunta ${index}:`, pregunta.imagen.name)
        } else if (typeof pregunta.imagen === "string" && pregunta.imagen) {
          // Si es una URL existente, conservarla
          preguntasModificadas[index].imagen = pregunta.imagen
          console.log(`Conservando imagen existente para pregunta ${index}:`, pregunta.imagen)
        }
      }

      // Manejar preguntas con audio
      if (pregunta.tipo === "audio") {
        if (pregunta.audio instanceof File) {
          // Si es un nuevo archivo, añadirlo al FormData
          const fileKey = `audio_pregunta_${index}`
          data.append(fileKey, pregunta.audio)
          preguntasModificadas[index].audio = fileKey
          console.log(`Añadiendo nuevo audio para pregunta ${index}:`, pregunta.audio.name)
        } else if (typeof pregunta.audio === "string" && pregunta.audio) {
          // Si es una URL existente, conservarla
          preguntasModificadas[index].audio = pregunta.audio
          console.log(`Conservando audio existente para pregunta ${index}:`, pregunta.audio)
        }
      }
    })

    // Añadir las preguntas modificadas como JSON
    data.append("preguntas", JSON.stringify(preguntasModificadas))

    // Depuración - Mostrar todo lo que contiene el FormData
    console.log("Contenido del FormData:")
    for (const pair of data.entries()) {
      if (pair[1] instanceof File) {
        console.log(`${pair[0]}: File - ${pair[1].name} (${pair[1].size} bytes)`)
      } else {
        console.log(`${pair[0]}: ${pair[1]}`)
      }
    }

    // Llamar a la función onSubmit con el FormData
    onSubmit(data)
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
    <div className="bg-white rounded-lg p-6 w-full max-w-7xl mx-auto">
      <h2 className="text-[18px] font-bold text-center text-[#1f384c] mb-4">
        {evaluation && evaluation.id ? "EDITAR EVALUACIÓN" : "CREAR EVALUACION"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-3">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-[14px] font-medium mb-1">Nombre de la Evaluacion</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
                placeholder="Ingrese el nombre de la evaluacion"
                required
              />
            </div>

            <div>
              <label className="block text-[14px] font-medium mb-1">Temática</label>
              <select
                name="tematica"
                value={formData.tematica}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
                required
              >
                <option value="" disabled>
                  Seleccione una temática
                </option>
                <option value="listening">Listening</option>
                <option value="vocabulary">Vocabulary</option>
                <option value="grammar">Grammar</option>
                <option value="reading">Reading</option>
              </select>
            </div>

            <div>
              <label className="block text-[14px] font-medium mb-1">Tipo</label>{" "}
              {/* Cambiado de "Tipo evaluación" a "Tipo" */}
              <select
                name="tipoEvaluacion"
                value={formData.tipoEvaluacion}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md text-[14px]"
                required
              >
                <option value="Examen">Examen</option>
                <option value="Actividad">Actividad</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {" "}
            {/* Reducido el gap de 6 a 4 */}
            <div>
              <label className="block text-[14px] font-medium mb-1">Estado</label>
              <div className="flex items-center pt-1">
                <button
                  type="button"
                  onClick={handleToggleEstado}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                    formData.estado === "Activo" ? "bg-green-600" : "bg-gray-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      formData.estado === "Activo" ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
                <span className="ml-3 text-[14px] font-medium">
                  {formData.estado === "Activo" ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-[14px] font-medium mb-1">Material</label>
              <div className="flex items-center">
                <input type="file" id="material" onChange={handleFileChange} className="hidden" />
                <div className="flex-1 border border-gray-300 rounded-l-md p-2 text-[14px] bg-white text-gray-500 truncate">
                  {formData.material instanceof File
                    ? formData.material.name
                    : formData.materialName
                      ? formData.materialName
                      : "Seleccionar archivo. Ningún archivo seleccionado"}
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
          </div>

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
                      className="flex justify-between items-center p-2 border border-gray-200 rounded-md hover:bg-gray-50" // Quitado cursor-pointer del div
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
                      <div className="flex items-center space-x-2">
                        {" "}
                        {/* Contenedor para los botones */}
                        <button
                          type="button"
                          onClick={() => handleEditQuestion(index)} // Botón de editar
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            setFormData((prev) => ({
                              ...prev,
                              preguntas: prev.preguntas.filter((_, i) => i !== index),
                            }))
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
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
                      <Trash className="h-4 w-6 text-red-500" />
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
                      {questionData.imagen instanceof File
                        ? questionData.imagen.name
                        : questionData.imagenName
                          ? questionData.imagenName
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="w-full py-2 bg-[#46ae69] text-white rounded-md hover:bg-green-600 transition-colors text-[14px]"
                  >
                    {editingQuestionIndex !== null ? "Actualizar Pregunta" : "Agregar Pregunta"}
                  </button>

                  {validationError && <p className="mt-2 text-red-500 text-[14px]">{validationError}</p>}
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
                      <Trash className="h-4 w-6 text-red-500" />
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="w-full py-2 bg-[#46ae69] text-white rounded-md hover:bg-green-600 transition-colors text-[14px]"
                  >
                    {editingQuestionIndex !== null ? "Actualizar Pregunta" : "Agregar Pregunta"}
                  </button>

                  {validationError && <p className="mt-2 text-red-500 text-[14px]">{validationError}</p>}
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
                      <Trash className="h-4 w-6 text-red-500" />
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

                  {validationError && <p className="mt-2 text-red-500 text-[14px]">{validationError}</p>}
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
                      <Trash className="h-4 w-6 text-red-500" />
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
                      {questionData.audio instanceof File
                        ? questionData.audio.name
                        : questionData.audioName
                          ? questionData.audioName
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  </div>

                  <button
                    type="button"
                    onClick={addQuestion}
                    className="w-full py-2 bg-[#46ae69] text-white rounded-md hover:bg-green-600 transition-colors text-[14px]"
                  >
                    {editingQuestionIndex !== null ? "Actualizar Pregunta" : "Agregar Pregunta"}
                  </button>

                  {validationError && <p className="mt-2 text-red-500 text-[14px]">{validationError}</p>}
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
                      <Trash className="h-4 w-6 text-red-500" />
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
                          <Trash className="h-4 w-6 text-red-500" />
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

                  {validationError && <p className="mt-2 text-red-500 text-[14px]">{validationError}</p>}
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
