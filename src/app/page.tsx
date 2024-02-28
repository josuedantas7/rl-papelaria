import React from 'react'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import BannerHome from '@/components/BannerHome/page'
import prisma from '@/lib/db'
import PanelMenu from '@/components/PanelMenu/PanelMenu'
import CardCategory from '@/components/Cards/CardCategory'
import CardProduct from '@/components/Cards/CardProduct'

const Home = async () => {

  const session = await getServerSession(authOptions)

  if (session) {
    const userId = await prisma.user.findUnique({
      where: {
        id: session?.user.id
      }
    })
    console.log(userId)
  }

  const categories = await prisma.category.findMany()

  const products = await prisma.product.findMany({
    where: {
      status: true,
      star: true
    }
  })

  return (
    <div className='2xl font-bold mb-20'>
      <BannerHome/>
      <div className='flex flex-col items-center px-20 max-[600px]:px-12 max-[545px]:px-4'>
        <div>
          <h1 className='text-center text-2xl text-gray-700 font-bold'>Categorias</h1>
          <div className='mt-5 flex flex-wrap gap-5 max-[470px]:justify-center'>
            {categories.map((category) => (
                <CardCategory key={category.id} category={category} />
              ))}
          </div>
        </div>
        {
          products.length > 0 && (
            <div className='mt-4'>
              <h1 className='text-center text-2xl text-gray-700 font-bold mt-12'>Produtos em destaque</h1>
              <div className='flex flex-wrap mt-4 gap-5'>
                {products.map((product) => (
                    <CardProduct key={product.id} product={product} />
                ))}
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home
