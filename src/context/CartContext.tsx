'use client'
import { createContext, useState, useEffect, ReactNode } from "react";
import { ProductProps, CartContextProps } from '@/intefaces/AllInterfaces'

export const CartContext = createContext<CartContextProps>({ cart: [], addCart: () => {}, addQtdCart: () => {}, removeQtdCart: () => {}, qtdTotal: 0, totalValue: 0});

export const CartProvider = ({ children } : { children : ReactNode }) => {

    const [cart,setCart] = useState<ProductProps[]>([])
    const [qtdTotal, setQtdTotal] = useState<number>(0)
    const [totalValue, setTotalValue] = useState<number>(0)

    function addCart(product: ProductProps) {
        if (cart.find((item) => item.id === product.id)) {
            addQtdCart(product)
            return
        }
        setCart([...cart, product])
    }

    function addQtdCart(product: ProductProps) {
        const newCart = cart.map((item) => {
            if(item.id === product.id && item.qtd) {
                item.qtd += 1
            }
            return item
        })
        setCart(newCart)
    }

    function removeQtdCart(product: ProductProps) {
        if (product.qtd === 1) {
            setCart(cart.filter((item) => item.id !== product.id))
            return
        }
        const newCart = cart.map((item) => {
            if(item.id === product.id && item.qtd) {
                item.qtd -= 1
            }
            return item
        })
        setCart(newCart)
    }

    useEffect(() => {
        function totalCart() {
            let total = 0
            cart.map((item) => {
                if (!item.qtd) item.qtd = 1
                total += item.qtd
            })
            setQtdTotal(total)
        }
        function totalValue(){
            let total = 0
            cart.map((item) => {
                if (!item.qtd) item.qtd = 1
                total += item.qtd * item.price
            })
            setTotalValue(total)
        }
        totalValue()
        totalCart()
    }, [cart])

    return (
        <CartContext.Provider value={{addCart, addQtdCart, removeQtdCart, cart, qtdTotal, totalValue}}>
            {children}
        </CartContext.Provider>
    )
}