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
      <div className='absolute w-[20%] left-0 mt-20'>
        <PanelMenu/>
      </div>
      <InfoUser/>
    </div>
  )
}

export default PainelAdmin
