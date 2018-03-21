

import React,{ Component } from 'react'
import { connect }  from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import LoadingBar from 'react-redux-loading-bar';
class MenuHeader extends Component{
    render(){
        return(
            <div className="menu-container">
                <div className="menu">
                    <ul className="pullDown" id="menuSidebar">
                        <li className="menu-dropdown-icon">
                            <Link to={ _.isEmpty(this.props.selectedProject) ? '/' : `/project/${this.props.selectedProject._id}`}>Dashboard</Link>
                        </li>
                        <li className="menu-dropdown-icon">
                            <Link to="/milesstone">Milestone</Link>
                        </li>
                        <li className="menu-dropdown-icon">
                             <Link to="/task">Task</Link>
                        
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
export default connect(mapStateToProps, null)(MenuHeader);