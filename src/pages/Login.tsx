import { useState } from 'react';
import { Link } from 'react-router-dom';

const PSW_MIN = 8;
const dotCom = /^[a-z0-9._-]+@[a-z0-9]+\.com$/;

export default function Login() {
  const [formState, setFormState] = useState({ user: '', psw: '' });

  const stateUpdate = (key: string, value: string) =>
    setFormState((state) => ({ ...state, [key]: value }));

  const isValidForm = () =>
    formState.psw.length > PSW_MIN && dotCom.test(formState.user);

  return (
    <section className="formBox">
      <span>Login:</span>
      <input
        type="email"
        name="user"
        autoFocus
        placeholder="Email"
        className="formInputs"
        value={formState.user}
        onChange={({ target: { name, value } }) => stateUpdate(name, value)}
      />
      <span>Senha:</span>
      <input
        value={formState.psw}
        type="password"
        name="psw"
        placeholder="Senha"
        className="formInputs"
        onChange={({ target: { name, value } }) => stateUpdate(name, value)}
      />
      <Link
            style={{ display: "block" }}
            to={`/logged`}
            key="42"
          >
        <button
          onClick={() => console.log(formState.user)}
          disabled={!isValidForm()}
        >
          Entrar
        </button>
      </Link>
    </section>
  );
}
