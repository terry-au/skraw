import { ISnippet } from "../models/ISnippet";

const SELECT_SNIPPET = "SELECT_SNIPPET";
const SET_SNIPPETS = "SET_SNIPPETS";
const SET_DARK_THEME = "SET_DARK_THEME";

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

export const setDarkTheme = (darkTheme: boolean) => {
    return {
        darkTheme,
        type: SET_DARK_THEME,
    };
};

export const SnippetOperations = {
    SELECT_SNIPPET,
    SET_SNIPPETS,
};

export const SettingsOperations = {
    SET_DARK_THEME,
};
