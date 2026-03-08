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

app.get('/api/productos/:id', (req, res) => {

    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({mensaje: "El id debe ser un número válido"});
    }

    const sql = "SELECT * FROM Producto WHERE id_producto = ?";

    pool.query(sql, [id], (error, results) => {

        if (error) {
            return res.status(500).json({mensaje: "Error al consultar el producto", error: error.message});
        }

        if (results.length === 0) {
            return res.status(404).json({mensaje: "Producto no encontrado"});
        }

        res.status(200).json(results[0]);
    });

});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
