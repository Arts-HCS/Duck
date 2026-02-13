import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req:Request){
    const body = await req.json()
    const {userId} = body

    const userFound = await prisma.usuario.findUnique({
        where: {id: userId}
    })
    return NextResponse.json(userFound)

}