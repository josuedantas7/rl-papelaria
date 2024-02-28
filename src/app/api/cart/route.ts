import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { Session } from "inspector";

export async function POST(request: Request){
    const session = await getServerSession(authOptions);


    if (!session || !session?.user){
        return NextResponse.json({error: "You must be logged in to add items to your cart"}, {status: 401});
    }

    const { Products } = await request.json();

    const cartExists = await prisma.cart.findFirst({
        where: {
            ownerId: session.user.id
        }
    })

    try {
        
        if (cartExists) {

            const deleteProducts = await prisma.cartProduct.deleteMany({
                where: {
                    cartId: cartExists.id
                }
            })

            try {
                const productsCart = await Promise.all(Products.map((product : any) => 
                    prisma.cartProduct.create({
                        data: {
                            qtd: product.qtd,
                            product: {
                                connect: {
                                    id: product.product.id
                                },

                            },
                            cart: {
                                connect: {
                                    id: cartExists.id
                                }
                            }
                        }
                    })
                ));
                return NextResponse.json({ cart: cartExists, productsCart }, { status: 201 });
            } catch (err) {
                return NextResponse.json({ error: err }, { status: 500 });
            }
        }

        const cart = await prisma.cart.create({
            data: {
                owner: {
                    connect: {
                        id: session.user.id
                    }
                }
            }
        })

        const productsCart = await Promise.all(Products.map((product : any) => 
            prisma.cartProduct.create({
                data: {
                    qtd: product.qtd,
                    product: {
                        connect: {
                            id: product.product.id
                        },

                    },
                    cart: {
                        connect: {
                            id: cart.id
                        }
                    }
                }
            })
        ));

        return NextResponse.json({cart, productsCart}, {status: 201});
    }catch{
        return NextResponse.json({error: "An error occurred while creating your cart"}, {status: 500});
    }

}

export async function GET(){

    const session = await getServerSession(authOptions)


    if (!session || !session?.user){
        return NextResponse.json({error: "You must be logged in to see your cart"}, {status: 401});
    }

    try{
        const cart = await prisma.cart.findFirst({
            where: {
                ownerId: session.user.id
            },
            include: {
                cartProducts: {
                    include: {
                        product: true
                    }
                }
            }
        });

        return NextResponse.json({cart}, {status: 200});
    }catch(err){
        console.log(err)
        return NextResponse.json({error: "An error occurred while getting your cart"}, {status: 500});
    }
}

export async function DELETE(request: Request){
    const session = await getServerSession(authOptions);


    if (!session || !session?.user){
        return NextResponse.json({error: "You must be logged in to delete items from your cart"}, {status: 401});
    }

    try{

        const cart = await prisma.cart.findFirst({
            where: {
                ownerId: session.user.id
            }
        })

        if (!cart){
            return NextResponse.json({error: "You don't have a cart to delete"}, {status: 404});
        }

        const deletedproducts = await prisma.cartProduct.deleteMany({
            where: {
                cartId: cart.id,
            }
        })

        return NextResponse.json({productsDeltededs: deletedproducts}, {status: 200});
    }catch{
        return NextResponse.json({error: "An error occurred while deleting your cart"}, {status: 500});
    }

}