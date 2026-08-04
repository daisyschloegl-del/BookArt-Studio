
   function generateTextPattern() {
    const textInput = document.getElementById("textInput").value;
    const font = document.getElementById("fontSelect").value;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 200;

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `80px ${font}`;

    ctx.fillText(textInput, canvas.width / 2, canvas.height / 2);

    const img = new Image();
    img.src = canvas.toDataURL();

    return generatePattern(img, 365);
} 
