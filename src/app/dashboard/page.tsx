'use client'
import Dashboard from './components/dashboard'
import React, {
  useState,
  createContext,
  useMemo,
  useContext,
  useEffect
} from 'react'
import {
  obtenerClientes,
  obtenerProductos,
  obtenerSucursales,
  obtenerVentas
} from '@/app/mock/mock.service'
import { IProducto } from '../models/producto.interface'
import { ISucursal } from '../models/sucursal.interface'
import { ICliente } from '../models/cliente.interface'
import { IVenta } from './models/venta.interface'

const AppContext = createContext<{
  productos: IProducto[]
  sucursales: ISucursal[]
  clientes: ICliente[]
  ventas: IVenta[]
  setProductos: (productos: IProducto[]) => void
  setSucursales: (sucursales: ISucursal[]) => void
  setClientes: (clientes: ICliente[]) => void
  setVentas: (ventas: IVenta[]) => void
}>({
  productos: [] as IProducto[],
  sucursales: [] as ISucursal[],
  clientes: [] as ICliente[],
  ventas: [] as IVenta[],
  setProductos: () => {},
  setSucursales: () => {},
  setClientes: () => {},
  setVentas: () => {}
})

export function useAppContext () {
  return useContext(AppContext)
}

export default function DashBoard () {
  const [productos, setProductos] = useState<IProducto[]>([])
  const [sucursales, setSucursales] = useState<ISucursal[]>([])
  const [clientes, setClientes] = useState<ICliente[]>([])
  const [ventas, setVentas] = useState<IVenta[]>([])
  const value = {
    productos,
    sucursales,
    clientes,
    ventas,
    setProductos,
    setSucursales,
    setClientes,
    setVentas
  }

  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== 'undefined') {
        const productosData = await obtenerProductos()
        const sucursalesData = await obtenerSucursales()
        const clientesData = await obtenerClientes()
        const ventasData = await obtenerVentas()

        setProductos(productosData)
        setSucursales(sucursalesData)
        setClientes(clientesData)
        setVentas(ventasData)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='text-black '>
      <AppContext.Provider value={value}>
        <Dashboard></Dashboard>
      </AppContext.Provider>
    </div>
  )
}
