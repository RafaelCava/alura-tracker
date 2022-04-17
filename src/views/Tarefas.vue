<template>
  <Formulario @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <Box v-if="listaEstaVazia && !filtro"
      >Você não está muito produtivo hoje 😓</Box
    >
    <div class="field">
      <p class="control has-icons-left">
        <input
          class="input"
          type="text"
          placeholder="Digite para filtrar..."
          v-model="filtro"
        />
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <Tarefa
      v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @tarefa_selecionada="selecionarTarefa"
      class="clicavel"
    />
    <Modal :mostrar="!!tarefaSelecionada">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editar Task</p>
        <button class="delete" aria-label="close" @click="closeModal"></button>
      </template>
      <template v-slot:corpo>
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
      </template>
      <template v-slot:rodape>
        <button class="button is-success" @click="alterarTarefa">
          Salvar Alterações
        </button>
        <button class="button is-danger" @click="closeModal">Cancelar</button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  ref,
  watchEffect
} from 'vue'
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
    Box: defineAsyncComponent(() => import('@/components/Box.vue')),
    Modal: defineAsyncComponent(() => import('@/components/Modal.vue'))
  },
  computed: {
    listaEstaVazia(): boolean {
      return this.tarefas.length === 0
    }
  },
  setup() {
    const store = useStore()
    store.dispatch(OBTER_TAREFAS)
    store.dispatch(OBTER_PROJETOS)
    const tarefaSelecionada = ref<Tarefa | null>(null)
    const filtro = ref('')

    const salvarTarefa = (tarefa: TarefaInterface): void => {
      store.dispatch(CADASTRAR_TAREFA, tarefa)
    }
    const closeModal = (): void => {
      tarefaSelecionada.value = null
    }
    const selecionarTarefa = (tarefa: Tarefa) => {
      tarefaSelecionada.value = tarefa
    }
    const alterarTarefa = async function () {
      await store.dispatch(ALTERAR_TAREFA, tarefaSelecionada.value)
      closeModal()
    }

    watchEffect(() => {
      store.dispatch(OBTER_TAREFAS, filtro.value)
    })

    return {
      store,
      tarefas: computed(() => store.state.tarefa.tarefas),
      salvarTarefa,
      selecionarTarefa,
      alterarTarefa,
      tarefaSelecionada,
      closeModal,
      filtro
    }
  }
})
</script>

<style lang="sass">
.clicavel
  cursor: pointer
</style>
