import Projeto from './Projeto'

export default interface Tarefa {
  id: number
  duracaoEmSegundos: number
  descricao: string
  projeto: Projeto
}
