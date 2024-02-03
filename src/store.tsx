import { create } from 'zustand'
import { ICliente } from './app/models/cliente.interface'
import { ISucursal } from './app/models/sucursal.interface'
import { IVenta } from './app/dashboard/models/venta.interface'
import { IProducto } from './app/models/producto.interface'
import {
  obtenerClientes,
  obtenerProductos,
  obtenerSucursales,
  obtenerVentas
} from './app/mock/mock.service'

type typeStoreState = {
  clientes: ICliente[]
  sucursales: ISucursal[]
  ventas: IVenta[]
  productos: IProducto[]
}

const initialState: typeStoreState = {
  clientes: [],
  sucursales: [],
  ventas: [],
  productos: []
}

export const storeApi = create((set: any) => ({
  ...initialState,
  getClientes: async () => {
    const clientes = await obtenerClientes()
    set({ clientes })
  },
  getSucursales: async () => {
    const sucursales = await obtenerSucursales()
    set({ sucursales })
  },
  getVentas: async () => {
    const ventas = await obtenerVentas()
    set({ ventas })
  },
  getProductos: async () => {
    const productos = await obtenerProductos()
    set({ productos })
  },
  setClientes: (clientes: any) => set({ clientes }),
  setSucursales: (sucursales: any) => set({ sucursales }),
  setVentas: (ventas: any) => set({ ventas }),
  setProductos: (productos: any) => set({ productos })
}))
