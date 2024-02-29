'use client'
import { CartContext } from '@/context/CartContext'
import { ProductProps } from '@/intefaces/AllInterfaces'
import { useSession } from 'next-auth/react'
import React, { useContext } from 'react'

const AddToCart = ({product} : { product : ProductProps | null}) => {

    const { addCart } = useContext(CartContext)

    return (
        <p className='cursor-pointer' onClick={() => product && addCart(product)}>Adicionar carrinho</p>
    )
}

export default AddToCart
