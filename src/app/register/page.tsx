"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { salvarUsuario } from "../lib/usuarios";
import Link from "next/link";

export default function Registro() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function cadastrar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    salvarUsuario({
      nome,
      email,
      senha,
    });
    router.push("/login");
  }

  return (
    <main className="registro">
      <form onSubmit={cadastrar} className="formulario">
        <h1>Criar conta</h1>
        <p>Faça seu cadastro no Clube do Livro.</p>

        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Seu nome"
          required
        />

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
        />

        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Crie uma senha"
          required
          minLength={6}
        />

        <button type="submit">Cadastrar</button>
        <p className="login">
          Ja tem conta? <Link href="/login">Cadastre-se</Link>
        </p>
      </form>

      <style jsx>{`
        .registro {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 24px;
          background: #091426;
          color: white;
          font-family: Arial, sans-serif;
        }

        .formulario {
          width: 100%;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 30px;
          border: 1px solid #263650;
          border-radius: 14px;
          background: #111f34;
        }

        h1 {
          margin: 0;
        }

        p {
          color: #aabbd5;
          margin-bottom: 16px;
        }

        label {
          font-size: 14px;
        }

        input {
          padding: 12px;
          border: 1px solid #344762;
          border-radius: 7px;
          background: #091426;
          color: white;
        }

        button {
          margin-top: 12px;
          padding: 13px;
          border: 0;
          border-radius: 7px;
          background: #4c5df0;
          color: white;
          cursor: pointer;
        }
        .login {
          margin: 12px 0 0;
          text-align: center;
          color: #aabbd5;
          font-size: 13px;
        }

        .login a {
          color: #8c9aff;
        }
      `}</style>
    </main>
  );
}
