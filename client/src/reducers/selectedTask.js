
var selectedtask = (state = {}, action) => {
    switch(action.type){
        case 'SELECTED_TASK':
            return action.playload;
         default:
            return state;
    }
    
}


export default selectedtask;