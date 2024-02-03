// Autocomplete.tsx
'use client'
import React, { useEffect, useState } from 'react'

interface AutocompleteProps {
  options: any[] // Update the type according to your data structure
  onSelect: (selectedOption: any) => void
  onInputEmit?: (inputValue: string) => void
  formik?: any
  name?: string
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  onSelect,
  onInputEmit,
  formik,
  name
}) => {
  const [inputValue, setInputValue] = useState<string>('')
  const [filteredOptions, setFilteredOptions] = useState<any[]>(options)
  const [menuVisible, setMenuVisible] = useState<boolean>(false)

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setInputValue(value)
    setMenuVisible(true)
    const trimmedValue = value.trim()
    const filtered = options.filter((option: any) =>
      option.nombre.toLowerCase().includes(trimmedValue.toLowerCase())
    )
    setFilteredOptions(filtered)
    formik.setFieldValue(name, value) // Update the formik value
    // Emitir el valor del input
    if (onInputEmit) {
      onInputEmit(value)
    }
  }

  useEffect(() => {
    if (!formik) return
    setInputValue(formik.values[name ? name : ''])
  }, [formik])

  return (
    <div className='w-full  col-span-10 relative'>
      <input
        type='text'
        className='h-full px-1 w-full'
        value={inputValue}
        onChange={onInputChange}
        onFocus={() => setMenuVisible(true)}
        onBlur={() => setMenuVisible(false)}
        onClick={() => setMenuVisible(true)}
      />
      {menuVisible && (
        <div
          className='absolute top-10 z-50 h-80 overflow-y-auto overflow-x-hidden
        '
        >
          {filteredOptions.map((option, index) => (
            <div
              className='flex items-center gap-2 cursor-pointer bg-white p-2
              hover:bg-gray-100'
              key={index}
              onMouseDown={e => {
                e.preventDefault() // Evitar que el input pierda el foco
                onSelect(option)

                setInputValue(option.nombre)
                setMenuVisible(false) // Cerrar el menú al hacer clic
              }}
            >
              {option.nombre}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Autocomplete
