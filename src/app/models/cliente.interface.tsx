import { IDireccion } from './direccion.interface'

export interface ICliente {
  rut: string
  nombre: string
  apellidos: string
  direccion: IDireccion
  telefono: string
}
