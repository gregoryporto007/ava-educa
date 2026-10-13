import { login } from "../js/auth.js";

const formLogin = document.getElementById("form-login");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const mensagemErro = document.getElementById("mensagem-erro");
const linkEsqueciSenha = document.getElementById("link-esqueci-senha");

linkEsqueciSenha.addEventListener("click", (event) => {
  event.preventDefault();
  window.alert("Funcionalidade ainda em construção. ");
});

formLogin.addEventListener("submit", (event) => {
  event.preventDefault();

  mensagemErro.textContent = "";
  mensagemErro.style.display = "none";

  const email = inputEmail.value.trim();
  const senha = inputSenha.value.trim();

  login(email, senha)
    .then((usuarioValido) => {
      sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));
      window.location.href = "../dashboard/dashboard.html";
    })
    .catch((erro) => {
      mensagemErro.textContent = erro;
      mensagemErro.style.display = "block";
    });
});