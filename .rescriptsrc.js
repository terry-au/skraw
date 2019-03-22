const {
    appendWebpackPlugin
} = require('@rescripts/utilities');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

const addMonacoSupport = (config) => {
    const features = ["!gotoError", "!hover"];
    return appendWebpackPlugin(new MonacoWebpackPlugin(features), config);
};

module.exports = [
    ['use-tslint-config', 'tslint.json'],
    addMonacoSupport
];