import { authOptions } from "@/app/lib/authOptions"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { baseURL, eventsCollection, headers, perceptradb } from "../../constants"


export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
    const url = new URL(`${baseURL}/databases/${perceptradb}/collections/${eventsCollection}/documents/${id}`)
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

