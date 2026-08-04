
import { generatePattern } from "./generator.js";
import { exportPDF } from "./pdf.js";
document.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("imageInput");
    const preview = document.getElementById("preview");
    const button = document.getElementById("generateBtn");

    input.addEventListener("change", () => {
        const file = input.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = e => {
            preview.src = e.target.result;
            preview.style.display = "block";
        };

        reader.readAsDataURL(file);
    });

    button.addEventListener("click", () => {

        

        let result;

if (preview.complete && preview.naturalWidth) {
    result = generatePattern(preview, 365);
} else {
    result = generateTextPattern();
}

        let text = "Seite | Start | Ende\n";
        text += "--------------------\n";

        result.forEach(r => {
            text += `${r.page} | ${r.start} | ${r.end}\n`;
        });

        exportPDF(text);
    });

});
function generateTextPattern() {
    return [
        { page: 1, start: 40, end: 120 },
        { page: 2, start: 38, end: 122 },
        { page: 3, start: 36, end: 124 },
        { page: 4, start: 34, end: 126 },
        { page: 5, start: 32, end: 128 },
        { page: 6, start: 30, end: 130 },
        { page: 7, start: 28, end: 132 },
        { page: 8, start: 26, end: 134 },
        { page: 9, start: 24, end: 136 },
        { page: 10, start: 22, end: 138 }
    ];
}
