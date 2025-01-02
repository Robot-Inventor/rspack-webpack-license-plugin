import path from "path";
import { fileURLToPath } from "url";
import LicensePlugin from "webpack-license-plugin";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isRunningWebpack = !!process.env.WEBPACK;
const isRunningRspack = !!process.env.RSPACK;
if (!isRunningRspack && !isRunningWebpack) {
  throw new Error("Unknown bundler");
}

/**
 * @type {import('webpack').Configuration | import('@rspack/cli').Configuration}
 */
const config = {
  mode: "production",
  devtool: false,
  entry: {
    main: "./src/index",
  },
  plugins: [
    new LicensePlugin()
  ],
  optimization: {
    // If you disable this option, everything will work fine but the bundle size will increase.
    // concatenateModules: false
  },
  output: {
    clean: true,
    path: isRunningWebpack
      ? path.resolve(__dirname, "webpack-dist")
      : path.resolve(__dirname, "rspack-dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/u,
        use: "ts-loader",
        exclude: /node_modules/u
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  experiments: {
    css: true,
  },
};

export default config;
