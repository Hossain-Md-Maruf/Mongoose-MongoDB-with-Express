const fs = require('fs');


const getDbStudent = ()=>
{
    return new Promise((resolve, reject)=>
    {
        fs.readFile('./db.json', 'utf-8', (err, data)=>
        {
            const students = JSON.parse(data);
            resolve(students);
        });
       
    });
    
}


const insertDbStudent = (students)=>
{
    return new Promise((resolve, reject)=>
    {
        fs.writeFile('./db.json', JSON.stringify(students), (err)=>
            {
               resolve('Successfully Added!!');
            });
    });
}

module.exports.insertDbStudent = insertDbStudent;
module.exports.getDbStudent = getDbStudent;

