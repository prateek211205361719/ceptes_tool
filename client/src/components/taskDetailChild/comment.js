
import React, { Component } from 'react';
import CommentBox from './commentBox';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import * as action from '../../actions';
import FilePreview from '../userdashboardChild/filePreview';
class Comment extends Component{
   
    state = {showPreview: false,fileId:''};

    showPreview(fileId){
       
        this.setState({showPreview: true, fileId:fileId});
    }
    closeModal(){
        this.setState({showPreview: false, fileId:''});
    }
    componentDidMount(){
        this.props.getComment(this.props.currentTask._id);
    }
    render(){

        console.log(this.props.comment);
        return(
          
              <div  className="container-fluid">
                <FilePreview closeModal={this.closeModal.bind(this)} showModal={this.state.showPreview} fileId={this.state.fileId} />
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="body">
                                <ul className="cbp_tmtimeline"> 
                                    {
                                        this.props.comment.map((item, index) => {
                                            return(
                                                    <li key={`commentItem${index}`}>
                                                        <time className="cbp_tmtime">
                                                            <span className="hidden">
                                                                <Moment format="YYYY/MM/DD">
                                                                    {item.created_at}
                                                                </Moment>
                                                           
                                                             </span> 
                                                            <span className="large">Now</span>
                                                        </time>
                                                        <div className="cbp_tmicon" style={{"background":"none","fontSize":0}}>
                                                             <a href="javascript:void(0)"><img  width="50" src={item._owner[0].photo} style={{"borderRadius": "50%"}} /></a>
                                                        </div>
                                                        <div className="cbp_tmlabel"> 
                                                            <p>{item.description}</p>
                                                            <div className="row">
                                                                {
                                                                    item._files.map((rec) => {
                                                                        return <div style={{"wordWrap":"break-word"}} className="col-sm-6 col-lg-4 m-t-10"><a href="javascript:void(0)" onClick={this.showPreview.bind(this, rec._fileId)}>{rec.filename}</a></div>
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    </li>
                                            );
                                        })  
                                    }
                                    
                                </ul>
                            </div>
                            <div className="footer">
                                    <CommentBox />
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        );
    }

}

function mapStateToProps(state){
    return{
        comment: state.comment,
        currentTask : state.selectedtask

    }
    
}

export default connect(mapStateToProps, action)(Comment);