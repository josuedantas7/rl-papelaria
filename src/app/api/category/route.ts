import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function POST(request: NextRequest){

    const session = await getServerSession(authOptions);


    if (!session || !session.user) {
        redirect('/')
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { name, image } = await request.json();


    if (!name) {
        return NextResponse.json("Name of category is required", { status: 400 })
    }


    const categoryExists = await prisma.category.findFirst({
        where: {
            name
        }
    })

    if (categoryExists) {
        return NextResponse.json("Category already exists", { status: 400 })
    }


    try{
        const category = await prisma.category.create({
            data: {
                name: name,
                image: image
            }
        })
    
        return NextResponse.json(category)
    
    }catch{
        return NextResponse.json("Error to create category", { status: 500 })
    }
}

export async function GET(){
    const categories = await prisma.category.findMany();

    return NextResponse.json(categories);
}