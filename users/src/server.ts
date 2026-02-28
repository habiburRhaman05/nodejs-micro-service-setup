import express, { type Express } from "express";
import { logger } from "../../main/src/logger.js";
import { publishEvent } from "../../main/src/publisher.js";
import { connectRabbitMQ } from "../../main/src/rabbitmq.js";

const app: Express = express();
      

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.post("/register",async(req,res)=>{
    const {name,email} = req.body;
// register logic
    const payload = {type:"user_registered_send_email",message:"message form users",name,email}
    await publishEvent("user_events",payload)
   logger.log({level:"1",message:`New Event send from user - notification [${payload.type}]`})
    res.json({
        name,email,message:"email send successfully - check inbox"
    })
})

app.listen(5000,async ()=>{
    await connectRabbitMQ();
    console.log(`server running on - 5000`);
})