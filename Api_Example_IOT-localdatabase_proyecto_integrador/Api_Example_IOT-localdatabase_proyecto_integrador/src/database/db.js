const mysql = require('mysql2');
const constants = require("../constants");
var fs = require("fs");

/**
 * Método que configura un pool de conexiones y lo regresa a quien lo solicite.
 */
function getPool() {
  const pool = mysql.createPool({
    host: constants.dbHost,
    user: constants.dbUser,
    port: constants.dbPort,
    password: constants.dbPass,
    database: "iot_proyectointegrador",
    waitForConnections: true,
    connectionLimit: 10,    // Número de conexiones simultáneas permitido
    queueLimit: 0,          // Sin límite para la cola de conexiones
    dateStrings: true,
  });

  return pool.promise();  // Devolvemos un pool con promesas para soporte de async/await
}

module.exports = { getPool };
