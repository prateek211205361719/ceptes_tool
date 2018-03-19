
import React,{ Component } from 'react';
import { Multiselect } from 'react-widgets';
import _ from 'lodash';

class ProjectMultiselect extends Component{
    render(){
       
    
       var {classProp,label, data, input, placeholder} = this.props;
       return(
            <div className={classProp}>
                <label className="control-label">{label}</label>  
                <Multiselect {...input}
                data={data}
                textField="email"
                onBlur={() => input.onBlur()}
                placeholder={placeholder}  
                value={input.value || []}
               
                />
            </div>
       );
    }

}


export default ProjectMultiselect;