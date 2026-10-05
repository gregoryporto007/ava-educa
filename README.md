# AVA-EDUCA+

Sistema de Ambiente Virtual de Aprendizagem (AVA) para gestão educacional.

## Estrutura do Projeto

```
AVA-EDUCA/
├── assets/                    # Assets do projeto (imagens, ícones, etc.)
│   ├── icons/                # Ícones do sistema
│   │   ├── avaicon.png        # Ícone principal do header
│   │   ├── exit.svg           # Ícone do botão sair
│   │   └── favicon.png        # Favicon das abas do navegador
│   └── images/                # Imagens do sistema
│       └── ava-logo.png       # Logo da página de login
├── cadastro-aluno/           # Módulo de cadastro de alunos
│   ├── cadastro-aluno.html   # Página de formulário de cadastro
│   ├── cadastro-aluno.css    # Estilos da página de cadastro
│   └── cadastro-aluno.js     # Lógica do cadastro de alunos
├── css/                      # Estilos globais
│   └── style.css             # Estilos compartilhados do sistema
├── dados/                    # Dados iniciais e listagens
│   ├── listagem-alunos.js    # Lista de alunos cadastrados
│   ├── listagem-cursos.js    # Lista de cursos disponíveis
│   └── listagem-usuarios.js  # Lista de usuários do sistema
├── dashboard/                # Dashboard principal do sistema
│   ├── dashboard.html        # Página do dashboard
│   ├── dashboard.css         # Estilos do dashboard
│   └── dashboard.js          # Lógica do dashboard
├── js/                       # Módulos JavaScript
│   ├── Aluno.js              # Classe Aluno
│   ├── alunos.js             # Funções relacionadas a alunos
│   ├── app.js                # Ponto de entrada da aplicação (redirecionamento)
│   ├── auth.js               # Funções de autenticação
│   └── cursos.js             # Funções relacionadas a cursos
├── login/                    # Módulo de login
│   ├── login.html            # Página de login
│   ├── login.css             # Estilos da página de login
│   └── login.js              # Lógica do formulário de login
├── index.html                # Página inicial (redirecionamento automático)
├── package.json              # Configuração do projeto (Node.js)
└── README.md                 # Documentação do projeto
```

## Descrição dos Arquivos

### index.html
Página inicial do sistema. Contém apenas o script modular que carrega o `app.js` para realizar o redirecionamento automático. Inclui favicon.

### package.json
Configuração do projeto com suporte a módulos ES6.

### js/app.js
Ponto de entrada da aplicação. Verifica se há usuário logado no sessionStorage e redireciona para o dashboard ou login.

### js/auth.js
Módulo de autenticação. Contém a função `login` que valida email e senha contra a lista de usuários usando Promises.

### js/Aluno.js
Classe Aluno com construtor para criar novos registros de alunos.

### js/alunos.js
Função para cadastrar novos alunos na base de dados estática usando Promises.

### js/cursos.js
Função para listar cursos do professor logado, filtrando por email do professor.

### dados/listagem-usuarios.js
Lista de usuários do sistema para autenticação.

### dados/listagem-alunos.js
Lista de alunos cadastrados no sistema.

### dados/listagem-cursos.js
Lista de cursos disponíveis no sistema.

### login/login.html
Página de login com formulário de autenticação. Inclui logos laterais e favicon.

### login/login.css
Estilos da página de login com design limpo, centralizado e responsivo. Logos ocultas em mobile via media queries.

### login/login.js
Lógica do formulário de login, conectada ao módulo de autenticação. Trata erros e redireciona para dashboard em caso de sucesso.

