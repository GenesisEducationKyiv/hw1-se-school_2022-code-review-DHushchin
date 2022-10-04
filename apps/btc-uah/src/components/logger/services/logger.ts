import sendHandler from '../helpers/sendHandler';

class Logger {
    public static info(message: string): void {
        message = 'info: ' + message;
        sendHandler(message, 'info');
    }

    public static error(message: string): void {
        message = 'error: ' + message;
        sendHandler(message, 'error');
    }

    public static debug(message: string): void {
        message = 'debug: ' + message;
        sendHandler(message, 'debug');
    }
}

export default Logger;
