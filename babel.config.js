// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          "@assets": "./app/assets",
          "@components": "./app/components",
          "@containers": "./app/containers",
          "@hooks": "./app/hooks",
          "@modules": "./app/modules",
          "@navigation": "./app/navigation",
          "@screens": "./app/screens",
          "@store": "./app/store",
          "@types": "./app/types",
          "@utils": "./app/utils",
          "@views": "./app/views"
        }
      }
    ],
    // other plugins...
  ],
};