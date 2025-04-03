import React from "react";

const PdfViewer = () => {
    const pdfUrl = "C:\\Published_Project\\mskvy_Publish\\UploadedFile\\Order-in-Case-No.-32-of-2024.pdf";
  if (!pdfUrl) {
    return <p style={{ color: "red", textAlign: "center" }}>No PDF URL provided</p>;
  }

  return (
    <div style={{ width: "100%", height: "500px", border: "1px solid #ccc" }}>
      <iframe 
        src={pdfUrl} 
        title="PDF Viewer" 
        width="100%" 
        height="100%" 
        style={{ border: "none" }}
      />
    </div>
  );
};

export default PdfViewer;
