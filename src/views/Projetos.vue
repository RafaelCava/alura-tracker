<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
    <router-view />
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core'
import { useStore } from '@/store'

export default defineComponent({
  name: 'ProjetoView',
  setup() {
    const store = useStore()
    return {
      projetos: computed(() => store.state.projeto.projetos)
    }
  }
})
</script>

<style lang="sass" scoped>
.projetos
  padding: 1.25rem
</style>
