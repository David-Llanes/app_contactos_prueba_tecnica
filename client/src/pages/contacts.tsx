import ContactsList from '@/components/contacts-list'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Contact } from '@/types'
import axios from 'axios'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useLoaderData, useSearchParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import NewContact from '@/components/new-contact'

function Contacts() {
  const initialContacts = useLoaderData() as Contact[]
  const [contacts, setContacts] = useState(initialContacts)
  const [searchParams, setSearchParams] = useSearchParams()

  const q = searchParams.get('q') || ''

  const filteredContacs = q
    ? contacts.filter((c) => {
        const filterValue = q.toLowerCase()
        return (
          c.name.toLowerCase().includes(filterValue) ||
          c.lastname.toLowerCase().includes(filterValue) ||
          c.email.toLowerCase().includes(filterValue) ||
          c.numbers.some((n) => n.includes(q))
        )
      })
    : contacts

  const handleInputChangeDebounced = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value

      if (!value) {
        searchParams.delete('q')
        setSearchParams(searchParams)
      } else {
        setSearchParams({ q: value })
      }
    },
    350
  )

  const handleDeleteContact = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/contacts/${id}`
      )
      if (response.status === 200) {
        const newContacts = contacts.filter((c) => c.id !== id)
        setContacts(newContacts)
        toast.success('Contacto eliminado')
      }
    } catch (error) {
      console.error(error)
      alert('Ocurrio un error al eliminar el contacto')
    }
  }

  return (
    <main className="h-full content content-start overflow-hidden">
      <div className="flex gap-4 my-8 items-center">
        <search className="grow">
          <form className="relative h-10">
            <Search className="size-5 text-muted-foreground absolute left-2 bottom-0 top-0 my-auto pointer-events-none" />
            <Input
              defaultValue={q}
              type="search"
              placeholder="Buscar"
              className="pl-9 h-full bg-muted"
              onChange={handleInputChangeDebounced}
            />
          </form>
        </search>
        <NewContact setContacts={setContacts} />
      </div>
      <ContactsList
        contacts={filteredContacs}
        onDeleteContact={handleDeleteContact}
      />
    </main>
  )
}

export default Contacts
