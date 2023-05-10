import { defineStore } from 'pinia'

export const useGuestStore = defineStore('guests', {
  state: () => ({
    guests: [],
  }),
 
  actions: {
    grantGuest() {
      
    },
  },
})