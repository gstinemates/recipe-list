var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    title: String,
    instructions: String,
    ingredients: [{
        name: String,
        measurement: String,
        quantity: String
    }]
});

var Recipes = mongoose.model('Recipes', RecipeSchema);

module.exports = Recipes;
