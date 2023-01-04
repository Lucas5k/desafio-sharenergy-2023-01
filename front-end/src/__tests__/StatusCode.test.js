import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../Helpers/renderWithRouter';
import StatusCode from '../Pages/StatusCode';

describe('Testando se a tela StatusCode contém todos elementos corretamente!!', () => {
  it('verifica se existe uma imagem na tela', async () => {
    renderWithRouter(<StatusCode />);
    const result = await screen.findByAltText('status_code');

    expect(result).toBeInTheDocument();
  });

  it('verifica se existe um botão na tela', async () => {
    renderWithRouter(<StatusCode />);
    const result = await screen.findByTitle('select');

    expect(result).toBeInTheDocument();
  });
});