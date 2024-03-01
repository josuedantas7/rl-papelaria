import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request){

    const session = await getServerSession(authOptions);


    if (!session || !session?.user){
        return NextResponse.json({error: "You must be logged in to access your cart"}, {status: 401});
    }

    if (session.user.role !== "admin") {
        redirect('/login')
        return NextResponse.json({error: "You must be an admin to access this route"}, {status: 401});
    }

    const { searchParams } = new URL(request.url);

    const email = searchParams.get('email');

    if (!email) {
        try{
            const carts = await prisma.cart.findMany({
                include: {
                    owner: true,
                    cartProducts: {
                        include: {
                            product: true
                        }
                    }
                }
            })

            return NextResponse.json({cart: carts}, {status: 200});
        }catch{
            return NextResponse.json({error: "An error occurred while getting your cart"}, {status: 500});
        }
    }

    try{
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user) {
            return NextResponse.json({error: "Usuário não encontrado"}, {status: 404});
        }

        const cart = await prisma.cart.findFirst({
            where: {
                ownerId: user.id
            },
            include: {
                cartProducts: {
                    include: {
                        product: true
                    }
                },
                owner: true
            }
        })

        console.log(cart)

        if (!cart) {
            return NextResponse.json({error: "Carrinho não encontrado"}, {status: 404});
        }


        return NextResponse.json({carrinho: cart}, {status: 200});

    }catch(err){
        return NextResponse.json({error: err}, {status: 404});
    }
}