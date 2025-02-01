<script setup lang="ts">
import { defineAsyncComponent, hydrateOnVisible } from "vue";
// import SsrExampleComponent from "./components/SsrExampleComponent.vue";

defineOptions({
  name: "App",
});

const AsyncComponent = defineAsyncComponent({
  loader: () => import("./components/SsrExampleComponent.vue"),
  hydrate: hydrateOnVisible(),
});
</script>

<template lang="pug">
img(src="/vite.svg", alt="")
.app-wrapper
    AsyncComponent(textExampleParam="Заголовок компонента")
</template>

<style lang="sass" scoped>
.app-wrapper
    border: 2px solid white
    border-radius: 8px
    padding: 2em
    margin: 1em
</style>
