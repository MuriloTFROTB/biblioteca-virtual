
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { buscarUsuario, validarLogin } from "../lib/usuarios";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  function entrar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    setErro("");

    const usuario = buscarUsuario();

    if (!usuario) {
      setErro("Nenhuma conta cadastrada neste navegador.");
      return;
    }

    if (!validarLogin(email, senha)) {
      setErro("E-mail ou senha incorretos.");
      return;
    }

    router.push("/home");
  }

  return (
    <main className="login-container">
      <form className="login-card" onSubmit={entrar}>

        <h1>Bem-vindo de volta!</h1>

        <p className="descricao">
          Entre na sua conta do Clube do Livro.
        </p>

        <label htmlFor="email">E-mail</label>

        <input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          required
        />

        <label htmlFor="senha">Senha</label>

        <input
          id="senha"
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(evento) => setSenha(evento.target.value)}
          required
        />

        {erro && <p className="erro">{erro}</p>}

        <button type="submit">Entrar</button>

        <p className="cadastro">
          Ainda não tem conta?{" "}
          <Link href="/register">Cadastre-se</Link>
        </p>
      </form>

      <style jsx>{`
        .login-container {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 24px;
          background: #091426;
          color: #f1f5ff;
          font-family: Arial, sans-serif;
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border: 1px solid #263650;
          border-radius: 14px;
          background: #111f34;
        }

        .login-logo {
          font-size: 42px;
          text-align: center;
        }

        h1 {
          margin: 4px 0;
          text-align: center;
          font-size: 25px;
        }

        .descricao {
          margin: 0 0 18px;
          text-align: center;
          color: #aabbd5;
        }

        label {
          font-size: 14px;
        }

        input {
          width: 100%;
          padding: 13px;
          border: 1px solid #344762;
          border-radius: 7px;
          background: #091426;
          color: white;
          outline: none;
        }

        input:focus {
          border-color: #6475ff;
        }

        button {
          margin-top: 10px;
          padding: 13px;
          border: 0;
          border-radius: 7px;
          background: #4c5df0;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        button:hover {
          background: #6372ff;
        }

        .erro {
          margin: 0;
          color: #ff9292;
          font-size: 13px;
        }

        .cadastro {
          margin: 12px 0 0;
          text-align: center;
          color: #aabbd5;
          font-size: 13px;
        }

        .cadastro a {
          color: #8c9aff;
        }
      `}</style>
    </main>
  );
}
