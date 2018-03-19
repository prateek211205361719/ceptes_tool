
import React,{ Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import Picklist from './child/picklist';
import ProjectMultiselect  from './child/multiselect';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import { connect } from 'react-redux';
import * as action from '../../actions';
import _ from 'lodash';

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



let fields  = [
    {
        label:'Name',
        name:'name',
        type:'text',
        class:'col-sm-12',
        component:renderField,
        required:true
    },
    
    {
        label:'Description',
        name:'description',
        type:'textarea',
        class:'col-sm-12',
        component:renderField,
        required:true
    },
    {
        label:'Project',
        name:'project',
        class:'col-sm-12',
        component:Picklist,
        required:true,
        textfield:"name",
        data:[]
    },
    {
        label:'Start Date',
        name:'startDate',
        class:'col-sm-6',
        showTime:false,
        component:renderDateTimePicker
    },
    {
        label:'Due Date',
        name:'dueDate',
        class:'col-sm-6',
        showTime:false,
        component:renderDateTimePicker
    },
    {
        label:'Priority',
        name:'priority',
        type:'Picklist',
        class:'col-sm-12',
        component:Picklist,
        required:true,
        data:['None','Low','Medium','High']
        
    },
    {
        label:'Responsible',
        name:'assignedUsers',
        class:'col-sm-12',
        component:ProjectMultiselect,
        required:true,
        data:[],
        placeholder:'Select User'
        
    }
    
    
];

class TaskForm extends Component{

   constructor(props){
      
        super(props);
        this.state = {fields : 
            [{label:'Name',name:'name',type:'text',class:'col-sm-12',component:renderField,required:true},{label:'Description',name:'description',type:'textarea',class:'col-sm-12',component:renderField,required:true},{label:'Project',name:'project',class:'col-sm-12',component:Picklist,required:true,textfield:"name",data:[]},{label:'Start Date',name:'startDate',class:'col-sm-6',showTime:false,component:renderDateTimePicker},{label:'Due Date',name:'dueDate',class:'col-sm-6',showTime:false,component:renderDateTimePicker},{label:'Priority',name:'priority',type:'Picklist',class:'col-sm-12',component:Picklist,required:true,data:['None','Low','Medium','High']},{label:'Responsible',name:'assignedUsers',class:'col-sm-12',component:ProjectMultiselect,required:true,data:[],placeholder:'Select User'}]
        };
       
   }
     
    componentDidMount(){
       
        this.state.fields[2].data = this.props.projects;
        this.state.fields[6].data = this.props.currentProject.Users;
    }

    changeUser(projectName, projectObj){
        if(projectName === 'Project'){
            var projects = this.props.projects;
            var result =  _.find(projects, {_id: projectObj._id});
            var fields = this.state.fields;
            fields[6].data = result.Users;
            this.setState({fields});
            this.props.dispatch(change('task', 'assignedUsers', []));
        }
    }

    renderContent(){
        return this.state.fields.map((item, index) => {
            return  <Field   onChange={this.changeUser.bind(this, item.label)} placeholder={item.placeholder} textfield ={item.textfield} showTime={item.showTime} classProp={item.class} data={item.data} defaultValue={item.defaultValue} type={item.type} name={item.name} label={item.label} component={item.component}  />
        });
     }
     
     createTask(values){
        var reqObj = Object.assign({} , values);
        var obj = _.pick(reqObj.project, ['_id', 'name']);
        obj = {name: obj.name , _projectId: obj._id}
        reqObj.project = obj;

        if(this.props.formRender.action  === 'new'){
            this.props.createTask(reqObj);
            this.props.reset();
         }else{
            //this.props.updateTask(values,this.props.currentProject.index);
         }
       
        // console.log(JSON.stringify(values));
     }
    
     render(){
        console.log(this.props.currentProject);
        const { handleSubmit, pristine, reset, submitting } = this.props;
        return(
            <div>
                <form onSubmit={handleSubmit((values) => this.createTask(values))}>
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
    fields.map((field) => {
        if(!values[field.name] && field.required){
            error[field.name] = 'This field is required.';
        }
    });
    return error;
}

function mapStateToProps(state){

    return{
        formRender : state.refreshForm,
        projects:_.isEmpty(state.project) ? [] : state.project,
        currentProject: state.selectedProject,
        initialValues: state.refreshForm.action !== 'new' ? state.selectedTask : {project: _.isEmpty(state.selectedProject) ? null : state.selectedProject},
    }
}

TaskForm = reduxForm({
    form: 'task' ,
    enableReinitialize:true,
    validate:validate
 })(TaskForm);

TaskForm = connect(mapStateToProps, action)(TaskForm);



export default TaskForm;