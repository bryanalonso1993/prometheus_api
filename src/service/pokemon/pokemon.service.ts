import client from "../../utils/api/axios.connection";
import { Request, Response } from "express";

class PokemonService {
    private readonly rootEndpoint='https://pokeapi.co/api/v2/ability/';
    getAbility(req:Request, res:Response) {
        const { pokeName } = req.query;
        const options = {
            method: 'get',
            url: this.rootEndpoint+pokeName
        };
        client(options)
            .then( data => res.send({ data: data.data }) )
            .catch( e => res.send({ error: e }) );
    }
    insertOrUpdatePokemon(req:Request, res:Response){}
}

export default PokemonService;
