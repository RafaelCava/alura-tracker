<template>
  <Box>
    <div class="columns">
      <div class="column is-4">
        {{ tarefa.descricao || 'Task without description' }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || 'N/D' }}
      </div>
      <div class="column">
        <Cronometro :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </Box>
</template>

<script lang="ts">
import Tarefa from '@/interfaces/Tarefa'
import { defineComponent, PropType } from '@vue/runtime-core'
import Cronometro from './Cronometro.vue'
import Box from './Box.vue'

export default defineComponent({
  name: 'TarefaComponent',
  props: {
    tarefa: {
      type: Object as PropType<Tarefa>,
      required: true
    }
  },
  components: { Cronometro, Box }
})
</script>

<style lang="sass" scoped>
.box
  background-color: #faf0ca
</style>
