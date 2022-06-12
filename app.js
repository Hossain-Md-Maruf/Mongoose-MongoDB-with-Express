const express = require('express');
const app = express();
const studentsRouter = require('./routers/studentsRouter');

app.use(express.json());
app.use('/api/students', studentsRouter);

app.get('/hello',(req, res)=>
{
    res.send('Hello from express js!');
    res.end();
});
const port = 3000;

app.listen(port, ()=>
{
    console.log(`Listening on port ${port}....`);
});