
var selectedProject = (state = {}, action) => {
    switch(action.type){
        case 'SELECTED_PROJECT':
            return action.playload;
         default:
            return state;
    }
};

export default selectedProject;