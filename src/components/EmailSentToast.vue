<template>
    <div class="modal h-20 border-green-300 border-2 w-40 mx-auto bg-green-200 shadow-lg rounded-xl">
        <h1 class="text-md text-center mt-1 font-bold text-green-500">
            <i class="ri-checkbox-circle-line text-4xl"></i>
            <p>Email sent</p>
        </h1>
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
    top: 40%;
    animation: fadeIn 1s;
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>