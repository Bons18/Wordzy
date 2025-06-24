"use client"

const QuickActions = ({ onAction }) => {
  const actions = [
    { key: "activar-todos", label: "Activar Todos" },
    { key: "desactivar-todos", label: "Desactivar Todos" },
    { key: "hasta-a2", label: "Hasta A2" },
    { key: "hasta-b1", label: "Hasta B1" },
    { key: "hasta-b2", label: "Hasta B2" },
    { key: "hasta-c1", label: "Hasta C1" },
  ]

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {actions.map((action) => (
        <button
          key={action.key}
          onClick={() => onAction(action.key)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}

export default QuickActions
