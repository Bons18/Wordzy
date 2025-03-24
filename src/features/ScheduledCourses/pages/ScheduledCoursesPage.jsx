import { useNavigate } from "react-router-dom";
import GenericTable from "../../../shared/components/Table"


const scheduledCourses = [
    { nivel: "Nivel 1", cantidadFichas: "25", cantidadInstructores: "3", progresoGeneral: "25%" },
    { nivel: "Nivel 2", cantidadFichas: "30", cantidadInstructores: "4", progresoGeneral: "100%" },
    { nivel: "Nivel 3", cantidadFichas: "29", cantidadInstructores: "1", progresoGeneral: "50%" },
    { nivel: "Nivel 4", cantidadFichas: "10", cantidadInstructores: "5", progresoGeneral: "10%" },
    { nivel: "Nivel 5", cantidadFichas: "13", cantidadInstructores: "2", progresoGeneral: "75%" },
    { nivel: "Nivel 6", cantidadFichas: "8", cantidadInstructores: "3", progresoGeneral: "80%" },
]

const columns = [
    { key: "nivel", label: "Nivel" },
    { key: "cantidadFichas", label: "Cantidad Fichas" },
    { key: "cantidadInstructores", label: "Cantidad Instructores" },
    { key: "progresoGeneral", label: "Progreso General" },

]

const ScheduledCoursesPage = () => {
    const navigate = useNavigate();

    const handleShowProgramming = () => {
        navigate("/cursosProgramados/fichas");
    }

    return (
        <GenericTable
            data={scheduledCourses}
            columns={columns}
            onShow={handleShowProgramming}
            title="LISTADO DE NIVELES"
            tooltipText="Ver Fichas"
            showActions={{ show: true, edit: false, delete: false, add: false }}
        />
    )
}

export default ScheduledCoursesPage