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
});
