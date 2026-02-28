import amqp, { type Channel, type Connection } from "amqplib";
import { config } from "./config.js";
import { logger } from "./logger.js";


let channel: Channel;

export const connectRabbitMQ = async () => {

  
  try {
    const connection = await amqp.connect("amqps://bzgarbbu:aHsGGrnp5PDfXVvrQTJVOKB-zWP1dclw@raccoon-01.lmq.cloudamqp.com/bzgarbbu");
    channel = await connection.createChannel();
    logger.info("RabbitMQ connected");
    return channel;
  } catch (error) {
    logger.error("RabbitMQ connection failed", error);
    process.exit(1);
  }
};

export const getChannel = () => {
  if (!channel) throw new Error("RabbitMQ channel not initialized");
  return channel;
};