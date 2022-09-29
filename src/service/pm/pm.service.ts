import { Request, Response } from "express";
import sanitzedConfig from "../../config/config";
import client from "../../utils/api/axios.connection";
/**
 * Interfaces
 */
import { Options } from "../../interface/global.interface";

class PMService {
    async getDevicesInventory(req:Request, res:Response){
        const devicesPM = `${ sanitzedConfig.PM_SERVER }/odata/api/devices?$top=20000&$skip=0&$format=json`;
        const encodedBase64 = Buffer.from(`${ sanitzedConfig.USERNAME_API }:${ sanitzedConfig.PASSWORD_API }`).toString('base64');
        const authorization = `Basic ${ encodedBase64 }`;
        const options:Options = {
            method: 'get',
            url: devicesPM,
            withCredentials: true,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": authorization
            },
            timeout: 120000
        };
        try {
            const response = await client(options);
            const data = response.data?.d?.results;
            let results = new Array();
            for ( const { Name, PrimaryIPAddress } of data ) {
                results = [ ...results, { Name, PrimaryIPAddress } ];
            }
            return res.status(200).json({ data: results });
        } catch (error:unknown) {
            if ( error instanceof Error) {
                return res.status(404).json({ error: error.message  });
            }
        }
    }
}

export default PMService;
