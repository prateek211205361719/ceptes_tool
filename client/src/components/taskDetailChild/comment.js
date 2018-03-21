
import React, { Component } from 'react';
import CommentBox from './commentBox';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import * as action from '../../actions';
class Comment extends Component{
   
    componentDidMount(){
        this.props.getComment(this.props.currentTask._id);
    }
    render(){

        console.log(this.props.comment);
        return(
              <div className="container-fluid">
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
                                                        <div className="cbp_tmicon">
                                                             <a href="javascript:void(0)" className="imagePopover"><img className="imagePopover" width="50" src={item._owner[0].photo} style={{"borderRadius": "50%"}} /></a>
                                                        </div>
                                                        <div className="cbp_tmlabel"> 
                                                            <p>{item.description}</p>
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