import React from 'react'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import BannerHome from '@/components/BannerHome/page'
import prisma from '@/lib/db'

const Home = async () => {

  const session = await getServerSession(authOptions)

  const user = await prisma.user.findMany({
    where: {
      email: session?.user?.email
    }
  })

  console.log(user)

  return (
    <div className='2xl font-bold'>
      <BannerHome/>
      Home page
    </div>
  )
}

export default Home
