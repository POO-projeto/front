# FRONT-END - SIGAD

## 🛠 Pré-requisitos
Antes de rodar o projeto, certifique-se de ter instalado:
- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download)
- npm - que já vem com o Node.js

## 🚫 Clonando o Repositório
Para obter o código-fonte em sua máquina, execute o seguinte comando:
```bash
git clone https://github.com/POO-projeto/front.git
```
Depois, acesse a pasta do projeto:
```bash
cd ./front
```
## 🔧 Instalando as Dependências
Instale todas as dependências necessárias com o seguinte comando:
```bash
npm i
```
## 🌟 Rodando o Projeto em Ambiente de Desenvolvimento
Após instalar as dependências, inicie o servidor de desenvolvimento:
```bash
npm run dev
```
O projeto estará disponível em http://localhost:5173 ou na URL indicada no terminal.

## 🌐 Estrutura do Projeto

```bash
front/
├── public/              # Arquivos estáticos
├── src/                 # Código-fonte principal
│   ├── components/      # Componentes reutilizáveis do React
│   ├── layouts/         # Layouts da aplicação
│   ├── model/           # Modelos de dados
│   ├── pages/           # Páginas da aplicação
│   ├── services/        # Integração com APIs
│   ├── store/           # Gerenciamento de estado da aplicação
│   ├── App.tsx          # Componente principal da aplicação
│   ├── Router.tsx       # Configuração de rotas
│   ├── index.css        # Estilos globais
│   ├── main.tsx         # Ponto de entrada da aplicação
│   └── vite-env.d.ts    # Configurações do Vite
├── .env.example         # Exemplo de variáveis de ambiente
├── .gitignore           # Arquivos e pastas ignorados pelo Git
├── README.md            # Documentação do projeto
├── eslint.config.js     # Configuração do ESLint
├── favicon.ico          # Ícone da aplicação
├── index.html           # Página HTML principal
├── package-lock.json    # Lockfile do npm
├── package.json         # Configurações do projeto e dependências
├── tsconfig.app.json    # Configuração do TypeScript para o app
├── tsconfig.json        # Configuração principal do TypeScript
├── tsconfig.node.json   # Configuração do TypeScript para o Node
└── vite.config.ts       # Configuração do Vite
```
