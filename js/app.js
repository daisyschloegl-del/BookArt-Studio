
import { generatePattern } from "./generator.js";
import { exportPDF } from "./pdf.js";

function generateTextPattern() {
    const inputText = document
        .getElementById("textInput")
        .value
        .trim();

    const font = document
        .getElementById("fontSelect")
        .value;

    if (!inputText) {
        alert("Bitte einen Text eingeben.");
        return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 1200;
    canvas.height = 800;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    switch (font) {
        case "script":
            ctx.font = "300px cursive";
            break;

        case "serif":
            ctx.font = "300px serif";
            break;

        default:
            ctx.font = "300px sans-serif";
    }

    ctx.fillText(
        inputText,
        canvas.width / 2,
        canvas.height / 2
    );

    const img = new Image();

    img.onload = () => {
        const pattern = generatePattern(img, 365);

        let pdfText = "Seite | Start | Ende\n";
        pdfText += "---------------------\n";

        pattern.forEach((row) => {
            pdfText += `${row.page} | ${row.start} | ${row.end}\n`;
        });

        exportPDF(pdfText);
    };

    img.onerror = () => {
        alert("Das Textbild konnte nicht verarbeitet werden.");
    };

    img.src = canvas.toDataURL("image/png");
}

const button = document.getElementById("generateBtn");

if (button) {
    button.addEventListener("click", generateTextPattern);
} else {
    console.error("generateBtn wurde nicht gefunden.");
}
