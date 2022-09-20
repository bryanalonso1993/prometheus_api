import { Router, Request , Response} from "express";
import { PokemonService } from "../../service";


class PokemonController{
    private readonly router = Router();
    private readonly pokemonService = new PokemonService();
    constructor(){
        this.get();
        this.post();
        this.delete();
    }
    get(){
        this.router.get('/', (req:Request, res:Response) => this.pokemonService.getAbility(req, res));
        this.router.get('/all', (req:Request, res:Response) => this.pokemonService.getAllPokemon(req, res));
    }
    post(){
        this.router.post('/', (req:Request, res:Response) => {
            res.send({ data:'ok' });
        })
    }
    delete(){
        this.router.delete('/', (req:Request, res:Response) => {
            res.send({ data: 'eliminado '});
        })
    }
    getRouter(){
        return this.router;
    }
}

export default PokemonController;