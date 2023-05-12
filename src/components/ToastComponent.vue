<template>
    <div class="modal h-10 border-green-200 border-2 w-40 mx-auto bg-green-100 shadow-lg rounded-xl">
        <h1 class="text-md text-center mt-1 font-bold text-green-500">Guest generated!</h1>
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
    top: 46%;
    animation: fadeIn 2s;
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>