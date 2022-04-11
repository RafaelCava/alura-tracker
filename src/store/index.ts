import Notificacao from '@/interfaces/Notificacao'
import Projeto from '@/interfaces/Projeto'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  EXCLUIR_PROJETO,
  NOTIFICAR
} from './type-mutations'

interface state {
  projetos: Projeto[]
  notificacoes: Notificacao[]
}

export const key: InjectionKey<Store<state>> = Symbol()

export const store = createStore<state>({
  state: {
    projetos: [],
    notificacoes: []
  },
  getters: {},
  mutations: {
    [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      } as Projeto
      state.projetos.push(projeto)
    },
    [ALTERA_PROJETO](state, projeto: Projeto) {
      const index = state.projetos.findIndex(proj => proj.id == projeto.id)
      state.projetos[index] = projeto
    },
    [EXCLUIR_PROJETO](state, id: string) {
      state.projetos = state.projetos.filter(proj => proj.id != id)
    },
    [NOTIFICAR](state, notificacao: Notificacao) {
      notificacao.id = new Date().getTime()
      state.notificacoes.push(notificacao)
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          not => not.id != notificacao.id
        )
      }, 3000)
    }
  },
  actions: {},
  modules: {}
})

export function useStore(): Store<state> {
  return vuexUseStore(key)
}
