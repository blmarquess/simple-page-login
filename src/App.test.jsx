import { fireEvent, screen, debug } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import renderWithRouter from './testes/utils/renderByPath';
import userEvent from '@testing-library/user-event';

const EMAIL_CORRECT = 'user@mail.com';
const PASSWORD_CORRECT = '123456asdf';

const EMAIL_INCORRECT = 'a@com';
const PASSWORD_INCORRECT = '1234567';

describe('Testes dos elementos', () => {
    test('Verificar se na pagina contem dois inputs um de texto e outro para password', () => {
      renderWithRouter(<App />);
      const inputEMail = screen.getByPlaceholderText(/email/i);
      const inputPassword = screen.getByPlaceholderText(/senha/i);
      expect(inputEMail).toBeInTheDocument();
      expect(inputPassword).toBeInTheDocument();
    });

    test('Verificar se o botão de entrar', () => {
      renderWithRouter(<App />, { route: '/logged' });
      const button = screen.getByText(/Agora você esta logado/i);
      expect(button).toBeInTheDocument();
    });

});


describe('Testes de validação de regras de login e router', () => {
  test('Verificar se o botão de entrar inicia desabilitado ao renderizar a pagina', () => {
    renderWithRouter(<App />)
    const button = screen.getByText(/entrar/i);
    expect(button).toBeDisabled();
  });
  test('Verificar se o botão de entrar continua desabilitado se preencher os campos de forma errada', () => {
    renderWithRouter(<App />)
    const inputEMail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByText(/entrar/i);
    userEvent.type(inputEMail, EMAIL_INCORRECT);
    userEvent.type(inputPassword, PASSWORD_INCORRECT);
    expect(button).toBeDisabled();
  });
  test('Verificar se o botão de entrar continua desabilitado se preencher o campo e-mail de forma errada', () => {
    renderWithRouter(<App />)
    const inputEMail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByText(/entrar/i);
    userEvent.type(inputEMail, { target: { value: EMAIL_INCORRECT } });
    userEvent.type(inputPassword, PASSWORD_CORRECT);
    expect(button).toBeDisabled();
  });
  test('Verificar se o botão de entrar continua desabilitado se preencher o campo password de forma errada', () => {
    renderWithRouter(<App />)
    const inputEMail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByText(/entrar/i);
    userEvent.type(inputEMail, EMAIL_CORRECT);
    userEvent.type(inputPassword, PASSWORD_INCORRECT);
    expect(button).toBeDisabled();
  });
  test('Verificar se o botão de entrar é habilitado se preencher os campos de forma correta', () => {
    renderWithRouter(<App />)
    const inputEMail = screen.getByPlaceholderText(/email/i);
    const inputPassword = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByText(/entrar/i);
    userEvent.type(inputEMail, EMAIL_CORRECT);
    userEvent.type(inputPassword, PASSWORD_CORRECT);

    expect(button).toBeEnabled();
  });

});

test('Testar se na rota / o app renderiza corretamente os inputs para login', () => {
  renderWithRouter(<App />)
  const inputEMail = screen.getByPlaceholderText(/email/i);
  const inputPassword = screen.getByPlaceholderText(/senha/i);
  expect(inputEMail).toBeInTheDocument();
  expect(inputPassword).toBeInTheDocument();
})
