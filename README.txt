
#recuerda que puedes utilizar herramientas de tu preferencia
#para levantar el api-rest debera seguir los siguiemtes pasos:

--- pasos para la creacion de la base de datos postgres ---

1. crea una base de datos con el nombre de apiusers y la tabla con el nombre de userapi con la siguiente línea de comando

####### POSTGRES #######

create database apiusers


create table userApi(
	id serial primary key,
	cedula_identidad int,
	nombre varchar(50),
	primer_apellido varchar(50),
	segundo_apellido varchar(50),
	fecha_nacimiento date
);

insert into userApi(cedula_identidad,nombre,primer_apellido,segundo_apellido,fecha_nacimiento)
values(7025148,'Ivancho','Patron','Patron','1987/04/14')
insert into userApi(cedula_identidad,nombre,primer_apellido,segundo_apellido,fecha_nacimiento)
values(6054187,'Lucho','Gallardo','Mamani','1989/07/25')
insert into userApi(cedula_identidad,nombre,primer_apellido,segundo_apellido,fecha_nacimiento)
values(3626154,'María','Flores','Quispe','1990/04/16')
insert into userApi(cedula_identidad,nombre,primer_apellido,segundo_apellido,fecha_nacimiento)
values(5859361,'Marco','Mendoza','Mamani','1989/07/25')
insert into userApi(cedula_identidad,nombre,primer_apellido,segundo_apellido,fecha_nacimiento)
values(6402564,'Lucho','Mamani','Mamani','2001/06/12')
insert into userApi(cedula_identidad,nombre,primer_apellido,segundo_apellido,fecha_nacimiento)
values(7126468,'Martin','Quispe','Mamani','2005/01/07')
insert into userApi(cedula_identidad,nombre,primer_apellido,segundo_apellido,fecha_nacimiento)
values(7248567,'Federica','Simoneta','Carpio','1984/11/22')


** Recuerda si cambias el nombre de la base de datos, tabla o campos, tienes que cambiar en el index.js en la constante pool, verifica bien tus datos en esta constante para no tener error;

###### FIN POSTGRES #######

--- pasos para levantar el API-REST ---

1. Crea una carpeta pega el index.js y el package.json
2. En tu editor de codigo se recomienda VisualCode abre la carpeta donde copiaste los archivos.
3. Ahora instalaremos los modulos de node, abre una terminal e ingresa la siguiente línea de código:
    > npm install
4. Ahora instalamos las dependencias(en la terminal)
    > npm install express
    > npm install pg

5. Levanta el servicio (en la terminal)
    > node index.js

6. segun el index.js el servidor estara levantado en:
    > http://localhost:4000

--- pasos para verificar la funcionalidad ---

para esto se utilizara postman
1. para ver el listado de los usuarios se utilizara por el metodo GET
    >  http://localhost:4000/userapi

2. para ver a un usuario por su id se realizara por el metodo GET ingresando un id ( en este caso el id es el 3 )
    > http://localhost:4000/userapi/3

3. para insertar un usuario se realizara por el metodo POST, en el Body sera RAW de typo JSON;
    en el body ingresaremos lo siguiente:
    --EN EL POST--

    > http://localhost:4000/userapi

    --- En el Body ---

    {
    "cedula_identidad":70262254,
    "nombre": "Nicolas",
    "primer_apellido":"Gomez",
    "segundo_apellido":"Tilin",
    "fecha_nacimiento":"2009/01/23"
    }

    -- recuera que puedes cambiar los datos

4. para actualizar datos de un usuario se utilizara PUT por medio de un id (en este caso estamos actualizando el id 8)

    --- EN EL PUT ---

    > http://localhost:4000/userapi/8

    --- En el Body ---
     {
    "cedula_identidad":7026265,
    "nombre": "Nicol",
    "primer_apellido":"Cardiaca",
    "segundo_apellido":"Princesa",
    "fecha_nacimiento":"2009/01/17"
    }

5. para eliminar se utilizara el metodo DELETE, ingresando un id para identificar al usuarioa eliminar(en este caso el id a eliminar es el 8)

    > http://localhost:4000/userapi/8

6. para ver todos los datos de los usuarios mas sus edades por el metodo GET

    > http://localhost:4000/userapi-ages

7. para ver el promedio de las edades lo mostraremos por el metodo GET

    > http://localhost:4000/userapi-promedio

8. para ver la version del API-REST se utilizara el metodo GET

    > http://localhost:4000/estado



###########################################

Realizado por: IVAN SUXO CHOQUE



