# CRUD Produtos — Frontend

## Sobre o Projeto

Interface web para gerenciamento de um estoque de produtos, consumindo a API REST do backend [crud-springboot](https://github.com/seu-usuario/crud-springboot).

A aplicação cobre o fluxo completo: cadastro, login com autenticação de dois fatores (2FA via TOTP), recuperação de senha por e-mail e operações de CRUD de produtos.

> **Este frontend não precisa de um servidor próprio.** Ele é servido automaticamente pelo Spring Boot em `https://localhost:8443`. Basta subir o backend e acessar a URL.

---

## Tecnologias Utilizadas

| Tecnologia | Descrição |
|---|---|
| HTML5 | Estrutura das páginas |
| CSS3 | Estilização e layout responsivo (`styles/global.css`) |
| JavaScript (ES6+) | Lógica e integração com a API via `fetch` |
| Fetch API | Comunicação com o backend |

> Projeto 100% vanilla — sem frameworks, sem bundlers, sem dependências externas.

---

## Estrutura de Arquivos

```
crud-springboot-front/
├── index.html              ← Listagem de produtos (página inicial autenticada)
├── login.html              ← Login
├── register.html           ← Cadastro de usuário
├── 2fa.html                ← Validação TOTP (2FA)
├── resetpassword.html      ← Recuperação de senha
├── addproduct.html         ← Adicionar produto
├── edit.html               ← Editar produto
├── scripts/
│   ├── config.js           ← Configuração central (URL do backend)
│   ├── auth_service.js     ← Funções compartilhadas de autenticação
│   ├── script_login.js
│   ├── script_register.js
│   ├── script_2fa.js
│   ├── script_resetpassword.js
│   ├── script_listallproducts.js
│   ├── script_addproduct.js
│   └── script_editproducts.js
└── styles/
    └── global.css
```

---

## Como Rodar

O frontend é servido pelo backend. Siga as instruções do repositório [crud-springboot](https://github.com/seu-usuario/crud-springboot) para subir a API.

Com o backend rodando, acesse diretamente:

```
https://localhost:8443/login.html
```

Na primeira vez, o navegador exibirá um aviso de certificado autoassinado. Clique em **"Avançar"** para aceitar e continuar.

---

## Configuração da URL do Backend

A URL do backend está centralizada no arquivo `scripts/config.js`:

```javascript
// URL vazia = relativa (frontend servido pelo próprio Spring Boot)
const BACKEND_URL = "";
```

### Quando usar URL relativa (padrão)

Quando o Spring Boot serve o frontend (`https://localhost:8443/login.html`), mantenha `BACKEND_URL = ""`. Todas as chamadas de API serão relativas à mesma origem, sem cross-origin.

### Quando usar URL absoluta

Se quiser servir o frontend por um servidor separado (ex: Live Server, `npx serve`), edite `config.js`:

```javascript
// Perfil dev (HTTPS)
const BACKEND_URL = "https://localhost:8443";

// Perfil local (HTTP, sem SSL)
const BACKEND_URL = "http://localhost:8080";
```

> Ao usar URL absoluta com HTTPS, acesse `https://localhost:8443` diretamente no navegador uma vez para aceitar o certificado antes de usar o frontend.

---

## Fluxo de Autenticação

```
login.html → (credenciais válidas) → 2fa.html → (código TOTP válido) → index.html
```

1. O usuário informa usuário e senha em `login.html`
2. O backend valida as credenciais e armazena a sessão temporária
3. O frontend redireciona para `2fa.html`
4. O usuário informa o código de 6 dígitos do app autenticador (Google Authenticator, Authy, etc.)
5. Após validação, a sessão é promovida e o usuário acessa `index.html`

O estado de autenticação é rastreado via `localStorage` (`auth` e `auth_2fa`) e validado nas páginas protegidas.
