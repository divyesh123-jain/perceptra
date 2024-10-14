import { baseURL, headers, perceptradb, resposneCollection } from "@/app/api/constants"
import { NextResponse } from "next/server"

interface FormResponse { 
    response: string
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const {id } = params
        const url = new URL(`${baseURL}/databases/${perceptradb}/collections/${resposneCollection}/documents`)
        url.searchParams.append("queries[0]", JSON.stringify({method:"select", values : ["response"]}))
        url.searchParams.append("queries[1]", JSON.stringify({method:"equal", attribute:"form_id", values : [id]}))
        const response = await fetch(url, {
            headers: { ...headers },
        })
        const r = await response.json()
        if (!response.ok) {
            return NextResponse.json({ error: r }, { status: 500 })
        }
        const res : any[] = []
        r?.documents.map((x:FormResponse)=> res.push(JSON.parse(x["response"])))
        return NextResponse.json({data:res}, { status: 200 })
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 })
    }
}
