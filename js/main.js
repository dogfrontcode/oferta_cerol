document.addEventListener("DOMContentLoaded", () => {
    const sizeOptions = document.querySelectorAll(".size-option");
    const priceMain = document.querySelector(".price-main");
    const sizeHighlight = document.querySelector(".size-highlight");
    const sizeChangeMessage = document.getElementById("size-change-message");
    const luroySlatsOption = document.querySelector('input[name="slats"][value="luroy"]');
    const luroySlatsPrice = document.getElementById("luroy-price");
    const luroySlatsSize = document.getElementById("slats-size");

    // Elementos de detalhes técnicos (medidas)
    const dimensionText = document.getElementById("dimension-text");
    const bedLength = document.getElementById("bed-length");
    const bedWidth = document.getElementById("bed-width");
    const bedHeight = document.getElementById("bed-height");
    const mattressLength = document.getElementById("mattress-length");
    const mattressWidth = document.getElementById("mattress-width");
    const drawerHeight = document.getElementById("drawer-height");
    const drawerWidth = document.getElementById("drawer-width");
    const drawerDepth = document.getElementById("drawer-depth");

    const bedPrices = {
        "140x200": "199",
        "160x200": "229"
    };

    const slatPrices = {
        "140x200": "40",
        "160x200": "50"
    };

    // Imagens de medidas por tamanho (na pasta "imagens/")
    const measureImagesBySize = {
        "140x200": "images/medida-140x200.jpg",
        "160x200": "images/medida-160x200.png"
    };

    // Atualiza a miniatura 2 (índice 1) e o item correspondente do modal para a imagem de medidas
    function updateMeasureImage(selectedSize) {
        const baseSrc = measureImagesBySize[selectedSize];
        const newSrc = `${baseSrc}?size=${encodeURIComponent(selectedSize)}`; // cache-buster
        if (!newSrc) return;

        // Atualizar a 2ª miniatura (data-index="1")
        const measureThumb = document.querySelector('.thumbnail[data-index="1"]');
        if (measureThumb) {
            // fallback caso a PNG não exista
            measureThumb.onerror = () => {
                console.warn("Imagem de medidas não encontrada:", newSrc, "— voltando à imagem padrão .jpg");
                const fallback = "images/brimnes-estrutura-cama-c-arrumacao-branco__0800869_ph163683_s5.jpg";
                measureThumb.src = fallback;
                measureThumb.dataset.main = fallback;
                if (window && window.galleryImages && window.galleryImages[1]) {
                    window.galleryImages[1].src = fallback;
                    window.galleryImages[1].alt = "Vista das gavetas da BRIMNES";
                    window.galleryImages[1].description = "Gavetas";
                }
            };

            measureThumb.src = newSrc;
            measureThumb.dataset.main = newSrc;
            measureThumb.alt = `Medidas ${selectedSize}`;
        }

        // Se a imagem principal estiver a mostrar a antiga de índice 1 ou uma medida anterior, sincronizar
        const mainImageEl = document.getElementById("mainImage");
        if (mainImageEl) {
            const showingOldSecond =
                mainImageEl.src.includes("brimnes-estrutura-cama-c-arrumacao-branco__0780630_") ||
                mainImageEl.src.includes("medida-140x200") ||
                mainImageEl.src.includes("medida-160x200");
            if (showingOldSecond) {
                mainImageEl.src = newSrc;
            }
        }

        // Atualizar array usado no modal, quando já estiver disponível
        if (window && window.galleryImages && window.galleryImages[1]) {
            window.galleryImages[1].src = newSrc;
            window.galleryImages[1].alt = `Medidas ${selectedSize}`;
            window.galleryImages[1].description = "Medidas";
        }
    }

    // Tabela com dados técnicos por tamanho
    const technicalDetailsBySize = {
        "160x200": {
            bed: { length: "206 cm", width: "166 cm", height: "47 cm" },
            mattress: { length: "200 cm", width: "160 cm" },
            drawer: { height: "20 cm", width: "94 cm", depth: "54 cm" }
        },
        "140x200": {
            bed: { length: "206 cm", width: "146 cm", height: "47 cm" },
            mattress: { length: "200 cm", width: "140 cm" },
            drawer: { height: "20 cm", width: "94 cm", depth: "54 cm" }
        }
    };

    function updateTechnicalDetails(selectedSize) {
        const data = technicalDetailsBySize[selectedSize];
        if (!data) return;

        if (dimensionText) dimensionText.textContent = `${selectedSize} cm`;
        if (bedLength) bedLength.textContent = data.bed.length;
        if (bedWidth) bedWidth.textContent = data.bed.width;
        if (bedHeight) bedHeight.textContent = data.bed.height;
        if (mattressLength) mattressLength.textContent = data.mattress.length;
        if (mattressWidth) mattressWidth.textContent = data.mattress.width;
        if (drawerHeight) drawerHeight.textContent = data.drawer.height;
        if (drawerWidth) drawerWidth.textContent = data.drawer.width;
        if (drawerDepth) drawerDepth.textContent = data.drawer.depth;
    }

    function updatePrices(selectedSize) {
        if (priceMain) {
            priceMain.textContent = bedPrices[selectedSize];
        }
        
        if (sizeHighlight) {
            sizeHighlight.textContent = selectedSize + " cm";
        }
        
        if (luroySlatsOption && luroySlatsPrice && luroySlatsSize) {
            luroySlatsPrice.textContent = slatPrices[selectedSize] + "€";
            luroySlatsSize.textContent = selectedSize + " cm";
        }
        
        // Não atualizar quantidade aqui para evitar conflitos
    }

    function updateSizeButtons(selectedSize) {
        sizeOptions.forEach(button => {
            const priceElement = button.querySelector('.text-xs');
            if (button.dataset.size === selectedSize) {
                button.classList.add("active");
                button.classList.remove("border", "border-gray-300", "text-gray-700", "hover:bg-gray-50");
                button.classList.add("bg-ikea-blue", "text-white", "hover:bg-blue-700", "shadow-md");
                if (priceElement) {
                    priceElement.classList.remove("text-gray-500");
                    priceElement.classList.add("opacity-90");
                }
            } else {
                button.classList.remove("active");
                button.classList.remove("bg-ikea-blue", "text-white", "hover:bg-blue-700", "shadow-md");
                button.classList.add("border", "border-gray-300", "text-gray-700", "hover:bg-gray-50");
                if (priceElement) {
                    priceElement.classList.remove("opacity-90");
                    priceElement.classList.add("text-gray-500");
                }
            }
        });
    }

    sizeOptions.forEach(button => {
        button.addEventListener("click", () => {
            const selectedSize = button.dataset.size;
            
            updateSizeButtons(selectedSize);
            updatePrices(selectedSize);
            updateTechnicalDetails(selectedSize);
            updateMeasureImage(selectedSize);
            
            // Mostrar mensagem de confirmação
            if (sizeChangeMessage) {
                sizeChangeMessage.classList.remove("hidden");
                setTimeout(() => {
                    sizeChangeMessage.classList.add("hidden");
                }, 2000);
            }
        });
    });

    // Inicializar com a primeira opção selecionada
    const initialSize = "140x200";
    updateSizeButtons(initialSize);
    updatePrices(initialSize);
    updateTechnicalDetails(initialSize);

    // Image gallery functionality - SOLUÇÃO DEFINITIVA
    console.log("=== INICIANDO GALERIA - SOLUÇÃO DEFINITIVA ===");
    
    // Função para inicializar a galeria
    function initializeGallery() {
        console.log("=== INICIALIZANDO GALERIA ===");
        
        const mainImage = document.getElementById("mainImage");
        const thumbnails = document.querySelectorAll(".thumbnail");
        const prevImageBtn = document.getElementById("prevImage");
        const nextImageBtn = document.getElementById("nextImage");
        const imageCounter = document.getElementById("imageCounter");
        
        console.log("Elementos encontrados:");
        console.log("- Imagem principal:", mainImage);
        console.log("- Miniaturas:", thumbnails.length);
        console.log("- Botão anterior:", prevImageBtn);
        console.log("- Botão próximo:", nextImageBtn);
        console.log("- Contador:", imageCounter);
        
        if (!mainImage || thumbnails.length === 0) {
            console.error("Elementos essenciais não encontrados!");
            return false;
        }
        
        let currentImageIndex = 0;
        const totalImages = thumbnails.length;
        
        // Função simples para trocar imagem
        function changeImage(index) {
            console.log(`Trocando para imagem ${index}`);
            
            if (index >= 0 && index < totalImages) {
                const thumbnail = thumbnails[index];
                const newSrc = thumbnail.dataset.main;
                
                console.log(`Nova imagem: ${newSrc}`);
                
                // Trocar imagem principal
                mainImage.src = newSrc;
                currentImageIndex = index;
                
                // Atualizar contador
                if (imageCounter) {
                    imageCounter.textContent = `${index + 1} de ${totalImages}`;
                }
                
                // Atualizar seleção das miniaturas
                thumbnails.forEach((thumb, i) => {
                    if (i === index) {
                        thumb.classList.add("border-ikea-blue", "shadow-md");
                        thumb.classList.remove("border-transparent", "shadow-sm");
                    } else {
                        thumb.classList.remove("border-ikea-blue", "shadow-md");
                        thumb.classList.add("border-transparent", "shadow-sm");
                    }
                });
                
                console.log(`Imagem ${index} ativada com sucesso!`);
                return true;
            }
            return false;
        }
        
        // Adicionar listeners para miniaturas
        console.log("Adicionando listeners para miniaturas...");
        
        thumbnails.forEach((thumbnail, index) => {
            console.log(`Configurando miniatura ${index}`);
            
            // Remover listeners antigos se existirem
            if (thumbnail._clickHandler) {
                thumbnail.removeEventListener('click', thumbnail._clickHandler);
            }
            
            // Criar novo handler
            thumbnail._clickHandler = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log(`Miniatura ${index} clicada!`);
                changeImage(index);
            };
            
            // Adicionar listener
            thumbnail.addEventListener("click", thumbnail._clickHandler);
        });
        
        // Adicionar listeners para botões de navegação
        if (prevImageBtn) {
            console.log("Configurando botão anterior...");
            
            // Remover listeners antigos se existirem
            if (prevImageBtn._clickHandler) {
                prevImageBtn.removeEventListener('click', prevImageBtn._clickHandler);
            }
            
            // Criar novo handler
            prevImageBtn._clickHandler = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("Botão anterior clicado!");
                const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : totalImages - 1;
                changeImage(newIndex);
            };
            
            prevImageBtn.addEventListener("click", prevImageBtn._clickHandler);
        }
        
        if (nextImageBtn) {
            console.log("Configurando botão próximo...");
            
            // Remover listeners antigos se existirem
            if (nextImageBtn._clickHandler) {
                nextImageBtn.removeEventListener('click', nextImageBtn._clickHandler);
            }
            
            // Criar novo handler
            nextImageBtn._clickHandler = function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log("Botão próximo clicado!");
                const newIndex = currentImageIndex < totalImages - 1 ? currentImageIndex + 1 : 0;
                changeImage(newIndex);
            };
            
            nextImageBtn.addEventListener("click", nextImageBtn._clickHandler);
        }
        
        // Navegação por teclado
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowLeft') {
                console.log("Tecla esquerda pressionada");
                const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : totalImages - 1;
                changeImage(newIndex);
            } else if (e.key === 'ArrowRight') {
                console.log("Tecla direita pressionada");
                const newIndex = currentImageIndex < totalImages - 1 ? currentImageIndex + 1 : 0;
                changeImage(newIndex);
            }
        });
        
        // Inicializar
        console.log("Inicializando galeria...");
        changeImage(0);
        
        console.log("=== GALERIA INICIALIZADA COM SUCESSO! ===");
        console.log("Teste: clique nas miniaturas ou use as setas do teclado!");
        
        // Teste automático após 2 segundos
        setTimeout(() => {
            console.log("=== TESTE AUTOMÁTICO ===");
            if (thumbnails[1]) {
                console.log("Testando troca para imagem 1...");
                changeImage(1);
            }
        }, 2000);
        
        return true;
    }
    
    // Múltiplas estratégias de inicialização
    let galleryInitialized = false;
    
    // Estratégia 1: DOMContentLoaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log("DOMContentLoaded disparado");
        if (!galleryInitialized) {
            galleryInitialized = initializeGallery();
        }
    });
    
    // Estratégia 2: setTimeout com delay crescente
    let attempts = 0;
    const maxAttempts = 10;
    
    function tryInitializeGallery() {
        attempts++;
        console.log(`Tentativa ${attempts} de inicializar galeria...`);
        
        if (galleryInitialized) {
            console.log("Galeria já inicializada!");
            return;
        }
        
        if (attempts > maxAttempts) {
            console.error("Máximo de tentativas atingido!");
            return;
        }
        
        const mainImage = document.getElementById("mainImage");
        const thumbnails = document.querySelectorAll(".thumbnail");
        
        if (mainImage && thumbnails.length > 0) {
            console.log("Elementos encontrados, inicializando galeria...");
            galleryInitialized = initializeGallery();
        } else {
            console.log("Elementos ainda não carregados, tentando novamente...");
            setTimeout(tryInitializeGallery, 200 * attempts); // Delay crescente
        }
    }
    
    // Iniciar tentativas após um delay inicial
    setTimeout(tryInitializeGallery, 100);
    
    // Estratégia 3: window.onload
    window.addEventListener('load', function() {
        console.log("Window load disparado");
        if (!galleryInitialized) {
            galleryInitialized = initializeGallery();
        }
    });
    
    // Estratégia 4: MutationObserver para detectar mudanças no DOM
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            if (galleryInitialized) return;
            
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    const mainImage = document.getElementById("mainImage");
                    const thumbnails = document.querySelectorAll(".thumbnail");
                    
                    if (mainImage && thumbnails.length > 0) {
                        console.log("Elementos detectados via MutationObserver!");
                        galleryInitialized = initializeGallery();
                        observer.disconnect();
                    }
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // Quantity selector functionality
    const decreaseQtyBtn = document.getElementById("decreaseQty");
    const increaseQtyBtn = document.getElementById("increaseQty");
    const quantityInput = document.getElementById("quantity");
    const quantityInfo = document.getElementById("quantityInfo");
    
    function updateQuantityInfo() {
        const currentValue = parseInt(quantityInput.value);
        
        // Quantidade fixa - sempre 3 unidades disponíveis
        const maxValue = 3;
        
        // Ajustar o valor se exceder o máximo
        if (currentValue > maxValue) {
            quantityInput.value = maxValue;
        }
        
        // Atualizar estado dos botões
        decreaseQtyBtn.disabled = parseInt(quantityInput.value) <= 1;
        increaseQtyBtn.disabled = parseInt(quantityInput.value) >= maxValue;
        
        // Aplicar estilos baseados no estado
        if (decreaseQtyBtn.disabled) {
            decreaseQtyBtn.classList.add("opacity-50", "cursor-not-allowed");
            decreaseQtyBtn.classList.remove("hover:bg-gray-50", "hover:text-gray-900");
        } else {
            decreaseQtyBtn.classList.remove("opacity-50", "cursor-not-allowed");
            decreaseQtyBtn.classList.add("hover:bg-gray-50", "hover:text-gray-900");
        }
        
        if (increaseQtyBtn.disabled) {
            increaseQtyBtn.classList.add("opacity-50", "cursor-not-allowed");
            increaseQtyBtn.classList.remove("hover:bg-gray-50", "hover:text-gray-900");
        } else {
            increaseQtyBtn.classList.remove("opacity-50", "cursor-not-allowed");
            increaseQtyBtn.classList.add("hover:bg-gray-50", "hover:text-gray-900");
        }
        
        // Mostrar apenas o valor atual
        if (quantityInfo) {
            quantityInfo.textContent = quantityInput.value;
        }
    }
    
    // Prevenir zoom no input de quantidade no mobile
    quantityInput.addEventListener('focus', () => {
        if (window.innerWidth <= 768) {
            quantityInput.style.fontSize = '18px';
            quantityInput.style.width = '60px';
        }
    });
    
    quantityInput.addEventListener('blur', () => {
        if (window.innerWidth <= 768) {
            quantityInput.style.fontSize = '18px';
            quantityInput.style.width = '60px';
        }
    });
    
    // Prevenir zoom duplo no mobile
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Melhorar feedback tátil nos botões de quantidade
    function addTactileFeedback(button) {
        button.style.transform = 'scale(0.95)';
        button.style.backgroundColor = '#f3f4f6';
        
        setTimeout(() => {
            button.style.transform = 'scale(1)';
            button.style.backgroundColor = '';
        }, 150);
    }
    
    decreaseQtyBtn.addEventListener("click", () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > parseInt(quantityInput.min)) {
            quantityInput.value = currentValue - 1;
            updateQuantityInfo();
            addTactileFeedback(decreaseQtyBtn);
        }
    });
    
    increaseQtyBtn.addEventListener("click", () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < parseInt(quantityInput.max)) {
            quantityInput.value = currentValue + 1;
            updateQuantityInfo();
            addTactileFeedback(increaseQtyBtn);
        }
    });
    
    // Atualizar quando o usuário digita diretamente
    quantityInput.addEventListener("input", () => {
        let value = parseInt(quantityInput.value);
        const min = parseInt(quantityInput.min);
        const max = parseInt(quantityInput.max);
        
        if (value < min) value = min;
        if (value > max) value = max;
        
        quantityInput.value = value;
        updateQuantityInfo();
    });
    
    // Prevenir entrada de caracteres inválidos
    quantityInput.addEventListener('keypress', (e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    });
    
    // Inicializar quantidade
    updateQuantityInfo();

    // Favorites button functionality
    const addToFavoritesBtn = document.getElementById("addToFavorites");
    addToFavoritesBtn.addEventListener("click", () => {
        addToFavoritesBtn.classList.toggle("active");
        if (addToFavoritesBtn.classList.contains("active")) {
            addToFavoritesBtn.innerHTML = '♥ Favoritos';
            addToFavoritesBtn.classList.add("bg-red-50", "border-red-200", "text-red-600");
        } else {
            addToFavoritesBtn.innerHTML = '♡ Favoritos';
            addToFavoritesBtn.classList.remove("bg-red-50", "border-red-200", "text-red-600");
        }
    });

    // Image Modal Gallery functionality - CORRIGIDA
    const imageModal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const modalImageInfo = document.getElementById("modal-image-info");
    const modalIndicators = document.getElementById("modal-indicators");
    const modalClose = document.getElementById("modal-close");
    const modalPrev = document.getElementById("modal-prev");
    const modalNext = document.getElementById("modal-next");
    const modalImageContainer = document.getElementById("modal-image-container");

    // Array de imagens para o modal
    window.galleryImages = [
        {
            src: "./images/brimnes-estrutura-cama-c-arrumacao-branco__1151024_pe884762_s5.jpg",
            alt: "Vista principal da BRIMNES",
            description: "Vista principal"
        },
        {
            src: "./images/brimnes-estrutura-cama-c-arrumacao-branco__0780630_pe760137_s5.jpg",
            alt: "Vista lateral da BRIMNES",
            description: "Vista lateral"
        },
        {
            src: "./images/brimnes-estrutura-cama-c-arrumacao-branco__0800869_ph163683_s5.jpg",
            alt: "Vista das gavetas da BRIMNES",
            description: "Vista das gavetas"
        },
        {
            src: "./images/brimnes-estrutura-cama-c-arrumacao-branco__0860776_pe659486_s5.jpg",
            alt: "Vista detalhada da BRIMNES",
            description: "Vista detalhada"
        },
        {
            src: "./images/brimnes-estrutura-cama-c-arrumacao-branco__0966529_ph175105_s5.jpg",
            alt: "Vista em contexto da BRIMNES",
            description: "Vista em contexto"
        },
        {
            src: "./images/brimnes-estrutura-cama-c-arrumacao-branco__1101953_pe866879_s5.jpg",
            alt: "Vista montada da BRIMNES",
            description: "Vista montada"
        }
    ];
    const galleryImages = window.galleryImages;

    // Sincronizar a imagem de medidas no modal com o tamanho atual
    (function syncMeasureImageToModal() {
        const currentSizeBtn = document.querySelector('.size-option.active');
        const selectedSize = currentSizeBtn?.dataset.size || '140x200';
        updateMeasureImage(selectedSize);
    })();

    // Criar indicadores
    function createIndicators() {
        if (modalIndicators) {
            modalIndicators.innerHTML = '';
            galleryImages.forEach((_, index) => {
                const indicator = document.createElement('div');
                indicator.className = `w-2 h-2 rounded-full cursor-pointer transition-colors duration-200 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-40'
                }`;
                indicator.addEventListener('click', () => showImage(index));
                modalIndicators.appendChild(indicator);
            });
        }
    }

    // Atualizar indicadores
    function updateIndicators() {
        if (modalIndicators) {
            const indicators = modalIndicators.querySelectorAll('div');
            indicators.forEach((indicator, index) => {
                if (index === currentImageIndex) {
                    indicator.className = 'w-2 h-2 rounded-full cursor-pointer transition-colors duration-200 bg-white';
                } else {
                    indicator.className = 'w-2 h-2 rounded-full cursor-pointer transition-colors duration-200 bg-white bg-opacity-40';
                }
            });
        }
    }

    // Mostrar imagem no modal
    function showImage(index) {
        currentImageIndex = index;
        const image = galleryImages[index];
        if (modalImage && modalImageInfo) {
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            modalImageInfo.textContent = `${index + 1} / ${galleryImages.length} - ${image.description}`;
        }
        updateIndicators();
    }

    // Abrir modal
    function openModal(imageIndex = 0) {
        if (imageModal) {
            currentImageIndex = imageIndex;
            imageModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            createIndicators();
            showImage(currentImageIndex);
            console.log("Modal aberto com imagem:", imageIndex);
        }
    }

    // Fechar modal
    function closeModal() {
        if (imageModal) {
            imageModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            console.log("Modal fechado");
        }
    }

    // Event listeners para abrir modal - CORRIGIDO
    if (mainImage) {
        mainImage.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("Imagem principal clicada, abrindo modal...");
            const currentSrc = mainImage.src;
            const imageIndex = galleryImages.findIndex(img => currentSrc.includes(img.src.split('/').pop()));
            openModal(imageIndex >= 0 ? imageIndex : 0);
        });
    }

    // Navegação do modal - CORRIGIDO
    if (modalPrev) {
        modalPrev.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
            showImage(currentImageIndex);
        });
    }

    if (modalNext) {
        modalNext.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            currentImageIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
            showImage(currentImageIndex);
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeModal();
        });
    }

    // Fechar modal ao clicar fora da imagem
    if (imageModal) {
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeModal();
            }
        });
    }

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (imageModal && !imageModal.classList.contains('hidden')) {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    if (modalPrev) modalPrev.click();
                    break;
                case 'ArrowRight':
                    if (modalNext) modalNext.click();
                    break;
            }
        }
    });

    // Funcionalidade de arrastar/deslizar para navegação no modal
    let startX = 0;
    let startY = 0;
    let isSwipe = false;
    let mouseStartX = 0;
    let isDragging = false;

    if (modalImageContainer) {
        modalImageContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isSwipe = false;
        });

        modalImageContainer.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;
            
            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            
            const diffX = Math.abs(currentX - startX);
            const diffY = Math.abs(currentY - startY);
            
            if (diffX > diffY && diffX > 50) {
                isSwipe = true;
                e.preventDefault();
            }
        });

        modalImageContainer.addEventListener('touchend', (e) => {
            if (!isSwipe || !startX) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left - próxima imagem
                    if (modalNext) modalNext.click();
                } else {
                    // Swipe right - imagem anterior
                    if (modalPrev) modalPrev.click();
                }
            }
            
            startX = 0;
            startY = 0;
            isSwipe = false;
        });

        // Navegação por mouse (arrastar) no modal
        modalImageContainer.addEventListener('mousedown', (e) => {
            mouseStartX = e.clientX;
            isDragging = false;
            modalImageContainer.style.cursor = 'grabbing';
        });

        modalImageContainer.addEventListener('mousemove', (e) => {
            if (!mouseStartX) return;
            
            const diffX = Math.abs(e.clientX - mouseStartX);
            if (diffX > 10) {
                isDragging = true;
            }
        });

        modalImageContainer.addEventListener('mouseup', (e) => {
            if (!isDragging || !mouseStartX) {
                modalImageContainer.style.cursor = 'grab';
                mouseStartX = 0;
                isDragging = false;
                return;
            }
            
            const endX = e.clientX;
            const diffX = mouseStartX - endX;
            
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Drag left - próxima imagem
                    if (modalNext) modalNext.click();
                } else {
                    // Drag right - imagem anterior
                    if (modalPrev) modalPrev.click();
                }
            }
            
            modalImageContainer.style.cursor = 'grab';
            mouseStartX = 0;
            isDragging = false;
        });

        modalImageContainer.addEventListener('mouseleave', () => {
            modalImageContainer.style.cursor = 'grab';
            mouseStartX = 0;
            isDragging = false;
        });

        // Definir cursor padrão
        modalImageContainer.style.cursor = 'grab';
    }

    // Postal code functionality with real API
    const postalModal = document.getElementById("postal-modal");
    const postalInput = document.getElementById("postal-input");
    const verifyPostalBtn = document.getElementById("verifyPostal");
    const postalResult = document.getElementById("postal-result");
    const postalInfo = document.getElementById("postal-info");
    const postalLocation = document.getElementById("postal-location");
    const postalLoading = document.getElementById("postal-loading");
    const postalError = document.getElementById("postal-error");
    const errorMessage = document.getElementById("error-message");
    const postalSave = document.getElementById("postal-save");
    const postalForget = document.getElementById("postal-forget");
    const postalModalClose = document.getElementById("postal-modal-close");
    const changeStore = document.getElementById("changeStore");
    const deliverySection = document.getElementById("deliverySection");
    const storeSection = document.getElementById("storeSection");
    const postalCodeDisplay = document.getElementById("postalCode");

    // As lojas IKEA agora são importadas do arquivo ikea-stores.js

    // Current postal code
    let currentPostalCode = "";

    // Show postal modal - SEMPRE mostrar campo de CEP primeiro
    function showPostalModal() {
        postalModal.classList.remove("hidden");
        
        // SEMPRE mostrar o campo de input primeiro
        document.querySelector('#postal-input').parentElement.parentElement.style.display = 'block';
        postalInput.value = ""; // Campo vazio para nova busca
        hideAllPostalStates();
    }
    
    // Função para mostrar modal de lojas diretamente
    function showStoreModal() {
        postalModal.classList.remove("hidden");
        
        // SEMPRE mostrar o campo de CEP primeiro (mesmo fluxo)
        document.querySelector('#postal-input').parentElement.parentElement.style.display = 'block';
        postalInput.value = ""; // Campo vazio para nova busca
        hideAllPostalStates();
    }

    // Hide postal modal
    function hidePostalModal() {
        postalModal.classList.add("hidden");
        hideAllPostalStates();
        
        // Resetar a exibição do campo de input para próxima vez
        const inputContainer = document.querySelector('#postal-input').parentElement.parentElement;
        if (inputContainer) {
            inputContainer.style.display = 'block';
        }
    }

    // Hide all postal states
    function hideAllPostalStates() {
        postalResult.classList.add("hidden");
        postalLoading.classList.add("hidden");
        postalError.classList.add("hidden");
    }

    // Verify postal code and find nearest IKEA store
    async function verifyPostalCode(postalCode) {
        hideAllPostalStates();
        postalLoading.classList.remove("hidden");

        try {
            // Limpar o código postal (remover hífens e espaços)
            const cleanPostalCode = postalCode.replace(/[-\s]/g, "");
            
            // Validar formato português (4 dígitos)
            if (cleanPostalCode.length !== 4 || !/^\d{4}$/.test(cleanPostalCode)) {
                throw new Error("Código postal deve ter 4 dígitos (ex: 2650)");
            }
            
            console.log("Verificando código postal:", cleanPostalCode);
            
            // Validar código postal e obter lista de lojas
            const stores = validatePostalCode(cleanPostalCode);
            
            if (stores) {
                // Salvar o código postal válido
                currentPostalCode = postalCode;
                
                // Mostrar lista de lojas para o usuário escolher
                showStoreList(stores);
                postalResult.classList.remove("hidden");
            } else {
                throw new Error("Código postal inválido");
            }

        } catch (error) {
            console.error("Erro ao verificar código postal:", error);
            errorMessage.textContent = error.message || "Erro ao verificar código postal. Tente novamente.";
            postalError.classList.remove("hidden");
        }
    }

    // Mostrar lista de lojas para o usuário escolher
    function showStoreList(stores) {
        const storeList = document.getElementById("store-list");
        if (!storeList) return;
        
        storeList.innerHTML = "";
        
        stores.forEach(store => {
            const storeItem = document.createElement("div");
            storeItem.className = "border border-gray-200 rounded-lg p-3 cursor-pointer hover:bg-blue-50 transition-colors duration-200";
            storeItem.onclick = () => selectStore(store);
            
            storeItem.innerHTML = `
                <div class="flex items-center justify-between">
                    <div class="flex-1">
                        <div class="font-medium text-gray-900">${store.name}</div>
                        <div class="text-sm text-gray-600">${store.city}, ${store.district}</div>
                        <div class="text-sm text-gray-500">${store.stock} • ${store.delivery}</div>
                    </div>
                    <div class="text-right">
                        <div class="text-sm text-blue-600 font-medium">${store.distance}</div>
                        <div class="text-xs text-gray-400">Clique para selecionar</div>
                    </div>
                </div>
            `;
            
            storeList.appendChild(storeItem);
        });
    }
    
    // Função para selecionar uma loja
    function selectStore(store) {
        console.log("Loja selecionada:", store);
        
        // Atualizar o display principal com a loja selecionada
        updatePostalCodeDisplay(currentPostalCode, store);
        
        // Fechar o modal
        hidePostalModal();
        
        // Mostrar confirmação
        showStoreSelectionConfirmation(store);
    }
    
    // Mostrar confirmação da seleção da loja
    function showStoreSelectionConfirmation(store) {
        // Atualizar a seção da loja
        const storeSection = document.getElementById("storeSection");
        if (storeSection) {
            const storeNameElement = storeSection.querySelector("p");
            const storeInfoElement = storeSection.querySelector(".space-y-1");
            
            if (storeNameElement) {
                storeNameElement.innerHTML = `<span class="font-medium text-gray-900">${store.name}</span>`;
            }
            
            if (storeInfoElement) {
                storeInfoElement.innerHTML = `
                    <p class="text-sm text-gray-600">${store.city}, ${store.district}</p>
                    <p class="text-sm text-gray-600">${store.stock} • ${store.clickCollect}</p>
                    <p class="text-sm text-green-600 font-medium">Loja selecionada ✓</p>
                `;
            }
        }
        
        // Atualizar a seção de entrega
        const deliverySection = document.querySelector("#deliverySection .flex.items-center.space-x-2");
        if (deliverySection) {
            const availabilityDot = deliverySection.querySelector(".w-2.h-2");
            const availabilityText = deliverySection.querySelector("span");
            
            availabilityDot.className = "w-2 h-2 bg-green-500 rounded-full";
            availabilityText.className = "text-sm text-green-700 font-medium";
            availabilityText.textContent = "3 unidades disponíveis na sua região";
        }
        
        // Atualizar a quantidade (fixa em 3)
        if (quantityInput && quantityInfo) {
            quantityInfo.textContent = "1";
            // Não chamar updateQuantityInfo aqui para evitar conflitos
        }
    }
    
    // Resetar seções para o estado inicial
    function resetSectionsToInitialState() {
        // Resetar seção da loja
        const storeSection = document.getElementById("storeSection");
        if (storeSection) {
            const storeNameElement = storeSection.querySelector("p");
            const storeInfoElement = storeSection.querySelector(".space-y-1");
            
            if (storeNameElement) {
                storeNameElement.innerHTML = `<span class="font-medium text-gray-900">Selecionar loja</span>`;
            }
            
            if (storeInfoElement) {
                storeInfoElement.innerHTML = `
                    <div class="space-y-1 mt-1">
                        <div class="flex items-center space-x-2">
                            <div class="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <span class="text-sm text-gray-500">Clique para selecionar loja</span>
                        </div>
                    </div>
                `;
            }
        }
        
        // Resetar seção de entrega
        const deliverySection = document.querySelector("#deliverySection .flex.items-center.space-x-2");
        if (deliverySection) {
            const availabilityDot = deliverySection.querySelector(".w-2.h-2");
            const availabilityText = deliverySection.querySelector("span");
            
            availabilityDot.className = "w-2 h-2 bg-gray-400 rounded-full";
            availabilityText.className = "text-sm text-gray-500 font-medium";
            availabilityText.textContent = "Introduza código postal para verificar disponibilidade";
        }
        
        // Resetar quantidade (fixa em 3)
        if (quantityInput && quantityInfo) {
            quantityInfo.textContent = "1";
            // Não chamar updateQuantityInfo aqui para evitar conflitos
        }
    }
    

    
    // Update postal code display with store information
    function updatePostalCodeDisplay(newPostalCode, store) {
        currentPostalCode = newPostalCode;
        
        // Update postal code display
        if (newPostalCode && newPostalCode.trim() !== "") {
            postalCodeDisplay.textContent = newPostalCode;
        } else {
            postalCodeDisplay.textContent = "0000";
        }
        
        // Não interferir na quantidade (sempre 3)
    }

    // Event listeners - SEMPRE mostrar modal de CEP
    changeStore.addEventListener("click", showPostalModal);
    deliverySection.addEventListener("click", showPostalModal);
    storeSection.addEventListener("click", showPostalModal); // SEMPRE CEP primeiro
    
    verifyPostalBtn.addEventListener("click", () => {
        const postalCode = postalInput.value.trim();
        if (postalCode) {
            verifyPostalCode(postalCode);
        }
    });

    postalInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const postalCode = postalInput.value.trim();
            if (postalCode) {
                verifyPostalCode(postalCode);
            }
        }
    });

    postalSave.addEventListener("click", () => {
        const postalCode = postalInput.value.trim();
        if (postalCode) {
            // Validar formato português antes de salvar
            const cleanPostalCode = postalCode.replace(/[-\s]/g, "");
            if (cleanPostalCode.length !== 4 || !/^\d{4}$/.test(cleanPostalCode)) {
                errorMessage.textContent = "Código postal deve ter 4 dígitos (ex: 2650)";
                postalError.classList.remove("hidden");
                return;
            }
            
            // Apenas salvar o código postal, a loja será escolhida depois
            updatePostalCodeDisplay(postalCode, null);
            hidePostalModal();
        }
    });

    postalForget.addEventListener("click", () => {
        currentPostalCode = "";
        updatePostalCodeDisplay("", null);
        resetSectionsToInitialState();
        hidePostalModal();
    });

    postalModalClose.addEventListener("click", hidePostalModal);

    // Close modal when clicking outside
    postalModal.addEventListener("click", (e) => {
        if (e.target === postalModal) {
            hidePostalModal();
        }
    });

    // Countdown Timer Functionality
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
    
    let timeLeft = 15 * 60; // 15 minutes in seconds
    let countdownInterval;
    
    function updateCountdown() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        if (minutesElement && secondsElement) {
            minutesElement.textContent = minutes.toString().padStart(2, '0');
            secondsElement.textContent = seconds.toString().padStart(2, '0');
        }
        
        if (timeLeft <= 0) {
            // Oferta expirada
            if (minutesElement && secondsElement) {
                minutesElement.textContent = "00";
                secondsElement.textContent = "00";
            }
            
            // Atualizar a mensagem
            const countdownElement = document.getElementById("countdown");
            if (countdownElement) {
                countdownElement.innerHTML = `
                    <div class="bg-red-800 text-white px-4 py-2 rounded-md text-center">
                        <span class="text-lg font-bold">Oferta Expirada!</span>
                    </div>
                `;
            }
            
            // Parar o contador
            if (countdownInterval) {
                clearInterval(countdownInterval);
            }
            return;
        }
        
        timeLeft--;
    }
    
    // Atualizar a cada segundo
    countdownInterval = setInterval(updateCountdown, 1000);
    
    // Inicializar o contador
    updateCountdown();
    
    // Initialize the display with default state (no postal code entered)
    resetSectionsToInitialState();
    
    // MOSTRAR MODAL DE CEP AUTOMATICAMENTE AO CARREGAR A PÁGINA
    setTimeout(() => {
        showPostalModal();
    }, 500); // Pequeno delay para garantir que tudo carregou
    
    // Test store selection logic (for debugging)
    if (typeof testStoreSelection === 'function') {
        testStoreSelection();
    }

    // Tab Navigation Functionality - FUNCIONALIDADE COMPLETA DAS ABAS
    console.log("=== INICIANDO SISTEMA DE ABAS ===");
    
    function initializeTabs() {
        const tabButtons = document.querySelectorAll('[data-tab]');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        console.log("Abas encontradas:", tabButtons.length);
        console.log("Painéis encontrados:", tabPanels.length);
        
        if (tabButtons.length === 0 || tabPanels.length === 0) {
            console.error("Elementos das abas não encontrados!");
            return;
        }
        
        // Função para mostrar uma aba específica
        function showTab(tabName) {
            console.log(`Mostrando aba: ${tabName}`);
            
            // Esconder todos os painéis
            tabPanels.forEach(panel => {
                panel.classList.add('hidden');
            });
            
            // Remover estado ativo de todos os botões
            tabButtons.forEach(button => {
                button.classList.remove('border-ikea-blue', 'text-ikea-blue');
                button.classList.add('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');
            });
            
            // Mostrar o painel selecionado
            const targetPanel = document.getElementById(tabName);
            if (targetPanel) {
                targetPanel.classList.remove('hidden');
                console.log(`Painel ${tabName} mostrado`);
            }
            
            // Ativar o botão selecionado
            const targetButton = document.querySelector(`[data-tab="${tabName}"]`);
            if (targetButton) {
                targetButton.classList.remove('border-transparent', 'text-gray-500', 'hover:text-gray-700', 'hover:border-gray-300');
                targetButton.classList.add('border-ikea-blue', 'text-ikea-blue');
                console.log(`Botão ${tabName} ativado`);
            }
        }
        
        // Adicionar event listeners para cada botão de aba
        tabButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const tabName = this.dataset.tab;
                console.log(`Aba clicada: ${tabName}`);
                showTab(tabName);
            });
        });
        
        // Mostrar a primeira aba por padrão
        if (tabButtons.length > 0) {
            const firstTab = tabButtons[0].dataset.tab;
            showTab(firstTab);
            console.log(`Primeira aba ativada: ${firstTab}`);
        }
        
        console.log("Sistema de abas inicializado com sucesso!");
    }
    
    // Inicializar abas após um delay para garantir que o DOM está pronto
    setTimeout(() => {
        initializeTabs();
    }, 1000);

    // Manual Download Functionality - FUNCIONALIDADE DE DOWNLOAD DOS MANUAIS
    console.log("=== INICIANDO SISTEMA DE DOWNLOAD DOS MANUAIS ===");
    
    function initializeManualDownloads() {
        const manualLinks = document.querySelectorAll('a[href*="docs/"]');
        
        console.log("Links de manuais encontrados:", manualLinks.length);
        
        if (manualLinks.length === 0) {
            console.error("Links de manuais não encontrados!");
            return;
        }
        
        manualLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const manualUrl = this.href;
                const manualName = this.querySelector('.font-medium')?.textContent || 'Manual';
                
                console.log(`Tentando abrir manual: ${manualName} - ${manualUrl}`);
                
                // Adicionar efeito visual de clique
                this.style.transform = 'scale(0.95)';
                this.style.transition = 'transform 0.1s ease';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 100);
                
                // Mostrar notificação
                showNotification(`Baixando ${manualName}...`, 'info');
                
                // Download do manual
                downloadManual(manualUrl, manualName);
            });
            
            // Adicionar tooltip informativo
            link.title = `Clique para baixar ${link.querySelector('.font-medium')?.textContent || 'manual'} como PDF`;
        });
        
        console.log("Sistema de download dos manuais inicializado com sucesso!");
    }
    
    // Função para fazer download dos manuais
    function downloadManual(url, manualName) {
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = `${manualName.replace(/\s+/g, '_')}.html`;
        downloadLink.target = '_blank'; // Importante para não navegar na página atual
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        setTimeout(() => {
            showNotification(`${manualName} baixado com sucesso!`, 'success');
        }, 1000);
        
        console.log(`Manual ${manualName} baixado com sucesso`);
    }
    
    // Função para mostrar notificações
    function showNotification(message, type = 'info') {
        // Remover notificações existentes
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Criar nova notificação
        const notification = document.createElement('div');
        notification.className = `notification fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
        
        // Definir cores baseadas no tipo
        let bgColor, textColor, icon;
        switch (type) {
            case 'success':
                bgColor = 'bg-green-500';
                textColor = 'text-white';
                icon = '✅';
                break;
            case 'error':
                bgColor = 'bg-red-500';
                textColor = 'text-white';
                icon = '❌';
                break;
            case 'warning':
                bgColor = 'bg-yellow-500';
                textColor = 'text-white';
                icon = '⚠️';
                break;
            default:
                bgColor = 'bg-blue-500';
                textColor = 'text-white';
                icon = 'ℹ️';
        }
        
        notification.className += ` ${bgColor} ${textColor}`;
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-lg">${icon}</span>
                <span class="font-medium">${message}</span>
                <button class="ml-auto text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto-remover após 5 segundos
        setTimeout(() => {
            if (notification.parentElement) {
                notification.classList.add('translate-x-full');
                setTimeout(() => {
                    if (notification.parentElement) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Inicializar downloads dos manuais após um delay
    setTimeout(() => {
        initializeManualDownloads();
    }, 1500);

    // ===== SISTEMA DE CARRINHO DE COMPRAS =====
    console.log("=== INICIANDO SISTEMA DE CARRINHO ===");
    
    // Estado global do carrinho
    let cart = {
        items: [],
        total: 0,
        shipping: 0,
        tax: 0
    };
    
    // Configurações de preços
    const productPrices = {
        "BRIMNES": {
            "140x200": 199,
            "160x200": 229
        },
        "LURÖY": {
            "140x200": 40,
            "160x200": 50
        },
        "KLEPPSTAD": {
            "default": 149
        }
    };
    
    // Função para adicionar produto ao carrinho
    function addToCart(productName, size = null, quantity = 1) {
        let price = 0;
        
        if (productName === "BRIMNES") {
            const currentSize = document.querySelector('.size-option.active')?.dataset.size || "140x200";
            price = productPrices[productName][currentSize];
        } else if (productName === "LURÖY") {
            const currentSize = document.querySelector('.size-option.active')?.dataset.size || "140x200";
            price = productPrices[productName][currentSize];
        } else if (productName === "KLEPPSTAD") {
            price = productPrices[productName].default;
        }
        
        // Verificar se o produto já está no carrinho
        const existingItem = cart.items.find(item => 
            item.name === productName && item.size === size
        );
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                name: productName,
                size: size,
                price: price,
                quantity: quantity,
                image: getProductImage(productName)
            });
        }
        
        updateCartTotal();
        updateCartDisplay();
        showCartNotification(productName, quantity);
        
        console.log("Produto adicionado ao carrinho:", productName, "Quantidade:", quantity, "Preço:", price);
    }
    
    // Função para obter imagem do produto
    function getProductImage(productName) {
        const imageMap = {
            "BRIMNES": "images/brimnes-estrutura-cama-c-arrumacao-branco__1151024_pe884762_s5.jpg",
            "LURÖY": "images/luroey-estrado-de-ripas__1089731_pe861685_s5.jpg",
            "KLEPPSTAD": "images/luroey-estrado-de-ripas__1089731_pe861685_s5.jpg" // Usar imagem existente como fallback
        };
        return imageMap[productName] || "";
    }
    
    // Função para atualizar total do carrinho
    function updateCartTotal() {
        cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cart.shipping = cart.total > 0 ? 9.99 : 0;
        cart.tax = cart.total * 0.23; // IVA 23%
    }
    
    // Função para atualizar display do carrinho
    function updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        
        if (cartCount) {
            const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
            cartCount.classList.toggle('hidden', totalItems === 0);
        }
        
        if (cartTotal) {
            cartTotal.textContent = `${cart.total.toFixed(2)}€`;
        }
    }
    
    // Função para mostrar notificação de produto adicionado
    function showCartNotification(productName, quantity) {
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-full';
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <span class="text-2xl">✅</span>
                <div>
                    <p class="font-medium">${productName} adicionado ao carrinho!</p>
                    <p class="text-sm opacity-90">Quantidade: ${quantity}</p>
                </div>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto-remover após 3 segundos
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
    
    // Função para abrir página de checkout
    function openCheckout() {
        if (cart.items.length === 0) {
            alert('O carrinho está vazio!');
            return;
        }
        
        // Salvar carrinho no localStorage
        localStorage.setItem('ikeaCart', JSON.stringify(cart));
        
        // Abrir página de checkout
        window.open('checkout.html', '_blank');
    }
    
    // Event listeners para botões de adicionar ao carrinho
    const addToCartBtn = document.getElementById('addToCart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const quantity = parseInt(document.getElementById('quantity').value) || 1;
            const selectedSlats = document.querySelector('input[name="slats"]:checked');
            
            // Adicionar estrutura da cama
            addToCart("BRIMNES", null, quantity);
            
            // Adicionar estrado de ripas se selecionado
            if (selectedSlats && selectedSlats.value === "luroy") {
                addToCart("LURÖY", null, quantity);
            }
        });
    }
    
    // Event listeners para produtos relacionados
    const relatedProductBtns = document.querySelectorAll('.bg-ikea-blue.text-white.px-4.py-2.rounded-md');
    relatedProductBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const productCard = btn.closest('.bg-white.rounded-lg');
            const productName = productCard.querySelector('h3').textContent;
            addToCart(productName);
        });
    });
    
    // Adicionar contador de carrinho ao header
    function addCartCounter() {
        const header = document.querySelector('header .flex.items-center.justify-between');
        if (header) {
            const cartContainer = document.createElement('div');
            cartContainer.className = 'flex items-center space-x-4';
            cartContainer.innerHTML = `
                <button id="cart-button" class="relative p-2 text-gray-600 hover:text-ikea-blue transition-colors duration-200">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m6 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01"></path>
                    </svg>
                    <span id="cart-count" class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center hidden">0</span>
                </button>
                <button id="checkout-btn" class="bg-ikea-blue text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200">
                    Finalizar Compra
                </button>
            `;
            
            header.appendChild(cartContainer);
            
            // Event listeners para os botões do carrinho
            const cartButton = document.getElementById('cart-button');
            const checkoutBtn = document.getElementById('checkout-btn');
            
            if (cartButton) {
                cartButton.addEventListener('click', () => {
                    if (cart.items.length > 0) {
                        openCheckout();
                    } else {
                        alert('O carrinho está vazio!');
                    }
                });
            }
            
            if (checkoutBtn) {
                checkoutBtn.addEventListener('click', openCheckout);
            }
        }
    }
    
    // Inicializar contador do carrinho
    setTimeout(() => {
        addCartCounter();
        updateCartDisplay();
    }, 1000);
    
    console.log("=== SISTEMA DE CARRINHO INICIALIZADO ===");
});


