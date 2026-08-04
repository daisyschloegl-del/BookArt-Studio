
export function exportPDF(text) {
    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF();

    const lines = pdf.splitTextToSize(text, 180);
    pdf.text(lines, 10, 10);

    pdf.save("buchfalten-vorlage.pdf");
}
