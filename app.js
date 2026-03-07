const express = require("express");
const app = express();
const mysql = require("mysql2");
const PORT = 3000;
app.use(express.json());

const pool = mysql.createPool({
  host: "localhost",
  user: "equipo_4",
  password: "abc123",
  database: "Almacen_DB",
});

pool.getConnection((error, conexion) => {
  if (error) {
    console.log("Error de conexion a la base de datos");
  } else {
    console.log("Conexion exitosa");
  }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
