import ReactDOM from 'react-dom';
import Ordenacao from './ordenacao';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de ordenacao', () => {

    it('deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Ordenacao
                ordenarAsc={false}
                ordenarDesc={false} />, div);
        ReactDOM.unmountComponentAtNode(div);        
    });

    it('Deve exibir ordenação padrão', () => {
        const { getByTestId } = render (
            <Ordenacao ordenarAsc={false} ordenarDesc={false} />
        );
        expect(getByTestId('faSort')).not.toHaveClass('hidden');
        expect(getByTestId('faSortUp')).toHaveClass('hidden');
        expect(getByTestId('faSortDown')).toHaveClass('hidden');
    });

    it('Deve exibir ordenação Ascedente', () => {
        const { getByTestId } = render (
            <Ordenacao ordenarAsc={true} ordenarDesc={false} />
        );
        expect(getByTestId('faSort')).toHaveClass('hidden');
        expect(getByTestId('faSortUp')).toHaveClass('hidden');
        expect(getByTestId('faSortDown')).not.toHaveClass('hidden');
    });

    it('Deve exibir ordenação Descedente', () => {
        const { getByTestId } = render (
            <Ordenacao ordenarAsc={false} ordenarDesc={true} />
        );
        expect(getByTestId('faSort')).toHaveClass('hidden');
        expect(getByTestId('faSortUp')).not.toHaveClass('hidden');
        expect(getByTestId('faSortDown')).toHaveClass('hidden');
    });
})