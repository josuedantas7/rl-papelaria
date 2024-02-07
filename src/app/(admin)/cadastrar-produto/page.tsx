import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import FormRegisterProduct from '@/components/Form/FormRegisterProduct'
import prisma from '@/lib/db'
import Link from 'next/link'
import { ModalDeleteProduct } from '@/components/Modal/ModalDeleteProduct'

const RegisterProduct = async () => {

  const session = await getServerSession(authOptions)

  if (!session || !session.user){
    redirect('/')
  }

  const products = await prisma.product.findMany({
    include: {
      category: true
    }
  })

  return (
    <div>
        <h1 className='my-6 text-center text-3xl font-bold'>Cadastrar Produto</h1>
        <FormRegisterProduct/>
        <div className='mx-20 max-[700px]:mx-4 rounded-lg p-3 mt-6 bg-zinc-200'>
          <div className='w-full flex border-2 font-bold'>
            <p className='text-start w-2/6 max-[550px]:w-2/4'>Nome</p>
            <p className='text-center w-1/6 max-[550px]:hidden'>Preço</p>
            <p className='text-center w-1/6 max-[550px]:hidden'>Categoria</p>
            <p className='text-center w-1/6 max-[550px]:w-1/4'>Editar</p>
            <p className='text-end w-1/6 max-[550px]:w-1/4'>Excluir</p>
          </div>
          <div className='flex flex-col gap-3'>
            {products.map((product) => (
              <div key={product.id} className='w-full py-2 px-2 rounded-lg flex border-2 border-gray-500 items-center'>
                <p className='text-start w-2/6 max-[550px]:w-2/4'>{product.name}</p>
                <p className='text-center w-1/6 max-[550px]:hidden'>{product.price}</p>
                <p className='text-center w-1/6 max-[550px]:hidden'>{product.category.name}</p>
                <div className='text-center w-1/6 max-[550px]:w-1/4'>
                  <Link href={`/edit-product/${product.id}`} className='bg-green-300 px-3 py-1.5 rounded-md text-white font-bold'>Editar</Link>
                </div>
                <div className='text-end w-1/6 max-[550px]:w-1/4'>
                    <ModalDeleteProduct id={product.id}/>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default RegisterProduct
