const express = require('express');
const DevController = require('./controllers/DevController');
const LikeController = require('./controllers/LikeController');
const DisLikeController = require('./controllers/DisLikeController');
const routes = express.Router();

routes.get('/devs',DevController.index)
routes.post('/devs',DevController.store)
routes.post('/devs/:idDev/like',LikeController.store)
routes.post('/devs/:idDev/dislike',DisLikeController.store)

routes.get('/test/:idDev',(req,res) => {
    return res.json(req.params.idDev);
})
module.exports = routes;