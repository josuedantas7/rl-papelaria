'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
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

const InfoUser = () => {

    const { data: session, status } = useSession()
    const [buttonEdit, setButtonEdit] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [image,setImage] = useState('')
    const [role,setRole] = useState('')
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(false)

    useEffect(() => {
        console.log(session)
    },[])








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
    <div className='ml-auto mt-12 w-[80%]'>
        {status === 'loading' ? (
            <h1 className='text-center font-bold text-2xl'>Carregando informações...</h1>
        ): (
            <>
                <h1 className='text-3xl font-bold text-center mb-10'>Painel Admin</h1>
                <div className='w-[80%] mx-auto bg-gray-300 relative rounded-xl pt-12 h-[400px] py-5 shadow-2xl border border-zinc-200'>
                    <Image className='mx-auto rounded-full absolute p-1 border-2 border-black -top-10 left-0 right-0 w-[80px] h-[80px]' width={80} height={80} alt='Foto de perfil' src={session?.user?.image || ''} />
                    {buttonEdit ? (
                        <div className='px-20'>
                            <Label className='text-md'>Nome</Label>
                            <Input className='w-[300px] max-[1180px]:w-full' type='text' onChange={(e) => setName(e.target.value)} />
                        </div>
                    ) : (
                        <h1 className='text-center w-full border-b border-black pb-2 text-lg font-bold'>Nome: <span className='text-md font-normal'>{session?.user.name}</span></h1>
                    )}
                    <div className={`py-5 max-[1180px]:py-2 px-20 flex justify-between max-[1180px]:flex-col ${buttonEdit && 'justify-center gap-9 max-[1180px]:gap-2'}`}>
                        {buttonEdit ? (
                            <div>
                                <Label className='text-md'>Email</Label>
                                <Input className='w-[300px] max-[1180px]:w-full' type='email' onChange={(e) => setEmail(e.target.value)} />
                            </div>
                        ) : (
                            <h1 className='text-lg font-bold'>Email: <span className='text-md font-normal'>{session?.user.email}</span></h1>
                        )}
                        {buttonEdit ? (
                            <div>
                                <Label className='text-md'>Permissão</Label>
                                <Select onValueChange={setRole}>
                                    <SelectTrigger className='w-[250px] max-[1180px]:w-full'>
                                        <SelectValue placeholder="Permissão" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="user">Usuário</SelectItem>
                                        <SelectItem value="admin">Administrador</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        ) : (
                            <h1 className='text-lg font-bold'>Papel: <span className='text-md font-normal'>{session?.user.role === 'admin' && 'Administrador'}</span></h1>
                        )}
                    </div>
                    {buttonEdit && (
                        <div className='px-20'>
                            <Label className='text-md'>Imagem de perfil</Label>
                            <Input className='w-full' type='file' onChange={handleFile} />
                        </div>
                    )}
                    <button disabled={buttonDisabled} onClick={() => setButtonEdit(true)} className='absolute disabled:cursor-not-allowed text-gray-900 font-bold bottom-3 left-0 right-0 px-3 py-1 bg-green-300 w-[150px] rounded-md border border-emerald-300 mx-auto'>Editar perfil</button>
                </div>
            </>
        )}
    </div>
  )
}

export default InfoUser