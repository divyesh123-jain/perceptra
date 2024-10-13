import { baseURL, formCollection, headers, perceptradb } from "@/app/api/constants"
import { authOptions } from "@/app/lib/authOptions"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions)
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    try {
        const { id } = params
        const query = JSON.stringify({
            "method": "equal",
            "attribute": "owner",
            "values": [session.user?.email as string]
        })
        const query2 = JSON.stringify({
            method: "equal",
            "attribute": "event_id",
            "values": [id]
        })
        const url = new URL(`${baseURL}/databases/${perceptradb}/collections/${formCollection}/documents`)
        url.searchParams.append("queries[0]", query)
        url.searchParams.append("queries[1]", query2)
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