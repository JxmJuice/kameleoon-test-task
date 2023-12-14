import { fireEvent, render, screen } from '@testing-library/react';
import { Searchbar } from './Searchbar';

describe('Searchbar tests', () => {
    test('render searchbar', () => {
        render(<Searchbar onChange={()=>{}} resultsNumber={1} />);
        const input = screen.getByTestId('searchbar');
        expect(input).toBeInTheDocument();
    });
    test('test input', () => {
        render(<Searchbar onChange={()=>{}} resultsNumber={1} />);
        const input: HTMLInputElement = screen.getByTestId('searchbar-input');
        expect(input.value).toBe('');
        fireEvent.change(input, { target: { value: '123' } });
        expect(input.value).toBe('123');
    });
})

