

import React,{Component} from 'react';
import BlockHeader from './blockHeader';
//import UserCard from './projectDashboardChild/userCard';
import {connect} from 'react-redux';
import * as action from '../actions';
import Moment from 'react-moment';
import {Link, withRouter} from 'react-router-dom';
import _ from 'lodash';
class Milesstone extends Component {
    state = {thead: [{label:'Name'},{label:'Responsible'},{label:'Start Date'},{label:'End Date'},{label:'Project'},{label:'Actions'}]};
    openSidebar(){
        var sidebar = document.getElementById("sidebar");
        sidebar.classList.add('open');
        var overlay = document.getElementById("overlay");
        overlay.style.display = "block";
        this.props.refreshForm(false, 'Milesstone', 'new');
       
    }

    openMilesStone(index){
        var currentMilesStone = Object.assign({} ,this.props.milesstoneList[index]);
        if(!_.isEmpty(currentMilesStone.project)){
            var project =  currentMilesStone.project[0];
            if(!_.isEmpty(currentMilesStone._responsible)){
                var {name,photo,user,_userId}  = currentMilesStone._responsible[0];
                currentMilesStone._responsible = {name, photo,_userId};
            }
            currentMilesStone.project = project;
        }
        
        
        this.props.currentMilesStone(currentMilesStone, index);
        var sidebar = document.getElementById("sidebar");
        sidebar.classList.add('open');
        var overlay = document.getElementById("overlay");
        overlay.style.display = "block";
        this.props.refreshForm(false, 'Milesstone', 'edit');
    }

    componentDidMount(){
        var selectedProject = this.props.currentProject;
        this.props.getMilesStone(selectedProject._id);
    }
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
    renderContent(){
       return this.props.milesstoneList.map((item, index) => {
            return(
                <tr key={`milesstone${index}`}>
                    <td style={{"display": "table-cell"}} className="footable-first-visible"> {item.name}</td>
                    <td style={{"display": "table-cell"}}> 
                        <Link to={`/user/${item._responsible[0]._userId}`} >{item._responsible[0].name}</Link>
                    </td>
                    <td style={{"display": "table-cell"}}> 
                        <Moment format="YYYY/MM/DD">
                             {item.startDate}
                        </Moment>
                    </td>
                    <td style={{"display": "table-cell"}}> 
                       <Moment format="YYYY/MM/DD">
                             {item.endDate}
                        </Moment>
                    </td>
                    <td style={{"display": "table-cell"}}> 
                        <a href="#" onClick={this.changeToProjectPath.bind(this, item.project[0]._projectId)}> 
                            {item.project[0].name}
                        </a>
                    </td>
                    <td style={{"display": "table-cell"}}> 
                        <a href="#" onClick={this.openMilesStone.bind(this, index)}> 
                            Edit
                        </a>
                    </td>
                </tr>
            );
        });
        
    }
    render(){
        var selectedProject = this.props.currentProject;
        var { auth, loadingBar } = this.props;
        var header = '';
        if(!_.isEmpty(auth))
             header =  _.isEmpty(selectedProject) ? auth.name : selectedProject.name;
        return(
            <section className="content">
                    <BlockHeader header={header} subHeader="Milesstone" />
                    <div className="container-fluid">
                        <div className="row clearfix">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="card product-report">
                                    <div className="body">
                                        
                                        <div className="row clearfix">
                                            <div className="col-lg-12 col-md-12 col-sm-12">
                                                <div className="card">
                                                    <div className="header">
                                                        <h2><strong>Milesstone</strong></h2>
                                                        <ul className="header-dropdown">
                                                            <li className="dropdown" id="milestoneMenu"> 
                                                               <a href="#" onClick={() => document.getElementById("milestoneMenu").classList.toggle('show')}> <i className="zmdi zmdi-more"></i> </a>
                                                                <ul className="dropdown-menu dropdown-menu-right">
                                                                    <li><a  onClick={this.openSidebar.bind(this)}  href="javascript:void(0);">New</a></li>
                                                                </ul>
                                                            </li>
                                                         
                                                        </ul>
                                                    </div>
                                                    <div className="body table-responsive" style={{"padding":"0"}}>
                                                        <table className="table table-striped m-b-0 footable footable-1 footable-paging footable-paging-center breakpoint-lg">
                                                            <thead>
                                                                <tr className="footable-header">
                                                                    {
                                                                        this.state.thead.map((item, index) => {
                                                                            return (
                                                                                <th key={`milestonethead${index}`} className="footable-sortable footable-first-visible">
                                                                                     {item.label}
                                                                                    <span className="fooicon fooicon-sort"></span>
                                                                                </th>
                                                                            );
                                                                        })
                                                                    }
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                               {loadingBar.default == 0 ? (this.props.milesstoneList.length > 0 ?  this.renderContent() : <tr><td  colSpan={this.state.thead.length} style={{"display": "table-cell","textAlign":"center"}}>No record found.</td></tr>) : null}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                              </div>
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
    
    return {
        project: state.project,
        currentProject: state.selectedProject,
        milesstoneList: state.milesstoneList,
        auth:state.auth,
        loadingBar:state.loadingBar
    };
}
export default connect(mapStateToProps, action)(withRouter(Milesstone));