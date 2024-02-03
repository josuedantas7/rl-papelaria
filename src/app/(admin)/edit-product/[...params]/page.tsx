import FormEditProduct from '@/components/Form/FormEditProduct'
import { api } from '@/lib/api'
import prisma from '@/lib/db'
import React, { useEffect } from 'react'

const EditProduct = async ({params} : { params: { params: string } }) => {

    const id = params.params[0]

    const product = await prisma.product.findUnique({
        where: {
            id: id
        }
    })

    console.log(product)

  return (
    <div>
    <h1 className='my-6 text-center text-3xl font-bold'>Editar Produto</h1>
        <FormEditProduct product={product} />
    </div>
  )
}

export default EditProduct
