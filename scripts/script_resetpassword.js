const AUTH_BASE_URL = `${BACKEND_URL}/auth`;
const REQUEST_URL = `${AUTH_BASE_URL}/password-reset/request`;
const CONFIRM_URL = `${AUTH_BASE_URL}/password-reset/confirm`;

const requestForm = document.getElementById("resetRequestForm");
const confirmForm = document.getElementById("resetConfirmForm");
const requestMessage = document.getElementById("requestMessage");
const confirmMessage = document.getElementById("confirmMessage");
const requestDiv = document.getElementById("requestForm");
const confirmDiv = document.getElementById("confirmForm");

requestForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    requestMessage.textContent = "";
    requestMessage.classList.remove("success-message");

    const email = document.getElementById("email").value.trim();
    const payload = { email };

    try {
        const response = await fetch(REQUEST_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            if (response.status === 400) {
                requestMessage.textContent = "E-mail inválido ou não encontrado.";
                return;
            }
            if (response.status === 404) {
                requestMessage.textContent = "Endpoint de reset não encontrado em localhost:8443.";
                return;
            }
            requestMessage.textContent = "Erro ao enviar solicitação. Tente novamente.";
            return;
        }

        requestMessage.textContent = "Código enviado para seu e-mail. Verifique sua caixa de entrada.";
        requestMessage.classList.add("success-message");
        requestDiv.classList.add("hidden");
        confirmDiv.classList.remove("hidden");
    } catch (error) {
        requestMessage.textContent = "Backend indisponível em localhost:8443. Inicie a API e tente novamente.";
    }
});

confirmForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    confirmMessage.textContent = "";
    confirmMessage.classList.remove("success-message");

    const token = document.getElementById("token").value.trim();
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (newPassword !== confirmPassword) {
        confirmMessage.textContent = "As senhas não coincidem.";
        return;
    }

    const payload = { token, newPassword };

    try {
        const response = await fetch(CONFIRM_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            if (response.status === 400) {
                confirmMessage.textContent = "Código inválido ou expirado.";
                return;
            }
            if (response.status === 404) {
                confirmMessage.textContent = "Endpoint de confirmação não encontrado em localhost:8443.";
                return;
            }
            confirmMessage.textContent = "Erro ao resetar senha. Tente novamente.";
            return;
        }

        confirmMessage.textContent = "Senha resetada com sucesso. Redirecionando para login...";
        confirmMessage.classList.add("success-message");
        setTimeout(() => {
            window.location.href = "login.html?reset=true";
        }, 2000);
    } catch (error) {
        confirmMessage.textContent = "Backend indisponível em localhost:8443. Inicie a API e tente novamente.";
    }
});
