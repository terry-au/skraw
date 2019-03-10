const {
    appendWebpackPlugin
} = require('@rescripts/utilities');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const addMonacoSupport = (config) => {
    return appendWebpackPlugin(new MonacoWebpackPlugin(), config);
};

module.exports = [
    ['use-tslint-config', 'tslint.json'],
    addMonacoSupport
];