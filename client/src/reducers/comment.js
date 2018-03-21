

const comment = (state=[], action) => {
    switch(action.type){
        case 'GET_COMMENT':
            return action.playload;
        case 'CREATE_COMMENT':
           return state.concat([action.playload]);
        default:
            return state;

    }
}

export default comment;