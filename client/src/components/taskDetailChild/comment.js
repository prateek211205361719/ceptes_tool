
import React, { Component } from 'react';
import CommentBox from './commentBox';
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
                                <CommentBox />
                         </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }

}

export default Comment;