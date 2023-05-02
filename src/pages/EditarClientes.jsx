/* eslint-disable no-control-regex */
import { Form, redirect, useActionData, useLoaderData, useNavigate } from 'react-router-dom';

import Error from '../components/Error';
import Formulario from '../components/Formulario';
import { editarCliente, obtenerCliente } from '../data/clientes';

export async function loader({params}){

    const cliente = await obtenerCliente(params.clienteId);
    // console.log(cliente)

if(Object.values(cliente).length === 0){
  throw new Response('', {
    status:404,
    statusText:'No hay resultados'
  })
}

    return cliente;
}

export async function action({request,params}){

      const formData = await request.formData();

    const datos = Object.fromEntries(formData);
    // console.log(datos)    
    
    const email = formData.get('email');

    //validacion
    const errores = [];
    if(Object.values(datos).includes('')){
        errores.push('Todos los campos son requeridos')
    }
    // eslint-disable-next-line no-useless-escape
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    if(!regex.test(email)){
        errores.push('El email no es valido');
    }
    
    //retornar datos si hay errores
    if(Object.keys(errores).length){
        return errores;
    }
    await editarCliente(datos, params.clienteId)
    
    console.log('Cliente editado')

    return redirect('/') ;

}

function EditarClientes() {

  const cliente = useLoaderData()
  const navigate = useNavigate();
  const errores = useActionData();
  // console.log(datosClienteEditar);
  return (
    <div>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
            <p className="mt-3">Edita los campos deseados del cliente</p>

            <div className="flex justify-end">
                <button
                    className="bg-blue-800 text-white px-3 py-1 uppercase font-bold"
                    onClick={() => navigate('/')}
                >Volver</button>
            </div>

            <div className="bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-10">
                
                {errores?.length && errores.map((error, i) => <Error key={i}>{error}</Error> )}

                <Form 
                    method='post'
                    noValidate
                >
                    <Formulario
                        cliente={cliente}
                    />
                    
                    <input
                        type='submit'
                        className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
                        value='Registrar Cliente'
                    />
                </Form>

            </div>
    </div>
  )
}

export default EditarClientes
