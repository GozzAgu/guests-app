<template>
    <div class="overlay" @click="close"></div>
    <div class="modal max-w-sm p-2 h-40 w-60 mx-auto bg-white border-gray-200 shadow rounded-xl hover:shadow-lg">
        <h1 class="p-2">Guest History</h1>
    </div>
</template>

<script setup>
import { defineEmits } from 'vue';
const emit = defineEmits(['close-history']);

const close = () => {
    emit('close-history');
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
  from {top: 150px; opacity: 0}
  to {top: 42%; opacity: 1}
}
</style>