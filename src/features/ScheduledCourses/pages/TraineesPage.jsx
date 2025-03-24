import GenericTable from "../../../shared/components/Table"


const trainees = [
    { nombre: "Juan Perez", correo: "juan@gmail.com", telefono: "1234567890", progreso: "10%", puntosTotales: "100", ultimaConexion: "10-10-2021" },
    { nombre: "Maria Rodriguez", correo: "maria@gmail.com", telefono: "1234567890", progreso: "20%", puntosTotales: "200", ultimaConexion: "10-10-2021" },
    { nombre: "Pedro Gomez", correo: "pedro@gmail.com", telefono: "1234567890", progreso: "30%", puntosTotales: "300", ultimaConexion: "10-10-2021" },
    { nombre: "Ana Perez", correo: "ana@gmail.com", telefono: "1234567890", progreso: "40%", puntosTotales: "400", ultimaConexion: "10-10-2021" },
    { nombre: "Luisa Rodriguez", correo: "luisa@gmail.com", telefono: "1234567890", progreso: "50%", puntosTotales: "500", ultimaConexion: "10-10-2021" },
    { nombre: "Carlos Gomez", correo: "carlos@gmail.com", telefono: "1234567890", progreso: "60%", puntosTotales: "600", ultimaConexion: "10-10-2021" },
]

const columns = [
    { key: "nombre", label: "Nombre" },
    { key: "correo", label: "Correo" },
    { key: "telefono", label: "Teléfono" },
    { key: "progreso", label: "Progreso" },
    { key: "puntosTotales", label: "Puntos Totales" },
    { key: "ultimaConexion", label: "Última Conexión" },

]

const TraineesPage = () => {
    const handleShowProgress = (progress) => {
        console.log("Detalle del progreso:", progress)
    }

    return (
        <GenericTable
            data={trainees}
            columns={columns}
            onShow={handleShowProgress}
            title="LISTADO DE APRENDICES"
            tooltipText="Ver Progreso"
            showActions={{ show: true, edit: false, delete: false, add: false }}
        />
    )
}

export default TraineesPage