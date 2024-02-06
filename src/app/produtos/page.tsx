import React from 'react'

import prisma from '@/lib/db'
import CardCategory from '@/components/Cards/CardCategory'


const Products = async () => {

  const  categories = await prisma.category.findMany()

  console.log(categories)

  return (
    <div>
      <h1 className='text-center text-2xl font-bold my-8'>Escolha uma categoria</h1>
      <div className='flex flex-wrap gap-20 px-20'>
        {categories.map((category) => (
          <CardCategory key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}

export default Products
