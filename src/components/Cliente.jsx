/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import { Form, redirect, useNavigate } from 'react-router-dom';

import { eliminarCliente } from '../data/clientes';




export async function action({params}){

    await eliminarCliente(params.clienteId);
    
    return redirect('/');
}

function Cliente({cliente}) {

    const {nombre,empresa,email,telefono,id} = cliente

    const navigate = useNavigate()
    
  return (
    <>
    <tr className="border-b ">
        <td className="p-6 space-y-2">
            <p className="text-2xl text-gray-800">{nombre}</p>
            <p>{empresa}</p>
        </td>

        <td className="p-6 ">
            <p className="text-gray-600"> 
                <span className="text-gray-800 uppercase font-bold">Email: </span>
                {email}
            </p>
            <p className="text-gray-600"> 
                <span className="text-gray-800 uppercase font-bold">Telefono: </span>
                {telefono}
            </p>
        </td>
        <td className="p-5 flex justify-between">
            <button
                type="button"
                className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs"
                onClick={()=> navigate(`/clientes/${id}/editar`)}
            >Editar</button>
            
            <Form
                method='post'
                action={`/clientes/${id}/eliminar`}
                onSubmit={(e)=>{
                    if(!confirm('Deseas eliminar este cliente?')){
                        e.preventDefault();
                    }
                } }
            >
                <button
                    type="submit"
                    className="text-red-600 hover:text-red-700 uppercase font-bold text-xs"
                >Eliminar</button>
            </Form>
        </td>
    </tr>

    </>
  )
}

export default Cliente
