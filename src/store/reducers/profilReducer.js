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
            return nextState || state;
            break;

        default:
            return nextState || state;
            break;
    }
}

export default profilReducer;