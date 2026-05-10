const AUTH_KEY = "auth";
const AUTH_BASE_URL = BACKEND_URL;
const LOGIN_URL = `/auth/login`;

if (localStorage.getItem("auth_2fa") === "true") {
    window.location.href = "index.html";
} else if (localStorage.getItem(AUTH_KEY) === "true") {
    window.location.href = "2fa.html";
}

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.get("registered") === "true") {
    loginMessage.textContent = "Conta criada com sucesso. Faça login para continuar.";
    loginMessage.classList.add("success-message");
} else if (urlParams.get("reset") === "true") {
    loginMessage.textContent = "Senha resetada com sucesso. Faça login com sua nova senha.";
    loginMessage.classList.add("success-message");
}

loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    loginMessage.textContent = "";
    loginMessage.classList.remove("success-message");

    const username = document.getElementById("usuario").value.trim();
    const password = document.getElementById("senha").value;
    const payload = { username, password };

    try {
        const response = await fetch(LOGIN_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                loginMessage.textContent = "Usuário ou senha inválidos.";
                return;
            }
            if (response.status === 404) {
                loginMessage.textContent = "Endpoint de login não encontrado em localhost:8443.";
                return;
            }
            loginMessage.textContent = "Não foi possível autenticar no momento. Tente novamente.";
            return;
        }

        localStorage.setItem(AUTH_KEY, "true");
        localStorage.removeItem("auth_2fa");
        window.location.href = "2fa.html";
    } catch (error) {
        loginMessage.textContent = "Backend indisponível em localhost:8443. Inicie a API e tente novamente.";
    }
});
