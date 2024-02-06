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
import SelectForm from '../Select/SelectForm'

import { api } from '@/lib/api'

interface ProductProps{
    id?: string;
    name?: string;
    price?: number;
    description?: string | null;
    color?: string | null;
    image?: string;
    category?: string;
    createdAt?: Date;
    updatedAt?: Date;
    status?: boolean;
    star?: boolean;
}

type CreateProduct = z.infer<typeof createProductSchema>

const createProductSchema = z.object({
    name: z.string(),
    price: z.string(),
    description: z.string(),
    color: z.string(),
    status: z.boolean().default(true),
    star: z.boolean().default(false),
})

const FormEditProduct = ({product} : { product: ProductProps | null }) => {

    const { register, handleSubmit, formState: { errors } } = useForm<CreateProduct>({	resolver: zodResolver(createProductSchema) })

    const [image,setImage] = React.useState<string>('')
    const [category, setCategory] = React.useState<string>('')
    const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false)

    const { data: session, status } = useSession()
    const router = useRouter()

    const onSubmit =  async (data: ProductProps) => {
        try{
            console.log(data.star)
            console.log(data.status)
            console.log(data.price)
            // const newData : ProductProps = {
            //     id: product?.id,
            //     name: data.name || product?.name,
            //     price: data.price || product?.price,
            //     description: data.description || product?.description,
            //     color: data.color || product?.color,
            //     status: data.status || product?.status,
            //     image: image || product?.image,
            //     category: category || product?.category,
            //     star: data.star || product?.star
            // }
    
            // const response = await api.post('/api/editproduct', { ...newData })
            // Notification('success', 'Produto cadastrado com sucesso')
            // console.log(response.data)
            // router.replace('/produtos')
            // router.refresh()
        } catch{
            Notification('error', 'Erro ao cadastrar produto')
        }

    }


    useEffect(() => {
        if (status !== 'loading' && session?.user.role !== 'admin') {
            router.push('/')
            Notification('error', 'Você não tem permissão para acessar essa página')
        }

        async function getCategories(){
            const response = await api.get('/api/category')
            console.log(response)
        }
        getCategories()
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


    function formatNumber(price: number | undefined){
        const formattedPrice = price || 0;
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(formattedPrice);
    }

  return (
    <div className='w-[40%] flex mx-auto max-[900px]:w-[80%] max-[470px]:w-[90%]'>
        <form className='flex flex-col w-full gap-3' onSubmit={handleSubmit(onSubmit)}>
            <div>
                <Label htmlFor='name'>Nome do produto</Label>
                <Input type='text' id='name' placeholder={product?.name || ''} {...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>

            <div>
                <Label htmlFor='price'>Preço do produto</Label>
                <Input type='number' id='price' placeholder={formatNumber(product?.price) || ''} {...register('price')} />
                {errors.price && <p>{errors.price.message}</p>}
            </div>

            <div>
                <Label htmlFor='description'>Descrição do produto</Label>
                <Input type='text' id='description' placeholder={product?.description || ''} {...register('description')} />
                {errors.description && <p>{errors.description.message}</p>}
            </div>
            
            <div>
                <Label htmlFor='category'>Categoria do produto</Label>
                <SelectForm setCategoria={setCategory}/>
            </div>

            <div>
                <Label htmlFor='color'>Cor do produto</Label>
                <Input type='text' id='color' placeholder={product?.color || ''} {...register('color')} />
            </div>

            <div>
                <Label htmlFor='star'>Produto em destaque</Label>
                <Input type='checkbox' id='star' defaultChecked={product?.star} {...register('star')} />
            </div>

            <div>
                <Label htmlFor='status'>Status do produto</Label>
                <Input type='checkbox' id='status' defaultChecked={product?.status} {...register('status')} />
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

export default FormEditProduct
