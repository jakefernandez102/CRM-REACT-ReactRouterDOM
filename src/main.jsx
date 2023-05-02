import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { action as eliminarClienteAction } from './components/Cliente';
import ErrorPage from './components/ErrorPage';
import Layour from './components/Layout';
import EditarClientes, { action as editarClienteAction, loader as editarClienteLoader } from './pages/EditarClientes';
import Index, { loader as clientesLoader } from './pages/Index';
import NuevoCliente, { action as nuevoClienteAction } from './pages/NuevoCliente';

const router = createBrowserRouter ([
  {
    path: '/',
    element: <Layour/>,
    children:[
      {
        index:true,
        element:<Index/>,
        loader:clientesLoader,
        errorElement:<ErrorPage/>
      },
      {
        path: '/clientes/nuevo',
        element: <NuevoCliente/>,
        action: nuevoClienteAction,
        errorElement:<ErrorPage></ErrorPage>
      },
      {
        path:'/clientes/:clienteId/editar',
        element:<EditarClientes/>,
        loader:editarClienteLoader,
        action:editarClienteAction,
        errorElement:<ErrorPage></ErrorPage>,

      },
      {
        path:'/clientes/:clienteId/eliminar',
        action:eliminarClienteAction
      }
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider 
      router={router}
    />
  </React.StrictMode>,
)
