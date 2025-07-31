import * as path from "node:path";
import { defineConfig } from "@rspack/cli";
import {DefinePlugin, rspack} from "@rspack/core";
import * as RefreshPlugin from "@rspack/plugin-react-refresh";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";


import { mfConfig } from "./module-federation.config";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
  context: __dirname,
  entry: {
    main: "./src/index.tsx",
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },

  devServer: {
    port: 4001,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, "src")],
  },
  output: {
    // You need to set a unique value that is not equal to other applications
    uniqueName: "authentication_app",
    // publicPath must be configured if using manifest
    // publicPath: "http://localhost:4001/",
    publicPath: `${process.env.MFE_PUBLIC_SERVICE}/`,
  },

  experiments: {
    css: true,
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        type: "asset",
      },
      {
        test: /\.css$/,
        use: ["postcss-loader"],
        type: "css",
      },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
                transform: {
                  react: {
                    runtime: "automatic",
                    development: isDev,
                    refresh: isDev,
                  },
                },
              },
              env: { targets },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new rspack.HtmlRspackPlugin({
      template: "./index.html",
    }),
    new DefinePlugin({
      "process.env.REACT_KAKAO_AUTH_URL": JSON.stringify(process.env.REACT_KAKAO_AUTH_URL),
      "process.env.REACT_KAKAO_ORIGINS": JSON.stringify(process.env.REACT_KAKAO_ORIGINS),
      "process.env.REACT_GOOGLE_AUTH_URL": JSON.stringify(process.env.REACT_GOOGLE_AUTH_URL),
      "process.env.REACT_GOOGLE_ORIGINS": JSON.stringify(process.env.REACT_GOOGLE_ORIGINS),
      "process.env.REACT_NAVER_AUTH_URL": JSON.stringify(process.env.REACT_NAVER_AUTH_URL),
      "process.env.REACT_NAVER_ORIGINS": JSON.stringify(process.env.REACT_NAVER_ORIGINS),
      "process.env.REACT_GITHUB_AUTH_URL": JSON.stringify(process.env.REACT_GITHUB_AUTH_URL),
      "process.env.REACT_GITHUB_ORIGINS": JSON.stringify(process.env.REACT_GITHUB_ORIGINS),
      "process.env.REACT_META_AUTH_URL": JSON.stringify(process.env.REACT_META_AUTH_URL),
      "process.env.REACT_META_ORIGINS": JSON.stringify(process.env.REACT_META_ORIGINS),
      "process.env.REACT_APP_BASE_URL": JSON.stringify(process.env.REACT_APP_BASE_URL),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new ModuleFederationPlugin(mfConfig),
    isDev ? new RefreshPlugin() : null,
  ].filter(Boolean),
  optimization: {
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin(),
      new rspack.LightningCssMinimizerRspackPlugin({
        minimizerOptions: { targets },
      }),
    ],
  },
});
