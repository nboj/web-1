document.addEventListener('DOMContentLoaded', (_e) => {
    sessionStorage.setItem("signed-in", false);
    sessionStorage.setItem("got-discount", false);
    sessionStorage.setItem("discount", null);
    const href = new URL("/project-3/sign-in", import.meta.url);
    window.location.href = href;
})
