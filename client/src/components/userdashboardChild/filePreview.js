
import React,{Component} from 'react';
import './imageModal.css';
class FilePreview extends Component{

    componentDidMount(){
       /* var iframe = document.querySelector("iframe");
        var doc = iframe.contentDocument;
        var child = doc.childNodes[0].children;
        child[1].style.textAlign = "center";*/
    }
    closeModal(){
        this.props.closeModal();
     }
    render(){
        var userContext = document.getElementById("previewFile");
        var menuContainer = document.getElementsByClassName("menu-container")[0];
        var navbar = document.getElementsByClassName("navbar")[0];
        if(this.props.showModal){
            menuContainer.style.zIndex = "auto";
            navbar.style.zIndex = "auto";
            
        }else{
            menuContainer.style.zIndex = "10";
            navbar.style.zIndex = "11";
            
        }
        var style = this.props.showModal ? {"zIndex":"14","display":"block"} : {"zIndex":"0","display":"none"};
        if(userContext)
                this.props.showModal ? userContext.style.zIndex = "auto" : userContext.style.zIndex = "9";
     
        return(
            <div id="filePreviewModal" styl={{"paddingTop":"70px"}} className="modal" style={style} >
                <span onClick={this.closeModal.bind(this)} className="close1">&times;</span>
                <div className="content">
                    <div className="embed-container">
                        {
                            this.props.showModal ?  
                            <iframe frameborder="0"  src={`/api/comment/readfile/${this.props.fileId}`}></iframe> : null 
                        }
                    </div>
                  </div>
        
            </div>
        );
    }
}

export default FilePreview;