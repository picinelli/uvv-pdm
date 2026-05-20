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

  const needsConfirmation = !data.session || !data.user?.email_confirmed_at;

  if (needsConfirmation) {
    await supabase.auth.signOut();
  }

  return {
    user: data.user,
    needsConfirmation,
    email,
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
    .maybeSingle();

  if (error) {
    if (__DEV__) console.log('[fetchProfile] erro:', error);
    throw new Error(traduzirErro(error));
  }
  return data;
}

export async function ensureProfile(authUser) {
  if (!authUser?.id) return null;

  const existente = await fetchProfile(authUser.id);
  if (existente) return existente;

  const novoPerfil = {
    id: authUser.id,
    nome: authUser.user_metadata?.nome ?? authUser.email?.split('@')[0] ?? '',
    email: authUser.email ?? '',
    telefone: authUser.user_metadata?.telefone ?? null,
  };

  const { data, error } = await supabase
    .from('usuarios')
    .insert([novoPerfil])
    .select('id, nome, email, telefone')
    .single();

  if (error) {
    if (__DEV__) console.log('[ensureProfile] erro ao criar perfil:', error);
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
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  const usuarioAutenticado = user.id;

  if (usuarioId && usuarioId !== usuarioAutenticado && __DEV__) {
    console.log('[createTask] usuarioId do contexto difere do auth.uid()', usuarioId, usuarioAutenticado);
  }

  const { data, error } = await supabase
    .from('tarefas')
    .insert([
      {
        titulo,
        descricao: descricao || null,
        status,
        prioridade,
        usuario_id: usuarioAutenticado,
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

export async function deleteTask(taskId) {
  const { error } = await supabase.from('tarefas').delete().eq('id', taskId);

  if (error) {
    if (__DEV__) console.log('[deleteTask] erro:', error);
    throw new Error(traduzirErro(error));
  }
}

export async function updateTask(taskId, { status, prioridade }) {
  const patch = {};
  if (status !== undefined) patch.status = status;
  if (prioridade !== undefined) patch.prioridade = prioridade;
  if (Object.keys(patch).length === 0) return null;

  const { data, error } = await supabase
    .from('tarefas')
    .update(patch)
    .eq('id', taskId)
    .select()
    .single();

  if (error) {
    if (__DEV__) console.log('[updateTask] erro:', error);
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
  if (error?.code === '42501') {
    return 'Permissão negada. Execute docs/supabase-fix-rls.sql no Supabase ou faça login novamente.';
  }
  if (error?.message?.includes('Failed to fetch')) return 'Sem conexão com o servidor.';
  return error?.message || 'Erro inesperado ao acessar a API.';
}
