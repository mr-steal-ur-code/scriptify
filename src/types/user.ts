export type CreateUserInput = {
  name: string
  email: string
  image?: string
}

export type UpdateUserInput = {
  name?: string
  image?: string
}
