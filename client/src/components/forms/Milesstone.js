
import React,{ Component } from 'react';
import { reduxForm, Field, values , change} from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocaliser from "react-widgets-moment";
import { connect } from 'react-redux';
import * as action from '../../actions';
import _ from 'lodash';
import Picklist from './child/picklist';

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
  const fields= [
    {
      name: 'name',
      label: 'Milesstone Name',
      required:true
     },
    {
      name: 'startDate',
      label: 'Start Date',
      required:true
     
    },
    {
      name: 'endDate',
      label: 'End Date',
      required:true
    },
    {
      name: '_project',
      label: 'Select Project',
      required:true
    },
    {
      name: '_responsible',
      label: 'Select Users',
      required:true
    }
  ];
class Milesstone extends Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            fields : [
            {name:'name',label:'Milesstone Name',class:'col-sm-12',required:true,type:'text',component:renderField},
            {name:'startDate',label:'Start Date',class:'col-sm-6',showTime:false,component:renderDateTimePicker},
            {name:'endDate',label:'End Date',class:'col-sm-6',required:true,showTime:false,component:renderDateTimePicker},
            {name:'project', textfield:"name", valueField:"_projectId", label:'Select Project', class:'col-sm-12', component:Picklist, data:this.props.projects},
            {name:'_responsible',textfield:"email",valueField:"_userId",label:'Select Users',class:'col-sm-12', component:Picklist, data:this.props.currentProject.Users}]
        }  
        if(!_.isEmpty(this.props.selectedMileStone)){
            var result =  _.find(this.props.projects, {_id: this.props.selectedMileStone.project._projectId});
            if(!_.isEmpty(result)){
                var fields = this.state.fields;
                fields[4].data = result.Users;
                
            }
        }
       
    }

    changeUser(projectName, projectObj){
        
        if(projectName === 'Select Project'){
            var projects = this.props.projects;
            var result =  _.find(projects, {_id: projectObj._id});
            var fields = this.state.fields;
            fields[4].data = result.Users;
            this.setState({fields});
            this.props.dispatch(change('Milesstone', '_responsible', []));
            
        }
      
    }

    renderContent(){
        return this.state.fields.map((item) =>{
             return (
                 <Field  onChange={this.changeUser.bind(this, item.label)} textfield ={item.textfield} valueField={item.valueField}  showTime={item.showTime} classProp={item.class} label={item.label} type={item.type} name={item.name}  data={item.data} component={item.component} />
            ); 
        });
    }
   
    createMilesStone(value){
        console.log(value);
        var milestone = _.pick(value, ['name','startDate','endDate','project','_responsible','_id','index']);
        var project = _.pick(milestone.project ,['_projectId','name','_id']);
        milestone.project  = {name:project.name, _projectId: project._projectId ? project._projectId : project._id};
        milestone._responsible = _.pick(milestone._responsible ,['name','photo','email','_userId']);
        if(this.props.refreshMilesStoneForm.action === 'New'){
            this.props.createMilesStone(milestone, this.props.currentProject._id);
            this.props.reset();
        }else{
            this.props.updateMileStone( _.omit(milestone,['index']), milestone.index);
        }
      
    }
  
    render(){
        const { handleSubmit, pristine, reset, submitting } = this.props;
        if(this.props.resetForm){
            reset();
        }
        return(
           <form onSubmit={handleSubmit((values) => this.createMilesStone(values))}>
                <div className="row clearfix"> {this.renderContent()} </div>
                    <div className="row clearfix" style={{marginTop:"2%"}}>
                    <div className="col-sm-12">
                        <button type="submit" className="btn btn-raised btn-primary btn-round waves-effect">Add</button>
                    </div>
                   
                </div>
           </form>
        );
    }
}


function validate(values){
    var error = {};
    fields.map((item) => {
        if(item.name == 'endDate'){
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
    console.log(state.refreshForm);
    return {
            loadingBar:state.loadingBar,
            refreshMilesStoneForm : state.refreshForm,
            users:state.users,
            projects:_.isEmpty(state.project) ? [] : state.project,
            currentProject: state.selectedProject,
            mileStone:  state.mileStone,
            selectedMileStone: state.selectedMileStone,
            initialValues: state.refreshForm.action !== 'New' ? state.selectedMileStone : {project: _.isEmpty(state.selectedProject) ? null : state.selectedProject},
           
        }
  }


Milesstone=  reduxForm({
    form:'Milesstone',
    validate:validate,
    enableReinitialize:true
    
})(Milesstone);

Milesstone = connect(
    mapStateToProps, action
)(Milesstone);

export default Milesstone;


