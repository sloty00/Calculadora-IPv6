async function calcular() {
    const response = await fetch('/api/subnet', {
        method: 'POST',
        body: JSON.stringify({ base: '2001:db8::/48', prefix: 64 })
    });
    const data = await response.json();
    // Aquí renderizas los datos en el HTML
    console.table(data);
}
