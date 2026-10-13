import { usuarios } from "../dados/listagem-usuarios.js";


export function login(email, senha) {
  return new Promise((resolve, reject) => {
    const usuarioEncontrado = usuarios.find(
      (user) => user.email === email && user.senha === senha
    );

    if (usuarioEncontrado) {
      resolve(usuarioEncontrado);
    } else {
      reject("Dados incorretos. Verifique seu e-mail e senha novamente.");
    }
  });
}