import { NextResponse } from "next/server";
import { baseURL, headers, perceptradb, resposneCollection } from "../constants";

export async function POST(
    req: Request
) {
    const url = `${baseURL}/databases/${perceptradb}/collections/${resposneCollection}/documents`
    const body = await req.json()
    const payload = {
        documentId: 'unique()',
        data: body
    };
    console.log("payload", payload)
    const request = await fetch(url, {
        method: "POST",
        headers: { ...headers },
        body: JSON.stringify(payload)
    })
    const r = await request.json()
    if (!request.ok) {
        return NextResponse.json({ error: r }, { status: 500 })
    }
    return NextResponse.json(r, { status: 200 })
}