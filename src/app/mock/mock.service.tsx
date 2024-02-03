'use client'
import { IVenta } from '../dashboard/models/venta.interface'
import { ICliente } from '../models/cliente.interface'
import { IProducto } from '../models/producto.interface'
import { ISucursal } from '../models/sucursal.interface'
import { CLIENTES } from '../mock/clientes'
import { PRODUCTOS } from '../mock/productos'
import { SUCURSALES } from '../mock/sucursales'
import { VENTAS } from '../mock/ventas'
// Función para simular retardo de 3 segundos
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Funciones para obtener la data
export const obtenerProductos = async (): Promise<IProducto[]> => {
  // await delay(3000)
  const response = (await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(PRODUCTOS as IProducto[])
    }, 3000)
  })) as IProducto[]

  const productos = await response

  return productos
}

export const obtenerSucursales = async (): Promise<ISucursal[]> => {
  // await delay(3000)
  const response = (await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(SUCURSALES as ISucursal[])
    }, 3000)
  })) as ISucursal[]
  const sucursales = await response
  return sucursales
}

export const obtenerClientes = async (): Promise<ICliente[]> => {
  // await delay(3000)
  const response = (await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(CLIENTES as ICliente[])
    }, 3000)
  })) as ICliente[]
  const clientes = await response
  return clientes
}

export const obtenerVentas = async (): Promise<IVenta[]> => {
  // await delay(3000)
  const response = (await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(VENTAS as IVenta[])
    }, 3000)
  })) as IVenta[]
  const ventas = await response
  return ventas
}
