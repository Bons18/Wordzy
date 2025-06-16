import { FileText, Music, ImageIcon } from "lucide-react";

const MaterialDetail = ({ material, onClose }) => {
  if (!material) return null;

  // Función para extraer archivos del contenido
  const extractFilesFromContent = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    const files = {
      images: [],
      documents: [],
      audios: []
    };

    // Extraer imágenes
    doc.querySelectorAll("img").forEach(img => {
      files.images.push({
        src: img.src,
        alt: img.alt || "Imagen"
      });
    });

    // Extraer documentos (enlaces con extensiones de documentos)
    doc.querySelectorAll("a").forEach(a => {
      const href = a.href;
      const text = a.textContent;
      const isDocument = /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt)$/i.test(href);

      if (isDocument) {
        files.documents.push({
          url: href,
          name: text || href.split('/').pop()
        });
      }
    });

    // Extraer audios
    doc.querySelectorAll("audio").forEach(audio => {
      const source = audio.querySelector("source");
      if (source) {
        files.audios.push({
          src: source.src,
          type: source.type
        });
      }
    });

    return files;
  };

  const files = extractFilesFromContent(material.contenido || "<div>Material de Apoyo...</div>");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header fijo */}
        <div className="p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-[#1f384c]">Detalle de material de apoyo</h2>
        </div>

        {/* Contenido con scroll */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm text-[#627b87] mb-1">Título:</label>
              <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">
                {material.titulo}
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#627b87] mb-1">Tema:</label>
              <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">{material.tema}</div>
            </div>
            <div>
              <label className="block text-sm text-[#627b87] mb-1">Fecha:</label>
              <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">
                {material.fecha_creacion
                  ? new Date(material.fecha_creacion).toLocaleDateString()
                  : "Sin fecha"}
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#627b87] mb-1">Estado:</label>
              <div className="px-3 py-2 border border-[#d9d9d9] rounded bg-[#f6f6fb]">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${material.estado === "Activo" || material.estado === "activo"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                    }`}
                >
                  {material.estado}
                </span>
              </div>
            </div>
          </div>

          {/* Sección de archivos adjuntos */}
          {(files.images.length > 0 || files.documents.length > 0 || files.audios.length > 0) && (
            <div className="mb-6">
              <label className="block text-sm text-[#627b87] mb-2">Archivos adjuntos:</label>
              <div className="border border-[#d9d9d9] rounded p-4 bg-[#f6f6fb]">
                {/* Imágenes */}
                {files.images.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-[#627b87] mb-2">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      <span>Imágenes ({files.images.length})</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {files.images.map((img, index) => (
                        <div key={index} className="border rounded overflow-hidden">
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-auto object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Documentos */}
                {files.documents.length > 0 && (
                  <div className="mb-4">
                    <div className="flex items-center text-sm text-[#627b87] mb-2">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Documentos ({files.documents.length})</span>
                    </div>
                    <div className="space-y-2">
                      {files.documents.map((doc, index) => (
                        <div
                          key={index}
                          className="p-2 border rounded hover:bg-white transition-colors"
                        >
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#007bff] hover:underline flex items-center"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            {doc.name}
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Audios */}
                {files.audios.length > 0 && (
                  <div>
                    <div className="flex items-center text-sm text-[#627b87] mb-2">
                      <Music className="h-4 w-4 mr-2" />
                      <span>Audios ({files.audios.length})</span>
                    </div>
                    <div className="space-y-3">
                      {files.audios.map((audio, index) => (
                        <div
                          key={index}
                          className="p-3 border rounded bg-white"
                        >
                          <audio controls className="w-full">
                            <source src={audio.src} type={audio.type} />
                            Tu navegador no soporta el elemento de audio.
                          </audio>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Contenido */}
          <div className="mb-6">
            <label className="block text-sm text-[#627b87] mb-1">Contenido:</label>
            <div className="border border-[#d9d9d9] rounded bg-white">
              <div className="p-4 min-h-[300px] overflow-auto">
                <div
                  className="text-sm text-[#627b87] editor-content"
                  dangerouslySetInnerHTML={{
                    __html: material.contenido || "<div>Material de Apoyo...</div>",
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer fijo */}
        <div className="p-6 border-t border-gray-200 flex justify-center flex-shrink-0">
          <button
            className="px-8 py-2 bg-[#f44144] text-white rounded-md text-[14px] hover:bg-red-600 transition-colors"
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetail;