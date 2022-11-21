import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    position: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            console.log('fetch gender start',action)
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copySate={...state};
            copySate.genders=action.data;
            console.log('fetch gender success',action)
            return {
                ...copySate,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            console.log('fetch gender failed',action)
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;