-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: sayi
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `contacto`
--

DROP TABLE IF EXISTS `contacto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `contacto` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `asunto` varchar(200) DEFAULT NULL,
  `consulta` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacto`
--

LOCK TABLES `contacto` WRITE;
/*!40000 ALTER TABLE `contacto` DISABLE KEYS */;
INSERT INTO `contacto` VALUES (1,'Federico','fedeara_1@hotmail.com','consulta',NULL),(2,'Antonio','aragonaclassiccars@hotmail.com','consulta',NULL),(3,'Federicos','fedeara_1@hotmail.coms','consulta',NULL),(4,'Federico','fedeara_1@hotmail.com','as',NULL),(5,'rodri','rodri@hotmail.com','hola',NULL);
/*!40000 ALTER TABLE `contacto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalledeventa`
--

DROP TABLE IF EXISTS `detalledeventa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `detalledeventa` (
  `id` int(10) NOT NULL,
  `idventa` int(10) NOT NULL,
  `idproducto` int(10) unsigned NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` decimal(5,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_venta_idx` (`idventa`),
  KEY `id_producto_idx` (`idproducto`),
  CONSTRAINT `id_producto` FOREIGN KEY (`idproducto`) REFERENCES `productos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `id_venta` FOREIGN KEY (`idventa`) REFERENCES `ventas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalledeventa`
--

LOCK TABLES `detalledeventa` WRITE;
/*!40000 ALTER TABLE `detalledeventa` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalledeventa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metododepago`
--

DROP TABLE IF EXISTS `metododepago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `metododepago` (
  `id` int(10) NOT NULL,
  `metodo` varchar(100) NOT NULL,
  `cuotas` int(11) DEFAULT NULL,
  `divisa` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metododepago`
--

LOCK TABLES `metododepago` WRITE;
/*!40000 ALTER TABLE `metododepago` DISABLE KEYS */;
/*!40000 ALTER TABLE `metododepago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `precio` decimal(6,2) NOT NULL,
  `stock` int(10) NOT NULL,
  `descripcion` longtext NOT NULL,
  `descuento` int(1) NOT NULL DEFAULT 0,
  `img` varchar(300) NOT NULL,
  `idcategoria` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (3,'granola',22.00,22,'granolaaa',1,'product-1663028911467.jpg','Congelados'),(4,'asd',2.00,2,'asd',0,'productDefault.png','Congelados'),(5,'Lechuga',100.00,5,'Verde lechuga fresca',1,'product-1663020932706.png','Verduras'),(6,'Almendras deshidratadas',1200.99,5,'Activar los frutos secos y las semillas es ideal para que podamos aprovechar todos sus nutrientes, en este proceso de «activación» en el que se dejan en remojo las almendras en agua filtrada por aproximadamente 12 horas',0,'product-1663029463025.jpg','Frutos secos'),(7,'Manteca Ghee',670.00,2,'GHEE o manteca clarificada, es un producto obtenido mediante un proceso totalmente artesanal y natural  en el cual la manteca de vaca es sometida a un proceso de clarificado, en el que se eliminan las impurezas y sólidos de la leche',1,'product-1663029753102.jpg','Aderezos'),(8,'Miel multifloral Madhu líquida',1100.00,5,'Miel de campo multifloral líquida',1,'product-1663029861448.jpg','Endulzantes'),(9,'Coconut cluster original',680.00,24,'SNACK  a base de coco en escamas, semillas de zapallo, girasol y chía, en trozos.',1,'product-1663030618060.jpg','Crackers');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `contrasenia` varchar(100) NOT NULL,
  `img` varchar(300) DEFAULT NULL,
  `estado` int(1) DEFAULT NULL,
  `admin` int(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Federico','Aragona','fedeara_1@hotmail.coms','aaa','userDefault.png',1,1),(2,'Antonio','Aragona','aragonaclassiccars@hotmail.com','','userDefault.png',1,0),(3,'rodry','gra','gra@hotmai.com','','userDefault.png',1,0),(4,'eva','jac','eva@hotmail.com','','user-1660593029993.jpg',1,0),(32,'purplee','haze','purple@hotmail.com','123','user-1661915077265.jpg',0,0),(33,'matu','aragona','ara@hotmail.com','123','user-1662166873939.jpg',0,0),(35,'horacio','horacios','horacio@hotmail.com','123','userDefault.png',1,0);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ventas` (
  `id` int(10) NOT NULL,
  `idusuario` int(10) unsigned NOT NULL,
  `fecha` date NOT NULL,
  `total` decimal(5,2) NOT NULL,
  `estado` varchar(45) NOT NULL,
  `idmetodopago` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_id_usuario_idx` (`idusuario`),
  KEY `fk_id_metodopago_idx` (`idmetodopago`),
  CONSTRAINT `fk_id_metodopago` FOREIGN KEY (`idmetodopago`) REFERENCES `metododepago` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_id_usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-13 22:04:37
