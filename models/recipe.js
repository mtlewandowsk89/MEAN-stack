var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var recipeSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	difficulty: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	img: {
		type: String,
		required: true
	},
	ingredients: {
		type: String,
		required: true
	},
	directions: {
		type: String,
		required: true
	},
	cookingTime: {
		type: String,
		required: true
	},
	category: {
		type: String,
		required: true
	}
}, {
	timestamps: true
});

var Recipes = mongoose.model('Recipe', recipeSchema);

module.exports = Recipes;