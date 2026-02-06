import { NextResponse } from "next/server";
import OpenAI from "openai";
import dotenv from "dotenv"
dotenv.config()

const apiKey = process.env.OPENAI_API;
const now = new Date();
const today = now.toLocaleDateString("en-CA");     
const time = now.toLocaleTimeString("es-MX");   

const client = new OpenAI({
    apiKey: apiKey
});


export async function POST(req: Request){
    const body = await req.json()
    const {content} = body;

    const response = await client.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
            {
                role: "system",
                content: `
                
                Sistema para extraer tareas desde un texto en español.
                Si el input tiene contenido sexual, saludos, lenguaje indebido o no permitido, responde solo: Error

                Devuelve una sola línea con cuatro campos, separados por comas y en este orden:
                fecha (YYYY-MM-DD), hora (HH:MM 24h), descripción, título.

                Reglas:

                    Sin texto extra.

                    "mediodía" = 12:00, "medianoche" = 00:00.

                    Corrige errores ortográficos.

                    Si no hay día: antes de 14:00 usa hoy; después, mañana.

                    "Mañana" = día siguiente.

                    Nunca fechas pasadas.

                    Sin descripción: campo vacío.

                    Sin hora: 12:00.

                    Sin título claro: créalo breve.

                    Sin acción clara: Error.

                    No inventes datos.

                    Texto incoherente o sin actividad real: Error
                    
                    Si al menos una palabra no tiene sentido, responde: Error
                    `
            },
            {
                role: "user",
                content
            }
        ]
    });

    const { choices } = response;
    const answer = choices[0].message.content;
    return NextResponse.json({ answer })
}