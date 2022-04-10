<template>
  <main
    class="columns is-gapless is-multiline"
    :class="{ 'modo-escuro': modoEscuroAtivo }"
  >
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarter conteudo">
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <div class="lista">
        <Tarefa
          v-for="(tarefa, index) in tarefas"
          :key="index"
          :tarefa="tarefa"
        />
        <Box v-if="listaEstaVazia">Você não está muito produtivo hoje 😓</Box>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BarraLateral from '@/components/BarraLateral.vue'
import Formulario from '@/components/Formulario.vue'
import Tarefa from '@/components/Tarefa.vue'
import TarefaInterface from '@/interfaces/Tarefa'
import Box from './components/Box.vue'

export default defineComponent({
  name: 'App',
  components: {
    BarraLateral,
    Formulario,
    Tarefa,
    Box
  },
  data() {
    return {
      tarefas: [] as TarefaInterface[],
      modoEscuroAtivo: false
    }
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  methods: {
    salvarTarefa(tarefa: TarefaInterface): void {
      this.tarefas.push(tarefa)
    },
    trocarTema(modoEscuroAtivo: boolean): void {
      this.modoEscuroAtivo = modoEscuroAtivo
    }
  }
})
</script>

<style lang="sass">
// $bg-primario-claro: #fff
// $texto-primario-claro: #000

// $bg-primario-escuro: #2b2d42
// $texto-primario-escuro: #ddd
.lista
  padding: 1.5rem

main
  --bg-primario: #fff
  --texto-primario: #000

main.modo-escuro
  --bg-primario: #2b2d42
  --texto-primario: #000

.conteudo
  background-color: var(--bg-primario)
</style>
