export type Address = {
  id: number
  contactId: number
  street: string
  noExt: string
  city: string
  state: string
  zip: string
  country: string
}

export type Contact = {
  id: number
  name: string
  lastname: string
  email: string
  numbers: string[]
  addresses: Address[]
}
