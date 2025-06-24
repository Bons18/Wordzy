"use client"

const InstructorDetailModal = ({ instructor, onClose }) => {
  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {instructor ? `${instructor.nombre} ${instructor.apellido}` : "Instructor"}
                  </h2>
                  <div className="mt-2">
                    {instructor ? (
                      <>
                        <p className="text-gray-500 text-sm">Email: {instructor.email}</p>
                        <p className="text-gray-500 text-sm">Teléfono: {instructor.telefono}</p>
                        {/* Add more instructor details here */}
                      </>
                    ) : (
                      <p className="text-gray-500 text-sm">Error al buscar los usuarios</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorDetailModal
