<template>
  <button class="button" @click="$emit('acao')">
    <span class="icon">
      <i :class="icon"></i>
    </span>
    <span>{{ text }}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BotaoAcao',
  props: {
    icon: {
      type: String,
      default: 'fas fa-play'
    },
    text: {
      type: String
    }
  }
})
</script>
