import mongoose from "mongoose";

const PokemonSchema = new mongoose.Schema({
    name: 'string',
    url: 'string'
});

export const pokemonSchema = mongoose.model('pokemon', PokemonSchema);
