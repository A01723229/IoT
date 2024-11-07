
/*
 * LOCAL DATABASE Config
 * 
 *  Para acceder a una BD en la nube debes configurar un archivo .env
 */
const dbHost = "localhost";
const dbPort = "3306";
const dbUser = "root";
const dbPass = "root";
const dbName = "iot_proyectointegrador";

/*
 * Server General Configuration
 */
const serverPort = 3000
const contextURL = '/iot_proyectointegrador'; //If needed, project context
const api = '/api'; // Sugested API URL

//SENSOR 1 URLS. Configurar URLS por cada sensor.
const postLog = '/insertLog'; //Implemented Endpoint URL

/*
 * DB Queries
 * Agregar queries por sensor.
 */
const getSensorIdBySerial = 'SELECT id FROM sensores WHERE serialNumber = ?';
const insertSensorReading = 'INSERT INTO sensor_registro (id_sensor, valor) VALUES (?, ?)';

module.exports= {
   dbHost,dbPort,dbUser,dbPass,dbName,serverPort,
   contextURL,api,
   postLog,
   getSensorIdBySerial,insertSensorReading,
}