<template>
    <button @click="toggleDark()">
        <i v-if="isDark" class="ri-sun-fill text-2xl text-orange-200"></i>
        <i v-else class="ri-moon-clear-fill text-2xl text-gray-400"></i>
    </button>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<style scoped lang="scss">

</style>
  