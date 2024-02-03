import { IVenta } from '../dashboard/models/venta.interface'
import { ICliente } from '../models/cliente.interface'
import { IProducto } from '../models/producto.interface'
import { ISucursal } from '../models/sucursal.interface'

// Función para simular retardo de 3 segundos
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// Funciones para obtener la data
export const obtenerProductos = async (): Promise<IProducto[]> => {
  // await delay(3000) // Simula retardo de 3 segundos
  // Lógica para obtener productos desde el servidor o archivo JSON
  const response = await fetch('/data/productos.json')
  const productos = await response.json()
  return productos
}

export const obtenerSucursales = async (): Promise<ISucursal[]> => {
  // await delay(3000)
  const response = await fetch('/data/sucursales.json')

  const sucursales = await response.json()
  return sucursales
}

export const obtenerClientes = async (): Promise<ICliente[]> => {
  // await delay(3000)
  const response = await fetch('/data/clientes.json')
  const clientes = await response.json()
  return clientes
}

export const obtenerVentas = async (): Promise<IVenta[]> => {
  // await delay(3000)
  const response = await fetch('/data/ventas.json')
  const ventas = await response.json()
  return ventas
}
