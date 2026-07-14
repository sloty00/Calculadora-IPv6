function calcular() {
    const base = document.getElementById('base_ipv6').value.trim();
    const prefijo = parseInt(document.getElementById('prefix').value);
    const tbody = document.querySelector('tbody');
    
    // --- EL GUARDIÁN ---
    if (base.includes('.')) {
        alert("¡Error! Esta herramienta solo admite IPv6. Las direcciones IPv4 no están permitidas.");
        tbody.innerHTML = ''; // Limpiamos tabla
        return; // Detenemos la ejecución aquí
    }
    
    // Validamos que sea IPv6 (básico, debe contener al menos un ':')
    if (!base.includes(':')) {
        alert("Formato no reconocido. Asegúrate de ingresar una dirección IPv6 válida.");
        return;
    }
    // -------------------

    // Si pasa el guardián, procedemos con la lógica de IPv6
    tbody.innerHTML = '';
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
