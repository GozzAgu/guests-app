<template>
    <div class="overlay" @click="close"></div>
    <div class="modal max-w-sm p-4 h-50 w-60 mx-auto bg-blue-50 shadow rounded-xl hover:shadow-lg">
        <h1 class="text-lg font-bold text-gray-700">Estate Residential Card</h1>
        <div class="rounded-full bg-blue-100 w-16 h-16 flex mb-2 mt-2">
			<h1 class="m-auto font-bold text-gray-700">JD</h1> 
		</div>
        <div>
            <p class="text-gray-700">Name: John Doe</p>
            <p class="text-gray-700">Res no: RUM/1234</p>
        </div>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['close-history']);

const close = () => {
    emit('close-history');
}

// const initials = () => {
// 	const firstname = user.firstName === "" ? " " : user.firstName.split("");
// 	const lastname = user.lastName === "" ? " " : user.lastName.split("");
// 	return `${firstname[0]} ${lastname[0]}`.toUpperCase();
// };
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
    z-index: 1;
    position: absolute;
    left: 50%;
    top: 42%;
    transform: translate(-50%, -50%);
    animation-name: animatetop;
    animation-duration: 0.7s;
}

@keyframes animatetop {
  from {top: 150px; opacity: 0}
  to {top: 42%; opacity: 1}
}
</style>