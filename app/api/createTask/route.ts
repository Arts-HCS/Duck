import { NextResponse } from "next/server";
import OpenAI from "openai";
import dotenv from "dotenv"
dotenv.config()

const apiKey = process.env.OPENAI_API;  

const client = new OpenAI({
    apiKey: apiKey
});


export async function POST(req: Request){
    const now = new Date();
    const today = now.toLocaleDateString("en-CA", {
        timeZone: "America/Mexico_City"
    });
    
    const time = now.toLocaleTimeString("es-MX", {
        timeZone: "America/Mexico_City",
        hour12: false
    });

    const body = await req.json()
    const {content} = body;

    const response = await client.chat.completions.create({
        model: "gpt-5-mini",
        messages: [
            {
                role: "system",
                content: `
                Hoy es ${today}.
                Hora actual ${time}.
                
                Sistema para extraer tareas desde un texto en español.
                Si el input tiene contenido sexual, responde solo: Error
                Si el input contiene groserías pero lo que dice tiene sentido, responde con normalidad.
                Ninguna de tus respuestas "Error" debe contener puntos o comas.

                Devuelve una sola línea con cuatro campos, separados por comas y en este orden:
                fecha (YYYY-MM-DD), hora (HH:MM 24h), descripción, título.

                Reglas:

                    Sin texto extra.

                    "mediodía" = 12:00, "medianoche" = 00:00.

                    Corrige errores ortográficos.

                    Si no hay día y la hora es después de las 17:00, devuelve mañana.

                    Si se dice "mañana": devuelve el día después de hoy.

                    Si no se especifica si es hora de mañana o tarde, escoge tarde.

                    Sin descripción: campo vacío.

                    Cuando se diga una materia pero no se especifique el tipo de tarea, di que es una actividad, no una clase.

                    Sin hora: 12:00.

                    Sin título claro: créalo breve.

                    Sin acción clara: Error.

                    No inventes datos.

                    Si el texto contiene una materia y una fecha, responde con normalidad.
                    
                    Si una palabra tiene errores ortográficos leeves, corrígelo, pero si contiene carácteres sin sentido, responde: Error
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