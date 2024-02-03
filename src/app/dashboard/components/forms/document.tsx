'use client'
import { PlusIcon } from '@heroicons/react/24/outline'
import React, { useMemo, useState, useContext } from 'react'
import { Field, FieldProps, useFormikContext } from 'formik'
import { IDetalleProducto } from '../../models/detalleProductointerface'
import { useAppContext } from '../dashboard'
import { ICliente } from '@/app/models/cliente.interface'
import Autocomplete from './autocomplete'
import { ISucursal } from '@/app/models/sucursal.interface'

const Document: React.FC = () => {
  const { clientes, setClientes, sucursales } = useAppContext()
  const [isCreating, setIsCreating] = useState<boolean>(false)
  const formik = useFormikContext<{
    client: string
    branchOffice: string
    currency: string
    details: IDetalleProducto[]
    total: number
  }>()
  const [inputValue, setInputValue] = useState<string>('')

  const createClient = async (name: string) => {
    console.log('Creating client', name)
    const newCliente = {
      rut: clientes.length + 1 + '',
      nombre: name,
      apellidos: '',
      direccion: {
        calle: '',
        numero: '',
        comuna: '',
        ciudad: ''
      },
      telefono: ''
    }
    setClientes([newCliente, ...clientes])
    setIsCreating(false)
  }
  const handleInputEmit = (inputValue: string) => {
    console.log('Input value', inputValue)
    setInputValue(inputValue)
    const trimmedValue = inputValue.trim()

    setIsCreating(
      !clientes.some(
        cliente =>
          cliente.nombre.toLowerCase().trim() === trimmedValue.toLowerCase()
      )
    )
  }
  const onSelectSucursales = (selectedOption: ISucursal) => {
    formik.setFieldValue('branchOffice', selectedOption.nombre)
    // patchear la divisa de la sucursal
    const findSucursal = sucursales.find(
      sucursal => sucursal.nombre === selectedOption.nombre
    )
    if (findSucursal) {
      formik.setFieldValue('currency', findSucursal.divisa)
    }
  }

  return (
    <div className='text-black w-full'>
      <div>
        <div className='text-2xl font-semibold'>Document</div>
        <div className='h-[1.5px] bg-gray-300 w-full'></div>
      </div>
      <div className='w-full mt-10 grid grid-cols-12 gap-4 flex-wrap sm:flex-nowrap'>
        <div className='col-span-6 flex flex-col  relative '>
          <label htmlFor='client' className='text-gray-600 text-sm'>
            Client
          </label>
          <div className='grid-cols-12 grid gap-4'>
            <Autocomplete
              onInputEmit={handleInputEmit}
              options={clientes}
              onSelect={(selectedOption: ICliente) => {
                console.log('Selected option', selectedOption)
                formik.setFieldValue('client', selectedOption.nombre)
                setInputValue(selectedOption.nombre)
              }}
            />

            <div className='flex h-10 gap-4 col-span-2 '>
              <button
                type='button'
                onClick={() => createClient(inputValue)}
                className={`bg-blue-500 p-2 h-full flex items-center ${
                  isCreating ? 'text-white' : 'text-gray-400 cursor-not-allowed'
                }`}
                disabled={!isCreating}
              >
                <PlusIcon className='text-white font-bold h-5'></PlusIcon>
              </button>
            </div>
          </div>
        </div>
        <div className='flex flex-col col-span-3'>
          <label htmlFor='branchOffice' className='text-gray-600 text-sm'>
            Branch office
          </label>
          <div className='flex h-9 gap-4'>
            <Autocomplete options={sucursales} onSelect={onSelectSucursales} />
          </div>
        </div>
        <div className='flex flex-col col-span-3 '>
          <label htmlFor='currency' className='text-gray-600 text-sm'>
            Currency
          </label>
          <div className='flex h-9 gap-4'>
            <Field name='currency' type='text'>
              {({ field }: FieldProps) => (
                <input
                  id='currency'
                  className='w-full border-gray-300 p-2 bg-white'
                  {...field}
                  disabled
                />
              )}
            </Field>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Document
