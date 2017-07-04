var Recipes = require('../models/recipeModel.js');
var bodyParser = require('body-parser');
var jsonQuery = require('json-query');

module.exports = function(app) {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    //Get a list of ingredients for a recipe
    app.get('/api/recipe/:id/ingredients',function(req, res) {
        //console.log('Made into app.get');
        
        Recipes.findById(req.params.id, function(err,recipe) {
            if (err) throw err;
            res.send(recipe.ingredients);
        });
    });

    //Get a specific ingredient
    app.get('/api/recipe/:id/ingredient/:ingredientid',function(req, res) {
        Recipes.findById(req.params.id, function(err,recipe) {
            if (err) throw err;
            var ingredient = jsonQuery(['ingredients[_id=?]',req.params.ingredientid], {
                data: recipe
            }).value;
            res.send(ingredient);
        });
    });

    //Update an ingredient
    app.post('/api/recipe/:id/ingredient/:ingredientid',function(req, res) {
        Recipes.findById(req.params.id, function(err,recipe) {
            if (err) throw err;
            var ingredient = jsonQuery(['ingredients[_id=?]',req.params.ingredientid], {
                data: recipe
            }).value;
            
            ingredient.name = req.body.name || ingredient.name;
            ingredient.measurement = req.body.measurement || ingredient.measurement;
            ingredient.quantity = req.body.quantity || ingredient.quantity;

            //So now we have an ingredient that needs to be updated
            recipe.save(function(err) {
                if (err) throw err;
                res.send(recipe);
            });
        });
    });

    //Add an ingredient
    app.post('/api/recipe/:id/ingredient',function(req, res) {
        Recipes.findById(req.params.id, function(err,recipe) {
            if (err) throw err;
            var ingredient = {
                'name':req.body.name,
                'measurement':req.body.measurement,
                'quantity':req.body.quantity
            };
            
            recipe.ingredients.push(ingredient);

            //So now we have an ingredient that needs to be updated
            recipe.save(function(err) {
                if (err) throw err;
                res.send(recipe);
            });
        });
    });
    
    //Delete an ingredient
    app.delete('/api/recipe/:id/ingredient/:ingredientid',function(req,res){
        Recipes.findById(req.params.id, function(err,recipe) {
            if (err) throw err;
            var ingredientToDelete = jsonQuery(['ingredients[_id=?]',req.params.ingredientid], {
                data: recipe
            }).value;
    
            var updatedIngredients = [];
            for(var ingredient of recipe.ingredients) {
                if (ingredient.id != ingredientToDelete.id)
                    updatedIngredients.push(ingredient);
            }
            recipe.ingredients = updatedIngredients;
            recipe.save(function(err) {
                if (err) throw err;
                res.send(recipe);
            });
        });
    });
}