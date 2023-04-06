<template>
  <div class="body" :class="[isDark ? 'dark-mode' : '']">
    <NavComponent/>

    <div class="welcome bg-blue-50 m-5 h-20 rounded-2xl flex justify-between md:justify-around">
      <p class="welcome-text p-5 font-bold text-xl text-gray-600">Welcome {{ displayName }}</p>
      <div class="p-5">
        <button @click="toggleDark">
          <i v-if="isDark" class="welcome-font ri-contrast-2-line text-3xl text-gray-600"></i>
          <i v-else class="ri-contrast-2-fill text-3xl text-gray-600"></i>
        </button>
      </div> 
    </div>

    <div class="guests bg-blue-50 m-5 rounded-2xl">
      <div class="p-5 flex justify-between">
        <h1 class="text-center font-bold text-gray-600 mt-1 guest-text"><i class="ri-file-user-fill"></i> GUESTS </h1>
        <input class="border-2 p-1 rounded-lg w-40" type="text" placeholder="search for guest" />
      </div>
      <div class="flex justify-around">
        <div class="bg-opacity-0 p-3 flex justify-around bg-blue-50 border-double border-2 rounded-xl m-2 w-40">
          <p class="guest-text text-gray-700"> Total </p>
          <i class="guest-text ri-user-fill text-gray-600 "></i>
        </div>
        <div class="bg-opacity-0 p-3 flex justify-around bg-blue-50 border-double border-2 rounded-xl m-2 w-40">
          <p class="guest-text text-gray-700"> Selected </p>
          <i class="guest-text ri-user-follow-fill text-gray-600"></i>
        </div>
      </div>
    </div>

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
                                    <input id="checkbox-all" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300">
                                    <label for="checkbox-all" class="sr-only">checkbox</label>
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
                            <th scope="col" class="py-3 px-2 text-xs font-medium tracking-wider text-left text-gray-700 uppercase">
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200">
                        <tr class="hover:bg-gray-50">
                            <td class="p-3 w-3">
                                <div class="flex items-center">
                                    <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300">
                                    <label for="checkbox-table-1" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">Gozie</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">1234</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">Male</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">11:00</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap"><i class="ri-delete-bin-5-fill text-red-400"></i></td>
                        </tr>
                        <tr class="hover:bg-gray-100">
                            <td class="p-3 w-3">
                                <div class="flex items-center">
                                    <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300">
                                    <label for="checkbox-table-1" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">Gozie</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">1234</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">Male</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">11:00</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap"><i class="ri-delete-bin-5-fill text-red-400"></i></td>
                        </tr>
                        <tr class="hover:bg-gray-100">
                            <td class="p-3 w-3">
                                <div class="flex items-center">
                                    <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300">
                                    <label for="checkbox-table-1" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">Gozie</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">1234</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">Male</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">11:00</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap"><i class="ri-delete-bin-5-fill text-red-400"></i></td>
                        </tr>
                        <tr class="hover:bg-gray-100">
                            <td class="p-3 w-3">
                                <div class="flex items-center">
                                    <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300">
                                    <label for="checkbox-table-1" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">Gozie</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">1234</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">Male</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">11:00</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap"><i class="ri-delete-bin-5-fill text-red-400"></i></td>
                        </tr>
                        <tr class="hover:bg-gray-100">
                            <td class="p-3 w-3">
                                <div class="flex items-center">
                                    <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300">
                                    <label for="checkbox-table-1" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">Gozie</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">1234</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">Male</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">11:00</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap"><i class="ri-delete-bin-5-fill text-red-400"></i></td>
                        </tr>
                        <tr class="hover:bg-gray-100">
                            <td class="p-3 w-3">
                                <div class="flex items-center">
                                    <input id="checkbox-table-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300">
                                    <label for="checkbox-table-1" class="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">Gozie</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">1234</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">Male</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap text-gray-500">11:00</td>
                            <td class="py-4 px-2 text-sm font-medium whitespace-nowrap"><i class="ri-delete-bin-5-fill text-red-400"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  </div>
</div>

    <!-- <input type="text" placeholder="newnew" v-model="guest" />
    <button @click="newnew">send</button> -->

    <!-- <div v-for="guest in guests" :key="guest">
      <p>{{ guest }}</p>
    </div> -->
    <FooterComponent/>
  </div>
  
</template>

<script setup>
import NavComponent from '../components/NavComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import { auth } from '@/main';
import { onAuthStateChanged } from '@firebase/auth';
import { ref, onBeforeUpdate, onMounted } from 'vue';

const displayName = ref('');
const isLoggedIn = ref(false);
const isDark = ref(false);
// const isTableVisible = ref(true);
// const guest = ref('');
// const guests = ref([]);

// const newnew = () => {
//   guests.value.unshift(guest.value);
//   guest.value = '';
// }

const toggleDark = () => {
  isDark.value = !isDark.value;
}

onBeforeUpdate(() => {
  if(auth.currentUser) {
    displayName.value = auth.currentUser.email;
  }
});

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    
    if(user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
    console.log(user);
  })
});
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
  border: 10px solid #f3f3f3;
  border-top: 10px solid rgb(100, 161, 252);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 3s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
