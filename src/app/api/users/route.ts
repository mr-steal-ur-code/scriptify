import { getUsers, createUser, searchUsers, getUserByEmail } from '@/lib/users'
import type { CreateUserInput } from '@/types/user'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url!)

  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const q = searchParams.get('q')
  const email = searchParams.get('email')

  if (email && email.trim() !== '') {
    const user = await getUserByEmail(email)
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
    }
    return new Response(JSON.stringify(user), { status: 200 })
  }

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
