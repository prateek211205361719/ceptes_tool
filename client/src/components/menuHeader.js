

import React,{ Component } from 'react'
import { connect }  from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import LoadingBar from 'react-redux-loading-bar';
import { withRouter } from 'react-router-dom';
class MenuHeader extends Component{
    hideMenu(){

    }
    redirectURL(url){
        //to handle mobile menubar to hide
        this.props.history.push(url);
        var menuSidebar = document.getElementById("menuSidebar");
        menuSidebar.classList.toggle("show-on-mobile");
    }
    render(){
        var {selectedProject} = this.props;
        return(
            <div className="menu-container">
                <div className="menu">
                    <ul className="pullDown" id="menuSidebar">
                        <li className="menu-dropdown-icon">
                            <a href="javascript:void(0);"  onClick={this.redirectURL.bind(this, _.isEmpty(selectedProject) ? '/' : `/project/${this.props.selectedProject._id}`)}>Dashboard</a>
                        </li>
                        <li className="menu-dropdown-icon">
                            <a href="javascript:void(0);" onClick={this.redirectURL.bind(this,'/milestone')}>Milestone</a>
                        </li>
                        <li className="menu-dropdown-icon">
                             <a  href="javascript:void(0);" onClick={this.redirectURL.bind(this,'/task')}>Task</a>
                        
                        </li>
                    </ul>
                </div>
                <header>
                     <LoadingBar style={{ backgroundColor: '#d9534f'}}  />
                </header>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        project: state.project,
        selectedProject: state.selectedProject
    }
}
export default connect(mapStateToProps, null)(withRouter(MenuHeader));