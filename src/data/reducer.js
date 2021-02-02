export const initialState = {
    playing: false,
    tracks: [],
    track: null,
    token: null,
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_TOKEN": {
            return {
                ...state,
                token: action.token
            }
        }
        case 'SET_TRACKS': {
            return {
                ...state,
                tracks: action.tracks
            };
        }
        case 'SET_TRACK': {
            return {
                ...state,
                track: action.track
            };
        }
        default:
            return state;
    }
};

export default reducer;