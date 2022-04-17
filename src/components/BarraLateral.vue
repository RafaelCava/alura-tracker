<template>
  <header>
    <div class="has-text-centered">
      <h1><img src="@/assets/logo.png" alt="logo" /></h1>
      <button class="button" @click="alteraTema">{{ textoDoBotao }}</button>
    </div>
    <nav class="panel mt-5">
      <ul>
        <li>
          <router-link class="link" :to="{ name: 'Tarefas' }">
            <i class="fas fa-tasks" />
            Tarefas
          </router-link>
        </li>
        <li>
          <router-link class="link" :to="{ name: 'Projetos' }">
            <i class="fas fa-project-diagram" />
            Projetos
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
      }
      return 'Ativar modo escuro'
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

.panel
  li
    margin: 8px 0
.link
  color: #fff
  &:hover
    color: #faf0ca
  &.router-link-active
    color: #faf0ca

@media only screen and (max-width: 768px)
  header
    padding: 2.5rem
    height: auto
</style>
