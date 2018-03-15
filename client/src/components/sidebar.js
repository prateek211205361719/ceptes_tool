
import React,{Component} from 'react';
import ProjectForm from './forms/projectForm';
import Milesstone from './forms/Milesstone';
import { connect } from 'react-redux';
import * as action from '../actions';
import LoadingBar from 'react-redux-loading-bar';
class Sidebar extends Component{
   
    state= {status:'Project'};

    componentDidMount(){
       
       var obj =this;
        document.getElementById("overlay").addEventListener("click", function(event){
            obj.props.refreshForm(true,'');
            var sidebar = document.getElementById("sidebar");
            sidebar.classList.remove('open');
            var overlay = document.getElementById("overlay");
            overlay.style.display = "none";
          },
          false
        );
      
    }
    closeModal(){
        this.props.currentMilesStone({});
        this.props.refreshForm(true,'');
        var sidebar = document.getElementById("sidebar");
        sidebar.classList.remove('open');
        var overlay = document.getElementById("overlay");
        overlay.style.display = "none";
       
    }
     renderContent(){
         switch(this.props.formRender.type){
            case 'Project':
                return  <ProjectForm resetForm={this.props.formRender.refreshForm} />
           case 'Milesstone':
                return <Milesstone resetForm={this.props.formRender.refreshForm} />
            case 'Task':
                return <div>Task</div>

         }
     }

    render(){
      
        return(
            <div>
                <div id="overlay" className="overlay" style={{display:"none"}}></div>
                <aside className="right-sidebar" id="sidebar" style={{"overflow":"scroll"}}>
                   <LoadingBar scope="sectionBar"  />
                    <div className="card" style={{"padding":"10px"}}>
                         <LoadingBar scope="sectionBar" style={{ backgroundColor: '#8b98e1'}}  />
                      
                        <div className="header">
                            <h2><strong>Add</strong> {this.props.formRender.type}</h2>
                            <ul className="header-dropdown" style={{"right":"0"}} >
                                <li id="sideBarMenu" className={`dropdown ${this.state.showMenu}`}> 
                                    <a href="#" onClick={() => document.getElementById("sideBarMenu").classList.toggle('show')}> <i className="zmdi zmdi-more"></i> </a>
                                    <ul className="dropdown-menu dropdown-menu-right slideUp">
                                        <li><a onClick={() => this.props.refreshForm(false,'Project','new')}  href="javascript:void(0);">Project</a></li>
                                        <li><a onClick={() => this.props.refreshForm(false,'Milesstone')}  href="javascript:void(0);">Milesstone</a></li>
                                        <li><a onClick={() => this.props.refreshForm(false,'Task')}  href="javascript:void(0);">Task</a></li>
                                        <li><a onClick={() => this.props.refreshForm(false,'Users')}  href="javascript:void(0);">Users</a></li>
                                    </ul>
                                </li>
                                <li className="remove">
                                    <a role="button" onClick={this.closeModal.bind(this)} className="boxs-close"><i className="zmdi zmdi-close"></i></a>
                                </li>
                            </ul>
                        </div>
                        <div className="body">
                               {this.renderContent()}
                        </div>
                       
                   </div>
                </aside>
            </div>
        );
    }
}


function mapStateToProps({refreshForm}){
    return { formRender : refreshForm};
}
export default connect(mapStateToProps, action)(Sidebar);