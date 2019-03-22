import { ISnippet } from "../models/ISnippet";

const SELECT_SNIPPET = "SELECT_SNIPPET";
const SET_SNIPPETS = "SET_SNIPPETS";
const SET_DARK_THEME = "SET_DARK_THEME";
const UPDATE_SNIPPET = "UPDATE_SELECTED";
const DELETE_SNIPPET = "DELETE_SNIPPET";

export const deleteSnippet = (snippet: ISnippet) => {
    return {
        snippet,
        type: DELETE_SNIPPET,
    };
};

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

export const updateSnippet = (snippet: ISnippet) => {
    return {
        snippet,
        type: UPDATE_SNIPPET,
    };
};

export const setDarkTheme = (darkTheme: boolean) => {
    return {
        darkTheme,
        type: SET_DARK_THEME,
    };
};

export const SnippetOperations = {
    DELETE_SNIPPET,
    SELECT_SNIPPET,
    SET_SNIPPETS,
    UPDATE_SNIPPET,
};

export const SettingsOperations = {
    SET_DARK_THEME,
};
