-- =============================================================
-- PDM Tarefas — Setup do banco Supabase
-- Execute no SQL Editor do seu projeto Supabase.
-- =============================================================

-- 1) Tabela de usuários (perfil; senha NÃO é persistida em texto plano)
create table if not exists public.usuarios (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text unique not null,
  telefone text,
  created_at timestamptz not null default now()
);

-- 2) Tabela de tarefas
create table if not exists public.tarefas (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text,
  status text not null default 'pendente'
    check (status in ('pendente','em_andamento','concluida')),
  prioridade text not null default 'media'
    check (prioridade in ('baixa','media','alta')),
  usuario_id uuid references public.usuarios(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists tarefas_usuario_id_idx on public.tarefas (usuario_id);

-- 3) RLS — modo DESENVOLVIMENTO para o trabalho acadêmico.
--    Em produção, substituir por políticas baseadas em auth.uid().
alter table public.usuarios enable row level security;
alter table public.tarefas  enable row level security;

drop policy if exists "usuarios_select_anon" on public.usuarios;
drop policy if exists "usuarios_insert_anon" on public.usuarios;
drop policy if exists "tarefas_select_anon"  on public.tarefas;
drop policy if exists "tarefas_insert_anon"  on public.tarefas;

create policy "usuarios_select_anon" on public.usuarios for select to anon using (true);
create policy "usuarios_insert_anon" on public.usuarios for insert to anon with check (true);

create policy "tarefas_select_anon"  on public.tarefas  for select to anon using (true);
create policy "tarefas_insert_anon"  on public.tarefas  for insert to anon with check (true);
