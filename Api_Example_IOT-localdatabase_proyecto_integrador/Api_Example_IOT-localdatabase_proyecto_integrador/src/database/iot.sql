CREATE DATABASE `iot_proyectointegrador` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

-- iot_proyectointegrador.aulas definition

CREATE TABLE `aulas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `salon` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- iot_proyectointegrador.sensores definition

CREATE TABLE `sensores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `serialNumber` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `serialNumber` (`serialNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- iot_proyectointegrador.sensor_aula definition

CREATE TABLE `sensor_aula` (
  `id_sensor` int DEFAULT NULL,
  `id_aula` int DEFAULT NULL,
  KEY `id_sensor` (`id_sensor`),
  KEY `id_aula` (`id_aula`),
  CONSTRAINT `sensor_aula_ibfk_1` FOREIGN KEY (`id_sensor`) REFERENCES `sensores` (`id`),
  CONSTRAINT `sensor_aula_ibfk_2` FOREIGN KEY (`id_aula`) REFERENCES `aulas` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- iot_proyectointegrador.sensor_registro definition

CREATE TABLE `sensor_registro` (
  `id_sensor` int DEFAULT NULL,
  `valor` int NOT NULL,
  `fecha` datetime DEFAULT CURRENT_TIMESTAMP,
  KEY `id_sensor` (`id_sensor`),
  CONSTRAINT `sensor_registro_ibfk_1` FOREIGN KEY (`id_sensor`) REFERENCES `sensores` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- insert values

INSERT INTO iot_proyectointegrador.sensores
(id, serialNumber)
VALUES(1, 'dht11');

INSERT INTO iot_proyectointegrador.aulas
(id, salon)
VALUES(1, 'A7105');
INSERT INTO iot_proyectointegrador.aulas
(id, salon)
VALUES(2, 'A3112');
INSERT INTO iot_proyectointegrador.aulas
(id, salon)
VALUES(3, 'A4308');

INSERT INTO iot_proyectointegrador.sensor_aula
(id_sensor, id_aula)
VALUES(1, 3);