export const mfConfig = {
  name: "html_container",
  remotes: {
    // htmlCssTestApp: "htmlCssTestApp@http://localhost:3001/remoteEntry.js",
    // javascriptTestApp: "javascriptTestApp@http://localhost:3002/remoteEntry.js",
    kakaoAuthenticationApp: "kakaoAuthenticationApp@http://localhost:3003/remoteEntry.js",
    // vuetifyTailwindBoardApp: "vuetifyTailwindBoardApp@http://localhost:3004/remoteEntry.js",
    navigationBarApp: "navigationBarApp@http://localhost:3005/remoteEntry.js",
    // reactTestApp: "reactTestApp@http://localhost:3006/remoteEntry.js",
    googleAuthenticationApp: "googleAuthenticationApp@http://localhost:3100/remoteEntry.js",
    // recoilBoardApp: "recoilBoardApp@http://localhost:3101/remoteEntry.js",
    // vueBoardApp: "vueBoardApp@http://localhost:3200/remoteEntry.js"
    // vueBoardApp: `vueBoardApp@${process.env.VUE_BOARD_APP}/remoteEntry.js`,
    diceGameApp: "diceGameApp@http://localhost:4000/remoteEntry.js",
    // testGameApp: "testGameApp@http://localhost:3102/remoteEntry.js",
    vueBoardApp2: `vueBoardApp2@${process.env.VUE_BOARD_APP}/remoteEntry.js`,
    authenticationApp:'authenticationApp@http://localhost:3333/remoteEntry.js',
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.2.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
    "@mui/material": { singleton: true, requiredVersion: "^7.0.1" },
    "@mui/icons-material": { singleton: true, requiredVersion: "^7.0.1" },
    "react-router-dom": { singleton: true, requiredVersion: "^6.30.0" },
    three: { singleton: true, requiredVersion: "^0.177.0", },
  },
};