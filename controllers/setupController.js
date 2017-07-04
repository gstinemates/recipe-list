var Recipes = require('../models/recipeModel.js');

module.exports = function(app) {

    app.get('/api/setupRecipes', function(req, res) {

        // seed database
        var starterRecipes = [
            {
                title: 'Hamburgers',
                instructions: 'Grill hamburgers',
                ingredients: [
                    {
                        name: 'Hamburger',
                        measurement: 'pound',
                        quantity: '2'
                    },
                    {
                        name: 'Buns',
                        measurement: 'package',
                        quantity: '1'
                    }
                ]
            },
            {
                title: 'Swedish Pancakes',
                instructions: 'Mix the liquid ingredients then the dry',
                ingredients: [
                    {
                        name: 'Flour',
                        measurement: 'cup',
                        quantity: '1.25'
                    },
                    {
                        name: 'Sugar',
                        measurement: 'cup',
                        quantity: '.25'
                    },
                    {
                        name: 'Milk',
                        measurement: 'cup',
                        quantity: '2'
                    },
                    {
                        name: 'Eggs',
                        measurement: 'n/a',
                        quantity: '2'
                    }
                ]
            }
        ];
        Recipes.create(starterRecipes, function(err, results){
            console.log('created recipes');
            res.send(results);
        });
    
    });
}