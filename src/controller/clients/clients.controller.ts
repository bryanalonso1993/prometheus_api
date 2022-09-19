import { Router, Request, Response } from "express";

class ClientController
{
    /**
     * Router
     */
    protected readonly router = Router();
    constructor(){
        this.get();
        this.post();
        this.delete();
    }
    get(){
        this.router.get('/', (req:Request, res:Response) => {
            res.send('ok');
        })
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

export default ClientController;
