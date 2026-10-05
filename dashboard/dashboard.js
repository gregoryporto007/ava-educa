import { listarCursos } from "../js/cursos.js";

const usuarioLogado = sessionStorage.getItem("usuarioLogado");

if (!usuarioLogado) {
  window.location.href = "../login/login.html";
} else {
  const usuario = JSON.parse(usuarioLogado);

  const nomeUsuarioElement = document.getElementById("nome-usuario-logado");
  nomeUsuarioElement.textContent = usuario.nome;

  const btnSair = document.getElementById("btn-sair");
  btnSair.addEventListener("click", () => {
    sessionStorage.removeItem("usuarioLogado");
    window.location.href = "../login/login.html";
  });

  const gridCursos = document.getElementById("grid-cursos");

  listarCursos(usuario)
    .then((cursos) => {
      gridCursos.innerHTML = "";

      cursos.forEach((curso) => {
        const card = document.createElement("div");
        card.classList.add("curso-card");

        const nomeCurso = document.createElement("h3");
        nomeCurso.textContent = curso.nomeCurso;

        const dataInicio = document.createElement("p");
        dataInicio.textContent = "Início: " + curso.dataInicio;

        const dataFim = document.createElement("p");
        dataFim.textContent = "Fim: " + curso.dataFim;

        card.appendChild(nomeCurso);
        card.appendChild(dataInicio);
        card.appendChild(dataFim);

        gridCursos.appendChild(card);
      });
    })
    .catch((erro) => {
      gridCursos.innerHTML = `<p class="mensagem-erro">${erro}</p>`;
    });
}
