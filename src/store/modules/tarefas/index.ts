import Tarefa from '@/interfaces/Tarefa'
import { State } from '../../index'
import { Module } from 'vuex'
import {
  ADICIONAR_TAREFAS,
  ALTERA_TAREFA,
  DEFINIR_TAREFAS
} from '@/store/type-mutations'
import {
  ALTERAR_TAREFA,
  CADASTRAR_TAREFA,
  OBTER_TAREFAS
} from '@/store/tipo-acoes'
import http from '@/http'

export interface StateTarefa {
  tarefas: Tarefa[]
}

export const moduleTarefa: Module<StateTarefa, State> = {
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
  mutations: {
    [DEFINIR_TAREFAS](State, tarefas: Tarefa[]) {
      State.tarefas = tarefas
    },
    [ADICIONAR_TAREFAS](State, tarefa: Tarefa) {
      State.tarefas.push(tarefa)
    },
    [ALTERA_TAREFA](State, tarefa: Tarefa) {
      const index = State.tarefas.findIndex(value => value.id == tarefa.id)
      State.tarefas[index] = tarefa
    }
  }
}
