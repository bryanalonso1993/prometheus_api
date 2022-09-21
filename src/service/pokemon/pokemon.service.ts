import client from "../../utils/api/axios.connection";
import { Request, Response } from "express";
import { pokemonSchema } from "../../database/mongo/schema/pokemon/pokemonSchema";
import { Result } from "../../interface/pokemon.interface";

class PokemonService {

    private readonly rootEndpoint='https://pokeapi.co/api/v2';

    getAbility(req:Request, res:Response) {
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

    getAllPokemon(req:Request, res:Response) {
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

    insertPokemon(req:Request, res:Response) {
        (
            async () => {
                const body:Result= req.body;
                const register = new pokemonSchema(body);
                await register.save();
                try {
                    return res.status(200).json({ data: 'Se registro correctamente' });
                } catch (error) {
                    return res.status(500).json({ error })
                }
            }
        )();
    }

    insertAllPokemon(req:Request, res:Response) {
        (
            async () => {
                const body:Result[] = req.body;
                try {
                    const response = await pokemonSchema.insertMany(body);
                    console.log(response);
                    return res.status(200).json({ data: 'Se registro correctamente' });
                } catch (error) {
                    return res.status(500).json({ error });
                }
            }
        )();
    }
}

export default PokemonService;
