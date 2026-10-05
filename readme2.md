# AVA-EDUCA+ - Estruturação Completa do Projeto

Documentação completa com estrutura de arquivos e códigos do sistema.

## Estrutura do Projeto

```
AVA-EDUCA/
├── assets/
│   ├── icons/
│   │   ├── avaicon.png
│   │   ├── exit.svg
│   │   └── favicon.png
│   └── images/
│       └── ava-logo.png
├── cadastro-aluno/
│   ├── cadastro-aluno.html
│   ├── cadastro-aluno.css
│   └── cadastro-aluno.js
├── css/
│   └── style.css
├── dados/
│   ├── listagem-alunos.js
│   ├── listagem-cursos.js
│   └── listagem-usuarios.js
├── dashboard/
│   ├── dashboard.html
│   ├── dashboard.css
│   └── dashboard.js
├── js/
│   ├── Aluno.js
│   ├── alunos.js
│   ├── app.js
│   ├── auth.js
│   └── cursos.js
├── login/
│   ├── login.html
│   ├── login.css
│   └── login.js
├── index.html
├── package.json
└── README.md
```

## Arquivos e Códigos

### index.html

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AVA-EDUCA+</title>
    <link rel="icon" href="./assets/icons/favicon.png">
</head>
<body>
    <script type="module" src="./js/app.js"></script>
</body>
</html>
```

### package.json

```json
{
  "name": "ava-educa",
  "version": "1.0.0",
  "type": "module",
  "description": "Protótipo do sistema AVA-EDUCA+"
}
```

### js/app.js

```javascript
const usuarioLogado = sessionStorage.getItem("usuarioLogado");

if (usuarioLogado) {
  window.location.href = "./dashboard/dashboard.html";
} else {
  window.location.href = "./login/login.html";
}
```

### js/auth.js

```javascript
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
```

### js/Aluno.js

```javascript
export class Aluno {
  constructor(nome, genero, dataNascimento, cpf, telefone, email, cep, cidade, estado, logradouro, numero, complemento, bairro) {
    this.nome = nome;
    this.genero = genero;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
    this.telefone = telefone;
    this.email = email;
    this.cep = cep;
    this.cidade = cidade;
    this.estado = estado;
    this.logradouro = logradouro;
    this.numero = numero;
    this.complemento = complemento;
    this.bairro = bairro;
  }
}
```

### js/alunos.js

```javascript
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
```

### js/cursos.js

```javascript
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
```

### dados/listagem-usuarios.js

```javascript
export const usuarios = [
  {
    id: 1,
    nome: "Ana Carolina Silva",
    email: "ana.silva@edutech.com",
    senha: "123456"
  },
  {
    id: 2,
    nome: "Carlos Eduardo Santos",
    email: "carlos.santos@edutech.com",
    senha: "654321"
  },
  {
    id: 3,
    nome: "Mariana Oliveira Costa",
    email: "mariana.costa@edutech.com",
    senha: "edu2026"
  }
];
```

### dados/listagem-alunos.js

```javascript
export let alunos = [
  {
    id: 1,
    nome: "Lucas Henrique Martins",
    genero: "Masculino",
    dataNascimento: "2002-05-18",
    cpf: "123.456.789-00",
    telefone: "(11) 98888-1234",
    email: "lucas.martins@email.com",
    cep: "01001-000",
    cidade: "São Paulo",
    estado: "SP",
    logradouro: "Praça da Sé",
    numero: "100",
    complemento: "Apto 12",
    bairro: "Sé"
  },
  {
    id: 2,
    nome: "Beatriz Fernanda Oliveira",
    genero: "Feminino",
    dataNascimento: "2001-11-27",
    cpf: "987.654.321-00",
    telefone: "(11) 97777-5678",
    email: "beatriz.oliveira@email.com",
    cep: "13010-000",
    cidade: "Campinas",
    estado: "SP",
    logradouro: "Rua Barreto Leme",
    numero: "250",
    complemento: "Casa",
    bairro: "Centro"
  }
];
```

### dados/listagem-cursos.js

```javascript
export const cursos = [
  {
    id: 1,
    nomeCurso: "Desenvolvimento Web",
    emailProfessor: "ana.silva@edutech.com",
    dataInicio: "2026-02-02",
    dataFim: "2026-04-30"
  },
  {
    id: 2,
    nomeCurso: "HTML e CSS Essencial",
    emailProfessor: "ana.silva@edutech.com",
    dataInicio: "2026-03-09",
    dataFim: "2026-04-17"
  },
  {
    id: 3,
    nomeCurso: "JavaScript para Iniciantes",
    emailProfessor: "ana.silva@edutech.com",
    dataInicio: "2026-05-04",
    dataFim: "2026-07-31"
  },
  {
    id: 4,
    nomeCurso: "Front-End Responsivo",
    emailProfessor: "ana.silva@edutech.com",
    dataInicio: "2026-06-08",
    dataFim: "2026-08-28"
  },
  {
    id: 5,
    nomeCurso: "JavaScript Avançado",
    emailProfessor: "ana.silva@edutech.com",
    dataInicio: "2026-09-14",
    dataFim: "2026-11-27"
  },
  {
    id: 6,
    nomeCurso: "Banco de Dados",
    emailProfessor: "ana.silva@edutech.com",
    dataInicio: "2026-02-16",
    dataFim: "2026-05-15"
  },
  {
    id: 7,
    nomeCurso: "Desenvolvimento Back-End",
    emailProfessor: "carlos.santos@edutech.com",
    dataInicio: "2026-04-06",
    dataFim: "2026-06-26"
  },
  {
    id: 8,
    nomeCurso: "APIs e Integração de Sistemas",
    emailProfessor: "carlos.santos@edutech.com",
    dataInicio: "2026-08-03",
    dataFim: "2026-10-23"
  }
];
```

### css/style.css

```css
/* css/style.css */
body {
    background-color: #dcfce7; /* Verde pastel fresco */
    font-family: Arial, sans-serif; /* Fonte padrão para o projeto */
    margin: 0;
    padding: 0;
}
```

### login/login.html

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - AVA-EDUCA+</title>
    <link rel="stylesheet" href="./login.css">
    <link rel="icon" href="../assets/icons/favicon.png">
</head>
<body>
    <div class="login-wrapper">
        <img src="../assets/images/ava-logo.png" alt="AVA Logo Esquerda" class="logo-esquerda">
        
        <div class="login-container">
            <h1>AVA-EDUCA+</h1>
            <h2>Acesso ao sistema</h2>
            
            <form id="form-login">
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="digite seu email" required>
                </div>
                
                <div class="form-group">
                    <label for="senha">Senha:</label>
                    <input type="password" id="senha" name="senha" placeholder="digite sua senha" required>
                </div>
                
                <button type="submit" class="btn-entrar">Entrar</button>
            </form>
            
            <a href="#" id="link-esqueci-senha" class="link-esqueci-senha">Esqueceu sua senha?</a>
            
            <div id="mensagem-erro" class="mensagem-erro"></div>
        </div>
        
        <img src="../assets/images/ava-logo.png" alt="AVA Logo Direita" class="logo-direita">
    </div>
    
    <script type="module" src="./login.js"></script>
</body>
</html>
```

