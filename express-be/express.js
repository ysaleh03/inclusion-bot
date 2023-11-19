const path = require('path');

const express = require('express')
const expressApp = express();

const public_folder_path = path.join(__dirname, '../public');
expressApp.use(express.static(public_folder_path));

expressApp.use((req, res, next)=>{
    const allowedOrigins = ["http://localhost:4200"];
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

expressApp.get('/*',  function(req, res, next) {
    res.sendFile('index.html', { root: public_folder_path }); 
});

exports.default = expressApp;