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

app.get('/api/productos',(req,res)=>{
  const sql = "select * from Producto";

  pool.query(sql,(error,results)=>{
      if(error){
        console.log("Existe un error en la consulta SQL");
        res.status(500).json({status:500,message:"Error en la consulta SQL..."});
      }else{
        res.status(200).json({ status:200, message:"Sucess", data:results });
      }
  });

})

app.get('/api/productos/estado/:estado',(req,res)=>{
  const estado = parseInt(req.params.estado);
  const sql = "select * from Producto where estado = ?; ";

  if (isNaN(estado) || (estado != 0 && estado !=1)){
    return res.status(400).json({ status: 400, message: "El estado debe ser un número (0 o 1)" });
  }

  pool.query(sql,[estado],(error,results)=>{
      if(error){
        console.log("Existe un error en la consulta SQL");
        res.status(500).json({status:500,message:"Error en la consulta SQL..."});
      }else{
        res.status(200).json({ status:200, message:"Sucess", data:results });
      }
  });

})

app.get('/api/productos/categoria/:id_categoria',(req,res)=>{
  const id_categoria = parseInt(req.params.id_categoria);
  const sql = " SELECT p.id_producto as ID," +
              " p.nombre as Producto," +
              " p.sku as sku," + 
              " p.precio_venta," + 
              " c.nombre as Categoria" + 
              " FROM Producto p" + 
              " INNER JOIN Categoria c "+
              " ON p.id_categoria = c.id_categoria"+
              " WHERE p.id_categoria = ?;";

  if (isNaN(id_categoria)){
    return res.status(400).json({ status: 400, message: "Categoria ID es un numero" });
  }

  pool.query(sql,[id_categoria],(error,results)=>{
      if(results.length === 0){
        return res.status(400).json({status:400, message:"No se encontro producto de esta categoria, Categoria no existe.."});
      }
      if(error){
        console.log("Existe un error en la consulta SQL");
        res.status(500).json({status:500,message:"Error en la consulta SQL..."});
      }else{
        res.status(200).json({ status:200, message:"Sucess", data:results });
      }
  });

})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
