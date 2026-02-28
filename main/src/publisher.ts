import { getChannel } from "./rabbitmq.js";
import { logger } from "./logger.js";

export const publishEvent = async (
  queue: string,
  message: object
): Promise<void> => {
  const channel = getChannel();

  if (!channel) {
    logger.error("RabbitMQ channel not initialized");
    throw new Error("Message broker unavailable");
  }

  try {
    await channel.assertQueue(queue, { durable: true });

    const sent = channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );
    logger.error("error")
    
    
    if (!sent) {
      logger.warn(`Backpressure detected while publishing to ${queue}`);
    }

    logger.info(`Event published to ${queue}`, message);
  } catch (error) {
    logger.error("Failed to publish event", error);
    throw error;
  }
};