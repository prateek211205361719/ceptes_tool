
const passport = require('passport');
const { Projects }  = require('../models/projects');
const { Users }  = require('../models/users');
const { userTaskList, pastDueTaskList, milestoneList } =   require('../helper/userinfo');
const _ =  require("lodash");
var users = [];
//var users = {};
module.exports = (app) => {
   
    app.get('/auth/google',
    passport.authenticate('google', { 
        scope: ['profile','https://www.googleapis.com/auth/userinfo.email'],
        
     }));

    app.get('/auth/google/callback', 
        passport.authenticate('google', { failureRedirect: '/login' }),
        function(req, res) {
        res.redirect('/');
    });

    app.get('/api/login', isUserLogin, (req, res) => {
        var socketId = app.get("socketId");
        users.push({userId:req.user._id , socketId: socketId});
       /* if(req.user){
           var index =  _.findIndex(users ,{userId:req.user._id});
           if(index > -1){
               users[index].socketId = socketId;
           }else{
              users.push({userId:req.user._id , socketId: socketId});
           }
           app.set('users', users);
        }*/
        app.set('users', users);
        res.send(req.user);
    });

    app.get('/api/logout', (req, res) => {
        var finalUserList = _.filter(app.get("users"), (eachUser) => {
              return (eachUser.userId != req.user.id);
        })
        app.set("users", finalUserList);
        req.logout();
        res.redirect('/login');
    }); 

    app.get('/api/userInfo',isUserLogin, async (req, res) => {
       
        try{
            var result = await Projects.find({$or:[ {'Users._userId': req.user._id}, {'_owner':req.user._id}]}).sort([['created_at', 'descending']]);
            if(!result){
                return res.status(400).send();
            }
            var userList =  await Users.find();
            if(!result){
                return res.status(400).send();
            }
            res.send({project:result,users: userList, pastDueTask:await pastDueTaskList()});
        }catch(e){
            res.redirect('/login');
            //return res.status(400).send();
        }
    });
}; 

function  isUserLogin(req, res, next){
  
    if(!req.user){
       return res.status(400).send();
    }
    next();
   
}