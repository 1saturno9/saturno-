import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default function Home() {
  const [portada, setPortada] = useState(null);
  const [contraportada, setContraportada] = useState(null);
  const [archivoLibro, setArchivoLibro] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const handleLoadPdf = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div style={{ backgroundColor: '#1b1b2f', color: 'white', padding: '2rem', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '1.8rem', textAlign: 'center' }}>Libro Digital - Estilo Saturno</h1>

      <div style={{ marginBottom: '1rem' }}>
        <label>Subir portada:</label>
        <input type="file" accept="image/*" onChange={(e) => setPortada(URL.createObjectURL(e.target.files[0]))} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Subir contraportada:</label>
        <input type="file" accept="image/*" onChange={(e) => setContraportada(URL.createObjectURL(e.target.files[0]))} />
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <label>Subir libro en PDF:</label>
        <input type="file" accept="application/pdf" onChange={(e) => setArchivoLibro(e.target.files[0])} />
      </div>

      <div style={{ maxWidth: '360px', margin: '0 auto' }}>
        {portada && <img src={portada} alt="Portada" style={{ width: '100%', marginBottom: '1rem' }} />}
        {archivoLibro && (
          <Document file={archivoLibro} onLoadSuccess={handleLoadPdf}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} width={360} />
            ))}
          </Document>
        )}
        {contraportada && <img src={contraportada} alt="Contraportada" style={{ width: '100%', marginTop: '1rem' }} />}
      </div>
    </div>
  );
}