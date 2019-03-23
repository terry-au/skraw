import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

/**
 * Extends the provided language tokens to add support for Skraw's
 * template substitution expressions: '${1:substitution_name}'.
 *
 * Calls made to:
 * monaco.languages.setMonarchTokensProvider(languageId, languageDef);
 *
 * Should be replaced with:
 * monaco.languages.setMonarchTokensProvider(languageId, _extendLanguageTokens(languageDef));
 * @param tokens The language tokens to be extended upon.
 */
const _extendLanguageTokens = (tokens) => {
    if (!tokens) {
        return tokens;
    }

    if (!("tokenizer" in tokens)) {
        tokens.tokenizer = {};
    }

    if (!("skraw" in tokens.tokenizer)) {
        tokens.tokenizer.skrawSnippet = [
            [/\$\{[1-9][0-9]*:[A-Za-z_]+\}/, 'meta.skrawMarker'],
        ];
        tokens.tokenizer.root.unshift({
            "include": "@skrawSnippet"
        });
    }

    return tokens;
}

/**
 * 🦍
 * This function patches Monaco so that calls to monaco.languages.setMonarchTokensProvider
 * have the second variable wrapped with a call to _extendLanguageTokens, which adds support
 * for Skraw's template expression syntax.
 */
export const patchMonacoLanguageTokenProviderFunction = () => {
    if (monaco.languages.inner_setMonarchTokensProvider) {
        console.error("Monaco has already been patched. Aborting.")
        return;
    }

    monaco.languages.inner_setMonarchTokensProvider = monaco.languages.setMonarchTokensProvider;
    monaco.languages.setMonarchTokensProvider = (languageId, languageDef) => {
        monaco.languages.inner_setMonarchTokensProvider(languageId, _extendLanguageTokens(languageDef))
    };
}