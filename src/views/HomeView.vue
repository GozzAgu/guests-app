<template>
  <div class="body" :class="[isDark ? 'dark-mode' : '']">
    <NavComponent/>
    <ToastComponent v-if="showToast"/>
    <div class="text-center">
      <p class="font-bold text-gray-600 mt-2 animate-bounce">App in progress</p>
      <div class="loader m-auto mt-3"></div>
    </div>

    <div class="welcome bg-blue-50 m-5 lg:ml-60 lg:mr-60 h-20 rounded-2xl flex justify-between md:justify-around">
      <p class="welcome-text p-5 font-bold text-large text-gray-600">Welcome, {{ displayName }}</p>
      <div class="p-5">
        <button @click="toggleDark">
          <i v-if="isDark" class="welcome-font ri-contrast-2-line text-3xl text-gray-600"></i>
          <i v-else class="ri-contrast-2-fill text-3xl text-gray-600"></i>
        </button>
      </div> 
    </div>

    <div class="guests bg-blue-50 m-5 lg:ml-60 lg:mr-60 rounded-2xl">
      <div class="p-5 flex justify-between md:justify-around lg:justify-around">
        <h1 class="text-center font-bold text-gray-600 mt-1 guest-text"><i class="ri-file-user-fill"></i> GUESTS </h1>
        <input v-model="search" class="border-2 p-1 rounded-lg w-40" type="text" placeholder="search for guest" />
      </div>
      <div class="flex justify-around">
        <div class="bg-opacity-0 p-3 flex justify-around bg-blue-50 border-double border-2 rounded-xl m-2 w-40">
          <p class="guest-text text-gray-700"> Total </p>
          <i class="guest-text ri-user-fill text-gray-600 ">{{ guests.length }}</i>
        </div>
        <div class="bg-opacity-0 p-3 flex justify-around bg-blue-50 border-double border-2 rounded-xl m-2 w-40">
          <p class="guest-text text-gray-700"> Selected </p>
          <i class="guest-text ri-user-follow-fill text-gray-600">{{ checked.length }}</i>
        </div>
      </div>
    </div>

    <ModalComponent v-if="showModal" @close="showModal=false" @new-guest="addNewGuest"/>
    <trackComponent v-if="showTrackModal" @close-history="showTrackModal=false"/>

    <div class="max-w-2xl mx-auto mt-8">
      <div class="flex flex-col m-5">
        <div class="overflow-x-auto shadow-md rounded-xl">
            <div class="inline-block min-w-full align-middle">
                <div class="overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200 table-fixed">
                        <thead class="bg-blue-50">
                            <tr>
                                <th scope="col" class="p-3">
                                    <div class="flex items-center">
                                        <!-- <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"> -->
                                        <!-- <label for="checkbox-all" class="sr-only">checkbox</label> -->
                                    </div>
                                </th>
                                <th scope="col" class="py-3 px-1 text-sm font-bold tracking-wider text-left text-gray-700 uppercase">
                                    Name
                                </th>
                                <th scope="col" class="py-3 px-1 text-sm font-bold tracking-wider text-left text-gray-700 uppercase">
                                    Code
                                </th>
                                <th scope="col" class="py-3 px-1 text-sm font-medium text-left text-gray-700 uppercase">
                                    
                                  </th>
                                <th scope="col" class="py-3 px-1 text-sm font-bold tracking-wider text-left text-gray-700 uppercase">
                                    Gender
                                </th>
                                <th scope="col" class="py-3 px-1 text-sm font-bold tracking-wider text-left text-gray-700 uppercase">
                                    Time
                                </th>
                                <th scope="col" class="py-3 px-1 text-sm font-medium text-left text-gray-700 uppercase">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody v-for="(guest, index) in searchGuests" :key="index" class="divide-y divide-gray-200">
                            <tr class="hover:bg-gray-50">
                                <td class="p-3 w-3">
                                    <div class="flex items-center">
                                        <input v-model="checked" :value="guest" id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300">
                                        <label for="checkbox-table-1" class="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">{{ guest.name }}</td>
                                <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">{{ guest.code}}</td>
                                <td class="py-4 px-2 text-sm font-medium whitespace-nowrap"><i  @click="showTrackModal=true" class="text-blue-300 ri-mind-map"></i></td>
                                <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">{{ guest.gender }}</td>
                                <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">{{ guest.time }}</td>
                                <td class="py-4 px-2 text-sm font-medium whitespace-nowrap"><i @click="deleteGuest(index)" class="ri-delete-bin-5-fill text-red-400"></i></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>

    <FooterComponent @modal="showModal=true"/>
  </div>
  
</template>

<script setup>
import ModalComponent from '../components/ModalComponent.vue';
import ToastComponent from '@/components/ToastComponent.vue';
import trackComponent from '@/components/trackComponent.vue';
import NavComponent from '../components/NavComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { auth } from '@/main';
import { onAuthStateChanged } from '@firebase/auth';
import { ref,  onMounted, computed } from 'vue';
import { db } from '../main.js';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const displayName = ref('');
const isLoggedIn = ref(false);
const isDark = ref(false);
const showModal = ref(false);
const showTrackModal = ref(false);
const guests = ref([]);
const checked = ref([]);
const search = ref('');
const showToast = ref(false)

const toggleDark = () => {
  isDark.value = !isDark.value;
}

const addNewGuest = async(newGuest) => {
  console.log(newGuest)
  const guestOf = auth.currentUser.uid;
  const docRef = await  addDoc(collection(db, "guests"), {
      ...newGuest,
      guestOf
  });
  guests.value.unshift(newGuest);
  showToast.value = true;
  setTimeout(function(){
    showToast.value = false;
  }, 3000);
  console.log(docRef)
}

// const showGuest = (index, guest) => {
//   console.log(index, guest)
//   alert(guest.name)
// }

const deleteGuest = async (index) => {
  guests.value.splice(index, 1);
}

const searchGuests = computed(() => {
  return guests.value.filter((guest) => {
    return guest.name.toLowerCase().match(search.value.toLowerCase());
  })
})

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if(user) {
      isLoggedIn.value = true;
      displayName.value = auth.currentUser.displayName;
    } else {
      isLoggedIn.value = false;
    }
  });
});

onMounted(async() => {
  const querySnapshot = await getDocs(collection(db, 'guests'));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data())
    guests.value.push(doc.data())
  })
})
</script>

<style lang="scss">
.body {
  height: 850px;
}
.dark-mode {
  background-color: #2c3e50;
  transition: background 1s;
  .tab {
    color: #aab8c6
  }
  .guests {
    background-color: #4a6076;
    .guest-text {
      color: #aab8c6
    }
  }
  .welcome {
    background-color: #4a6076;
    .welcome-text {
      color: #aab8c6
    }
    .welcome-font {
      color: #aab8c6
    }
  }
}

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
</style>
