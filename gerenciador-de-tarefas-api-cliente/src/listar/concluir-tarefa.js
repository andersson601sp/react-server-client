import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'

function ConcluirTarefa(props){

    const API_URL_CONCLUIR_TAREFAS = 'http://localhost:3001/gerenciador-tarefas/:id/concluir';

    const [exibirModal, setExibirModal] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);
 
    function handleAbrirModal(event){
        /**Impede que atualiza a tela */
        event.preventDefault();
        setExibirModal(true);
    }

    function handleFecharModal(event){
         setExibirModal(false);
    }

    function handleFecharModalErro(event){
        setExibirModalErro(false);
   }

    async function handleConcluirTarefa(event){
        event.preventDefault();

        try {
            await axios.put(API_URL_CONCLUIR_TAREFAS.replace(':id', props.tarefa.id));
            setExibirModal(false);
            props.recarregarTarefas(true);
        }catch(err) {
            setExibirModal(false);
            setExibirModalErro(false);
        }
    }

    return(
        <span className={props.className}>
            <Button className="btn-sm" onClick={handleAbrirModal} data-testid="btn-abrir-modal">
              <FontAwesomeIcon icon={faClipboardCheck} />    
            </Button> 
            <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Concluir tarefa
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja realmente concluir a seguinte tarefa?
                    <br />
                  <strong>{props.tarefa.nome}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleConcluirTarefa} data-testid="btn-concluir">
                        Sim
                    </Button>
                    <Button variant="light" onClick={handleFecharModal} data-testid="btn-fechar-modal">
                        Não
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={exibirModalErro} onHide={handleFecharModalErro}>
                <Modal.Header closeButton>
                    <Modal.Title>Erro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Erro ao Concluir Tarefa. Tente Novamente.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleFecharModalErro}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </span>
    );

}

ConcluirTarefa.prototype = {
    tarefa: PropTypes.object.isRequired,
    recarregarTarefas: PropTypes.func.isRequired,

    /*Define se elemento vai ser exibido */
    className: PropTypes.string
}


export default ConcluirTarefa;