import Notificacao from '@/interfaces/Notificacao'
import Tarefa from '@/interfaces/Tarefa'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import { OBTER_TAREFAS, CADASTRAR_TAREFA, ALTERAR_TAREFA } from './tipo-acoes'
import {
  NOTIFICAR,
  DEFINIR_TAREFAS,
  ADICIONAR_TAREFAS,
  ALTERA_TAREFA
} from './type-mutations'
import http from '@/http'
import { StateProject } from './modules/projetos'

export interface state {
  notificacoes: Notificacao[]
  tarefas: Tarefa[]
  projeto: StateProject
}

export const key: InjectionKey<Store<state>> = Symbol()

export const store = createStore<state>({
  state: {
    notificacoes: [],
    tarefas: [],
    projeto: {
      projetos: []
    }
  },
  getters: {},
  mutations: {
    [NOTIFICAR](state, notificacao: Notificacao) {
      notificacao.id = new Date().getTime()
      state.notificacoes.push(notificacao)
      setTimeout(() => {
        state.notificacoes = state.notificacoes.filter(
          not => not.id != notificacao.id
        )
      }, 3000)
    },

    [DEFINIR_TAREFAS](state, tarefas: Tarefa[]) {
      state.tarefas = tarefas
    },
    [ADICIONAR_TAREFAS](state, tarefa: Tarefa) {
      state.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](state, tarefa: Tarefa) {
      const index = state.tarefas.findIndex(value => value.id == tarefa.id)
      state.tarefas[index] = tarefa
    }
  },
  actions: {
    [OBTER_TAREFAS]({ commit }) {
      http.get('tarefas').then(response => {
        commit(DEFINIR_TAREFAS, response.data)
      })
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: Tarefa) {
      return http
        .post('tarefas', tarefa)
        .then(response => commit(ADICIONAR_TAREFAS, response.data))
    },
    [ALTERAR_TAREFA]({ commit }, tarefa: Tarefa) {
      return http
        .put(`tarefas/${tarefa.id}`, tarefa)
        .then(() => commit(ALTERA_TAREFA, tarefa))
    }
  },
  modules: {}
})

export function useStore(): Store<state> {
  return vuexUseStore(key)
}
