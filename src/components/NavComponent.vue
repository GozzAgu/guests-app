<template>
    <div class="max-w-full mx-auto bg-blue-50 shadow-md dark:bg-slate-400">
      <div class="p-3 pl-8 pr-8 flex justify-between md:justify-around lg:justify-around rounded-lg">
        <div>
            <img src="../assets/Guest-Logo.png"
                class=
                "w-20 
                mt-4" 
            />
        </div>

        <div v-if="isLoggedIn" class="mt-2 mb-2">
            <router-link to="" 
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
              <i class="ri-logout-box-r-line text-xl text-semibold"></i>
            </router-link> 
        </div>

        <div v-else class="mt-2 mb-2">
            <router-link to="signin" 
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
              <i class="ri-login-box-line text-xl text-semibold"></i>
            </router-link> 
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { auth } from '@/main';
import { onAuthStateChanged, signOut } from '@firebase/auth';
import { useRouter } from 'vue-router';

const emit = defineEmits(['signing-out'])
const router = useRouter();
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
    setTimeout(function(){
      signOut(auth);
        router.push('/signin');
    }, 3000);
    emit('signing-out');
  console.log(auth)
}
</script>