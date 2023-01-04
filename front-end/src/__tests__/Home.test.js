import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../Helpers/renderWithRouter';
import Home from '../Pages/Home';

describe('Testando se a Home contém todos elementos corretamente!!', () => {
  it('verifica se existe um input na home.', async () => {
    renderWithRouter(<Home />);
    const inputSearch = await screen.findByRole('textbox');

    expect(inputSearch).toBeInTheDocument();
  });

  it('verifica se na Home contém as 10 primeiras images', async () => {
    renderWithRouter(<Home />);
    const images = await screen.findAllByAltText('Images');

    expect(images).toHaveLength(10);
  });

  it('verfica se existe 4 botões para paginação', async () => {
    renderWithRouter(<Home />);
    const buttonsPage = await screen.findAllByTitle('buttonsPage');

    expect(buttonsPage).toHaveLength(4);
  });

  it('verifica se na home existe um botão para pesquisar', async () => {
    renderWithRouter(<Home />);
    const buttonSearch = await screen.findByTitle('search');

    expect(buttonSearch).toBeInTheDocument();
  });
});