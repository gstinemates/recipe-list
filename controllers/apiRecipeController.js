var Recipes = require('../models/recipeModel.js');
var bodyParser = require('body-parser');
var jsonQuery = require('json-query');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    //Get a recipe by title
    app.get('/api/recipe/:title',function(req, res) {
        Recipes.find({ title: req.params.title }, function(err, recipe) {
            if(err) throw err;
            res.send(recipe);
        });
    });

    //Create a recipe
    app.post('/api/recipe',function(req, res) {
        var newRecipe = Recipes({
            title: req.body.title,
            instructions: req.body.instructions,
            ingredients: req.body.ingredients
        });
        newRecipe.save(function(err){
            if (err) throw err;
            res.send(newRecipe);
        })
    });

    //Update a recipe
    app.post('/api/recipe/:id',function(req, res) {
        Recipes.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            instructions: req.body.instructions,
            ingredients: req.body.ingredients
        }, function(err, recipe) {
            if (err) throw err;
            res.send(recipe);
        });
    });   

    //Delete a recipe
    app.delete('/api/recipe/:id', function(req,res) {
        Recipes.findByIdAndRemove(req.params.id, function(err) {
            if (err) throw err;
            res.send('Success');
        });
    });
}