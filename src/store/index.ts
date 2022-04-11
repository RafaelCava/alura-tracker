import Projeto from '@/interfaces/Projeto'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  EXCLUIR_PROJETO
} from './type-mutations'

interface state {
  projetos: Projeto[]
}

export const key: InjectionKey<Store<state>> = Symbol()

export const store = createStore<state>({
  state: {
    projetos: []
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
    }
  },
  actions: {},
  modules: {}
})

export function useStore(): Store<state> {
  return vuexUseStore(key)
}
