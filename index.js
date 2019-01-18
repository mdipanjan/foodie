const express = require('express');
const app = express();

app.get('/', (req, res)=>{
    res.send('ok');
})


const port = process.env.PORT || 9000;

app.listen(port, ()=>{
    console.log(`server started at port ${port}`)
})