export interface ReqQueryInterface {
    deviceName: string;
}

export interface Interface {
    DisplayName: string;
    Name: string;
}

export interface DeviceName {
    Name: string;
}

export interface ReqBodyTraffic{
    deviceName: string;
    interfaceName: string;
}

export interface ResultTraffic {
    ifalias: string;
    ipaddress: string;
    ifdescr: string;
    date: string | number;
    metric: string;
}