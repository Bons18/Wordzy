"use client";

import { useNavigate } from "react-router-dom";
import GenericTable from "../../../shared/components/Table";
import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import ConfirmationModal from "../../../shared/components/ConfirmationModal";
import useGetCourses from "../../File/hooks/useGetCourses";
import { formatDate } from "../../../shared/utils/dateFormatter";
import { useGetCourseProgrammings } from "../../CourseProgramming/hooks/useGetCoursePrograming";
import useGetApprentices from "../../Apprentices/hooks/useGetApprentices";

const columns = [
  { key: "code", label: "Ficha", width: "10%" },
  { key: "fk_programs", label: "Programa", width: "35%" },
  { key: "start_date", label: "Fecha Inicio", width: "12%" },
  { key: "end_date", label: "Fecha Fin", width: "12%" },
  {
    key: "progreso",
    label: "Progreso General",
    render: (item) => (
      <div className="flex items-center gap-5">
        <div className="flex-1 min-w-[100px]">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: item.progreso || "0%" }}
            ></div>
          </div>
        </div>
        <span className="text-sm text-gray-600 w-13 text-right">
          {item.progreso || "0%"}
        </span>
      </div>
    ),
  },
];

const ScheduledCoursesPageImproved = () => {
  const navigate = useNavigate();
  const [showDebug, setShowDebug] = useState(false)
  const {
    courses,
    loading: coursesLoading,
    error: coursesError,
  } = useGetCourses();
  const { programmings, loading: programmingsLoading } =
    useGetCourseProgrammings();
  const { apprentices, loading: apprenticesLoading } = useGetApprentices();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const { logout } = useAuth();
  const dropdownRef = useRef(null);

  // Estados para el progreso calculado
  const [coursesWithProgress, setCoursesWithProgress] = useState([]);
  const [progressLoading, setProgressLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  // Función para extraer evaluaciones de un nivel
  const getEvaluationsFromLevel = (level) => {
    const evaluations = [];
    if (level.topics && level.topics.length > 0) {
      level.topics.forEach((topic) => {
        if (topic.activities && topic.activities.length > 0) {
          topic.activities.forEach((activity) => {
            evaluations.push({
              evaluationId: activity.evaluationId,
              type: "activity",
              value: activity.value,
            });
          });
        }
        if (topic.exams && topic.exams.length > 0) {
          topic.exams.forEach((exam) => {
            evaluations.push({
              evaluationId: exam.evaluationId,
              type: "exam",
              value: exam.value,
            });
          });
        }
      });
    }
    return evaluations;
  };

  // Función para obtener progreso de un aprendiz específico
  const fetchApprenticeProgress = async (apprenticeId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/apprentice-progress?apprenticeId=${apprenticeId}`,
        {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.success ? data.data : [];
    } catch (error) {
      console.error(
        `❌ Error obteniendo progreso para aprendiz ${apprenticeId}:`,
        error
      );
      return [];
    }
  };

  // Función principal para calcular progreso de una ficha
  const calculateFichaProgress = async (course) => {
    try {
      console.log(`\n🎯 === CALCULANDO PROGRESO FICHA ${course.code} ===`);
      console.log(`📋 Programa: ${course.fk_programs}`);

      // 1. Filtrar aprendices de esta ficha
      const fichaApprentices = apprentices.filter(
        (apprentice) =>
          apprentice.ficha &&
          apprentice.ficha.includes(Number.parseInt(course.code))
      );

      console.log(
        `👥 Aprendices en ficha ${course.code}:`,
        fichaApprentices.length
      );

      if (fichaApprentices.length === 0) {
        console.log(`⚠️ No hay aprendices en la ficha ${course.code}`);
        return 0;
      }

      // 2. Buscar la programación del programa
      const programming = programmings.find(
        (prog) =>
          prog.programId?.name === course.fk_programs ||
          prog.programId?.abbreviation === course.fk_programs
      );

      if (!programming) {
        console.log(
          `❌ No se encontró programación para ${course.fk_programs}`
        );
        return 0;
      }

      console.log(
        `📚 Programación encontrada: ${programming.levels?.length || 0} niveles`
      );

      if (!programming.levels || programming.levels.length === 0) {
        console.log(`⚠️ No hay niveles en la programación`);
        return 0;
      }

      // 3. Obtener progreso de todos los aprendices de la ficha
      console.log(
        `🔄 Obteniendo progreso de ${fichaApprentices.length} aprendices...`
      );
      const allApprenticesProgress = await Promise.all(
        fichaApprentices.map(async (apprentice) => {
          const apprenticeId = apprentice._id || apprentice.id;
          const progressData = await fetchApprenticeProgress(apprenticeId);
          console.log(
            `  📊 ${apprentice.nombre}: ${progressData.length} evaluaciones realizadas`
          );
          return {
            apprenticeId,
            apprenticeName: `${apprentice.nombre} ${apprentice.apellido}`,
            progress: progressData,
          };
        })
      );

      // 4. Calcular progreso por nivel y luego promedio de la ficha
      let totalProgresoNiveles = 0;
      let nivelesConEvaluaciones = 0;

      console.log(`🔢 Procesando ${programming.levels.length} niveles...`);

      programming.levels.forEach((level, index) => {
        const nivelNumero = index + 1;
        console.log(`\n📚 === NIVEL ${nivelNumero}: ${level.name} ===`);

        // Obtener evaluaciones programadas para este nivel
        const evaluacionesProgramadas = getEvaluationsFromLevel(level);
        console.log(
          `📝 Evaluaciones programadas en nivel ${nivelNumero}:`,
          evaluacionesProgramadas.length
        );

        if (evaluacionesProgramadas.length > 0) {
          nivelesConEvaluaciones++;

          // Calcular progreso promedio de todos los aprendices en este nivel
          let totalCompletitudNivel = 0;

          allApprenticesProgress.forEach(({ apprenticeName, progress }) => {
            const evaluacionesRealizadas = progress.filter(
              (p) => p.level === nivelNumero
            );
            console.log(
              `  👤 ${apprenticeName}: ${evaluacionesRealizadas.length} evaluaciones en nivel ${nivelNumero}`
            );

            // Contar evaluaciones APROBADAS vs programadas
            let evaluacionesAprobadas = 0;
            evaluacionesProgramadas.forEach((evalProgramada) => {
              const evalId = evalProgramada.evaluationId;
              const evalRealizada = evaluacionesRealizadas.find(
                (er) =>
                  (er.evaluationId === evalId ||
                    er.evaluationId?._id === evalId ||
                    er.evaluationId?.toString() === evalId?.toString()) &&
                  er.passed === true
              );

              if (evalRealizada) {
                evaluacionesAprobadas++;
                console.log(`    ✅ Evaluación APROBADA: ${evalId}`);
              }
            });

            // Calcular porcentaje de completitud para este aprendiz en este nivel
            const completitudAprendiz =
              (evaluacionesAprobadas / evaluacionesProgramadas.length) * 100;
            totalCompletitudNivel += completitudAprendiz;
            console.log(
              `    📊 ${apprenticeName}: ${evaluacionesAprobadas}/${
                evaluacionesProgramadas.length
              } APROBADAS = ${Math.round(completitudAprendiz)}%`
            );
          });

          // Promedio del nivel (dividir entre TODOS los aprendices de la ficha)
          const promedioNivel =
            fichaApprentices.length > 0
              ? totalCompletitudNivel / fichaApprentices.length
              : 0;
          totalProgresoNiveles += promedioNivel;
          console.log(
            `📈 NIVEL ${nivelNumero} PROMEDIO: ${Math.round(promedioNivel)}%`
          );
        } else {
          console.log(`⚠️ Nivel ${nivelNumero}: Sin evaluaciones programadas`);
        }
      });

      // 5. Calcular progreso general como promedio de TODOS los niveles
      const progresoGeneral =
        programming.levels.length > 0
          ? Math.round(totalProgresoNiveles / programming.levels.length)
          : 0;

      console.log(`\n🎯 === RESULTADO FINAL FICHA ${course.code} ===`);
      console.log(
        `📊 Total niveles en programación: ${programming.levels.length}`
      );
      console.log(`📊 Niveles con evaluaciones: ${nivelesConEvaluaciones}`);
      console.log(
        `📈 Progreso total acumulado: ${Math.round(totalProgresoNiveles)}%`
      );
      console.log(
        `🏆 PROGRESO GENERAL: ${progresoGeneral}% (promedio de ${programming.levels.length} niveles)`
      );

      return progresoGeneral;
    } catch (error) {
      console.error(
        `❌ Error calculando progreso de ficha ${course.code}:`,
        error
      );
      return 0;
    }
  };

  // Efecto para calcular progreso cuando todos los datos estén listos
  useEffect(() => {
    const calculateAllProgress = async () => {
      // Verificar si hay datos disponibles
      const hasCoursesData = !coursesLoading && courses.length > 0;
      const hasProgrammingsData =
        !programmingsLoading && programmings.length > 0;
      const hasApprenticesData = !apprenticesLoading && apprentices.length > 0;

      // Si terminó de cargar pero no hay datos
      if (!coursesLoading && !programmingsLoading && !apprenticesLoading) {
        if (!hasCoursesData || !hasProgrammingsData || !hasApprenticesData) {
          console.log(
            "⚠️ No hay datos suficientes para mostrar cursos programados"
          );
          setHasData(false);
          setProgressLoading(false);
          return;
        }
      }

      // Si hay datos, proceder con el cálculo
      if (hasCoursesData && hasProgrammingsData && hasApprenticesData) {
        setProgressLoading(true);
        setHasData(true);
        console.log("🔄 === INICIANDO CÁLCULO DE PROGRESO GENERAL ===");
        console.log(`📋 Fichas: ${courses.length}`);
        console.log(`📚 Programaciones: ${programmings.length}`);
        console.log(`👥 Aprendices: ${apprentices.length}`);

        const coursesWithCalculatedProgress = await Promise.all(
          courses.map(async (course) => {
            const progreso = await calculateFichaProgress(course);
            return {
              ...course,
              start_date: formatDate(course.start_date),
              end_date: formatDate(course.end_date),
              progreso: `${progreso}%`,
            };
          })
        );

        setCoursesWithProgress(coursesWithCalculatedProgress);
        setProgressLoading(false);

        console.log("\n✅ === CÁLCULO COMPLETADO ===");
        console.log("📊 === RESUMEN FINAL ===");
        coursesWithCalculatedProgress.forEach((course) => {
          console.log(`📋 Ficha ${course.code}: ${course.progreso}`);
        });
      }
    };

    calculateAllProgress();
  }, [
    courses,
    programmings,
    apprentices,
    coursesLoading,
    programmingsLoading,
    apprenticesLoading,
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogoutClick = () => {
    setIsDropdownOpen(false);
    setShowLogoutConfirm(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleShowLevels = (ficha) => {
    console.log("Ficha seleccionada:", ficha);

    // Guardar información de la ficha seleccionada
    sessionStorage.setItem("selectedFichaId", ficha.id);
    sessionStorage.setItem("selectedFichaNombre", ficha.code);
    sessionStorage.setItem("selectedFichaPrograma", ficha.fk_programs);

    const programId =
      ficha.fk_programs_id || ficha.program_id || ficha.programId;
    console.log("Program ID encontrado:", programId);

    if (programId) {
      sessionStorage.setItem("selectedProgramId", programId);
    } else {
      console.error("No se encontró ID del programa en:", ficha);
    }

    navigate("/progreso/cursosProgramados/niveles");
  };

  // Mostrar loading mientras se cargan los datos iniciales
  if (coursesLoading || programmingsLoading || apprenticesLoading) {
    return (
      <div className="min-h-screen">
        <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#1f384c]">
              Cursos Programados
            </h1>
            <div className="text-sm text-gray-500 mt-1">
              <span className="font-medium text-green-600">
                Cargando datos...
              </span>
            </div>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-[#1f384c] font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <span>Administrador</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
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
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
              <span className="text-lg text-gray-600">
                {coursesLoading
                  ? "Cargando fichas..."
                  : programmingsLoading
                  ? "Cargando programaciones..."
                  : apprenticesLoading
                  ? "Cargando aprendices..."
                  : "Cargando datos..."}
              </span>
            </div>
          </div>
        </div>

        <ConfirmationModal
          isOpen={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={handleLogout}
          title="Cerrar Sesión"
          message="¿Está seguro de que desea cerrar la sesión actual?"
          confirmText="Cerrar Sesión"
        />
      </div>
    );
  }

  // Mostrar mensaje cuando no hay datos
  if (!hasData) {
    return (
      <div className="min-h-screen">
        <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#1f384c]">
              Cursos Programados
            </h1>
            <div className="text-sm text-gray-500 mt-1">
              <span className="font-medium text-orange-600">
                Sin datos disponibles
              </span>
            </div>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-[#1f384c] font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <span>Administrador</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
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
          <div className="flex justify-center items-center py-20">
            <div className="text-center max-w-md">
              <div className="mb-6">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  No hay cursos programados
                </h2>
                <p className="text-gray-600 mb-6">
                  No se encontraron cursos programados en la base de datos. Esto
                  puede deberse a que:
                </p>
                <div className="text-left bg-gray-50 p-4 rounded-lg mb-6">
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>
                        No hay fichas registradas ({courses.length} fichas
                        encontradas)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>
                        No hay programaciones configuradas (
                        {programmings.length} programaciones encontradas)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>
                        No hay aprendices registrados ({apprentices.length}{" "}
                        aprendices encontrados)
                      </span>
                    </li>
                  </ul>
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Actualizar Página
                </button>
              </div>
            </div>
          </div>
        </div>

        <ConfirmationModal
          isOpen={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={handleLogout}
          title="Cerrar Sesión"
          message="¿Está seguro de que desea cerrar la sesión actual?"
          confirmText="Cerrar Sesión"
        />
      </div>
    );
  }

  // Mostrar loading del cálculo de progreso
  if (progressLoading) {
    return (
      <div className="min-h-screen">
        <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#1f384c]">
              Cursos Programados
            </h1>
            <div className="text-sm text-gray-500 mt-1">
              <span className="font-medium text-blue-600">
                Calculando progreso...
              </span>
            </div>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-[#1f384c] font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <span>Administrador</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
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
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
              <span className="text-lg text-gray-600">
                Calculando progreso general...
              </span>
              <p className="text-sm text-gray-500 mt-2">
                Procesando {courses.length} fichas con {apprentices.length}{" "}
                aprendices
              </p>
            </div>
          </div>
        </div>

        <ConfirmationModal
          isOpen={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={handleLogout}
          title="Cerrar Sesión"
          message="¿Está seguro de que desea cerrar la sesión actual?"
          confirmText="Cerrar Sesión"
        />
      </div>
    );
  }

  // Mostrar error si hay algún problema
  if (coursesError) {
    return (
      <div className="min-h-screen">
        <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#1f384c]">
              Cursos Programados
            </h1>
            <div className="text-sm text-gray-500 mt-1">
              <span className="font-medium text-red-600">
                Error en la carga
              </span>
            </div>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-[#1f384c] font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                <span>Administrador</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                />
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
          <div className="flex justify-center items-center py-20">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-red-800 mb-2">
                Error al cargar datos
              </h2>
              <p className="text-red-600 mb-6">{coursesError}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>

        <ConfirmationModal
          isOpen={showLogoutConfirm}
          onClose={() => setShowLogoutConfirm(false)}
          onConfirm={handleLogout}
          title="Cerrar Sesión"
          message="¿Está seguro de que desea cerrar la sesión actual?"
          confirmText="Cerrar Sesión"
        />
      </div>
    );
  }

  // Renderizar la tabla normal cuando hay datos
  return (
    <div className="min-h-screen">
      <header className="bg-white py-4 px-6 border-b border-[#d6dade] mb-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1f384c]">
            Cursos Programados
          </h1>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 text-[#1f384c] font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
            >
              <span>Administrador</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
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
        <button
          onClick={() => setShowDebug(!showDebug)}
          className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 text-sm rounded-lg hover:bg-blue-600 transition-colors mb-4"
        >
          {showDebug ? "🔍 Ocultar Debug" : "🔍 Mostrar Debug"}
        </button>

        {showDebug && (
        <div className="mb-4 p-4 bg-green-50 rounded-lg">
          <h4 className="font-semibold text-green-800">
            📊 Progreso General de Fichas (Promedio de Niveles):
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 text-sm">
            {coursesWithProgress.map((course) => {
              const programming = programmings.find(
                (prog) =>
                  prog.programId?.name === course.fk_programs ||
                  prog.programId?.abbreviation === course.fk_programs
              );
              const totalNiveles = programming?.levels?.length || 0;

              return (
                <div key={course.id} className="bg-white p-3 rounded border">
                  <div className="font-medium">Ficha {course.code}</div>
                  <div className="text-gray-600 text-xs">
                    {course.fk_programs}
                  </div>
                  <div className="text-xs text-gray-500 mb-1">
                    {totalNiveles > 0
                      ? `${totalNiveles} niveles programados`
                      : "Sin niveles programados"}
                  </div>
                  <div
                    className={`font-bold ${
                      Number.parseInt(course.progreso) > 0
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    Progreso: {course.progreso}
                  </div>
                  {Number.parseInt(course.progreso) === 0 &&
                    totalNiveles > 0 && (
                      <div className="text-xs text-orange-500">
                        ⚠️ Sin evaluaciones aprobadas
                      </div>
                    )}
                  {totalNiveles === 0 && (
                    <div className="text-xs text-red-500">
                      ❌ Sin programación
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>)}

        <GenericTable
          data={coursesWithProgress}
          columns={columns}
          onShow={handleShowLevels}
          tooltipText="Ver Niveles"
          showActions={{ show: true, edit: false, delete: false, add: false }}
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
  );
};

export default ScheduledCoursesPageImproved;
