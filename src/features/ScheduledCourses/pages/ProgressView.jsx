import React, { useEffect, useState, useRef } from 'react';
import GenericTable from '../../../shared/components/Table';
import { ChevronDown } from "lucide-react"
import { useAuth } from "../../auth/hooks/useAuth"
import { useParams, useNavigate } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import Tooltip from '../../../shared/components/Tooltip';
import ConfirmationModal from '../../../shared/components/ConfirmationModal';

// Base de datos simulada con progreso para cada aprendiz
const progressDatabase = {
  // Juan Perez - 10% de progreso
  "Juan Perez": {
    learnerData: {
      nombre: 'Juan Perez',
      nivelActual: 'Nivel 1',
      ficha: '1001234',
      instructorActual: 'Carlos Mendoza',
      tiempoTotalActivo: '5 horas',
      actividadesRealizadas: 2,
      correo: "juan@gmail.com",
      telefono: "1234567890",
      progreso: "10%",
      puntosTotales: "100"
    },
    progressData: [
      {
        id: 1,
        fecha: '28-03-2025',
        hora: '10:30 AM',
        tipo: 'Examen',
        nombreEvaluacion: 'Grammar Test 1',
        puntajeObtenido: '65/100',
        estado: 'Aprobado',
        duracion: '20 minutos',
        intentos: 1
      },
      {
        id: 2,
        fecha: '28-03-2025',
        hora: '11:45 AM',
        tipo: 'Actividad',
        nombreEvaluacion: 'Listening Practice 1',
        puntajeObtenido: '35/100',
        estado: 'No Aprobado',
        duracion: '15 minutos',
        intentos: 1
      }
    ]
  },

  // Maria Rodriguez - 20% de progreso
  "Maria Rodriguez": {
    learnerData: {
      nombre: 'Maria Rodriguez',
      nivelActual: 'Nivel 1',
      ficha: '1002345',
      instructorActual: 'Ana Gómez',
      tiempoTotalActivo: '8 horas',
      actividadesRealizadas: 3,
      correo: "maria@gmail.com",
      telefono: "1234567890",
      progreso: "20%",
      puntosTotales: "200"
    },
    progressData: [
      {
        id: 1,
        fecha: '27-03-2025',
        hora: '09:15 AM',
        tipo: 'Examen',
        nombreEvaluacion: 'Grammar Test 1',
        puntajeObtenido: '75/100',
        estado: 'Aprobado',
        duracion: '20 minutos',
        intentos: 1
      },
      {
        id: 2,
        fecha: '27-03-2025',
        hora: '10:30 AM',
        tipo: 'Actividad',
        nombreEvaluacion: 'Listening Practice 1',
        puntajeObtenido: '80/100',
        estado: 'Aprobado',
        duracion: '15 minutos',
        intentos: 1
      },
      {
        id: 3,
        fecha: '28-03-2025',
        hora: '09:00 AM',
        tipo: 'Actividad',
        nombreEvaluacion: 'Vocabulary Quiz 1',
        puntajeObtenido: '45/100',
        estado: 'No Aprobado',
        duracion: '10 minutos',
        intentos: 2
      }
    ]
  },

  // Pedro Gomez - 30% de progreso
  "Pedro Gomez": {
    learnerData: {
      nombre: 'Pedro Gomez',
      nivelActual: 'Nivel 1',
      ficha: '1003456',
      instructorActual: 'Juan Pérez',
      tiempoTotalActivo: '12 horas',
      actividadesRealizadas: 4,
      correo: "pedro@gmail.com",
      telefono: "1234567890",
      progreso: "30%",
      puntosTotales: "300"
    },
    progressData: [
      {
        id: 1,
        fecha: '26-03-2025',
        hora: '10:00 AM',
        tipo: 'Examen',
        nombreEvaluacion: 'Grammar Test 1',
        puntajeObtenido: '85/100',
        estado: 'Aprobado',
        duracion: '20 minutos',
        intentos: 1
      },
      {
        id: 2,
        fecha: '26-03-2025',
        hora: '11:30 AM',
        tipo: 'Actividad',
        nombreEvaluacion: 'Listening Practice 1',
        puntajeObtenido: '90/100',
        estado: 'Aprobado',
        duracion: '15 minutos',
        intentos: 1
      },
      {
        id: 3,
        fecha: '27-03-2025',
        hora: '09:30 AM',
        tipo: 'Actividad',
        nombreEvaluacion: 'Vocabulary Quiz 1',
        puntajeObtenido: '75/100',
        estado: 'Aprobado',
        duracion: '10 minutos',
        intentos: 1
      },
      {
        id: 4,
        fecha: '28-03-2025',
        hora: '10:15 AM',
        tipo: 'Examen',
        nombreEvaluacion: 'Grammar Test 2',
        puntajeObtenido: '50/100',
        estado: 'No Aprobado',
        duracion: '25 minutos',
        intentos: 1
      }
    ]
  },

  // Ana Perez - 40% de progreso
  "Ana Perez": {
    learnerData: {
      nombre: 'Ana Perez',
      nivelActual: 'Nivel 2',
      ficha: '1004567',
      instructorActual: 'Carlos Mendoza',
      tiempoTotalActivo: '15 horas',
      actividadesRealizadas: 5,
      correo: "ana@gmail.com",
      telefono: "1234567890",
      progreso: "40%",
      puntosTotales: "400"
    },
    progressData: [
      {
        id: 1,
        fecha: '25-03-2025',
        hora: '09:00 AM',
        tipo: 'Examen',
        nombreEvaluacion: 'Grammar Test 1',
        puntajeObtenido: '90/100',
        estado: 'Aprobado',
        duracion: '20 minutos',
        intentos: 1
      },
      {
        id: 2,
        fecha: '25-03-2025',
        hora: '10:30 AM',
        tipo: 'Actividad',
        nombreEvaluacion: 'Listening Practice 1',
        puntajeObtenido: '85/100',
        estado: 'Aprobado',
        duracion: '15 minutos',
        intentos: 1
      },
      {
        id: 3,
        fecha: '26-03-2025',
        hora: '09:15 AM',
        tipo: 'Actividad',
        nombreEvaluacion: 'Vocabulary Quiz 1',
        puntajeObtenido: '80/100',
        estado: 'Aprobado',
        duracion: '10 minutos',
        intentos: 1
      },
      {
        id: 4,
        fecha: '27-03-2025',
        hora: '10:00 AM',
        tipo: 'Examen',
        nombreEvaluacion: 'Grammar Test 2',
        puntajeObtenido: '75/100',
        estado: 'Aprobado',
        duracion: '25 minutos',
        intentos: 1
      },
      {
        id: 5,
        fecha: '28-03-2025',
        hora: '09:30 AM',
        tipo: 'Actividad',
        nombreEvaluacion: 'Listening Practice 2',
        puntajeObtenido: '70/100',
        estado: 'Aprobado',
        duracion: '15 minutos',
        intentos: 1
      }
    ]
  },

  // Luisa Rodriguez - 50% de progreso
  "Luisa Rodriguez": {
    learnerData: {
      nombre: 'Luisa Rodriguez',
      nivelActual: 'Nivel 2',
      ficha: '1005678',
      instructorActual: 'Ana Gómez',
      tiempoTotalActivo: '18 horas',
      actividadesRealizadas: 6,
      correo: "luisa@gmail.com",
      telefono: "1234567890",
      progreso: "50%",
      puntosTotales: "500"
    },
    progressData: [
      {
        id: 1,
        fecha: '24-03-2025',
        hora: '09:00 AM',
        tipo: 'Examen',
        nombreEvaluacion: 'Grammar Test 1',
        puntajeObtenido: '95/100',
        estado: 'Aprobado',
        duracion: '20 minutos',
        intentos: 1
      },
      {
        id: 2,
        fecha: '24-03-2025',
        hora: '10:30 AM',
        tipo: 'Actividad',
        nombreEvaluacion: 'Listening Practice 1',
        puntajeObtenido: '90/100',
        estado: 'Aprobado',
        duracion: '15 minutos',
        intentos: 1
      },
      {
        id: 3,
        fecha: '25-03-2025',
        hora: '09:15 AM',
        tipo: 'Actividad',
        nombreEvaluacion: 'Vocabulary Quiz 1',
        puntajeObtenido: '85/100',
        estado: 'Aprobado',
        duracion: '10 minutos',
        intentos: 1
      },
      {
        id: 4,
        fecha: '26-03-2025',
        hora: '10:00 AM',
        tipo: 'Examen',
        nombreEvaluacion: 'Grammar Test 2',
        puntajeObtenido: '80/100',
        estado: 'Aprobado',
        duracion: '25 minutos',
        intentos: 1
      },
      {
        id: 5,
        fecha: '27-03-2025',
        hora: '09:30 AM',
        tipo: 'Actividad',
        nombreEvaluacion: 'Listening Practice 2',
        puntajeObtenido: '75/100',
        estado: 'Aprobado',
        duracion: '15 minutos',
        intentos: 1
      },
      {
        id: 6,
        fecha: '28-03-2025',
        hora: '10:15 AM',
        tipo: 'Actividad',
        nombreEvaluacion: 'Vocabulary Quiz 2',
        puntajeObtenido: '70/100',
        estado: 'Aprobado',
        duracion: '10 minutos',
        intentos: 1
      }
    ]
  },

  // Datos para los demás aprendices...
  "Carlos Gomez": {
    learnerData: {
      nombre: 'Carlos Gomez',
      nivelActual: 'Nivel 3',
      ficha: '1006789',
      instructorActual: 'Juan Pérez',
      tiempoTotalActivo: '22 horas',
      actividadesRealizadas: 2,
      correo: "carlos@gmail.com",
      telefono: "1234567890",
      progreso: "60%",
      puntosTotales: "600"
    },
    progressData: [
      // Datos de progreso para Carlos...
      {
        id: 1,
        fecha: '23-03-2025',
        hora: '09:00 AM',
        tipo: 'Examen',
        nombreEvaluacion: 'Grammar Test 1',
        puntajeObtenido: '95/100',
        estado: 'Aprobado',
        duracion: '20 minutos',
        intentos: 1
      },
      {
        id: 2,
        fecha: '24-03-2025',
        hora: '10:30 AM',
        tipo: 'Actividad',
        nombreEvaluacion: 'Listening Practice 1',
        puntajeObtenido: '90/100',
        estado: 'Aprobado',
        duracion: '15 minutos',
        intentos: 1
      },
    ]
  },

  "Sofia Martinez": {
    learnerData: {
      nombre: 'Sofia Martinez',
      nivelActual: 'Nivel 3',
      ficha: '1007890',
      instructorActual: 'Carlos Mendoza',
      tiempoTotalActivo: '25 horas',
      actividadesRealizadas: 8,
      correo: "sofia@gmail.com",
      telefono: "9876543210",
      progreso: "70%",
      puntosTotales: "700"
    },
    progressData: [
      // Datos de progreso para Sofia...
    ]
  },

  "Diego Torres": {
    learnerData: {
      nombre: 'Diego Torres',
      nivelActual: 'Nivel 4',
      ficha: '1008901',
      instructorActual: 'Ana Gómez',
      tiempoTotalActivo: '28 horas',
      actividadesRealizadas: 9,
      correo: "diego@gmail.com",
      telefono: "9876543211",
      progreso: "80%",
      puntosTotales: "800"
    },
    progressData: [
      // Datos de progreso para Diego...
    ]
  },

  "Laura Ramirez": {
    learnerData: {
      nombre: 'Laura Ramirez',
      nivelActual: 'Nivel 4',
      ficha: '1009012',
      instructorActual: 'Juan Pérez',
      tiempoTotalActivo: '32 horas',
      actividadesRealizadas: 10,
      correo: "laura@gmail.com",
      telefono: "9876543212",
      progreso: "90%",
      puntosTotales: "900"
    },
    progressData: [
      // Datos de progreso para Laura...
    ]
  },

  "Miguel Sanchez": {
    learnerData: {
      nombre: 'Miguel Sanchez',
      nivelActual: 'Nivel 5',
      ficha: '1010123',
      instructorActual: 'Carlos Mendoza',
      tiempoTotalActivo: '35 horas',
      actividadesRealizadas: 12,
      correo: "miguel@gmail.com",
      telefono: "9876543213",
      progreso: "100%",
      puntosTotales: "1000"
    },
    progressData: [
      // Datos de progreso para Miguel...
    ]
  }
};

