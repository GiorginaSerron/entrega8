const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const path = require('path')
const cors = require('cors');
const jwt = require('jsonwebtoken');


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



app.listen(port, () =>{
    console.log(`Servidor corriendo en http://localhost:${port}`)
})
