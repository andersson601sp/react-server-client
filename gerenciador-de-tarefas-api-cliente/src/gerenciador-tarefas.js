/* Não esta sendo necessario importa  React pois o mesmo esta sendo herdado da index.js*/
import './gerenciador-tarefas.css';
import  {useRoutes } from 'hookrouter';
import ListarTarefas from './listar/listar-tarefas';
import CadastrarTarefa from './cadastrar/cadastrar-tarefa';
import AtualizarTarefa from './atualizar/atualizar-tarefa';

const routes = {
  '/' : () => <ListarTarefas />,
  '/cadastrar' : () => <CadastrarTarefa />,
  '/atualizar/:id' : ({id}) => <AtualizarTarefa id={id} />
}

function GerenciadorTarefas() {
  return useRoutes(routes); 
}

export default GerenciadorTarefas;
