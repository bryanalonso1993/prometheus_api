export interface Device {
    deviceName: string;
    ipAddress: string;
    category: string;
    monitoring: string;
    register: string;
    enable: number;
}

export interface DeleteDevice {
    ipAddress: string;
}