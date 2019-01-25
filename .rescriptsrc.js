const {
  appendWebpackPlugin
} = require('@rescripts/utilities')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = (config) => {
  return appendWebpackPlugin(new MonacoWebpackPlugin(), config);
};