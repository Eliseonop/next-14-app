import { ICliente } from '@/app/models/cliente.interface'
import { ISucursal } from '@/app/models/sucursal.interface'
import { IVendedor } from '@/app/models/vendedor.interface'
import { IDetalleProducto } from './detalleProductointerface'

export interface IVenta {
  id: string
  fecha: string // Puedes utilizar Date si prefieres
  vendedor: IVendedor
  cliente: ICliente
  sucursal: ISucursal
  montoTotal: number
  detalles: IDetalleProducto[]
}
