'use client'
import axios from 'axios'
import React, { useEffect } from 'react'

import { useSession } from 'next-auth/react'
const Home = () => {

  const {data: session, status} = useSession()

  useEffect(() => {
    console.log(session?.user)
  },[session])

  return (
    <div className='2xl font-bold'>
      Home page
    </div>
  )
}

export default Home
