drop table if exists person;
create table person(
    id serial not null constraint person_id unique,
    firstname varchar default 128,
    lastname varchar default 128,
    city varchar default 128,
    phone varchar default 32,
    telegram varchar default 32
);
