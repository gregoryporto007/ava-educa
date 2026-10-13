import { Aluno } from "../js/Aluno.js";
import { cadastrarAluno } from "../js/alunos.js";

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

  const inputCep = document.getElementById("input-cep");

  inputCep.addEventListener("blur", () => {
    const cep = inputCep.value.replace(/\D/g, "");

    if (cep.length === 8) {
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            document.getElementById("logradouro").value = data.logradouro || "";
            document.getElementById("bairro").value = data.bairro || "";
            document.getElementById("cidade").value = data.localidade || "";
            document.getElementById("estado").value = data.uf || "";
          }
        })
        .catch((erro) => {
          console.error("Erro ao buscar CEP:", erro);
        });
    }
  });

  const formCadastro = document.getElementById("form-cadastro-aluno");

  formCadastro.addEventListener("submit", (event) => {
    event.preventDefault();

    const dataNascimento = document.getElementById("dataNascimento").value;

    const dataNasc = moment(dataNascimento);
    const dataMinima = moment("1900-01-01");
    const dataAtual = moment();

    if (dataNasc.isSameOrBefore(dataMinima) || dataNasc.isSameOrAfter(dataAtual)) {
      alert("A data de nascimento deve ser maior que 01/01/1900 e menor que a data atual.");
      return;
    }

    const nome = document.getElementById("nome").value;
    const genero = document.getElementById("genero").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("telefone").value;
    const email = document.getElementById("email").value;
    const cep = document.getElementById("input-cep").value;
    const logradouro = document.getElementById("logradouro").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const numero = document.getElementById("numero").value;
    const complemento = document.getElementById("complemento").value;

    const novoAluno = new Aluno(
      nome,
      genero,
      dataNascimento,
      cpf,
      telefone,
      email,
      cep,
      cidade,
      estado,
      logradouro,
      numero,
      complemento,
      bairro
    );

    cadastrarAluno(novoAluno)
      .then(() => {
        alert("Aluno cadastrado com sucesso!");
        formCadastro.reset();
      })
      .catch((erro) => {
        alert("Erro ao cadastrar aluno: " + erro);
      });
  });
}
