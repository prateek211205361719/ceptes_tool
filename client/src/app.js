
import React,{ Component } from 'react';
import Login from './components/login';
import Header from './components/header';
import MenuHeader from './components/menuHeader';
import Sidebar from './components/sidebar';
import Home from './components/home';
import Milesstone from './components/Milesstone.js';
import UserDashboard from './components/userdashboard';
import ProjectDashboard from  './components/projectDashboard';
import Task from  './components/task';
import TaskDetail from './components/taskDetail';
import MileStoneDetail from './components/MileStoneDetail';
import { compose} from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import * as action from './actions';

import Notify from './components/notify';
import Modal from './components/modal';
const socketIOClient = require('socket.io-client')  
window.socket = socketIOClient.connect(process.env.REACT_APP_HOST);

class App extends Component{
    constructor(){
        super();
      
        
    }
    componentDidMount(){
        this.props.isLogin();
        var obj = this;
        var aud = new Audio('media/file-sounds-1101-plucky.mp3');
        var favicon =  document.getElementById('favicon');
      
        window.socket.on('message', function(data) {
           
            if(data._owner[0]._userId !== obj.props.auth._id){
             
                aud.play().then(() => {

                }, (error)=> {

                });
                favicon.href = './favicon-dot.ico';
            }
                //snd.play(;
            if(obj.props.currentTask && (obj.props.currentTask._id  === data._taskId)){
                 obj.props.createComment(data);
                
                  
            }
        });
       

       
       
    }

    render(){
        fakeAuth.isAuthenticated = this.props.auth;
        return(
            <BrowserRouter>
                <div>
                    
                  
                    <Route path="/login"  component={Login} />
                   
                    <Header />
                    <MenuHeader />
                    <Sidebar />
                    <Route path="/" component={Home} exact={true} />
                    <Route path="/user/:id"  component={UserDashboard} exact={true} />
                    <Route path="/project/:id"  component={ProjectDashboard} exact={true} />
                     <Route path="/task"  component={Task} exact={true} />
                    <Route path="/task/:id"  component={TaskDetail} exact={true} />
                    <Route path="/milestone"  component={Milesstone} exact={true} /> 
                    <Route path="/milestone/:id"  component={MileStoneDetail} exact={true} /> /
                    
               </div>
            </BrowserRouter>
        );
    }
}

 export const fakeAuth = {
    isAuthenticated: true,   
}

function mapStateToProps(state){
    console.log(state);
    return {auth:state.auth, currentTask: state.selectedtask};
}
export default connect(mapStateToProps, action)(App);

