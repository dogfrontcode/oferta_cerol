// Módulo de seleção de loja com OpenCage Geocoding API
class StoreSelector {
    constructor() {
        this.stores = [
            {
                id: 'alfragide',
                name: 'Alfragide',
                address: 'Zona Industrial Alfragide, EN 117, Amadora, Lisboa',
                hours: '10:00 - 22:00',
                coordinates: [38.748406, -9.102984] // Coordenadas aproximadas de Alfragide
            },
            {
                id: 'braga',
                name: 'Braga',
                address: 'Avenida de Lamas nº100, Braga',
                hours: '10:00 - 22:00',
                coordinates: [41.5518, -8.4229] // Coordenadas aproximadas de Braga
            },
            {
                id: 'matosinhos',
                name: 'Matosinhos',
                address: 'Avenida Dr. Óscar Lopes, Matosinhos',
                hours: '10:00 - 22:00',
                coordinates: [41.1844, -8.6963] // Coordenadas aproximadas de Matosinhos
            },
            {
                id: 'loures',
                name: 'Loures',
                address: 'EN 250 Rua 28 de Setembro, Frielas, Loures, Lisboa',
                hours: '10:00 - 22:00',
                coordinates: [38.8322, -9.1394] // Coordenadas aproximadas de Loures
            },
            {
                id: 'loule',
                name: 'Loulé',
                address: 'Avenida do Algarve n.º 5, Almancil',
                hours: '10:00 - 22:00',
                coordinates: [37.0794, -8.0209] // Coordenadas aproximadas de Loulé
            }
        ];
        
        this.currentStore = this.stores[0]; // Alfragide como padrão
        this.userCoordinates = null;
        // Placeholder para a chave da API OpenCage - substitua pela sua chave real
        this.apiKey = '1e8c2defb8f14fce8a9573ba5e371124';
        this.init();
    }

    init() {
        console.log('Inicializando módulo de seleção de loja...');
        this.setupEventListeners();
        this.loadStoredStore();
    }

