import React from 'react'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import BannerHome from '@/components/BannerHome/page'
import prisma from '@/lib/db'
import PanelMenu from '@/components/PanelMenu/PanelMenu'

const Home = async () => {

  const session = await getServerSession(authOptions)

  return (
    <div className='2xl font-bold'>
      <BannerHome/>
      <div className='mt-5'>
        <h1>Home page</h1>
      </div>
    </div>
  )
}

export default Home
