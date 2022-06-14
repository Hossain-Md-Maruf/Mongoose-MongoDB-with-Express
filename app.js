const express = require('express');
const morgan = require('morgan');
const app = express();
const studentsRouter = require('./routers/studentsRouter');

app.use(express.json());
app.use((req, res, next)=>
{
    console.log("I am middleware 1");
    next();
});
app.use(express.urlencoded({extended: true}));

app.use(express.static('Public'));
app.use(morgan('tiny'));

app.use((req, res, next)=>
{
    console.log("I am middleware 2!");
    next();
});
app.use('/api/students', studentsRouter);
app.get('/', (req,res,next)=>
{
    //res.send("Another response!!");
    //console.log('hello');
    next();
});

app.get('/',(req, res)=>
{
    res.send('Hello from express js!');
    res.end();
});
const port = 3000;

app.listen(port, ()=>
{
    console.log(`Listening on port ${port}....`);
});