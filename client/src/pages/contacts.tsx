import ContactsList from '@/components/contacts-list'
import { Input } from '@/components/ui/input'
import { Contact } from '@/types'
import { Search } from 'lucide-react'
import { useState } from 'react'
import { useLoaderData, useSearchParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'

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
    300
  )

  const handleDeleteContact = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id))
  }

  return (
    <main className="h-full content content-start overflow-hidden">
      <search className="my-8">
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
      <ContactsList
        contacts={filteredContacs}
        onDeleteContact={handleDeleteContact}
      />
    </main>
  )
}

export default Contacts
