import { useState } from 'react';

const PSW_MIN = 8;
const dotCom = /^[a-z0-9._-]+@[a-z0-9]+\.com$/;

export default function Login() {
  const [formState, setFormState] = useState({ user: '', psw: '' });

  const stateUpdate = (key: string, value: string) =>
    setFormState({ ...formState, [key]: value });

  const isValidForm = () =>
    formState.psw.length > PSW_MIN && dotCom.test(formState.user);

  return (
    <>
      <span>Login:</span>
      <input
        type="email"
        name="user"
        autoFocus
        placeholder="Email"
        value={formState.user}
        onChange={({ target: { name, value } }) => stateUpdate(name, value)}
      />
      <span>Senha:</span>
      <input
        value={formState.psw}
        type="password"
        name="psw"
        placeholder="Senha"
        onChange={({ target: { name, value } }) => stateUpdate(name, value)}
      />

        <button
          onClick={() => console.log(formState.user)}
          disabled={!isValidForm()}
        >
          Entrar
        </button>

    </>
  );
}
