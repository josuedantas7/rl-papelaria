import React from 'react'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const Home = async () => {

  const session = await getServerSession(authOptions)

  console.log(session)

  return (
    <div className='2xl font-bold'>
      Home page
    </div>
  )
}

export default Home
