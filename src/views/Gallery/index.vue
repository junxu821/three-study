<template>
    <!-- css3DRenderer -->
    <div id="css"></div>
    <div class="gallery"></div>
</template>
<script lang="ts" setup>
import { core } from './Core';
onMounted(() => {
    core.render();
});
</script>
<style lang="scss" scoped></style>
