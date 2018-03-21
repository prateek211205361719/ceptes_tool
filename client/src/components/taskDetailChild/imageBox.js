
import React,{ Component } from 'react';
import _ from 'lodash';
class ImageBox extends Component{
   state = {iconMap:{'audio/mp3':'zmdi-playlist-audio','text/plain':'zmdi-file-text'}}
    constructor(props){
        super(props);
        
    }

    renderContent(){
        var fileList = [];
         _.forEach(this.props.files, (item, index) => {
              console.log(item);
              fileList.push({name:item.name, index, type:item.type ,size: item.size, imageUrl : URL.createObjectURL(item)})
              
        });

        return  fileList.map((item, index) => {
            return(
                <div className="col-lg-3 col-md-4 col-sm-12" key={`uploadedImage${index}`}>
                     <div className="card">
                        <div className="file" style={{"boxShadow": "#eee 1px 1px"}}>
                              
                               <a href="javascript:void(0);">
                                    <div className="hover">
                                        <button type="button" onClick={this.props.removeFile.bind(this, index)} className="btn btn-icon btn-icon-mini btn-round btn-danger">
                                              <i className="zmdi zmdi-delete"></i>
                                        </button>
                                    </div>
                                    { item.type.indexOf('image') > -1 ?  <div className="image" style={{"textAlign":"center"}}><img style={{"maxHeight":"130px"}} src={item.imageUrl} alt={item.name} className="img-fluid" /></div> :  <div className="icon"> <i className="zmdi zmdi-collection-pdf"></i></div> }
                                    <div className="file-name">
                                        <p className="m-b-5 text-muted" style={{"wordWrap":"break-word"}}>{item.name}</p>
                                        <small>Size: {item.size/(1000)} MB</small>
                                    </div>
                                    <div className="progress m-b-5">
                                        <div style={{"transition":"width 1s"}}  className="progressComment progress-bar progress-bar-success"> <span className="sr-only">40% Complete (success)</span> </div>
                                    </div>
                              </a>
                        </div>
                     </div>
                </div>
            );
        });
    }
     render(){
       
        return(
            <div className="row clearfix">
               {this.renderContent()}
            </div>
            
        );
    }
}

export default ImageBox;
