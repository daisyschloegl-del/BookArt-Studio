
export function generatePattern(img, maxPages = 365) {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const scale = 400 / img.width;

    canvas.width = 400;
    canvas.height = Math.round(img.height * scale);

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    const totalPages = Math.min(canvas.height, maxPages);

    const result = [];

    for (let y = 0; y < totalPages; y++) {

        let left = null;
        let right = null;

        for (let x = 0; x < canvas.width; x++) {

            const i = (y * canvas.width + x) * 4;

            const r = pixels[i];
            const g = pixels[i + 1];
            const b = pixels[i + 2];

            const brightness = (r + g + b) / 3;

            if (brightness < 128) {

                if (left === null) left = x;

                right = x;
            }
        }

        if (left !== null) {

            result.push({
                page: y + 1,
                start: left,
                end: right
            });

        } else {

            result.push({
                page: y + 1,
                start: "-",
                end: "-"
            });

        }
    }

    return result;
}
