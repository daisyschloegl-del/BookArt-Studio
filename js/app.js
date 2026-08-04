
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
    const textInput = document.getElementById("textInput").value;

    alert("Text erkannt: " + textInput);

    return [
        { page: 1, start: 40, end: 120 }
    ];
}
    
