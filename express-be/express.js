const path = require('path');

const express = require('express')
const expressApp = express();

// constroller
const {classify, isHate} = require('../src/controller/cohere/index');

const public_folder_path = path.join(__dirname, '../frontend/stable-product');
expressApp.use(express.static(public_folder_path));

expressApp.use(express.json());

expressApp.use((req, res, next)=>{
    const allowedOrigins = ["http://localhost:5173"];
    const origin = req.headers.origin;

    console.log(origin + " requested http server");
    if (typeof origin === "string" && allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", origin);
    }

    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

expressApp.get("/test", (req,res)=>{
    return res.send("test successed");
});

expressApp.post("/classify", async (req,res)=>{
    console.log(req.body);
    const textArray = req.body;
    try {
        const responses = await isHate(textArray);
        console.log(responses);
        return res.send(responses);
    } catch (error) {
        console.log(`classify error: ${error}`);
        return res.status(500);
    }
});

expressApp.get('/*',  function(req, res, next) {
    res.sendFile('index.html', { root: public_folder_path }); 
});

exports.default = expressApp;