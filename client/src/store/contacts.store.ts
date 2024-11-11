import { Contact } from '@/types'
import { create } from 'zustand'

interface State {
  contacts: Contact[]
}

interface Actions {
  getAll: () => Contact[]
  add: (contact: Contact) => void
  update: (contact: Contact) => void
  remove: (id: string) => void
  init: (contacts: Contact[]) => void
}

export const useContactsStore = create<State & Actions>()((set, get) => ({
  contacts: [],
  getAll: () => get().contacts,
  add: (contact) =>
    set((state) => ({ contacts: [...state.contacts, contact] })),
  update: (contact) =>
    set((state) => ({
      contacts: state.contacts.map((c) =>
        c.id === contact.id ? { ...c, ...contact } : c
      ),
    })),
  remove: (id) =>
    set((state) => ({
      contacts: state.contacts.filter((c) => c.id.toString() !== id),
    })),
  init: (contacts) => set({ contacts }),
}))
