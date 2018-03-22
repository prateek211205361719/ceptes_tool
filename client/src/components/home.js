
import React,{ Component } from 'react';
import { connect } from 'react-redux';
import BlockHeader from './blockHeader';
import * as action from '../actions';
import { withRouter } from 'react-router-dom';
class Home extends Component{
    componentDidMount(){
      
        var { history } = this.props;
        this.props.getUserDashBoard(history);
    }
    render(){
        
        return(
            <section className="content">
                <BlockHeader header={this.props.auth ? `Welcome ${this.props.auth.name}` : ''} />
                    <div className="container-fluid">

                        <div className="row clearfix">
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="card product-report">
                                    <div className="header">
                                         <h2><strong>My Task</strong></h2>
                                         <ul className="header-dropdown">
                                            <li className="dropdown show">
                                                 <button className="btn btn-primary btn-simple btn-sm">Load More</button>
                                            </li>
                                         </ul>
                                         <p style={{"color":"#777"}}>View detail of task that are on your plate</p>
                                    </div>
                                    <div className="body">
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="card product-report">
                                    <div className="header">
                                        <h2><strong>My Overwiew</strong></h2>
                                        <ul className="header-dropdown">
                                            <li className="dropdown show">
                                                 <button className="btn btn-primary btn-simple btn-sm">Load More</button>
                                            </li>
                                         </ul>
                                         <p style={{"color":"#777"}}>Get a bird's-eye view of your Tasks, Issues, and Milestones </p>
                                    </div>
                                    <div className="body">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row clearfix">
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="card product-report">
                                    <div className="header">
                                         <h2><strong>My Issues</strong></h2>
                                         <ul className="header-dropdown">
                                            <li className="dropdown show">
                                                 <button className="btn btn-primary btn-simple btn-sm">Load More</button>
                                            </li>
                                         </ul>
                                         <p style={{"color":"#777"}}>View the details of the Issues that need your attention</p>
                                    </div>
                                    <div className="body">
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="card product-report">
                                    <div className="header">
                                        <h2><strong>My Milestone</strong></h2>
                                        <ul className="header-dropdown">
                                            <li className="dropdown show">
                                                 <button className="btn btn-primary btn-simple btn-sm">Load More</button>
                                            </li>
                                         </ul>
                                         <p style={{"color":"#777"}}>Keep an eye on your overdue and upcoming milestones</p>
                                    </div>
                                    <div className="body">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row clearfix">
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="card product-report">
                                    <div className="header">
                                         <h2><strong>My work items due date</strong></h2>
                                         <ul className="header-dropdown">
                                            <li className="dropdown show">
                                                 <button className="btn btn-primary btn-simple btn-sm">Load More</button>
                                            </li>
                                         </ul>
                                         <p style={{"color":"#777"}}>Know what's in store for you today</p>
                                    </div>
                                    <div className="body">
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12">
                                <div className="card product-report">
                                    <div className="header">
                                        <h2><strong>My Overdue works items</strong></h2>
                                        <ul className="header-dropdown">
                                            <li className="dropdown show">
                                                 <button className="btn btn-primary btn-simple btn-sm">Load More</button>
                                            </li>
                                         </ul>
                                         <p style={{"color":"#777"}}>The work items displayed here are past their due date</p>
                                    </div>
                                    <div className="body">
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
               
            </section>
        );
    }
}
function mapStateToProps(state){
    return {auth:state.auth}
}
export default connect(mapStateToProps, action)(withRouter(Home));