<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="listaEstaVazia">Você não está muito produtivo hoje 😓</Box>
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @tarefa_selecionada="selecionarTarefa"
      class="clicavel"
    />
    <div
      class="modal"
      :class="{ 'is-active': tarefaSelecionada }"
      v-if="tarefaSelecionada"
    >
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Editar Task</p>
          <button
            class="delete"
            aria-label="close"
            @click="closeModal"
          ></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label for="descricaoDaTarefa" class="label"
              >Descrição da Tarefa</label
            >
            <input
              type="text"
              v-model="tarefaSelecionada.descricao"
              class="input"
              id="descricaoDaTarefa"
            />
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="alterarTarefa">
            Salvar Alterações
          </button>
          <button class="button is-danger" @click="closeModal">Cancelar</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent } from 'vue'
import TarefaInterface from '@/interfaces/Tarefa'
import { useStore } from '@/store'
import {
  OBTER_TAREFAS,
  CADASTRAR_TAREFA,
  OBTER_PROJETOS,
  ALTERAR_TAREFA
} from '@/store/tipo-acoes'
import Tarefa from '@/interfaces/Tarefa'

export default defineComponent({
  name: 'TarefasView',
  components: {
    Formulario: defineAsyncComponent(
      () => import('@/components/Formulario.vue')
    ),
    Tarefa: defineAsyncComponent(() => import('@/components/Tarefa.vue')),
    Box: defineAsyncComponent(() => import('@/components/Box.vue'))
  },
  data: () => ({
    tarefaSelecionada: null as Tarefa | null
  }),
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  methods: {
    salvarTarefa(tarefa: TarefaInterface): void {
      this.store.dispatch(CADASTRAR_TAREFA, tarefa)
    },
    closeModal(): void {
      this.tarefaSelecionada = null
    },
    selecionarTarefa(tarefa: Tarefa) {
      this.tarefaSelecionada = tarefa
    },
    alterarTarefa: async function () {
      await this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
      this.closeModal()
    }
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)
    return {
      store,
      tarefas: computed(() => store.state.tarefas)
    }
  }
})
</script>

<style lang="sass">
.clicavel
  cursor: pointer
</style>
