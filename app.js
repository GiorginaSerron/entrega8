const express = require('express')
const app = express()
const port = 3000
const fs = require('fs')
const path = require('path')


app.use(express.json())


app.get('/sell/:nombre', (req, res)=>{
    const nombreArchivo = req.params.nombre;
    const archivoPath = path.join(__dirname, 'data', `${nombreArchivo}.json`);




    fs.readFile(archivoPath, 'utf-8', (err, data)=>{
        if (err){
            return res.status(404).send('Error al recuperar archivo')
        }
        res.json(JSON.parse(data))
    })
})


app.listen(port, () =>{
    console.log(`Servidor corriendo en http://localhost:{$port}`)
})
