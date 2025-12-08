const signedIn = sessionStorage.getItem("signed-in") === "true";
if (!signedIn) {
    window.location.href = new URL("./sign-in", import.meta.url);
}

