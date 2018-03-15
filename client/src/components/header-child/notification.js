
import React,{Component} from 'react';
import { Link } from 'react-router-dom';
class Notification extends Component{
    render(){
        return(
            <ul className="dropdown-menu themeIcom pullDown leftIcon">
                <li className="body">
                    <div className="slimScrollDiv" style={{position: 'relative', overflow: 'hidden', width: 'auto', height: 300}}><ul className="menu list-unstyled" style={{overflow: 'hidden', width: 'auto', height: 300}}>
                        <li>
                            <a href="javascript:void(0);">
                                <div className="media">
                                <img className="media-object" alt="tst" src="assets/images/xs/avatar2.jpg"  />
                                <div className="media-body">
                                    <span className="name">Sophia <span className="time">30min ago</span></span>
                                    <span className="message">There are many variations of passages</span>                                        
                                </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <div className="slimScrollBar" style={{background: 'rgba(0, 0, 0, 0.2)', width: 3, position: 'absolute', top: 0, opacity: '0.4', display: 'block', borderRadius: 3, zIndex: 99, right: 1}} /><div className="slimScrollRail" style={{width: 3, height: '100%', position: 'absolute', top: 0, display: 'none', borderRadius: 0, background: 'rgb(51, 51, 51)', opacity: '0.2', zIndex: 90, right: 1}} /></div>
                </li>
                <li className="footer"> 
                    <Link to="/">View All</Link> 
                </li>
            </ul>
        );
    }
}

export default Notification;