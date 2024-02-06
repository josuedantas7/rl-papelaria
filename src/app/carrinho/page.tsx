
'use client'
import Image from 'next/image';
import { CartContext } from '@/context/CartContext'
import { useContext } from 'react';

const Carrinho = () => {

    const { cart, addQtdCart, removeQtdCart } = useContext(CartContext)
    function formatNumber(value: number) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    }

  return (
    <div className='pt-4'>
        {cart.length > 0 ? (
            <div>
                {cart && cart.map((product) => (
                    (product.qtd ?? 0) > 0 && (
                        <div className='flex border-b-[1px] items-center justify-between text-gray-600 text-sm' key={product.id}>
                            <div className='w-1/4'>
                                <Image width={100} height={100} className='w-[100px] h-[100px]' src={product.image} alt={product.name} />
                            </div>
                            <p className='w-1/4 text-center font-bold'>Preço: {formatNumber(product.price)}</p>
                            <p className='w-1/4 flex justify-center gap-1'>
                                <span className='bg-gray-700 cursor-pointer text-white px-1.5 rounded-sm' onClick={() => removeQtdCart && removeQtdCart(product)}>
                                    -
                                </span> 
                                {product.qtd}
                                <span className='bg-gray-700 cursor-pointer text-white px-1.5 rounded-sm' onClick={() => addQtdCart && addQtdCart(product)}>
                                    +
                                </span>
                            </p>
                            <p className='w-1/4 text-center font-bold'>SubTotal: {formatNumber((product.qtd ?? 0) * product.price)}</p>
                        </div>
                    )
                ))}
                    <p className='font-bold text-sm text-gray-600 mt-2'>Total: {formatNumber((cart ?? []).reduce((acc, product) => acc + product.price * (product.qtd ?? 0), 0))}</p>
            </div>
                ) : (
                <p className='text-center text-2xl font-bold mt-12 text-gray-600'>Carrinho vazio</p>
        )}
    </div>
  )
}

export default Carrinho
