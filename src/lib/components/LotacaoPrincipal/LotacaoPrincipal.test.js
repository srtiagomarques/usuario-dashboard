import React from 'react';

// RTL
import { render } from '@testing-library/react';

// Components
import LotacaoPrincipal from '../LotacaoPrincipal';

describe('LotacaoPrincipal component', () => {
    test('Should renders the component', () => {
        const { container } = render(<LotacaoPrincipal foro={{}} />);
        expect(container).toBeDefined();
    });
});