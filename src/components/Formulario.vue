<template>
  <div class="box">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulário para criação de uma nova tarefa"
      >
        <input
          type="text"
          class="input"
          placeholder="Qual tarefa você deseja iniciar?"
        />
      </div>
      <div class="column">
        <div
          class="is-flex is-align-items-center is-justify-content-space-between"
        >
          <Cronometro :tempoEmSegundos="tempoEmSegundos" />
          <BotaoAcao :text="'play'" @acao="iniciar" />
          <BotaoAcao :text="'stop'" :icon="'fas fa-stop'" @acao="finalizar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Cronometro from './Cronometro.vue'
import BotaoAcao from './BotaoAcao.vue'

export default defineComponent({
  components: {
    Cronometro,
    BotaoAcao
  },
  name: 'FormularioComponent',
  data() {
    return {
      tempoEmSegundos: 0,
      cronometro: 0
    }
  },
  methods: {
    iniciar() {
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1
      }, 1000)
    },
    finalizar() {
      clearInterval(this.cronometro)
    }
  }
})
</script>
