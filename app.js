import express from "express";
import cors from "cors";

const app = express();

app.use(express.json())
app.use(cors())


// load routes
import base_ from "./routes/base_routes.js"
app.use(base_)

// sync database here
import {Post,Comment} from "./models/post.js";
import sequelize from "./config/database.js";



sequelize.sync()
.then(res =>{
    console.log("server synced..");
    // server listining..
    app.listen(3000)
})
.catch(err=>{
    console.log("server no sync");    
})




