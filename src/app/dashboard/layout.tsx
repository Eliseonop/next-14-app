import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter } from 'next/font/google'
import Sidenav from './components/sidenav'

// const opensSans = localFont({
//   src: [
//     {
//       path: '/src/Fonts/OpenSans-Bold.ttf',
//       weight: '700',
//       style: 'normal'
//     },
//     {
//       path: '/src/Fonts/OpenSans-ExtraBold.ttf',
//       weight: '800',
//       style: 'normal'
//     },
//     {
//       path: '/src/Fonts/OpenSans-Semibold.ttf',
//       weight: '600',
//       style: 'normal'
//     }
//   ]
// })

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Informacion General'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
      <div className='w-fit'>
        <Sidenav></Sidenav>
      </div>

      <div className='flex-grow p-10 md:overflow-y-auto md:p-12 bg-gray-100'>
        {children}
      </div>
    </div>
  )
}
