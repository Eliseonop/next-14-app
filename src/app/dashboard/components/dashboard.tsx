'use client'
import Image from 'next/image'
import Document from './forms/document'
import Details from './forms/details'
import { Form, Formik } from 'formik'
import React, {
  useEffect,
  useState,
  createContext,
  useMemo,
  useContext
} from 'react'
import {
  obtenerClientes,
  obtenerProductos,
  obtenerSucursales,
  obtenerVentas
} from '@/app/mock/mock.service'
import { IProducto } from '@/app/models/producto.interface'
import { ISucursal } from '@/app/models/sucursal.interface'
import { ICliente } from '@/app/models/cliente.interface'
import { IVenta } from '../models/venta.interface'

import * as Yup from 'yup'

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
const MemoizedDetails = React.memo(Details)

export default function Dashboard () {
  const [productos, setProductos] = useState<IProducto[]>([])
  const [sucursales, setSucursales] = useState<ISucursal[]>([])
  const [clientes, setClientes] = useState<ICliente[]>([])
  const [ventas, setVentas] = useState<IVenta[]>([])

  const [total, setTotal] = useState<number>(0)
  const validationSchema = Yup.object().shape({
    details: Yup.array().of(
      Yup.object().shape({
        quantity: Yup.number()
          .typeError('Cantidad debe ser un número')
          .min(1, 'La cantidad debe ser al menos 1')
          .required('La cantidad es requerida')
      })
    ),
    client: Yup.string().required('El cliente es requerido'),
    branchOffice: Yup.string().required('La sucursal es requerida'),
    currency: Yup.string().required('La divisa es requerida')
  })
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
  const value = useMemo(
    () => ({
      productos,
      sucursales,
      clientes,
      ventas,
      setProductos,
      setSucursales,
      setClientes,
      setVentas
    }),
    [productos, sucursales, clientes, ventas]
  )

  return (
    <AppContext.Provider value={value}>
      <div className='text-black '>
        <div className='flex w-full'>
          <Image src='' alt='' width={100} height={100} />
          <div className='w-full gap-2 flex flex-col'>
            <div className='text-4xl font-bold'>New Sale</div>
            <div className='h-[1.5px] bg-gray-300 w-full'></div>
          </div>
        </div>

        <div className='text-black'>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              client: '',
              branchOffice: '',
              currency: '',
              details: [], // Array vacío para details
              total: 0 // Campo para total
            }}
            onSubmit={values => {
              // Handle form submission here
              console.log(values)
            }}
          >
            {({ isValid }) => (
              <Form className='text-black w-full mt-10 gap-3'>
                <Document />
                <MemoizedDetails setTotal={setTotal} />
                <div>
                  <span>Total: {total}</span>
                </div>
                <button
                  type='submit'
                  className={`bg-blue-500 text-white p-2 mt-5 ${
                    !isValid ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={!isValid}
                >
                  Save
                </button>
                {/* total */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </AppContext.Provider>
  )
}
