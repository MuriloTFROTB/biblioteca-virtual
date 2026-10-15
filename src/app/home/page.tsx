"use client";

import { useState } from "react";
import "./global.css";

const emprestimos = [
  {
    id: 1,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    capa: "📕",
    devolucao: "19 out. 2026",
  },
  {
    id: 2,
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    capa: "📘",
    devolucao: "22 out. 2026",
  },
  {
    id: 3,
    titulo: "1984",
    autor: "George Orwell",
    capa: "📙",
    devolucao: "17 out. 2026",
  },
];

const leituras = [
  {
    id: 1,
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    capa: "📗",
    progresso: 65,
    capitulo: "Capítulo 8 de 12",
    status: "Lendo agora",
  },
  {
    id: 2,
    titulo: "A Coragem de Ser Imperfeito",
    autor: "Brené Brown",
    capa: "📔",
    progresso: 50,
    capitulo: "Capítulo 5 de 10",
    status: "Lendo agora",
  },
  {
    id: 3,
    titulo: "Hábitos Atômicos",
    autor: "James Clear",
    capa: "📒",
    progresso: 20,
    capitulo: "Capítulo 3 de 14",
    status: "Pausado",
  },
];

export default function Home() {
  const [usuarioAberto, setUsuarioAberto] = useState(false);

  return (
    <main className="homepage">
      <header className="navbar">

        <nav>
          <a className="navAtivo" href="#">
            Início
          </a>
          <a href="/livros">Buscar livros</a>
        </nav>

        
      </header>

      <section className="hero">
        <div className="heroConteudo">
          <p className="saudacao">Olá, Murilo!</p>

          <h1>
            Grandes histórias
            <br />
            <span>te esperam.</span>
          </h1>

          <p className="heroDescricao">
            Explore nosso acervo e encontre o próximo livro que vai te
            acompanhar.
          </p>

          <a className="botaoBuscar" href="/livros">
            <span>⌕</span> Buscar livros
          </a>
        </div>

        <div className="heroDecoracao" aria-hidden="true">
          <span>📚</span>
          <p>
            Ler é viver
            <br />
            mil vidas
            <br />
            em uma só.
          </p>
        </div>
      </section>

      <div className="conteudo">
        <section className="secao" id="emprestimos">
          <div className="secaoTopo">
            <div>
              <h2>📚 Empréstimos ativos</h2>
              <p>Livros que você pegou emprestado e ainda não devolveu.</p>
            </div>

            <a href="/meus-livros" className="verTodos">
              Ver todos →
            </a>
          </div>

          <div className="livrosEmprestados">
            {emprestimos.map((livro) => (
              <article className="cardEmprestimo" key={livro.id}>
                <div className="capaEmprestimo">{livro.capa}</div>

                <div className="detalhesLivro">
                  <h3>{livro.titulo}</h3>
                  <p>{livro.autor}</p>

                  <span className="dataDevolucao">
                    ◷ Devolução em
                    <br />
                    {livro.devolucao}
                  </span>

                  <span className="badgeAndamento">Em andamento</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="secao">
          <div className="secaoTopo">
            <div>
              <h2>◷ Lendo recentemente</h2>
              <p>Aqui estão os livros que você está lendo ultimamente.</p>
            </div>

            <a href="/minhas-leituras" className="verTodos">
              Ver todos →
            </a>
          </div>

          <div className="livrosLeitura">
            {leituras.map((livro) => (
              <article className="cardLeitura" key={livro.id}>
                <div className="capaLeitura">{livro.capa}</div>

                <div className="detalhesLeitura">
                  <h3>{livro.titulo}</h3>
                  <p>{livro.autor}</p>

                  <span className="capitulo">{livro.capitulo}</span>

                  <span
                    className={
                      livro.status === "Pausado"
                        ? "badgePausado"
                        : "badgeLeitura"
                    }
                  >
                    {livro.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <div className="perfilFlutuante">
        {usuarioAberto && (
          <div className="menuPerfil">
            <strong>Murilo</strong>
            <span>Leitor</span>
            <a href="/perfil">Meu perfil</a>
            <a href="/meus-livros">Meus empréstimos</a>
            <button onClick={() => setUsuarioAberto(false)}>Fechar</button>
          </div>
        )}

        <button
          className="avatarUsuario"
          onClick={() => setUsuarioAberto(!usuarioAberto)}
          aria-label="Abrir perfil do usuário"
        >
          M
          <span className="online" />
        </button>
      </div>
    </main>
  );
}
