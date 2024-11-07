const mysql = require("../database/db");
const constants = require("../constants");

async function insertLog(req, res) {
  let conn;
  try {
    const sqlGet = constants.getSensorIdBySerial;
    const sqlInsert = constants.insertSensorReading;

    const serial = req.body.serialNumber;
    const valor = req.body.valor;

    const pool = mysql.getPool(); // Obtenemos el pool de conexiones
    conn = await pool.getConnection();

    // Primer query: encontrar sensor
    const [data] = await conn.execute(sqlGet, [serial]);

    if (data.length === 0) {
      res.status(404).json({ message: "Sensor not found" });
      return;
    }

    const sensorId = data[0].id;

    const [result] = await conn.execute(sqlInsert, [sensorId, valor]);
    res.json({
      status: 200,
      message: "Valor insertado",
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  } finally {
    if (conn) conn.release(); // Libera la conexión en lugar de cerrarla
  }
}

module.exports = { insertLog };