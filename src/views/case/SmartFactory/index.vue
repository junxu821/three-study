<template>
    <div id="SmartFactory"></div>
</template>
<script lang="ts" setup>
import { Core } from './core.ts';
onMounted(() => {
    const core = new Core();
    core.render();
});
</script>
<style lang="scss" scoped></style>
