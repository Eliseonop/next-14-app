import { IDireccion } from './direccion.interface'

export interface IVendedor {
  rut: string
  nombre: string
  apellidos: string
  direccion: IDireccion
  telefono: string
  fechaNacimiento: string // Puedes utilizar Date si prefieres
  email: string
}
