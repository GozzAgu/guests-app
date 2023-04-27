<template>
<!-- <div class="body" :class="[isDark ? 'dark-mode' : '']"> -->
  <NavComponent @signing-out="isSigningOut=true"/>
  
  <div class="text-center">
    <p class="font-bold text-gray-600 mt-2 animate-bounce">App in progress</p>
    <div class="loader m-auto mt-3"></div>
  </div>

  <div class="guests max-w-5xl mx-auto mt-8">
    <div class="p-3 flex justify-between md:justify-around lg:justify-around bg-blue-50 m-5 rounded-lg">
      <p class="welcome-text font-bold text-gray-600"> <i @click="showTrackModal=true" class="ri-shield-user-line text-blue-400"></i> Welcome, {{ displayName }}</p>
      <div class="">
        <button @click="toggleDark">
          <i v-if="isDark" class="ri-sun-fill text-2xl text-orange-200"></i>
          <i v-else class="ri-moon-clear-fill text-2xl text-gray-400"></i>
        </button>
      </div>  
    </div>
  </div>

  <div class="guests max-w-5xl mx-auto mt-8">
    <div class="p-3 flex justify-between md:justify-around lg:justify-around bg-blue-100 m-5 rounded-lg gap-x-2">
      <h1 class="text-center font-semibold text-gray-600 guest-text mt-1"><i class="guest-text ri-user-fill text-gray-600 mr-1">{{ searchGuests.length }}</i> GUESTS </h1>
      <div class="flex bg-white  rounded-lg gap-x-1 w-40">
        <i class="ri-search-2-line pl-1 text-gray-400 mt-1"></i>
        <input v-model="search" class=" w-full focus:outline-none" type="text" placeholder="search for guest" />
      </div>  
    </div>
  </div>

  <ModalComponent v-if="showModal" @close="showModal=false" @new-guest="addNewGuest"/>
  <LoaderComponent v-if="isSigningOut"/>
  <trackComponent v-if="showTrackModal" @close-history="showTrackModal=false"/>

  <ToastComponent v-if="showToast"/>
  
  <div class="max-w-5xl mx-auto mt-8">
    <div v-if="guests.length > 0" class="flex flex-col m-5">
      <div class="overflow-x-auto shadow-md rounded-lg">
          <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden">
                <div v-if="loading" class="loading">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <table class="guests min-w-full divide-y divide-gray-200 table-fixed">
                      <thead class="bg-blue-50">
                          <tr>
                              <th scope="col" class="p-3">
                                  <div class="flex items-center">
                                      <!-- <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"> -->
                                      <!-- <label for="checkbox-all" class="sr-only">checkbox</label> -->
                                  </div>
                              </th>
                              <th scope="col" class="py-3 px-1 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">
                                  Name
                              </th>
                              <th scope="col" class="py-3 px-1 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">
                                  Code
                              </th>
                              <th scope="col" class="py-3 px-1 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">
                                  Gender
                              </th>
                              <th scope="col" class="py-3 px-1 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">
                                  Time
                              </th>
                              <th scope="col" class="py-3 px-1 text-xs font-medium text-left text-gray-700 uppercase">
                                  
                              </th>
                          </tr>
                      </thead>
                      
                      <tbody v-for="guest in searchGuests" :key="guest" class="divide-y divide-gray-200">
                          <tr>
                            <td class="guest-text py-4 px-2 text-s font-medium whitespace-nowrap text-green-300"><i class="ri-checkbox-circle-fill"></i></td>
                            <td class="guest-text py-4 px-2 text-xs font-medium whitespace-nowrap text-gray-500">{{ guest.name }}</td>
                            <td class="guest-text py-4 px-2 text-xs font-medium whitespace-nowrap text-gray-500">{{ guest.code}}</td>
                            <td class="guest-text py-4 px-2 text-xs font-medium whitespace-nowrap text-gray-500">{{ guest.gender }}</td>
                            <td class="guest-text py-4 px-2 text-xs font-medium whitespace-nowrap text-gray-500">{{ guest.time }}</td>
                            <td class="guest-text py-4 px-2 text-sm font-medium whitespace-nowrap"><i @click="deleteGuest(guest)" class="ri-delete-bin-5-fill text-red-400"></i></td>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    </div>

    <div v-else class="flex justify-center">
      <div> 
        <i class="ri-file-paper-line text-gray-300 text-7xl"></i>
        <p class="font-serif text-gray-500">No Guests ! </p>
      </div>
    </div>
    
  </div>

  <FooterComponent @modal="showModal=true"/>