### login/login.css

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}

.login-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    width: 100%;
    max-width: 1200px;
    padding: 20px;
}

.login-container {
    background-color: white;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

.logo-esquerda,
.logo-direita {
    display: none;
    width: 300px;
    height: auto;
    max-width: 75%;
    max-height: 300px;
    object-fit: contain;
}

@media (min-width: 880px) {
    .logo-esquerda,
    .logo-direita {
        display: block;
    }
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 10px;
}

h2 {
    text-align: center;
    color: #666;
    font-size: 1.2rem;
    margin-bottom: 30px;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    margin-bottom: 5px;
    color: #333;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
}

input:focus {
    outline: none;
    border-color: #4CAF50;
}

.btn-entrar {
    width: 100%;
    padding: 12px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 10px;
}

.btn-entrar:hover {
    background-color: #45a049;
}

.link-esqueci-senha {
    display: block;
    text-align: center;
    margin-top: 20px;
    color: #4CAF50;
    text-decoration: none;
    font-size: 0.9rem;
}

.link-esqueci-senha:hover {
    text-decoration: underline;
}

.mensagem-erro {
    display: none;
    color: #f44336;
    text-align: center;
    margin-top: 15px;
    padding: 10px;
    background-color: #ffebee;
    border-radius: 4px;
    font-size: 0.9rem;
}
```

### login/login.js

```javascript
import { login } from "../js/auth.js";

const formLogin = document.getElementById("form-login");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const mensagemErro = document.getElementById("mensagem-erro");
const linkEsqueciSenha = document.getElementById("link-esqueci-senha");

// Tratamento do clique em 'Esqueceu sua senha?' (RF01)
linkEsqueciSenha.addEventListener("click", (event) => {
  event.preventDefault();
  window.alert("Esta funcionalidade está em construção.");
});

// Tratamento da submissão do formulário de Login (RF01 / RF08)
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
```

### dashboard/dashboard.html

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - AVA-EDUCA+</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="./dashboard.css">
    <link rel="icon" href="../assets/icons/favicon.png">
</head>
<body>
    <header class="header">
        <div class="header-left">
            <img src="../assets/icons/avaicon.png" alt="Logo" class="header-logo">
            <h1>AVA-EDUCA+</h1>
        </div>
        <div class="header-right">
            <p>Olá, <span id="nome-usuario-logado">Usuário</span></p>
        </div>
    </header>

    <div class="main-container">
        <nav class="sidebar">
            <ul class="sidebar-menu">
                <li><a href="./dashboard.html" class="menu-link">Dashboard</a></li>
                <li><a href="#" class="menu-link disabled">Cursos</a></li>
                <li><a href="../cadastro-aluno/cadastro-aluno.html" class="menu-link">Cadastro de Alunos</a></li>
                <li>
                    <button id="btn-sair" class="btn-sair">
                        <img src="../assets/icons/exit.svg" alt="Sair" class="exit-icon">
                        Sair
                    </button>
                </li>
            </ul>
        </nav>

        <main class="content-area">
            <h2>Meus Cursos</h2>
            <div id="grid-cursos" class="grid-cursos"></div>
        </main>
    </div>

    <script type="module" src="./dashboard.js"></script>
</body>
</html>
```

### dashboard/dashboard.css

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Header */
.header {
    background-color: #4CAF50;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.header-logo {
    height: 1.5rem;
    width: auto;
}

.header h1 {
    font-size: 1.5rem;
    margin: 0;
}

.header-right p {
    font-size: 1rem;
    margin: 0;
}

#nome-usuario-logado {
    font-weight: bold;
}

