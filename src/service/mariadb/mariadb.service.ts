import { Device, Interface, FolderGrafana, DashboardGrafana } from "../../database/mariadb/models";
import {  DeleteDevice } from "../../interface/mariadb.interface";
import { Request, Response } from "express";

class MariaDBService {
    /**
     * Insertar dispositivos
     */
    async insertDevices(req:Request, res:Response) {
        const devices = req.body as any;
        try {
            const register = await Device.bulkCreate(devices, {
                updateOnDuplicate: ["deviceName", "category", "monitoring", "register", "enable"],
                ignoreDuplicates: true
            });
            return res.status(200).json({ message: "Success Update", date: register });
        } catch (error) {
            return res.status(500).json({ Error: error });
        }
    }
    /**
     * Eliminar los dispositivos
     */
    async deleteDevices(req:Request, res:Response) {
        const devices = req.body as any as DeleteDevice[];
        let deviceNames = new Array();
        devices.map( el => { deviceNames = [ ...deviceNames, el.ipAddress ]});
        try {
            const register = await Device.destroy({ where: { ipAddress: deviceNames } });
            return res.status(200).json({ message: "Success Destroy", data: register});

        } catch (error) {
            return res.status(500).json({ Error: error });
        }
    }
    /**
     * Consultar todos los dispositivos almacenados
     */
    async getDevices(req:Request, res:Response){
        try {
            const register = await Device.findAll();
            return res.status(200).json(register);
        } catch (error) {
            return res.status(500).json({ Error: error });
        }
    }
    /**
      * Generacion del uid
     */
    concatDeviceInterface(ipAddress:string, interfaceName:string){
        return ipAddress.concat('-', interfaceName);
    }
    /**
     * Consulta para un dispositivo
     */
    async getDeviceID(req:Request, res:Response) {
        const reqBody = req.body;
        let devices = new Array();
        for ( const { ipAddress: name } of reqBody ) {
            devices = [ ...devices, name ]
        }
        try {
            const register = await Device.findAll({
                where: {
                    ipAddress: devices
                }
            });
            return res.status(200).json(register);
        } catch (error) {
            return res.status(500).json({ Error: error });
        }
    }

    async getInterface(req:Request, res:Response) {

    }
}

export default MariaDBService;
