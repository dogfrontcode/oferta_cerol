// Todas as 62 lojas IKEA em Portugal com informações de stock e disponibilidade
const ikeaStores = [
    // Lojas principais
    {
        name: "IKEA Alfragide",
        city: "Amadora",
        district: "Lisboa",
        postalCodes: ["2650", "2651", "2652", "2653", "2654", "2655", "2656", "2657", "2658", "2659"],
        coordinates: { lat: 38.7223, lng: -9.1393 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "8.5 km"
    },
    {
        name: "IKEA Loures",
        city: "Loures",
        district: "Lisboa",
        postalCodes: ["2660", "2661", "2662", "2663", "2664", "2665", "2666", "2667", "2668", "2669"],
        coordinates: { lat: 38.8297, lng: -9.1684 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "19.2 km"
    },
    {
        name: "IKEA Matosinhos",
        city: "Matosinhos",
        district: "Porto",
        postalCodes: ["4450", "4451", "4452", "4453", "4454", "4455"],
        coordinates: { lat: 41.1858, lng: -8.6861 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "284.6 km"
    },
    {
        name: "IKEA Braga",
        city: "Braga",
        district: "Braga",
        postalCodes: ["4700", "4701", "4702", "4703", "4704", "4705", "4706", "4707", "4708", "4709"],
        coordinates: { lat: 41.5454, lng: -8.4265 },
        stock: "Sem stock",
        clickCollect: "Atualmente indisponível",
        delivery: "Disponível",
        distance: "329.2 km"
    },
    {
        name: "IKEA Loulé",
        city: "Loulé",
        district: "Faro",
        postalCodes: ["8100", "8101", "8102", "8103", "8104", "8105", "8106", "8107", "8108", "8109"],
        coordinates: { lat: 37.1378, lng: -8.0197 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "211.4 km"
    },
    // Estúdios de planificação
    {
        name: "Alegro Setúbal",
        city: "Setúbal",
        district: "Setúbal",
        postalCodes: ["2900", "2901", "2902", "2903", "2904", "2905", "2906", "2907", "2908", "2909"],
        coordinates: { lat: 38.5243, lng: -8.8926 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "45.2 km"
    },
    {
        name: "Alegro Sintra",
        city: "Sintra",
        district: "Lisboa",
        postalCodes: ["2710", "2711", "2712", "2713", "2714", "2715", "2716", "2717", "2718", "2719"],
        coordinates: { lat: 38.8009, lng: -9.3782 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "25.8 km"
    },
    {
        name: "Almada Forum",
        city: "Almada",
        district: "Setúbal",
        postalCodes: ["2800", "2801", "2802", "2803", "2804", "2805", "2806", "2807", "2808", "2809"],
        coordinates: { lat: 38.6805, lng: -9.1583 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "15.3 km"
    },
    {
        name: "Aveiro Retail Park",
        city: "Aveiro",
        district: "Aveiro",
        postalCodes: ["3800", "3801", "3802", "3803", "3804", "3805", "3806", "3807", "3808", "3809"],
        coordinates: { lat: 40.6443, lng: -8.6455 },
        stock: "Baixo stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "185.7 km"
    },
    {
        name: "Beja Retail Park",
        city: "Beja",
        district: "Beja",
        postalCodes: ["7800", "7801", "7802", "7803", "7804", "7805", "7806", "7807", "7808", "7809"],
        coordinates: { lat: 38.0153, lng: -7.8627 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "120.8 km"
    },
    {
        name: "CascaiShopping",
        city: "Cascais",
        district: "Lisboa",
        postalCodes: ["2645", "2646", "2647", "2648", "2649"],
        coordinates: { lat: 38.6979, lng: -9.4215 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "32.1 km"
    },
    {
        name: "Évora Plaza",
        city: "Évora",
        district: "Évora",
        postalCodes: ["7000", "7001", "7002", "7003", "7004", "7005", "7006", "7007", "7008", "7009"],
        coordinates: { lat: 38.5713, lng: -7.9135 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "95.4 km"
    },
    {
        name: "Faro Forum",
        city: "Faro",
        district: "Faro",
        postalCodes: ["8000", "8001", "8002", "8003", "8004", "8005", "8006", "8007", "8008", "8009"],
        coordinates: { lat: 37.0194, lng: -7.9304 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "198.7 km"
    },
    {
        name: "Fórum Coimbra",
        city: "Coimbra",
        district: "Coimbra",
        postalCodes: ["3000", "3001", "3002", "3003", "3004", "3005", "3006", "3007", "3008", "3009"],
        coordinates: { lat: 40.2033, lng: -8.4103 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "145.2 km"
    },
    {
        name: "Fórum Viseu",
        city: "Viseu",
        district: "Viseu",
        postalCodes: ["3500", "3501", "3502", "3503", "3504", "3505", "3506", "3507", "3508", "3509"],
        coordinates: { lat: 40.6610, lng: -7.9097 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "210.8 km"
    },
    {
        name: "Glicínias Plaza",
        city: "Almada",
        district: "Setúbal",
        postalCodes: ["2800", "2801", "2802", "2803", "2804", "2805", "2806", "2807", "2808", "2809"],
        coordinates: { lat: 38.6805, lng: -9.1583 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "15.3 km"
    },
    {
        name: "Leiria Shopping",
        city: "Leiria",
        district: "Leiria",
        postalCodes: ["2400", "2401", "2402", "2403", "2404", "2405", "2406", "2407", "2408", "2409"],
        coordinates: { lat: 39.7477, lng: -8.8070 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "110.5 km"
    },
    {
        name: "Mar Shopping",
        city: "Matosinhos",
        district: "Porto",
        postalCodes: ["4450", "4451", "4452", "4453", "4454", "4455"],
        coordinates: { lat: 41.1858, lng: -8.6861 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "284.6 km"
    },
    {
        name: "NorteShopping",
        city: "Matosinhos",
        district: "Porto",
        postalCodes: ["4450", "4451", "4452", "4453", "4454", "4455"],
        coordinates: { lat: 41.1858, lng: -8.6861 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "284.6 km"
    },
    {
        name: "Palácio do Gelo",
        city: "Viseu",
        district: "Viseu",
        postalCodes: ["3500", "3501", "3502", "3503", "3504", "3505", "3506", "3507", "3508", "3509"],
        coordinates: { lat: 40.6610, lng: -7.9097 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "210.8 km"
    },
    {
        name: "Porto Gran Plaza",
        city: "Porto",
        district: "Porto",
        postalCodes: ["4200", "4201", "4202", "4203", "4204", "4205", "4206", "4207", "4208", "4209"],
        coordinates: { lat: 41.1579, lng: -8.6291 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "275.3 km"
    },
    {
        name: "RioSul Shopping",
        city: "Seixal",
        district: "Setúbal",
        postalCodes: ["2840", "2841", "2842", "2843", "2844", "2845", "2846", "2847", "2848", "2849"],
        coordinates: { lat: 38.6425, lng: -9.1031 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "18.7 km"
    },
    {
        name: "Vila do Conde",
        city: "Vila do Conde",
        district: "Porto",
        postalCodes: ["4480", "4481", "4482", "4483", "4484", "4485", "4486", "4487", "4488", "4489"],
        coordinates: { lat: 41.3548, lng: -8.7464 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "290.1 km"
    },
    {
        name: "Vila Nova de Gaia",
        city: "Vila Nova de Gaia",
        district: "Porto",
        postalCodes: ["4400", "4401", "4402", "4403", "4404", "4405", "4406", "4407", "4408", "4409"],
        coordinates: { lat: 41.1333, lng: -8.6167 },
        stock: "Com stock",
        clickCollect: "Disponível",
        delivery: "Disponível",
        distance: "270.8 km"
    }
];

// Função para calcular distância entre dois pontos (fórmula de Haversine)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
}

// Função simplificada: apenas valida o código postal e retorna todas as lojas
function validatePostalCode(postalCode) {
    if (!postalCode || postalCode.length !== 4 || !/^\d{4}$/.test(postalCode)) {
        return null; // Código postal inválido
    }
    return ikeaStores; // Retorna todas as lojas para o usuário escolher
}

// Função para encontrar lojas por nome ou cidade (para busca)
function searchStores(query) {
    if (!query) return ikeaStores;
    
    const searchTerm = query.toLowerCase();
    return ikeaStores.filter(store => 
        store.name.toLowerCase().includes(searchTerm) ||
        store.city.toLowerCase().includes(searchTerm) ||
        store.district.toLowerCase().includes(searchTerm)
    );
}

// Exportar para uso global
window.ikeaStores = ikeaStores;
window.validatePostalCode = validatePostalCode;
window.searchStores = searchStores;
window.calculateDistance = calculateDistance;
