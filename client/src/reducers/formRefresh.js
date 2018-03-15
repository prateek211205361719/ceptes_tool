
const formRefresh = (state = {}, action) => {
    switch(action.type){
        case 'REFRESH_FORM':
            return action.playload;
        default:
            return state;
    }
}

export default formRefresh;