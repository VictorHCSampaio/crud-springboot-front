const AUTH_BASE_URL = BACKEND_URL;
const AUTH_KEY = "auth";
const AUTH_2FA_KEY = "auth_2fa";

async function get2FASetup() {
    const response = await fetch(`/auth/2fa/setup`, {
        method: "POST",
        credentials: "include"
    });

    return response;
}

async function verify2FA(code) {
    const response = await fetch(`/auth/2fa/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ code: Number(code) })
    });

    return response;
}

async function signout() {
    const response = await fetch(`/auth/signout`, {
        method: "POST",
        credentials: "include"
    });

    return response;
}

function hasPrimaryAuth() {
    return localStorage.getItem(AUTH_KEY) === "true";
}

function hasFullAuth() {
    return localStorage.getItem(AUTH_2FA_KEY) === "true";
}

function markFullAuth() {
    localStorage.setItem(AUTH_2FA_KEY, "true");
}

function clearAuthState() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_2FA_KEY);
}

function requireFullAuth() {
    if (!hasPrimaryAuth()) {
        window.location.href = "login.html";
        return;
    }

    if (!hasFullAuth()) {
        window.location.href = "2fa.html";
    }
}
