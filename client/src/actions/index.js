
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import axios from 'axios';
import _ from 'lodash';

export const isLogin = (history) =>  async (dispatch) => {
    try{
        dispatch(showLoading());
        var response = await axios.get('/api/login');
        dispatch({
            type:"IS_LOGIN",
            playload:response.data
        }); 
        if(!response.data){
            //window.location.href= '/login';
        }
    }catch(e){
        //window.location.href= '/login';
        
    }
    dispatch(hideLoading());
   
};

export const getUserDashBoard = (history) => async function(dispatch){
 
   dispatch(showLoading());
   try{
        var response = await axios.get('/api/userInfo');
        dispatch( {
            type:"GET_PROJECT",
            playload:response.data.project
        });
        //defined in user reducers
        dispatch( {
            type:"GET_USERS",
            playload:response.data.users
        });  
    }catch(e){
        console.log(e);
        window.location.href= '/login';
        
    }
    dispatch(hideLoading());
};

export const refreshForm = (val , type, action) => {
    return({
        type:"REFRESH_FORM",
        playload:{refreshForm: val, type:type, action:action}
    });  
};

export const selectedProject = (project, index) => {
    return({
        type:"SELECTED_PROJECT",
        playload: Object.assign(project, {index:index})
    });  
}

export const resetSelectedProject = () => {
    return({
        type:"SELECTED_PROJECT",
        playload: {}
    });  
}

//defined in project reducers
export const createProject = (projectObj) => async function(dispatch){
    dispatch(showLoading('sectionBar'));
    try{
        var result = await axios.post('/api/projects', projectObj);
        dispatch({
            type:"CREATE_PROJECT",
            playload:result.data
        });  
    }catch(e){
        console.log(e);
    } 
    dispatch(hideLoading('sectionBar'));
   
}

export const updateProject = (projectObj, index) => async  (dispatch) =>{
    
    dispatch(showLoading('sectionBar'));
    try{
        var result = await axios.patch('/api/projects', projectObj);
        console.log(result.data);
        dispatch({
            type:"UPDATE_PROJECT",
            index:index,
            playload:result.data
        });  
        dispatch({
            type:"SELECTED_PROJECT",
            playload: Object.assign(result.data, {index: index})
        });
    }catch(e){
        console.log(e);
    }
    dispatch(hideLoading('sectionBar'));

 }


 //storing ctrrent milesStone with index of record which clicked
export const currentMilesStone = (mileStoneObj, index) => {
    return{
        type:'SELECTED_MILESTONE',
        playload: Object.assign(mileStoneObj, {index: index}) 
    }
}

export const getMilesStone = (projectId) => async function(dispatch){
    dispatch(showLoading());
    try{
        var result = await axios.get(`/api/milestone/${projectId}`);
        dispatch({
            type:"GET_MILESSTONE",
            playload: result.data
        });  
    }catch(e){
        console.log(e);
        window.location.href= '/login';
    }
    dispatch(hideLoading());
}

export const createMilesStone = (milesStone, currentProjectId) => async  function(dispatch, getState){
    const { selectedProject } = getState();
    try{
        var result = await axios.post('/api/milestone', milesStone);
        console.log(result);
        if(_.isEmpty(currentProjectId) || currentProjectId === milesStone.project._projectId){
            dispatch({
                type:"CREATE_MILESSTONE",
                playload:result.data
            }); 
        }
        
       
    }catch(e){
        console.log(e);
    }
    dispatch(hideLoading('sectionBar'));
}

export const updateMileStone = (mileStoneObj, index) => async function(dispatch){
    dispatch(showLoading('sectionBar'));
    try{
        var result = await axios.patch('/api/milestone', mileStoneObj);
        dispatch({
            type:'UPDATE_MILESTONE',
            index:index,
            playload: result.data
        });
    }catch(e){
       console.log(e);
    }
    dispatch(hideLoading('sectionBar'));
}



export const getTask = (type, projectId) => async function(dispatch){
    dispatch(showLoading());
    try{
         var result = await axios.get(`/api/tasks/${projectId}?type=${type}`);
         dispatch({
            type:"GET_TASK",
            playload:result.data
        }); 
    }
    catch(e){
        console.log(e);
        dispatch(hideLoading());
       
    }
    dispatch(hideLoading());
 
}

export const getTaskByMilestone = (mileStoneId , history) => async function(dispatch){
    dispatch(showLoading());
    try{
        var result = await axios.get(`/api/tasks/milestone/${mileStoneId}`);
        console.log(result);
        dispatch({
            type:"SELECTED_MILESTONE",
            playload:result.data.mileStoneRecord
        }); 
        
        dispatch({
            type:"GET_TASK",
            playload:result.data.assignTaskList
        }); 
        dispatch({
            type:"UNASSIGN_TASK",
            playload:result.data.unAssignTaskList
        }); 
        history.push(`/milestone/${mileStoneId}`);
    }catch(e){
        dispatch(hideLoading());
    }
    dispatch(hideLoading());
    
}


export const createTask = (taskObj) =>  async function(dispatch){
    try{
        var result = await axios.post('/api/tasks', taskObj);
        console.log(result);
    }catch(e){

    }
}

export const selectedTask  = (taskObj) => {
    return{
        type:"SELECTED_TASK",
        playload: taskObj
    }
}

export const getComment = (taskId) => async function(dispatch){
    dispatch(showLoading());
    var result = await axios.get(`/api/comment/${taskId}`);
    console.log(result);
    dispatch({
        type:"GET_COMMENT",
        playload:result.data
    }); 
    dispatch(hideLoading());
}

export const updateAssignOrUnAssignTask= (assign_unassignTask, mileStoneId) => async function(dispatch){
    dispatch(showLoading());
    var result = await axios.post(`/api/updateTaskByMilesStone/${mileStoneId}`, assign_unassignTask);
    console.log(result.data);
    dispatch({
        type:"GET_TASK",
        playload:result.data.assignTaskList
    }); 
    dispatch({
        type:"UNASSIGN_TASK",
        playload:result.data.unAssignTaskList
    }); 
    dispatch(hideLoading());
}


export const createComment = (commentObject) => {
    return{
        type:'CREATE_COMMENT',
        playload: commentObject

    }
}




export const showLodingProgress = (commentObject) => function(dispatch){
    dispatch(showLoading());
}
export const hideLodingProgress = (commentObject) => function(dispatch){
    dispatch(hideLoading());
}