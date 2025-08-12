document.addEventListener("DOMContentLoaded", () => {
    const postalCodeLink = document.getElementById("postal-code-trigger");
    const modal = document.getElementById("postal-code-modal");
    const closeButton = document.getElementById("postal-modal-close");
    const postalCodeInput = document.getElementById("postal-input");
    const checkButton = document.getElementById("postal-save");
    const statusMessage = document.getElementById("modal-status-message");

    if (postalCodeLink && modal && closeButton && postalCodeInput && checkButton && statusMessage) {
        postalCodeLink.addEventListener("click", (e) => {
            e.preventDefault();
            modal.style.display = "block";
        });

        closeButton.addEventListener("click", () => {
            modal.style.display = "none";
        });

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none";
            }
        });

        checkButton.addEventListener("click", () => {
            const postalCode = postalCodeInput.value.trim();
            if (postalCode) {
                statusMessage.textContent = `Verificando disponibilidade para ${postalCode}...`;
                // Aqui você pode adicionar a lógica para verificar o CEP com uma API real
                // Por enquanto, vamos simular uma resposta
                setTimeout(() => {
                    statusMessage.textContent = `Código postal ${postalCode} guardado!`;
                    modal.style.display = "none"; // Fechar o modal após salvar
                }, 1000);
            } else {
                statusMessage.textContent = "Por favor, insira um código postal.";
            }
        });
    }
});

