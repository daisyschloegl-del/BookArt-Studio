
export function generatePattern(img, pages = 365) {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0);

    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    let result = [];

    for (let page = 0; page < pages; page++) {

        const y = Math.floor(page * canvas.height / pages);

        let start = -1;
        let end = -1;

        // erster schwarzer Pixel
        for (let x = 0; x < canvas.width; x++) {

            const i = (y * canvas.width + x) * 4;

            const gray =
                (pixels[i] +
                 pixels[i + 1] +
                 pixels[i + 2]) / 3;

            if (gray < 128) {
                start = x;
                break;
            }
        }

        // letzter schwarzer Pixel
        for (let x = canvas.width - 1; x >= 0; x--) {

            const i = (y * canvas.width + x) * 4;

            const gray =
                (pixels[i] +
                 pixels[i + 1] +
                 pixels[i + 2]) / 3;

            if (gray < 128) {
                end = x;
                break;
            }
        }

        if (start >= 0 && end >= 0) {
            result.push({
                page: page + 1,
                start,
                end
            });
        }
    }

    return result;
}
