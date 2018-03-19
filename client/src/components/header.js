
import React,{Component} from 'react';
import Notification from './header-child/notification';
import HeaderProject from './header-child/HeaderProject';
import ImageModal from './header-child/imageModal';
import { connect } from 'react-redux';
import * as action from '../actions';
import { withRouter } from  'react-router-dom';

class Header extends Component{

    componentDidMount(){
        document.body.addEventListener( "click", function(e){
                //if(!e.target.classList.contains('dropdown-toggle') && !e.target.classList.contains('heartbit') && !e.target.classList.contains('zmdi zmdi-flag') && !e.target.classList.contains('imagePopover')){
                var showList = document.getElementsByClassName("show");
                for(var i=0;i< showList.length;i++){
                    showList[i].classList.remove("show");
                }
               // }
            },
            false
        );
    }

    openSidebar(){
        var sidebar = document.getElementById("sidebar");
        sidebar.classList.add('open');
        var overlay = document.getElementById("overlay");
        overlay.style.display = "block";
        this.props.refreshForm(false, 'Project', 'new');
    }
    
    showDropdown(ev){
        if(ev.target.parentNode.tagName  === 'A'){
             ev.target.parentNode.parentNode.classList.toggle('show');
        }else if(ev.target.parentNode.tagName  === 'DIV'){
             ev.target.parentNode.parentNode.parentNode.classList.toggle('show');
        }else
             ev.target.parentNode.classList.toggle('show');
    }
    changePath(){
        this.props.resetSelectedProject();
        this.props.history.push('/');
    }

    render(){
        return(
            <div>
                
                <nav className="navbar p-l-5 p-r-5">
                
                    <ul className="nav navbar-nav navbar-left">
                        <li>
                            <div className="navbar-header">
                                <a href="#" className="h-bars"></a>
                                <a className="navbar-brand" href="#" onClick={this.changePath.bind(this)}>
                                    <span className="m-l-10">Ceptes Tool</span>
                                </a>
                            </div>
                        </li>
                        <li className="dropdown">
                            <a href="#" onClick={(ev) => this.showDropdown(ev)} className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                <i className="zmdi zmdi-notifications" />
                                <div className="notify">
                                    <span className="heartbit" /><span className="point" />
                                </div>
                            </a>
                            <Notification  />
                            
                        </li>
                        <li className="dropdown">
                            <a href="#" onClick={(ev) => this.showDropdown(ev)} className="dropdown-toggle" data-toggle="dropdown" role="button">
                                <i className="zmdi zmdi-flag" />
                                <div className="notify">
                                    <span className="heartbit" />
                                    <span className="point" />
                                </div>
                            </a>
                            <HeaderProject  />
                        </li>
                        <li className="hidden-sm-down">
                            <div className="input-group">                
                                <input type="text" className="form-control" placeholder="Search..." />
                                <span className="input-group-addon">
                                    <i className="zmdi zmdi-search"></i>
                                </span>
                            </div>
                        </li>
                        <li className="float-right" style={{"position":"relative"}}>
                                <a href="#" className="imagePopover" onClick={(ev) => this.showDropdown(ev)}>
                                    {this.props.auth ? <img className="imagePopover"  style={{"width":"50px","borderRadius":"50%"}} width="30" src={this.props.auth.photo} alt="" /> : ''} 
                                </a>
                            <ImageModal userID={this.props.auth != null ? this.props.auth._id : ''} name={this.props.auth != null ? this.props.auth.name : ''} email={this.props.auth != null ? this.props.auth.email : ''} image={this.props.auth != null ? this.props.auth.photo : ''} />
                        </li>
                        <li className="float-right">
                            <a href="sign-in.html" className="mega-menu" data-close="true"><i className="zmdi zmdi-power" /></a>
                            <a href="javascript:void(0);" onClick={this.openSidebar.bind(this)} className="js-right-sidebar" data-close="true">
                                <i className="zmdi zmdi-settings zmdi-hc-spin" />
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {auth:state.auth}
}
export default connect(mapStateToProps, action)(withRouter(Header));

