import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="bg-popover py-4 content h-20">
      <nav className="feature h-full flex justify-between items-center">
        <div className="flex  gap-2 items-center">
          <img src="/appLogo.png" alt="Application Logo" className="size-10" />
          <Link to="/" className="font-bold text-[clamp(1.2rem,4vw,2.2rem)]">
            Contactos
          </Link>
        </div>
        <a
          className="hover:underline"
          href="https://github.com/David-Llanes/app_contactos_prueba_tecnica"
          target="_blank"
        >
          GitHub
        </a>
      </nav>
    </header>
  )
}
