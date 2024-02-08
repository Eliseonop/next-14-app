'use client'
import {
  StarIcon,
  HomeIcon,
  FolderMinusIcon,
  UserIcon,
  DocumentPlusIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
const links = [
  { name: 'Home', href: '/dashboard', icon: '/ilustraciones/Recurso 8.png' },
  { name: 'start', href: '/dashboard', icon: '/ilustraciones/Recurso 9.png' },
  { name: 'other', href: '/dashboard', icon: '/ilustraciones/Recurso 10.png' },
  { name: 'other2', href: '/dashboard', icon: '/ilustraciones/Recurso 11.png' },
  { name: 'other3', href: '/dashboard', icon: '/ilustraciones/Recurso 12.png' }
]

export default function SideNav () {
  const [inEnter, setInEnter] = useState(false)

  return (
    <div
      className='flex h-full flex-col  py-4 
    bg-sky-600 md:w-20 w-screen
       items-center
    '
      onMouseEnter={() => setInEnter(true)}
      onMouseLeave={() => setInEnter(false)}
    >
      <div
        className='flex   flex-row items-center  md:flex-col md:space-x-0 md:space-y-2 md:pt-10
        bg-transparent
      '
      >
        {links.map(link => {
          const LinkIcon = link.icon
          return (
            <div className='w-full ' key={link.name}>
              <Link
                href={link.href}
                className='flex h-[48px]  items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium text-white  md:flex-none   md:justify-start md:p-2 md:px-3'
              >
                <Image
                  src={link.icon}
                  alt=''
                  width={24}
                  height={24}
                  className={inEnter ? 'w-6' : 'w-6'}
                ></Image>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
