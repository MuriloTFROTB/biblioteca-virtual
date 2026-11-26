"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { buscarUsuario } from "../lib/usuarios";
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

type Livro = { id: string; titulo: string; descricao: string; capa: string };

function chaveLivros() {
  return "clube-do-livro-acervo:" + (buscarUsuario()?.email.toLowerCase() ?? "local");
}

function carregarLivros(): Livro[] {
  return JSON.parse(localStorage.getItem(chaveLivros()) ?? "[]");
}

export default function Home() {
  const [usuarioAberto, setUsuarioAberto] = useState(false);
  const dialogo = useRef<HTMLDialogElement>(null);
  const avatar = useRef<HTMLButtonElement>(null);
  const [livros, setLivros] = useState<Livro[]>([]);
  const [descricao, setDescricao] = useState("");
  const [aviso, setAviso] = useState("");
  const palavras = descricao.trim() ? descricao.trim().split(/\s+/).length : 0;

  useEffect(() => {
    function atualizar() {
      try {
        setLivros(carregarLivros());
      } catch {
        setAviso("Não foi possível carregar os livros deste navegador.");
      }
    }
    atualizar();
    window.addEventListener("storage", atualizar);
    return () => window.removeEventListener("storage", atualizar);
  }, []);

  function salvarLivro(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);
    const titulo = String(dados.get("titulo")).trim();
    const capa = String(dados.get("capa")).trim();
    if (!titulo || !palavras || palavras > 100) return;
    try {
      const livro = { id: crypto.randomUUID(), titulo, descricao: descricao.trim(), capa };
      const atualizados = [livro, ...carregarLivros()];
      localStorage.setItem(chaveLivros(), JSON.stringify(atualizados));
      setLivros(atualizados);
    } catch {
      setAviso("Não foi possível salvar o livro neste navegador.");
      return;
    }
    evento.currentTarget.reset();
    setDescricao("");
    setAviso("Livro adicionado.");
    dialogo.current?.close();
  }

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
        <div role="status">{aviso}</div>
        {livros.length > 0 && (
          <section className="secao">
            <div className="secaoTopo">
              <div>
                <h2>📚 Livros adicionados</h2>
                <p>Livros que você cadastrou no clube.</p>
              </div>
            </div>
            <div className="livrosEmprestados">
              {livros.map(livro => (
                <article key={livro.id} className="cardEmprestimo">
                  {/* As capas externas são fornecidas pelo leitor. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="capaEmprestimo capaAdicionada" src={livro.capa} alt={`Capa de ${livro.titulo}`} loading="lazy" />
                  <div className="detalhesLivro">
                    <h3>{livro.titulo}</h3>
                    <p>{livro.descricao}</p>
                    <span className="badgeAndamento">Cadastrado</span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
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
            <button onClick={() => {
              setUsuarioAberto(false);
              setAviso("");
              dialogo.current?.showModal();
            }}>Adicionar livro</button>
            <a href="/meus-livros">Meus empréstimos</a>
            <button onClick={() => setUsuarioAberto(false)}>Fechar</button>
          </div>
        )}

        <button
          className="avatarUsuario"
          ref={avatar}
          aria-expanded={usuarioAberto}
          onClick={() => setUsuarioAberto(!usuarioAberto)}
          aria-label="Abrir perfil do usuário"
        >
          M
          <span className="online" />
        </button>
      </div>
      <dialog className="cadastroLivro" ref={dialogo} aria-labelledby="tituloCadastro" onClose={() => avatar.current?.focus()}>
        <form onSubmit={salvarLivro}>
          <h2 id="tituloCadastro">Adicionar livro</h2>
          <label>Nome do livro<input name="titulo" required pattern={".*\\S.*"} /></label>
          <label>Descrição<textarea required rows={5} value={descricao} onChange={e => setDescricao(e.target.value)} aria-describedby="contadorPalavras" /></label>
          <small id="contadorPalavras">{palavras} de 100 palavras</small>
          <label>URL da capa<input type="url" name="capa" required pattern="https?://.+" placeholder="https://exemplo.com/capa.jpg" /></label>
          {aviso && <p role="alert">{aviso}</p>}
          <div className="acoesCadastro">
            <button type="button" onClick={() => dialogo.current?.close()}>Cancelar</button>
            <button disabled={!palavras || palavras > 100}>Salvar livro</button>
          </div>
        </form>
      </dialog>
    </main>
  );
}
