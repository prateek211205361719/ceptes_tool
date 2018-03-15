
import React,{Component} from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
class TaskRecord extends Component{
    state= {thead:[{label:'Name'},{label:'Priority'},{label:'Start Date'},{label:'End Date'}]};
   
    renderContent(){
       return this.props.tasks.map((item, index) => {
           return(
                <tr key={`taskBody${index}`}>
                    <td style={{"display": "table-cell"}} className="footable-first-visible">
                        {item.name}
                    </td>
                    <td style={{"display": "table-cell"}} className="footable-first-visible">
                        {item.priority}
                    </td>
                    <td style={{"display": "table-cell"}} className="footable-first-visible">
                        <Moment format="YYYY/MM/DD">
                             {item.startDate}
                        </Moment>
                    </td>
                    <td style={{"display": "table-cell"}} className="footable-first-visible">
                        <Moment format="YYYY/MM/DD">
                             {item.endDate}
                        </Moment>
                    </td>
                 </tr>
             );
        });
    }

    render(){
        console.log(this.props.tasks)
        return (
            <div className="body table-responsive" style={{"padding":"0"}}>
                <table  className="table table-striped m-b-0 footable footable-1 footable-paging footable-paging-center breakpoint-lg">
                    <thead>
                        <tr className="footable-header">
                            {
                                this.state.thead.map((item, index) => {
                                    return(
                                        <th key={`taskHead${index}`} className="footable-sortable footable-first-visible">
                                            {item.label}
                                            <span className="fooicon fooicon-sort"></span>
                                        </th>
                                    );
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                       { this.props.tasks.length > 0 ?  this.renderContent() : <tr><td colSpan={this.state.thead.length} style={{"display": "table-cell","textAlign":"center"}}>No record found.</td></tr>}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {tasks : state.tasks}
}

export default connect(mapStateToProps, null)(TaskRecord);