import { deleteUser, getUserById, updateUser } from '@/lib/users'
import type { UpdateUserInput } from '@/types/user'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  const user = await getUserById(id)

  if (!user) {
    return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 })
  }

  return new Response(JSON.stringify(user), { status: 200 })
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing user ID' }), { status: 400 })
  }

  const body = await req.json() as UpdateUserInput
  const { name, image } = body

  const updatedUser = await updateUser(id, { name, image })
  return new Response(JSON.stringify(updatedUser), { status: 200 })
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params

  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing user ID' }), { status: 400 })
  }

  await deleteUser(id)
  return new Response(null, { status: 204 })
}