</template>

<script setup>
import ModalComponent from '../components/ModalComponent.vue';
import ToastComponent from '@/components/ToastComponent.vue';
import trackComponent from '@/components/trackComponent.vue';
import NavComponent from '../components/NavComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import { auth } from '@/main';
import { onAuthStateChanged } from '@firebase/auth';
import { ref, onMounted, computed } from 'vue';
import { db } from '../main.js';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';

const displayName = ref('');
const isLoggedIn = ref(false);
const isDark = ref(false);
const showModal = ref(false);
const showTrackModal = ref(false);
const guests = ref([]);
const search = ref('');
const showToast = ref(false);
const isSigningOut = ref(false);
const loading = ref(false);

const toggleDark = () => {
isDark.value = !isDark.value;
}

const addNewGuest = async(newGuest) => {
console.log(newGuest)
loading.value = true;
setTimeout(function(){
  loading.value = false;
}, 2000);
const guestOf = auth.currentUser.uid;
const docRef = await addDoc(collection(db, "guests"), {
    ...newGuest,
    guestOf
});
guests.value.unshift(newGuest);
showToast.value = true;
setTimeout(function(){
  showToast.value = false;
}, 3000);
console.log(docRef);
}

const deleteGuest = async (guestID) => {
if(confirm("Do you want to delete guest?")){
  guests.value.splice(guests.value.indexOf(guestID), 1);
  try {
    await deleteDoc(doc(db, `guests`, guestID.id));
  }catch(error) {
    console.log(error)
  }
}
};

const searchGuests = computed(() => {
return guests.value.filter((guest) => {
  return guest.name.toLowerCase().match(search.value.toLowerCase());
});
});

onMounted(() => {
onAuthStateChanged(auth, (user) => {
  if(user) {
    isLoggedIn.value = true;
    displayName.value = auth.currentUser.displayName;
  } else {
    isLoggedIn.value = false;
  }
  showGuest();
});
});

const showGuest = async() => {
const querySnapshot = await getDocs(collection(db, "guests"));
querySnapshot.forEach((doc) => {
  if (doc.data().guestOf === auth.currentUser.uid) {
    let guestData = doc.data();
    guestData.id = doc.id;
    guests.value.unshift(guestData);
    console.log(guestData);
  }
});
}

</script>

<style lang="scss">
.body {
height: 850px;
}
// .dark-mode {
//   background-color: #1f2b38;
//   transition: background 1s;
//   .tab {
//     color: #aab8c6
//   }
//   .guests {
//     background-color: #4a6076;
//     .guest-text {
//       color: #e0e5eb
//     }
//   }
//   .welcome {
//     background-color: #4a6076;
//     .welcome-text {
//       color: #e0e5eb
//     }
//   }
//   .table {
//     background-color: #4a6076;
//     .welcome-text {
//       color: #e0e5eb
//     }
//   }
// }

.loader {
border: 5px solid #f3f3f3;
border-top: 5px solid rgb(100, 161, 252);
border-radius: 50%;
width: 30px;
height: 30px;
animation: spin 3s linear infinite;
}

@keyframes spin {
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
}

.loading span {
display: inline-block;
vertical-align: middle;
width: .6em;
height: .6em;
margin: .19em;
background: #007DB6;
border-radius: .6em;
animation: loading 1s infinite alternate;
}

/*
* Dots Colors
* Smarter targeting vs nth-of-type?
*/
.loading span:nth-of-type(2) {
background: #008FB2;
animation-delay: 0.2s;
}
.loading span:nth-of-type(3) {
background: #009B9E;
animation-delay: 0.4s;
}
.loading span:nth-of-type(4) {
background: #67badb;
animation-delay: 0.6s;
}
.loading span:nth-of-type(5) {
background: #6cccf1;
animation-delay: 0.8s;
}
.loading span:nth-of-type(6) {
background: #73d2f8;
animation-delay: 1.0s;
}
.loading span:nth-of-type(7) {
background: #89deff;
animation-delay: 1.2s;
}

/*
* Animation keyframes
* Use transition opacity instead of keyframes?
*/
@keyframes loading {
0% {
  opacity: 0;
}
100% {
  opacity: 1;
}
}
</style>
