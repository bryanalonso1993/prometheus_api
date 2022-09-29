import { Request, Response, Router } from "express";
import { PMService } from "../../service";

class PMController {
    private readonly router = Router();
    private readonly pmService = new PMService();
    constructor(){
        this.get();
    }
    get(){
        this.router.get('/', (req:Request, res:Response) => this.pmService.getDevicesInventory(req, res));
    }
}

export default PMController;
