
import React,{ Component } from 'react';
import BlockHeader from './blockHeader';
import { connect } from 'react-redux';
import * as action from '../actions';
import _ from 'lodash';
import WorkLog from './taskDetailChild/worklog';
import SubTask from './taskDetailChild/subTask';
import Comment from './taskDetailChild/comment';
import Activity from './taskDetailChild/activity';
import Moment from 'react-moment';


class TaskDetail extends Component{
    state ={ currentTab:'Work Log', tabs:[{label:'Work Log',class:'active'},{label:'Sub Task',class:''},{label:'Comment',class:''},{label:'Activity',class:''}]};
    changeToProjectPath(projectId){
        var path = `/project/${projectId}`;
        var index = _.findIndex(this.props.project, {_id: projectId});
        if(index > -1){
            var projects = [].concat(this.props.project);
            this.props.selectedProject(projects[index], index);
            this.props.history.push(path);
        }else{
            alert("dont belong to this project");
        }
    }

    renderTab(label){
        _.find(this.state.tabs, { 'class': 'active'}).class = '';
        _.find(this.state.tabs, { 'label': label}).class = 'active';
        this.setState({'currentTab' : label});
    }

    renderContent(){
        switch(this.state.currentTab){
            case 'Work Log':
               return <WorkLog />
            case 'Sub Task':
              return <SubTask />
            case 'Comment':
                return <Comment />
            default:
                return <Activity />
        }
    }

    render(){
        var { currentTask } = this.props;
        console.log(currentTask);
        return(
            <section className="content">
                 <BlockHeader header={_.isEmpty(currentTask) ? '' : currentTask.name} subHeader="Task" />
                  <div className="container-fluid">
                        <div className="row clearfix">
                            <div className="col-lg-4 col-md-12">
                                <div className="card">
                                    <div className="tab-content">
                                        <div className="tab-pane body active">
                                            <small class="text-muted">Project: </small>
                                            <p>
                                                <a href="#" onClick={this.changeToProjectPath.bind(this, currentTask.project[0]._projectId)}> 
                                                    {currentTask.project[0].name}
                                                </a>  
                                            </p>  
                                             <hr/>
                                             <small class="text-muted">Description: </small>
                                             <p>{currentTask.description}</p>
                                             <hr/>
                                             <small class="text-muted">Priority: </small>
                                                <p>{currentTask.priority}</p>
                                             <hr/>
                                             <small class="text-muted">Status: </small>
                                                <p>{currentTask.status}</p>
                                             <hr/>
                                             <small class="text-muted">Start Date: </small>
                                                <p>
                                                    <Moment format="YYYY/MM/DD">
                                                        {currentTask.startDate} 
                                                    </Moment>
                                                </p>
                                             <hr/>
                                            <small class="text-muted">Due Date: </small>
                                            <p>
                                                <Moment format="YYYY/MM/DD">
                                                {currentTask.dueDate} 
                                                </Moment>
                                            </p>
                                             <hr/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8 col-md-12">
                                <div className="card">
                                    <ul className="nav nav-tabs">
                                        {
                                            this.state.tabs.map((item) => {
                                                return(
                                                  <li className="nav-item">
                                                    <a href="javascript:void(0);" className={`nav-link ${item.class}`} onClick={this.renderTab.bind(this, item.label)}>{item.label}</a>
                                                  </li>    
                                                );                                          
                                            })
                                        }
                                       
                                     </ul>
                                    <div className="tab-content">
                                        <div className="tab-pane body active">
                                            {this.renderContent()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                  </div>
            </section>
           
        );
    }
}

function mapStateToProps(state){
    return{
        currentTask: state.selectedtask,
        project: state.project
    };
}

export default connect(mapStateToProps, action)(TaskDetail);