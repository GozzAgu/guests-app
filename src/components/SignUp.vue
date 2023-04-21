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
                        Sign Up
                    </h1>
                </div>

                <div class=
                    "flex 
                    justify-center"
                >
                    <h1 class=
                        "pl-5
                        pr-5
                        w-80 
                        text-center
                        text-1xl 
                        text-gray-400 
                        font-semibold 
                        mb-8"
                    >
                        Hey, Enter your credentials to create an account
                    </h1>
                </div>

                <ErrorToastComponent v-if="noUser"/>

                <div class=
                    "mt-1 flex 
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
                        placeholder="user@gmail.com"
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
                        type="password" 
                        placeholder="******"
                        v-model="user.password"
                    />
                </div>

                <div class=
                    "flex 
                    justify-center 
                    pb-4 
                    mt-8"
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
                        h-10
                        transition 
                        delay-50 
                        duration-500 
                        transform"
                        @click="signUp"
                    >
                        <div v-if="signingUp" role="status">
                            <svg aria-hidden="true" role="status" class="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div v-else>Sign Up</div>
                    </router-link>
                </div>

                <div class=
                    "flex 
                    justify-center 
                    pb-4"
                >
                    <router-link to='/signin' class=
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
                        h-10
                        hover:border-blue-400 
                        transition 
                        delay-50 
                        duration-500 
                        transform"
                    >
                        Already have an account ?
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
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../main';
import { useRouter } from 'vue-router';
import ErrorToastComponent from '@/components/ErrorToastComponent.vue'

const router = useRouter();
const noUser = ref(false);
const signingUp = ref(false)

const user = ref({
    accountType: '',
    email: '',
    password: ''
})

const signUp = () => {
    createUserWithEmailAndPassword(auth, user.value.email, user.value.password)
    .then((credential) => {
        updateProfile(auth.currentUser, {
            displayName: user.value.email,
        })
        console.log(credential.user.uid);
        signingUp.value = true;
        setTimeout(function(){
            router.push('/');
        }, 3000);
    })
    .catch(error=>{
            console.log(error.message)
            router.push('/signup')
            noUser.value = true;
            signingUp.value = true;
            
            setTimeout(function(){
                signingUp.value = false;
            }, 3000);

            setTimeout(function(){
                noUser.value = false;
            }, 3000);
        })  
}
</script>