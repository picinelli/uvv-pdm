import { supabase } from './supabase';

export async function signUpUser({ nome, email, telefone, senha }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: senha,
    options: {
      data: {
        nome,
        telefone: telefone || null,
      },
    },
  });

  if (error) {
    if (__DEV__) console.log('[signUpUser] erro:', error);
    throw new Error(traduzirAuthErro(error));
  }

  return {
    user: data.user,
    needsConfirmation: !data.session,
  };
}

export async function signInUser({ email, senha }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    if (__DEV__) console.log('[signInUser] erro:', error);
    throw new Error(traduzirAuthErro(error));
  }

  return data.session;
}

export async function signOutUser() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    if (__DEV__) console.log('[signOutUser] erro:', error);
    throw new Error(traduzirErro(error));
  }
}

export async function fetchProfile(userId) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, nome, email, telefone')
    .eq('id', userId)
    .single();

  if (error) {
    if (__DEV__) console.log('[fetchProfile] erro:', error);
    throw new Error(traduzirErro(error));
  }
  return data;
}

export async function fetchTasks(usuarioId) {
  if (!usuarioId) return [];
  const { data, error } = await supabase
    .from('tarefas')
    .select('*')
    .eq('usuario_id', usuarioId)
    .order('created_at', { ascending: false });

  if (error) {
    if (__DEV__) console.log('[fetchTasks] erro:', error);
    throw new Error(traduzirErro(error));
  }
  return data ?? [];
}

export async function fetchTaskById(taskId) {
  const { data, error } = await supabase
    .from('tarefas')
    .select('*')
    .eq('id', taskId)
    .single();

  if (error) {
    if (__DEV__) console.log('[fetchTaskById] erro:', error);
    throw new Error(traduzirErro(error));
  }
  return data;
}

export async function createTask({ titulo, descricao, status, prioridade, usuarioId }) {
  const { data, error } = await supabase
    .from('tarefas')
    .insert([
      {
        titulo,
        descricao: descricao || null,
        status,
        prioridade,
        usuario_id: usuarioId,
      },
    ])
    .select()
    .single();

  if (error) {
    if (__DEV__) console.log('[createTask] erro:', error);
    throw new Error(traduzirErro(error));
  }
  return data;
}

function traduzirAuthErro(error) {
  const msg = error?.message || '';
  if (msg.includes('Invalid login credentials')) return 'E-mail ou senha inválidos.';
  if (msg.includes('Email not confirmed')) return 'Confirme seu e-mail antes de entrar.';
  if (msg.includes('User already registered')) return 'Este e-mail já está cadastrado.';
  if (msg.includes('Password should be at least')) return 'A senha deve ter no mínimo 6 caracteres.';
  if (msg.includes('rate limit')) return 'Muitas tentativas. Tente novamente em alguns minutos.';
  return traduzirErro(error);
}

function traduzirErro(error) {
  if (error?.code === '23505') return 'Registro duplicado.';
  if (error?.message?.includes('Failed to fetch')) return 'Sem conexão com o servidor.';
  return error?.message || 'Erro inesperado ao acessar a API.';
}
