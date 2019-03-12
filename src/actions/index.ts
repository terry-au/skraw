import { ISnippet } from "../Models/ISnippet";

const SELECT_SNIPPET = "SELECT_SNIPPET";
const SET_SNIPPETS = "SET_SNIPPETS";

export const selectSnippet = (snippet: ISnippet) => {
    return {
        snippet,
        type: SELECT_SNIPPET,
    };
};

export const setSnippets = (snippets: ISnippet[]) => {
    return {
        snippets,
        type: SET_SNIPPETS,
    };
};

export const SnippetOperations = {
    SELECT_SNIPPET,
    SET_SNIPPETS,
};
