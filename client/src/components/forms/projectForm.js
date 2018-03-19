
import React,{ Component } from 'react';
import { reduxForm, Field, values } from 'redux-form';

import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocaliser from "react-widgets-moment";
import 'react-widgets/dist/css/react-widgets.css';
import { connect } from 'react-redux';
import ProjectMultiselect  from './child/multiselect';
import * as action from '../../actions';
import _ from 'lodash';
momentLocaliser(moment);


const renderField = ({ input, label, type,classProp, meta: { touched, error ,pristine, dirty} }) => (
    <div className={classProp}>
        <label>{label}</label>
        <div className="form-group">
            { type == 'text' ?  
            <input className="form-control" {...input} placeholder={label} type={type} /> 
            : <textarea  placeholder={label}  className="form-control" {...input} />}
        </div>
        {touched && error && <span style={{"color":"#FF3636","fontSize":"12px"}}>{error}</span>}
    </div>
);

const renderDateTimePicker = ({ classProp, label, input: { onChange, value }, showTime ,  meta: { touched, error ,pristine, dirty}}) =>

 <div className={classProp}> 
    <label className="control-label">{label}</label>  
    <DateTimePicker 
        onChange={onChange}
        format="DD MMM YYYY"
        placeholder={label}
        time={showTime}
        value={!value ? null : new Date(value)}
    />
     {touched && error && <span style={{"color":"#FF3636","fontSize":"12px"}}>{error}</span>}
  </div>



const fields = [
    {
        name:'name',
        label:'Project Name',
        class:'col-sm-12',
        required:true,
        type:'text',
        component:renderField
    },
    {
        name:'startDate',
        label:'Start Date',
        class:'col-sm-6',
        showTime:false,
        component:renderDateTimePicker
    },
    {
        name:'endDate',
        label:'End Date',
        class:'col-sm-6',
        required:true,
        showTime:false,
        component:renderDateTimePicker
    },
    {
        name:'description',
        label:'Description',
        class:'col-sm-12',
        required:true,
        type:'textarea',
        component:renderField
    },
    {
        name:'Users',
        label:'Select Users',
        class:'col-sm-12',
        type:'renderMultiselect',
        component:ProjectMultiselect
    }
];


  
class ProjectForm extends Component{

  createProject(value){
       console.log(value);
        var userList =  value.Users.map((item) => {
            item._userId  = item._userId ? item._userId : item._id
            return { name:item.name, photo: item.photo, email: item.email, _userId: item._userId };
         });
        var obj = Object.assign({}, value);
         obj.Users = userList;
         console.log(obj);
         if(this.props.formRender.action  === 'New'){
            this.props.createProject(obj);
            this.props.reset();
         }else{
            this.props.updateProject(obj,this.props.currentProject.index);
         }
         

  }

  renderContent(){
     return fields.map((item, index) => {
        return(
           <Field placeholder={item.label} showTime={item.showTime} classProp={item.class} label={item.label} type={item.type} name={item.name}  data={this.props.users} component={item.component} /> 
        );
     });
  }

  render(){
      const { handleSubmit, pristine, reset, submitting } = this.props;
        if(this.props.resetForm){
            reset();
        }
        return(
            <div>
              
                <form onSubmit={handleSubmit((values) => this.createProject(values))}>
                    <div className="row clearfix"> {this.renderContent()} </div>
                     <div className="row clearfix" style={{marginTop:"2%"}}>
                        <div className="col-sm-12">
                             <button type="submit" className="btn btn-raised btn-primary btn-round waves-effect">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}



function validate(values){
    var error = {};
    fields.map((item) => {
        if(item.name == 'startDate' || item.name == 'endDate'){
            if(moment(values.startDate ).isAfter(values.endDate)){
                 error[item.name] = 'Start date should be less than end date';
            }
        }
        if(!values[item.name] && item.required){
            error[item.name] = 'This field is required.';
        }
       
    });

    return error;

}

function mapStateToProps(state){
    return {
        formRender : state.refreshForm,
        currentProject:state.selectedProject,
        users:state.users,
        initialValues:state.refreshForm.action !== 'New' ? state.selectedProject : {}
    }
}

ProjectForm = reduxForm({
    form: 'ProjectForm',
    validate:validate,
   
})(ProjectForm);

ProjectForm = connect(
    mapStateToProps, action
)(ProjectForm);

export default ProjectForm;