export const SELECT_SNIPPET = "SELECT_SNIPPET";

export const selectSnippet = (snippet: any) => {
    return {
        snippet,
        type: SELECT_SNIPPET,
    };
};

export const VisibilityFilters = {
    SELECT_SNIPPET,
};
