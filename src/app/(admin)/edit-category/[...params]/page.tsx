import FormEditCategory from '@/components/Form/FormEditCategory'
import prisma from '@/lib/db'
import React from 'react'

const EditCategory = async ({params} : { params : {params: string}}) => {


    const id = params.params[0]

    const category = await prisma.category.findUnique({
      where: {
        id: id
      }
    })

  return (
    <div>
        <h1 className='my-6 text-center text-3xl font-bold'>Editar Categoria</h1>
        <FormEditCategory category={category} />
    </div>
  )
}

export default EditCategory
