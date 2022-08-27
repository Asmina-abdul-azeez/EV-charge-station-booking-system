module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          /**
           * Regular expression is used to match all files inside `./app` directory and map each `.app/folder/[..]` to `~folder/[..]` path
           */
          '^~(.+)': './app/\\1',
        },
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.json', '.tsx', '.ts', '.native.js'],
      },
    ],
  ],
};
