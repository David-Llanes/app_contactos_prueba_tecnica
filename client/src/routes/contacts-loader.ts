import { Contact } from '@/types'
import axios from 'axios'

export default async function loader(): Promise<Contact[]> {
  const response = await axios.get('http://localhost:5000/contacts')
  console.log(response.data)
  return response.data as Contact[]
}
