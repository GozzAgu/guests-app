<template>
    <!-- <div class="flex justify-center fixed inset-x-0 -bottom-6"> -->
        <div class="text-center fixed inset-x-0 bottom-10">
            <i @click="openModal" class="ri-user-add-fill text-blue-300 text-3xl p-6 shadow-lg rounded-full bg-blue-50"></i>
        </div>
        
    <!-- </div> -->
</template>

<script setup>
// import { ref, onMounted } from 'vue';
import { defineEmits } from 'vue';

const emit = defineEmits(['modal']);

const openModal = () => {
    emit('modal');
}


</script>