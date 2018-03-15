

import React,{Component} from 'react';
import { connect }  from 'react-redux';
import { Link } from 'react-router-dom';
import {withRouter} from "react-router-dom";
import * as action from '../../actions';
class HeaderProject extends Component{
    
    changeToProjectPath(projectId){

        var index1;
        var path = `/project/${projectId}`;
        var selectedProject =  this.props.project.filter((item, index) => {
            if(item._id ===  projectId){
                index1 = index;
                return item;
            }
        })[0];
        this.props.selectedProject(selectedProject, index1);
        this.props.history.push(path);
    }
   
    renderContent(){
        return this.props.project.map((item, index) => {
            return(
                <li key={`projectjskey${index}`}>
                    <a href="#" onClick={this.changeToProjectPath.bind(this, item._id)}> 
                        <div className="progress-container progress-primary">
                            <span className="progress-badge">{item.name}</span>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" aria-valuenow={86} aria-valuemin={0} aria-valuemax={100} style={{width: '86%'}}>
                                    <span className="progress-value">86%</span>
                                </div>
                            </div>      
                            <div>
                                 <p className="m-r-15"><small className="text-muted">Team</small></p>
                            </div>                  
                            <ul className="list-unstyled team-info">
                             
                               { 
                                 item.Users.map((user,index) => <li key={`projectjskeyUser${index}`}><img src={user.photo} /></li>)
                               }
                            </ul>
                        </div>
                    </a>
                 </li>
            );
        });
    }
   

    render(){
        return(
            <ul className="dropdown-menu themeIcom pullDown leftIcon">
                <li className="header">Project</li>
                <li className="body" style={{"overflow":"scroll"}}>
                    <div className="slimScrollDiv" style={{"position": "relative", "width": "auto", "height": "300px"}}>
                        <ul style={{"width": "auto", "height": "300px"}} className="menu tasks list-unstyled">
                            
                            {this.renderContent()}
                        </ul>
                    </div>
                </li>
                <li className="footer">
                    <a href="javascript:void(0);">
                        View All
                    </a>
                </li>
            </ul>
        );
    };
}

function mapStateToProps(state){
    return {
        project: state.project
    }
}

export default connect(mapStateToProps, action)(withRouter(HeaderProject));