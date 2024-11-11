import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(text: string): string {
  return (
    text
      .trim()
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'SN'
  )
}

export function getFullName(name: string, lastname: string): string {
  return [name, lastname].join(' ').trim() || 'Sin nombre'
}
