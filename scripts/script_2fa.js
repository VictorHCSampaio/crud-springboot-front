const twoFaForm = document.getElementById("twoFaForm");
const twoFaCodeInput = document.getElementById("twoFaCode");
const twoFaMessage = document.getElementById("twoFaMessage");
const verifyTwoFaBtn = document.getElementById("verifyTwoFaBtn");
const setupTwoFaBtn = document.getElementById("setupTwoFaBtn");
const twoFaSetupResult = document.getElementById("twoFaSetupResult");
const twoFaQrImage = document.getElementById("twoFaQrImage");
const twoFaSecretText = document.getElementById("twoFaSecretText");

if (!hasPrimaryAuth()) {
    window.location.href = "login.html";
}

if (hasFullAuth()) {
    window.location.href = "index.html";
}

function setMessage(message, isSuccess) {
    twoFaMessage.textContent = message;
    twoFaMessage.classList.toggle("success-message", Boolean(isSuccess));
}

function setButtonLoading(button, isLoading, loadingText, defaultText) {
    button.disabled = isLoading;
    button.textContent = isLoading ? loadingText : defaultText;
}

twoFaCodeInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 6);
});

twoFaForm.addEventListener("submit", async function (event) {
    event.preventDefault();
    setMessage("", false);

    const code = twoFaCodeInput.value.trim();
    if (!/^\d{6}$/.test(code)) {
        setMessage("O código 2FA deve ter exatamente 6 dígitos.", false);
        return;
    }

    setButtonLoading(verifyTwoFaBtn, true, "Validando...", "Validar código");

    try {
        const response = await verify2FA(code);

        if (response.ok) {
            markFullAuth();
            window.location.href = "index.html";
            return;
        }

        if (response.status === 401) {
            setMessage("Código 2FA inválido", false);
            return;
        }

        if (response.status === 423) {
            setMessage("Conta temporariamente bloqueada", false);
            return;
        }

        setMessage("Não foi possível validar o 2FA no momento.", false);
    } catch (error) {
        setMessage("Backend indisponível em localhost:8443", false);
    } finally {
        setButtonLoading(verifyTwoFaBtn, false, "Validando...", "Validar código");
    }
});

setupTwoFaBtn.addEventListener("click", async function () {
    setMessage("", false);
    setButtonLoading(setupTwoFaBtn, true, "Carregando QR...", "Configurar autenticador (QR)");

    try {
        const response = await get2FASetup();

        if (!response.ok) {
            setMessage("Não foi possível obter configuração 2FA agora.", false);
            return;
        }

        const data = await response.json();
        const qrUri = data.qrUri || "";
        const secret = data.secret || "";

        if (qrUri) {
            twoFaQrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(qrUri)}`;
        } else {
            twoFaQrImage.removeAttribute("src");
        }

        twoFaSecretText.textContent = secret || "Secret não retornado.";
        twoFaSetupResult.classList.remove("hidden");
        setMessage("Configuração carregada com sucesso.", true);
    } catch (error) {
        setMessage("Backend indisponível em localhost:8443", false);
    } finally {
        setButtonLoading(setupTwoFaBtn, false, "Carregando QR...", "Configurar autenticador (QR)");
    }
});
