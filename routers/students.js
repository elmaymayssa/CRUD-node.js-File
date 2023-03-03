const fs = require('fs');
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const {student_schema,student_update_schema} = require('../modules/student')


// les opérations CRUD 

//afficher 
router.get('', (req, res) => {
    const data = JSON.parse( fs.readFileSync('students.json'))
    res.json(data)
})

//ajouter 
router.post('',  async(req, res) =>{ 
    let validation_res = student_schema.validate(req.body);
    if(validation_res.error)
{        return res.status(400).send(validation_res.error.message);}
else
{  
    const students = JSON.parse(fs.readFileSync('students.json')) 
    const newData =req.body
    let Arraymodule = newData.modules
    Arraymodule.forEach(element => { sum+=element.note })
     const moyennee =sum/student.modules.length;
 
     const newStudent={
         nom: newData.nom,
         classe: newData.classe,
         modules: newData.modules,
         moyenne : moyennee,
  };
  students.push(newStudent);
    const stringData =JSON.stringify(data);
    fs.writeFileSync('students.json',stringData)
    res.json(data)
}
})
//modifier

router.put('/:name', (req, res) => {

    let validation_res = student_update_schema.validate(req.body)
    if(validation_res.error)
        return res.status(400).send(validation_res.error.message)
    
        const data = JSON.parse( fs.readFileSync('students.json'))
        const nom =req.params.nom
        const newData =req.body

        let Arraymodule = body.modules
        let sum=0
        Arraymodule.forEach(element => { sum+=element.note }) 
        const moyennee =sum/student.modules.length;
    
const updateData =data.map((item)=>{
        if (item.nom ==nom){
            const newItem ={
                nom:nom,
                classe: newData.classe,
                modules: newData.modules,
                moyenne: moyennee,

            }
            return newItem
        }
        return item
    })

    const stringData =JSON.stringify(updateData)
    fs.writeFileSync('students.json',stringData)
    res.json(updateData)
})
//supprimer
router.delete('/:name', (req, res) => {
    const data = JSON.parse( fs.readFileSync('students.json'))
    const name =req.body.nom

    if(data[name]==undefined){
        res.send({success: false, msg: `student  ${name} not exist`})
      }
      else{
        JSON.delete (data[name])
        saveStudentData(students)
        res.send({success: true, msg: `student ${name} deleted successfully`});
      }
    
})

//3* afficher chaque étudiant avec leur meilleure et leur moindre module

router.get(('afficher_Meil_Moin',(req,res)=>{
    var meil=0;
    var moin =20;
    var array=[]
    const students= JSON.parse(fs.readFileSync('students.json'))
    
    for (let i in students) {
       var aux={}
       student=students[i]
       aux.nom=student.nom

       student.modules.forEach((module)=>{
        if (module.note>meil){
          meil=module.note
          aux.meilleure=module
        }
        if(module.note<moin){
          moin=module.note
          aux.moindre=module
        }})
        array.push(aux)
    }
 res(array)
}
))

//4*  afficher la moyenne de tous les étudiants
router.get('affMoyNom',(req,res)=>{
    const students =JSON.parse(fs.readFileSync('students.json'))
    var ArrRes=[]
    var NomMoy={}
    for(i in students){
        student=students[i]
        NomMoy.nom=student["nom"]
        NomMoy.moyenne=student["moyenne"]
       res(ArrRes.push(NomMoy))
    }
})

module.exports=router


