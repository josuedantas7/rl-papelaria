import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

import prisma from "@/lib/db";

export async function GET(){
    return NextResponse.json({ message: "Hello World" });
}

export async function POST(request: Request){
    const { name, price, description, category, image, color } = await request.json()

    if (!name || !price || !description || !category || !image) {
        return NextResponse.json("All fields its required", { status: 400 })
    }

    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
        return NextResponse.json({ error: "Not authorized." }, { status: 401 })
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