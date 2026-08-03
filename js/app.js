
import { generatePattern } from "./generator.js";

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

        if (!preview.complete || !preview.naturalWidth) {
            alert("Bitte zuerst ein Bild auswählen.");
            return;
        }

        const result = generatePattern(preview, 365);

        let text = "Seite | Start | Ende\n";
        text += "--------------------\n";

        result.forEach(r => {
            text += `${r.page} | ${r.start} | ${r.end}\n`;
        });

        const win = window.open("", "_blank");

if (win) {
    win.document.write("<pre>" + text + "</pre>");
} else {
    alert(text);
}
    });

});
