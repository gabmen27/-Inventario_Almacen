create database almacen;

use almacen;

create table categoria(
	id_categoria int primary key auto_increment,
    nombre varchar(50) not null
);

create table proveedor(
	id_proveedor int primary key auto_increment,
    nombre varchar(50),
    telefono varchar(20),
    direccion varchar(50)
);

create table producto(
	id_producto int primary key auto_increment,
    nombre varchar(50) not null,
    precio decimal(7,2),
    existencia int,
    id_categoria int,
    id_proveedor int, 
    constraint fk_categoria foreign key (id_categoria) references categoria(id_categoria),
    constraint fk_proveedor foreign key (id_proveedor) references proveedor(id_proveedor)
);

create table usuario (
    id_usuario int primary key auto_increment,
    nombre_completo varchar(100) not null,
    correo varchar(100) unique not null,
    contrasena varchar(255) not null,
    rol varchar(20)
);

create table bitacora_inventario (
    id_bitacora int primary key auto_increment,
    id_producto int,
    id_usuario int,
    tipo_operacion varchar(20) not null,
    cantidad int not null,
    fecha_registro timestamp default current_timestamp,
    constraint fk_producto_bit foreign key (id_producto) references producto(id_producto),
    constraint fk_usuario_bit foreign key (id_usuario) references usuario(id_usuario)
);
