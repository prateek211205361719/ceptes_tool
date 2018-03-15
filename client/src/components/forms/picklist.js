
import React,{ Component } from 'react';
import DropdownList from 'react-widgets/lib/DropdownList';
class Picklist extends Component{

   
    render(){
        var  {touched, error, input, changeUser, label, valueField, textfield}  = this.props;
        return(
            <div className={this.props.classProp}>
                <label className="control-label">{label}</label> 
                <DropdownList {...this.props.input}
                data={this.props.data}
               
                placeholder={label}
                textField={textfield}
                valueField= {valueField}
                onChange={input.onChange} />
                {touched && error && <span style={{"color":"#FF3636","fontSize":"12px"}}>{error}</span>}
            </div>
        );
    }
}

export default Picklist;