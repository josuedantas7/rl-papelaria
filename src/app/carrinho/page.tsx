
'use client'
import Image from 'next/image';
import { CartContext } from '@/context/CartContext'
import { useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api';
import Notification from '@/components/Notifier/Notification';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const Carrinho = () => {

    const [loading, setLoading] = useState<boolean>(false)
    const { cart, addQtdCart, removeQtdCart, setCart } = useContext(CartContext)
    

    function formatNumber(value: number) {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(value);
    }

    async function handleSaveCart(){
        try{
            await api.post('/api/cart', {Products: cart})
            Notification('success', 'Carrinho salvo com sucesso')
        }catch(err){
            console.log(err)
            Notification('error', 'Erro ao salvar carrinho')
        }finally{
            setLoading(false)
        }
    }

    async function handleDeleteAllProductsOnCart(){
        try{
            await api.delete('/api/cart')
            setCart([])
            Notification('success', 'Carrinho limpo com sucesso')
        }catch(err){
            console.log(err)
            Notification('error', 'Erro ao limpar carrinho')
        }
    }

  return (
    <div className='pt-4'>
        {cart.length > 0 ? (
            <div>
                {cart && cart.map((product,index) => (
                    (product?.qtd ?? 0) > 0 && (
                        <div className='flex border-b-[1px] items-center justify-between text-gray-600 text-sm' key={index}>
                            <div className='w-1/4'>
                                <Image width={100} height={100} className='w-[100px] h-[100px]' src={product?.product?.image} alt={product?.product?.name} />
                            </div>
                            <p className='w-1/4 text-center font-bold'>Preço: {formatNumber(product?.product?.price)}</p>
                            <p className='w-1/4 flex justify-center gap-1'>
                                <span className='bg-gray-700 cursor-pointer text-white px-1.5 rounded-sm' onClick={() => removeQtdCart && removeQtdCart(product)}>
                                    -
                                </span> 
                                {product?.qtd}
                                <span className='bg-gray-700 cursor-pointer text-white px-1.5 rounded-sm' onClick={() => addQtdCart && addQtdCart(product)}>
                                    +
                                </span>
                            </p>
                            <p className='w-1/4 text-center font-bold'>SubTotal: {formatNumber((product?.qtd ?? 0) * product?.product?.price)}</p>
                        </div>
                    )
                ))}
                <div className='flex justify-between mt-4 px-20 max-[500px]:px-4'>
                    <p className='font-bold text-sm text-gray-600 mt-2'>Valor Total: {formatNumber((cart ?? []).reduce((acc, product) => acc + product?.product?.price * (product?.qtd ?? 0), 0))}</p>
                    <Button onClick={handleDeleteAllProductsOnCart} variant='destructive'>Limpar carrinho</Button>
                    <Button onClick={handleSaveCart} className='bg-green-500 px-3 py-1 text-white font-bold rounded-lg hover:bg-green-800 duration-300'>{loading ? 'Salvando carrinho...' : 'Salvar carrinho'}</Button>
                </div>
            </div>
                ) : (
                <p className='text-center text-2xl font-bold mt-12 text-gray-600'>Carrinho vazio</p>
        )}
    </div>
  )
}

export default Carrinho
