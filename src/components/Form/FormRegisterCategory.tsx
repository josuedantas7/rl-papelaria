'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'

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
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../../services/firebaseConnection'

import { v4 as uuidV4 } from 'uuid'

interface CategoryProps{
    name: string;
    image?: string;
}

type CreateCategory = z.infer<typeof createCategorySchema>

const createCategorySchema = z.object({
    name: z.string().min(1, 'Nome do produto é obrigatório'),
})

const FormRegisterCategory = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<CreateCategory>({	resolver: zodResolver(createCategorySchema) })

    const { data: session, status } = useSession()
    const [image,setImage] = useState<string>('')
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)
    const router = useRouter()

    const onSubmit =  async (data: CategoryProps) => {
        try{
            const newData : CategoryProps = {
                name: data.name,
                image: image
            }
    
            const response = await api.post('/api/category', newData)
            Notification('success', 'Categoria cadastrada com sucesso')
            console.log(response.data)
            router.refresh()
            router.replace('/cadastrar-produto')
        } catch{
            Notification('error', 'Erro ao cadastrar categoria')
        }

    }

    async function handleFile(e : ChangeEvent<HTMLInputElement>){
        if (e.target.files && e.target.files[0]) {
          const image = e.target.files[0]
    
          await handleUpload(image)
        }
      }
    
      async function handleUpload(image: File) {
        setButtonDisabled(true)
  
        const uidImage = uuidV4()
    
        const uploadRef = ref(storage, `category/${uidImage}`)
    
        uploadBytes(uploadRef, image)
        .then((snapShop) => {
          getDownloadURL(snapShop.ref)
          .then(url => {
            setImage(url)
            setButtonDisabled(false)
          })
        })
      };


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
            <div>
                <Label htmlFor='image'>Imagem da categoria</Label>
                <Input type='file' id='image' onChange={handleFile} />
            </div>
            <Button disabled={buttonDisabled} className='w-full mt-3 disabled:cursor-not-allowed bg-blue-500 hover:bg-green-400'>Cadastrar Categoria</Button>
        </form>
    </div>
  )
}

export default FormRegisterCategory
