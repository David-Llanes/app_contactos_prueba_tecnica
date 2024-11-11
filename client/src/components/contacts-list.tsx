import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getFullName, getInitials } from '@/lib/utils'
import { ScrollArea } from '@components/ui/scroll-area'
import { Mail, MapPin, Phone, Search } from 'lucide-react'
import EditContact from './edit-contact'
import { useContactsStore } from '@/store/contacts.store'

import axios from 'axios'
import { toast } from 'sonner'

export default function ContactsList() {
  const contacts = useContactsStore((state) => state.contacts)
  const remove = useContactsStore((state) => state.remove)

  const handleDeleteContact = async (id: number) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/contacts/${id}`
      )
      if (response.status === 200) {
        remove(id.toString())
        toast.success('Contacto eliminado')
      }
    } catch (error) {
      console.error(error)
      alert('Ocurrio un error al eliminar el contacto')
    }
  }

  if (!contacts.length) {
    return (
      <div className="flex flex-col gap-3 items-center ">
        <Search className="size-16 text-muted-foreground" />
        <p className="text-3xl font-bold text-balance text-center">
          No se encontraron coincidencias
        </p>
        <p className="text-sm italic text-pretty text-center">
          Revisa la ortografía o intenta buscar algo distinto
        </p>
      </div>
    )
  }

  return (
    <ScrollArea>
      <Accordion type="single" collapsible className="pr-4">
        {contacts.map((c) => (
          <AccordionItem key={c.id} value={c.email} className="px-4 group">
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center gap-4 w-full group-[&[data-state=open]]:text-primary">
                <div className="size-10 rounded-full content-center text-center bg-muted text-muted-foreground/70 font-semibold border">
                  {getInitials(`${c.name} ${c.lastname}`)}
                </div>
                <p className="font-semibold group-[&[data-state=open]]:text-primary">
                  {getFullName(c.name, c.lastname)}
                </p>
                <div className="hidden ml-auto group-data-[state=open]:flex gap-3"></div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <section className="flex gap-2 justify-end">
                <EditContact contact={c} />
                <button
                  className="hover:underline cursor-pointer font-semibold text-destructive"
                  onClick={() => handleDeleteContact(c.id)}
                >
                  Eliminar
                </button>
              </section>
              <section className="grid gap-4 px-4">
                <div className="grid grid-cols-[25px,auto]">
                  <p className="font-semibold text-foreground grid-cols-subgrid grid col-span-2 items-center">
                    <Phone className="size-4" />
                    <span>Telefonos</span>
                  </p>
                  <div className="col-start-2 text-muted-foreground font-semibold">
                    {c.numbers.map((n) => (
                      <p key={n}>- {n}</p>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-[25px,auto]">
                  <p className="font-semibold text-foreground grid-cols-subgrid grid col-span-2 items-center">
                    <Mail className="size-4" />
                    <span>Correo</span>
                  </p>
                  <div className="col-start-2 text-muted-foreground font-semibold">
                    - {c.email}
                  </div>
                </div>
                <div className="grid grid-cols-[25px,auto]">
                  <p className="font-semibold text-foreground grid-cols-subgrid grid col-span-2 items-center">
                    <MapPin className="size-4" />
                    <span>Dirección</span>
                  </p>
                  <div className="col-start-2 text-muted-foreground font-semibold">
                    {c.addresses.map((address, index) => (
                      <p key={index}>- {address}</p>
                    ))}
                  </div>
                </div>
              </section>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </ScrollArea>
  )
}
