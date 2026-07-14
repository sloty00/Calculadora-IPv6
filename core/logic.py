import ipaddress

def subnetear(red_base: str, nuevo_prefijo: int):
    """
    Middleware de cálculo de subredes IPv6.
    
    :param red_base: Cadena con la red (ej. '2001:db8:acad::/48')
    :param nuevo_prefijo: Entero del nuevo prefijo (ej. 64)
    :return: Lista de diccionarios con la info de cada subred.
    """
    try:
        # Creamos el objeto de red principal
        net = ipaddress.IPv6Network(red_base, strict=False)
        
        # Validamos que el nuevo prefijo sea mayor que el actual
        if nuevo_prefijo <= net.prefixlen:
            raise ValueError(f"El nuevo prefijo debe ser mayor que {net.prefixlen}")
        
        # Generamos las subredes
        subnets = list(net.subnets(new_prefix=nuevo_prefijo))
        
        resultados = []
        for s in subnets:
            resultados.append({
                "red": str(s.network_address) + "/" + str(s.prefixlen),
                "gateway": str(s[1]),  # Convención: primera IP asignable
                "rango_inicio": str(s[0]),
                "rango_final": str(s[-1]),
                "total_ips": int(s.num_addresses)
            })
            
        return resultados
        
    except ValueError as e:
        # Error de formato o de prefijos inválidos
        raise ValueError(f"Error en el cálculo: {str(e)}")

# Ejemplo de prueba rápida (si ejecutas el archivo directamente)
if __name__ == "__main__":
    print(subnetear("2001:db8:1234::/48", 64))
