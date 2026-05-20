# PDM Tarefas

App de gerenciamento de tarefas feito em **React Native + Expo**, com **Supabase** (Auth + REST) como backend. Trabalho da disciplina de PDM.

## Funcionalidades

- Cadastro de usuário com validação (Formik + Yup) usando **Supabase Auth** (`signUp`) + criação automática do perfil em `usuarios` via trigger.
- Login com `signInWithPassword`, sessão persistida em AsyncStorage e refresh automático de token.
- Confirmação de e-mail obrigatória: o usuário recebe um link de confirmação antes de poder fazer login.
- Lista de tarefas com filtros por status e prioridade (`Picker` + `FlatList`) — `GET` em `tarefas`.
- Criação de tarefa com Pickers de status/prioridade — `POST` em `tarefas`.
- Tela de detalhe que recebe `taskId` por `route.params` (passagem direta).
- Drawer customizado, Context API (`UserContext` e `TaskContext`), `ErrorBoundary`, navegação Auth/App separada.

## Stack

- Expo SDK 54, React Native 0.81
- React Navigation (Drawer + Native Stack)
- @react-native-picker/picker
- @react-native-async-storage/async-storage
- Formik + Yup
- @supabase/supabase-js

## Estrutura

```
src/
├── components/    # ScreenContainer, FormTextInput, PrimaryButton, PickerField,
│                  # TaskCard, EmptyState, CustomDrawerContent, ErrorBoundary
├── contexts/      # UserContext, TaskContext
├── navigation/    # RootNavigator, AuthNavigator, DrawerNavigator
├── screens/       # LoginScreen, UserRegisterScreen, TaskListScreen,
│                  # TaskCreateScreen, TaskDetailScreen
├── services/      # supabase (client), api (auth + REST)
└── theme/         # colors
```

Cada componente segue o padrão da disciplina: pasta dedicada com `index.js` + `styles.js`.

## Como executar

### 1. Pré-requisitos

- Node.js 18+ e npm.
- Conta no [Supabase](https://supabase.com).
- App **Expo Go** no celular (Android/iOS) ou um emulador.

### 2. Instalar dependências

```bash
npm install
```

### 3. Configurar o Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, execute o conteúdo de [`docs/supabase-setup.sql`](docs/supabase-setup.sql).
   - Cria a tabela `usuarios` ligada a `auth.users` (1-para-1) com um **trigger** que insere o perfil automaticamente após o `signUp`.
   - Cria a tabela `tarefas` e as políticas **RLS baseadas em `auth.uid()`** (cada usuário só vê/cria as próprias tarefas).
   - **Atenção:** o script faz `DROP TABLE` em `usuarios` e `tarefas`. Use apenas em projeto de teste; usuários antigos do esquema "caseiro" precisam se recadastrar.
3. Em **Authentication → Providers → Email**: confirme que o provedor `Email` está habilitado (vem por padrão). A opção *Confirm email* deve estar ligada para o fluxo de confirmação por link.
4. Opcional: em **Authentication → Email Templates**, traduza o template *Confirm signup*.
5. Em **Project Settings → API**, copie `Project URL` e `anon public key`.
6. Crie um arquivo `.env` na raiz do projeto a partir de `.env.example`:

```env
EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

### 4. Rodar o app

```bash
npm start
```

Abra o QR Code no Expo Go (Android) ou Câmera (iOS), ou pressione `a`/`i` para emuladores.

## Fluxo de autenticação

1. **Cadastro** → `supabase.auth.signUp` salva e-mail/senha em `auth.users`. O trigger `handle_new_user` insere o perfil (nome, e-mail, telefone) em `public.usuarios`. O Supabase envia um e-mail de confirmação.
2. **Confirmação** → usuário clica no link do e-mail.
3. **Login** → `supabase.auth.signInWithPassword`. O cliente guarda a sessão (JWT) em AsyncStorage. O `UserContext` ouve `onAuthStateChange` e busca o perfil em `usuarios`.
4. **App** → `RootNavigator` mostra o Drawer (Tarefas / Nova Tarefa). Todas as queries são filtradas por `auth.uid()` graças à RLS.
5. **Logout** → `supabase.auth.signOut` limpa a sessão; o `RootNavigator` volta para o Login.
6. **Reabrir o app** → `getSession` restaura automaticamente a sessão; o app abre direto na lista de tarefas.

## Documentação de design

Consulte [`docs/DESIGN.md`](docs/DESIGN.md) para a especificação completa das telas, paleta de cores, justificativas e instruções para construir o protótipo no Figma e a entrega em Word/PDF.

## Observações de segurança

- Senha **nunca** trafega ou é armazenada pelo app — é tratada exclusivamente pelo Supabase Auth (hash + JWT).
- As políticas RLS em [`docs/supabase-setup.sql`](docs/supabase-setup.sql) garantem que cada usuário autenticado só consegue ler/escrever as próprias tarefas (`usuario_id = auth.uid()`).
