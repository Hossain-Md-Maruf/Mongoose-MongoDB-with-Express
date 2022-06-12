const express = require('express');
const db = require('../db');
const router = express.Router();



const studentList = (req, res)=>
{
    db.getDbStudent()
    .then(students=>{
        res.send(students);
    });
    
};

const newStudent = (req, res)=>
{
    const student = req.body;
    db.getDbStudent()
    .then(students=>
        {
            students.push(student);
            db.insertDbStudent(students)
            .then(data=>
                {
                    res.send(student);
                    console.log(data);
                });
            
        });
  
};

const studentDetail = (req, res)=>
{
    const id = parseInt(req.params.id);
    db.getDbStudent()
    .then(students=>
        {
            const student = students.find(s=> s.id ===id);
            if(!student) res.status(404).send("No student found with this id");
            else res.send(student);
        });
};

const studentUpdate = (req, res)=>{
    const id = parseInt(req.params.id);
    const updatedData = req.body;
    db.getDbStudent()
    .then(students=>
        {
            const student = students.find(s=> s.id === id);
            if(!student) res.status(404).send('No student found with this id');
            else
            {
                const i = students.findIndex(s=> s.id === id);
                students[i] = updatedData;

                db.insertDbStudent(students)
                .then(data => 
                {
                        res.send(updatedData);
                        console.log(data);
                
                });
            }
        });
};

const studentDelete = (req,res)=>
{
    const id = parseInt(req.params.id);
    db.getDbStudent()
        .then(students=>
            {
                const student = students.find(s=> s.id === id);
                if(!student) res.status(404).send('No student found with this id!!!');
                else
                {
                    const updatedStudents = students.filter(s=> s.id !== id);
                    db.insertDbStudent(updatedStudents)
                    .then(msg=>
                        {
                            res.send(student);
                            console.log('Student deleted successfully');
                        });
                }
            })
    
};




router.route('/api/students').get(studentList).post(newStudent);

router.route('/api/students/:id').get(studentDetail).put(studentUpdate).delete(studentDelete);

module.exports = router;
