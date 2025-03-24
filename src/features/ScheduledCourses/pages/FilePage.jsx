import { useNavigate } from "react-router-dom";
import GenericTable from "../../../shared/components/Table"


const files = [
    { fichas: "4556778", programa: "Programa 1", Instructor: "Instructor 1", cantidadAprendices: 10, fechaInicio: "10-10-2021", fechaFin: "10-10-2022", progreso: "10%" },
    { fichas: "2345543", programa: "Programa 2", Instructor: "Instructor 2", cantidadAprendices: 20, fechaInicio: "10-10-2021", fechaFin: "10-10-2022", progreso: "20%" },
    { fichas: "1925422", programa: "Programa 3", Instructor: "Instructor 3", cantidadAprendices: 30, fechaInicio: "10-10-2021", fechaFin: "10-10-2022", progreso: "30%" },
    { fichas: "4435672", programa: "Programa 4", Instructor: "Instructor 4", cantidadAprendices: 40, fechaInicio: "10-10-2021", fechaFin: "10-10-2022", progreso: "40%" },
    { fichas: "5543673", programa: "Programa 5", Instructor: "Instructor 5", cantidadAprendices: 50, fechaInicio: "10-10-2021", fechaFin: "10-10-2022", progreso: "50%" },
    { fichas: "6893354", programa: "Programa 6", Instructor: "Instructor 6", cantidadAprendices: 60, fechaInicio: "10-10-2021", fechaFin: "10-10-2022", progreso: "60%" },
]

const columns = [
    { key: "fichas", label: "Fichas" },
    { key: "programa", label: "Programa" },
    { key: "Instructor", label: "Instructor" },
    { key: "cantidadAprendices", label: "Cantidad de Aprendices" },
    { key: "fechaInicio", label: "Fecha de Inicio" },
    { key: "fechaFin", label: "Fecha de Fin" },
    { key: "progreso", label: "Progreso" },

]

const FilePage = () => {
    const navigate = useNavigate();

    const handleShowTrainees = () => {
        navigate("/cursosProgramados/fichas/aprendices");
    }

    return (
        <GenericTable
            data={files}
            columns={columns}
            onShow={handleShowTrainees}
            title="LISTADO DE FICHAS"
            tooltipText="Ver Aprendices"
            showActions={{ show: true, edit: false, delete: false, add: false }}
        />
    )
}

export default FilePage