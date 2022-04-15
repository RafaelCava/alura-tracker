<template>
  <section>
    <router-link :to="{ name: 'Novo Projeto' }" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus" />
      </span>
      <span>Novo projeto</span>
    </router-link>
    <table class="table is-fullwidth tabela">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <router-link
              :to="{ name: 'Editar Projeto', params: { id: projeto.id } }"
              class="button"
            >
              <span class="icon is-small">
                <i class="fas fa-pencil-alt" />
              </span>
            </router-link>
            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash" />
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/runtime-core'
import { useStore } from '@/store'
import useNotificador from '@/hooks/notificador'
import { TipoDeNotificacao } from '@/interfaces/Notificacao'
import { OBTER_PROJETOS, REMOVER_PROJETOS } from '@/store/tipo-acoes'

export default defineComponent({
  name: 'ProjetoView',
  setup() {
    const store = useStore()
    store.dispatch(OBTER_PROJETOS)
    const { notificar } = useNotificador()
    return {
      store,
      notificar,
      projetos: computed(() => store.state.projeto.projetos)
    }
  },
  methods: {
    excluir(id: string) {
      this.store.dispatch(REMOVER_PROJETOS, id)
      this.notificar(
        TipoDeNotificacao.ATENCAO,
        'Exclusão',
        'O Projeto foi excluído com sucesso!'
      )
    }
  }
})
</script>

<style lang="sass" scoped>
.tabela
  background-color: var(--bg-primario)
  color: var(--texto-primario)
</style>
