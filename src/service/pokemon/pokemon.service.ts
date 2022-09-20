import client from "../../utils/api/axios.connection";
import { Request, Response } from "express";

class PokemonService {

    private readonly rootEndpoint='https://pokeapi.co/api/v2';

    getAbility(req:Request, res:Response){
        const { pokeName } = req.query;
        (async (pokeName) => {
            const options = {
                method: 'get',
                url: this.rootEndpoint+'/pokemon?limit=10'
            };
            try {
                const { data } = await client(options);
                return res.status(200).json({ data });
            } catch (error) {
                return res.status(500).json({ error });
            }
        })(pokeName);
    }

    getAllPokemon(req:Request, res:Response){
        (async () => {
            const options = {
                method:'get',
                url: this.rootEndpoint+'/pokemon?limit=1000'
            }
            try {
                const { data } = await client(options);
                return res.status(200).json({ data })
            } catch (error) {
                return res.status(500).json({ error });
            }
        })();
    }

    insertOrUpdatePokemon(req:Request, res:Response){}
}

export default PokemonService;
