'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { ChangeEvent, useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../../services/firebaseConnection'

import { v4 as uuidV4 } from 'uuid'

import { api } from '@/lib/api'
import { Button } from '../ui/button'

const InfoDefaultUser = () => {

    const { data: session, status } = useSession()
    const [buttonEdit, setButtonEdit] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [image,setImage] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)


    async function onSubmit(){
        const data = {
            name,
            email,
            image,
        }


        try {
            const response = await api.post('/edituser', {data})
            console.log(response)
        } catch{
            console.log('Erro ao editar usuário')
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
    
        const uploadRef = ref(storage, `users/${uidImage}`)
    
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
    <div className='mt-4 w-full'>
        {status === 'loading' ? (
            <h1 className='text-center font-bold text-2xl'>Carregando informações...</h1>
        ): (
            <div className='max-[420px]:px-2 min-[990px]:w-[50%] min-[990px]:mx-auto'>
                <h1 className='text-3xl hidden min-[420px]:flex justify-center font-bold text-center mb-12'>Meu perfil</h1>
                <div className={`w-[80%] max-[420px]:w-full mx-auto bg-gray-300 relative rounded-xl pt-12 h-[250px] py-5 shadow-2xl border border-zinc-200 ${buttonEdit && 'h-[350px]'}`}>
                    <Image className='mx-auto rounded-full absolute p-1 border-2 border-black -top-10 left-0 right-0 w-[80px] h-[80px]' width={80} height={80} alt='Foto de perfil' src={session?.user?.image || ''} />
                    {buttonEdit ? (
                        <div className='px-20 max-[620px]:px-8'>
                            <Label className='text-md'>Nome</Label>
                            <Input placeholder={session?.user.name} className='max-[1180px]:w-full' type='text' onChange={(e) => setName(e.target.value)} />
                        </div>
                    ) : (
                        <h1 className='text-center w-full border-b border-black pb-2 text-lg font-bold'>Nome: <span className='text-md font-normal'>{session?.user.name}</span></h1>
                    )}
                    <div className={`py-5 max-[1180px]:py-2 px-20 max-[620px]:px-8 flex justify-center`}>
                        {buttonEdit ? (
                            <div className='w-full'>
                                <Label className='text-md'>Email</Label>
                                <Input placeholder={session?.user.email} className='w-full' type='email' onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        ) : (
                            <h1 className='text-lg flex justify-center font-bold'>Email: <span className='text-md font-normal'>{session?.user.email}</span></h1>
                        )}
                    </div>
                    {buttonEdit && (
                        <div className='px-20 max-[620px]:px-8'>
                            <Label className='text-md'>Imagem de perfil</Label>
                            <Input className='w-full' type='file' onChange={handleFile} />
                        </div>
                    )}
                    <Button disabled={buttonDisabled} onClick={() => setButtonEdit(!buttonEdit)} className={`absolute disabled:cursor-not-allowed font-bold bottom-3 left-0 right-0 duration-200 transition-colors px-3 py-1 ${buttonEdit ? 'bg-red-500 hover:bg-red-200 border-none text-white' : 'bg-green-300 hover:bg-green-500 border-emerald-300 text-gray-900'} w-[150px] rounded-md border mx-auto `}>{buttonEdit ? 'Cancelar' : 'Editar perfil'}</Button>
                </div>
            </div>
        )}
    </div>
  )
}

export default InfoDefaultUser
