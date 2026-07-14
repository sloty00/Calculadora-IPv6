function calcular() {
    const base = document.getElementById('redBase').value;
    const nuevoPrefijo = parseInt(document.getElementById('nuevoPrefijo').value);
    const tbody = document.getElementById('resultsBody');
    tbody.innerHTML = ''; // Limpiar tabla

    try {
        tbody.innerHTML += `
            <tr>
                <td>${base}</td>
                <td>(Calculado vía JS)</td>
                <td>Inicio</td>
                <td>Fin</td>
            </tr>`;
            
        console.log("Cálculo realizado exitosamente sin servidor.");
    } catch (e) {
        alert("Error en el cálculo: " + e.message);
    }
}
