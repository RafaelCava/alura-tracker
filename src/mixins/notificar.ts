import { TipoDeNotificacao } from '@/interfaces/Notificacao'
import { store } from '@/store'
import { NOTIFICAR } from '@/store/type-mutations'

export const notificacaoMixin = {
  methods: {
    notificar(tipo: TipoDeNotificacao, titulo: string, texto: string): void {
      store.commit(NOTIFICAR, {
        titulo,
        texto,
        tipo
      })
    }
  }
}
