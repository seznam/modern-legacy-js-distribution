const path = require("path");
const { composePolyfills } = require("./scripts/getPolyfills");

const isDevelopment = process.env.NODE_ENV === "development";

const legacyTarget = "browserslist:legacy";
const modernTarget = "browserslist:modern";

const entryFiles = ["scriptOne", "scriptTwo", "scriptThree"];

const getPathToFile = (fileName) =>
  path.join(__dirname, "src", `${fileName}.js`);

const getEntry = (isModern) => {
  return entryFiles.reduce((acc, fileName) => {
    const pathToFile = getPathToFile(fileName);
    acc[fileName] = isModern ? pathToFile : composePolyfills(pathToFile);
    return acc;
  }, {});
};

const commonConfig = {
  // Consider using source maps by uncommenting the next line
  // devtool: 'source-map',
  optimization: {
    // Optimize both of your bundles
  },
  // Use watch if --mode=development
  watch: isDevelopment,
  watchOptions: {
    ignored: /node_modules/,
  },
};

const legacyConfig = {
  ...commonConfig,
  entry: getEntry(false),
  target: legacyTarget,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: [/\bcore-js\b/, /\bwebpack\/buildin\b/],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "./dist/legacy/js"),
    filename: "[name].js",
  },
  ...commonConfig,
};

const modernConfig = {
  ...commonConfig,
  entry: getEntry(true),
  target: modernTarget,
  output: {
    path: path.resolve(__dirname, "./dist/js"),
    filename: "[name].js",
  },
};

module.exports = [legacyConfig, modernConfig];
