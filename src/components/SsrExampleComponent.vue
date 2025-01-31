<script setup lang="ts">
import { ref } from 'vue'

defineProps({
  textExampleParam: String,
})

const modelValue = ref('')

</script>

<template>
  <img src="/vite.svg" alt="">
<div class="inputArea">
  <input v-model="modelValue" type="text" placeholder="Заголовок...">
  <pre>{{ modelValue }}</pre>

</div>
  <h1>{{ textExampleParam }}</h1>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci eaque expedita itaque optio placeat totam vitae! Error maiores molestiae nemo!</p>
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
