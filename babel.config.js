module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-flow-strip-types',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.android.js',
          '.android.tsx',
          '.ios.js',
          '.ios.tsx',
        ],
        root: ['./src'],
      },
    ],
    'react-native-reanimated/plugin', // typically last
  ],
};
