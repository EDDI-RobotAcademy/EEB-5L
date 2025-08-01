export const mfConfig = {
  name: "laptopApp",
  filename: "remoteEntry.js",
  exposes: {
    './bootstrap': './src/bootstrap',
  },
  shared: {
    vue: { singleton: true, requiredVersion: "^3.2.19" },
    vuetify: { singleton: true, requiredVersion: "^3.8.8" },
    pinia: { singleton: true, requiredVersion: "^3.0.3" },
    'vue-router': { singleton: true, requiredVersion: "^4.5.1" }
  },
  dts: false
};
