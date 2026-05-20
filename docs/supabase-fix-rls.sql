-- =============================================================
-- CORREÇÃO RLS — erro 42501 ao criar tarefa
-- Execute no SQL Editor se INSERT em tarefas falhar com
-- "new row violates row-level security policy"
--
-- Causa comum: políticas antigas só para role "anon", mas após
-- login o Supabase usa role "authenticated".
-- =============================================================

alter table public.tarefas enable row level security;
alter table public.usuarios enable row level security;

-- Remove políticas antigas de desenvolvimento (anon aberto)
drop policy if exists "usuarios_select_anon" on public.usuarios;
drop policy if exists "usuarios_insert_self" on public.usuarios;
drop policy if exists "usuarios_insert_anon" on public.usuarios;
drop policy if exists "tarefas_select_anon"  on public.tarefas;
drop policy if exists "tarefas_insert_anon"  on public.tarefas;

-- Garante políticas para usuários autenticados (Supabase Auth)
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

-- Backfill: cria perfil em usuarios para qualquer auth.users sem perfil
insert into public.usuarios (id, nome, email, telefone)
select
  u.id,
  coalesce(u.raw_user_meta_data->>'nome', ''),
  u.email,
  u.raw_user_meta_data->>'telefone'
from auth.users u
left join public.usuarios p on p.id = u.id
where p.id is null;

-- Garante que o trigger handle_new_user esta presente
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
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

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
