import amqp from 'amqplib';

export async function setupRabbitMQ() {
    const connection = await amqp.connect('amqp://127.0.0.1');
    const channel = await connection.createChannel();
    const queueName = 'comments-queue';
    const exchangeName = 'total-comments';
    const routingKey = 'total.count';

    // Asegura que el intercambio esté declarado antes de la cola
    await channel.assertExchange(exchangeName, 'direct', { durable: true });

    // Declara la cola y vincúlala al intercambio
    await channel.assertQueue(queueName);
    await channel.bindQueue(queueName, exchangeName, routingKey);

    return { connection, channel, queueName };
}