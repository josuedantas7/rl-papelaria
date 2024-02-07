import CardProduct from '@/components/Cards/CardProduct'
import prisma from '@/lib/db'
import React from 'react'

const CategoryId = async ({params} : { params : { params: string } }) => {

    const id = params.params[0]

    const products = await prisma.product.findMany({
      where: {
        status: true,
        categoryId: id
      },
    })

    const category = await prisma.category.findUnique({
      where: {
        id: id
      }
    })

    console.log(products)
  return (
    <div>
      <h1 className='text-center my-8 text-2xl font-bold'>Produtos da categoria: <span className='font-normal'>{category?.name}</span></h1>
      <div className='flex flex-wrap gap-8'>
        {products.length === 0 ? <h1 className='text-center w-full text-2xl font-bold'>Nenhum produto encontrado</h1> : (
          products.map((product) => (
            <CardProduct key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  )
}

export default CategoryId
