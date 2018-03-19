
import React,{ Component } from 'react';

const show = {
    opacity:"1.07",
    display:"block"
};
const modal = {
    display:"block"
};

class Modal extends Component{
    state = {hide:{}, modal:{}}
    render(){
        return(
            <div>
                <div className="sweet-overlay"  style={this.state.hide}></div>
                <div className="sweet-alert visible hideSweetAlert" style={this.state.modal}>
                     <h2>Here's a message!</h2>
                     <div className="sa-button-container">
                        <div className="sa-confirm-button-container">
                            <button className="confirm" tabindex="1"></button>
                           
                        </div>
                     </div>
                </div>
            </div>
        );
    }
}

export default Modal;
