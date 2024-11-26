--Creación de la base de datos
CREATE DATABASE EcommerceDB;
USE EcommerceDB;

--Creación de la tabla de usuarios
CREATE TABLE Usuarios (
UsuarioID INT AUTO_INCREMENT PRIMARY KEY
Nombre VARCHAR NOT NULL,
Segundo nombre VARCHAR,
Apellido VARCHAR NOT NULL,
Segundo apellido VARCHAR,
Email VARCHAR UNIQUE NOT NULL,
Nombre_usuario VARCHAR NOT NULL,
Telefono INT UNIQUE,
);

--Creacion de la tabla de productos
CREATE TABLE Productos (
Nombre VARCHAR NOT NULL,
Unidades vendidas INT,
ProductoID INT UNIQUE NOT NULL,
Descripcion VARCHAR NOT NULL,
Precio DECIMAL(20,2) NOT NULL,
);

--Creación de la tabla de categorías
CREATE TABLE Categorías (
Nombre VARCHAR NOT NULL,
CategoriaID INT UNIQUE NOT NULL,
);

-- Tabla Compras (relación entre Usuarios y Productos)
CREATE TABLE Compras (
    CompraID INT AUTO_INCREMENT PRIMARY KEY,
    UsuarioID INT NOT NULL,
    ProductoID INT NOT NULL,
    UnidadesVendidas INT NOT NULL,
    FOREIGN KEY (UsuarioID) REFERENCES Usuarios(UsuarioID),
    FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID)
);

-- Creación de la tabla intermedia para productos y categorías
CREATE TABLE Producto_Categoria (
ProductoID INT NOT NULL,
CategoriaID INT NOT NULL,
PRIMARY KEY (ProductoID, CategoriaID),
FOREIGN KEY (ProductoID) REFERENCES Productos(ProductoID) ON DELETE CASCADE,
FOREIGN KEY (CategoriaID) REFERENCES Categorias(CategoriaID) ON DELETE CASCADE
);
