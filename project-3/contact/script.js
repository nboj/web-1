document.addEventListener("DOMContentLoaded", (_e) => {
    const inputs = document.querySelectorAll("input");
    for (let input of inputs) {
        const checkInput = (_e) => {
            const labels = input.labels;
            if (labels.length <= 0) {
                return
            }
            const label = labels[0];
            const value = input.value;
            if (value) {
                label.style.display = "none";
            } else {
                label.style.display = "block";
            }
        }
        checkInput();
        input.addEventListener("input", checkInput);
    }
})
