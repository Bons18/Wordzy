import React from "react";

/**
 * Componente Tooltip reutilizable
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Contenido del botón o elemento que activa el tooltip
 * @param {string} props.text - Texto que se mostrará en el tooltip
 * @param {string} [props.position="bottom"] - Posición del tooltip (top, bottom, left, right)
 * @returns {JSX.Element} Componente Tooltip
 */
const Tooltip = ({ children, text, position = "bottom" }) => {
  // Estilos base del tooltip
  const tooltipClasses = `
    absolute
    bg-gray-800
    text-white
    text-xs
    px-2
    py-1
    rounded
    opacity-0
    group-hover:opacity-100
    transition-opacity
    whitespace-nowrap
  `;

  // Posicionamiento del tooltip
  const positionClasses = {
    top: "bottom-10 left-1/2 transform -translate-x-1/2",
    bottom: "top-10 left-1/2 transform -translate-x-1/2",
    left: "right-10 top-1/2 transform -translate-y-1/2",
    right: "left-10 top-1/2 transform -translate-y-1/2",
  };

  return (
    <div className="relative group">
      {children} {/* Botón o elemento que activa el tooltip */}
      <span className={`${tooltipClasses} ${positionClasses[position]}`}>
        {text} {/* Texto del tooltip */}
      </span>
    </div>
  );
};

export default Tooltip;