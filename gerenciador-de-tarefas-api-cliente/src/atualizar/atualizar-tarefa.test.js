import ReactDOM from 'react-dom';
import AtualizarTarefa from './atualizar-tarefa';
import Tarefa from '../models/tarefa.model';
import {  render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe('Teste docomponente de atualizar tarefa', () => {

    const tarefaId = "1";

    it('Deve exibir a Modal de sucesso ao alterar uma tarefa', async () => {
        axiosMock.get.mockResolvedValueOnce({ data: { nome: 'Estudar React'}});
        const { findByTestId } =  render(<AtualizarTarefa id={tarefaId} />);
        fireEvent.click(await findByTestId('btn-atualizar'));
        const modal = await findByTestId('modal');
        expect(modal).toHaveTextContent('Sucesso');
    });
})