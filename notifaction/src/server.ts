import { consumeEvent } from "../../main/src/consumer.js";
import { logger } from "../../main/src/logger.js";
import { connectRabbitMQ } from "../../main/src/rabbitmq.js";
//consumer or revent receiver

const startConsumer = async ()=>{
   
    await consumeEvent("user_events",async(data)=>{
           console.log(data);
           
      if(data.type == "user_registered_send_email"){
        logger.info({level:"1",message:`Sending Email on - ${data.email}`})
      }
           
    })
}

  (async()=>{
    await connectRabbitMQ()
    startConsumer()
  })()