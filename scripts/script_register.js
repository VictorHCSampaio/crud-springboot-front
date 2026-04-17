const AUTH_BASE_URL = "http://localhost:8080";
const REGISTER_URL = `${AUTH_BASE_URL}/auth/register`;

const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

registerForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    registerMessage.textContent = "";
    registerMessage.classList.remove("success-message");

    const nome = document.getElementById("nome").value.trim();
    const username = document.getElementById("usuario").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("senha").value;

    const payload = { nome, username, email, password };

    try {
        const response = await fetch(REGISTER_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            if (response.status === 400 || response.status === 409) {
                registerMessage.textContent = "Dados inválidos ou usuário já cadastrado.";
                return;
            }
            if (response.status === 404) {
                registerMessage.textContent = "Endpoint de cadastro não encontrado em localhost:8080.";
                return;
            }
            registerMessage.textContent = "Não foi possível concluir o cadastro agora.";
            return;
        }

        window.location.href = "login.html?registered=true";
    } catch (error) {
        registerMessage.textContent = "Backend indisponível em localhost:8080. Inicie a API e tente novamente.";
    }
});
