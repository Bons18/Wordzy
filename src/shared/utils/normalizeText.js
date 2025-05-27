export const normalizeText = (text) =>
  text
    .normalize("NFD") // Normaliza el texto para separar caracteres acentuados
    .replace(/[\u0300-\u036f]/g, "") 
    .replace(/\s+/g, " ") // Reemplaza múltiples espacios por uno solo
    .toLowerCase() 
    .trim(); // Quita espacios al inicio y final