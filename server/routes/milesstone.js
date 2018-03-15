

const { Milesstones }  = require('../models/milesstone');
module.exports = (app) => {
    app.get('/api/milestone/:projectId', async (req, res) => {
        try{
            var projectId = req.params.projectId;
            var milestoneList=[];
            if(projectId !== 'undefined'){
                 milestoneList = await Milesstones.find({
                    $and: [
                        {$or:[{'_responsible._userId' : req.user._id },{'_owner._userId' : req.user._id }]},
                        {'project._projectId':projectId}
                    ]
                  
                }).sort([['created_at', 'descending']]);
            }else{
                 milestoneList = await Milesstones.find({$or:[{'_responsible._userId' : req.user._id },{'_owner._userId' : req.user._id }]}).sort([['created_at', 'descending']]); 
             }

            if(!milestoneList)
                 return res.status(400).send();
            res.send(milestoneList);
        }catch(e){
            res.status(400).send()
        }
    });


    /*{
	
        "name":"node milestone",
        "_responsible":{
            "name":"prateek",
            "photo":"samnu",
            "_userId":"5a8c8c2967c6ef100446e44e"
        }
    }*/


    app.post('/api/milestone', async (req, res) => {
        var { name, photo, _id, email} = req.user;
        var body = req.body;
        const milestone = new Milesstones(body);
        milestone._owner = {name, photo,email, _userId: _id}; 
        try{
            var newMilestone = await milestone.save();
            if(!newMilestone){
                return res.status(400).send();
            }
            res.send(newMilestone);
        }catch(e){
            res.status(400).send(e)
        }
        
    });


    app.patch('/api/milestone',async (req, res) => {
        var body = req.BODY;
        try{
            var body = req.body;
            var updatedMileStone = await Milesstones.findByIdAndUpdate(body._id, body, {new: true});
            res.send(updatedMileStone);
        }catch(e){
            return res.status(400).send(e);
        }
    });
};