import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import prisma from "@/lib/db";

export async function GET(){
    return NextResponse.json({ message: "Hello World" });
}

export async function POST(request: Request){

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: "Not authorized." }, { status: 401 })
    }
    
    const { name, price, description, category, image, color } = await request.json()

    if (!name || !price || !description || !category || !image) {
        return NextResponse.json("All fields its required", { status: 400 })
    }


    const productExists = await prisma.product.findFirst({
        where: {
            name: name
        }
    })

    if (productExists) {
        return NextResponse.json({ error: "Product already exists." }, { status: 400 })
    }

    const product = await prisma.product.create({
        data: {
            name,
            price: parseFloat(price),
            description,
            categoryId: category,
            image,
            color: color || ''
        }
    })

    return NextResponse.json(product)
}


export async function DELETE(request: Request){
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: "Not authorized." }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)

    const productId = searchParams.get('id')

    if (!productId) {
        return NextResponse.json({ error: "Product id is required." }, { status: 400 })
    }

    try{
        await prisma.product.delete({
            where: {
                id: productId
            }
        })
    
        return NextResponse.json({message: "Product deleted."}, { status: 200 })
    } catch{
        return NextResponse.json({ error: "Failed delete product" }, { status: 404 })
    }
}