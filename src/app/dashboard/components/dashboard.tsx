'use client'
import Image from 'next/image'
import Document from './forms/document'
import Details from './forms/details'
import { Form, Formik } from 'formik'
import { ISucursal } from '@/app/models/sucursal.interface'
import { ICliente } from '@/app/models/cliente.interface'
import { IVenta } from '../models/venta.interface'

import * as Yup from 'yup'
import React, { useState } from 'react'
import { storeApi } from '@/store'
// import { modificarDatos } from '@/app/mock/mock.service'

const MemoizedDetails = React.memo(Details)

export default function Dashboard () {
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const { clientes, sucursales, ventas, setVentas } = storeApi()

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

  const handleSubmit = async (
    values: {
      client: string
      branchOffice: string
      currency: string
      details: never[]
      total: number
    },

    formikBag: any
  ) => {
    setLoading(true)

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
    setVentas([nuevaVenta, ...ventas])
    // en 4 segundos se agrega la venta y se limpia el formulario y se muestra un mensaje de éxito

    setLoading(false)
    formikBag.resetForm()
  }

  return (
    <>
      <div className='text-black '>
        <div className='flex w-full gap-4'>
          <Image src='/Recurso7.png' alt='' width={100} height={100} />
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
