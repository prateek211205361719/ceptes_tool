
const { TaskList }  = require('../models/tasklist');
module.exports = (app) => {
   
    app.get('/api/tasklist', async (req, res) => {
        var taskList = TaskList.find();
        if(!taskList){
            return res.status(404).send();
        }
        res.send(taskList);
    });

    

   /* {
    name:
    _milestone:
    }*/

    app.post('/api/tasklist' , async (req, res) => {
        
        var newTaskList = new TaskList(req.body);
        try{
            var result = await newTaskList.save();
            if(!result)
                return res.status(400).send();
            res.send(result);
        }catch(e){
            return res.status(400).send(e);
        }
    });
}