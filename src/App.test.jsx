import { screen, act, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import renderWithRouter from './testes/utils/renderByPath';
import { userCorrect, userEmailIncorrect, userIncorrect, userPasswordIncorrect } from './testes/utils/mocks/loginMocks';

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
        fireEvent.change(inputEMail, { target: { value: user.email } });
        fireEvent.change(inputPassword, { target: { value: user.password } });
        const button = await screen.findByRole('button', { name: /entrar/i });
        expect(button).toBeDisabled();
      };
    });
  });
  test('Verificar se o botão de entrar continua desabilitado se preencher o campo e-mail de forma errada', async () => {
    const inputEMail = await screen.findByPlaceholderText(/Email/i);
    const inputPassword = await screen.findByPlaceholderText(/senha/i);

    await act(async () => {
      for (const user of userEmailIncorrect) {
        fireEvent.change(inputEMail, { target: { value: user.email } });
        fireEvent.change(inputPassword, { target: { value: user.password } });
        const button = await screen.findByRole('button', { name: /entrar/i });
        expect(button).toBeDisabled();
      };
    });
  });
  test('Verificar se o botão de entrar continua desabilitado se preencher o campo password de forma errada', async () => {
    const inputEMail = await screen.findByPlaceholderText(/Email/i);
    const inputPassword = await screen.findByPlaceholderText(/senha/i);

    await act(async () => {
      for (const user of userPasswordIncorrect) {
        fireEvent.change(inputEMail, { target: { value: user.email } });
        fireEvent.change(inputPassword, { target: { value: user.password } });
        const button = await screen.findByRole('button', { name: /entrar/i });
        expect(button).toBeDisabled();
      };
    });
  });
  test('Verificar se o botão de entrar é habilitado se preencher os campos de forma correta', async () => {
    const inputEMail = await screen.findByPlaceholderText(/Email/i);
    const inputPassword = await screen.findByPlaceholderText(/senha/i);
    await act(async () => {
      for (const user of userCorrect) {
        fireEvent.change(inputEMail, { target: { value: user.email } });
        fireEvent.change(inputPassword, { target: { value: user.password } });
        const button = await screen.findByRole('button', { name: /entrar/i });
        expect(button).toBeEnabled();
      };
    });
  });

});
