
import React, { Component } from 'react';

class Comment extends Component{
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
                                    <div className="cbp_tmicon">
                                         <a href="#" class="imagePopover"><img class="imagePopover" width="30" src="https://lh6.googleusercontent.com/-t4eBb5fKAd4/AAAAAAAAAAI/AAAAAAAAAFs/QbLmWiT4nf8/photo.jpg?sz=50" alt="" style={{"width": "50px", "border-radius": "50%"}} /></a>
                                    </div>
                                    <div className="cbp_tmlabel"> 
                                        <h2><a href="javascript:void(0);">Art Ramadani</a> <span>posted a status update</span></h2>
                                        <p>Tolerably earnestly middleton extremely distrusts she boy now not. Add and offered prepare how cordial two promise. Greatly who affixed suppose but enquire compact prepare all put. Added forth chief trees but rooms think may.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="footer">
                            <div className="chat-message clearfix">
                                <div className="input-group p-t-15">
                                    <input type="text" class="form-control" placeholder="Enter text here..." />
                                    <span className="input-group-addon">
                                        <i className="zmdi zmdi-mail-send"></i>
                                    </span>
                                </div>
                                <a href="javascript:void(0);" class="btn btn-raised btn-warning btn-round"><i class="zmdi zmdi-camera"></i></a>
                                <a href="javascript:void(0);" class="btn btn-raised btn-info btn-round"><i class="zmdi zmdi-file-text"></i></a>                            
                            </div>
                         </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }

}

export default Comment;