
import React,{ Component } from 'react';
import ImageBox from './imageBox';
class CommentBox extends Component{
    state = { fileList: [] };
    handleFile(e){
        var fileList = Array.from(this.state.fileList);
        fileList =  fileList.concat( Array.from(e.target.files));
        this.setState({fileList});
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
                        <input type="text" className="form-control" placeholder="Enter text here..." />
                        <span className="input-group-addon">
                            <i className="zmdi zmdi-mail-send"></i>
                        </span>
                    </div>
                
                    <a href="javascript:void(0);" className="btn btn-raised btn-warning btn-round btn-file">
                        <i className="zmdi zmdi-file-text"></i>
                        <input type="file" multiple="true" onChange={this.handleFile.bind(this)} />
                    </a>
                    <a href="javascript:void(0);" className="btn btn-raised btn-info btn-round"> <i className="zmdi zmdi-mail-send"></i></a>                            
                </div>
            </div>
        );
    }

}

export default CommentBox;