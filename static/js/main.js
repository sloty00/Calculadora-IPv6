function calcular() {
    const base = document.getElementById('base_ipv6').value;
    const prefijo = parseInt(document.getElementById('prefix').value);
    const tbody = document.querySelector('tbody');
    
    // Limpiar tabla
    tbody.innerHTML = '';

    // Lógica básica de subneteo (adaptable a tus necesidades de cálculo)
    // Usamos split simple para simular el incremento de red
    const partes = base.split(':');
    const baseRed = partes.slice(0, 4).join(':'); 

    for (let i = 0; i < 4; i++) {
        const nuevaRed = `${baseRed}:${i.toString(16)}::/${prefijo}`;
        const gateway = `${baseRed}:${i.toString(16)}::1`;
        const inicio = `${baseRed}:${i.toString(16)}::`;
        const fin = `${baseRed}:${i.toString(16)}:ffff:ffff:ffff:ffff`;

        tbody.innerHTML += `
            <tr>
                <td>${nuevaRed}</td>
                <td>${gateway}</td>
                <td>${inicio}</td>
                <td>${fin}</td>
            </tr>`;
    }
}
