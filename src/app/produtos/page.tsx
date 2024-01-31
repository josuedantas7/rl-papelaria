import React from 'react'

import prisma from '@/lib/db'


const Products = async () => {

  const products = await prisma.product.findMany()

  console.log(products)

  return (
    <div>
      Página produtos
    </div>
  )
}

export default Products
