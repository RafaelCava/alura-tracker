<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <Cronometro :tempoEmSegundos="tempoEmSegundos" />
    <BotaoAcao :text="'play'" @acao="iniciar" :disabled="cronometroRodando" />
    <BotaoAcao
      :text="'stop'"
      :icon="'fas fa-stop'"
      @acao="finalizar"
      :disabled="!cronometroRodando"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import Cronometro from './Cronometro.vue'
import BotaoAcao from './BotaoAcao.vue'

export default defineComponent({
  name: 'TemporizadorComponent',
  emits: ['aoTemporizadorFinalizado'],
  components: {
    Cronometro,
    BotaoAcao
  },
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false
    }
  },
  methods: {
    iniciar() {
      this.cronometroRodando = true
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1
      }, 1000)
    },
    finalizar() {
      this.cronometroRodando = false
      clearInterval(this.cronometro)
      this.$emit('aoTemporizadorFinalizado', this.tempoEmSegundos)
      this.tempoEmSegundos = 0
    }
  }
})
</script>

<style lang="sass" scoped></style>
