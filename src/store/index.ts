import Projeto from '@/interfaces/Projeto'
import { InjectionKey } from 'vue'
import { createStore, Store } from 'vuex'

interface state {
  projetos: Projeto[]
}

export const key: InjectionKey<Store<state>> = Symbol()

export const store = createStore<state>({
  state: {
    projetos: [
      {
        id: new Date().toISOString(),
        nome: 'Typescript'
      },
      {
        id: new Date().toISOString(),
        nome: 'Vue'
      },
      {
        id: new Date().toISOString(),
        nome: 'Vuex'
      }
    ]
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {}
})
