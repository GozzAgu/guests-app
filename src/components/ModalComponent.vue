<template>
    <div class="overlay"></div>
    <div class="modal max-w-sm p-2 mx-auto bg-white border-gray-200 shadow rounded-xl hover:shadow-lg"
    >
        <div class="relative p-3"> 
            <div class="flex justify-between">
                <h1 class="text-lg font-bold text-gray-700">Invite Guest</h1>
                <i @click="closeModal" class="ri-close-circle-fill text-3xl text-gray-500"></i>
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
                    v-model="newGuest.name"
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
                    v-model="selected"
                >
                    <option value="">Gender</option>
                    <option v-for="option in options" :key="option">{{ option.text }}</option>
                </select>
            </div>
            <div class="flex flex-row mt-6 space-x-2 justify-evenly">
                <a @click="addNewGuest" href="#" class="w-full py-3 text-sm font-medium text-center text-white transition duration-150 ease-linear bg-blue-400 rounded-lg hover:bg-blue-300">Invite</a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue';
const newGuest = ref({
    name: '',
    code: '',
    gender: '',
    time: ''
});

const options = ref([
    {
        id: 1,
        text: 'Male'
    },
    {
        id: 2,
        text: 'Female'
    }
]);

const selected = ref('')

const emit = defineEmits(['close', 'new-guest']);

const closeModal = () => {
    emit('close');
}

const getTime = () => {
    const date =  ref(new Date());
    const time = ref(date.value.getHours() + ':' + date.value.getMinutes());
    return time;
};

const addNewGuest = () => {
    if(newGuest.value.name.length > 2) {
        newGuest.value.gender = selected.value;
        newGuest.value.code = Math.floor(Math.random() * 10000) + 1;
        newGuest.value.time = getTime();
        emit('new-guest', newGuest.value);
        emit('close');
    } else {
        alert('No guest added');
    }
}
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
    top: 42%;
    transform: translate(-50%, -50%);
    animation-name: animatetop;
    animation-duration: 0.7s;
}

@keyframes animatetop {
  from {top: -150px; opacity: 0}
  to {top: 42%; opacity: 1}
}
</style>