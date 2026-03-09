app.delete('/api/productos/:id',(req,res)=>{
  const id = parseInt(req.params.id);
  const sql = 'DELETE From Producto WHERE id_producto=?';

  pool.query(sql,[id],(error,results)=>{
    if(error){
      console.log('Existe un error en la consulta SQL');
      res.status(500).json({status:500, message:'Error en la consulta SQL...'});
    }else if(results.affectedRows === 0){
      res.status(404).json({status:400, message:'Producto no encontrado...'})
    }else{
      res.status(200).json({status:200,message:'Producto eliminado exitosamente'});
    }

  });
})
