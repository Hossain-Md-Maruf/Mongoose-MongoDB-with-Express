const express = require('express');
const router = express.Router();
const {Student} = require('../models/students');
const studentList = async(req, res)=>
{
    try
    {
        const students = await Student.find()
        .sort({name: -1});
        res.send(students);
    }
    catch(err)
    {
        const errMsgs = [];
        for(field in err.errors)
        {
            errMsgs.push(err.errors[field].message);
        }
        return res.status(400).send(errMsgs);
        
        
    }
   
    
};

const newStudent = async (req, res)=>
{
    const student = new Student(req.body);

    try
    {
        const result = await student.save();
        res.send(result);
    }
    catch(err)
    {
        const errMsgs = [];
        for(field in err.errors)
        {
            errMsgs.push(err.errors[field].message);
        }
        return res.status(400).send(errMsgs);
    }
    
};

const studentDetail = async(req, res)=>
{
   const id = req.params.id;
   try
   {
    const student = await Student.findById(id);
    if(!student) return res.status(400).send("ID is not found!");
    res.send(student);
   }   
   catch(err)
   {
    return res.status(404).send('Id is not found!!');
   }
};

const studentUpdate = async(req, res)=>{
    const id = req.params.id;
    const updatedData = req.body;
    try{
        const student = await Student.findByIdAndUpdate(id, updatedData, {new: true});
        if(!student) return res.status(404).send("Id not found!");
        res.send(student)
    }
    catch(err)
    {
        return res.status(404).send("Id not found!!");
    }
   
};

const studentDelete = async(req,res)=>
{
    const id = req.params.id;

    try
    {
        const student = await Student.findByIdAndDelete(id);
        if(!student) return res.status(404).send("Id not Found!");
        res.send(student);
    }
    catch(err)
    {
        return res.status(404).send("Id not Found!!");
    }
    
    
};




router.route('/').get(studentList).post(newStudent);

router.route('/:id').get(studentDetail).put(studentUpdate).delete(studentDelete);

module.exports = router;

exports.Student = Student;
