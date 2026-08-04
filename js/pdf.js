export function exportPDF(pattern) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  pdf.setFont("courier", "normal");
  pdf.setFontSize(10);

  pdf.text("Buchfaltvorlage", 10, 10);

  let y = 20;

  pattern.forEach(entry => {
    pdf.text(
      `${entry.page}\t${entry.start}\t${entry.end}`,
      10,
      y
    );

    y += 6;

    if (y > 280) {
      pdf.addPage();
      y = 20;
    }
  });

  pdf.save("buchfalt-vorlage.pdf");
}
