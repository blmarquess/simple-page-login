import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from './App';
import '@testing-library/jest-dom';
import renderWithRouter from './testes/utils/renderByPath';
import userEvent from '@testing-library/user-event';
import { userCorrect, userEmailIncorrect, userIncorrect, userPasswordIncorrect } from './testes/utils/mocks/loginMocks';


// const EMAIL_CORRECT = 'user@mail.com';
// const PASSWORD_CORRECT = '123456asdf';

// const EMAIL_INCORRECT = 'a@com';
// const PASSWORD_INCORRECT = '1234567';

describe('Testes dos elementos', () => {
  const setup = () => { renderWithRouter(<App />) };

  beforeEach(async () => setup());
  test('Verificar se na pagina contem dois inputs um de texto e outro para password', async () => {
    const inputEMail = await screen.findByPlaceholderText(/Email/i);
    const inputPassword = await screen.findByPlaceholderText(/senha/i);
      expect(inputEMail).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
    });

    test('Verificar se o botão de entrar', () => {
      const button = screen.getByText(/Entrar/i);
      expect(button).toBeInTheDocument();
    });

});


describe('Testes de validação de regras de login e router', () => {
  const setup = () => { renderWithRouter(<App />) };

  beforeEach(async () => setup());
  test('Verificar se o botão de entrar inicia desabilitado ao renderizar a pagina', async () => {
    const button = await screen.findByRole('button', { name: /entrar/i });
    expect(button).toBeDisabled();
  });
  test('Verificar se o botão de entrar continua desabilitado se preencher os campos de forma errada', async () => {
    const inputEMail = await screen.findByPlaceholderText(/Email/i);
    const inputPassword = await screen.findByPlaceholderText(/senha/i);

    await act(async () => {
      for (const user of userIncorrect) {
        userEvent.type(inputEMail, user.email);
        userEvent.type(inputPassword, user.password);
        const button = await screen.findByRole('button', { name: /entrar/i });
        expect(button).toBeDisabled();
        renderWithRouter(<App />);
      };
    });
  });
  test('Verificar se o botão de entrar continua desabilitado se preencher o campo e-mail de forma errada', async () => {
    const inputEMail = await screen.findByPlaceholderText(/Email/i);
    const inputPassword = await screen.findByPlaceholderText(/senha/i);

    await act(async () => {
      for (const user of userEmailIncorrect) {
        userEvent.type(inputEMail, user.email);
        userEvent.type(inputPassword, user.password);
        const button = await screen.findByRole('button', { name: /entrar/i });
        expect(button).toBeDisabled();
        renderWithRouter(<App />);
      };
    });
  });
  test('Verificar se o botão de entrar continua desabilitado se preencher o campo password de forma errada', async () => {
    // renderWithRouter(<App />);
    const inputEMail = await screen.findByPlaceholderText(/Email/i);
    const inputPassword = await screen.findByPlaceholderText(/senha/i);

    await act(async () => {
      for (const user of userPasswordIncorrect) {
        userEvent.type(inputEMail, user.email);
        userEvent.type(inputPassword, user.password);
        const button = await screen.findByRole('button', { name: /entrar/i });
        expect(button).toBeDisabled();
        renderWithRouter(<App />);
      };
    });
  });
  test('Verificar se o botão de entrar é habilitado se preencher os campos de forma correta', async () => {
    const inputEMail = await screen.findByPlaceholderText(/Email/i);
    const inputPassword = await screen.findByPlaceholderText(/senha/i);
    await act(async () => {
      for (const user of userCorrect) {
        userEvent.type(inputEMail, user.email);
        userEvent.type(inputPassword, user.password);
        console.log(inputEMail);
        expect(screen.getByRole('button', { name: /entrar/i })).toBeEnabled();
      };
    });
  });

});
