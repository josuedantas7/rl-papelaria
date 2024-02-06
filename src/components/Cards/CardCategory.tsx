import { CategoryProps } from '@/intefaces/AllInterfaces'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const CardCategory = ({category} : { category : CategoryProps }) => {
  return (
    <Link href={`/categoria/${category.id}`} className='w-[200px] h-[200px]'>
        <Image src={category.image} alt={category.name} width={200} height={200} />
        <h1 className='text-center text-gray-500'>{category.name}</h1>
    </Link>
  )
}

export default CardCategory
