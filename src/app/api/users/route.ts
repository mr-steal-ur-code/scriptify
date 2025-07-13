import { getUsers, createUser, searchUsers } from '@/lib/users'
import { CreateUserInput } from '@/types/user'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url!)

  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const q = searchParams.get('q')

  if (q && q.trim() !== '') {
    const users = await searchUsers(q)
    return new Response(JSON.stringify(users), { status: 200 })
  }

  const result = await getUsers(page, limit)
  return new Response(JSON.stringify(result), { status: 200 })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { name, email, image } = body as CreateUserInput

  if (!name || !email) {
    return new Response(JSON.stringify({ error: 'Name and email are required' }), { status: 400 })
  }

  try {
    const user = await createUser({ name, email, image })
    return new Response(JSON.stringify(user), { status: 201 })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message || 'Internal Server Error' }), { status: 500 })
  }
}
