# GitHub Dashboard Widget

Dashboard interativo que exibe estatísticas e informações de perfis do GitHub.

## 📁 Estrutura do Projeto

```
notion-widget/
├── frontend/              # Aplicação frontend
│   ├── css/
│   │   └── styles.css    # Estilos da aplicação
│   ├── js/
│   │   ├── api.js        # Comunicação com backend
│   │   ├── ui.js         # Manipulação da interface
│   │   └── app.js        # Controlador principal
│   └── index.html        # Página HTML principal
├── backend/              # Servidor backend
│   ├── server.js         # Servidor Express
│   ├── package.json      # Dependências do backend
│   └── .env.example      # Exemplo de variáveis de ambiente
└── package.json          # Scripts principais do projeto
```

## 🚀 Como Executar

### 1. Instalar Dependências

```bash
npm run install:all
```

### 2. Configurar Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` na pasta `backend`:

```bash
cd backend
cp .env.example .env
```

Opcionalmente, adicione um token do GitHub para aumentar o limite de requisições:

```
PORT=3000
GITHUB_TOKEN=seu_token_aqui
```

### 3. Iniciar o Servidor

```bash
# Modo produção
npm start

# Modo desenvolvimento (com hot reload)
npm run dev:backend
```

O servidor estará disponível em `http://localhost:3000`

## 📡 API Endpoints

### GET /api/user/:username
Retorna informações do usuário do GitHub.

### GET /api/repos/:username
Retorna lista de repositórios do usuário.

### GET /api/health
Verifica o status do servidor.

## 🛠️ Tecnologias Utilizadas

### Frontend
- HTML5
- CSS3
- JavaScript (Vanilla)

### Backend
- Node.js
- Express
- Axios
- CORS
- dotenv

## 📝 Funcionalidades

- ✅ Exibição de informações do perfil (avatar, nome, bio, localização)
- ✅ Contadores de repositórios, seguidores e seguindo
- ✅ Cálculo de idade da conta
- ✅ Análise de linguagens mais utilizadas
- ✅ Lista de repositórios recentes com estatísticas
- ✅ Interface responsiva e moderna
- ✅ Separação clara entre frontend e backend
- ✅ Deploy automático no GitHub Pages via GitHub Actions

## 🚀 Deploy no GitHub Pages

### Configuração Automática

O projeto está configurado para deploy automático no GitHub Pages. A cada commit na branch `main` ou `master`:

1. ✅ Os testes são executados automaticamente
2. ✅ A validação de sintaxe é realizada
3. ✅ O frontend é publicado no GitHub Pages

### Habilitar GitHub Pages

1. Vá em **Settings** → **Pages** no seu repositório
2. Em **Source**, selecione **GitHub Actions**
3. Faça commit de qualquer alteração para disparar o deploy

### API em Produção

O frontend detecta automaticamente o ambiente:
- **Desenvolvimento (localhost)**: Usa o backend local na porta 3000
- **Produção (GitHub Pages)**: Usa a API pública do GitHub diretamente

> **Nota**: A API do GitHub tem limite de 60 requisições/hora sem autenticação. Para uso intenso, configure um token no backend.

## 🔧 Customização

Para alterar o usuário exibido, edite o arquivo `frontend/js/app.js`:

```javascript
const app = new App('SeuUsuarioGitHub');
```

## 📄 Licença

ISC
