'use client'
import Image from 'next/image'
import Document from './forms/document'
import Details from './forms/details'
import { Form, Formik } from 'formik'

import { IProducto } from '@/app/models/producto.interface'
import { ISucursal } from '@/app/models/sucursal.interface'
import { ICliente } from '@/app/models/cliente.interface'
import { IVenta } from '../models/venta.interface'

import * as Yup from 'yup'
import React, { useState } from 'react'
// import { modificarDatos } from '@/app/mock/mock.service'
import { useAppContext } from '../page'

const MemoizedDetails = React.memo(Details)

export default function Dashboard () {
  const [total, setTotal] = useState<number>(0)
  const { clientes, sucursales, ventas } = useAppContext()

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

  const handleSubmit = async (values: {
    client: string
    branchOffice: string
    currency: string
    details: never[]
    total: number
  }) => {
    // Crear objeto de venta
    const findCliente = clientes.find(
      cliente => cliente.nombre === values.client
    ) as ICliente
    const findSucursal = sucursales.find(
      sucursal => sucursal.nombre === values.branchOffice
    ) as ISucursal
    const nuevaVenta: IVenta = {
      cliente: findCliente,
      sucursal: findSucursal,
      montoTotal: values.total,
      detalles: values.details,
      vendedor: {
        apellidos: '',
        direccion: {
          calle: '',
          ciudad: '',
          comuna: '',
          numero: ''
        },
        email: '',
        fechaNacimiento: '',
        nombre: '',
        rut: '',
        telefono: ''
      },
      fecha: new Date().toISOString(),
      id: ventas.length + 1 + ''
    }

    // try {
    //   // Llamamos a la función modificarDatos para realizar la petición POST
    //   const resultado = await modificarDatos('/data/ventas.json', nuevaVenta)
    //   console.log('Venta creada:', resultado)
    //   // Puedes realizar otras acciones después de crear la venta si es necesario

    //   // Limpia el formulario después de la creación exitosa
    //   // Puedes reiniciar los valores iniciales o hacer otras acciones según tus necesidades
    // } catch (error) {
    //   console.error('Error al crear la venta:', error)
    //   // Puedes manejar el error de acuerdo a tus necesidades
    // }
  }

  return (
    <>
      <div className='text-black '>
        <div className='flex w-full'>
          <Image src='/works.svg' alt='' width={100} height={100} />
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
            onSubmit={handleSubmit}
          >
            {({ isValid }) => (
              <Form className='text-black w-full mt-10 gap-3'>
                <Document />
                <MemoizedDetails setTotal={setTotal} />
                <div className='w-full flex justify-end  items-center'>
                  Total:
                  <span
                    className='
                  text-gray-600 mr-20
                  w-24 h-10 flex items-center justify-center font-semibold bg-white'
                  >
                    {total}
                  </span>
                </div>
                <div className='h-[1.5px] mt-5 bg-gray-300 w-full'></div>

                <div className='w-full flex justify-end  items-center'>
                  <button
                    type='submit'
                    className={`bg-blue-500 text-white px-10 py-2 mt-5 ${
                      !isValid ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={!isValid}
                  >
                    Save
                  </button>
                </div>

                {/* total */}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}
