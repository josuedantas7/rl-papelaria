'use client'
import React, { ChangeEvent, useEffect } from 'react'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { LuUpload } from 'react-icons/lu'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../../services/firebaseConnection'
import { Button } from '../ui/button'

import { useSession } from 'next-auth/react'

import { v4 as uuidV4 } from 'uuid'

import { useRouter } from 'next/navigation'
import Notification from '../Notifier/Notification'

import { api } from '@/lib/api'

interface CategoryProps{
    id?: string | null;
    name?: string;
    image?: string;
}


const FormEditCategory = ({category} : { category: CategoryProps | null }) => {

    const [name, setName] = React.useState<string>('')
    const [image,setImage] = React.useState<string>('')
    const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false)

    const { data: session, status } = useSession()
    const router = useRouter()

    const onSubmit =  async () => {
        try{
            const newData : CategoryProps = {
                id: category?.id,
                name: name || category?.name,
                image: image || category?.image,
            }
    
            const response = await api.post('/api/editcategory', { ...newData })
            Notification('success', 'Categoria cadastrada com sucesso')
            console.log(response.data)
            router.replace('/cadastrar-categoria')
            router.refresh()
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

  return (
    <div className='w-[40%] flex mx-auto max-[900px]:w-[80%] max-[470px]:w-[90%]'>
        <form className='flex flex-col w-full gap-3' onSubmit={() => onSubmit()}>
            <div>
                <Label htmlFor='name'>Nome da categoria</Label>
                <Input onChange={(e) => setName(e.target.value) } type='text' id='name' placeholder={category?.name || ''} />
            </div>

            <div className='cursor-pointer relative'>
                <label className='absolute cursor-pointer flex items-center gap-2 mt-2'>
                    <LuUpload className='text-2xl cursor-pointer'/>
                    <span className='cursor-pointer'>Imagem da categoria</span>
                </label>
                <input className='opacity-0 cursor-pointer' onChange={handleFile} type="file" accept="image/*"/>
            </div>

            <Button onClick={() => onSubmit()} className='w-full disabled:cursor-not-allowed mt-3 bg-blue-500 hover:bg-green-400' disabled={buttonDisabled}>Editar categoria</Button>
        </form>
    </div>
  )
}

export default FormEditCategory
