const express = require('express');
const router = express.Router();
const Joi = require('joi');
const courses = [{
    1:"Course 1",
    2:"Course 2",
    3:"Course 3"
}];
router.get('/',(req,res)=>{
    res.send(courses)
});
router.get('/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('The course with the given ID was not found')
        return;
    }
    else
        res.send(course)
});
router.post('/',(req,res) => {
    // if(!req.body.name){
    //     res.status(400).send('Name is required');
    //     return;
    // }
    const schema = Joi.object({
        name: Joi.string().required()
    });
    const result = schema.validate(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return;
    }
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
})
router.put('/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('The course with the given ID was not found')
        return
    }
    const schema = Joi.object({
        name: Joi.string().required()
    });
    
    const result = schema.validate(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message)
        return;
    }
        /*
            Object destracturing
            const { error } = schema.validate(req.body);
            if(error){
                ...
            }
        */
    course.name = req.body.name;
    res.send(`Updated the name of the course ${req.params.id} to ${course.name}`)
    
});
router.delete('/:id',(req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('The course with the given ID was not found')
        return
    }
        

    // delete
    const index = courses.indexOf(course);
    courses.splice(index,1);

    res.send(`Deleted the course ${req.params.id}`)
})

module.exports = router;