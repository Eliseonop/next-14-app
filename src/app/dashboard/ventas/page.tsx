'use client'
import { useEffect, useState } from 'react'
import { useAppContext } from '../page'
import { obtenerVentas } from '@/app/mock/mock.service'
import { IVenta } from '../models/venta.interface'

export default function Venta () {
  const { ventas, setVentas } = useAppContext()
  const [updateVentas, setUpdateVentas] = useState<IVenta[]>([])
  useEffect(() => {
    const fetchData = async () => {
      if (typeof window !== 'undefined') {
        const ventasData = await obtenerVentas()

        console.log(ventasData)
        setVentas(ventasData)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    console.log('ventas', ventas)
  }, [ventas])

  return (
    <div>
      <h1>Ventas</h1>
      <table className='min-w-full border border-gray-300'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='border border-gray-300 p-2'>ID</th>
            <th className='border border-gray-300 p-2'>Fecha</th>
            <th className='border border-gray-300 p-2'>Vendedor</th>
            <th className='border border-gray-300 p-2'>Cliente</th>
            <th className='border border-gray-300 p-2'>Sucursal</th>
            <th className='border border-gray-300 p-2'>Monto Total</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(venta => (
            <tr key={venta.id}>
              <td className='border border-gray-300 p-2'>{venta?.id}</td>
              <td className='border border-gray-300 p-2'>
                {new Date(venta?.fecha).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </td>
              <td className='border border-gray-300 p-2'>
                {venta?.vendedor?.nombre}
              </td>
              <td className='border border-gray-300 p-2'>
                {venta?.cliente?.nombre}
              </td>
              <td className='border border-gray-300 p-2'>
                {venta?.sucursal?.nombre}
              </td>
              <td className='border border-gray-300 p-2'>
                {venta?.montoTotal}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
