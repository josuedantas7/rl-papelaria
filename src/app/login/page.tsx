import React from 'react'
import logo from '@/assets/logo-papelaria.jpg'
import Image from 'next/image'
import FormLogin from '../../components/Form/FormLogin'

const Login = () => {

  return (
    <div className='flex h-[92.5vh] w-full flex-row-reverse'>
      <Image className='w-[55%] max-[1310px]:w-[50%] max-[1100px]:hidden flex shadow-2xl max-[1310px]:rounded-none rounded-l-full' alt='Logo loja' src={logo} />
      <div className='w-[45%] max-[1310px]:w-[50%] max-[1100px]:w-full flex flex-col items-center mt-32 max-[600px]:mt-20'>
        <div className='border-2 rounded-xl p-20 bg-zinc-100 shadow-lg w-[80%] max-[530px]:w-[95%] max-[530px]:px-8 max-[600px]:pt-8 flex flex-col items-center'>
            <h1 className='text-3xl font-bold mb-4'>Faça seu login</h1>
            <FormLogin/>
        </div>
      </div>
    </div>
  )
}

export default Login
