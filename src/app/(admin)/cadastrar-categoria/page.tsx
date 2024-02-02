import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import FormRegisterCategory from '@/components/Form/FormRegisterCategory'

const RegisterCategory = async () => {

  const session = await getServerSession(authOptions)

  if (!session || !session.user){
    redirect('/')
  }

  return (
    <div>
        <h1 className='my-6 text-center text-3xl font-bold'>Cadastrar Categoria</h1>
        <FormRegisterCategory/>
    </div>
  )
}

export default RegisterCategory
