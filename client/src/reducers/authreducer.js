
var auth = (state=null, action) => {
    switch(action.type){
        case 'IS_LOGIN':
            return action.playload;
        default:
            return state;
    }
}
export default auth;