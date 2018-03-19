

const { Milesstones }  = require('../models/milesstone');
module.exports = (app) => {
    app.get('/api/milestone/:projectId',isUserLogin, async (req, res) => {
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


    app.post('/api/milestone', isUserLogin, async (req, res) => {
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


    app.patch('/api/milestone', isUserLogin , async (req, res) => {
        console.log('------patch-------');
        var body = req.body;
        try{
            var body = req.body;
            
            var updatedMileStone = await Milesstones.findByIdAndUpdate(body._id, { $set: body}, {new: true});
            console.log(updatedMileStone);
             res.send(updatedMileStone);
        }catch(e){
           return res.status(400).send(e);
        }
    });
};

function  isUserLogin(req, res, next){
    if(!req.user){
       return res.status(400).send();
    }
    next();
}