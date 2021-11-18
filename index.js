let express = require('express');
let app = express();
let fs = require("fs");
const PORT = 8080;

class Contenedor{
    constructor (url){
        this.url = url
    }
    getAll(){
        let data = fs.readFileSync(this.url, "utf-8");
        let parseData = JSON.parse(data);
        return parseData;
    }
}

let file = new Contenedor("./productos.txt");

app.get("/", (req, res) => {
    res.send("Hola esto es la get / de express");
})

app.get("/productos", (req, res) => {
    res.json(file.getAll());
})

app.get("/productoRandom", (req, res) => {
    let product = file.getAll();
    let randomNumber = Math.floor(Math.random() * product.length);
    res.json(product[randomNumber]);
})

app.listen(PORT);