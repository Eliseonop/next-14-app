import { IDireccion } from './direccion.interface'

export interface IProveedor {
  rut: string
  nombre: string
  direccion: IDireccion
  telefono: string
  paginaWeb: string
}
