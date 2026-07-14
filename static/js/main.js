async function calcular() {
    const base = document.getElementById('base_ipv6').value;
    const prefix = parseInt(document.getElementById('prefix').value);

    const response = await fetch('/api/subnet', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ base_ipv6: base, prefix: prefix })
    });

    const result = await response.json();
    const tbody = document.getElementById('resultsBody');
    tbody.innerHTML = ''; // Limpiar resultados previos

    if (result.status === 'success') {
        result.data.forEach(item => {
            tbody.innerHTML += `<tr>
                <td>${item.red}</td>
                <td>${item.gateway}</td>
                <td>${item.rango_inicio}</td>
                <td>${item.rango_final}</td>
            </tr>`;
        });
    } else {
        alert('Error: ' + result.message);
    }
}
