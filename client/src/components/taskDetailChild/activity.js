
import React,{ Component } from 'react';

class Activity extends Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row clearfix">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="body">
                                <ul className="cbp_tmtimeline"> 
                                    <li>
                                        <time className="cbp_tmtime">
                                            <span className="hidden">25/12/2017</span> 
                                            <span className="large">Now</span>
                                        </time>
                                        <div className="cbp_tmicon"><i className="zmdi zmdi-account"></i></div>
                                        <div className="cbp_tmlabel empty"> <span>No Activity</span> </div>
                                    </li>
                                    <li>
                                        <time className="cbp_tmtime">
                                            <span className="hidden">25/12/2017</span> 
                                            <span className="large">Now</span>
                                        </time>
                                        <div className="cbp_tmicon bg-info"><i className="zmdi zmdi-label"></i></div>
                                        <div className="cbp_tmlabel"> 
                                            <h2><a href="javascript:void(0);">Art Ramadani</a> <span>posted a status update</span></h2>
                                            <p>Tolerably earnestly middleton extremely distrusts she boy now not. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put. Added forth chief trees but rooms think may.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
              
            </div>
        );
    }
}

export default Activity;