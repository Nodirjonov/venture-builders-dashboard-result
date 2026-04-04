import { create } from 'zustand'

interface UpgradeStore {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
}

export const useUpgradeStore = create<UpgradeStore>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}))
