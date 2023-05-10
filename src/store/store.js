import { defineStore } from 'pinia'
import { collection, getDocs} from 'firebase/firestore';
import { auth, db } from '@/main';

export const useGuestStore = defineStore('guests', {
  state: () => ({
    guests: [],
  }),

  actions: {
    async showUserGuest(){
      this.guests = []
      const querySnapshot = await getDocs(collection(db, "guests"));
      querySnapshot.forEach((doc) => {
        if (doc.data().guestOf === auth.currentUser.uid) {
          let guestData = doc.data();
          guestData.id = doc.id;
          this.guests.unshift(guestData);
          console.log(guestData);
        }
      });
    },

    async showAdminGuest(){
      this.guest = []
      const querySnapshot = await getDocs(collection(db, "guests"));
      querySnapshot.forEach((doc) => {
        let guestData = doc.data();
        guestData.id = doc.id;
        this.guests.unshift(guestData);
        console.log(guestData);
      });
    },


  },
})