import express from "express";
import {getdata, postadd_data,postcomment} from "../controller/baseC.js";


const route = express.Router();


// define routes

route.get('/getdata',getdata)
route.post('/add_data',postadd_data)
route.post('/add_comment/:postId',postcomment)


export default route 



