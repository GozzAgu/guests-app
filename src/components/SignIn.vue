<template>
    <div class=
        "bg-blue-100
        p-5 
        h-screen"
    >
        <div 
            class=
            "mt-4"
        >
            <img src="../assets/Guest-Logo.png" 
                class=
                "w-40 
                m-auto" 
            />
        </div>

        <div class=
            "bg-white 
            rounded-3xl 
            shadow-sm
            pt-5 
            pb-5 
            w-full 
            md:w-80 
            md:h-100 
            lg:h-100 
            lg:w-1/2 
            m-auto 
            flex 
            items-center 
            justify-center 
            mt-10"
        >
            <div>
                <div class=
                    "flex 
                    justify-center"
                >
                    <h1 class=
                        "pt-4 
                        text-3xl 
                        text-gray-600 
                        font-bold mb-8"
                    >
                        Sign In
                    </h1>
                </div>

                <div class=
                    "flex 
                    justify-center"
                >
                    <h1 class=
                        "p-5
                        w-80 
                        text-center
                        text-1xl 
                        text-gray-400 
                        font-semibold 
                        mb-8"
                    >
                        Hey, Enter your credentials to get signed into your account
                    </h1>
                </div>

                <ErrorToastComponent v-if="noUser"/>

                <div class=
                    "mt-4 flex 
                    justify-center"
                >
                    <input class=
                        "w-60 
                        p-1 
                        text-gray-400
                        border-b-2 
                        border-gray-200 
                        focus:outline-none 
                        focus:border-b-blue-200" 
                        type="text" 
                        placeholder="Email"
                        v-model="user.email"
                    />
                </div>

                <div class=
                    "mt-4 flex 
                    justify-center"
                >
                    <input class=
                        "w-60 
                        p-1 
                        text-gray-400
                        border-b-2 
                        border-gray-200 
                        focus:outline-none 
                        focus:border-b-blue-200" 
                        type="text" 
                        placeholder="Password"
                        v-model="user.password"
                    />
                </div>

                <div class=
                    "flex 
                    justify-center 
                    pb-4 
                    mt-12"
                >
                    <router-link to="" class=
                        "w-60 
                        text-center
                        cursor-pointer
                        bg-blue-400 
                        text-white 
                        pt-1 
                        pb-1 
                        pl-5 
                        pr-5 
                        rounded 
                        hover:bg-blue-500 
                        transition 
                        delay-50 
                        duration-500 
                        transform"
                        @click="signIn"
                    >
                        Sign In
                    </router-link>
                </div>

                <div class=
                    "flex 
                    justify-center 
                    pb-4 
                    mb-6"
                >
                    <router-link to='/signup' class=
                        "w-60 
                        text-center
                        cursor-pointer
                        border-2 
                        pt-1 
                        pb-1 
                        pl-5 
                        pr-5 
                        rounded 
                        text-blue-400 
                        hover:border-blue-400 
                        transition 
                        delay-50 
                        duration-500 
                        transform"
                    >
                        Don't have an account ?
                    </router-link>
                </div>
            </div>
        </div>
        <div class="flex justify-around text-gray-400 mt-4 w-80 m-auto">
            <p>Copyright</p>
            <p>Privacy policy</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../main';
import { useRouter } from 'vue-router';
import ErrorToastComponent from '@/components/ErrorToastComponent.vue'

const user = ref({
    email: '',
    password: ''
});
const router = useRouter
const noUser = ref(false);

const signIn = () => {
    signInWithEmailAndPassword(auth, user.value.email, user.value.password)
    .then((credential) => {
        updateProfile(auth.currentUser, {
            displayName: user.value.email
        })
        .then(() => {
            console.log(auth.currentUser.displayName)
            console.log(credential)
            router.push('/')
        })
    })
    .catch((error) => {
        console.log(error.message, 'no user');
        noUser.value = true;
        setTimeout(function(){
            noUser.value = false;
        }, 3000);
        router.push({ path: '/signin' })
    });
}
</script>