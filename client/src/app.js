
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


import { compose} from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';
import * as action from './actions';

import Notify from './components/notify';

class App extends Component{
    componentDidMount(){
        this.props.isLogin();
    }

    render(){
        fakeAuth.isAuthenticated = this.props.auth;
        return(
            <BrowserRouter>
                <div>
                    
                    <Header />
                    <MenuHeader />
                    <Sidebar />
                    <Route path="/login"  component={Login} />
                    <Route path="/" component={Home} exact={true} />
                    <Route path="/user/:id"  component={UserDashboard} exact={true} />
                    <Route path="/project/:id"  component={ProjectDashboard} exact={true} />
                    <Route path="/task"  component={Task} exact={true} />
                    <Route path="/milesstone"  component={Milesstone} exact={true} /> /
                    
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
    return {auth:state.auth};
}
export default connect(mapStateToProps, action)(App);

