import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";

const { combine, timestamp, label, printf } = format;

const timezoned = new Date().toLocaleString('en-US', { timeZone: 'America/Lima' });

const logFormat = printf( ({ level, message, label, timestamp }) => `${ timestamp }|${ label }|${ level }|${ message }` );

const consoleTransports = [
    new transports.Console(),
    new transports.DailyRotateFile({
        filename: './logs/PrometheusDeveloper-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
    })
];

const logger = ( source:string, level:string, message:string ) => createLogger({
    format: combine( label({ label: source }), timestamp({ format: timezoned }), logFormat),
    transports: consoleTransports
}).log({ level, message });

export default logger;
