import { API_BASE_URL } from '@/config'
import { Contact } from '@/types'
import axios from 'axios'

export default async function loader({
  request,
}: {
  request: Request
}): Promise<Contact[]> {
  const url = new URL(request.url)
  const q = url.searchParams.get('q') || ''

  console.log('API_BASE_URL', API_BASE_URL)
  const response = await axios.get(`${API_BASE_URL}`, {
    params: {
      q: q,
    },
  })
  console.log(response.data)
  return response.data as Contact[]
}
