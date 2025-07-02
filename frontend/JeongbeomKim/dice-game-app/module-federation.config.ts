export const mfConfig = {
  name: "diceGameApp",
  filename: "remoteEntry.js",
  exposes: {
    "./App": "./src/App.svelte",
  },
  shared: {
    svelte: { singleton: true, requiredVersion: "^4.2.9", },
    three: { singleton: true, requiredVersion: "^0.177.0", },
  },
  dts: false,
};
