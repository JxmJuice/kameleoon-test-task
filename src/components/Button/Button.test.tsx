import { render, screen } from '@testing-library/react';
import { Button, ButtonType } from './Button';

describe('Button tests',()=>{
    test('renders button', () => {
        render(<Button onClick={()=>{}}>Test</Button>);
        const linkElement = screen.getByText('Test');
        expect(linkElement).toBeInTheDocument();
    });
    test('renders proper type', () => {
        render(<Button type={ButtonType.SECONDARY} onClick={()=>{}}>Test</Button>);
        const linkElement = screen.getByText('Test');
        expect(linkElement).toHaveClass('Secondary');
    });
})

