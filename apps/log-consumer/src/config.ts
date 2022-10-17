import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

class Config {
    private AMQP_URL: string;
    private AMQP_USER: string | undefined;
    private AMQP_PASSWORD: string | undefined;
    private AMQP_HOST: string | undefined;
    private AMQP_PORT: string | undefined;
    private PORT: number | undefined;

    constructor() {
        this.AMQP_USER = process.env.AMQP_USER;
        this.AMQP_PASSWORD = process.env.AMQP_PASSWORD;
        this.AMQP_HOST = process.env.AMQP_HOST;
        this.AMQP_PORT = process.env.AMQP_PORT;
        this.AMQP_URL = `amqp://${this.AMQP_USER}:${this.AMQP_PASSWORD}@${this.AMQP_HOST}:${this.AMQP_PORT}/`;
        this.PORT = process.env.PORT ? Number(process.env.PORT) : undefined;
    }

    public get<T>(key: string): T {
        return Object.getOwnPropertyDescriptor(this, key)?.value as T;
    }
}

export default new Config();
