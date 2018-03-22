var multer  = require('multer');
const { Comment }  = require('../models/comment');
const _ = require("lodash");
const fs = require("fs");
const gridfs = require('gridfs-stream');
const storage = require('multer-gridfs-storage')({
    url: 'mongodb://prateek211205:sanu211205@ds163053.mlab.com:63053/feedback_dev',
    file: (req, file) => {
        return {
            filename: file.originalname
           
        }; 
    },
  
});
const upload = multer({ storage: storage });
module.exports = (app, connection) => {
    app.post('/api/comment', upload.array('photo', 12), async (req, res, next)  => {
       // console.log(req.body.description);
      var fileList = [];
       _.forEach(req.files, (item) => {
            var { filename, uploadDate, id} = item;
            fileList.push({ filename, uploadDate, _fileId:id});
        })
        var { name, photo, _id, email} = req.user;
        var comment = new Comment({
            description: req.body.description,
            _taskId: req.body.taskId,
           
         });
         comment._owner = {name, photo,email, _userId: _id};
         comment._files = fileList;
         var newComment  = await comment.save();
         /*res.io.on('connection', function(socket){
            socket.emit("message", newComment);
           
         });*/
         res.io.emit("message", newComment);
       
         res.send(newComment);
    });

    app.get('/api/comment/:taskId', async (req, res) => {
         var commentList = await Comment.find({_taskId: req.params.taskId}).sort([['created_at', 'ascending']]); ;
        
         res.send(commentList);
    });

    app.get('/api/comment/readfile/:fileid', (req, res) => {
            var gfs = gridfs(connection.db);
            gfs.exist({ _id: req.params.fileid }, function (err, file) {
                if (err || !file) {
                    res.send('File Not Found');
                } else {
                    var readstream = gfs.createReadStream({ _id: req.params.fileid  });
                    readstream.pipe(res);
                }
            });
    
    });
    
};