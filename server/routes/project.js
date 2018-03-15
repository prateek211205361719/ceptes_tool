
const { Projects }  = require('../models/projects');
const { Users }  = require('../models/users');

module.exports = (app) => {
    app.get('/api/projects', async (req, res) => {
        var projectList = await Projects.find();
        if(!projectList)
            return res.status(400).send();
        res.send(projectList);
    });
    
    app.post('/api/projects' ,async (req, res) => {
        var body = req.body;
        try{
            //body._owner = req.user._id;
            body._owner = req.user._id;
            var project =   new Projects(body);
            var newProject = await project.save();
            if(!newProject){
                return res.status(400).send();
            }
            res.send(newProject);
        }catch(e){
            return res.status(400).send(e);
        }
    });

    app.patch('/api/projects',async (req, res) => {
        try{
            var body = req.body;
            constUpdateObj = await Projects.findByIdAndUpdate(body._id, body, {new: true});
            res.send(constUpdateObj);
        }catch(e){
            return res.status(400).send(e);
        }
    });

    //assign project to users
    app.post('/api/projects/:id' ,async (req, res) => {
        var projectid = req.params.id;
        // user body
        var userBody = req.body;
        try{
            var existingProject = await Projects.findByIdAndUpdate(projectid);
            if(!existingProject)
                return res.status(401).send();
            
            existingProject.Users.push({
                name:userBody.name,
                photo:userBody.photo,
                _userId:userBody._id
            });

            var updatedProject = await existingProject.save();
            if(!updatedProject)
                return res.status(401).send();
            res.send(updatedProject);
        }catch(e){
            return res.status(400).send(e);
        }
        // killall node

    });
};