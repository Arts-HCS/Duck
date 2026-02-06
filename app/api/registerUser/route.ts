import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:Request){
    const body = await req.json()
    const {name, email, password} = body

    const usuarioExiste = await prisma.usuario.findUnique({
        where: {email}
    })
    if (usuarioExiste){
        return NextResponse.json({
            message: 'existente'
        })
    }

    const user = await prisma.usuario.create({
        data:{
            name,
            email,
            password
        }
    })

    return NextResponse.json({
        message: "exito"
    })

}