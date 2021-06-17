const initialState = {
    isLoggedIn: false,
    firstLaunch: true
};


function profilReducer(state = initialState, action) {
    let nextState;

    switch (action.type) {
        case 'SET_PROFIL':
            nextState = { ...state };
            nextState = action.value;
            nextState.isLoggedIn = true;
            nextState.firstLaunch = false;
            return nextState;
            break;

        case 'SET_FIRST_LAUNCH_APP':
            nextState = { ...state };
            nextState.firstLaunch = action.value;
            return nextState || state;

        default:
            return nextState || state;
            break;
    }

}

export default profilReducer;