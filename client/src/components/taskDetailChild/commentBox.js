
import React,{ Component } from 'react';
import ImageBox from './imageBox';
import axios from 'axios';
import _ from 'lodash';
import * as action from '../../actions';
import { connect } from 'react-redux';

class CommentBox extends Component{
    state = { fileList: [], comment:'' };
    handleFile(e){
        var fileList = Array.from(this.state.fileList);
        fileList =  fileList.concat( Array.from(e.target.files));
        this.setState({fileList});
    }
    textValue(e){
        console.log(e.target.value);
        this.setState({comment: e.target.value});
    }

    async uploadFile(){
        var fileList = Array.from(this.state.fileList);
        if(fileList.length > 0 || this.state.comment.length > 0){
            this.props.showLodingProgress();
            var formData = new FormData();
            formData.append("taskId", this.props.currentTask._id);
            formData.append("description", this.state.comment);

            _.forEach(fileList, (eachFile) => {
                formData.append("photo", eachFile, eachFile.name);
            });

            var result = await axios.post('/api/comment', formData,{
                onUploadProgress: function (progressEvent) {
                    console.log(progressEvent);
                    var progressClassList = document.getElementsByClassName("progressComment progress-bar progress-bar-success");
                     _.forEach(progressClassList, (obj) => {
                        obj.style.width = (((progressEvent.loaded/progressEvent.total)*100) - 2)+"%";
                    });
                    
                }
                
            });
            if(result){
               
                this.props.createComment(result.data);
                this.setState({fileList:[],comment:''});
                this.props.hideLodingProgress();
                document.getElementById("commentInput").value = '';
                
            }
        }
    }
    removeFile(index){
        var fileList = Array.from(this.state.fileList);
        var fileList = fileList.filter((item, indexVar) => {
            return indexVar !== index;
        });
        this.setState({fileList:fileList});
    }
    render(){
        return(
            <div>
                <ImageBox removeFile={this.removeFile.bind(this)} files= {this.state.fileList} />
                <div className="chat-message clearfix">
                    <div className="input-group p-t-15">
                        <input id="commentInput" onChange={this.textValue.bind(this)} type="text" className="form-control" placeholder="Enter text here..." />
                        <span className="input-group-addon">
                            <i className="zmdi zmdi-mail-send"></i>
                        </span>
                    </div>
                
                    <a href="javascript:void(0);" className="btn btn-raised btn-warning btn-round btn-file">
                        <i className="zmdi zmdi-file-text"></i>
                        <input  type="file" multiple="true" onChange={this.handleFile.bind(this)} />
                    </a>
                    <a href="javascript:void(0);" onClick={this.uploadFile.bind(this)} className="btn btn-raised btn-info btn-round"> 
                         <i className="zmdi zmdi-mail-send"></i
                    ></a>                            
                </div>
            </div>
        );
    }

}

function mapStateToProps(state){
    return{
        currentTask : state.selectedtask
    }
}
export default connect(mapStateToProps, action)(CommentBox);