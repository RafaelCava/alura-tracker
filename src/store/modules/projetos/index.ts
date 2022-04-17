import { Module } from 'vuex'
import ProjetoInterface from '@/interfaces/Projeto'
import { State } from '../../index'
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

export const moduleProjeto: Module<StateProject, State> = {
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
    [DEFINIR_PROJETO](State, projetos: Projeto[]) {
      State.projetos = projetos
    },
    [ADICIONA_PROJETO](State, nomeDoProjeto: string) {
      const projeto = {
        id: new Date().toISOString(),
        nome: nomeDoProjeto
      } as Projeto
      State.projetos.push(projeto)
    },
    [ALTERA_PROJETO](State, projeto: Projeto) {
      const index = State.projetos.findIndex(proj => proj.id == projeto.id)
      State.projetos[index] = projeto
    },
    [EXCLUIR_PROJETO](State, id: string) {
      State.projetos = State.projetos.filter(proj => proj.id != id)
    }
  }
}
