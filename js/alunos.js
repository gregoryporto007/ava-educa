import { alunos } from "../dados/listagem-alunos.js";

export function cadastrarAluno(aluno) {
  return new Promise((resolve, reject) => {
    try {
      const novoId = alunos.length > 0 ? Math.max(...alunos.map(a => a.id)) + 1 : 1;
      aluno.id = novoId;
      alunos.push(aluno);
      resolve(aluno);
    } catch (erro) {
      reject("Erro ao cadastrar aluno: " + erro.message);
    }
  });
}
