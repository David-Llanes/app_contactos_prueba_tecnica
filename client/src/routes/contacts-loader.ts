import { Contact } from '@/types'
import axios from 'axios'

export default async function loader({ request }): Promise<Contact[]> {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') || ''

  const response = await axios.get('http://localhost:4000/api/contacts', {
    params: {
      q: q,
    },
  })
  console.log(response.data)
  return response.data as Contact[]
}
