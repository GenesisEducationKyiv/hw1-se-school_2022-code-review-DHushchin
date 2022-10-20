import amqp from 'amqplib';
import config from '../../config';

const receiveHandler = async (queue: string, callback: (message: string) => void) => {
    const connection = await amqp.connect(config.get<string>('AMQP_URL'));
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.consume(queue, (message) => {
        if (message) {
            callback(message.content.toString());
            channel.ack(message);
        }
    });
};

export default receiveHandler;
