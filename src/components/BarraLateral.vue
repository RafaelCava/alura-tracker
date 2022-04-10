<template>
  <header>
    <h1><img src="@/assets/logo.png" alt="logo" /></h1>
    <button class="button" @click="alteraTema">{{ textoDoBotao }}</button>
  </header>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  name: 'BarraLateral',
  emits: ['aoTemaAlterado'],
  data() {
    return {
      modoEscuroAtivo: false
    }
  },
  computed: {
    textoDoBotao() {
      if (this.modoEscuroAtivo) {
        return 'Desativar modo escuro'
      } else {
        return 'Ativar modo escuro'
      }
    }
  },
  methods: {
    alteraTema() {
      this.modoEscuroAtivo = !this.modoEscuroAtivo
      this.$emit('aoTemaAlterado', this.modoEscuroAtivo)
    }
  }
})
</script>

<style scoped lang="sass">
header
  padding: 1rem
  background: #0d3b66
  width: 100%
  height: 100vh
  text-align: center

@media only screen and (max-width: 768px)
  header
    padding: 2.5rem
    height: auto
</style>
