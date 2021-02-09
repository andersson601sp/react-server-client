//gerador de id version 4
const uuidv4 = require('uuid/v4');

let tarefas = [
   { id: '1', nome: 'Aprender react', concluida: true}, 
   { id: '2', nome: 'Aprender angular', concluida: false}, 
   { id: '3', nome: 'Aprender vue', concluida: false}, 
   { id: '4', nome: 'Aprender node', concluida: false}
];

function listarTarefaId(req, res) {
   const id = req.params.id;
   const tarefa = tarefas.filter(tarefa => tarefa.id === id);

   if(tarefa.length === 0) {
       res.status(404).json({erro: 'Tarefa não encontrada.'})
   }

   res.json(tarefa[0]);
}

function listarTarefas(req, res){
    //se nao enviar numero da pagina definir padrao 1
    const pagina = req.query['pag'] || 1;
    const ordem = req.query['ordem']; //ASC, DESC
    const filtroTarefa = req.query['filtro-tarefa'];
    //se nao enviar numero de tiems por  pagina definir padrao 3
    const itensPorPagina = req.query['itens-por-pagina'] || 3;
     
    //Slice retorna lista a partir do indice 0
    let tarefasRetornar = tarefas.slice(0);
    
    //filtrar
    if(filtroTarefa) {
        tarefasRetornar = tarefasRetornar.filter(
            t => t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase()) >= 0);
    }

    //ordernar
    if(ordem === 'ASC') {
        tarefasRetornar.sort((t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase()) ? 1 : -1);
    } else if (ordem === 'DESC') {
        tarefasRetornar.sort((t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase()) ? 1 : -1);
    }

    //retornar
    res.json({
        totalItens: tarefasRetornar.length,
        tarefas: tarefasRetornar.slice(0).splice((pagina - 1) * itensPorPagina, itensPorPagina), 
        pagina: pagina
    });

}

function CadastrarTarefa(req, res){

   if(!req.body['nome'] && !req.body['concluida']){
       res.status(400).json({erro: "Requisição inválida."});
   }

   const tarefa = {
       id: uuidv4(),
       nome: req.body['nome'],
       concluida: req.body['concluida']
   };

   tarefas.push(tarefa);
   res.json(tarefa);
} 

function AtualizarTarefa(req, res){

    if(!req.body['nome'] && !req.body['concluida']){
        res.status(400).json({erro: "Requisição inválida."});
    }

    const id = req.params.id;
    let tarefaAtualizada = false;

    //map permite modificar a lista
    taerefas = tarefas.map(tarefa => { 
        if(tarefa.id === id) {
            tarefa.nome = req.body['nome'];
            tarefa.concluida = req.body['concluida'];
            tarefaAtualizada = true;
        }
        return tarefa;
    });

    if(!tarefaAtualizada){
        res.status(404).json({erro: "Tarefa não encontrada."});
    };

    res.json({
        id: id,
        nome: req.body['nome'],
        concluida: req.body['concluida']
    });
}

function removerTarefa(req, res){
    const id= req.params.id;
    const numTarefas = tarefas.length;

    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    if(numTarefas === tarefas.length){
        res.status(404).json({erro: "Tarefa não encontrada."})
    }
    res.json({msg: "Tarefa removida com sucesso!"});
}

function concluirTarefa(req,res){
    const id = req.params.id;
    let tarefaConcluida = false;
    tarefas = tarefas.map(tarefa => {
        if(tarefa.id === id){
            tarefa.concluida = true;
            tarefaConcluida = true;
        }
        return tarefa;
    });

    if(!tarefaConcluida) {
        res.status(404).json({erro: 'Tarefa não encontrada.'})
    }
    res.json({msg: 'Tarefa concluida com sucesso!'});
}

module.exports = {
    listarTarefaId,
    listarTarefas,
    CadastrarTarefa,
    AtualizarTarefa,
    removerTarefa,
    concluirTarefa
}