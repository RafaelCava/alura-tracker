<template>
  <section>
    <router-link :to="{ name: 'Novo Projeto' }" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus" />
      </span>
      <span>Novo projeto</span>
    </router-link>
    <table class="table is-fullwidth">
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
import { EXCLUIR_PROJETO } from '@/store/type-mutations'
import useNotificador from '@/hooks/notificador'
import { TipoDeNotificacao } from '@/interfaces/Notificacao'

export default defineComponent({
  name: 'ProjetoView',
  setup() {
    const store = useStore()
    const { notificar } = useNotificador()
    return {
      store,
      notificar,
      projetos: computed(() => store.state.projetos)
    }
  },
  methods: {
    excluir(id: string) {
      this.store.commit(EXCLUIR_PROJETO, id)
      this.notificar(
        TipoDeNotificacao.ATENCAO,
        'Exclusão',
        'O Projeto foi excluído com sucesso!'
      )
    }
  }
})
</script>

<style lang="sass" scoped></style>
