import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from 'lucide-react'
import { useRef, useState } from 'react'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import axios from 'axios'
import { toast } from 'sonner'
import { useContactsStore } from '@/store/contacts.store'
import { API_BASE_URL } from '@/config'

function NewContact() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([''])
  const [addresses, setAddresses] = useState<string[]>([''])
  const formRef = useRef<HTMLFormElement>(null)
  const add = useContactsStore((state) => state.add)

  // Función para reiniciar los campos de teléfono y dirección cada que se abra el modal
  const resetState = () => {
    setIsModalOpen((prev) => !prev)
    setPhoneNumbers([''])
    setAddresses([''])
  }

  // Función para agregar un nuevo campo de teléfono y dirección
  const addNumberField = () => {
    setPhoneNumbers([...phoneNumbers, '']) // Agrega un nuevo campo vacío
  }
  const addAddressField = () => {
    setAddresses([...addresses, '']) // Agrega un nuevo campo vacío
  }

  // Función para manejar el cambio de valor en los campos de entrada
  const handleNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target
    // Validar si es un numero de teléfono válido
    const isNumber = /^\d+$/.test(value)
    if (!isNumber && value) return

    const newPhoneNumbers = [...phoneNumbers]
    newPhoneNumbers[index] = value
    setPhoneNumbers(newPhoneNumbers)
  }

  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target
    const newAddresses = [...addresses]
    newAddresses[index] = value
    setAddresses(newAddresses)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const cleanNumbers = phoneNumbers.filter((n) => n.trim())
    const cleanAddresses = addresses.filter((a) => a.trim())
    const formData = new FormData(e.currentTarget)
    const name = (formData.get('name') as string) || ''
    const lastname = (formData.get('lastname') as string) || ''
    const email = (formData.get('email') as string) || ''

    const data = {
      name: name.trim(),
      lastname: lastname.trim(),
      email: email.trim(),
      numbers: cleanNumbers,
      addresses: cleanAddresses,
    }

    try {
      const response = await axios.post(`${API_BASE_URL}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.status === 201) {
        resetState()
        formRef.current?.reset()
        toast.success('Contacto guardado')
        add(response.data)
      }
    } catch (error) {
      console.error(error)
      toast.error('No se pudo guardar. Revisa el formato de los campos.')
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild onClick={resetState}>
        <Button variant="outline" className="h-full">
          Nuevo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[500px] p-0 overflow-hidden">
        <ScrollArea className="max-h-[500px] overflow-auto">
          <DialogHeader className="sticky top-0 z-10 bg-background/90 p-4 border-b">
            <DialogTitle>Nuevo contacto</DialogTitle>
            <DialogDescription>
              Toca fuera para cancelar. Presiona "Listo" para guardar.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleSubmit}
            ref={formRef}
            className="grid gap-4 py-8 px-8"
          >
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre(s)
              </Label>
              <Input required id="name" name="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastname" className="text-right">
                Apellido(s)
              </Label>
              <Input
                required
                id="lastname"
                name="lastname"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input required id="email" name="email" className="col-span-3" />
            </div>

            {/* //! NUMBERS  */}
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-semibold">
                  Números de teléfono
                </span>
                <Button
                  type="button"
                  size="icon"
                  className="bg-string hover:bg-string/80"
                  onClick={addNumberField}
                >
                  <Plus />
                </Button>
              </div>
              {phoneNumbers.map((telefono, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Label htmlFor={`number-${index}`} className="text-right">
                    Tel. {index + 1}
                  </Label>
                  <Input
                    required
                    id={`number-${index}`}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]+"
                    value={telefono}
                    onChange={(e) => handleNumberChange(e, index)}
                    className="col-span-3"
                  />
                </div>
              ))}
            </div>

            {/* //! ADDRESSES  */}
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground font-semibold">
                  Direcciones
                </span>
                <Button
                  type="button"
                  size="icon"
                  className="bg-string hover:bg-string/80"
                  onClick={addAddressField}
                >
                  <Plus />
                </Button>
              </div>
              {addresses.map((address, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 items-center gap-4"
                >
                  <Label htmlFor={`address-${index}`} className="text-right">
                    # {index + 1}
                  </Label>
                  <Input
                    required
                    id={`address-${index}`}
                    value={address}
                    onChange={(e) => handleAddressChange(e, index)}
                    className="col-span-3"
                  />
                </div>
              ))}
            </div>
          </form>
          <DialogFooter className="sticky bottom-0 bg-card/90 p-4 border-t z-50">
            <Button
              type="submit"
              variant="link"
              onClick={() => formRef.current?.requestSubmit()}
            >
              Listo
            </Button>
          </DialogFooter>
          <ScrollBar />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default NewContact
