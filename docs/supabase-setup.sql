-- =============================================================
-- PDM Tarefas - Setup do banco Supabase usando Supabase Auth
-- Execute no SQL Editor do seu projeto Supabase.
--
-- ATENCAO: este script faz DROP nas tabelas atuais. Use apenas
-- em projetos de teste; voce vai perder usuarios e tarefas
-- antigos (que estavam usando o esquema "caseiro" com coluna senha).
-- Apos rodar, os usuarios precisam se recadastrar via app
-- (o Supabase Auth criara as contas em auth.users).
-- =============================================================

-- 1) Limpa esquema antigo
drop table if exists public.tarefas;
drop table if exists public.usuarios;

-- 2) Tabela usuarios = PERFIL ligado 1-para-1 a auth.users
create table public.usuarios (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null,
  email text not null,
  telefone text,
  created_at timestamptz not null default now()
);

-- 3) Trigger que cria o perfil automaticamente apos signUp
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.usuarios (id, nome, email, telefone)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'nome', ''),
    new.email,
    new.raw_user_meta_data->>'telefone'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 4) Tabela de tarefas
create table public.tarefas (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text,
  status text not null default 'pendente'
    check (status in ('pendente','em_andamento','concluida')),
  prioridade text not null default 'media'
    check (prioridade in ('baixa','media','alta')),
  data_tarefa date not null default current_date,
  usuario_id uuid not null references public.usuarios(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index tarefas_usuario_id_idx on public.tarefas (usuario_id);
create index tarefas_usuario_data_tarefa_idx on public.tarefas (usuario_id, data_tarefa);

-- 5) RLS baseada em auth.uid() (usuario so ve/cria os proprios dados)
alter table public.usuarios enable row level security;
alter table public.tarefas  enable row level security;

drop policy if exists "usuarios_select_self" on public.usuarios;
drop policy if exists "usuarios_update_self" on public.usuarios;
drop policy if exists "tarefas_select_own"   on public.tarefas;
drop policy if exists "tarefas_insert_own"   on public.tarefas;
drop policy if exists "tarefas_update_own"   on public.tarefas;
drop policy if exists "tarefas_delete_own"   on public.tarefas;

create policy "usuarios_select_self"
  on public.usuarios for select to authenticated
  using (id = auth.uid());

create policy "usuarios_insert_self"
  on public.usuarios for insert to authenticated
  with check (id = auth.uid());

create policy "usuarios_update_self"
  on public.usuarios for update to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

create policy "tarefas_select_own"
  on public.tarefas for select to authenticated
  using (usuario_id = auth.uid());

create policy "tarefas_insert_own"
  on public.tarefas for insert to authenticated
  with check (usuario_id = auth.uid());

create policy "tarefas_update_own"
  on public.tarefas for update to authenticated
  using (usuario_id = auth.uid())
  with check (usuario_id = auth.uid());

create policy "tarefas_delete_own"
  on public.tarefas for delete to authenticated
  using (usuario_id = auth.uid());
