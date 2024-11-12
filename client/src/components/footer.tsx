import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-popover content h-12 content-center">
      <div className="feature flex items-center justify-between">
        <a
          className="hover:underline flex gap-2 items-center text-xs font-bold"
          href="https://github.com/David-Llanes/app_contactos_prueba_tecnica"
          target="_blank"
        >
          IR AL CÓDIGO FUENTE <Github className="size-5" />
        </a>
        <span className="font-bold text-xs">PRUEBA TÉCNICA</span>
      </div>
    </footer>
  )
}
