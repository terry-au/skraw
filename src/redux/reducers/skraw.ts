import { combineReducers } from "redux";

export const SELECT_SNIPPET = "SELECT_SNIPPET";

const initialState = {
    snippet: null,
};

export function selectSnippet(snippet: any) {
    return {
        snippet,
        type: SELECT_SNIPPET,
    };
}

function reducer(state = initialState, action: any) {
    switch (action.type) {
        case SELECT_SNIPPET: {
            return {
                ...state,
                ...{},
            };
        }
        default:
            return state;
    }
}

const skraw = combineReducers({
    reducer,
});

export default skraw;
