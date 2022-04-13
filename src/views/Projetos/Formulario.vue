<template>
  <section class="projetos">
    <form @submit.prevent="salvar">
      <div class="field">
        <label for="nomeDoProjeto" class="label">Nome Do Projeto</label>
        <input
          type="text"
          v-model="nomeDoProjeto"
          class="input"
          id="nomeDoProjeto"
        />
      </div>
      <div class="field">
        <button class="button" type="submit">Salvar</button>
      </div>
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { useStore } from '@/store'
import { TipoDeNotificacao } from '@/interfaces/Notificacao'
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETOS, CADASTRAR_PROJETOS } from '@/store/tipo-acoes'

export default defineComponent({
  name: 'FormularioView',
  props: {
    id: {
      type: String
    }
  },
  mounted() {
    if (this.id) {
      const projeto = this.store.state.projetos.find(
        projeto => projeto.id === this.id
      )
      this.nomeDoProjeto = projeto?.nome || ''
    }
  },
  data() {
    return {
      nomeDoProjeto: ''
    }
  },
  methods: {
    salvar() {
      if (this.id) {
        this.store.dispatch(ALTERAR_PROJETOS, {
          id: this.id,
          nome: this.nomeDoProjeto
        })
        this.notificar(
          TipoDeNotificacao.ATENCAO,
          'Update',
          'O Projeto foi alterado com sucesso!'
        )
      } else {
        this.store
          .dispatch(CADASTRAR_PROJETOS, this.nomeDoProjeto)
          .then(() => {
            this.notificar(
              TipoDeNotificacao.SUCESSO,
              'Excelente',
              'O Projeto foi cadastrado com sucesso!'
            )
          })
          .catch(err => {
            this.notificar(TipoDeNotificacao.FALHA, 'Erro', err.message)
          })
      }
      this.nomeDoProjeto = ''
      this.$router.push({ name: 'Projetos' })
    }
  },
  setup() {
    const store = useStore()
    const { notificar } = useNotificador()
    return {
      store,
      notificar
    }
  }
})
</script>

<style lang="sass" scoped>
.projetos
  padding: 1.25rem
</style>
