
import React,{Component} from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import * as action from '../../actions';
import { withRouter } from 'react-router-dom';
class TaskRecord extends Component{
     
   
    constructor(props){
        super(props);
        this.state = {thead: []};
       
     }

     componentDidMount(){
        var label = [];
        if(this.props.type == 'taskView')
            label =  [{label:'Name'},{label:'Priority'},{label:'Start Date'},{label:'End Date'},{label:'status'},{label:'Milestone'},{label:'Project'}];
        else
                label =  [{label:'Name'},{label:'Priority'},{label:'Start Date'},{label:'End Date'},{label:'status'}];   
        this.setState({
                thead:  label
        });
     }
   
    
    
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
     changeToMileStonePath(mileStoneId){
       
        alert("mileStoneId");
        var index = _.findIndex(this.props.milesstoneList, {_id: mileStoneId});
          if(index > -1){
              var milesstoneList  = [].concat(this.props.milesstoneList);
              this.props.currentMilesStone(milesstoneList[index], null);
              this.props.history.push(`/milestone/${mileStoneId}`);
          }else{
              alert("no milesyone found");
          }
      }

    renderContent(){
       return this.props.tasks.map((item, index) => {
           return(
                <tr key={`taskBody${index}`}>
                    <td style={{"display": "table-cell"}} className="footable-first-visible">
                       <strong className="mobile_label">Name:&nbsp;</strong>
                       <a href="#" onClick={this.taskRedirect.bind(this, item._id)} >{item.name}</a>
                     
                    </td>
                    <td style={{"display": "table-cell"}} className="footable-first-visible">
                        <strong className="mobile_label">Priority:&nbsp;</strong>
                        {item.priority}
                    </td>
                    <td style={{"display": "table-cell"}} className="footable-first-visible">
                       <strong className="mobile_label">Start date:&nbsp;</strong>
                        <Moment format="YYYY/MM/DD">
                             {item.startDate}
                        </Moment>
                    </td>
                    <td style={{"display": "table-cell"}} className="footable-first-visible">
                        <strong className="mobile_label">End date:&nbsp;</strong>
                        <Moment format="YYYY/MM/DD">
                             {item.dueDate}
                        </Moment>
                    </td>
                    <td style={{"display": "table-cell"}} className="footable-first-visible">
                         <strong className="mobile_label">Status:&nbsp;</strong>
                          {item.status}
                    </td>
                    {
                        this.props.type == 'taskView' ? 
                        <td style={{"display": "table-cell"}} className="footable-first-visible">
                            <strong className="mobile_label">Milestone:&nbsp;</strong>
                            {
                                _.isEmpty(item.milestone) ? '' : (<a href="#" onClick={this.changeToMileStonePath.bind(this, item.milestone[0]._mileStoneId)}> {item.milestone[0].name} </a>)
                            }
                            
                        </td> : null
                    }
                    {
                     this.props.type == 'taskView' ? 
                        <td style={{"display": "table-cell"}} className="footable-first-visible">
                            <strong className="mobile_label">Project:&nbsp;</strong>
                            <a href="#" onClick={this.changeToProjectPath.bind(this, item.project[0]._projectId)}> {item.project[0].name} </a>
                        </td> : null
                    }
                    
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
    return {milesstoneList: state.milesstoneList ,tasks : state.tasks, loadingBar:state.loadingBar,project: state.project }
}

export default connect(mapStateToProps, action)(withRouter(TaskRecord));