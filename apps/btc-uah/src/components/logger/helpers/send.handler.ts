import amqp from 'amqplib';
import config from '../../../config';

const sendHandler = async (queue: string, message: string) => {
    const connection = await amqp.connect(config.get<string>('AMQP_URL'));
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
    await channel.close();
    await connection.close();
};

export default sendHandler;
