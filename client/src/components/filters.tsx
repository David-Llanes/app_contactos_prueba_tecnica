import { Search } from 'lucide-react'
import { Input } from './ui/input'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  defaultValue: string
}

function Filters({ onChange, defaultValue }: Props) {
  return (
    <search className="grow">
      <form className="relative h-10">
        <Search className="size-5 text-muted-foreground absolute left-2 bottom-0 top-0 my-auto pointer-events-none" />
        <Input
          className="pl-9 h-full bg-muted"
          type="search"
          defaultValue={defaultValue}
          placeholder="Buscar"
          onChange={onChange}
        />
      </form>
    </search>
  )
}

export default Filters
