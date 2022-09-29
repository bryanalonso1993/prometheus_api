import { ReqQueryInterface, Interface, DeviceName, ReqBodyTraffic, ResultTraffic } from "../../interface/prometheus.interface";
import client from "../../utils/api/axios.connection";
import sanitzedConfig from "../../config/config";
import logger from "../../utils/logging/logger";
import { Request, Response } from "express";
import axios from "axios";

/**
 * Interfaces
 */
import { Options } from "../../interface/global.interface";

class PrometheusService {
    // Equipos aprovisionados en Prometheus
    private readonly devicesPrometheus = () => `${ sanitzedConfig.PROMETHEUS_SERVER }?query=snmp_scrape_walk_duration_seconds`;
    // Interfaces aprovicionadas en Prometheus
    private readonly interfacesPerDevice = (device:string) => `${ sanitzedConfig.PROMETHEUS_SERVER }?query=ifAdminStatus{instance="${ device }"}`;
    // RX
    private readonly trxDeviceInterfaceIn = (device:string, interfaceName:string) => `${ sanitzedConfig.PROMETHEUS_SERVER }?query=rate(ifHCInOctets{instance='${ device }', ifName='${ interfaceName }'}[10m])*8`;
    // TX
    private readonly trxDeviceInterfaceOut = (device:string, interfaceName:string) => `${ sanitzedConfig.PROMETHEUS_SERVER }?query=rate(ifHCOutOctets{instance='${ device }', ifName='${ interfaceName }'}[10m])*8`;
    /**
     * Metodo para extraer los dispositivos monitoreados con Prometheus
     */
    async getDevices(req:Request, res:Response){
        const options:Options = {
            method: 'get',
            url: this.devicesPrometheus()
        }
        try {
            const response = await client(options);
            const devices = response.data?.result;
            if ( devices.length === 0 ) return res.status(200).json({ data: 'No hay Equipos' });
            let nameDevices:DeviceName[] = new Array();
            for ( const { metric: { instance } } of devices) {
                nameDevices = [ ...nameDevices, { Name: instance }];
            }
            return res.status(200).json({ data: nameDevices });
        } catch (error:unknown) {
            if ( error instanceof Error) {
                return res.status(404).json({ error: error.message  });
            }
        }
    }
    /**
     *  Metodo para extraer las interfaces del dispositivo
     */
    async getInterfaces(req:Request, res:Response){
        const { deviceName } = req.query as unknown as ReqQueryInterface;
        const options:Options = {
            method: 'get',
            url: this.interfacesPerDevice(deviceName)
        }
        try {
            const response = await client(options);
            const interfaces = response.data?.result;
            if ( interfaces.length === 0 ) return res.status(200).json({ data: [{ DisplayName:'', Name:'' }]});
            let nameInterfaces:Interface[] = new Array();
            for ( const { metric: { ifName, instance } } of interfaces) {
                nameInterfaces = [...nameInterfaces, { DisplayName: ifName, Name: instance }];
            }
            return res.status(200).json({ data: nameInterfaces });
        } catch (error:unknown) {
            if ( error instanceof Error ) return res.status(404).json({ error: error.message })
        }
    }
    /**
     * Multiples requests trafico de entrada
     */
    async getTrafficSnmpDevices(req:Request, res:Response){
        const body = req.body as unknown as ReqBodyTraffic[];
        let concatOptions = new Array();
        if ( req.path === '/snmptxin' ){
            for ( const { deviceName, interfaceName } of body ) {
                concatOptions = [...concatOptions, { method: 'get', url: this.trxDeviceInterfaceIn(deviceName, interfaceName) }];
            }
        }else if ( req.path === '/snmptxout') {
            for ( const { deviceName, interfaceName } of body ) {
                concatOptions = [...concatOptions, { method: 'get', url: this.trxDeviceInterfaceOut(deviceName, interfaceName) }];
            }
        }else {
            return res.status(404).json({ error: 'Error Bad route' });
        }
        // Ejecuta el metodo para multiples requests
        try {
            const endpointResponse = await axios.all( concatOptions.map( (opt:Options) => client(opt) ) );
            let results:ResultTraffic[] = new Array();
            for ( const { data } of endpointResponse ) {
                if ( data.result.length === 0 ) {
                    results = [...results, { ifalias:'', ipaddress:'', ifdescr:'', date:'', metric:'' }];
                }else {
                    const { metric: { ifAlias, ifName, instance }, value:[timestamp, metrica] } = data.result[0];
                    results = [...results, { ifalias:ifAlias, ipaddress: instance, ifdescr: ifName, date:timestamp, metric: metrica }];
                }
            }
            return res.status(200).json({ message: results });
        } catch (error:unknown) {
            if ( error instanceof Error ) return res.status(404).json({ error:error.message });
        }
    }
}

export default PrometheusService;
