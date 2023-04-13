<template>
    <div class="m-auto flex justify-around shadow-md p-3 text-gray-700 text-s">
        <div>
            <img src="../assets/Guest-Logo.png"
                class=
                "w-20 
                mt-4" 
            />
        </div>
        
        <div v-if="isLoggedIn" class="mt-2 mb-2">
            <router-link to="/signin" 
                class=
                "w-60 
                text-center
                cursor-pointer
                bg-blue-400 
                text-white
                pt-2 
                pb-2 
                pl-5 
                pr-5 
                rounded 
                hover:bg-blue-500 
                transition 
                delay-50 
                duration-500 
                transform"
                @click="logout"
            >
                SignOut
            </router-link> 
        </div>

        <div v-else class="mt-2 mb-2">
            <router-link to="/signin" 
                class=
                "w-60 
                text-center
                cursor-pointer
                bg-blue-400 
                text-white
                pt-2 
                pb-2 
                pl-7 
                pr-7 
                rounded 
                hover:bg-blue-500 
                transition 
                delay-50 
                duration-500 
                transform"
            >
                SignIn
            </router-link> 
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { auth } from '@/main';
import { onAuthStateChanged, signOut } from '@firebase/auth';

const isLoggedIn = ref(false);

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

const logout = () => {
  signOut(auth);
  console.log(auth)
}
</script>