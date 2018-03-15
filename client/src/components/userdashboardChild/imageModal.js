
import React,{ Component } from 'react';
import './imageModal.css';
class ImageModal extends Component{
    componentDidMount(){
       /* var userContent = document.getElementById('userContent'); 
        userContent.style.zIndex= "14";
        var modal = document.getElementById('myModal');
        modal.style.display = "block";
        var modalImg = document.getElementById("img01");
        modalImg.src = this.props.image;*/
    }
    closeModal(){
       this.props.closeModal();
    }
    render(){
        var userContext = document.getElementById("userContent");
        var style = this.props.showModal ? {"zIndex":"14","display":"block"} : {"zIndex":"0","display":"none"};
        if(userContext)
             this.props.showModal ? userContext.style.zIndex = "auto" : userContext.style.zIndex = "9";
        return(
            <div id="myModal" className="modal" style={style} >
                <span onClick={this.closeModal.bind(this)} className="close1">&times;</span>
                <img src={this.props.image} className="modal-content" id="img01"  />
                
            </div>
        );
    }

}

export default ImageModal;