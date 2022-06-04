import React, { useState, useCallback } from 'react';

const PSW_MIN = 8;
const dotCom = /^[a-z0-9._-]+@[a-z0-9]+\.com$/;

const LoginPage = () => {
  const [formState, setFormState] = useState({ user: '', psw: '', hasLogged: false });

  const stateUpdate = useCallback((key, value) =>
    setFormState((state) => ({ ...state, [key]: value })), []);

  const isValidForm = useCallback(() =>
    formState.psw.length > PSW_MIN && dotCom.test(formState.user),
    [formState.psw.length, formState.user]);

  const loginPage = useCallback(() => {
    return (
      <>
        <span>Login:</span>
        <input
          type="email"
          name="user"
          autoFocus
          placeholder="Informe seu e-mail"
          value={formState.user}
          onChange={({ target: { name, value } }) => stateUpdate(name, value)}
        />
        <span>Senha:</span>
        <input
          value={formState.psw}
          type="password"
          name="psw"
          placeholder="Digite sua senha"
          onChange={({ target: { name, value } }) => stateUpdate(name, value)}
        />

        <button
          onClick={() => stateUpdate('hasLogged', true)}
          disabled={!isValidForm()}
        >
          Entrar
        </button>

      </>
    );

  }, [formState.psw, formState.user, isValidForm, stateUpdate])

  const hasLoggedOn = useCallback(() => (
    <>
      <h1>Bem vindo, {formState.user}!</h1>
      <span>A aplicação completa com CSS e testes esta no meu
        {' '} <a href="https://github.com/blmarquess/simple-page-login">
          github</a>
      </span>
    </>
  ), [formState.user]);

  return formState.hasLogged ? hasLoggedOn() : loginPage();
}

export default LoginPage;
