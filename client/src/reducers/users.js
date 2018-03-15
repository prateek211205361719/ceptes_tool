const users = (state=[], action) => {
    switch(action.type){
        case 'GET_USERS':
            return action.playload;
        default:
            return state;
    }
};

export default users;