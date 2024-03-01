'use client'
import React, { FormEvent, useEffect, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { api } from '@/lib/api'
import { FcSearch } from "react-icons/fc";
import { CartProps } from '@/intefaces/AllInterfaces'

interface ErrorResponse {
    response?: {
        data: {
            error: string;
        };
    };
}

const FormSearchCart = () => {

    const [email,setEmail] = useState<string>('')

    const [result,setResult] = useState<CartProps | null>()
    const [tableOpen,setTableOpen] = useState<boolean>(true)
    const [allCarts,setAllCarts] = useState<CartProps[] | null>()
    const [isError,setIsError] = useState<boolean>(false)
    const [messageError,setMessageError] = useState<string>('')

    async function onSubmit(e: FormEvent){
        e.preventDefault()

        try{
            const response = await api.get('/api/admincart', {
                params: {
                    email: email
                }
            })
            setResult(response.data.carrinho)
        }catch(err: ErrorResponse | any){
            setIsError(true)
            if(err.response){
                setMessageError(err.response.data.error)
            }
        }
    }

    useEffect(() => {
        if (result?.owner?.email !== email) {
            setResult(null)
            setTableOpen(true)
        }

        if (email === '') {
            setResult(null)
            setTableOpen(true)
        }

        if(result) {
            setTableOpen(false)
            setIsError(false)
        }
        if(isError){
            setResult(null)
            setTableOpen(false)
            setTimeout(() => {
                setIsError(false)
                setTableOpen(true)
            },2000)
        }
    },[result,email,isError])

    useEffect(() => {

        async function getAllCarts(){
            try{
                let response = await api.get('/api/admincart')
                // tirando os carrinhos vazios da lista
                const newCart = response.data.cart.filter((cart: CartProps) => cart?.cartProducts?.length ?? 0 > 0)
                setAllCarts(newCart)
            }catch{
                console.log('Erro ao buscar carrinhos')
            }
        }
        getAllCarts()
    },[])

    function formatPrice(price: number){
        return new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(price)
    }
  return (
    <div className='w-[80%] flex mx-auto max-[900px]:w-[90%] flex-col'>
        <div className='w-full'>
            <Label>Email do cliente</Label>
            <form onSubmit={onSubmit} className='flex items-center gap-3'>
                <Input onChange={e => setEmail(e.target.value)} type='email' id='email' placeholder='Email do cliente' />
                <FcSearch type='submit' size={40} className='cursor-pointer rounded-lg' onClick={onSubmit}/>
            </form>
        </div>
        {isError && (
            <div className='text-red-500 font-bold mt-3 text-center'>{messageError}</div>
        )}
        {result && (
                    <div>
                        <div className='flex justify-center mt-12 flex-col items-center'>
                            <h1 className='text-2xl font-bold'>Carrinho de:</h1>
                            <h1 className='font-bold'>Nome: <span className='font-normal'>{result?.owner?.name}</span></h1>
                            <h1 className='font-bold'>Email: <span className='font-normal'>{result?.owner?.email}</span></h1>
                        </div>
                        {result.cartProducts && result?.cartProducts?.length > 0 ? (
                            <div>
                                <div className='flex justify-between px-3 mt-5'>
                            <p className='font-bold w-3/6'>Produto</p>
                            <p className='font-bold w-1/6 text-center'>Quantidade</p>
                            <p className='font-bold w-1/6 text-center'>Preço Un</p>
                            <p className='font-bold w-1/6 text-end'>Total</p>
                        </div>
                        <div className='flex flex-col gap-1.5 max-h-[500px] overflow-y-auto'>
                            {result?.cartProducts?.map((product,index) => (
                                <div key={index} className='flex justify-between border py-1 rounded-lg px-3 border-zinc-300'>
                                    <p className='w-3/6'>{product.product.name}</p>
                                    <p className='w-1/6 text-center'>{product.qtd}</p>
                                    <p className='w-1/6 text-center'>{formatPrice(product.product.price)}</p>
                                    <p className='w-1/6 text-end'>{formatPrice(product.product.price * product.qtd)}</p>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h1 className='text-right font-bold mt-3'>Total: {formatPrice(result?.cartProducts?.map((product) => product.product.price * product.qtd).reduce((acc,curr) => acc + curr) ?? 0)}</h1>
                        </div>
                    </div>
                ) : (
                    <div className='text-center mt-5 font-bold'>Nenhum produto no carrinho</div>
                )} 
            </div>
        )}
        {tableOpen && (
            <div>
                <h1 className='text-2xl font-bold my-6 text-center'>Todos os carrinhos</h1>
                <div className='flex justify-between px-3'>
                    <p className='font-bold w-1/3'>ID</p>
                    <p className='font-bold w-1/3 text-center'>EMAIL</p>
                    <p className='font-bold w-1/3 text-end'>QTD ITENS</p>
                </div>
                <div className='flex flex-col gap-1.5'>
                    {allCarts && allCarts?.map((cart: CartProps,index) => (
                        <div key={index} className='flex justify-between border py-1 rounded-lg px-3 border-zinc-300'>
                            <p>{index}</p>
                            <p>{cart?.owner?.email}</p>
                            {cart?.cartProducts?.map((product) => product.qtd).reduce((acc,curr) => acc + curr)}
                        </div>
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default FormSearchCart
