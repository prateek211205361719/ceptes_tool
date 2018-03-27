
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import TaskDiv from './taskDiv';
import * as action from '../../actions';
import { withRouter } from 'react-router-dom';
import _ from 'lodash'
class ManageTask extends Component{
    state = {assignedTask: [],unAssigned:[]}
   
    componentDidMount(){
        
        this.setState({
            assignedTask:[].concat(this.props.tasks),
            unAssigned:[].concat(this.props.unAssignTask),
        });
    }

    activeAssignedTask(index){
        let taskList = this.state.assignedTask;
        taskList[index].active = !taskList[index].active 
        this.setState({assignedTask: taskList});

    }

    activeUnAssignedTask(index){
        let taskList = this.state.unAssigned;
        taskList[index].active = !taskList[index].active 
        this.setState({unAssigned: taskList});
    }
    unAssigned(){
       
       var result =  _.remove(this.state.assignedTask, {active :true});
       _.forEach(result , (item) => {
             item.active = false;
           
       });
       

       this.setState({unAssigned: result.concat(this.state.unAssigned)});
       
    }

    assign(){
        var result =  _.remove(this.state.unAssigned, {active :true});
        _.forEach(result , (item) => {
            item.active = false;
        })
        console.log(result);
        this.setState({assignedTask: result.concat(this.state.assignedTask)});
     }

     saveChange(){
        var assignedTask = _.filter(this.state.assignedTask, (item) => {
            return _.isEmpty(item._mileStoneId);
        })
        var unAssigned = _.filter(this.state.unAssigned, (item) => {
            return !_.isEmpty(item._mileStoneId);
        })
        var obj = {assignedTask, unAssigned};
        
        this.props.updateAssignOrUnAssignTask(obj, this.props.match.params.id);
     }
    
    render(){
       
        return(
            <div>
               <div className="row" style={{"textAlign":"right"}}>
                    <div className="col-lg-12 col-md-12">
                        <button onClick={this.saveChange.bind(this)} className="btn btn-primary btn-sm">
                                Save
                        </button>
                    </div>
               </div>
               <div className="row clearfix">
                    <div className="col-lg-5 col-md-12">
                        <div className="card">
                            <div className="header">
                                <h2><strong>Unassigned Task</strong></h2>
                            </div>
                            <div className="body">
                                <div className="list-group">
                                {
                                    this.state.unAssigned.length == 0 ? <div className="list-group-item">No record found</div> :
                                        (
                                            this.state.unAssigned.map((item, index) => {
                                                return(
                                                    <TaskDiv activeTask={this.activeUnAssignedTask.bind(this)} data={ item } index={index} />
                                                );
                                            })
                                        )
                                    }
                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-12" style={{"textAlign":"center","marginTop":"10%"}}>
                        
                      <div>
                            <button onClick={this.unAssigned.bind(this)} className="btn btn-primary btn-sm">
                                <i className="zmdi zmdi-long-arrow-left"></i>
                            </button>
                        </div>
                        <div>
                            <button onClick={this.assign.bind(this)} className="btn btn-primary btn-sm">
                                <i className="zmdi zmdi-long-arrow-right"></i>
                            </button>
                        </div>
                        
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <div className="card">
                        <div className="header">
                                <h2><strong>Assigned Task</strong></h2>
                            </div>
                            <div className="body">
                                <div className="list-group">
                                    {
                                        this.state.assignedTask.length == 0 ? <div className="list-group-item">No record found</div> :
                                       (
                                           this.state.assignedTask.map((item, index) => {
                                            return(
                                                <TaskDiv activeTask={this.activeAssignedTask.bind(this)} data={ item } index={index} />
                                            );
                                        })
                                      )
                                       
                                    }
                                </div>
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
         tasks : state.tasks,
         unAssignTask: state.unAssignTask
    }
}

export default connect(mapStateToProps, action)(withRouter(ManageTask));