const gitprocess = require("child_process");
const webpack = require("webpack");

const commitDate = gitprocess
  .execSync('git log -1 --date=format:"%Y/%m/%d %T" --format="%ad"')
  .toString();

const commitHash = gitprocess
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
