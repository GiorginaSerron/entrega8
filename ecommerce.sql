-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.11.5-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for ecommercedb
CREATE DATABASE IF NOT EXISTS `ecommercedb` /*!40100 DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci */;
USE `ecommercedb`;

-- Dumping structure for table ecommercedb.categorias
CREATE TABLE IF NOT EXISTS `categorias` (
  `Nombre` varchar(50) NOT NULL DEFAULT '',
  `CategoriaID` int(11) NOT NULL,
  UNIQUE KEY `CategoriaID` (`CategoriaID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;


-- Dumping structure for table ecommercedb.compras
CREATE TABLE IF NOT EXISTS `compras` (
  `CompraID` int(11) NOT NULL AUTO_INCREMENT,
  `NombreUsuario` varchar(255) NOT NULL,
  `ProductoID` int(11) NOT NULL,
  `UnidadesVendidas` int(11) NOT NULL,
  PRIMARY KEY (`CompraID`),
  KEY `NombreUsuario` (`NombreUsuario`),
  KEY `ProductoID` (`ProductoID`),
  CONSTRAINT `compras_ibfk_2` FOREIGN KEY (`NombreUsuario`) REFERENCES `usuarios` (`NombreUsuario`),
  CONSTRAINT `compras_ibfk_3` FOREIGN KEY (`ProductoID`) REFERENCES `productos` (`ProductoID`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;



-- Dumping structure for table ecommercedb.productos
CREATE TABLE IF NOT EXISTS `productos` (
  `Nombre` varchar(50) NOT NULL,
  `unidadesVendidas` int(11) DEFAULT 0,
  `ProductoID` int(11) NOT NULL DEFAULT 0,
  `Descripcion` varchar(50) NOT NULL DEFAULT '0',
  `Precio` decimal(20,2) NOT NULL DEFAULT 0.00,
  UNIQUE KEY `ProductoID` (`ProductoID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

-- Dumping data for table ecommercedb.productos: ~14 rows (approximately)
INSERT INTO `productos` (`Nombre`, `unidadesVendidas`, `ProductoID`, `Descripcion`, `Precio`) VALUES
	('Computadora de escritorio', 11, 40281, '-', 2599.00),
	('Oso de peluche', 98, 50741, '-', 2400.00),
	('Pelota de básquetbol', 11, 50742, '-', 2999.00),
	('PlayStation 5', 16, 50743, '-', 59999.00),
	('Bicicleta', 8, 50744, '-', 10999.00),
	('Chevrolet Onix Joy', 35, 50921, '-', 13500.00),
	('Fiat Way', 52, 50922, '-', 14500.00),
	('Suzuki Celerio', 25, 50923, '-', 12500.00),
	('Peugeot 208', 17, 50924, '-', 15200.00),
	('Bugatti Chiron', 0, 50925, '-', 350000.00),
	('Juego de comedor', 88, 60801, '-', 4000.00),
	('Sofá', 13, 60802, '-', 24000.00),
	('Armario', 24, 60803, '-', 8000.00),
	('Mesa de centro', 37, 60804, '-', 10000.00);

-- Dumping structure for table ecommercedb.producto_categoria
CREATE TABLE IF NOT EXISTS `producto_categoria` (
  `CategoriaID` int(11) NOT NULL DEFAULT 0,
  `ProductoID` int(11) NOT NULL,
  UNIQUE KEY `CategoriasID` (`CategoriaID`) USING BTREE,
  UNIQUE KEY `ProductoID` (`ProductoID`),
  CONSTRAINT `CategoriaID` FOREIGN KEY (`CategoriaID`) REFERENCES `categorias` (`CategoriaID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `ProductoID` FOREIGN KEY (`ProductoID`) REFERENCES `productos` (`ProductoID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;


-- Dumping structure for table ecommercedb.usuarios
CREATE TABLE IF NOT EXISTS `usuarios` (
  `SegundoNombre` varchar(50) DEFAULT '0',
  `Apellido` varchar(50) NOT NULL DEFAULT '0',
  `SegundoApellido` varchar(50) DEFAULT '0',
  `Email` varchar(50) NOT NULL DEFAULT '0',
  `NombreUsuario` varchar(50) NOT NULL DEFAULT '0',
  `Telefono` varchar(50) DEFAULT '0',
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `Telefono` (`Telefono`),
  UNIQUE KEY `NombreUsuario` (`NombreUsuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;


/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;