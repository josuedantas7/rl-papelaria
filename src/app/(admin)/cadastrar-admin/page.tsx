import React from 'react'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import prisma from '@/lib/db'

import { redirect } from 'next/navigation'
import FormCadastroAdmin from '@/components/Form/FormRegisterAdmin'

const CadastrarAdmin = async () => {

    const session = await getServerSession(authOptions)

    const user = await prisma.user.findFirst({
        where: {
            email: session?.user?.email
        }
    })

    if (user?.role !== 'admin'){
        redirect('/')
    }

  return (
    <div>
        <h1 className='my-6 text-center text-3xl font-bold'>Cadastrar Admin</h1>
        <div className='w-[50%] mx-auto'>
            <FormCadastroAdmin/>
        </div>
    </div>
  )
}

export default CadastrarAdmin
