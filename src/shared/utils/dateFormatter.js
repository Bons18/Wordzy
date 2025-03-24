export const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0'); // Asegura dos dígitos para el día
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan en 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Formato día/mes/año
  };