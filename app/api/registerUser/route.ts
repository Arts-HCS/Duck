import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

function quitarAcentos(texto: string) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

export async function POST(req:Request){
    const body = await req.json()
    const {name, email, password} = body;

    console.log(name)
    console.log(email)
    console.log(password)

    const usuarioExiste = await prisma.usuario.findUnique({
        where: {email}
    })
    if (usuarioExiste){
        return NextResponse.json({
            message: 'existente'
        })
    }

    const nameLimpio = quitarAcentos(name);
    const emailLimpio = quitarAcentos(email);

    await prisma.usuario.create({
        data: {
            name: nameLimpio,
            email: emailLimpio,
            password
        }
    })

    return NextResponse.json({
        message: 'exito'
    })

}