import { ProductProps } from '@/intefaces/AllInterfaces'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

const CardProduct = ({product} : { product: ProductProps }) => {

    function formatNumber(value: number) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    }

  return (
    <div className='w-[300px] h-[480px] relative rounded-xl border border-gray-300 shadow-2xl'>
        <div>
            <Image className='rounded-t-xl mt-3' src={product.image} alt={product.name} width={300} height={300} />
        </div>
        <div className='flex mt-3 px-3 flex-col gap-2'>
            <h1 className='text-lg font-bold'>{product.name}</h1>
            <h2 className='text-xl'>{formatNumber(product.price)}</h2>
        </div>
        <Link href={`/produto/${product.id}`} className='w-full flex justify-center absolute bottom-0 bg-green-300 py-2 rounded-b-xl border-b border-gray-300 text-white font-bold'>
            Ver produto
        </Link>
    </div>
  )
}

export default CardProduct
