
var milesstone = (state=[], action) =>{
    switch(action.type){
        case 'GET_MILESSTONE':
            return action.playload
        case 'CREATE_MILESSTONE':
            return [action.playload].concat(state)
         case 'UPDATE_MILESTONE':
            const newState = [ ...state ];
            newState[action.index] = action.playload;
            return newState;
        default:
            return state;
    }
    
}

export default milesstone;