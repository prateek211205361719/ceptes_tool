
var project = (state= [], action) => {
    switch(action.type){
        case 'GET_PROJECT':
            return action.playload;
        case 'CREATE_PROJECT':
            return [action.playload].concat(state);
        case 'UPDATE_PROJECT':{
               const newState = [ ...state ];
               newState[action.index] = action.playload;
               return newState;
               
        }
        default:
            return state;
    }
};

export default project;