const Generator = require("yeoman-generator");
const chalk = require("chalk");

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(`Welcome to the magnificent ${chalk.red("generator-test")} generator!`);
  }
};
