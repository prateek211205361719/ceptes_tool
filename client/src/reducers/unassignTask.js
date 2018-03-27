
const unAssignTask = (state=[], action) => {
    switch(action.type){
        case 'UNASSIGN_TASK':
            return action.playload;
        default:
            return state;

    }
}

export default unAssignTask;