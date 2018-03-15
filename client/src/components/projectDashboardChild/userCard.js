
import React,{Component} from 'react';
import { Link } from 'react-router-dom';
class UserCard extends Component{
   
    renderContent(){
       return this.props.users.map((user, index) => {
            return(
                <li key={`userCard${index}`} className="inbox-inner">
                    <Link to={`/user/${user._userId}`}>
                        <div className="inbox-item">
                            <div className="inbox-img"> <img src={user.photo} alt={user.name} /> </div>
                            <div className="inbox-item-info">
                                <p className="author">{user.name}</p>
                            </div>
                        </div>
                    </Link>
                </li>
            );
        });
    }
   
    render(){
        return(
            <ul className="inbox-widget list-unstyled clearfix">
                {this.renderContent()}
            </ul>

        );
    }

}

export default UserCard;