import Fuse from "fuse.js";
import { number } from "prop-types";

export interface ISnippet {
    body: string;
    description: string;
    language: string;
    title: string;
    uuid: string;
}

export interface ISnippetQueryResultMatch {
    arrayIndex: number;
    key: string;
    value: string;
    indices: [[number, number]];
}

export interface ISnippetQueryResult {
    item: ISnippet;
    matches: [ISnippetQueryResultMatch];
}

export const querySnippets = (snippets: ISnippet[], query: string): ISnippetQueryResult[] => {
    const options: Fuse.FuseOptions<any> = {
        distance: 100,
        includeMatches: true,
        keys: [
            "title",
            "description",
            "language",
            "body",
        ],
        location: 0,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        shouldSort: true,
        threshold: 0.8,
    };
    const fuse = new Fuse(snippets, options);
    /*
    Casting here because fuse.search() with includeMatches: true returns a datastructure different to
    the inputted list.
    */
    const results = fuse.search(query) as unknown as ISnippetQueryResult[];

    return results;
};
