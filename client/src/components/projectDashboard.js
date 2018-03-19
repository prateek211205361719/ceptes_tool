

import React,{ Component } from 'react';
import BlockHeader from './blockHeader';
import UserCard from './projectDashboardChild/userCard';
import {connect} from 'react-redux';
import * as action from '../actions';
import CircularProgressbar from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


class ProjectDashboard extends Component{
   
    componentDidMount(){
       
       
    }
    editProject(){
        var sidebar = document.getElementById("sidebar");
        sidebar.classList.add('open');
        var overlay = document.getElementById("overlay");
        overlay.style.display = "block";
      
        this.props.refreshForm(false, 'Project', 'Edit');
    }

    render(){
      
       var selectedProject =  this.props.currentProject;
       return(
            <section className="content">
                    <BlockHeader header={selectedProject.name} subHeader="Dashboard" />
                    <div className="container-fluid">
                        <div className="row clearfix">
                            <div className="col-lg-8 col-md-12 col-sm-12">
                                <div className="card product-report">
                                    <div className="header">
                                    </div>
                                    <div className="body">
                                        <div className="row clearfix">
                                             <div className="col-lg-3 col-md-6 col-sm-6">
                                                 <CircularProgressbar percentage={60} />
                                             </div>
                                             <div className="col-lg-3 col-md-6 col-sm-6">
                                                 <CircularProgressbar percentage={90} />
                                             </div>
                                             <div className="col-lg-3 col-md-6 col-sm-6">
                                                 <CircularProgressbar percentage={30} className="progressbar-red" />
                                             </div>
                                             <div className="col-lg-3 col-md-6 col-sm-6">
                                                 <CircularProgressbar percentage={30} className="progressbar-red" />
                                             </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-12 col-sm-12">
                                <div className="card">
                                    <div className="header">
                                        <h2><strong>Team</strong>({selectedProject.Users.length})</h2>
                                        <ul className="header-dropdown">
                                            <li className="dropdown" id="projectMenu">
                                            <a href="#" onClick={() => document.getElementById("projectMenu").classList.toggle('show')}> <i className="zmdi zmdi-more"></i> </a>
                                            <ul className="dropdown-menu dropdown-menu-right">
                                                <li>
                                                    <a onClick={this.editProject.bind(this)} href="javascript:void(0);">Edit</a>
                                                    <a onClick={this.editProject.bind(this)} href="javascript:void(0);">Deactivate</a>
                                                </li>
                                            </ul>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="body">
                                        <UserCard users={selectedProject.Users} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row clearfix">
                        </div>
                    </div>
                </section>
       );
    }

}
function mapStateToProps(state){
    return {
        currentProject: state.selectedProject,
    };
}
export default connect(mapStateToProps, action)(ProjectDashboard);