import { baseURL, formCollection, headers, perceptradb } from "../../constants"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params
        const url = new URL(`${baseURL}/databases/${perceptradb}/collections/${formCollection}/documents/${id}`)
        const response = await fetch(url, {
            headers: { ...headers },
        })
        const r = await response.json()
        if (!response.ok) {
            return NextResponse.json({ error: r }, { status: 500 })
        }
        return NextResponse.json(r, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }){
    try {
        const { id } = params
        const url = new URL(`${baseURL}/databases/${perceptradb}/collections/${formCollection}/documents/${id}`)
        const body = await req.json()
        console.log(body)
        const response = await fetch(url, {
            method:"PATCH",
            headers: { ...headers },
            body:JSON.stringify({data:{form_format: body.form_format}})
        })
        const r = await response.json()
        console.log(r)
        if (!response.ok) {
            return NextResponse.json({ error: r }, { status: 500 })
        }
        return NextResponse.json(r, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}