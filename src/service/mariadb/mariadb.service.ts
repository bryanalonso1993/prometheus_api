import { Device, Interface } from "../../database/mariadb/models";
import {  DeleteDevice } from "../../interface/mariadb.interface";
import { Request, Response } from "express";
import apm from "elastic-apm-node";

class MariaDBService {
    /**
     * Insertar dispositivos
     */
    async insertDevices(req:Request, res:Response) {
        const devices = req.body as any;
        try {
            const start = apm.startTransaction('mariadb');
            const register = await Device.bulkCreate(devices, {
                updateOnDuplicate: [ "deviceName", "category", "monitoring", "register", "enable" ],
                ignoreDuplicates: true
            });
            start?.end();
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
        interface DeviceID {
            ipAddress: string;
        }
        const reqBody = req.body as unknown as DeviceID[];
        if ( reqBody.length == 0 ) return res.status(400).json({ Error: 'propiedades vacias' });
        let devices = new Array();
        for ( const { ipAddress } of reqBody ) {
            devices = [ ...devices, ipAddress ]
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
    /**
     * Listar las interfaces por ips
     */
    async getInterface(req:Request, res:Response) {
        interface Devices {
            ipAddress: string;
        }
        const devices = req.body as unknown as Devices[];
        let deviceNames = new Array();
        for ( const { ipAddress } of devices ) {
            deviceNames = [ ...deviceNames, ipAddress ];
        }
        try {
            const register = await Interface.findAll({
                where: { ipAddress: deviceNames }
            });
            return res.status(200).json({ data: register });
        } catch (error) {
            return res.status(500).json({ Error: error });
        }
    }
    /**
     * Listar las interfaces por dispositivo
     */
    async getInterfaceDevice(req:Request, res:Response) {
        interface GetInterfaceDevice {
            ipAddress: string;
            interfaceName: string;
        }
        const { ipAddress, interfaceName } = req.body as unknown as GetInterfaceDevice;
        try {
            const register = await Interface.findAll({
                where: { ipAddress, interfaceName }
            });
            return res.status(200).json({ data: register });
        } catch (error) {
            return res.status(500).json({ Error: error });
        }
    }

    async insertOrUpdateInterface(req:Request, res:Response) {
        const interfaces = req.body;
        let interfacesWithUID= new Array();
        for( const { ipAddress, interfaceName, max, min, medicion, endpoint } of interfaces ) {
            interfacesWithUID = [ ...interfacesWithUID, { ipAddress, interfaceName, max, min, medicion, endpoint, uid: this.concatDeviceInterface(ipAddress, interfaceName)} ];
        }
        try {
            const register = await Interface.bulkCreate(interfacesWithUID, {
                updateOnDuplicate: [ "ipAddress", "interfaceName", "max", "min", "medicion", "endpoint", "uid" ]
            });
            return res.status(200).json({
                message: "Success Register Interfaces", data: register
            });
        } catch (error) {
            return res.status(500).json({ Error: error });
        }
    }

    async deleteInterface(req:Request, res:Response) {
        interface DropInterface{
            ipAddress: string;
            interfaceName: string;
        }
        const interfaces = req.body as unknown as DropInterface[];
        let interfacesWhithUID = new Array();
        for (const { ipAddress, interfaceName } of interfaces ) {
            interfacesWhithUID = [ ...interfacesWhithUID, this.concatDeviceInterface(ipAddress, interfaceName) ];
        }
        try {
            const register = await Interface.destroy({
                where: { uid: interfacesWhithUID }
            })
            return res.status(200).json({ message: 'Success Destroy', data: register });
        } catch (error) {
            return res.status(500).json({ Error: error });
        }
    }
}

export default MariaDBService;
