document.addEventListener('DOMContentLoaded', (_e) => {
    sessionStorage.setItem("signed-in", false);
    window.location.href = "/sign-in";
})
