import { usuarios } from "../dados/listagem-usuarios.js";

/**
 * Realiza a autenticação do usuário retornando uma Promise.
 * Atende ao RF08 e RF12.
 */
export function login(email, senha) {
  return new Promise((resolve, reject) => {
    // Procura o usuário pelo email e a senha digitados
    const usuarioEncontrado = usuarios.find(
      (user) => user.email === email && user.senha === senha
    );

    if (usuarioEncontrado) {
      // Sucesso: resolve e retorna o objeto do usuário autenticado
      resolve(usuarioEncontrado);
    } else {
      // Falha: reject
      reject("Dados incorretos. Favor verificar e tentar novamente");
    }
  });
}