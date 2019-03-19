import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

/**
 * Extends the provided language tokens to add support for Skraw's
 * template substitution expressions: '${1:substitution_name}'.
 *
 * This function must be injected into:
 * node_modules/monaco-editor/esm/vs/basic-languages/_.contribution.js
 *
 * Where the call:
 * _monaco.languages.setMonarchTokensProvider(languageId, mod.language);
 *
 * Is to be replaced with:
 * _monaco.languages.setMonarchTokensProvider(languageId, _extendLanguageTokens(mod.language));
 * @param tokens The language tokens to be extended upon.
 */
export const _extendLanguageTokens = (tokens) => {
    if (!("tokenizer" in tokens)) {
        tokens.tokenizer = {};
    }

    if (!("skraw" in tokens.tokenizer)) {
        tokens.tokenizer.skrawSnippet = [
            [/\$\{[1-9][0-9]*:[^#:%*@\-!_}]+[^#:%*@\-!_}]*\}/, 'meta.skrawMarker'],
        ];
        tokens.tokenizer.root.unshift({
            "include": "@skrawSnippet"
        });
    }
    return tokens;
}


export const patchMonaco = () => {
    monaco.languages.inner_setMonarchTokensProvider = monaco.languages.setMonarchTokensProvider;
    monaco.languages.setMonarchTokensProvider = (languageId, languageDef) => {
        monaco.languages.inner_setMonarchTokensProvider(languageId, _extendLanguageTokens(languageDef))
    };
}