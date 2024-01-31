'use client'
import React, { ChangeEvent, useEffect } from 'react'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { LuUpload } from 'react-icons/lu'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../../services/firebaseConnection'
import { Button } from '../ui/button'

import { useSession } from 'next-auth/react'

import { v4 as uuidV4 } from 'uuid'

import { useRouter } from 'next/navigation'
import Notification from '../Notifier/Notification'

import axios from 'axios'
import { api } from '@/lib/api'

interface ProductProps{
    name: string;
    price: string;
    description: string;
    category: string;
    color?: string;
    status?: boolean;
    image?: string;
}

type CreateProduct = z.infer<typeof createProductSchema>

const createProductSchema = z.object({
    name: z.string().min(1, 'Nome do produto é obrigatório'),
    price: z.string().min(1, 'Preço do produto é obrigatório'),
    description: z.string().min(1, 'Descrição do produto é obrigatório'),
    category: z.string().min(1, 'Categoria do produto é obrigatório'),
    color: z.string(),
    status: z.boolean().default(true),
})

const FormRegisterProduct = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<CreateProduct>({	resolver: zodResolver(createProductSchema) })

    const [image,setImage] = React.useState<string>('')
    const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false)

    const { data: session, status } = useSession()
    const router = useRouter()

    const onSubmit =  async (data: ProductProps) => {
        try{
            const newData : ProductProps = {
                name: data.name,
                price: data.price,
                description: data.description,
                category: data.category,
                color: data.color,
                status: data.status,
                image,
            }
    
            const response = await api.post('/api/product', { ...newData })
            Notification('success', 'Produto cadastrado com sucesso')
            console.log(response.data)
            router.refresh()
            router.replace('/cadastrar-produto')
        } catch{
            Notification('error', 'Erro ao cadastrar produto')
        }

    }


    useEffect(() => {
        if (status !== 'loading' && session?.user.role !== 'admin') {
            router.push('/')
            Notification('error', 'Você não tem permissão para acessar essa página')
        }
    },[session,status,router])


    async function handleFile(e : ChangeEvent<HTMLInputElement>){
        if (e.target.files && e.target.files[0]) {
          const image = e.target.files[0]
    
          await handleUpload(image)
        }
      }
    
      async function handleUpload(image: File) {
        setButtonDisabled(true)
  
        const uidImage = uuidV4()
    
        const uploadRef = ref(storage, `products/${uidImage}`)
    
        uploadBytes(uploadRef, image)
        .then((snapShop) => {
          getDownloadURL(snapShop.ref)
          .then(url => {
            setImage(url)
            setButtonDisabled(false)
          })
        })
      };




  return (
    <div className='w-[40%] flex mx-auto'>
        <form className='flex flex-col w-full gap-3' onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Label htmlFor='name'>Nome do produto</Label>
                <Input type='text' id='name' placeholder='Nome do produto' {...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
                <Label htmlFor='price'>Preço do produto</Label>
                <Input type='text' id='price' placeholder='Preço do produto' {...register('price')} />
                {errors.price && <p>{errors.price.message}</p>}
            </div>

            <div>
                <Label htmlFor='description'>Descrição do produto</Label>
                <Input type='text' id='description' placeholder='Descrição do produto' {...register('description')} />
                {errors.description && <p>{errors.description.message}</p>}
            </div>

            <Label htmlFor='category'>Categoria do produto</Label>
            <Input type='text' id='category' placeholder='Categoria do produto' {...register('category')} />
            {errors.category && <p>{errors.category.message}</p>}

            <div>
                <Label htmlFor='color'>Cor do produto</Label>
                <Input type='text' id='color' placeholder='Cor do produto' {...register('color')} />
            </div>

            <div className='cursor-pointer relative'>
                <label className='absolute cursor-pointer flex items-center gap-2 mt-2'>
                    <LuUpload className='text-2xl cursor-pointer'/>
                    <span className='cursor-pointer'>Imagem do produto</span>
                </label>
                <input className='opacity-0 cursor-pointer' onChange={handleFile} type="file" accept="image/*"/>
            </div>

            <Button className='w-full disabled:cursor-not-allowed mt-3 bg-blue-500 hover:bg-green-400' disabled={buttonDisabled}>Cadastrar produto</Button>
        </form>
    </div>
  )
}

export default FormRegisterProduct
