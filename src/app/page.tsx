import React from 'react'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import BannerHome from '@/components/BannerHome/page'

const Home = async () => {

  const session = await getServerSession(authOptions)

  return (
    <div className='2xl font-bold'>
      <BannerHome/>
      Home page
    </div>
  )
}

export default Home
