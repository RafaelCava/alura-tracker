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
import { ADICIONA_PROJETO, ALTERA_PROJETO } from '@/store/type-mutations'
import { TipoDeNotificacao } from '@/interfaces/Notificacao'
import { notificacaoMixin } from '@/mixins/notificar'

export default defineComponent({
  name: 'FormularioView',
  props: {
    id: {
      type: String
    }
  },
  mixins: [notificacaoMixin],
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
        this.store.commit(ALTERA_PROJETO, {
          id: this.id,
          nome: this.nomeDoProjeto
        })
        this.notificar(
          TipoDeNotificacao.ATENCAO,
          'Update',
          'O Projeto foi alterado com sucesso!'
        )
      } else {
        this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
        this.notificar(
          TipoDeNotificacao.SUCESSO,
          'Excelente',
          'O Projeto foi cadastrado com sucesso!'
        )
      }
      this.nomeDoProjeto = ''
      this.$router.push({ name: 'Projetos' })
    }
  },
  setup() {
    const store = useStore()
    return {
      store
    }
  }
})
</script>

<style lang="sass" scoped>
.projetos
  padding: 1.25rem
</style>
