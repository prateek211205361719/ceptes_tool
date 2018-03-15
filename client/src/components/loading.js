
import React,{ Component } from 'react';
import LoadingBar from 'react-redux-loading-bar';
class Loading extends Component{
    render(){
        return(
        <header>
            <LoadingBar style={{ backgroundColor: 'rgb(236, 238, 239)',"position":"relative"}}  />
        </header>
        );
    }
}

export default Loading;