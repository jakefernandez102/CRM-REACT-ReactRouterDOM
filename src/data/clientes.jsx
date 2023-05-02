export async function obtenerClientes(){


    const respuesta = await fetch(`${import.meta.env.VITE_URL_BASE}/clientes`);
    const clientes = await respuesta.json();

    return clientes;
}

export async function obtenerCliente(clienteId){


    const respuesta = await fetch(`${import.meta.env.VITE_URL_BASE}/clientes/${clienteId}`);
    const cliente = await respuesta.json();

    return cliente;
}

export async function agregarCliente(datosCliente){


    try {

        const respuesta = await fetch(`${import.meta.env.VITE_URL_BASE}/clientes`,{
            method:'POST',
            body: JSON.stringify(datosCliente),
            headers:{
                'Content-Type':'application/json'
            }
        })
        await respuesta.json();

    } catch (error) {
        console.log(error)
    }

}

export async function editarCliente(cliente,clienteId){
    
    try {
    
        const respuesta = await fetch(`${import.meta.env.VITE_URL_BASE}/clientes/${clienteId}`,{
        method:'PUT',
        body: JSON.stringify(cliente),
        headers:{
            'Content-Type':'application/json'
        }
    });
    respuesta.json();

    } catch (error) {
        console.log(error)
    }

}

export async function eliminarCliente(clienteId){

    console.log(clienteId);
    console.log('Eliminando');

    try {
    
        const respuesta = await fetch(`${import.meta.env.VITE_URL_BASE}/clientes/${clienteId}`,{
        method:'DELETE'
    });
    respuesta.json();

    } catch (error) {
        console.log(error)
    }

}