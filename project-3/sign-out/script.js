document.addEventListener('DOMContentLoaded', (_e) => {
    sessionStorage.setItem("signed-in", false);
    sessionStorage.setItem("got-discount", false);
    sessionStorage.setItem("discount", null);
    window.location.href = "../sign-in/";
})
