import { SnippetOperations } from "../actions";
import { ISnippet } from "../models/ISnippet";

export const snippets = (state: any = {}, action: any) => {
    switch (action.type) {
        case SnippetOperations.UPDATE_SNIPPET: {
            const snippet: ISnippet = action.snippet;
            const updatedSnippets = state.snippets.map((mappedSnippet: ISnippet) => {
                if (snippet.uuid === mappedSnippet.uuid) {
                    return snippet;
                }
                return mappedSnippet;
            });
            return {
                ...state,
                snippet,
                snippets: updatedSnippets,
            };
        }
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
