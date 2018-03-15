
const tasks = (state = [], action) => {
    switch(action.type){
        case 'GET_TASK':
            return action.playload
         default:
            return state;

    }

}
export default tasks;
