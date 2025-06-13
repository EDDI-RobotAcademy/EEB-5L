export const mfConfig = {
  name: "html_container",
  remotes: {
    htmlCssTestApp: "htmlCssTestApp@http://localhost:3001/remoteEntry.js",
    javascriptTestApp: "javascriptTestApp@http://localhost:3002/remoteEntry.js",
    kakaoAuthenticationApp: "kakaoAuthenticationApp@http://localhost:3004/remoteEntry.js",
    navigationBarApp: "navigationBarApp@http://localhost:3005/remoteEntry.js",
    reactTestApp: "reactTestApp@http://localhost:3006/remoteEntry.js",
    practiceApp: "practiceApp@http://localhost:3007/remoteEntry.js",
    googleAuthenticationApp: "googleAuthenticationApp@http://localhost:3100/remoteEntry.js",
    recoilBoardApp:"recoilBoardApp@http://localhost:3101/remoteEntry.js"

  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.2.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
    "@mui/material": { singleton: true, requiredVersion: "^7.0.1" },
    "@mui/icons-material": { singleton: true, requiredVersion: "^7.0.1" },
    "react-router-dom": { singleton: true, requiredVersion: "^6.30.0" },
  },
};