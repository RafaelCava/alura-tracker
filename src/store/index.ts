import Notificacao from '@/interfaces/Notificacao'
import Projeto from '@/interfaces/Projeto'
import Tarefa from '@/interfaces/Tarefa'
import { InjectionKey } from 'vue'
import { createStore, Store, useStore as vuexUseStore } from 'vuex'
import {
  OBTER_PROJETOS,
  CADASTRAR_PROJETOS,
  ALTERAR_PROJETOS,
  REMOVER_PROJETOS,
  OBTER_TAREFAS,
  CADASTRAR_TAREFA
} from './tipo-acoes'
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  EXCLUIR_PROJETO,
  NOTIFICAR,
  DEFINIR_PROJETO,
  DEFINIR_TAREFAS,
  ADICIONAR_TAREFAS
} from './type-mutations'
import http from '@/http'

interface state {
  projetos: Projeto[]
  notificacoes: Notificacao[]
  tarefas: Tarefa[]
}

export const key: InjectionKey<Store<state>> = Symbol()

export const store = createStore<state>({
  state: {
    projetos: [],
    notificacoes: [],
    tarefas: []
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
    },
    [DEFINIR_PROJETO](state, projetos: Projeto[]) {
      state.projetos = projetos
    },
    [DEFINIR_TAREFAS](state, tarefas: Tarefa[]) {
      state.tarefas = tarefas
    },
    [ADICIONAR_TAREFAS](state, tarefa: Tarefa) {
      state.tarefas.push(tarefa)
    }
  },
  actions: {
    [OBTER_PROJETOS]({ commit }) {
      http.get('projetos').then(response => {
        commit(DEFINIR_PROJETO, response.data)
      })
    },
    [CADASTRAR_PROJETOS](ctx, nomeDoProjeto: string) {
      return http.post('projetos', {
        nome: nomeDoProjeto
      })
    },
    [ALTERAR_PROJETOS](ctx, projeto: Projeto) {
      return http.put(`projetos/${projeto.id}`, projeto)
    },
    async [REMOVER_PROJETOS](ctx, id: string) {
      await http.delete(`projetos/${id}`)
      ctx.commit(EXCLUIR_PROJETO, id)
    },
    [OBTER_TAREFAS]({ commit }) {
      http.get('tarefas').then(response => {
        commit(DEFINIR_TAREFAS, response.data)
      })
    },
    [CADASTRAR_TAREFA]({ commit }, tarefa: Tarefa) {
      return http
        .post('tarefas', tarefa)
        .then(response => commit(ADICIONAR_TAREFAS, response.data))
    }
  },
  modules: {}
})

export function useStore(): Store<state> {
  return vuexUseStore(key)
}