### css/style.css
Estilos globais compartilhados. Define cor de fundo verde pastel (#dcfce7) para todo o sistema.

### dashboard/dashboard.html
Página do dashboard com cabeçalho, menu lateral e área de conteúdo para exibir cursos do professor.

### dashboard/dashboard.css
Estilos do dashboard com layout flexbox, cabeçalho verde, menu lateral e grid de cursos.

### dashboard/dashboard.js
Lógica do dashboard. Protege rota, exibe nome do usuário, lista cursos via DOM manipulation e gerencia logout.

### cadastro-aluno/cadastro-aluno.html
Página de cadastro de alunos com formulário completo, incluindo campos pessoais e endereço com ViaCEP. Inclui Moment.js via CDN.

### cadastro-aluno/cadastro-aluno.css
Estilos da página de cadastro com layout em grid, seções visuais e design consistente com o dashboard.

### cadastro-aluno/cadastro-aluno.js
Lógica do cadastro de alunos. Inclui proteção de rota, ViaCEP para preenchimento automático de endereço, validação de data com Moment.js e persistência de dados.

## Fluxo da Aplicação

### 1. Autenticação e Redirecionamento
1. Usuário abre `index.html`
2. `app.js` verifica se há usuário logado no `sessionStorage`
3. Se logado → redireciona para `dashboard/dashboard.html`
4. Se não logado → redireciona para `login/login.html`

### 2. Login
1. Usuário preenche email e senha na página de login
2. `login.js` chama `auth.js` para validar credenciais
3. Se válido → salva usuário no `sessionStorage` e redireciona para dashboard
4. Se inválido → exibe mensagem de erro

### 3. Dashboard
1. `dashboard.js` verifica proteção de rota (sessionStorage)
2. Exibe nome do usuário no cabeçalho
3. Chama `listarCursos()` passando email do usuário
4. `cursos.js` filtra cursos pelo email do professor
5. Se encontrar cursos → renderiza cards via DOM manipulation
6. Se não encontrar → exibe mensagem de erro
7. Botão "Sair" remove usuário do sessionStorage e redireciona para login

### 4. Cadastro de Alunos
1. `cadastro-aluno.js` verifica proteção de rota (sessionStorage)
2. Exibe nome do usuário no cabeçalho
3. Evento `blur` no campo CEP → chama API ViaCEP
4. ViaCEP preenche automaticamente: logradouro, bairro, cidade e estado
5. Evento `submit` do formulário → valida data de nascimento com Moment.js
6. Validação: data > 01/01/1900 e data < data atual
7. Se data válida → captura todos os campos
8. Cria instância da classe `Aluno` com todos os dados
9. Chama `cadastrarAluno()` para persistir na base
10. Se sucesso → alerta e limpa formulário
11. Se erro → alerta de erro

## Como Executar o Projeto

### Pré-requisitos
- Navegador web moderno (Chrome, Firefox, Edge, Safari)
- Servidor local para suportar módulos ES6 (recomendado: Live Server)

### Passo a Passo

1. **Clone ou baixe o projeto**
   - Faça download do projeto ou clone do repositório

2. **Abra o projeto no VS Code**
   - Abra a pasta do projeto no Visual Studio Code

3. **Instale a extensão Live Server (se não tiver)**
   - Vá em Extensions
   - Pesquise por "Live Server"
   - Instale a extensão "Live Server" de Ritwick Dey

4. **Inicie o servidor**
   - Clique com o botão direito no arquivo `index.html`
   - Selecione "Open with Live Server"
   - O projeto abrirá automaticamente no navegador

5. **Teste o sistema**
   - Use um dos usuários de teste para fazer login:
     - **Ana Carolina Silva**: ana.silva@edutech.com / 123456
     - **Carlos Eduardo Santos**: carlos.santos@edutech.com / 654321
     - **Mariana Oliveira Costa**: mariana.costa@edutech.com / edu2026

### Alternativa: Outros Servidores Locais
Você também pode usar outros servidores locais que suportem módulos ES6:
- **Python**: `python -m http.server 8000`
- **Node.js**: `npx serve`
- **VS Code**: Extensão "Live Preview"

## Funcionalidades Implementadas

### Autenticação
- Login com email e senha
- Validação de credenciais contra base estática
- Persistência de sessão via sessionStorage
- Proteção de rotas (redirecionamento automático se não logado)
- Logout com limpeza de sessão

### Dashboard
- Exibição de nome do usuário logado
- Listagem de cursos do professor logado
- Filtragem de cursos por email do professor
- Renderização dinâmica de cards via DOM manipulation
- Tratamento de erro quando não há cursos

### Cadastro de Alunos
- Formulário completo com campos pessoais e endereço
- Validação de campos (required, minlength, maxlength)
- Integração com API ViaCEP para preenchimento automático de endereço
- Validação de data de nascimento com Moment.js (entre 01/01/1900 e data atual)
- Instanciação de classe Aluno
- Persistência em base estática
- Feedback visual de sucesso/erro

### UI/UX
- Favicon em todas as páginas
- Ícone do header (avaicon.png) com tamanho consistente
- Logos laterais na página de login (ocultas em mobile)
- Design responsivo com media queries
- Cores consistentes (verde #4CAF50 como cor principal)
- Fundo verde pastel (#dcfce7) global
- Menu lateral com indicação de página ativa
- Cards com efeitos hover

## Tecnologia

- HTML5 (semântico)
- CSS3 (Flexbox, Grid, Media Queries)
- JavaScript ES6 (Módulos, Promises, Classes, Arrow Functions)
- Moment.js (validação de datas via CDN)
- sessionStorage para persistência de sessão
- DOM manipulation (createElement, appendChild, textContent)
- Fetch API para requisições HTTP
- API ViaCEP para consulta de CEP
- Validação nativa de HTML5
- Validação customizada com JavaScript

## Dados do Sistema

### Usuários para Teste
- **Ana Carolina Silva**: ana.silva@edutech.com / 123456
- **Carlos Eduardo Santos**: carlos.santos@edutech.com / 654321
- **Mariana Oliveira Costa**: mariana.costa@edutech.com / edu2026

### Cursos por Professor
- **Ana Carolina Silva**: 6 cursos (Desenvolvimento Web, HTML e CSS Essencial, JavaScript para Iniciantes, Front-End Responsivo, JavaScript Avançado, Banco de Dados)
- **Carlos Eduardo Santos**: 2 cursos (Desenvolvimento Back-End, APIs e Integração de Sistemas)
- **Mariana Oliveira Costa**: 0 cursos

### Alunos Cadastrados (Exemplo)
- Lucas Henrique Martins
- Beatriz Fernanda Oliveira

## Sugestões de Melhorias

### Curto Prazo
- Implementar funcionalidade "Esqueceu sua senha?"
- Adicionar validação de CPF e telefone
- Implementar máscaras de input (CPF, telefone, CEP)
- Adicionar confirmação de senha no cadastro de usuários
- Implementar edição de alunos cadastrados
- Adicionar listagem de alunos no dashboard

### Médio Prazo
- Integrar com banco de dados real (MySQL, PostgreSQL, MongoDB)
- Implementar autenticação com JWT
- Adicionar sistema de permissões (admin, professor, aluno)
- Implementar upload de foto de perfil
- Adicionar notificações e alertas
- Implementar busca e filtros nos cursos e alunos

### Longo Prazo
- Desenvolver aplicação mobile (React Native ou Flutter)
- Implementar sistema de chat entre professor e alunos
- Adicionar funcionalidade de fórum de discussão
- Implementar sistema de avaliação e notas
- Adicionar relatórios e estatísticas
- Implementar sistema de certificados
- Integração com calendário e agenda
- Sistema de backup e restauração de dados

## Links de Entrega

- [Vídeo de Apresentação]()
- [Quadro Kanban (Trello)]()
