import receiveHandler from './helpers/receive.handler';

class Logger {
    public static async info(): Promise<void> {
        await receiveHandler('info', (message) => {
            console.log(`[info]: ${message}`);
        });
    }

    public static async debug(): Promise<void> {
        await receiveHandler('debug', (message) => {
            console.log(`[debug]: ${message}`);
        });
    }

    public static async error(): Promise<void> {
        await receiveHandler('error', (message) => {
            console.log(`[error]: ${message}`);
        });
    }
}

export default Logger;
