import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Jumbotron, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter'; 
import axios from 'axios';
import Tarefa from '../models/tarefa.model';

function AtualizarTarefa(props){

    const API_URL_ATUALIZAR_TAREFAS = 'http://localhost:3001/gerenciador-tarefas/';

    const [tarefa, setTarefa] = useState('');
    const [exibirModal, setExibirModal] = useState(false);
    const [formValidado, setFormValidado] = useState(false);
    const [carregarTarefa, setCarregarTarefa] = useState(true);
    const [exibirModalErro, setExibirModalErro] = useState(false);

     useEffect(() => {
        async function obterTarefa() {
            try {
                let { data } = await axios.get(`${API_URL_ATUALIZAR_TAREFAS}${props.id}`);
                setTarefa(data.nome);
            } catch(err) {
                navigate('/');
            }
        }

        if(carregarTarefa) {          
            obterTarefa();
            setCarregarTarefa(false);   
        }

    },[carregarTarefa, props]);

    function voltar(event){
        event.preventDefault();
        navigate('/');
    }

    function handleFecharModal(){
        navigate('/');
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
    }

    async function atualizar(event){
        event.preventDefault();
        setFormValidado(true);
        setExibirModal(true);
        if (event.currentTarget.checkValidity() === true) {
            try {
                const tarefaAtualizar =  new Tarefa(null, tarefa, false);
                await axios.put(API_URL_ATUALIZAR_TAREFAS + props.id, tarefaAtualizar);
                setExibirModal(true);
            } catch(err) {
                setExibirModalErro(true);
            }
        }
    }

    function handleTxtTarefa(event){
        setTarefa(event.target.value);
    }

    return (
        <div>
            <h3 className="text-center">Atualizar</h3>
            <Jumbotron>
                <Form onSubmit={atualizar} noValidate validated={formValidado}>
                    <Form.Group>
                        <Form.Label>Tarefa</Form.Label>
                        <Form.Control
                           type="text"
                           placeholder="Digite a tarefa"
                           minLength="5"
                           maxLength="100"
                           required
                           data-testid="txt-tarefa" 
                           onChange={handleTxtTarefa}
                           value={tarefa} />
                        <Form.Control.Feedback type="invalid"> 
                             A tarefa deve conter ao menos 3 caracteres.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="text-center">
                    <Button
                        variant="success"
                        type="submit"
                        data-testid="btn-atualizar">Atualizar
                        </Button>
                        &nbsp;
                        <A href="/" className="btn btn-light" onClick={voltar}>Voltar</A>
                    </Form.Group>
                </Form>
                <Modal show={exibirModal} onHide={handleFecharModal}  data-testid="modal" >
                    <Modal.Header closeButton>
                        <Modal.Title>Sucesso</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  data-testid="modal-body" >
                        Tarefa Atualizada com sucesso!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                        variant="success"
                        onClick={handleFecharModal}
                        >
                           Continuar
                        </Button>
                    </Modal.Footer>
                </Modal> 

                <Modal show={exibirModalErro} onHide={handleFecharModalErro}  data-testid="modal" >
                    <Modal.Header closeButton>
                        <Modal.Title>Erro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body  data-testid="modal-body" >
                        Erro ao tentar Atualizar tarefa. Tente novamente.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                        variant="warning"
                        onClick={handleFecharModalErro}
                        >
                           Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>   
            </Jumbotron>
        </div>
    )
}

AtualizarTarefa.propTypes = {
    id: PropTypes.string.isRequired
}

export default AtualizarTarefa;