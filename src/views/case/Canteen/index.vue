<template>
    <div class="container" id="container"></div>
    <div class="css" id="css"></div>
</template>
<script lang="ts" setup>
import { Entry } from './entry';
const entry = new Entry();
onMounted(() => {
    nextTick(() => {
        entry.start();
    });
});
</script>
<style lang="scss" scoped></style>
