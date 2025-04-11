import Apprentices from "./features/Apprentices/pages/Apprentices"
import Files from "./features/File/pages/Files"
import InstructorsPage from "./features/Instructors/pages/InstructorsPage"
import Programs from "./features/Programs/pages/Programs"
import TopicsPage from "./features/Topics/pages/TopicsPage"
import SupportMaterials from "./features/SupportMaterials/pages/SupportMaterials"
import Evaluations from "./features/Evaluations/pages/Evaluations"
import Feedback from "./features/Feedback/pages/Feedback"
import FeedbackDetails from "./features/Feedback/pages/FeedbackDetails"
import StudentDetails from "./features/Feedback/pages/StudentDetails"
import ScheduledCoursesPage from "./features/ScheduledCourses/pages/ScheduledCoursesPage"
import Scale from "./features/Scale/pages/Scale"
import Badges from "./features/Badges/pages/Badges"
import Badges2 from "./features/Badges/pages/Badges2";
import Badges3 from "./features/Badges/pages/Badges3";
import Ranking from "./features/Ranking/pages/Ranking"
import UsersPage from "./features/Users/pages/UsersPage"
import Dashboard from "./features/Dashboard/pages/Dashboard"
import LoginPage from "./features/Auth/pages/LoginPage"
import FilePage from "./features/ScheduledCourses/pages/FilePage"
import TraineesPage from "./features/ScheduledCourses/pages/TraineesPage"
import RegistrarRolPage from "./features/Role/pages/RegisterRolePage"
import RolesPage from "./features/Role/pages/RolesPage"
import EditarRolPage from "./features/Role/pages/EditarRolePage"
import ProgressView from "./features/ScheduledCourses/pages/ProgressView"
import CourseProgrammingPage from "./features/CourseProgramming/pages/course-programming-page"
import CourseProgramming from "./features/CourseProgramming/components/course-programming"
import CourseProgrammingDetail from "./features/CourseProgramming/components/course-programming-detail"

// Definición de rutas
const routes = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  // Formación
  {
    path: "/formacion/programas",
    element: <Programs />,
  },
  {
    path: "/formacion/fichas",
    element: <Files />,
  },
  {
    path: "/formacion/instructores",
    element: <InstructorsPage />,
  },
  {
    path: "/formacion/aprendices",
    element: <Apprentices/>,
  },
  // Programación
  {
    path: "/programacion/temas",
    element: <TopicsPage />,
  },
  {
    path: "/programacion/materiales",
    element: <SupportMaterials />,
  },
  {
    path: "/programacion/evaluaciones",
    element: <Evaluations />,
  },
  {
    path: "/programacion/programacionCursos",
    element: <CourseProgrammingPage />,
  },
  {
    path: "/programacion/programacionCursos/registrarProgramacion",
    element: <CourseProgramming />,
  },
  {
    path: "/programacion/programacionCursos/editar/:id",
    element: <CourseProgramming />,
  },
  {
    path: "/programacion/programacionCursos/detalle/:id",
    element: <CourseProgrammingDetail />,
  },
  {
    path: "/programacion/escala",
    element: <Scale />,
  },
  {
    path: "/programacion/insigneas",
    element: <Badges />,
  },
  {
    path: "/programacion/insigneas2",
    element: <Badges2 />,
  },
  {
    path: "/programacion/insigneas3",
    element: <Badges3 />,
  },
  // Progreso
  {
    path: "/progreso/cursosProgramados",
    element: <ScheduledCoursesPage />,
  },
  {
    path: "/progreso/cursosProgramados/fichas",
    element: <FilePage />,
  },
  {
    path: "/progreso/cursosProgramados/fichas/aprendices",
    element: <TraineesPage />,
  },
  {
    path: "/progreso/cursosProgramados/fichas/aprendices/progreso/:nombre",
    element: <ProgressView />,
  },
  {
    path: "/progreso/ranking",
    element: <Ranking />,
  },
  {
    path: "/progreso/retroalimentacion",
    element: <Feedback />,
  },
  {
    path: "/progreso/retroalimentacion/:id",
    element: <FeedbackDetails />,
  },
  {
    path: "/progreso/retroalimentacion/detallesaprendiz",
    element: <StudentDetails />,
  },
  // Usuarios
  {
    path: "/usuarios",
    element: <UsersPage />,
  },
  // Configuración
  {
    path: "/configuracion/roles",
    element: <RolesPage />,
  },
  {
    path: "/configuracion/roles/registrarRol",
    element: <RegistrarRolPage />,
  },
  {
    path: "/configuracion/roles/editar/:id",
    element: <EditarRolPage />,
  }
]

export default routes

