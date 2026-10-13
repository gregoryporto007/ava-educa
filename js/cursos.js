import { cursos } from "../dados/listagem-cursos.js";

export function listarCursos(usuario) {
  return new Promise((resolve, reject) => {
    const cursosFiltrados = cursos.filter(
      (curso) => curso.emailProfessor === usuario.email
    );

    if (cursosFiltrados.length > 0) {
      resolve(cursosFiltrados);
    } else {
      reject("Não há cursos cadastrados para esse usuário");
    }
  });
}
