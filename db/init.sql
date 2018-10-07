drop table if exists movies;

create table if not exists movies (
  id serial primary key,
  name text not null unique,
  created_at timestamp not null
);

insert into movies (name, created_at) values
('Airplane', '2018-10-07T07:00:00'),
('Zoolander', '2018-10-07T07:00:01'),
('Airplane 2', '2018-10-07T07:00:02');
