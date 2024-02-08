import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import FormRegisterCategory from '@/components/Form/FormRegisterCategory'
import prisma from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'
import { ModalDeleteCategory } from '@/components/Modal/ModalDeleteCategory'

const RegisterCategory = async () => {

  const session = await getServerSession(authOptions)

  if (!session || !session.user){
    redirect('/')
  }

  const categories = await prisma.category.findMany()

  return (
    <div>
        <h1 className='my-6 text-center text-3xl font-bold'>Cadastrar Categoria</h1>
        <FormRegisterCategory/>
        <div className='mx-20 max-[700px]:mx-4 rounded-lg p-3 mt-6 bg-zinc-200'>
          <div className='w-full flex border-2 font-bold'>
            <p className='text-start w-2/5 max-[470px]:w-1/4'>Nome</p>
            <p className='text-center w-1/5 max-[470px]:w-1/4'>Imagem</p>
            <p className='text-center w-1/5 max-[470px]:w-1/4'>Editar</p>
            <p className='text-end w-1/5 max-[470px]:w-1/4'>Excluir</p>
          </div>
          <div className='flex flex-col gap-3'>
            {categories.map((category) => (
              <div key={category.id} className='w-full py-2 px-2 rounded-lg flex border-2 border-gray-500 items-center'>
                <p className='text-start w-2/5 max-[470px]:w-1/4'>{category.name}</p>
                <Image className='mx-auto max-[470px]:w-1/4' src={category.image} height={80} width={80} alt='Imagem da categoria' />
                <div className='text-center w-1/5 max-[470px]:w-1/4'>
                  <Link href={`/edit-category/${category.id}`} className='bg-green-300 px-3 py-1.5 rounded-md text-white font-bold'>Editar</Link>
                </div>
                <div className='text-end w-1/5 max-[470px]:w-1/4'>
                    <ModalDeleteCategory id={category.id}/>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>
  )
}

export default RegisterCategory
