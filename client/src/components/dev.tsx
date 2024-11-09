import { ThemeToggle } from './theme-toggle'

export function DevTools() {
  if (process.env.NODE_ENV === 'production') return null

  return (
    <div className="fixed bottom-12 right-4 z-50 flex items-center justify-center gap-2 rounded-md bg-background p-2 text-sm font-bold text-foreground shadow-sm outline outline-1 outline-secondary opacity-40 hover:opacity-100">
      <div className="w-10 text-center">
        {/* MEDIA QUERY HELPER */}
        <span className="sm:hidden">xs</span>
        <span className="hidden sm:block md:hidden">sm</span>
        <span className="hidden md:block lg:hidden">md</span>
        <span className="hidden lg:block xl:hidden">lg</span>
        <span className="hidden xl:block 2xl:hidden">xl</span>
        <span className="max-2xl:hidden">2xl</span>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </div>
  )
}
