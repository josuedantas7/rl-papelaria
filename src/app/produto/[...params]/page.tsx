import AddToCart from '@/components/AddToCart/AddToCart'
import prisma from '@/lib/db'
import Image from 'next/image'
import React from 'react'

const ProductId = async ({params} : {params: {params: string}}) => {
    const id = params.params[0]


    const product = await prisma.product.findUnique({
        where: {
            status: true,
            id: id
        }
    })

    function formatNumber(price: string | undefined | number){
      const formattedPrice = price || 0;
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(formattedPrice))
  }

  return (
    <div className='flex px-32 max-[730px]:px-12 max-[450px]:px-2 max-[1150px]:pt-8 w-full h-[92vh] bg-zinc-100 pt-20'>
      <div className='w-full py-12 flex max-[1150px]:px-8 max-[1150px]:flex-col max-[1150px]:h-[700px] max-[1150px]:w-[800px] max-[1150px]:mx-auto h-[600px] rounded-3xl bg-white shadow-2xl'>
        <div className='w-1/3 max-[1150px]:w-[400px] mx-auto h-[300px] max-[570px]:w-[250px]'>
          <Image className='h-full w-full rounded-l-3xl' src={product?.image || ''} alt='Imagem do produto' height={400} width={400} />
        </div>
        <div className='w-1/3 flex flex-col gap-8 max-[1150px]:w-full mt-4 max-[1150px]:gap-4 max-[1150px]:mb-8'>
          <h1 className='text-2xl text-gray-700 font-semibold'>{product?.name}</h1>
          <p className='text-gray-500'>{product?.description}</p>
        </div>
        <div className='w-1/3 max-[1150px]:w-full max-[1150px]:justify-start flex justify-between flex-col relative'>
          <div className='w-72 max-[1150px]:mx-0 max-[1150px]:mb-8 mx-auto px-8 py-4 rounded-2xl shadow-2xl border border-zinc-200 max-[1150px]:shadow-none max-[1150px]:border-none max-[1150px]:px-0 max-[1150px]:py-0'>
            <p className='text-2xl text-gray-800 font-bold'>{formatNumber(product?.price)}</p>
          </div>
          <div className='w-72 cursor-pointer mx-auto text-center bg-red-500 py-3 rounded-2xl text-white font-bold max-[1150px]:w-full'>
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductId
