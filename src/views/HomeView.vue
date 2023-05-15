<template>
  <!-- <div class="body" :class="[isDark ? 'dark-mode' : '']"> -->
    <NavComponent @signing-out="isSigningOut=true"/>
    
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
          <button @click="toggleDark">
            <i v-if="isDark" class="ri-sun-fill text-2xl text-orange-200"></i>
            <i v-else class="ri-moon-clear-fill text-2xl text-gray-400"></i>
          </button>
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
  
    <ModalComponent v-if="showModal" @close="showModal=false" @new-guest="addNewGuest"/>
    <LoaderComponent v-if="isSigningOut"/>
    <trackComponent v-if="showTrackModal" @close-history="showTrackModal=false"/>
  
    <ToastComponent v-if="showToast"/>
    
    <div class="max-w-5xl mx-auto mt-8">
      <div v-if="store.guests.length > 0" class="flex flex-col m-5">
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
                        <thead class="bg-slate-100">
                            <tr>
                              <th scope="col" class="py-3 px-2 text-xs font-bold tracking-wider text-left text-slate-500 uppercase">
                                    Status
                              </th>
                              <th scope="col" class="py-3 px-2 text-xs font-bold tracking-wider text-left text-slate-500 uppercase border-l">
                                  Name
                              </th>
                              <th scope="col" class="py-3 px-2 text-xs font-bold tracking-wider text-left text-slate-500 uppercase">
                                  Code
                              </th>
                              <th scope="col" class="py-3 px-2 text-xs font-bold tracking-wider text-left text-slate-500 uppercase">
                                  Gender
                              </th>
                              <th scope="col" class="py-3 px-2 text-xs font-bold tracking-wider text-left text-slate-500 uppercase">
                                  Time
                              </th>
                              <th scope="col" class="py-3 px-2 text-xs font-medium text-left text-slate-500 uppercase">
                                  
                              </th>
                            </tr>
                        </thead>
                        
                        <tbody v-for="guest in store.guests" :key="guest" class="divide-y divide-gray-200">
                            <tr>
                              <div class="flex justify-center">
                                <div v-if="guest.granted === true" class="py-2">
                                  <td class="guest-text px-2 text-s font-medium whitespace-nowrap text-green-500"><i class="ri-checkbox-circle-line text-green-400 text-lg"></i></td>
                                  <p class="text-xs text-green-500">Access</p>
                                </div>

                                <div v-else class="py-2">
                                  <td class="guest-text px-2 text-s font-medium whitespace-nowrap text-orange-500"><i class="ri-timer-2-line text-orange-300 text-lg"></i></td>
                                  <p class="text-xs text-orange-500">Pending</p>
                                </div>
                              </div>
                              <td class="guest-text py-4 px-2 text-xs font-normal whitespace-nowrap text-slate-500 border-l">{{ guest.name }}</td>
                              <td class="guest-text py-4 px-2 text-xs font-normal whitespace-nowrap text-slate-500">{{ guest.code}}</td>
                              <td class="guest-text py-4 px-2 text-xs font-normal whitespace-nowrap text-slate-500">{{ guest.gender }}</td>
                              <td class="guest-text py-4 px-2 text-xs font-normal whitespace-nowrap text-slate-500">{{ guest.time }}</td>
                              <td class="guest-text py-4 px-2 text-sm font-medium whitespace-nowrap">
                                <svg class="text-red-400" @click="deleteGuest(guest)" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                                  <g fill="currentColor">
                                    <path d="M3 6.386c0-.484.345-.877.771-.877h2.665c.529-.016.996-.399 
                                      1.176-.965l.03-.1l.115-.391c.07-.24.131-.45.217-.637c.338-.739.964-1.252 
                                      1.687-1.383c.184-.033.378-.033.6-.033h3.478c.223 0 .417 0 .6.033c.723.131 
                                      1.35.644 1.687 1.383c.086.187.147.396.218.637l.114.391l.03.1c.18.566.74.95 
                                      1.27.965h2.57c.427 0 .772.393.772.877s-.345.877-.771.877H3.77c-.425 0-.77-.393-.77-.877Z"
                                    />
                                    <path fill-rule="evenodd" d="M9.425 11.482c.413-.044.78.273.821.707l.5 
                                      5.263c.041.433-.26.82-.671.864c-.412.043-.78-.273-.821-.707l-.5-5.263c-.041-.434.26-.821.671-.864Zm5.15 
                                      0c.412.043.713.43.671.864l-.5 5.263c-.04.434-.408.75-.82.707c-.413-.044-.713-.43-.672-.864l.5-5.264c.041-.433.409-.75.82-.707Z" 
                                      clip-rule="evenodd"
                                    />
                                    <path d="M11.596 22h.808c2.783 0 4.174 0 5.08-.886c.904-.886.996-2.339 
                                      1.181-5.245l.267-4.188c.1-1.577.15-2.366-.303-2.865c-.454-.5-1.22-.5-2.753-.5H8.124c-1.533 
                                      0-2.3 0-2.753.5c-.454.5-.404 1.288-.303 2.865l.267 4.188c.185 2.906.277 4.36 1.182 5.245c.905.886 2.296.886 5.079.886Z" opacity=".5"
                                    />
                                  </g>
                                </svg>
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
  
    <FooterComponent @modal="showModal=true"/>
  </template>
  
  <script setup>
  import ModalComponent from '@/components/ModalComponent.vue';
  import ToastComponent from '@/components/ToastComponent.vue';
  import trackComponent from '@/components/trackComponent.vue';
  import NavComponent from '@/components/NavComponent.vue';
  import FooterComponent from '@/components/FooterComponent.vue';
  import LoaderComponent from '@/components/LoaderComponent.vue';
  import { auth, db } from '@/main';
  import { onAuthStateChanged } from '@firebase/auth';
  import { ref, onMounted } from 'vue';
  import { collection, addDoc, doc, deleteDoc } from 'firebase/firestore';
  import { useGuestStore } from '@/store/store';
  
  const displayName = ref('');
  const isLoggedIn = ref(false);
  const isDark = ref(false);
  const showModal = ref(false);
  const showTrackModal = ref(false);
  const store = useGuestStore();
  const search = ref('');
  const showToast = ref(false);
  const isSigningOut = ref(false);
  const loading = ref(false);
  
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

    // store.guests.unshift(newGuest);
    showToast.value = true;
    setTimeout(function(){
      showToast.value = false;
    }, 3000);

    console.log(docRef);
  }
  
  const deleteGuest = async (guestID) => {
    if(confirm("Do you want to delete guest?")){
      store.guests.splice(store.guests.indexOf(guestID), 1);
      try {
        await deleteDoc(doc(db, `guests`, guestID.id));
      }catch(error) {
        console.log(error)
      }
    }
  };
  
  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        isLoggedIn.value = true;
        displayName.value = auth.currentUser.displayName;
      } else {
        isLoggedIn.value = false;
      }
      store.showUserGuest();
    });
  });

  </script>
  
  <style lang="scss">
  .body {
  height: 850px;
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