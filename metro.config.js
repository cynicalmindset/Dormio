// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('@expo/metro-config');

const DefaultConfig = getDefaultConfig(__dirname);
DefaultConfig.resolver.sourceExts.push('cjs');

module.exports = DefaultConfig;
