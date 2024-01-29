'use client'
import React, { useState } from 'react'
import { InputWithLabel } from '../Input/InputWithLabel'
import { Button } from '@/components/ui/button'

import { UserProps } from '@/intefaces/AllInterfaces'
import Notification from '../Notifier/Notification'
import { signIn } from 'next-auth/react'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

const FormLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const router = useRouter()

    async function HandleSubmit(e : any){
        e.preventDefault()
        let data : UserProps = {
            email,
            password
        }
        if (!email || !password) return Notification('error', 'Preencha todos os campos!')
        const response = await signIn('credentials', {
        ...data, 
        redirect: false})

        if (response?.error){
            Notification('error', 'Email ou senha incorretos!')
        } else{
            Notification('success', 'Login realizado com sucesso!')
            router.push('/')
        }
    }

  return (
    <form onSubmit={HandleSubmit} className='w-full flex flex-col gap-1.5'>
      <InputWithLabel onChange={setEmail} type='email' label='Email' placeholder='Escreva seu email...' />
      <InputWithLabel onChange={setPassword} type='password' label='Senha' placeholder='Escreva sua senha...' />
      <Button onClick={HandleSubmit} className='w-full mt-3 bg-blue-500 hover:bg-green-400'>Enviar</Button>
      <div className='flex justify-end'>
        <span>Não tem conta? <span className='underline text-blue-500'><Link href={'/cadastro'}>Cadastrar-se</Link></span></span>
      </div>
    </form>
  )
}

export default FormLogin
