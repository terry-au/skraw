import { SELECT_SNIPPET } from "../actions";

const snippets = (state = {}, action: any) => {
    switch (action.type) {
        case SELECT_SNIPPET:
            return {
                ...state,
                snippet: action.snippet,
            };
        default:
            return state;
    }
};

export default snippets;
