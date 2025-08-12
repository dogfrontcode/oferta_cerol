document.addEventListener("DOMContentLoaded", () => {
    const sizeOptions = document.querySelectorAll(".size-option");
    const priceMain = document.querySelector(".price-main");
    const sizeHighlight = document.querySelector(".size-highlight");
    const luroySlatsOption = document.getElementById("luroy-slats");
    const luroySlatsPrice = document.querySelector("#luroy-slats + label .price");
    const luroySlatsSize = document.getElementById("slats-size");

    const bedPrices = {
        "140x200": "199",
        "160x200": "229"
    };

    const slatPrices = {
        "140x200": "40",
        "160x200": "50"
    };

    function updatePrices(selectedSize) {
        priceMain.innerHTML = bedPrices[selectedSize] + "<span class=\"currency\">€</span>";
        sizeHighlight.textContent = selectedSize + " cm";
        
        if (luroySlatsOption && luroySlatsPrice && luroySlatsSize) {
            luroySlatsPrice.textContent = slatPrices[selectedSize] + "€";
            luroySlatsSize.textContent = selectedSize + " cm";
        }
    }

    sizeOptions.forEach(button => {
        button.addEventListener("click", () => {
            sizeOptions.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            const selectedSize = button.dataset.size;
            updatePrices(selectedSize);
        });
    });

    const initialActiveButton = document.querySelector(".size-option.active");
    if (initialActiveButton) {
        const initialSize = initialActiveButton.dataset.size;
        updatePrices(initialSize);
    }

    // Image gallery functionality
    const mainImage = document.getElementById("mainImage");
    const thumbnails = document.querySelectorAll(".thumbnail");

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove("active"));
            
            // Add active class to clicked thumbnail
            thumbnail.classList.add("active");
            
            // Update main image source
            const newImageSrc = thumbnail.dataset.main;
            if (newImageSrc) {
                mainImage.src = newImageSrc;
                mainImage.alt = thumbnail.alt;
            }
        });
    });

    // Quantity selector functionality
    const decreaseQtyBtn = document.getElementById("decreaseQty");
    const increaseQtyBtn = document.getElementById("increaseQty");
    const quantityInput = document.getElementById("quantity");

    decreaseQtyBtn.addEventListener("click", () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue > parseInt(quantityInput.min)) {
            quantityInput.value = currentValue - 1;
        }
    });

    increaseQtyBtn.addEventListener("click", () => {
        let currentValue = parseInt(quantityInput.value);
        if (currentValue < parseInt(quantityInput.max)) {
            quantityInput.value = currentValue + 1;
        }
    });

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

    // Image Modal Gallery functionality
    const imageModal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const modalImageInfo = document.getElementById("modal-image-info");
    const modalIndicators = document.getElementById("modal-indicators");
    const modalClose = document.getElementById("modal-close");
    const modalPrev = document.getElementById("modal-prev");
    const modalNext = document.getElementById("modal-next");
    const modalImageContainer = document.getElementById("modal-image-container");

    // Array de imagens para o modal
    const galleryImages = [
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

    let currentImageIndex = 0;

    // Criar indicadores
    function createIndicators() {
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

    // Atualizar indicadores
    function updateIndicators() {
        const indicators = modalIndicators.querySelectorAll('div');
        indicators.forEach((indicator, index) => {
            if (index === currentImageIndex) {
                indicator.className = 'w-2 h-2 rounded-full cursor-pointer transition-colors duration-200 bg-white';
            } else {
                indicator.className = 'w-2 h-2 rounded-full cursor-pointer transition-colors duration-200 bg-white bg-opacity-40';
            }
        });
    }

    // Mostrar imagem no modal
    function showImage(index) {
        currentImageIndex = index;
        const image = galleryImages[index];
        modalImage.src = image.src;
        modalImage.alt = image.alt;
        modalImageInfo.textContent = `${index + 1} / ${galleryImages.length} - ${image.description}`;
        updateIndicators();
    }

    // Abrir modal
    function openModal(imageIndex = 0) {
        currentImageIndex = imageIndex;
        imageModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        createIndicators();
        showImage(currentImageIndex);
    }

    // Fechar modal
    function closeModal() {
        imageModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }

    // Event listeners para abrir modal
    mainImage.addEventListener('click', () => {
        const currentSrc = mainImage.src;
        const imageIndex = galleryImages.findIndex(img => currentSrc.includes(img.src.split('/').pop()));
        openModal(imageIndex >= 0 ? imageIndex : 0);
    });

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', (e) => {
            e.stopPropagation();
            // Atualizar imagem principal (funcionalidade existente)
            thumbnails.forEach(thumb => thumb.classList.remove("active"));
            thumbnail.classList.add("active");
            const newImageSrc = thumbnail.dataset.main;
            if (newImageSrc) {
                mainImage.src = newImageSrc;
                mainImage.alt = thumbnail.alt;
            }
        });

        // Duplo clique na miniatura abre o modal
        thumbnail.addEventListener('dblclick', () => {
            openModal(index);
        });
    });

    // Navegação do modal
    modalPrev.addEventListener('click', () => {
        currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1;
        showImage(currentImageIndex);
    });

    modalNext.addEventListener('click', () => {
        currentImageIndex = currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0;
        showImage(currentImageIndex);
    });

    modalClose.addEventListener('click', closeModal);

    // Fechar modal ao clicar fora da imagem
    imageModal.addEventListener('click', (e) => {
        if (e.target === imageModal) {
            closeModal();
        }
    });

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (!imageModal.classList.contains('hidden')) {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    modalPrev.click();
                    break;
                case 'ArrowRight':
                    modalNext.click();
                    break;
            }
        }
    });

    // Funcionalidade de arrastar/deslizar para navegação
    let startX = 0;
    let startY = 0;
    let isSwipe = false;

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
                modalNext.click();
            } else {
                // Swipe right - imagem anterior
                modalPrev.click();
            }
        }
        
        startX = 0;
        startY = 0;
        isSwipe = false;
    });

    // Navegação por mouse (arrastar)
    let mouseStartX = 0;
    let isDragging = false;

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
                modalNext.click();
            } else {
                // Drag right - imagem anterior
                modalPrev.click();
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
});

