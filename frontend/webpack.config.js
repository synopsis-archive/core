const gitprocess = require("child_process");
const webpack = require("webpack");

const commitDate = process.env["COMMITDATE"] ?? gitprocess
  .execSync('git log -1 --date=format:"%d.%m.%Y %T" --format="%ad"')
  .toString();

const commitHash = process.env["COMMITHASH"] ?? gitprocess
  .execSync('git log -1 --pretty=format:"%H"')
  .toString();

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      COMMITDATE: JSON.stringify(commitDate),
      COMMITHASH: JSON.stringify(commitHash),
    })
  ]
};
