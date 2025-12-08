document.addEventListener("DOMContentLoaded", (_e) => {
    const discount = sessionStorage.getItem("discount");
    const gotDiscount = sessionStorage.getItem("got-discount") === "true";
    const msg = document.querySelector("#discount-message");
    if (gotDiscount) {
        msg.textContent = `You won a ${discount} discount!`;
    }
    document.addEventListener("discount-claimed", (event) => {
        const { discount } = event.detail;

        document.querySelectorAll("ryug-discount-slot").forEach((slot) => {
            if (slot !== event.target && typeof slot.lock === "function") {
                slot.lock();
            }
        });
        const header = document.getElementById("header");
        if (header) {
            msg.textContent = `You won a ${discount} discount!`;
        }
        console.log("User got discount:", discount);
    });
});
