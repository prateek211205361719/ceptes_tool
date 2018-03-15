
import React,{Component} from 'react';

class Notify extends Component {
    state = {
        isShow:true,
        show:{"display": "inline-block", "margin": "0px auto", "position": "fixed", "transition":"all 0.5s ease-in-out", "zIndex": "1031", "top": "20px", "right": "0px", "left":"0px"},
        hide:{"display": "none", "margin": "0px auto", "position": "fixed", "transition":"all 0.5s ease-in-out", "zIndex": "1031", "top": "-20"+"px", "right": "0", "left":"0"}
    }

    show(){
        this.setState({show: !this.state.show});
    }
    render(){
        return(
            <div  style={this.state.isShow ? this.state.show : this.state.hide} data-notify-position="top-center" className="bootstrap-notify-container alert alert-dismissible alert-success p-r-35 animated fadeInDown">
                  <button onClick={this.show.bind(this)} type="button" aria-hidden="true" class="close" data-notify="dismiss" style={{"position": "absolute", "right": "10px", "top": "5px", "zIndex": "1033"}}>×</button>
                    hello how are u
          </div>
        );
    }
}

export default Notify;