    setupEventListeners() {
        console.log('Configurando event listeners da loja...');
        
        // Event listener para o elemento da loja no header
        const storeElement = document.querySelector('.header-top-right span:last-child');
        console.log('Store element encontrado:', !!storeElement);
        
        if (storeElement) {
            storeElement.style.cursor = 'pointer';
            storeElement.style.textDecoration = 'underline';
            
            storeElement.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Clique na loja detectado!');
                this.openStoreModal();
            });
        }
    }

    loadStoredStore() {
        const storedStoreId = localStorage.getItem('selectedStore');
        if (storedStoreId) {
            const store = this.stores.find(s => s.id === storedStoreId);
            if (store) {
                this.currentStore = store;
                this.updateHeaderStore();
            }
        }
    }

    openStoreModal() {
        console.log('Abrindo modal da loja...');
        
        // Criar o modal da loja
        const modal = this.createStoreModal();
        document.body.appendChild(modal);
        
        // Mostrar o modal
        setTimeout(() => {
            modal.style.display = 'flex';
        }, 10);
    }

    createStoreModal() {
        const modal = document.createElement('div');
        modal.className = 'store-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 10000;
        `;

        const modalContent = document.createElement('div');
        modalContent.className = 'store-modal-content';
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 8px;
            max-width: 400px;
            width: 90%;
            position: relative;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        `;

        modalContent.innerHTML = `
            <button class="store-modal-close" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
            ">×</button>
            
            <h2 style="margin: 0 0 10px 0; font-size: 24px; color: #333;">${this.currentStore.name}</h2>
            
            <p style="margin: 5px 0; color: #666; font-size: 14px;">
                <strong>Aberto hoje ${this.currentStore.hours}</strong>
            </p>
            
            <p style="margin: 10px 0 20px 0; color: #666; font-size: 14px;">
                ${this.currentStore.address}
            </p>
            
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button class="store-select-different" style="
                    padding: 12px 20px;
                    border: 2px solid #0058a3;
                    background: white;
                    color: #0058a3;
                    border-radius: 25px;
                    cursor: pointer;
                    font-weight: bold;
                    font-size: 14px;
                ">Selecionar uma loja diferente</button>
                
                <button class="store-view-page" style="
                    padding: 12px 20px;
                    border: 2px solid #ccc;
                    background: #f5f5f5;
                    color: #999;
                    border-radius: 25px;
                    cursor: not-allowed;
                    font-weight: bold;
                    font-size: 14px;
                " disabled>Ver a página da loja</button>
            </div>
        `;

        modal.appendChild(modalContent);

        // Event listeners do modal
        const closeBtn = modalContent.querySelector('.store-modal-close');
        const selectDifferentBtn = modalContent.querySelector('.store-select-different');
        const viewPageBtn = modalContent.querySelector('.store-view-page');

        closeBtn.addEventListener('click', () => {
            console.log('Fechando modal da loja...');
            modal.remove();
        });

        selectDifferentBtn.addEventListener('click', () => {
            console.log('Abrindo modal de seleção de loja...');
            modal.remove();
            this.openStoreSelectionModal();
        });

        viewPageBtn.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Botão "Ver a página da loja" está desabilitado');
        });

        // Fechar modal clicando fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        return modal;
    }

    openStoreSelectionModal() {
        console.log('Abrindo modal de seleção de loja...');
        
        const modal = this.createStoreSelectionModal();
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.style.display = 'flex';
        }, 10);
    }

    createStoreSelectionModal() {
        const modal = document.createElement('div');
        modal.className = 'store-selection-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 10001;
        `;

        const modalContent = document.createElement('div');
        modalContent.className = 'store-selection-modal-content';
        modalContent.style.cssText = `
            background: white;
            padding: 30px;
            border-radius: 8px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        `;

        modalContent.innerHTML = `
            <button class="store-selection-modal-close" style="
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
            ">×</button>
            
            <h2 style="margin: 0 0 20px 0; font-size: 24px; color: #333;">Selecionar loja</h2>
            
            <div style="display: flex; margin-bottom: 20px; gap: 10px;">
                <input type="text" class="postal-code-input" placeholder="Digite seu código postal (ex: 1000-001)" style="
                    flex: 1;
                    padding: 12px;
                    border: 2px solid #0058a3;
                    border-radius: 25px;
                    font-size: 14px;
                    outline: none;
                ">
                <button class="search-stores-btn" style="
                    padding: 12px 20px;
                    background: #0058a3;
                    color: white;
                    border: none;
                    border-radius: 25px;
                    cursor: pointer;
                    font-size: 14px;
                ">🔍</button>
            </div>
            
            <div class="search-status" style="
                margin-bottom: 15px;
                font-size: 14px;
                color: #666;
                min-height: 20px;
            "></div>
            
            <div class="stores-list"></div>
        `;

        modal.appendChild(modalContent);

        // Event listeners
        const closeBtn = modalContent.querySelector('.store-selection-modal-close');
        const postalCodeInput = modalContent.querySelector('.postal-code-input');
        const searchBtn = modalContent.querySelector('.search-stores-btn');
        const searchStatus = modalContent.querySelector('.search-status');
        const storesList = modalContent.querySelector('.stores-list');

        closeBtn.addEventListener('click', () => {
            console.log('Fechando modal de seleção de loja...');
            modal.remove();
        });

        searchBtn.addEventListener('click', () => {
            const postalCode = postalCodeInput.value.trim();
            if (postalCode) {
                this.searchStoresByPostalCode(postalCode, searchStatus, storesList);
            } else {
                this.displayStores(storesList, null);
            }
        });

        postalCodeInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });

        // Fechar modal clicando fora
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        // Mostrar todas as lojas inicialmente
        this.displayStores(storesList, null);

        return modal;
    }

    async searchStoresByPostalCode(postalCode, statusElement, storesListElement) {
        statusElement.textContent = 'Buscando localização...';
        
        try {
            // Verificar se a chave da API foi configurada
            if (this.apiKey === 'YOUR_OPENCAGE_API_KEY_HERE') {
                throw new Error('Chave da API não configurada. Por favor, configure sua chave da OpenCage API.');
            }

            // Buscar coordenadas do código postal usando a OpenCage Geocoding API
            const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(postalCode)}&key=${this.apiKey}&countrycode=pt&limit=1`);
            
            if (!response.ok) {
                throw new Error('Erro na consulta da API de geolocalização');
            }
            
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                const result = data.results[0];
                this.userCoordinates = [result.geometry.lat, result.geometry.lng];
                statusElement.textContent = `As lojas são ordenadas por distância até "${postalCode}"`;
                
                // Calcular distâncias e ordenar lojas
                const storesWithDistance = this.calculateDistances();
                this.displayStores(storesListElement, storesWithDistance);
            } else {
                throw new Error('Código postal não encontrado');
            }
            
        } catch (error) {
            console.error('Erro ao buscar código postal:', error);
            
            if (error.message.includes('Chave da API não configurada')) {
                statusElement.innerHTML = `
                    <div style="color: #e74c3c; font-weight: bold;">
                        ⚠️ API não configurada
                    </div>
                    <div style="font-size: 12px; margin-top: 5px;">
                        Para usar a busca por CEP, é necessário configurar uma chave da OpenCage API.
                        <br>Mostrando todas as lojas por enquanto.
                    </div>
                `;
            } else {
                statusElement.textContent = 'Erro ao buscar código postal. Mostrando todas as lojas.';
            }
            
            this.displayStores(storesListElement, null);
        }
    }

    calculateDistances() {
        if (!this.userCoordinates) return this.stores;

        return this.stores.map(store => {
            const distance = this.calculateDistance(
                this.userCoordinates[0], this.userCoordinates[1],
                store.coordinates[0], store.coordinates[1]
            );
            
            return {
                ...store,
                distance: distance
            };
        }).sort((a, b) => a.distance - b.distance);
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Raio da Terra em km
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    toRad(deg) {
        return deg * (Math.PI/180);
    }

    displayStores(container, storesWithDistance) {
        const storesToShow = storesWithDistance || this.stores;
        
        container.innerHTML = storesToShow.map(store => `
            <div class="store-item" data-store-id="${store.id}" style="
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: 8px;
                margin-bottom: 10px;
                cursor: pointer;
                transition: all 0.2s;
                ${store.id === this.currentStore.id ? 'border-color: #0058a3; background-color: #f0f8ff;' : ''}
            ">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                        <h3 style="margin: 0 0 5px 0; color: #333; font-size: 16px;">${store.name}</h3>
                        <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">${store.address}</p>
                        ${store.distance ? `<p style="margin: 0; color: #0058a3; font-size: 14px; font-weight: bold;">${store.distance.toFixed(1)}km de distância</p>` : ''}
                    </div>
                </div>
            </div>
        `).join('');

        // Adicionar event listeners para seleção de loja
        container.querySelectorAll('.store-item').forEach(item => {
            item.addEventListener('click', () => {
                const storeId = item.dataset.storeId;
                this.selectStore(storeId);
                
                // Fechar modal
                const modal = item.closest('.store-selection-modal');
                if (modal) {
                    console.log('Fechando modal de seleção de loja...');
                    modal.remove();
                    this.openStoreModal();
                }
            });

            item.addEventListener('mouseenter', () => {
                if (item.dataset.storeId !== this.currentStore.id) {
                    item.style.backgroundColor = '#f9f9f9';
                }
            });

            item.addEventListener('mouseleave', () => {
                if (item.dataset.storeId !== this.currentStore.id) {
                    item.style.backgroundColor = 'white';
                }
            });
        });
    }

    selectStore(storeId) {
        const store = this.stores.find(s => s.id === storeId);
        if (store) {
            this.currentStore = store;
            localStorage.setItem('selectedStore', storeId);
            this.updateHeaderStore();
            console.log('Loja selecionada:', store.name);
        }
    }

    updateHeaderStore() {
        const storeElement = document.querySelector('.header-top-right span:last-child');
        if (storeElement) {
            storeElement.textContent = this.currentStore.name;
        }
    }
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    console.log('Inicializando módulo de seleção de loja...');
    new StoreSelector();
});

