const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

//Configuracao permissao de acesso client-server
app.use(cors());

//Obtem os dados da requisicao
app.use(bodyParser.json());

//funções dos endpoints
const { listarTarefaId , listarTarefas, CadastrarTarefa, AtualizarTarefa, removerTarefa, concluirTarefa} = require('./Controllers/gerenciador-tarefas');

//Rotas get, post, put, delete

//caso nao tenha implementado metodo
function naoImplementado(req, res){
    res.status(501).json( {erro: 'não implementado.'});
};

//Listar todas as tarefas
app.get('/gerenciador-tarefas', listarTarefas);
//Listar tarefa
app.get('/gerenciador-tarefas/:id', listarTarefaId);
//Cadastrar tarefa
app.post('/gerenciador-tarefas', CadastrarTarefa);
//Atualizar Tarefa
app.put('/gerenciador-tarefas/:id', AtualizarTarefa);
//remover tarefa
app.delete('/gerenciador-tarefas/:id', removerTarefa);
//Concluir Tarefa - put
app.put('/gerenciador-tarefas/:id/concluir', concluirTarefa);


app.listen(port, () => console.log('Servidor Inicializado na porta: ' + port));