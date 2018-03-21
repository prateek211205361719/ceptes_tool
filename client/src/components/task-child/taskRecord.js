
import React,{Component} from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import * as action from '../../actions';
import { withRouter } from 'react-router-dom';
class TaskRecord extends Component{
   
    state= {thead:[{label:'Name'},{label:'Priority'},{label:'Start Date'},{label:'End Date'},{label:'status'},{label:'Project'}]};
    taskRedirect(taskId){
        var index = _.findIndex(this.props.tasks, {_id: taskId});
        if(index > -1){
            let task = [].concat(this.props.tasks);
            this.props.selectedTask(task[index]);
            this.props.history.push(`/task/${taskId}`);
        }else{
            alert("not found");
        }

    }
    
    changeToProjectPath(projectId){
       var index = _.findIndex(this.props.project, {_id: projectId});
        if(index > -1){
            var selectedProject  = [].concat(this.props.project);
            this.props.selectedProject(selectedProject[index], index);
            this.props.history.push(`/project/${projectId}`);
        }
    }
    renderContent(){
       return this.props.tasks.map((item, index) => {
           return(
                <tr key={`taskBody${index}`}>
                    <td style={{"display": "table-cell"}} className="footable-first-visible">
                       <a href="#" onClick={this.taskRedirect.bind(this, item._id)} >{item.name}</a>
                     
                    </td>
                    <td style={{"display": "table-cell"}} className="footable-first-visible">
                        {item.priority}
                    </td>
                    <td style={{"display": "table-cell"}} className="footable-first-visible">
                        <Moment format="YYYY/MM/DD">
                             {item.startDate}
                        </Moment>
                    </td>
                    <td style={{"display": "table-cell"}} className="footable-first-visible">
                        <Moment format="YYYY/MM/DD">
                             {item.dueDate}
                        </Moment>
                    </td>
                    <td style={{"display": "table-cell"}} className="footable-first-visible">
                          {item.status}
                    </td>
                    <td style={{"display": "table-cell"}} className="footable-first-visible">
                         <a href="#" onClick={this.changeToProjectPath.bind(this, item.project[0]._projectId)}> {item.project[0].name} </a>
                    </td>
                    
                 </tr>
             );
        });
    }

    render(){
       
        return (
            <div className="body table-responsive" style={{"padding":"0"}}>
                <table  className="table table-striped m-b-0 footable footable-1 footable-paging footable-paging-center breakpoint-lg">
                    <thead>
                        <tr className="footable-header">
                            {
                                this.state.thead.map((item, index) => {
                                    return(
                                        <th key={`taskHead${index}`} className="footable-sortable footable-first-visible">
                                            {item.label}
                                            <span className="fooicon fooicon-sort"></span>
                                        </th>
                                    );
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.loadingBar.default == 0 ? (this.props.tasks.length > 0 ?  this.renderContent() : <tr><td  colSpan={this.state.thead.length} style={{"display": "table-cell","textAlign":"center"}}>No record found.</td></tr>) : null}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {tasks : state.tasks, loadingBar:state.loadingBar,project: state.project }
}

export default connect(mapStateToProps, action)(withRouter(TaskRecord));