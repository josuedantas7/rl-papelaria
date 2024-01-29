'use client'
import React, { ChangeEvent, useState } from 'react'
import { InputWithLabel } from '../Input/InputWithLabel'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { UserProps } from '@/intefaces/AllInterfaces'
import Notification from '../Notifier/Notification'
import { useRouter } from 'next/navigation'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '../../../services/firebaseConnection'

import { v4 as uuidV4 } from 'uuid'
import Link from 'next/link'

const FormCadastro = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [image,setImage] = useState<string>('')
    const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

    const router = useRouter()


    async function HandleSubmit(e : any){
      e.preventDefault()
      let data : UserProps = {
        email,
        password,
        name,
        image
      }

      if (!email || !password || !name) return Notification('error', 'Preencha todos os campos!')

      try{
        await api.post('/api/users', {...data})
        Notification('success', 'Conta registrada com sucesso')
        router.push('/login')
      } catch{
        Notification('error', 'Erro ao cadastrar!')
      }

    }


    async function handleFile(e : ChangeEvent<HTMLInputElement>){
      setButtonDisabled(true)
      if (e.target.files && e.target.files[0]) {
        const image = e.target.files[0]
        console.log(image)
  
        await handleUpload(image)
      }
    }
  
    async function handleUpload(image: File) {

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
    <form onSubmit={HandleSubmit} className='w-full flex flex-col gap-1.5'>
      <InputWithLabel onChange={setName} type='text' label='Nome' placeholder='Escreva seu nome...' />
      <InputWithLabel onChange={setEmail} type='email' label='Email' placeholder='Escreva seu email...' />
      <InputWithLabel onChange={setPassword} type='password' label='Senha' placeholder='Escreva sua senha...' />
      <div>
        <input onChange={handleFile} type="file" accept="image/*"/>
      </div>
      <Button disabled={buttonDisabled} onClick={(e) => HandleSubmit(e)} className='w-full disabled:cursor-not-allowed mt-3 bg-blue-500 hover:bg-green-400'>Enviar</Button>
      <div className='flex justify-end'>
        <span>Já tem conta? <span className='underline text-blue-500'><Link href={'/login'}>Login</Link></span></span>
      </div>
    </form>
  )
}

export default FormCadastro
