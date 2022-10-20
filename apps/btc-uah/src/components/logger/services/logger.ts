import sendHandler from '../helpers/send.handler';

class Logger {
    public static info(message: string): void {
        message = `[${new Date().toLocaleString()}] ${message}`;
        sendHandler('info', message);
    }

    public static error(message: string): void {
        message = `[${new Date().toLocaleString()}] ${message}`;
        sendHandler('error', message);
    }

    public static debug(message: string): void {
        message = `[${new Date().toLocaleString()}] ${message}`;
        sendHandler('debug', message);
    }
}

export default Logger;
