import Projeto from './Projeto'

export default interface Tarefa {
  duracaoEmSegundos: number
  descricao: string
  projeto: Projeto
}
