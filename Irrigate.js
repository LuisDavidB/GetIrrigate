const express = require('express');
const port = 3000;
const app = express();
const random = require('randomatic');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

app.get('/', (req, res) => {
    res.status(200);
    res.send('Funcionando');
});

app.get('/irrigation', (req, res)=>{
    let datos = req.body;
    if (datos.rainDrops== "N"){
        let hoy =new Date();
        let segundos = Math.floor(Math.random() * 14400); 
        let litros = ((segundos*16)/14400).round(2);
        let id = guidGenerator();
        let nuevosdatos = {
            "irrigationid" : id,
            "time" : hoy.getHours() + ":" + hoy.getMinutes(),
            "day" : hoy.getDay(),
            "month" : hoy.getMonth(),
            "year" : hoy.getFullYear(),
            "irrigationTimeSec" : segundos,
            "litersUsed" : litros
        }
        res.statusCode= 200;
        res.send(nuevosdatos);
    }else {
        res.statusCode=100;
        res.send({});
    }
});

function guidGenerator() {
    let S4 = function() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

Number.prototype.round = function(p) {
        p = p || 10;
        return parseFloat( this.toFixed(p) );
      };


app.listen(port, () => {
    console.log(`Practica 3 listening on port ${port}`);
})


