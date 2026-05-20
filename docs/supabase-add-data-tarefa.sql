-- =============================================================
-- Migração: coluna data_tarefa em public.tarefas
-- Execute no SQL Editor do Supabase (projeto já em uso).
-- Não apaga dados existentes.
-- =============================================================

alter table public.tarefas
  add column if not exists data_tarefa date;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'tarefas'
      and column_name = 'data'
  ) then
    update public.tarefas
    set data_tarefa = data
    where data_tarefa is null and data is not null;

    alter table public.tarefas drop column data;
  end if;
end $$;

update public.tarefas
set data_tarefa = (created_at at time zone 'utc')::date
where data_tarefa is null;

alter table public.tarefas
  alter column data_tarefa set default current_date,
  alter column data_tarefa set not null;

drop index if exists tarefas_usuario_data_idx;
create index if not exists tarefas_usuario_data_tarefa_idx
  on public.tarefas (usuario_id, data_tarefa);
