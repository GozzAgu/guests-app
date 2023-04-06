<template>
    <div class="overlay" @click="close"></div>

    <div class="modal max-w-sm p-2 mx-auto bg-white border-gray-200 shadow rounded-xl hover:shadow-lg transition-all duration-150 ease-linear"
    >
        <div class="relative p-3"> 
            <div class="flex justify-between">
                <h1 class="text-lg font-bold text-gray-700">Invite Guest</h1>
                <i class="ri-close-circle-fill text-3xl text-gray-500"></i>
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
                    placeholder="Guest's name"
                />
            </div>

            <div class=
                "mt-4 flex 
                justify-center"
            >
                
                <select name="gender" id="gender" 
                    class=
                    "w-60 
                    p-1 
                    text-gray-400
                    border-b-2 
                    bg-white
                    border-gray-200 
                    focus:outline-none 
                    focus:border-b-blue-200" 
                >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>
            <div class="flex flex-row mt-6 space-x-2 justify-evenly">
                <a href="#" class="w-full py-3 text-sm font-medium text-center text-white transition duration-150 ease-linear bg-blue-600 rounded-lg hover:bg-blue-400">Invite</a>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.overlay{
    position: fixed;
    background-color:rgba(37, 39, 51, 0.2);
    left: 0;
    width: 100%;
    height: 100vh;
    top: 0;
    z-index: 1;
    cursor: pointer;
}

.modal {
    background-color: white;
    z-index: 1;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    /* animation-name: animatetop;
    animation-duration: 0.7s */
}
</style>