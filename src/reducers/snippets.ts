import { SnippetOperations } from "../actions";

const snippets = (state = {}, action: any) => {
    switch (action.type) {
        case SnippetOperations.SELECT_SNIPPET:
            return {
                ...state,
                snippet: action.snippet,
            };
        case SnippetOperations.SET_SNIPPETS:
            return {
                ...state,
                snippets: action.snippets,
            };
        default:
            return state;
    }
};

export default snippets;
