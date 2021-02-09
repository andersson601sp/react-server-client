import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import GerenciadorTarefas from './gerenciador-tarefas';

it.skip('deve renderizar o projeto sem erro', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GerenciadorTarefas />,div);
  ReactDOM.unmountComponentAtNode(div);
});
