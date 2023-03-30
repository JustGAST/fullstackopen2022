const {getDefaultConfig} = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.sourseExts.push('cjs');

module.exports = defaultConfig;