
const selectedMileStone = (state ={}, action) =>{
    switch(action.type){
        case 'SELECTED_MILESTONE':
            return action.playload;
        default:
            return state;
    }
};

export default  selectedMileStone;