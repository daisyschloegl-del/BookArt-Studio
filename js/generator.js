export function generatePattern(img, pages = 365) {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = pages;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

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

    return result;

}
