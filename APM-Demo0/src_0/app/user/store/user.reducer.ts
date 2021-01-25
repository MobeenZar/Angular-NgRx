export function userReducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_MASK_USER_NAME':
            console.log('exiting state: ' + JSON.stringify(state));
            console.log('payload:' + action.payload);
            return {
                ...state,
                maskUserName: action.payload
            };
        case 'SET_USER_NAME':
            console.log('exiting state: ' + JSON.stringify(state));
            console.log('payload:' + action.payload);
            return {
                ...state,
                profile: action.payload
            }

        default:
            return state;
    }
}


// this.store.dispatch({
//     type: 'SET_USER_NAME',
//     payload: { user: userName, password: password}
//   });