export const mfConfig = {
  name: "html_container",
  remotes: {
    kakaoAuthenticationApp: "kakaoAuthenticationApp@http://localhost:3003/remoteEntry.js",
    navigationBarApp: "navigationBarApp@http://localhost:3005/remoteEntry.js",
    googleAuthenticationApp: "googleAuthenticationApp@http://localhost:3100/remoteEntry.js",
    diceGameApp: "diceGameApp@http://localhost:3102/remoteEntry.js",
    vueBoardApp: `vueBoardApp@${process.env.VUE_BOARD_APP}/remoteEntry.js`,
    authenticationApp: "authenticationApp@http://localhost:4010/remoteEntry.js"


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