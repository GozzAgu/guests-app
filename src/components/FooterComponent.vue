<template>
    <div class="text-center fixed inset-x-0 bottom-20" ref="draggableContainer">
        <i draggable="true" @mousedown="mousedown" id="btn" @click="openModal" class="ri-user-add-fill text-blue-300 text-xl p-6 shadow-lg rounded-full bg-blue-50"></i>
    </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue';

let draggableContainer = ref(null)

const emit = defineEmits(['modal']);

const openModal = () => {
    emit('modal');
}

const mousedown = (e) => {
    window.addEventListener('mousemove', mousemove)
    window.addEventListener('mouseup', mouseup)

    let prevX = e.clientX
    let prevY = e.clientY

    function mousemove (e) {
    const newX = prevX - e.clientX
    const newY = prevY - e.clientY

    const rect = draggableContainer.value.getBoundingClientRect()
    draggableContainer.value.style.left = rect.left - newX + 'px'
    draggableContainer.value.style.top = rect.top - newY + 'px'

    prevX = e.clientX
    prevY = e.clientY
    }

    function mouseup () {
    window.removeEventListener('mousemove', mousemove)
    window.removeEventListener('mouseup', mouseup)
    }
}
</script>