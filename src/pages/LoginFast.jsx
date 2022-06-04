import React, { useState, useRef, useCallback } from 'react';

const LoginPage = () => {
  const [formState, setFormState] = useState({ user: '', psw: '', hasLogged: false });

  const inputMail = useRef(null);
  const inputPSW = useRef(null);

  const onSubmit = () => setFormState(() => ({
    user: inputMail.current.value,
    psw: inputPSW.current.value,
    hasLogged: true
  }))


  const loginPage = useCallback(() => {
    return (
      <>
        <span>Login:</span>
        <input
          type="email"
          name="user"
          autoFocus
          placeholder="Informe seu e-mail"
          ref={inputMail}
        />
        <span>Senha:</span>
        <input
          ref={inputPSW}
          type="password"
          name="psw"
          placeholder="Digite sua senha"
        />

        <button
          type="button"
          onClick={onSubmit}
        >
          Entrar
        </button>

      </>
    );

  }, []);

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
