export type Usuario = {
  nome: string;
  email: string;
  senha:string;
};

const CHAVE_USUARIO = "clube-do-livro-usuario";

export function salvarUsuario(usuario: Usuario) {
  localStorage.setItem(
    CHAVE_USUARIO,
    JSON.stringify(usuario)
  );
}

export function buscarUsuario(): Usuario | null {
  const dados = localStorage.getItem(CHAVE_USUARIO);

  if (!dados) {
    return null;
  }

  try {
    return JSON.parse(dados) as Usuario;
  } catch {
    return null;
  }
}

export function validarLogin(
  email: string,
  senha: string
): boolean {
  const usuario = buscarUsuario();

  return (
    usuario !== null &&
    usuario.email.toLowerCase() === email.toLowerCase() &&
    usuario.senha === senha
  );
}