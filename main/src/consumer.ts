import { getChannel } from "./rabbitmq.js";
import { logger } from "./logger.js";

export const consumeEvent = async (
  queue: string,
  handler: (data: any) => Promise<void>
) => {
  const channel = getChannel();
  await channel.assertQueue(queue, { durable: true });

  channel.consume(
    queue,
    async (msg) => {
      if (!msg) return;

      try {
        const data = JSON.parse(msg.content.toString());
        await handler(data);
        channel.ack(msg);
      } catch (error) {
        logger.error("Message processing failed", error);
        channel.nack(msg, false, false);
      }
    },
    { noAck: false }
  );

  logger.info(`Listening to queue: ${queue}`);
};