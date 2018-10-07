drop table if exists movies;

create table if not exists movies (
  id serial primary key,
  name text not null
);

insert into movies (name) values
('Airplane'),
('Zoolander'),
('Airplane 2');
