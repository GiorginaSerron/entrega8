const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const path = require('path')
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise')

const dbConfig = {
    host: 'localhost',     
    user: 'root',          
    password: '1989',  
    database: 'EcommerceDB' 
  };


app.use(express.json())
app.use(cors());


app.get('/sell/:nombre',authorize, (req, res)=>{
    const nombreArchivo = req.params.nombre;
    const archivoPath = path.join(__dirname, 'sell', `${nombreArchivo}.json`);


    

    fs.readFile(archivoPath, 'utf-8', (err, data)=>{
        if (err){
            return res.status(404).send('Error al recuperar archivo')
        }
        res.json(JSON.parse(data))
    })
})

app.get('/products/:nombre', authorize, (req, res)=>{
    const nombreArchivo = req.params.nombre;
    const archivoPath = path.join(__dirname, 'products', `${nombreArchivo}.json`);


    

    fs.readFile(archivoPath, 'utf-8', (err, data)=>{
        if (err){
            return res.status(404).send('Error al recuperar archivo')
        }
        res.json(JSON.parse(data))
    })
})

app.get('/products_comments/:nombre', authorize, (req, res)=>{
    const nombreArchivo = req.params.nombre;
    const archivoPath = path.join(__dirname, 'products_comments', `${nombreArchivo}.json`);


    

    fs.readFile(archivoPath, 'utf-8', (err, data)=>{
        if (err){
            return res.status(404).send('Error al recuperar archivo')
        }
        res.json(JSON.parse(data))
    })
})

app.get('/user_cart/:nombre',authorize, (req, res)=>{
    const nombreArchivo = req.params.nombre;
    const archivoPath = path.join(__dirname, 'user_cart', `${nombreArchivo}.json`);


    

    fs.readFile(archivoPath, 'utf-8', (err, data)=>{
        if (err){
            return res.status(404).send('Error al recuperar archivo')
        }
        res.json(JSON.parse(data))
    })
})

app.get('/cats_products/:nombre',authorize, (req, res)=>{
    const nombreArchivo = req.params.nombre;
    const archivoPath = path.join(__dirname, 'cats_products', `${nombreArchivo}.json`);


    

    fs.readFile(archivoPath, 'utf-8', (err, data)=>{
        if (err){
            return res.status(404).send('Error al recuperar archivo')
        }
        res.json(JSON.parse(data))
    })
})

app.get('/cats/:nombre',authorize, (req, res)=>{
    const nombreArchivo = req.params.nombre;
    const archivoPath = path.join(__dirname, 'cats', `${nombreArchivo}.json`);


    

    fs.readFile(archivoPath, 'utf-8', (err, data)=>{
        if (err){
            return res.status(404).send('Error al recuperar archivo')
        }
        res.json(JSON.parse(data))
    })
})

app.get('/cart/:nombre',authorize, (req, res)=>{
    const nombreArchivo = req.params.nombre;
    const archivoPath = path.join(__dirname, 'cart', `${nombreArchivo}.json`);


    

    fs.readFile(archivoPath, 'utf-8', (err, data)=>{
        if (err){
            return res.status(404).send('Error al recuperar archivo')
        }
        res.json(JSON.parse(data))
    })
})

app.post('/login', (req, res) => {

    const SECRET_KEY = 'mi_acceso_JAP';

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Faltan credenciales' });
    }
    
    const token = jwt.sign({ username }, SECRET_KEY);
    res.json({ token });
});

function authorize(req, res, next) {
    let SECRET_KEY = 'mi_acceso_JAP';
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Acceso denegado. No se dispone de token.' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido o expirado.' });
    }
}

app.post('/cart', async (req, res) => {
    const { NombreUsuario, items } = req.body;
  
    if (!NombreUsuario || !items || items.length === 0) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }
  
    const connection = await mysql.createConnection(dbConfig);
  
    try {
      
      await connection.beginTransaction();
  
  
      // Insertar compras y actualizar las unidades vendidas
      for (const item of items) {
        const { productoID, unidadesVendidas } = item;
  
        // Verificar que el producto exista
        const [productRows] = await connection.query(
          'SELECT ProductoID FROM Productos WHERE ProductoID = ?',
          [productoID]
        );
  
        if (productRows.length === 0) {
          return res.status(404).json({ error: `Producto con ID ${productoID} no encontrado` });
        }
  
        // Insertar la compra
        await connection.query(
          `INSERT INTO Compras (NombreUsuario, ProductoID, UnidadesVendidas) 
           VALUES (?, ?, ?)`,
          [NombreUsuario, productoID, unidadesVendidas]
        );
  
        // Actualizar las unidades vendidas en la tabla Productos
        await connection.query(
          `UPDATE Productos 
           SET UnidadesVendidas = UnidadesVendidas + ? 
           WHERE ProductoID = ?`,
          [unidadesVendidas, productoID]
        );
      }
  
     
      await connection.commit();
  
      res.status(201).json({ message: 'Carrito guardado exitosamente' });
    } catch (error) {
      
      await connection.rollback();
      console.error(error);
      res.status(500).json({ error: 'Error al guardar el carrito' });
    } finally {
      
      await connection.end();
    }
  });


  app.post('/userdata', async (req, res) => {
    const {segundoNombre, apellido, segundoApellido, email, telefono, nombreUsuario } = req.body;
  
    const connection = await mysql.createConnection(dbConfig);
  
    try {
      
      await connection.beginTransaction();
  
        // Insertar usuario
        await connection.query(
          `INSERT INTO usuarios (SegundoNombre, Apellido, SegundoApellido, Email, Telefono, NombreUsuario) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [segundoNombre, apellido, segundoApellido, email, telefono, nombreUsuario ]
        );
  
      await connection.commit();
  
      res.status(201).json({ message: 'Usuario guardado exitosamente' });
    } catch (error) {
      
      await connection.rollback();
      console.error(error);
      res.status(500).json({ error: 'Error al guardar el usuario' });
    } finally {
      
      await connection.end();
    }
    }
  );


app.listen(port, () =>{
    console.log(`Servidor corriendo en http://localhost:${port}`)
})
