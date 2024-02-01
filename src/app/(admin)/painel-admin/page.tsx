import React from 'react'
import PanelMenu from '@/components/PanelMenu/PanelMenu'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import Image from 'next/image'
import InfoUser from '@/components/InfoUser/InfoUser'

const PainelAdmin = async () => {
  const session = await getServerSession(authOptions)





  return (
    <div className='relative'>
      <h1 className='text-2xl flex justify-center my-3 min-[420px]:hidden font-bold text-center'>Painel Admin</h1>
      <div className='min-[420px]:absolute w-[20%] left-0 mt-20 max-[820px]:w-[35%] max-[420px]:w-full px-2 max-[420px]:mt-0'>
        <PanelMenu/>
      </div>
      <InfoUser/>
    </div>
  )
}

export default PainelAdmin
