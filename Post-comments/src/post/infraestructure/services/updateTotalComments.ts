import { UpdateTotalCommetsUseCase } from "../../application/use-cases/updateTotalCommentsUseCase";
import { setupRabbitMQ } from "../rabbitConfig";

export async function UpdateTotalComments(useCase: UpdateTotalCommetsUseCase) {

    const { connection, channel, queueName } = await setupRabbitMQ();

    console.log('Consumidor de Órdenes esperando mensajes...');

    // Consume mensajes de la cola
    channel.consume(queueName, (msg) => {
        if (msg) {

            const content: any = JSON.parse(msg.content.toString());
            const currentDateTime = new Date();
            // Lógica para procesar la orden pagada

            console.log('Mensaje recibido [Y]', content)
            const id = content.data.postId;
            const totalComments= content.data.totalComments;
            
            useCase.run(id, totalComments);

            // Marcar el mensaje como entregado (acknowledge)
            channel.ack(msg);
        }
    });
}