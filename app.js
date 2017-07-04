var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController.js');
var apiRecipeController = require('./controllers/apiRecipeController.js');
var apiIngredientController = require('./controllers/apiIngredientController.js');

mongoose.connect(config.getDbConnectionString());


var port = process.env.PORT || 3000;

app.get('/api/test', function(req, res) {
    console.log('made it into get');
    res.send('Hello World');
});

setupController(app);
apiRecipeController(app);
apiIngredientController(app);

app.listen(port);