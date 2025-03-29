import React from "react";

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  confirmColor = "bg-[#f44144] hover:bg-red-600",
  showButtonCancel = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4 transform transition-all">
        <div className="p-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-[#1f384c]">{title}</h3>
            <p className="mt-2 text-[#627b87]">{message}</p>
          </div>

          <div className="flex justify-center gap-3">
            {showButtonCancel && (
            <button
              className="px-6 py-2.5 border border-[#d9d9d9] rounded-lg text-[#627b87] hover:bg-gray-50 font-medium transition-colors"
              onClick={onClose}
            >
              Cancelar
            </button>
            )}
            <button
              className={`px-6 py-2.5 ${confirmColor} text-white rounded-lg font-medium transition-colors`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;