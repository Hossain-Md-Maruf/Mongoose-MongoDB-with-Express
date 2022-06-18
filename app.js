const express = require('express');
const morgan = require('morgan');
const app = express();
const studentsRouter = require('./routers/studentsRouter');
const mongoose = require('mongoose');
//const {Student} = require('./models/students');

mongoose.connect('mongodb://localhost:27017/my-student-2',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=> console.log('Created MongoDB connection susscessfully!'))
.catch(err=> console.error('MongoDB connection failed!!'));

app.use(express.json());
app.use('/api/students', studentsRouter);
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