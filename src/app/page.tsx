import Image from 'next/image'
import Link from 'next/link'

export default function Home () {
  const items = [
    {
      imagen: 'ilustraciones/Recurso 2.png',
      description: 'Description 1'
    },
    {
      imagen: 'ilustraciones/Recurso 2.png',

      description: 'Description 2'
    },
    {
      imagen: 'ilustraciones/Recurso 2.png',

      description: 'Description 3'
    },
    {
      imagen: 'ilustraciones/Recurso 2.png',

      description: 'Description 4'
    }
  ]

  return (
    <main className='flex min-h-screen flex-col items-center justify-between   text-black relative'>
      <nav className='flex justify-end w-full relative  bg-transparent  md:absolute top-12 right-12 z-50'>
        <ul className='flex justify-between space-x-4 text-center '>
          <li className=' font-bold'>
            <a href='#content1'>Content1</a>
          </li>
          <li className=' font-bold'>
            <a href='#content2'>Content2</a>
          </li>
          <li className=' font-bold text-blue-500'>
            <Link href='/dashboard'>Login</Link>
          </li>
        </ul>
      </nav>
      <div className='w-full  min-h-screen relative mt-20 md:mt-5 '>
        <div className='w-full flex flex-1 h-screen flex-col sm:flex-row'>
          <div className='flex flex-col justify-center  w-full  space-y-16 p-12 '>
            <div>
              <div className='text-5xl font-bold pb-4'>Lorem, ipsum dolor.</div>
              <div className='font-semibold text-sm text-slate-400'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                voluptatum inventore excepturi voluptatibus maxime earum beatae
                a ad maiores aut!
              </div>
            </div>

            <Link
              href='/dashboard'
              className='px-6 py-2 bg-blue-400 font-bold text-base text-white w-fit '
            >
              LOGIN
            </Link>
          </div>

          <Image
            src='/ilustraciones/Recurso 3.png'
            alt='hero'
            width={500}
            height={300}
            className='w-full md:w-4/5     object-contain'
          />
        </div>

        {/* content 1 */}

        <div
          id='content1'
          className='space-y-10 min-h-screen justify-center flex flex-col px-12'
        >
          <div className='w-1/3 space-y-5 '>
            <div className='text-5xl font-bold'>Content 1</div>
            <div className='text-gray-400 text-md'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Molestiae unde optio nemo quisquam nesciunt eaque tempora quam
              dolor cum ex !
            </div>
          </div>
          <div className='flex flex-wrap  w-full justify-between gap-1 md:gap-5'>
            {items.map((item, index) => {
              return (
                <div
                  key={index}
                  className='flex flex-col min-w-40 max-w-60 space-y-4 '
                >
                  <Image
                    src={`/${item.imagen}`}
                    alt={item.imagen}
                    width={200}
                    height={200}
                    className=' object-left h-full'
                  />
                  <div className='text-md text-gray-400 '>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Pariatur corrupti o nemo quisquam nesciunt.
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        {/* content 2 */}
        <div
          id='content2'
          className='w-full h-full  flex flex-col gap-5   justify-center relative items-center'
        >
          <Image
            src='/ilustraciones/Recurso 6.png'
            alt='hero'
            width={500}
            height={300}
            className='w-full  absolute -top-5    -z-10 '
          />
          <div className='mt-10 py-20'>
            <div className='w-full justify-end flex  z-50 '>
              <div className='flex flex-col w-2/3  sm:w-1/3'>
                <div className='text-4xl font-bold'>Content 2</div>
                <div className='text-gray-400 text-md'>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Molestiae unde optio nemo quisquam nesciunt eaque tempora quam
                  dolor cum ex !
                </div>
              </div>
            </div>
            <div className='flex h-2/3 w-full gap-14 flex-col sm:flex-row p-12 justify-center'>
              <Image
                src='/ilustraciones/Recurso 4.png'
                alt=''
                width={100}
                height={100}
                className='w-1/5 md:w-1/3 '
              />
              <Image
                src='/ilustraciones/Recurso 5.png'
                alt=''
                width={100}
                height={100}
                className='w-1/5  md:w-1/3'
              />
              <Image
                src='/ilustraciones/Recurso 4.png'
                alt=''
                width={100}
                height={100}
                className='w-1/5  md:w-1/3'
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
