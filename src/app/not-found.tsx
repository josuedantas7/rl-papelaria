import BannerHome from '@/components/BannerHome/page'
import Link from 'next/link'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <BannerHome/>
      <h1 className='text-center text-2xl my-8 font-bold'>Página não encontrada</h1>
      <p className='text-center'>A página que você tentou acessar não existe.</p>
      <button className='bg-blue-500 text-white p-2 rounded-md mt-4'>
        <Link href={'/'}>
          Voltar para a home
        </Link>
      </button>
    </div>
  )
}

export default NotFound
