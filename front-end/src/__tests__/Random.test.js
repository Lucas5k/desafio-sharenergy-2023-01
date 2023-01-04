import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../Helpers/renderWithRouter';
import Random from '../Pages/Random';

describe('Testando se a tela de Random, está funcionando corretamente', () => {
  it('verifica se existe uma imagem na tela', async () => {
    renderWithRouter(<Random />);
    const result = await screen.findByAltText('Random dogs');

    expect(result).toBeInTheDocument();
  });

  it('verifica se existe um botão na tela', async () => {
    renderWithRouter(<Random />);
    const result = await screen.findByRole('button');

    expect(result).toBeInTheDocument();
  });
});
