<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': modoEscuroAtivo }"
  >
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Notificacoes />
      <router-view />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral: defineAsyncComponent(
      () => import('@/components/BarraLateral.vue')
    ),
    Notificacoes: defineAsyncComponent(
      () => import('@/components/Notificacoes.vue')
    )
  },
  data() {
    return {
      modoEscuroAtivo: false
    }
  },
  methods: {
    trocarTema(modoEscuroAtivo: boolean): void {
      this.modoEscuroAtivo = modoEscuroAtivo
    }
  },
  created() {
    document.title = 'Vue-Tracker'
  }
})
</script>

<style lang="sass">
.lista
  padding: 1.5rem

main
  --bg-primario: #fff
  --texto-primario: #000

main.modo-escuro
  --bg-primario: #2b2d42
  --texto-primario: #ffffff

.conteudo
  background-color: var(--bg-primario)
</style>
