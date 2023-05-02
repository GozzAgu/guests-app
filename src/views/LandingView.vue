<template>
    <div class="relative">
        <div class="h-screen w-full bg-blue-50">
            <vue-particles color="#dedede"></vue-particles>
        </div>

        <div>
            
        </div>
        <div class=
            "bg-transparent
            absolute-center
            absolute
            p-5
            w-min
            "
        >
            <div class="text-center">
                <p class="font-bold text-gray-600 mt-2 animate-bounce">App in progress</p>
                <div class="loader m-auto mt-3"></div>
            </div>
            
            <div class="flex justify-center">
                <img src="../assets/Guest-Logo.png"
                    class=
                    "w-60
                    mt-4
                    mb-8" 
                />
            </div>

            <div class="flex justify-center">
                <img src="../assets/undraw_Everywhere_together_re_xe5a-removebg-preview.png"
                    class=
                    "w-100 
                    mt-8
                    mb-8" 
                />
            </div>

            <div class=
                "flex 
                justify-center 
                pb-4 
                mt-8"
            >
                <router-link to="/signin" class=
                    "w-60 
                    text-center
                    cursor-pointer
                    border-blue-400 
                    border-4
                    text-blue-400
                    pt-1 
                    pb-1 
                    pl-5 
                    pr-5 
                    rounded 
                    hover:bg-blue-500 
                    hover:text-blue-100 
                    h-10
                    transition 
                    delay-50 
                    duration-500 
                    transform"
                >
                    <p>Sign In</p>
                </router-link>
            </div>

            <div class=
                "flex 
                justify-center 
                pb-4 
                mt-2"
            >
                <router-link to="/signup" class=
                    "w-60 
                    text-center
                    cursor-pointer
                    border-blue-400 
                    border-4
                    text-blue-400  
                    pt-1 
                    pb-1 
                    pl-5 
                    pr-5 
                    rounded 
                    hover:bg-blue-500 
                    hover:text-blue-100 
                    h-10
                    transition 
                    delay-50 
                    duration-500 
                    transform"
                >
                    <p>Sign Up</p>
                </router-link>
            </div>

            <!-- <div class="flex fixed bottom-4 justify-around text-gray-400 mt-4 w-80 m-auto">
                <p>Copyright</p>
                <p>Privacy policy</p>
            </div> -->
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.absolute-center {
    top: 50%;
    left: 50%;
    transform: translate( -50%, -50%)
}
</style>