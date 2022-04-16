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
import { defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import { TipoDeNotificacao } from '@/interfaces/Notificacao'
import useNotificador from '@/hooks/notificador'
import { ALTERAR_PROJETOS, CADASTRAR_PROJETOS } from '@/store/tipo-acoes'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'FormularioView',
  props: {
    id: {
      type: String
    }
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()
    const nomeDoProjeto = ref('')

    if (props.id) {
      const projeto = store.state.projeto.projetos.find(
        projeto => projeto.id == props.id
      )
      nomeDoProjeto.value = projeto?.nome || ''
    }

    const lidaComNotificacao = (
      tipoDeNotificacao: TipoDeNotificacao,
      titulo: string,
      mensagem: string
    ) => {
      const estrategias = {
        [TipoDeNotificacao.SUCESSO]: (): void =>
          notificar(tipoDeNotificacao, titulo, mensagem),
        [TipoDeNotificacao.ATENCAO]: (): void =>
          notificar(tipoDeNotificacao, titulo, mensagem),
        [TipoDeNotificacao.FALHA]: (): void =>
          notificar(tipoDeNotificacao, titulo, mensagem)
      }
      estrategias[tipoDeNotificacao]()
    }

    const salvar = () => {
      if (props.id) {
        store
          .dispatch(ALTERAR_PROJETOS, {
            id: props.id,
            nome: nomeDoProjeto.value
          })
          .then(() => {
            lidaComNotificacao(
              TipoDeNotificacao.ATENCAO,
              'Update',
              'O Projeto foi alterado com sucesso!'
            )
          })
          .catch(err => {
            lidaComNotificacao(TipoDeNotificacao.FALHA, 'Erro', err.message)
          })
      } else {
        store
          .dispatch(CADASTRAR_PROJETOS, nomeDoProjeto.value)
          .then(() => {
            lidaComNotificacao(
              TipoDeNotificacao.SUCESSO,
              'Excelente',
              'O Projeto foi cadastrado com sucesso!'
            )
          })
          .catch(err => {
            lidaComNotificacao(TipoDeNotificacao.FALHA, 'Erro', err.message)
          })
      }
      nomeDoProjeto.value = ''
      router.push({ name: 'Projetos' })
    }

    const { notificar } = useNotificador()

    return {
      nomeDoProjeto,
      salvar
    }
  }
})
</script>

<style lang="sass" scoped>
.projetos
  padding: 1.25rem
</style>
