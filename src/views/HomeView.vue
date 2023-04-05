<template>
  <div class="body" :class="[isDark ? 'dark-mode' : '']">
    <NavComponent/>

    <div class="welcome bg-blue-50 m-5 h-20 rounded-2xl flex justify-between">
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
          <p class="guest-text"> Total </p>
          <i class="guest-text ri-user-fill text-gray-600 "></i>
        </div>
        <div class="bg-opacity-0 p-3 flex justify-around bg-blue-50 border-double border-2 rounded-xl m-2 w-40">
          <p class="guest-text"> Selected </p>
          <i class="guest-text ri-user-follow-fill text-gray-600"></i>
        </div>
      </div>
    </div>

    <div class="tab border-dotted border-2 m-5 rounded-2xl h-80">
      <div class="p-5">
        <h1 class="text-center font-semibold">Table</h1>
        <div>
          <div class="loader m-auto mt-24"></div>
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
const isDark = ref(false)
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
