'use client'
// Importaciones de tus dependencias
import { Formik, Form, Field, FieldArray, useFormikContext } from 'formik'

import { IDetalleProducto } from '../../models/detalleProductointerface'

import React, { useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Autocomplete from './autocomplete'
import { IProducto } from '@/app/models/producto.interface'
import { storeApi } from '@/store'

const Details: React.FC<{ setTotal: (total: number) => void }> = ({
  setTotal
}) => {
  const { productos } = storeApi()

  const { values, setFieldValue, errors } = useFormikContext<{
    client: string
    branchOffice: string
    currency: string
    details: IDetalleProducto[]
    total: number
  }>()

  const deleteDetail = (index: number) => {
    const newDetails = values.details.filter((_, i) => i !== index)
    setFieldValue('details', newDetails)
  }

  const addDetails = () => {
    // encontrar el id mas alto

    const id =
      values.details.reduce((acc, curr) => {
        return curr.id > acc ? curr.id : acc
      }, 0) + 1
    setFieldValue('details', [
      ...values.details,
      { id, name: '', quantity: 0, price: 0, subtotal: 0 }
    ])
  }

  const handleSelectProduct = (selectedOption: IProducto, detailId: any) => {
    const index = values.details.findIndex(detail => detail.id === detailId)
    const newDetails = values.details.map((detail, i) => {
      if (i === index) {
        const quantity = detail.quantity || 1 // Asegúrate de que la cantidad sea al menos 1
        return {
          ...detail,
          name: selectedOption.nombre,
          price: selectedOption.precio,
          subtotal: quantity * selectedOption.precio,
          quantity: quantity
        }
      }
      return detail
    })
    setFieldValue('details', newDetails)
  }

  useEffect(() => {
    console.log('values.details', values.details)
    const total = values.details.reduce((acc, curr) => acc + curr.subtotal, 0)
    console.log('total', total)
    setFieldValue('total', total)
    setTotal(total)
  }, [values.details])

  return (
    <div className='text-black w-full mt-5'>
      <div>
        <div className='text-2xl font-semibold'>Details</div>
        <div className='h-[1.5px] bg-gray-300 w-full'></div>
      </div>
      <div className='grid grid-cols-12 text-sm text-gray-500 mt-3'>
        <div className='col-span-5 flex '>Name </div>
        <div className='col-span-2 flex '>Quantity </div>
        <div className='col-span-2 flex'>Price </div>
        <div className='col-span-2 flex '>Sub Total</div>
        <div className='col-span-1 flex '></div>
      </div>
      <FieldArray name='details'>
        {({ push }) => (
          <>
            {values.details.map((detail, index) => (
              <div
                key={index}
                className='grid grid-cols-5 sm:grid-cols-12 pb-2   gap-3 my-3 border-b'
              >
                {/* ... (Resto del código para cada detalle) */}
                <div className='sm:col-span-5 col-span-3 flex '>
                  <Autocomplete
                    options={productos}
                    onSelect={a => handleSelectProduct(a, detail.id)}
                  />
                </div>

                {/* Input para la cantidad */}
                <div className='sm:col-span-2 col-span-2    flex '>
                  <Field
                    type='number'
                    name={`details.${index}.quantity`}
                    className='border-gray-300 w-full p-2'
                    onChange={(e: any) => {
                      if (e.target.value <= 0) e.target.value = 1

                      const producto = productos.find(
                        p => p.nombre === detail.name
                      )

                      if (producto !== undefined)
                        if (e.target.value > producto?.stock)
                          e.target.value = producto?.stock

                      const newDetails = values.details.map((d, i) => {
                        if (i === index) {
                          return {
                            ...d,
                            quantity: e.target.value,
                            subtotal: e.target.value * d.price
                          }
                        }
                        return d
                      })
                      setFieldValue('details', newDetails)
                    }}
                  />
                </div>

                {/* Input para el precio */}
                <div className='sm:col-span-2 col-span-2 flex'>
                  <span className='border-gray-300 w-full p-2 bg-white'>
                    {detail.price}
                  </span>
                </div>

                {/* Campo para el subtotal (calculado y deshabilitado) */}
                <div className='sm:col-span-2 col-span-2 flex '>
                  <span className='border-gray-300 w-full p-2 bg-white'>
                    {detail.subtotal}
                  </span>
                </div>

                {/* Botón para eliminar el detalle */}
                <div className='col-span-1  flex '>
                  <button
                    type='button'
                    onClick={() => deleteDetail(index)}
                    className='bg-blue-500 p-2 h-full flex items-center'
                  >
                    <XMarkIcon className='text-white font-bold h-5'></XMarkIcon>
                  </button>
                </div>
              </div>
            ))}
            <button
              type='button'
              onClick={addDetails}
              className='bg-blue-500 px-8 py-2 h-full flex items-center text-white mt-10'
            >
              <div>Add</div>
            </button>
          </>
        )}
      </FieldArray>
    </div>
  )
}

export default Details
