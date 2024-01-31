'use client'
import Image from 'next/image'
import React from 'react'
import logo from '@/assets/logo-papelaria2.jpg'

const BannerHome = () => {

    function redirectLink(){
        window.location.href = 'https://www.google.com/maps?ll=-5.353185,-49.076787&z=17&t=m&hl=pt-BR&gl=BR&mapclient=embed&cid=16834688787911655355'
    }

  return (
      <div className='relative'>
        <Image className='object-contain mx-auto h-[400px] mt-2.5 max-[450px]:h-[250px] max-[350px]:h-[200px]' priority={true} src={logo} alt='logo loja'/>
        <button onClick={() => redirectLink()} className='absolute bottom-12 max-[450px]:bottom-2 max-[350px]:-bottom-6 left-0 right-0 flex max-[460px]:flex-col gap-2 items-center justify-center'>
            <h1 className='text-xl max-[550px]:text-md max-[460px]:text-sm'>Endereço:</h1>
            <p className='font-normal max-[550px]:text-sm'>Rua E, 24 - Nova Marabá, Marabá - PA, 68504-040</p>
        </button>
        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3972.4210861557794!2d-49.078907025016285!3d-5.352529994626159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x92c3a1c3f3b5906f%3A0xe9a0d44233b9bfbb!2sRL%20PAPELARIA!5e0!3m2!1spt-BR!2sbr!4v1706633253974!5m2!1spt-BR!2sbr" width="600" height="450" loading="lazy"></iframe> */}
      </div>
  )
}

export default BannerHome
