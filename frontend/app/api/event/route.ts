import { projectForm } from '@/components/Sheets/CreateProject'
import { appwrite_key, baseURL, eventsCollection, perceptradb, projectid } from '../constants'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/authOptions'

const headers = {
  "X-Appwrite-Project": projectid,
  "X-Appwrite-Key": appwrite_key,
  "Content-Type": "application/json"
}

export async function POST(
  req: Request
) {

  const url = `${baseURL}/databases/${perceptradb}/collections/${eventsCollection}/documents`
  const body: projectForm = await req.json()
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

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  try {
   
    const query = JSON.stringify({
      "method": "equal",
      "attribute": "owner",
      "values": [session.user?.email as string]
    })
    const url = new URL(`${baseURL}/databases/${perceptradb}/collections/${eventsCollection}/documents`)
    url.searchParams.append("queries[0]", query)
    const response = await fetch(url, {
      headers:{...headers},
    })
    const r = await response.json()
    if(!response.ok){
      return NextResponse.json({ error: r }, { status: 500 })
    }
    return NextResponse.json(r, {status:200})
  }catch(err){
    return NextResponse.json({error:err}, {status:500})
  }
}