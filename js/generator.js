export function generatePattern(img, pages = 365) {

    const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const scale = 400 / img.width;

canvas.width = 400;
canvas.height = Math.round(img.height * scale);

ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

const pages = canvas.height;

    let result = [];

    for (let y = 0; y < pages; y++) {

        let left = null;
        let right = null;

        for (let x = 0; x < canvas.width; x++) {

            const i = (y * canvas.width + x) * 4;

            const gray =
                (pixels[i] +
                 pixels[i + 1] +
                 pixels[i + 2]) / 3;

            // Heller Hintergrund wird ignoriert
if (gray < 200) {

                if (left === null) left = x;

                right = x;
            }
        }

        if (left !== null) {

            const start = Math.round(left * 90 / canvas.width);
            const end = Math.round(right * 90 / canvas.width);

            result.push({
                page: y + 1,
                start,
                end
            });

        }

    }

    // Leere Seiten am Anfang entfernen
while (result.length && result[0].start === 0 && result[0].end === 90) {
    result.shift();
}

// Leere Seiten am Ende entfernen
while (result.length &&
       result[result.length - 1].start === 0 &&
       result[result.length - 1].end === 90) {
    result.pop();
}

// Seiten neu nummerieren
result = result.map((row, index) => ({
    page: index + 1,
    start: row.start,
    end: row.end
}));

return result;

}