/* Main Container */
.main-container {
    display: flex;
    flex: 1;
    min-height: calc(100vh - 64px);
}

/* Sidebar */
.sidebar {
    width: 250px;
    background-color: white;
    padding: 2rem 1rem;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

.sidebar-menu {
    list-style: none;
}

.sidebar-menu li {
    margin-bottom: 1rem;
}

.menu-link {
    display: block;
    padding: 0.75rem 1rem;
    text-decoration: none;
    color: #333;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.menu-link:hover:not(.disabled) {
    background-color: #f5f5f5;
    color: #4CAF50;
}

.menu-link.disabled {
    color: #999;
    cursor: not-allowed;
    pointer-events: none;
}

.btn-sair {
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: #e0685f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background-color 0.2s;
}

.btn-sair:hover {
    background-color: #bb4646;
}

.exit-icon {
    width: 20px;
    height: 20px;
}

/* Content Area */
.content-area {
    flex: 1;
    padding: 2rem;
}

.content-area h2 {
    color: #333;
    margin-bottom: 2rem;
    font-size: 2rem;
}

.grid-cursos {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

/* Card de Curso (será injetado via JavaScript) */
.curso-card {
    background-color: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
}

.curso-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.curso-card h3 {
    color: #4CAF50;
    margin-bottom: 1rem;
    font-size: 1.25rem;
}

.curso-card p {
    color: #666;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.curso-card .data-curso {
    color: #999;
    font-size: 0.85rem;
}
```

### dashboard/dashboard.js

```javascript
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
```

### cadastro-aluno/cadastro-aluno.html

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro de Aluno - AVA-EDUCA+</title>
    <link rel="icon" href="../assets/icons/favicon.png">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="./cadastro-aluno.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.30.1/moment.min.js"></script>
</head>
<body>
    <header class="header">
        <div class="header-left">
            <img src="../assets/icons/avaicon.png" alt="Logo" class="header-logo">
            <h1>AVA-EDUCA+</h1>
        </div>
        <div class="header-right">
            <p>Olá, <span id="nome-usuario-logado">Usuário</span></p>
        </div>
    </header>

    <div class="main-container">
        <nav class="sidebar">
            <ul class="sidebar-menu">
                <li><a href="../dashboard/dashboard.html" class="menu-link">Dashboard</a></li>
                <li><a href="#" class="menu-link disabled">Cursos</a></li>
                <li><a href="./cadastro-aluno.html" class="menu-link active">Cadastro de Alunos</a></li>
                <li>
                    <button id="btn-sair" class="btn-sair">
                        <img src="../assets/icons/exit.svg" alt="Sair" class="exit-icon">
                        Sair
                    </button>
                </li>
            </ul>
        </nav>

        <main class="content-area">
            <h2>Cadastro de Novo Aluno</h2>
            <form id="form-cadastro-aluno">
                <div class="form-section">
                    <h3>Dados Pessoais</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="nome">Nome Completo:</label>
                            <input type="text" id="nome" name="nome" minlength="4" maxlength="80" required>
                        </div>

                        <div class="form-group">
                            <label for="genero">Gênero:</label>
                            <select id="genero" name="genero" required>
                                <option value="">Selecione</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="dataNascimento">Data de Nascimento:</label>
                            <input type="date" id="dataNascimento" name="dataNascimento" required>
                        </div>

                        <div class="form-group">
                            <label for="cpf">CPF:</label>
                            <input type="text" id="cpf" name="cpf" required>
                        </div>

                        <div class="form-group">
                            <label for="telefone">Telefone:</label>
                            <input type="text" id="telefone" name="telefone" required>
                        </div>

                        <div class="form-group">
                            <label for="email">E-mail:</label>
                            <input type="email" id="email" name="email" required>
                        </div>
                    </div>
                </div>

                <div class="form-section">
                    <h3>Endereço</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="input-cep">CEP:</label>
                            <input type="text" id="input-cep" name="cep" required>
                        </div>

                        <div class="form-group">
                            <label for="logradouro">Logradouro:</label>
                            <input type="text" id="logradouro" name="logradouro" required>
                        </div>

                        <div class="form-group">
                            <label for="bairro">Bairro:</label>
                            <input type="text" id="bairro" name="bairro" required>
                        </div>

                        <div class="form-group">
                            <label for="cidade">Cidade:</label>
                            <input type="text" id="cidade" name="cidade" required>
                        </div>

                        <div class="form-group">
                            <label for="estado">Estado:</label>
                            <input type="text" id="estado" name="estado" required>
                        </div>

                        <div class="form-group">
                            <label for="numero">Número:</label>
                            <input type="number" id="numero" name="numero" required>
                        </div>

                        <div class="form-group">
                            <label for="complemento">Complemento:</label>
                            <input type="text" id="complemento" name="complemento">
                        </div>
                    </div>
                </div>

                <div class="form-actions">
                    <button type="submit" class="btn-salvar">Salvar</button>
                </div>
            </form>
        </main>
    </div>

    <script type="module" src="./cadastro-aluno.js"></script>
</body>
</html>
```

### cadastro-aluno/cadastro-aluno.css

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Header */
.header {
    background-color: #4CAF50;
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.header-logo {
    height: 1.5rem;
    width: auto;
}

.header h1 {
    font-size: 1.5rem;
    margin: 0;
}

.header-right p {
    font-size: 1rem;
    margin: 0;
}

#nome-usuario-logado {
    font-weight: bold;
}

/* Main Container */
.main-container {
    display: flex;
    flex: 1;
    min-height: calc(100vh - 64px);
}

/* Sidebar */
.sidebar {
    width: 250px;
    background-color: white;
    padding: 2rem 1rem;
    box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
}

.sidebar-menu {
    list-style: none;
}

.sidebar-menu li {
    margin-bottom: 1rem;
}

.menu-link {
    display: block;
    padding: 0.75rem 1rem;
    text-decoration: none;
    color: #333;
    border-radius: 4px;
    transition: background-color 0.3s;
}

.menu-link:hover:not(.disabled) {
    background-color: #f5f5f5;
    color: #4CAF50;
}

.menu-link.active {
    background-color: #4CAF50;
    color: white;
}

.menu-link.disabled {
    color: #999;
    cursor: not-allowed;
    pointer-events: none;
}

.btn-sair {
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: #e0685f;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background-color 0.2s;
}

.btn-sair:hover {
    background-color: #bb4646;
}

.exit-icon {
    width: 20px;
    height: 20px;
}

/* Content Area */
.content-area {
    flex: 1;
    padding: 2rem;
}

.content-area h2 {
    color: #333;
    margin-bottom: 2rem;
    font-size: 2rem;
}

/* Formulário */
#form-cadastro-aluno {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-section {
    margin-bottom: 2rem;
}

.form-section h3 {
    color: #4CAF50;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
    border-bottom: 2px solid #4CAF50;
    padding-bottom: 0.5rem;
}

.form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
}

.form-group label {
    margin-bottom: 0.5rem;
    color: #333;
    font-weight: bold;
    font-size: 0.9rem;
}

.form-group input,
.form-group select {
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    font-family: inherit;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: #4CAF50;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 2rem;
}

.btn-salvar {
    padding: 0.75rem 2rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;
}

.btn-salvar:hover {
    background-color: #45a049;
}
```

### cadastro-aluno/cadastro-aluno.js

```javascript
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
```
