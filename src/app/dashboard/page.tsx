'use client'
import Dashboard from './components/dashboard'
import React, {
  useState,
  createContext,
  useMemo,
  useContext,
  useEffect
} from 'react'
import {
  obtenerClientes,
  obtenerProductos,
  obtenerSucursales,
  obtenerVentas
} from '@/app/mock/mock.service'

import { storeApi } from '@/store'

export default function DashBoard () {
  const { getProductos, getClientes, getSucursales, getVentas } = storeApi()

  useEffect(() => {
    getClientes()
    getProductos()
    getSucursales()
    getVentas()
  }, [])

  return (
    <div className='text-black '>
      <Dashboard></Dashboard>
    </div>
  )
}
