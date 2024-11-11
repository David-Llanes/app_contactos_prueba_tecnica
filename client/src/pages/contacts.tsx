import ContactsList from '@/components/contacts-list'
import { Contact } from '@/types'
import { useEffect } from 'react'
import { useLoaderData, useSearchParams } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import NewContact from '@/components/new-contact'
import { useContactsStore } from '@/store/contacts.store'
import Filters from '@/components/filters'

function Contacts() {
  const initialContacts = useLoaderData() as Contact[]
  const [searchParams, setSearchParams] = useSearchParams()
  const init = useContactsStore((state) => state.init)

  useEffect(() => {
    init(initialContacts)
  }, [init, initialContacts])

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

  return (
    <main className="h-full content content-start overflow-hidden">
      <div className="flex gap-4 my-8 items-center">
        <Filters
          defaultValue={searchParams.get('q') || ''}
          onChange={handleInputChangeDebounced}
        />
        <NewContact />
      </div>
      <ContactsList />
    </main>
  )
}

export default Contacts
