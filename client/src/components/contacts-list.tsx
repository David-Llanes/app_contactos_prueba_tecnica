import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getFormattedAddress, getFullName, getInitials } from '@/lib/utils'
import { Contact } from '@/types'
import { ScrollArea } from '@components/ui/scroll-area'
import { Mail, MapPin, Phone, Search } from 'lucide-react'

interface Props {
  contacts: Contact[]
  onDeleteContact: (id: number) => void
}

export default function ContactsList({ contacts, onDeleteContact }: Props) {
  if (!contacts.length) {
    return (
      <div className="flex flex-col gap-3 items-center ">
        <Search className="size-16 text-muted-foreground" />
        <p className="text-3xl font-bold text-balance text-center">
          No se encontraron coincidencias
        </p>
        <p className="text-sm italic text-pretty text-center">
          Revisa la ortografía o intenta buscar algo distinto.
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
                <button className="hover:underline cursor-pointer font-semibold">
                  Editar
                </button>
                <button
                  className="hover:underline cursor-pointer font-semibold text-destructive"
                  onClick={() => onDeleteContact(c.id)}
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
                    {c.addresses.map((a) => (
                      <p key={a.id}>- {getFormattedAddress(a)}</p>
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
