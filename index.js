
const express = require('express')
const cors = require('cors')

const app = express();
app.use(cors());
app.get("/myplaylist" , (req,res)=>{
    res.send("test message");
});

app.listen(5000, ()=> console.log("app is running")); 