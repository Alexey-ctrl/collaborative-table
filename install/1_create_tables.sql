create table public.users
(
    id       integer generated always as identity
        constraint users_pk
            primary key,
    login    varchar(255) not null
        constraint users_unique_login
            unique,
    password varchar(255) not null
);

create table public.sessions
(
    id      uuid    not null
        constraint sessions_pk
            primary key,
    user_id integer not null
        constraint sessions_users_id_fk
            references public.users (id)
);

create table public.logs
(
    id         integer generated always as identity
        constraint logs_pk
            primary key,
    user_id    integer      not null
        constraint logs_users_id_fk
            references public.users (id),
    action     varchar(255) not null,
    message    text,
    created_at timestamp with time zone default now()
);

