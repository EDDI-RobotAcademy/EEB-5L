import * as path from "node:path";
import { defineConfig } from "@rspack/cli";
import {DefinePlugin, rspack} from "@rspack/core";
import { ModuleFederationPlugin } from "@module-federation/enhanced/rspack";

const sveltePreprocess = require('svelte-preprocess');

import { mfConfig } from "./module-federation.config";

const isDev = process.env.NODE_ENV === "development";

// Target browsers, see: https://github.com/browserslist/browserslist
const targets = ["chrome >= 87", "edge >= 88", "firefox >= 78", "safari >= 14"];

export default defineConfig({
  context: __dirname,
  entry: {
    main: "./src/index.ts",
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },
  // resolve: {
  //   extensions: ["...", ".ts", ".tsx", ".jsx", ".svelte"], // .svelte도 추가하는 게 좋습니다
  //   conditionNames: ["svelte", "import", "require", "default"], // 여기에 'svelte' 꼭 포함
  //   alias: {
  //     svelte: require.resolve("svelte"),
  //   }
  // },

  devServer: {
    port: 4000,
    historyApiFallback: true,
    watchFiles: [path.resolve(__dirname, "src")],
    setupMiddlewares: (middlewares, devServer) => {
      const envOrigins = process.env.MFE_CORS_ORIGIN ?? "";
      const allowedOrigins = envOrigins
          .split(",")
          .map(o => o.trim())
          .filter(Boolean);

      if (devServer?.app) {
        devServer.app.use((req, res, next) => {
          const origin = req.headers.origin;
          if (origin && allowedOrigins.includes(origin)) {
            res.setHeader("Access-Control-Allow-Origin", origin);
          }

          res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST,PUT,DELETE");
          res.setHeader("Access-Control-Allow-Headers", "*");

          if (req.method === "OPTIONS") {
            res.sendStatus(200);
          } else {
            next();
          }
        });
      }

      return middlewares;
    },
  },
  output: {
    // You need to set a unique value that is not equal to other applications
    uniqueName: "dice_game_app",
    // publicPath must be configured if using manifest
    // publicPath: "http://localhost:4000/",
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
              },
              env: { targets },
            },
          },
        ],
      },
      {
        test: /\.svelte$/,
        use: [
          {
            loader: 'svelte-loader',
            options: {
              compilerOptions: {
                dev: isDev,
              },

              emitCss: !isDev,
              hotReload: isDev,
              preprocess: sveltePreprocess({ sourceMap: isDev, postcss: true }),
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
      "import.meta.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL),
    }),
    new ModuleFederationPlugin(mfConfig),
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