const ProgressView = () => {
  const { nombre } = useParams(); // Obtener el nombre del aprendiz de la URL
  const navigate = useNavigate();
  const [learnerData, setLearnerData] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const { logout } = useAuth()
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

  const handleLogoutClick = () => {
    setIsDropdownOpen(false)
    setShowLogoutConfirm(true)
  }

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  useEffect(() => {
    // Simular una carga de datos
    setLoading(true);

    // Buscar los datos del aprendiz por su nombre
    setTimeout(() => {
      if (nombre && progressDatabase[nombre]) {
        setLearnerData(progressDatabase[nombre].learnerData);
        setProgressData(progressDatabase[nombre].progressData);
      } else {
        // Si no se encuentra el aprendiz, redirigir a la página de aprendices
        navigate('/progreso/cursosProgramados/fichas/aprendices');
      }
      setLoading(false);
    }, 500);
  }, [nombre, navigate]);

  // Si está cargando, mostrar un indicador de carga
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Si no hay datos del aprendiz, no mostrar nada (ya se redirigirá)
  if (!learnerData) {
    return null;
  }

  // Datos formateados para la tabla de atributos
  const formattedLearnerData = [
    { id: 1, atributo: 'Nombre', valor: learnerData.nombre },
    { id: 2, atributo: 'Nivel Actual', valor: learnerData.nivelActual },
    { id: 3, atributo: 'Ficha', valor: learnerData.ficha },
    { id: 4, atributo: 'Instructor Actual', valor: learnerData.instructorActual },
    {
      id: 5,
      atributo: 'Actividades/Exámenes Realizados',
      valor: learnerData.actividadesRealizadas
    },
  ];

  // Columnas para la tabla de progreso
  const progressColumns = [
    { key: 'fecha', label: 'Fecha', width: '12%' },
    { key: 'hora', label: 'Hora', width: '10%' },
    { key: 'tipo', label: 'Tipo', width: '10%' },
    { key: 'nombreEvaluacion', label: 'Nombre Evaluación', width: '20%' },
    { key: 'puntajeObtenido', label: 'Puntaje', width: '10%' },
    {
      key: 'estado',
      label: 'Estado',
      width: '12%',
      render: (item) => (
        <div className={`px-2 py-1 rounded-full text-xs text-white text-center w-24 ${item.estado === 'Aprobado' ? 'bg-green-500' : 'bg-red-500'
          }`}>
          {item.estado}
        </div>
      )
    },
    { key: 'duracion', label: 'Duración', width: '12%' },
    { key: 'intentos', label: 'Intentos', width: '9%' }
  ];

  // Función para manejar la retroalimentación
  const handleFeedback = (evaluation) => {
    // Aquí puedes navegar a la vista de retroalimentación o mostrar un modal
    console.log('Retroalimentación para:', evaluation);
    // Ejemplo de navegación:
    // navigate(`/retroalimentacion/${evaluation.id}`);
  };

  const handleBack = () => {
    navigate('/progreso/cursosProgramados/fichas/aprendices');
  };

  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">Cursos Programados</h1>
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
      </header>

      <div className="container mx-auto px-6">
        <div className="container mx-auto p-4 max-w-7xl">
          <div className="flex items-center mb-6">
            <button
              onClick={handleBack}
              className="flex items-center gap-1 bg-gray-200 text-black px-3 py-1.5 text-sm rounded-lg hover:bg-gray-300 transition-colors"
            >
              ← Volver
            </button>
          </div>
          <div className="mb-8 flex flex-col items-center">
            <h2 className="text-xl font-bold text-[#1F384C] mb-4 text-center">PROGRESO DEL APRENDIZ</h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden max-w-2xl w-full">
              <table className="w-full">
                <tbody>
                  {formattedLearnerData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-200 last:border-b-0">
                      <td className="py-2 px-4 font-semibold text-[#1F384C] bg-gray-50 w-[50%]">
                        {item.atributo}
                      </td>
                      <td className="py-2 px-4 w-[50%]">
                        {typeof item.valor === 'object' ? item.valor : item.valor || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-[#1F384C]">TABLA DE PROGRESO</h2>
            </div>
            <GenericTable
              data={progressData}
              columns={progressColumns}
              onShow={handleFeedback}
              showActions={{ show: true, edit: false, delete: false, add: false }}
              defaultItemsPerPage={10}
              tooltipText="Retroalimentación"
            />
            <ConfirmationModal
              isOpen={showLogoutConfirm}
              onClose={() => setShowLogoutConfirm(false)}
              onConfirm={handleLogout}
              title="Cerrar Sesión"
              message="¿Está seguro de que desea cerrar la sesión actual?"
              confirmText="Cerrar Sesión"
            />
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProgressView;
