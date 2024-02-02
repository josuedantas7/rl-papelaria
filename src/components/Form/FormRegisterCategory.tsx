'use client'
import React, { ChangeEvent, useEffect } from 'react'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '../ui/button'

import { useSession } from 'next-auth/react'

import { useRouter } from 'next/navigation'
import Notification from '../Notifier/Notification'

import { api } from '@/lib/api'

interface CategoryProps{
    name: string;
}

type CreateCategory = z.infer<typeof createCategorySchema>

const createCategorySchema = z.object({
    name: z.string().min(1, 'Nome do produto é obrigatório'),
})

const FormRegisterCategory = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<CreateCategory>({	resolver: zodResolver(createCategorySchema) })

    const { data: session, status } = useSession()
    const router = useRouter()

    const onSubmit =  async (data: CategoryProps) => {
        try{
            console.log(data)
    
            const response = await api.post('/api/category', data)
            Notification('success', 'Categoria cadastrada com sucesso')
            console.log(response.data)
            router.refresh()
            router.replace('/cadastrar-categoria')
        } catch{
            Notification('error', 'Erro ao cadastrar categoria')
        }

    }


    useEffect(() => {
        if (status !== 'loading' && session?.user.role !== 'admin') {
            router.push('/')
            Notification('error', 'Você não tem permissão para acessar essa página')
        }
    },[session,status,router])

  return (
    <div className='w-[40%] flex mx-auto max-[900px]:w-[80%] max-[470px]:w-[90%]'>
        <form className='flex flex-col w-full gap-3' onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Label htmlFor='name'>Nome da categoria</Label>
                <Input type='text' id='name' placeholder='Nome da categoria...' {...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <Button className='w-full mt-3 bg-blue-500 hover:bg-green-400'>Cadastrar Categoria</Button>
        </form>
    </div>
  )
}

export default FormRegisterCategory
