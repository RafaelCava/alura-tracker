<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="listaEstaVazia">Você não está muito produtivo hoje 😓</Box>
    <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue'
import TarefaInterface from '@/interfaces/Tarefa'

export default defineComponent({
  name: 'TarefasView',
  components: {
    Formulario: defineAsyncComponent(
      () => import('@/components/Formulario.vue')
    ),
    Tarefa: defineAsyncComponent(() => import('@/components/Tarefa.vue')),
    Box: defineAsyncComponent(() => import('@/components/Box.vue'))
  },
  data() {
    return {
      tarefas: [] as TarefaInterface[]
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
    }
  }
})
</script>

<style lang="sass"></style>
