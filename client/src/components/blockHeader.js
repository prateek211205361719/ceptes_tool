
import React,{Component} from 'react';
import ImageModal from './userdashboardChild/imageModal';
class BlockHeader extends Component{
    state = {showModal:false};
    showModal(){
        this.setState({showModal:true});
    }
    renderPhoto(){
        if(!this.props.photo){
            return;
        }
        var image = this.props.photo.substring(0,this.props.photo.length - 2)+'400';
        return(
            <div className="col-lg-5 col-md-6 col-sm-12">
                <div className="float-right m-l-10">
                    <a href="#" onClick={this.showModal.bind(this)}>
                     <img style={{"borderRadius":"50%","cursor":"pointer"}} className="imagePopover" height="80" src={image} alt="" />
                    </a>
                </div>
            </div>

        );
    }
    closeModal(){
        this.setState({showModal:false});
    }
    render(){
        var image ='';
        if(this.props.photo){
             image = this.props.photo.substring(0,this.props.photo.length - 2)+'800';
        }
        return (
            
            <div className="block-header">
                <div className="row">
                    <div className="col-lg-7 col-md-6 col-sm-12">
                        <h2>{this.props.header}
                            <small>{this.props.subHeader}</small>
                        </h2>
                    </div>
                    
                   {this.renderPhoto()}
                
                </div>
                 <ImageModal showModal={this.state.showModal} image={image} closeModal={this.closeModal.bind(this)} /> 
            </div>

        );
    }
}

export default BlockHeader;