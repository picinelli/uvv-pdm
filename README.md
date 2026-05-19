# PDM Tarefas

App de gerenciamento de tarefas feito em **React Native + Expo**, com **Supabase** como backend REST. Trabalho da disciplina de PDM.

## Funcionalidades

- Cadastro de usuário com validação (Formik + Yup) — `POST` em `usuarios`.
- Lista de tarefas com filtros por status e prioridade (`Picker` + `FlatList`) — `GET` em `tarefas`.
- Criação de tarefa com Pickers de status/prioridade — `POST` em `tarefas`.
- Tela de detalhe que recebe `taskId` por `route.params` (passagem direta).
- Drawer customizado, Context API (`UserContext` e `TaskContext`) e `ErrorBoundary`.

## Stack

- Expo SDK 52, React Native 0.76
- React Navigation (Drawer)
- @react-native-picker/picker
- Formik + Yup
- @supabase/supabase-js

## Estrutura

```
src/
├── components/    # ScreenContainer, FormTextInput, PrimaryButton, PickerField,
│                  # TaskCard, EmptyState, CustomDrawerContent, ErrorBoundary
├── contexts/      # UserContext, TaskContext
├── navigation/    # DrawerNavigator
├── screens/       # UserRegisterScreen, TaskListScreen,
│                  # TaskCreateScreen, TaskDetailScreen
├── services/      # supabase, api (GET/POST)
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

### 3. Configurar Supabase

1. Crie um projeto em [supabase.com](https://supabase.com).
2. No **SQL Editor**, execute o conteúdo de [`docs/supabase-setup.sql`](docs/supabase-setup.sql) — cria as tabelas `usuarios` e `tarefas` e as políticas RLS de desenvolvimento.
3. Em **Project Settings → API**, copie `Project URL` e `anon public key`.
4. Crie um arquivo `.env` na raiz do projeto a partir de `.env.example`:

```env
EXPO_PUBLIC_SUPABASE_URL=https://SEU-PROJETO.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=sua-anon-key-aqui
```

### 4. Rodar o app

```bash
npm start
```

Abra o QR Code no Expo Go (Android) ou Câmera (iOS), ou pressione `a`/`i` para emuladores.

## Documentação de design

Consulte [`docs/DESIGN.md`](docs/DESIGN.md) para a especificação completa das 4 telas, paleta de cores, justificativas e instruções para construir o protótipo no Figma e a entrega em Word/PDF.

## Observações de segurança

As políticas RLS de [`docs/supabase-setup.sql`](docs/supabase-setup.sql) permitem `SELECT/INSERT` para o role `anon` apenas para fins acadêmicos. Em produção, integrar `supabase.auth.signUp` e restringir as políticas com `auth.uid()`.
