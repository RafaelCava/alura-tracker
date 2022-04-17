import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import Notificacao from '@/interfaces/Notificacao'
import { moduleProjeto as projeto } from './modules/projetos'
import { moduleTarefa as tarefa } from './modules/tarefas'
import { NOTIFICAR } from './type-mutations'
import { StateProject } from './modules/projetos'
import { StateTarefa } from './modules/tarefas'

export interface State {
  notificacoes: Notificacao[]
  tarefa: StateTarefa
  projeto: StateProject
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    notificacoes: [],
    tarefa: {
      tarefas: []
    },
    projeto: {
      projetos: []
    }
  },
  getters: {},
  mutations: {
    [NOTIFICAR](State, notificacao: Notificacao) {
      notificacao.id = new Date().getTime()
      State.notificacoes.push(notificacao)
      setTimeout(() => {
        State.notificacoes = State.notificacoes.filter(
          n => n.id != notificacao.id
        )
      }, 3000)
    }
  },
  actions: {},
  modules: {
    projeto,
    tarefa
  }
})

export function useStore(): Store<State> {
  return vuexUseStore(key)
}
