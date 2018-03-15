
import React,{Component} from 'react';
import BlockHeader from './blockHeader';
import  {connect} from 'react-redux';
import TaskRecord from './task-child/taskRecord';
import * as action from '../actions';

import _ from 'lodash';
class Task extends Component{
    state = {tabs:[{label:'Past Due',class:'active'},{label:'Pending',class:''},{label:'Completed', class:''},{label:'All', class:''}]};
    
    getTask(val){
        _.find(this.state.tabs, { 'class': 'active'}).class = '';
        _.find(this.state.tabs, { 'label': val}).class = 'active';
        this.props.getTask(val, this.props.currentProject._id);
    }

    componentDidMount(){
        this.props.getTask(_.find(this.state.tabs, { 'class': 'active'}).label, this.props.currentProject._id);
    }

    render(){
        var {auth , currentProject} = this.props;
        var header = '';
        if(!_.isEmpty(auth))
             header =  _.isEmpty(currentProject) ? auth.name : currentProject.name;
       
        return(
            <section className="content">
                  <BlockHeader header={header} subHeader="Tasks" />
                  <div className="container-fluid">
                        <div className="row clearfix">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="card">
                                    <div className="body" style={{"paddingTop":"0"}}>
                                        <ul className="nav nav-tabs">
                                            {
                                                this.state.tabs.map((tab) => {
                                                    return <li className="nav-item">
                                                         <a href="#" onClick={this.getTask.bind(this, tab.label)} className={`nav-link ${tab.class}`}>{tab.label}</a>
                                                        
                                                    </li>
                                                })
                                            }
                                        </ul>
                                        <div className="tab-content">
                                            <div role="tabpanel" className="tab-pane in active" id="home" aria-expanded="true">
                                                <TaskRecord />
                                            </div>
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
    return {auth:state.auth,  currentProject: state.selectedProject};
}  

export default connect(mapStateToProps, action)(Task);