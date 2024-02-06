import React from 'react'

import prisma from '@/lib/db'
import CardCategory from '@/components/Cards/CardCategory'


const Products = async () => {

  const products = await prisma.product.findMany({
    include: {
      category: true
    }
  })

  const  categories = await prisma.category.findMany()

  console.log(categories)
  // console.log(products)

  return (
    <div>
      <div className='flex flex-wrap gap-20'>
        {categories.map((category) => (
          <CardCategory key={category.id} category={category} />
        ))}
      </div>
    </div>
  )
}

export default Products
