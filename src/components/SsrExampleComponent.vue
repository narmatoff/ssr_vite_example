<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "SsrExampleComponent",
});

const { textExampleParam = "Заголовок по умолчанию" } = defineProps<{
  textExampleParam?: string;
}>();

const modelValue = ref("");
</script>

<template lang="pug">
div.inputArea
    input(v-model="modelValue", type="text", placeholder="Заголовок...")
    pre {{ modelValue }}

h1 {{ textExampleParam }}
p Lorem ipsum dolor sit amet
</template>

<style scoped>
.inputArea {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  color: #888;
}
</style>
