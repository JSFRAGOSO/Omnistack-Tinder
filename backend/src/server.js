const express = require('express');

const server = express();

server.get('/',(req,res) => {
    
    return res.send({message : `Olá ${req.query.name}`});
})

server.listen(3333);