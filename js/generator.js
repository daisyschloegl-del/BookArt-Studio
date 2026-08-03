
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("imageInput");
    const preview = document.getElementById("preview");

    input.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function(e) {
            preview.src = e.target.result;
            preview.style.display = "block";
        };

        reader.readAsDataURL(file);
    });
    const generateBtn = document.getElementById("generateBtn");

generateBtn.addEventListener("click", () => {
    if (!preview.src) {
        alert("Bitte zuerst ein Bild auswählen.");
        return;
    }

    const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const img = new Image();

img.onload = () => {

    canvas.width = img.width;
    canvas.height = img.height;

    ctx.drawImage(img, 0, 0);

    const image = ctx.getImageData(0, 0, canvas.width, canvas.height);

    let pixels = image.data;

    let result = [];

    const pages = 400;

    for (let page = 0; page < pages; page++) {

        const x = Math.floor(page * canvas.width / pages);

        let top = null;
        let bottom = null;

        for (let y = 0; y < canvas.height; y++) {

            const i = (y * canvas.width + x) * 4;

            const gray =
                (pixels[i] +
                 pixels[i + 1] +
                 pixels[i + 2]) / 3;

            if (gray < 128) {

                if (top === null) top = y;

                bottom = y;

            }

        }

        if (top !== null) {

            result.push({
                page: page + 1,
                start: top,
                end: bottom
            });

        }

    }

    console.log(result);

    alert(
        result.length +
        " Seiten erkannt.\nSiehe Browser-Konsole."
    );

};

img.src = preview.src;
});
});
