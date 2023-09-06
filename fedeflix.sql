-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: 127.0.0.1    Database: fedeflix
-- ------------------------------------------------------
-- Server version	10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
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
  `consulta` varchar(400) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacto`
--

LOCK TABLES `contacto` WRITE;
/*!40000 ALTER TABLE `contacto` DISABLE KEYS */;
INSERT INTO `contacto` VALUES (1,'sdasd','aragonaclassiccars@hotmail.com','asdsad','sadsadsda');
/*!40000 ALTER TABLE `contacto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `peliculas`
--

DROP TABLE IF EXISTS `peliculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `peliculas` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) NOT NULL,
  `rating` decimal(2,1) DEFAULT NULL,
  `descripcion` longtext DEFAULT NULL,
  `img` varchar(300) NOT NULL,
  `genero` varchar(300) DEFAULT NULL,
  `estado` int(1) NOT NULL,
  `duracion` int(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `peliculas`
--

LOCK TABLES `peliculas` WRITE;
/*!40000 ALTER TABLE `peliculas` DISABLE KEYS */;
INSERT INTO `peliculas` VALUES (1,'Toy Story 2',6.0,'pelicula de chicos','pelicula-1693844404996.jpeg','Infantil',1,130),(2,'Bee Movie',6.1,'Barry B. Benson, a bee just graduated from college, is disillusioned at his lone career choice: making honey. On a special trip outside the hive, Barry\'s life is saved by Vanessa, a florist in New York City. As their relationship ...','https://m.media-amazon.com/images/M/MV5BMjE1MDYxOTA4MF5BMl5BanBnXkFtZTcwMDE0MDUzMw@@._V1_SX300.jpg','Animation, Adventure, Comedy',1,91),(3,'The Simpsons Movie',7.3,'After Homer pollutes the town\'s water supply, Springfield is encased in a gigantic dome by the EPA and the Simpsons are declared fugitives.','https://m.media-amazon.com/images/M/MV5BNjc4NmQyNGUtMDg4NS00ZTZkLWI3ODQtMGJmYThiYjQxNGRiXkEyXkFqcGdeQXVyMTA0MTM5NjI2._V1_SX300.jpg','Animation, Adventure, Comedy',1,87),(4,'El Camino: A Breaking Bad Movie',7.3,'Fugitive Jesse Pinkman runs from his captors, the law, and his past.','https://m.media-amazon.com/images/M/MV5BNjk4MzVlM2UtZGM0ZC00M2M1LThkMWEtZjUyN2U2ZTc0NmM5XkEyXkFqcGdeQXVyOTAzMTc2MjA@._V1_SX300.jpg','Action, Crime, Drama',1,122),(32,'Titanic',7.9,'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.','https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg','Drama, Romance',1,194);
/*!40000 ALTER TABLE `peliculas` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Federico','Aragona','fedeara_1@hotmail.coms','aa','userDefault.png',1,1),(2,'Antonio','Ara','aragonaclassiccars@hotmail.com','333','userDefault.png',1,0),(3,'Maximiliano','Aragona','ara@hotmail.asd','1234','userDefault.png',1,0),(57,'fede','ara','fedeara_1@hotmail.com','$2b$10$fJt8Ch3lJ2YSXa6gl7dOI.bcN2xyKnHLnE8Z9alppz.snwV6k7rz2','userDefault.png',1,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuariosxpeliculas`
--

DROP TABLE IF EXISTS `usuariosxpeliculas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuariosxpeliculas` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `idusuario` int(10) unsigned NOT NULL,
  `idpelicula` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idusuario_idx` (`idusuario`),
  KEY `idpelicula_idx` (`idpelicula`),
  CONSTRAINT `idpelicula` FOREIGN KEY (`idpelicula`) REFERENCES `peliculas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idusuario` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuariosxpeliculas`
--

LOCK TABLES `usuariosxpeliculas` WRITE;
/*!40000 ALTER TABLE `usuariosxpeliculas` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuariosxpeliculas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-06 14:10:07
