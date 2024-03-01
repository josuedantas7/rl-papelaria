'use client'
import { createContext, useState, useEffect, ReactNode } from "react";
import { ProductProps, CartContextProps, CartProps } from '@/intefaces/AllInterfaces'
import { useSession } from "next-auth/react";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";

export const CartContext = createContext<CartContextProps>({ cart: [], addCart: () => {}, addQtdCart: () => {}, removeQtdCart: () => {}, qtdTotal: 0, setCart: () => {}});

export const CartProvider = ({ children } : { children : ReactNode }) => {

    const [cart,setCart] = useState<CartProps[]>([])
    const [qtdTotal, setQtdTotal] = useState<number>(0)
    const { data:session, status } = useSession()

    const router = useRouter()
    const [cartExists, setCartExists] = useState<boolean>(false)

    function addCart(product: ProductProps) {
        if (status !== 'authenticated') {
            return router.push('/login')
        }
        if (cartExists) {
            const productExistsInCart = cart.find((item) => item.product.id === product.id)
            if (productExistsInCart) {
                setCart(cart.map((item) => {
                    if(item.product.id === product.id) {
                        item.qtd += 1
                    }
                    return item
                }))
            } else {
                setCart([...cart, {
                    qtd: 1,
                    product: product as {} as ProductProps,
                }])
            }
        }else {
            const productExistsInCart = cart.find((item) => item.product.id === product.id)
            if (productExistsInCart) {
                setCart(cart.map((item) => {
                    if(item.product.id === product.id) {
                        item.qtd += 1
                    }
                    return item
                }))
            } else {
                setCart([...cart, {
                    qtd: 1,
                    product: product as {} as ProductProps,
                }])
            }
        }
    }

    function addQtdCart(product: CartProps) {
        if (cartExists) {
            const productExistsInCart = cart.find((item) => item.product.id === product.product.id)
            if (productExistsInCart) {
                setCart(cart.map((item) => {
                    if(item.product.id === product.product.id) {
                        item.qtd += 1
                    }
                    return item
                }))
            } else {
                console.log('ITEM NAO REPETIDO')
                setCart([...cart, {
                    qtd: 1,
                    product: product.product,
                }])
            }
        } else {
            const productExistsInCart = cart.find((item) => item.product.id === product.product.id)
            if (productExistsInCart) {
                setCart(cart.map((item) => {
                    if(item.product.id === product.product.id) {
                        item.qtd += 1
                    }
                    return item
                }))
            } else {
                setCart([...cart, {
                    qtd: 1,
                    product: product.product,
                }])
            }
        }
    }

    function removeQtdCart(product: CartProps) {
        const productExistsInCart = cart.find((item) => item.product.id === product.product.id)
        if (productExistsInCart) {
            if (product.qtd === 1) {
                setCart(cart.filter((item) => item.product.id !== product.product.id))
            } else {
                setCart(cart.map((item) => {
                    if(item.product.id === product.product.id) {
                        item.qtd -= 1
                    }
                    return item
                }))
            }
        }
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
        totalCart()
    }, [cart])

    useEffect(() => {
        if (status === 'authenticated') {
            const getCartByUser = async () => {
                const response = await api.get('/api/cart')
                console.log(response)
                if (response.data.cart && response.data.cart.cartProducts.length > 0) {
                    setCartExists(true)
                    const carrinho = response.data.cart.cartProducts
                    setCart(carrinho)
                    console.log(carrinho)
                }
            }
            getCartByUser()
        }
    },[session,status, setCart])

    return (
        <CartContext.Provider value={{addCart, addQtdCart, removeQtdCart, cart, qtdTotal, setCart}}>
            {children}
        </CartContext.Provider>
    )
}