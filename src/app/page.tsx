import Image from 'next/image'

export default function Home () {
  const items = [
    {
      imagen: 'multisucursal.png',
      description: 'Description 1'
    },
    {
      imagen: 'paises.png',
      description: 'Description 2'
    },
    {
      imagen: 'proveedores.png',
      description: 'Description 3'
    },
    {
      imagen: 'trato.png',
      description: 'Description 4'
    }
  ]

  return (
    <main className='flex min-h-screen flex-col items-center justify-between  text-black relative'>
      <nav className='flex justify-end w-full  bg-transparent  absolute top-12 right-12'>
        <ul className='flex justify-between space-x-4 text-center '>
          <li className=' font-bold'>
            <a href='#content1'>Content1</a>
          </li>
          <li className=' font-bold'>
            <a href='#content2'>Content2</a>
          </li>
          <li className=' font-bold text-blue-500'>
            <a href=''>Login</a>
          </li>
        </ul>
      </nav>
      <div className='w-full p-12 min-h-screen '>
        <div className='w-full flex flex-1 h-screen flex-col sm:flex-row'>
          <div className='flex flex-col justify-center  w-full  space-y-16'>
            <div>
              <div className='text-5xl font-bold pb-4'>Lorem, ipsum dolor.</div>
              <div className='font-semibold text-sm text-slate-400'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                voluptatum inventore excepturi voluptatibus maxime earum beatae
                a ad maiores aut!
              </div>
            </div>

            <button className='px-6 py-2 bg-blue-400 font-bold text-base text-white w-fit '>
              LOGIN
            </button>
          </div>

          <Image
            src='/building.svg'
            alt='hero'
            width={500}
            height={300}
            className='w-full md:w-3/5 h-auto object-contain'
          />
        </div>

        {/* content 1 */}

        <div
          id='content1'
          className='space-y-10 min-h-screen justify-center flex flex-col'
        >
          <div className='w-1/3 space-y-5'>
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
          className='w-full min-h-screen flex flex-col gap-10 my-6 justify-center '
        >
          <div className='w-full justify-end flex '>
            <div className='flex flex-col w-2/3  sm:w-1/3'>
              <div className='text-5xl font-bold'>Content 2</div>
              <div className='text-gray-400 text-md'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Molestiae unde optio nemo quisquam nesciunt eaque tempora quam
                dolor cum ex !
              </div>
            </div>
          </div>
          <div className='flex h-2/3 w-full gap-3 flex-col sm:flex-row'>
            <div className='border-2 border-blue-500 w-full sm:w-1/3 flex flex-col p-10 gap-10'>
              <div className='h-2 bg-gray-200'></div>
              <div className='space-y-4'>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
              </div>
              <div className='h-8 bg-gray-200'></div>
            </div>
            <div className='border-2 border-blue-500 w-full sm:w-1/3 flex flex-col p-10 gap-10'>
              <div className='h-2 bg-blue-500'></div>
              <div className='space-y-4'>
                <div className='h-2 bg-blue-500'></div>
                <div className='h-2 bg-blue-500'></div>
                <div className='h-2 bg-blue-500'></div>
                <div className='h-2 bg-blue-500'></div>
                <div className='h-2 bg-blue-500'></div>
                <div className='h-2 bg-blue-500'></div>
                <div className='h-2 bg-blue-500'></div>
                <div className='h-2 bg-blue-500'></div>
                <div className='h-2 bg-blue-500'></div>
                <div className='h-2 bg-blue-500'></div>
                <div className='h-2 bg-blue-500'></div>
                <div className='h-2 bg-blue-500'></div>
                <div className='h-2 bg-blue-500'></div>
                <div className='h-2 bg-blue-500'></div>
                <div className='h-2 bg-blue-500'></div>
                <div className='h-2 bg-blue-500'></div>
              </div>
              <div className='h-8 bg-blue-500'></div>
            </div>
            <div className='border-2 border-blue-500 w-full sm:w-1/3 flex flex-col p-10 gap-10'>
              <div className='h-2 bg-gray-200'></div>
              <div className='space-y-4'>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
                <div className='h-2 bg-gray-200'></div>
              </div>
              <div className='h-8 bg-gray-200'></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
