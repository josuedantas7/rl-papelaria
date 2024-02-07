import prisma from '@/lib/db'
import React from 'react'

const ProductId = async ({params} : {params: {params: string}}) => {
    const id = params.params[0]


    const productId = await prisma.product.findUnique({
        where: {
            status: true,
            id: id
        }
    })

  return (
    <div>
        Produto id: {id}  
        <h1>{productId?.name}</h1>
    </div>
  )
}

export default ProductId
