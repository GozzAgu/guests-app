<template>
  <NavComponent @signing-out="isSigningOut=true"/>
  <div class="bg-white dark:bg-slate-700 h-full pb-1">
    <!-- <div class="text-center">
      <p class="font-bold text-gray-600 mt-2 animate-bounce">App in progress</p>
      <div class="loader m-auto mt-3"></div>
    </div> -->

    <div class="guests max-w-5xl mx-auto mt-8">
    <div class="p-3 flex justify-between md:justify-around lg:justify-around bg-blue-50 m-5 rounded-3xl">
      <p class="welcome-text font-semibold text-slate-500">
        <svg @click="showTrackModal=true" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <g fill="currentColor">
            <circle cx="12" cy="6" r="4"/>
            <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5Z" opacity=".5"/>
          </g>
        </svg>
        Welcome, {{ displayName }}
      </p>
      
      <div class="">
        <!-- <button @click="toggleDark">
          <i v-if="isDark" class="ri-sun-fill text-2xl text-orange-200"></i>
          <i v-else class="ri-moon-clear-fill text-2xl text-gray-400"></i>
        </button> -->
      </div>  
    </div>
  </div>

  <div class="guests max-w-5xl mx-auto mt-8">
      <div class="pl-3 pr-3 pt-4 pb-4 flex justify-between md:justify-around lg:justify-around bg-blue-50 m-5 rounded-3xl gap-x-2">
        <div class="flex">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="currentColor"><circle cx="15" cy="6" r="3" opacity=".4"/><ellipse cx="16" cy="17" opacity=".4" rx="5" ry="3"/><circle cx="9.001" cy="6" r="4"/><ellipse cx="9.001" cy="17.001" rx="7" ry="4"/></g></svg>
          <h1 class="text-center font-semibold text-slate-500 guest-text mt-1">{{ store.guests.length }} GUESTS </h1>
        </div>
        
        <div class="flex bg-white rounded-2xl gap-x-1 w-40">
          <i class="ri-search-2-line pl-1 text-slate-500 mt-1"></i>
          <input v-model="search" class=" w-full focus:outline-none rounded-2xl" type="text" placeholder="search for guest" />
        </div>  
      </div>
    </div>

    <ToastComponent v-if="showToast"/>
    <LoaderComponent v-if="isSigningOut"/>
    
    <div class="max-w-5xl mx-auto mt-8 mb-16">
    <div v-if="store.guests.length > 0" class="flex flex-col m-5">
      <div class="overflow-x-auto shadow-md rounded-lg">
          <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden">
                  <table class="guests min-w-full divide-y divide-gray-200 table-fixed">
                      <thead class="bg-slate-100">
                          <tr>
                              <th scope="col" class="p-3">
                                  <div class="flex items-center">
                                      <!-- <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300"> -->
                                      <!-- <label for="checkbox-all" class="sr-only">checkbox</label> -->
                                  </div>
                              </th>
                              <th scope="col" class="py-3 px-2 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">
                                  Name
                              </th>
                              <th scope="col" class="py-3 px-2 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">
                                  Code
                              </th>
                              <th scope="col" class="py-3 px-2 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">
                                  Gender
                              </th>
                              <th scope="col" class="py-3 px-2 text-xs font-bold tracking-wider text-left text-gray-700 uppercase">
                                  Time
                              </th>
                              <th scope="col" class="py-3 px-1 text-xs font-bold text-left text-gray-700 uppercase">
                                  Access
                              </th>
                          </tr>
                      </thead>

                     
                      
                      <tbody v-for="guest in store.guests" :key="guest" class="divide-y divide-gray-200">
                          <tr>
                            <div class="flex mt-6 justify-center">
                                <input v-model="checked" :value="guest" id="checkbox-table-1" type="checkbox" class="w-3 h-3 text-blue-600 bg-gray-100 rounded border-gray-300">
                                <label for="checkbox-table-1" class="sr-only">checkbox</label>
                            </div>
                            <td class="guest-text py-3 px-2 text-xs font-normal whitespace-nowrap text-slate-500">{{ guest.name }}</td>
                            <td class="guest-text py-3 px-2 text-xs font-normal whitespace-nowrap text-slate-500">{{ guest.code}}</td>
                            <td class="guest-text py-3 px-2 text-xs font-normal whitespace-nowrap text-slate-500">{{ guest.gender }}</td>
                            <td class="guest-text py-3 px-2 text-xs font-normal whitespace-nowrap text-slate-500">{{ guest.time }}</td>
                            <td class="guest-text py-2 px-1 text-sm font-medium whitespace-nowrap">
                              <button>
                                <div v-if="!guest.granted" @click="grant(guest)" class="bg-slate-400 shadow mt-2 mb-2 pt-2 pb-2 pl-4 pr-4 rounded-lg">
                                  <p class="text-xs text-slate-50">Grant</p>
                                </div>

                                <div v-else>
                                  <i class="ri-checkbox-circle-line text-green-400 text-lg ml-2"></i>
                                  <p class="text-xs text-green-300 ml-2">Granted</p>
                                </div>
                              </button>
                            </td>
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
  </div>
</template>

<script setup>
import ToastComponent from '@/components/ToastComponent.vue';
import NavComponent from '@/components/NavComponent.vue';
import LoaderComponent from '@/components/LoaderComponent.vue';
import { ref, onMounted } from 'vue';
import { doc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/main';
import { onAuthStateChanged } from '@firebase/auth';
import { useGuestStore } from '@/store/store';

const store = useGuestStore();
const displayName = ref('');
const checked = ref([])
const search = ref('');
const showToast = ref(false);
const isSigningOut = ref(false);
const isLoggedIn = ref(false);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if(user) {
      isLoggedIn.value = true;
      displayName.value = auth.currentUser.displayName;
    } else {
      isLoggedIn.value = false;
    }
    store.showAdminGuest();
  });
});

const grant = async(guestID) => {
  if(confirm("Do you want to grant access?") === true){
    updateDoc(doc(db, "guests", guestID.id),
    {
      granted: !guestID.granted,
      name: guestID.name,
      code: guestID.code,
      gender: guestID.gender,
      time: guestID.time,
      date: guestID.date
    } 
  )
  // .then(()=>{
  //   store.updateGuestStatus(guestID.id)
  // })
  }
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
