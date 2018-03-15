
import React,{Component} from 'react';
import { Link } from 'react-router-dom';

class ImageModal extends Component{
  
    render(){
        var {image,name,email} = this.props;
        if(image){
            image = image.substring(0,image.length - 2)+'200';
        }
        return(
            <ul className="dropdown-menu dropdown-menu1 pullDown">
                <li className="header" style={{'minWidth':'330px'}}>
                    <div className="profile-header">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-4">
                                    <div className="profile-image float-md-right"> 
                                    {image ? <img height="100" width="100" src={image} alt={name} /> : ''} 
                             </div>
                            </div>
                            <div className="col-lg-8 col-md-8 col-8">
                                <span>{name}</span>
                                <div style={{'fontWeight':'500'}}>
                                     <span className="job_post">Programmerr</span>
                                </div>
                                <div style={{'fontWeight':'500'}}>
                                    <span className="job_post">{email}</span>
                                </div>
                                <div>
                                
                                   <Link to={`/user/${this.props.userID}`} style={{"padding":"10px 15px"}} className="btn btn-primary btn-round">Profile</Link>
                                   <a href="/api/logout" style={{"padding":"10px 15px"}} className="btn btn-primary btn-round btn-simple">Logout</a>
                                </div>
                            </div>
                        </div>
                    
                    </div>
                </li>
            </ul>
        );
    }
}

export default ImageModal;