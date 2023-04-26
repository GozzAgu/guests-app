<template>
  <NavComponent @signing-out="isSigningOut=true"/>
    <!-- <div class="body" :class="[isDark ? 'dark-mode' : '']"> -->
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

  
      <ToastComponent v-if="showToast"/>
      <LoaderComponent v-if="isSigningOut"/>
      
      <div class="max-w-5xl mx-auto mt-8">
      <div v-if="guests.length > 0" class="flex flex-col m-5">
        <div class="overflow-x-auto shadow-md rounded-lg">
            <div class="inline-block min-w-full align-middle">
                <div class="overflow-hidden">
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
                                <th scope="col" class="py-3 px-1 text-xs font-bold text-left text-gray-700 uppercase">
                                    Access
                                </th>
                                <th scope="col" class="py-3 px-1 text-xs font-bold text-left text-gray-700 uppercase">
                                    Deny
                                </th>
                            </tr>
                        </thead>
                       
                        <tbody v-for="guest in searchGuests" :key="guest" class="divide-y divide-gray-200">
                            <tr>
                              <div class="flex mt-5 justify-center">
                                  <input v-model="checked" :value="guest" id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300">
                                  <label for="checkbox-table-1" class="sr-only">checkbox</label>
                              </div>
                              <td class="guest-text py-4 px-2 text-xs font-medium whitespace-nowrap text-gray-500">{{ guest.name }}</td>
                              <td class="guest-text py-4 px-2 text-xs font-medium whitespace-nowrap text-gray-500">{{ guest.code}}</td>
                              <td class="guest-text py-4 px-2 text-xs font-medium whitespace-nowrap text-gray-500">{{ guest.gender }}</td>
                              <td class="guest-text py-4 px-2 text-xs font-medium whitespace-nowrap text-gray-500">{{ guest.time }}</td>
                              <td class="guest-text py-4 px-2 text-sm font-medium whitespace-nowrap"><i class="ri-thumb-up-line text-green-500 text-md"></i></td>
                              <td class="guest-text py-4 px-2 text-sm font-medium whitespace-nowrap"><i class="ri-thumb-down-line text-red-500 text-md"></i></td>
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
  </template>
  
  <script setup>
  import ToastComponent from '@/components/ToastComponent.vue';
  import NavComponent from '../components/NavComponent.vue';
  import LoaderComponent from '@/components/LoaderComponent.vue';
  import { ref, onMounted, computed } from 'vue';
  import { db } from '../main.js';
  import { collection, getDocs } from 'firebase/firestore';
  import { auth } from '@/main';
  import { onAuthStateChanged } from '@firebase/auth';
  
  // const isDark = ref(false);
  const guests = ref([]);
  const displayName = ref('');
  const checked = ref([])
  const search = ref('');
  const showToast = ref(false);
  const isSigningOut = ref(false);
  const isLoggedIn = ref(false);
  
  // const toggleDark = () => {
  //   isDark.value = !isDark.value;
  // }
  
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
      let guestData = doc.data();
      guestData.id = doc.id;
      guests.value.unshift(guestData);
      console.log(guestData);
    });
  }
  
  </script>
  
  <style lang="scss">
  .body {
    height: 850px;
  }
  .dark-mode {
    background-color: #1f2b38;
    transition: background 1s;
    .tab {
      color: #aab8c6
    }
    .guests {
      background-color: #4a6076;
      .guest-text {
        color: #e0e5eb
      }
    }
    .welcome {
      background-color: #4a6076;
      .welcome-text {
        color: #e0e5eb
      }
    }
    .table {
      background-color: #4a6076;
      .welcome-text {
        color: #e0e5eb
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
  