import { defineStore } from 'pinia'
import { collection, onSnapshot} from 'firebase/firestore';
import { auth, db } from '@/main';

export const useGuestStore = defineStore('guests', {
  state: () => ({
    guests: [],
    grantedGuests: [],
  }),

  actions: {
    async showUserGuest(){
      const querySnapshot = collection(db, "guests")
      await onSnapshot(querySnapshot, (GuestsSnapshot) => {
        this.guests = [];
        GuestsSnapshot.forEach((doc) => {
          if (doc.data().guestOf === auth.currentUser.uid) {
          let guestData = doc.data();
          guestData.id = doc.id;
          this.guests.unshift(guestData);
          console.log(guestData);
        }
        });
      })
    },

    async showAdminGuest(){
      const querySnapshot = collection(db, "guests")
      await onSnapshot(querySnapshot, (GuestsSnapshot) => {
        this.guests = [];
        GuestsSnapshot.forEach((doc) => {
          let guestData = doc.data();
          guestData.id = doc.id;
          this.guests.unshift(guestData);
          console.log(guestData);
        });
      })
    },

    updateGuestStatus (id){
      const idx = this.guests.findIndex (guest => guest.id === id);
      this.guests[idx].granted = !this.guests[idx].granted;
      console.log(this.guests);
    }
  },
})