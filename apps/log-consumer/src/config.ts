import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

class Config {
    private AMQP_URL: string;
    private AMQP_USER: string;
    private AMQP_PASSWORD: string;
    private AMQP_HOST: string;
    private AMQP_PORT: string;
    private PORT: number;

    constructor() {
        this.AMQP_USER = process.env.AMQP_USER || 'guest';
        this.AMQP_PASSWORD = process.env.AMQP_PASSWORD || 'guest';
        this.AMQP_HOST = process.env.AMQP_HOST || 'rabbitmq';
        this.AMQP_PORT = process.env.AMQP_PORT || '5672';
        this.AMQP_URL = `amqp://${this.AMQP_USER}:${this.AMQP_PASSWORD}@${this.AMQP_HOST}:${this.AMQP_PORT}/`;
        this.PORT = 3001;
    }

    public get<T>(key: string): T {
        return Object.getOwnPropertyDescriptor(this, key)?.value as T;
    }
}

export default new Config();
