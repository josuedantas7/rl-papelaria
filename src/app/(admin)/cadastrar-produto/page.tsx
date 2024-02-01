import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import FormRegisterProduct from '@/components/Form/FormRegisterProduct'

const RegisterProduct = async () => {

  const session = await getServerSession(authOptions)

  if (!session || !session.user){
    redirect('/')
  }

  return (
    <div>
        <h1 className='my-6 text-center text-3xl font-bold'>Cadastrar Produto</h1>
        <FormRegisterProduct/>
    </div>
  )
}

export default RegisterProduct
