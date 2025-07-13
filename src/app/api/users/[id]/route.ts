import { deleteUser, getUserByEmail, getUserById, updateUser } from '@/lib/users'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url!)
  const email = searchParams.get('email')
  const id = searchParams.get('id')

  let user
  if (email) {
    user = await getUserByEmail(email)
  } else if (id) {
    user = await getUserById(id)
  }

  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
  }

  return new Response(JSON.stringify(user), { status: 200 })
}

export async function PUT(req: NextRequest) {
  const { searchParams } = new URL(req.url!)
  const id = searchParams.get('id')
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing user ID' }), { status: 400 })
  }

  const body = await req.json()
  const { name, image } = body

  const updatedUser = await updateUser(id, { name, image })
  return new Response(JSON.stringify(updatedUser), { status: 200 })
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url!)
  const id = searchParams.get('id')
  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing user ID' }), { status: 400 })
  }

  await deleteUser(id)
  return new Response(null, { status: 204 })
}
