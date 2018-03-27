
import React,{ Component } from 'react';
import BlockHeader from './blockHeader';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import * as action from '../actions';
import TaskRecord from './task-child/taskRecord';
import ManageTask from './task-child/manageTask';
import { withRouter } from 'react-router-dom';

class MileStoneDetail extends Component{
    state ={ currentTab:'Task', tabs:[{label:'Task',class:'active'},{label:'Assign Task',class:''},{label:'Activity',class:''}]};
    changeToProjectPath(projectId){
        var path = `/project/${projectId}`;
        var index = _.findIndex(this.props.project, {_id: projectId});
        if(index > -1){
            var projects = [].concat(this.props.project);
            this.props.selectedProject(projects[index], index);
            this.props.history.push(path);
        }else{
            alert("dont belong to this project");
            //this.props.history.push('/path');
        }
    }
   
    componentWillMount(){
       if(_.isEmpty(this.props.selectedMileStone)){
            this.props.history.push('/milestone');
       }else{
         var projectId = this.props.selectedMileStone.project[0]._projectId
         this.props.getTaskByMilestone(this.props.match.params.id, projectId);
       }
       
    }

    renderTab(label){
        _.find(this.state.tabs, { 'class': 'active'}).class = '';
        _.find(this.state.tabs, { 'label': label}).class = 'active';
        this.setState({'currentTab' : label});
    }
    renderContent(){
        switch(this.state.currentTab){
            case 'Task':
               return <TaskRecord  type="milestoneView"/>
             case 'Manage Task':
                return <ManageTask />
            default:
                return null;
            
        }
    }

    render(){
        var currentMileStone = _.isEmpty(this.props.selectedMileStone) ? {} : this.props.selectedMileStone;
        console.log(currentMileStone);
        return(
            <section className="content">
                <BlockHeader header={currentMileStone.name} subHeader="Milestone" />
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-4 col-md-12">
                            <div className="card">
                                <div className="body">
                                    <small className="text-muted"> Project: </small>
                                        <p>
                                            {_.isEmpty(currentMileStone) ? '' : (
                                                <a href="#" onClick={this.changeToProjectPath.bind(this, currentMileStone.project[0]._projectId)}> 
                                                    {currentMileStone.project[0].name}
                                                </a>  
                                            )}
                                        </p>
                                    
                                    <hr/>
                                    <small className="text-muted">Start Date: </small>
                                    <p>
                                        <Moment format="YYYY/MM/DD">
                                            {currentMileStone.startDate} 
                                        </Moment>
                                    </p>
                                    <hr/>
                                    <small className="text-muted">Due Date: </small>
                                    <p>
                                        <Moment format="YYYY/MM/DD">
                                             {currentMileStone.endDate} 
                                        </Moment>
                                    </p>
                                    <hr/>
                                    <small className="text-muted">Assigned User: </small>
                                        {
                                            _.isEmpty(currentMileStone) ? null : (
                                                currentMileStone._responsible.map((user) => {
                                                            return (<p style={{"margin":"0"}}><Link to={`/user/${user._userId}`}> { user.name }</Link></p>);
                                                    })
                                                )
                                        }
                                    <hr/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-12">
                             <div className="card">
                             <ul className="nav nav-tabs" style={{"paddingBottom":"0"}}>
                                        { 
                                            
                                             
                                                this.state.tabs.map((item, index) => {
                                                    return(
                                                    <li className="nav-item" key={`taskTabs${index}`}>
                                                        <a href="javascript:void(0);" onClick={this.renderTab.bind(this, item.label)} className={`nav-link ${item.class}`}>{item.label}</a>
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
        selectedMileStone: state.selectedMileStone,
        project: state.project,
        loadingBar:state.loadingBar
    
    }
}
export default connect(mapStateToProps, action)(withRouter(MileStoneDetail));