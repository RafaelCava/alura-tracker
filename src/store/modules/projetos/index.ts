import ProjetoInterface from '@/interfaces/Projeto'
import { state } from '../../index'
import { Module } from 'vuex'
import {
  ADICIONA_PROJETO,
  ALTERA_PROJETO,
  DEFINIR_PROJETO,
  EXCLUIR_PROJETO
} from '@/store/type-mutations'
import Projeto from '@/interfaces/Projeto'
import {
  ALTERAR_PROJETOS,
  CADASTRAR_PROJETOS,
  OBTER_PROJETOS,
  REMOVER_PROJETOS
} from '@/store/tipo-acoes'
import http from '@/http'

export interface StateProject {
  projetos: ProjetoInterface[]
}

export const projeto: Module<StateProject, state> = {
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
    }
  },
  mutations: {
    [DEFINIR_PROJETO](state, projetos: Projeto[]) {
      state.projetos = projetos
    },
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
  }
}
