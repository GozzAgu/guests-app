<template>
    <div class="body" :class="[isDark ? 'dark-mode' : '']">
      <div class="text-center">
        <p class="font-bold text-gray-600 mt-2 animate-bounce">App in progress</p>
        <div class="loader m-auto mt-3"></div>
      </div>
  
      <div class="guests bg-blue-50 m-5 lg:ml-60 lg:mr-60 rounded-2xl">
        <div class="p-5 flex justify-between md:justify-around lg:justify-around">
          <h1 class="text-center font-bold text-gray-600 mt-1 guest-text"><i class="ri-file-user-fill"></i> GUESTS </h1>
          
          <div class="flex bg-white border-2 rounded-lg gap-x-1 w-40">
            <i class="ri-search-2-line pl-2 mt-1"></i>
            <input v-model="search" class="p-1 w-full focus:outline-none" type="text" placeholder="search for guest" />
          </div>  
        </div>
        <div class="flex justify-around">
          <div class="bg-opacity-0 p-3 flex justify-around bg-blue-50 border-dotted border-2 rounded-xl m-2 w-40">
            <p class="guest-text text-gray-700"> Total </p>
            <i class="guest-text ri-user-fill text-gray-600 ">{{ guests.length }}</i>
          </div>
          <div class="bg-opacity-0 p-3 flex justify-around bg-blue-50 m-2 w-40">
            <button @click="toggleDark">
                <i v-if="isDark" class="ri-sun-fill text-2xl text-orange-200"></i>
                <i v-else class="ri-moon-clear-fill text-2xl text-gray-600"></i>
            </button>
          </div>
        </div>
      </div>
  
      <ToastComponent v-if="showToast"/>
      
      <div class="max-w-2xl mx-auto mt-8">
        <div v-if="guests.length > 0" class="flex flex-col m-5">
          <div class="overflow-x-auto shadow-md rounded-xl">
              <div class="inline-block min-w-full align-middle">
                  <div class="overflow-hidden">
                      <table class="guests min-w-full divide-y divide-gray-200 table-fixed">
                          <thead class="bg-blue-50">
                              <tr>
                                  <th scope="col" class="py-3 px-3 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">
                                      Name
                                  </th>
                                  <th scope="col" class="py-3 px-3 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">
                                      Code
                                  </th>
                                  <th scope="col" class="py-3 px-3 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">
                                      Gender
                                  </th>
                                  <th scope="col" class="py-3 px-3 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">
                                      Time
                                  </th>
                              </tr>
                          </thead>
                         
                          <tbody v-for="guest in searchGuests" :key="guest" class="divide-y divide-gray-200">
                              <tr>
                                <td class="guest-text py-4 px-3 text-xs font-medium whitespace-nowrap text-gray-500">{{ guest.name }}</td>
                                <td class="guest-text py-4 px-3 text-xs font-medium whitespace-nowrap text-gray-500">{{ guest.code}}</td>
                                <td class="guest-text py-4 px-3 text-xs font-medium whitespace-nowrap text-gray-500">{{ guest.gender }}</td>
                                <td class="guest-text py-4 px-3 text-xs font-medium whitespace-nowrap text-gray-500">{{ guest.time }}</td>
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
      <nav class="guests fixed bottom-0 right-0 left-0 bg-blue-50" aria-label="Page navigation">
        <ul class="guests list-style-none flex justify-center gap-x-2 mt-2 mb-1 bg-blue-50">
          <li>
            <a
              class="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
              >Previous</a
            >
          </li>
          <li>
            <a
              class="relative block rounded bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-700 transition-all duration-300"
              href="#!"
              >1
              <span
                class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]"
                >(current)</span
              >
            </a
            >
          </li>
          <li aria-current="page">
            <a
            class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100  dark:text-gray-500 dark:hover:bg-blue-300 dark:hover:text-white"
              href="#!"
              >2 
            </a>
          </li>
          <li>
            <a
              class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-gray-500 dark:hover:bg-blue-300 dark:hover:text-white"
              href="#!"
              >3</a
            >
          </li>
          <li>
            <a
              class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-gray-500 dark:hover:bg-blue-300 dark:hover:text-white"
              href="#!"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </template>
  
  <script setup>
  import ToastComponent from '@/components/ToastComponent.vue';
  import { auth } from '@/main';
  import { onAuthStateChanged } from '@firebase/auth';
  import { ref, onMounted, computed } from 'vue';
  import { db } from '../main.js';
  import { collection, getDocs } from 'firebase/firestore';
  
  const displayName = ref('');
  const isLoggedIn = ref(false);
  const isDark = ref(false);
  const guests = ref([]);
  const search = ref('');
  const showToast = ref(false);
  
  const toggleDark = () => {
    isDark.value = !isDark.value;
  }
  
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
    const guestOf = auth.currentUser.uid;
    const querySnapshot = await getDocs(collection(db, "guests" + ' ' + guestOf));
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
  