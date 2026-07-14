function calcular() {
    const base = document.getElementById('base_ipv6').value.trim();
    const prefijo = parseInt(document.getElementById('prefix').value);
    const tbody = document.querySelector('tbody');
    
    if (!base || isNaN(prefijo)) {
        alert("Por favor, ingresa una red válida y un prefijo.");
        return;
    }

    tbody.innerHTML = ''; // Limpiar tabla

    // --- LÓGICA IPv6 ---
    if (base.includes(':')) {
        const baseRed = base.split('::')[0];
        for (let i = 0; i < 5; i++) {
            const subRedHex = i.toString(16).padStart(4, '0');
            tbody.innerHTML += `
                <tr>
                    <td>${baseRed}:${subRedHex}::/${prefijo}</td>
                    <td>${baseRed}:${subRedHex}::1</td>
                    <td>${baseRed}:${subRedHex}::</td>
                    <td>${baseRed}:${subRedHex}:ffff:ffff:ffff:ffff</td>
                </tr>`;
        }
    } 
    // --- LÓGICA IPv4 (Algoritmo Bitwise) ---
    else if (base.includes('.')) {
        const octetos = base.split('.').map(Number);
        const ipNum = (octetos[0] << 24) >>> 0 | (octetos[1] << 16) | (octetos[2] << 8) | octetos[3];
        const maskNum = (~0 << (32 - prefijo)) >>> 0;
        const netNum = (ipNum & maskNum) >>> 0;
        
        const longToIP = (num) => [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.');
        
        tbody.innerHTML += `
            <tr>
                <td>${longToIP(netNum)}/${prefijo}</td>
                <td>${longToIP(netNum + 1)}</td>
                <td>${longToIP((netNum | ~maskNum) >>> 0) - 1}</td>
                <td>${longToIP((netNum | ~maskNum) >>> 0)}</td>
            </tr>`;
    } else {
        alert("Formato IP no reconocido.");
    }
}
