export enum TipoDeNotificacao {
  SUCESSO,
  FALHA,
  ATENCAO
}

export default interface Notificacao {
  titulo: string
  texto: string
  tipo: TipoDeNotificacao
  id: number
}
