import { defineStore } from 'pinia'

export const useGrantedStore = defineStore('granted', {
  state: () => ({
    grantedGuests: [],
  }),
 
  actions: {
    grantGuest() {
      
    },
  },
})