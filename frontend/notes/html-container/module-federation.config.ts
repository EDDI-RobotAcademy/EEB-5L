export const mfConfig = {
  name: "html_container",
  remotes: {
    htmlCssTestApp: "htmlCssTestApp@http://localhost:3001/remoteEntry.js",
  },
  shared: {
    react: { singleton: true, requiredVersion: "^18.2.0" },
    "react-dom": { singleton: true, requiredVersion: "^18.2.0" },
    "@mui/material": { singleton: true, requiredVersion: "^7.0.1" },
    "react-router-dom": { singleton: true, requiredVersion: "^6.30.0" },
  },
};