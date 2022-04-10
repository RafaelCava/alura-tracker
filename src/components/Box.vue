<template>
  <div class="box has-text-weight-bold">
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'BoxComponent'
})
</script>

<style lang="sass" scoped>
.box
  background-color: #faf0ca
</style>
