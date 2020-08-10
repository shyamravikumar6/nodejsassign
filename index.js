require('dotenv').config();
const express = require("express");
const mongoose  = require("mongoose");
const authroutes = require("./routers/auth");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const cors = require('cors');


const app = express();
const port = 3000;
mongoose.connect(process.env.database,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
     useCreateIndex:true
}).then(()=>{
    console.log('DB CONNECTED ');
});
const options = {
    allowedHeaders: ["Origin", "Authorization", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "*",
    preflightContinue: false
};

app.use(bodyparser.json());
app.use(cookieparser());
app.use(cors(options));
app.use("/api",authroutes);
app.listen(port,()=>{console.log(`mongo db running on port ${port}`);
});

    