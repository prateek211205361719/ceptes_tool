
import React, { Component } from 'react';

class TaskDiv extends Component {
    selectTask(){
        this.props.activeTask(this.props.index);
    }
    render(){
        var { data } = this.props;
        return(
             <a  href="javascript:void(0);" onClick={this.selectTask.bind(this)}  className={data.active ? 'active list-group-item' : 'list-group-item'}>{ data.name }</a>
        );
    }
}

export default TaskDiv;