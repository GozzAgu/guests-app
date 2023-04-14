<template>
    <div class="modal h-10 border-red-200 border-2 w-40 mx-auto bg-red-100 shadow-lg rounded-xl">
        <h1 class="text-md text-center mt-1 font-bold text-red-500">No User!</h1>
    </div>
</template>

<script setup>

</script>

<style scoped>
.modal {
    z-index: 1;
    position: absolute;
    left: 30%;
    right: 30%;
    top: 35%;
    animation: fadeIn 1s;
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>