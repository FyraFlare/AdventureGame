-- MySQL dump 10.13  Distrib 5.6.26, for Win32 (x86)
--
-- Host: localhost    Database: adventure
-- ------------------------------------------------------
-- Server version	5.6.26

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
-- Table structure for table `atacks`
--

DROP TABLE IF EXISTS `atacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `atacks` (
  `atack` varchar(50) NOT NULL,
  `text` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`atack`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atacks`
--

LOCK TABLES `atacks` WRITE;
/*!40000 ALTER TABLE `atacks` DISABLE KEYS */;
INSERT INTO `atacks` VALUES ('Charge','charges forward at full speed'),('Ghoulish Scream','lets out an ear-splitting scream that could wake the dead'),('Kick','atempts to kick you with all its strength'),('Potion','reaches under its robes and pulls out a potion and throws it at you'),('Scare','disapears, and you lose track of it. It quickly shows up behind you to scare you'),('Spell','murmers something under its breath and waves its wand to cast a spell');
/*!40000 ALTER TABLE `atacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `monsters`
--

DROP TABLE IF EXISTS `monsters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `monsters` (
  `name` varchar(50) NOT NULL,
  `location` varchar(50) DEFAULT NULL,
  `strong` varchar(20) DEFAULT NULL,
  `weak` varchar(50) DEFAULT NULL,
  `min` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `monsters`
--

LOCK TABLES `monsters` WRITE;
/*!40000 ALTER TABLE `monsters` DISABLE KEYS */;
INSERT INTO `monsters` VALUES ('Ghost','Forest','Ghoulish Scream','Scare',3),('Wild Boar','Forest','Charge','Kick',1),('Witch','Forest','Spell','Potion',5);
/*!40000 ALTER TABLE `monsters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `username` varchar(20) NOT NULL,
  `level` int(11) NOT NULL,
  `exp` int(11) NOT NULL,
  `health` int(11) NOT NULL,
  `story` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('FakeUser',3,40,345,1,'123'),('Louise',1,0,100,0,'$2y$10$kRf.aOodfH2TJrlxLogo5uhaTG1.kVNGMFTA5OZlFGwRHBwHJXcrK'),('rm',1,0,100,0,'$2y$10$OAiQMqs5WPgr1aiRkx1QQO3P/jkocL7buJx7i1VlRVOWtdmeQCyGa'),('Test',1,0,100,0,'$2y$10$dqOLw../qHqgJDHQt1vGQuP1YRuEgQ7v0uVVuYbau0GImzdaJaAzW'),('umbraphilia',4,70,228,1,'$2y$10$yNfr4DUeSzE9OAuZoU4oceez/BJ4a2Wqted/OeAUmfKWTAKYz8Amq');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-05-04 21:00:33
